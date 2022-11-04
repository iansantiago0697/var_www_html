var wordType;
var tags = new Array();
var tags_text = new Array();
var curWordBkId = 0;
var wordbookIdList = new Array();
$(function(){
  //タグ一覧取得
  $(document).ready(function(){
    tags = $('.js_tagtxt_list').map(function(){
      var tagId = $(this).attr('id');
      tagId = tagId.substring(tagId.lastIndexOf("_")+1, tagId.length);
      return tagId;
    });
    tags_text = $('.js_tagtxt_list').map(function(){
      return $(this).text();
    });
    if($('body').attr('class').indexOf('js_ej') > -1){wordType = 1;}else{wordType = 2;}
  });
  //タグ追加
  $("#tag_add").keypress(function (e) {
    if (e.which == 13) {
      new_tag();
      return false;
    }
  });
  //タグ追加
  $('#js_tag_add').click(function(){
    new_tag();
    return false;
  });
  // 単語帳全選択/全解除
  $('#word_chk_all').click(function(){
    $('.word_chk').each(function(){
      $(this).prop('checked', $('#word_chk_all').is(':checked'));
    });
  });
  $('.word_chk').click(function(){
    var allCheck = true;
    $('.word_chk').each(function(){
      if(!$(this).is(':checked')){
        allCheck = false;
        return false;
      }
    });
    $('#word_chk_all').prop('checked', allCheck);
  });
  //+ボタンメニュー
  $('a.js_tag_assign').click(function(){
    if(tags.length == 0){
      popup(0, 'タグが作成されていません。「タグの管理」から作成画面へ進み、タグを作成してください。');
      return false;
    }
    var wordBkId = $(this).attr('id');
    curWordBkId = wordBkId.substring(wordBkId.lastIndexOf("_")+1, wordBkId.length);
    var ul = $('#js_p_tag2_ul').empty();
    //既に関連付けされているタグのリストを生成
    var addedTags = new Array();
    $(this).next('ul').children('li').map(function(){
      var tagId = $(this).attr('id');
      tagId = tagId.substring(tagId.lastIndexOf("_")+1, tagId.length);
      addedTags.push(tagId);
//      ul.append('<li class="bt2"><a id="add_js_tagid_'+tagId+'" class="js_tag_select chk">' + $('#js_tagtxt_'+tagId).text() + '</a></li>');
      ul.append('<li class="bt2"><a id="add_js_tagid_'+tagId+'" class="js_tagtxt_list chk" onclick="remove_tag('+tagId+')">' + escapeHTML($('#js_tagtxt_'+tagId).text()) + '</a></li>');
    });
    for(var i=0;i<tags.length;i++){
      //既に関連付けされているタグは除外する
      var existed = false;
      for(var j=0;j<addedTags.length;j++){
        if(tags[i] == addedTags[j]) {
          existed = true;
          break;
        }
      }
      if (!existed) {
//        ul.append('<li class="bt2"><a id="add_js_tagid_'+tags[i]+'" class="js_tag_select">' + tags_text[i] + '</a></li>');
        ul.append('<li class="bt2"><a id="add_js_tagid_'+tags[i]+'" class="js_tagtxt_list" onclick="add_tag('+tags[i]+')">' + escapeHTML(tags_text[i]) + '</a></li>');
      }
    }
    open_panel('#js_p_tag2');
    return false;
  });
/*
  //選択したタグを見出し語に関連付け/解除
//  $('#js_p_tag2_modal > ul > li').live('click', function(){
  $('a.js_tag_select').live('click', function(){
    var tagId_a = $(this).attr('id');
    var tagId = tagId_a.substring(tagId_a.lastIndexOf("_")+1, tagId_a.length);
    if ($(this).attr('class') == 'js_tag_select') {
      add_tag(tagId);
    } else {
      remove_tag(tagId);
    }
    return false;
  });
*/
  //単語帳削除
  $('.del_word').click(function(){
    var id = this.id.substring(5);
    if (confirm($('#word_text_'+id).text() + ' を削除しますか？')) {
      lock_screen();
      $('#fnc').val('delword');
      $('#wordBkId').val(id);
      $('#fmManage').submit();
    }
    return false;
  });
  //タグ管理へ
  $('#manage_tag').click(function(){
    var page = document.fmManage.page.value;
    var tag = document.fmManage.tag.value;
    var alpha = "";
    var url = "";
    if ($('body').attr('class') == 'js_ej') {
      url = WORDBOOK_EJ_TAG_URI;
      alpha = document.fmManage.alpha.value;
    } else {
      url = WORDBOOK_JE_TAG_URI;
    }
    var param = (page.length > 0 ? "&page=" + page : "")
      + (alpha.length > 0 ? "&alpha=" + alpha : "")
      + (tag.length > 0 ? "&tag=" + tag : "");
    document.location.href = url + (param.length > 0 ? "?" + param.substring(1) : "");
    return false;
  });
  //単語帳へ戻る
  $('#back_wordbk').click(function(){
    var page = document.fmManage.page.value;
    var tag = document.fmManage.tag.value;
    var alpha = "";
    var url = "";
    if ($('body').attr('class') == 'js_ej') {
      url = WORDBOOK_EJ_URI;
      alpha = document.fmManage.alpha.value;
    } else {
      url = WORDBOOK_JE_URI;
    }
    var param = (page.length > 0 ? "&page=" + page : "")
      + (alpha.length > 0 ? "&alpha=" + alpha : "")
      + (tag.length > 0 ? "&tag=" + tag : "");
    document.location.href = url + (param.length > 0 ? "?" + param.substring(1) : "");
    return false;
  });
  //絞込みパネルを開く
  $('#js_s_alpha').click(function(){
    open_panel('#js_p_alpha');
    return false;
  });
  $('#js_s_tag').click(function(){
    open_panel('#js_p_tag');
    return false;
  });
  //絞込みパネルをクローズ
  $('.js_s_close').click(function(){
    $('#blackout').css('display', 'block');
    $('#js_p_alpha').css('display', 'none');
    $('#js_p_tag').css('display', 'none');
    $('#js_p_tag2').css('display', 'none');
    wordBkId = 0;
  });
  // 選択項目の削除
  $('#js_s_part').click(function(){
    var res=confirm('選択した単語帳を削除します。よろしいですか？');
    if(res){
      wordbookIdList = new Array();
      $('.word_chk').each(function(){
        if($(this).is(':checked')){
          var wordbookId = $(this).attr('id');
          wordbookId = wordbookId.substring(wordbookId.lastIndexOf('_')+1);
          wordbookIdList.push(wordbookId);
        }
      });
      if(wordbookIdList.length <= 0){
        alert('見出し項目が選択されていません。');
        return false;
      }
      $.getJSON(JSON_URI+'wordbook/deleteSelectedWordbook', {'wordType': wordType, 'idList': wordbookIdList.toString()}, function(json){
        if(json.ret == 0){
          location.reload(true);
        }else{
          alert('単語帳削除でエラーが発生いたしました。時間をおいてもう一度お試しください。(' + json.ret + ')');
        }
      });
    }
  });
  //訳語表示/非表示
  $("td.toggler").click(function(){
    if(!$.support.noCloneEvent){
      $(this).parent().next().toggle(); // IE
    } else {
      $(this).parent().next().toggle(200); // IE以外
    }
    // $('span.sound').prev('span.label').css('display', 'none');
    // $('.sound > a').css('display', 'none');
    return false;
  });
  // 訳語を非表示
  $("a.closer").click(function(){
    if(!$.support.noCloneEvent){
      $(this).parent().parent().parent().toggle(); // IE
    } else {
      $(this).parent().parent().parent().toggle(200); // IE以外
    }
    return false;
  });
});
//パネルを開く
function open_panel(id){
  $(id).css('display', 'block');
  var whole_h = document.body.clientHeight;
  var panel_h = $(id+'_modal').height()+80;
  if(whole_h < panel_h) whole_h = panel_h;
  $(id+' > .bg_box').css('height', whole_h);
  $(id+' > .bg_box2').css('height', whole_h);
  $(id).css('display', 'block');
  $(".modal").css('margin-top', document.body.scrollTop+20+"px");
//  document.getElementById('js_modal').style.marginTop = document.body.scrollTop+20+"px";
//  window.scrollTo(0,0);
//  if(navigator.userAgent.indexOf('Android 1.') > -1 || navigator.userAgent.indexOf('Android 2.') > -1 ) $('#blackout').css('display', 'none');
  if(navigator.userAgent.indexOf('Android') > -1) $('#blackout').css('display', 'none');
}
//タグ関連付け
function add_tag(tagId){
  lock_screen();
  var wordBkId = curWordBkId;
  $('#add_js_tagid_'+tagId).addClass('chk');
  $.getJSON(JSON_URI+'wordbook/addWordbookTag', {'wordType': wordType, 'wordBkId': wordBkId, 'tagId': tagId}, function(json){
    if(json.ret == 0){
      $('#js_bkid_'+wordBkId).next('ul').append('<li id="js_id_'+wordBkId+'_'+tagId+'"></li>');
      recount(wordBkId, json.count);
      $('#blackout').css('display', 'block');
      $('#js_p_tag2').css('display', 'none');
      curWordBkId = 0;
      unlock_screen();
    }else{
      $('#add_js_tagid_'+tagId).removeClass('chk');
      unlock_screen();
      switch(json.ret){
        case -4:
          popup(-4, 'このタグはすでに付与されています');break;
        case -5:
          popup(-5, '１つの項目に付与できるタグの数は10件までです');break;
        default:
          dialogs(json.ret);break;
      }
    }
  });
  return false;
}
//タグ関連付け解除
function remove_tag(tagId){
  lock_screen();
  var wordBkId = curWordBkId;
  $('#add_js_tagid_'+tagId).removeClass('chk');
  $.getJSON(JSON_URI+'wordbook/removeWordbookTag', {'wordType': wordType, 'wordBkId': wordBkId, 'tagId': tagId}, function(json){
    if(json.ret == 0){
      $('#js_id_'+wordBkId+'_'+tagId).remove();
      recount(wordBkId, json.count);
      $('#blackout').css('display', 'block');
      $('#js_p_tag2').css('display', 'none');
      curWordBkId = 0;
      unlock_screen();
    }else{
      $('#add_js_tagid_'+tagId).addClass('chk');
      unlock_screen();
      dialogs(json.ret);
    }
  });
  return false;
}
//タグ件数表示のアップデート
function recount(wordBkId, count){
  var id = '#js_bkid_'+wordBkId;
  if(count == 0){
    $(id).text('追加');
    $(id).addClass('add_tag_link');
    $(id).removeClass('tag_link');
  }else{
    $(id).text(count+'件');
    $(id).addClass('tag_link');
    $(id).removeClass('add_tag_link');
  }
}
// タグ削除
function del_tag(tagId){
  if (confirm('タグ「' + $('#js_tagtxt_'+tagId).text() + '」を削除しますか？')) {
    lock_screen();
    $('#fnc').val('deltag');
    $('#tagId').val(tagId);
    $('#fmManage').submit();
  }
  return false;
}
//タグ追加
function new_tag(){
  var tag = $('input.js_tag_field').val();
  tag = tag.replace(/^[ 　]*/g, "").replace(/[ 　]*$/g, "").replace(/[\n]*$/g, "").replace(/[\r\n]*$/g, "");
  if (tag.length == 0) {
	alert('タグ名を入力してください');
    $('input.js_tag_field').val("");
	$('input.js_tag_field').focus();
    return;
  }
  if (tag.indexOf('<') != -1 || tag.indexOf('>') != -1) {
    alert('< > の文字は使用できません');
    return;
  }
  if (tag.length > 50) {
    popup(-3, '50文字以上のタグは登録できません');
    return;
  }
  lock_screen();
  $.getJSON(JSON_URI+'wordbook/addTag', {'wordType': wordType, 'tag': tag}, function(json){
    if(json.ret == 0){
      var newtags = new Array();
      newtags[0] = json.tagId;
      for(var i=0;i<tags.length;i++){newtags[i+1] = tags[i];}
      tags = newtags;
      var newtags2 = new Array();
      newtags2[0] = replaceCharacterEntityReference(tag);
      for(var i=0;i<tags_text.length;i++){newtags2[i+1] = replaceCharacterEntityReference(tags_text[i]);}
      tags_text = newtags2;
      var tags_html = '';
      for(var i=0;i<tags.length;i++){
        tags_html += '<tr>';
        tags_html += '<td class="close"><a href="" id="tag_'+tags[i]+'" class="del_tag js_tag_list" onclick="return del_tag('+tags[i]+')"><img src="'+IMG_URI+'bt_del.png" width="20" height="20" alt="削除" title="削除" /></a></td>';
        tags_html += '<td id="js_tagtxt_'+tags[i]+'" class="js_tagtxt_list">'+escapeHTML(tags_text[i])+'</td>';
        tags_html += '</tr>';
      }
      $('table').empty();
      $('table').append('<div id="js_tag_list_begin"></div>');
      $('table').append(tags_html);
//      $("#js_tag_list_begin ~ tr").remove();
//      $('#js_tag_list_begin').after(tags_html);
      $('#tag_add').val("");
      unlock_screen();
    }else{ 
      unlock_screen();
      switch(json.ret){
        case -3:
          popup(-3, '50文字以上のタグは登録できません');break;
        case -4:
          popup(-4, 'このタグはすでに登録されています');break;
        case -5:
          popup(-5, 'タグの登録件数が上限に達しているため、追加することができません');break;
        default:
          dialogs(json.ret);break;
      }
    }
  });
}
