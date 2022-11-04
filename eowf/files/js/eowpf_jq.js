var wordType;
var tags = new Array();
var tags_text = new Array();
var isMag = false;
var openMag = null;
var drop = null;
var dx = null;
var dy = null;
var tests = new Array();
var testPageNo = 0;
var importingDialog = null;
var wordbookIdList = new Array();
$(function(){
  //キャッシュ無効化（IE対応）
  $.ajaxSetup({ cache: false });
  //タグ一覧取得
  $(document).ready(function(){
    tags = $('a.js_tag_list').map(function(){
      var tagId = $(this).attr('id');
      tagId = tagId.substring(tagId.lastIndexOf("_")+1, tagId.length);
      return tagId;
    });
    tags_text = $('a.js_tagtxt_list').map(function(){
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
  $('#js_tag_add').click(function(){
    new_tag();
    return false;
  });
  $(window).keydown(function(e){
    var d = $('.dialog_test').css('display');
    if (d && d == "block") {
      if (keycode == 39) {
        change_test_page(1);
        return false;
      } else if (keycode == 37) {
        change_test_page(-1);
        return false;
      }
    }
  });
  //ドラッグ＆ドロップ
  $(document).on('mousedown', 'a.js_tag_list', function(e){
//  $('a.js_tag_list').live('mousedown', function(e){ ※.liveはjQuery1.9以降削除されているため
    var mx = e.pageX;
    var my = e.pageY;
    var obj = $(this).parent().clone();
    obj.attr('class', 'js_drag');
    obj.css('background','#fffd76');
    obj.css('position','absolute').css('left', mx-10).css('top', my-10).css('z-index', 10);
    $('body').append(obj);
    $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
    return false;
  });
  function mouseMove(e) {
    var mx = e.pageX;
    var my = e.pageY;
    $('.js_drag').css('left', mx-10).css('top', my-10);
    return false;
  }
  function mouseUp(e) {
    $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
    drop = $('.js_drag');
    $('.js_drag').remove();
    dx = e.pageX;
    dy = e.pageY;
    if ((navigator.userAgent.indexOf("Mac", 0) != -1) &&
        (navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("Safari") != -1)){
      $('div.lefttable td[id^=js_bkid_]').each(function(){
        var td = $(this);
        if (td.offset().left < dx && dx < td.offset().left + td.width() &&
            td.offset().top < dy && dy < td.offset().top + td.height()){
          add_tag_td(td);
          return false;
        }
      });
      drop = null;
    }
    return false;
  }
  $('div.lefttable tr').hover(function(e){
    if(dx == e.pageX && dy == e.pageY && drop){
      if ($(this).children('td').length > 0) {
        if ($(this).children('td.direction_word').size() > 0) {
// tableの1番右にcheckboxカラムを置いたため変更→checkboxカラムを移動したときに元に戻す
//          add_tag_td($(this).find('td:last-child'));
          add_tag_td($(this).find('td:nth-child(6)').prev());
//          add_tag_td($(this).find('.tag'));
        } else {
// tableの1番右にcheckboxカラムを置いたため変更→checkboxカラムを移動したときに元に戻す
//          add_tag_td($(this).prev().find('td:last-child'));
          add_tag_td($(this).prev().find('td:nth-child(6)').prev());
//          add_tag_td($(this).prev().find('.tag'));
        }
      }
    }
    drop = null;
  });
  function add_tag_td(td) {
    var wordBkId_a = td.attr('id');
    var tagId_a = drop.find('a:first-child').attr('id');
    var wordBkId = wordBkId_a.substring(wordBkId_a.lastIndexOf("_")+1, wordBkId_a.length);
    var tagId = tagId_a.substring(tagId_a.lastIndexOf("_")+1, tagId_a.length);
    add_tag(td, wordBkId, tagId);
  }
  //+ボタンメニュー
  $('a.js_tag_assign').click(function(){
    thisMag = $(this).parent().parent().attr('id');
    if(thisMag != openMag){
      $('div.mag > .tooltip_tag').css('display','none');
      var tooltip = $(this).parent().parent().children('div.mag').children('div.tooltip_tag');
      tooltip.empty();
      tooltip.css('display','block');
      //既に関連付けされているタグのリストを生成
      var addedTags = new Array();
      $(this).parent().parent().children('span.tag').each(function(){
        var tagId = $(this).children('a').attr('id');
        tagId = tagId.substring(tagId.lastIndexOf("_")+1, tagId.length);
        addedTags.push(tagId);
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
          tooltip.append('<a id="add_js_tagid_'+tags[i]+'" class="js_tag_select" onmouseover="this.style.background=\'#CCCCCC\'" onmouseout="this.style.background=\'white\'">' + tags_text[i] + '</a>');
        }
      }
      $('div.tooltip_tag a:last-child').attr('class', 'js_tag_select last');
      tooltip.scrollTop(0);
      isMag = true;
      openMag = thisMag;
    }
  });
  $(document).on('click', 'a.js_tag_select', function(e){
//  $('a.js_tag_select').live('click', function(){ ※.liveはjQuery1.9以降削除されているため
    var td = $(this).parent().parent().parent();
    var wordBkId_a = td.attr('id');
    var tagId_a = $(this).attr('id');
    var wordBkId = wordBkId_a.substring(wordBkId_a.lastIndexOf("_")+1, wordBkId_a.length);
    var tagId = tagId_a.substring(tagId_a.lastIndexOf("_")+1, tagId_a.length);
    add_tag(td, wordBkId, tagId);
    return false;
  });
  //見出し語からタグ除外
  $(document).on('click', 'a.js_tag_unset', function(e){
//  $('a.js_tag_unset').live('click', function(){ ※.liveはjQuery1.9以降削除されているため
    var td = $(this).parent().parent().parent();
    var span = $(this).parent();
    var param = $(this).attr('id');
    var wordBkId = param.substring(6, param.lastIndexOf("_")); //js_id_[wordBkId]_[tagId]"
    var tagId = param.substring(param.lastIndexOf("_")+1, param.length);
    $.getJSON(JSON_URI+'wordbook/removeWordbookTag', {'wordType': wordType, 'wordBkId': wordBkId, 'tagId': tagId}, function(json){
      if(json.ret == 0){
        span.remove();
        if(json.count < 10){
          td.find('.js_tag_assign').css('display', 'inline');
        }else{
          td.find('.js_tag_assign').css('display', 'none');
        }
      }else{ dialogs(json.ret); }
    });
    return false;
  });
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
  //タグ削除
  $(document).on('click', '.del_tag', function(e){
//  $('.del_tag').live('click', function(){ ※.liveはjQuery1.9以降削除されているため
    var id = this.id.substring(4);
    if (confirm('タグ「' + $('#js_tagtxt_'+id).text() + '」を削除しますか？')) {
      lock_screen();
      $('#fnc').val('deltag');
      $('#tagId').val(id);
      $('#fmManage').submit();
    }
    return false;
  });
  //訳語表示/非表示
  $("td.toggler").click(function(){
    if(!$.support.noCloneEvent){
      $(this).parent().next().toggle(); // IE
    } else {
      $(this).parent().next().toggle(200); // IE以外
    }
    $('.sound > object').css('display', 'none');
    var imgSrc = $(this).closest('tr').children('td:eq(2)').find("img").attr("src");
    $(this).closest('tr').children('td:eq(2)').find("img").
      attr("src", (imgSrc.indexOf("open")>=0? imgSrc.replace("open", "close"): imgSrc.replace("close", "open")));
    return false;
  });
  $('body').click(function(){
    if(!isMag){
      $('div.mag > .tooltip_tag').css('display','none');
      openMag = null;
    }
    isMag = false;
  });
  // 単語帳全選択/全解除
  $('#word_chk_all').click(function(){
    $('.word_chk').each(function(){
      $(this).prop('checked', $('#word_chk_all').is(':checked'));
    });
  });
  // 単語帳選択/解除
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
  $('#word_chk_all').tooltip({
    position: {
      my: "center bottom-15",
      at: "center top",
      using: function(position, feedback) {
        $(this).css(position);
        $("<div>")
          .addClass("arrow")
          .addClass(feedback.vertical)
          .addClass(feedback.horizontal)
          .appendTo(this);
      }
    }
  });
  $('#printer').click(function(){
    var checked = false;
    $('.word_chk').each(function(){
      if($(this).is(':checked')){
        checked = true;
        return false;
      }
    });
    if(!checked){
      alert("見出し項目が選択されていません。");
      return false;
    }

    var win = window.open("","_blank");
    var doc = win.document;

    doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
    doc.write('<html>');
    doc.write('<head>');
    doc.write('<title>英辞郎 on the WEB Pro Lite</title>');
    doc.write('<link href="/content/css/eowpf.css?201312241000" rel="stylesheet" type="text/css">');
    doc.write('<link href="/content/css/print.css?201312241000" rel="stylesheet" type="text/css">');
    doc.write('<link href="/content/css/jquery.resizableColumns.css" rel="stylesheet" type="text/css">');
    doc.write('<script type="text/javascript" language="JavaScript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>');
//    doc.write('<script type="text/javascript" language="JavaScript" src="/content/js/store.min.js?201312241000"></script>');
    doc.write('<script type="text/javascript" language="JavaScript" src="/content/js/jquery.resizableColumns.js?201312241000"></script>');
    doc.write('<script type="text/javascript" language="JavaScript" src="/content/js/eowpf_print.js?201312241000"></script>');
    doc.write('</head>');
    doc.write('<body class="print">');
//    doc.write('<input type="button" id="do" onclick="javascript:window.print();return false;" value="印刷する">');
//    doc.write('<a id="printer" onclick="javascript:window.print();return false;">印刷する</a>');
    doc.write('<a id="printer">印刷する</a>');
    doc.write('<div class="lefttable">');
    doc.write('<table width="100%" border="0" cellspacing="0" cellpadding="0">');
    doc.write('<tr>');
    doc.write('<th class="col01" scope="col">見出し項目</th>');
    doc.write('<th class="col02" scope="col">メモ</th>');
    doc.write('<th class="col03" scope="col">意味・用例</th>');
    doc.write('<th class="col04" scope="col">レベル</th>');
    doc.write('</tr>');
    var row = 0;
    var html, memo, desc, eles, ele, text;
    var level, pron;
    checked = false;
    $('div.lefttable tr').each(function(){
      if($(this).children('td').length > 0){
        if(row % 2 == 0){
          // 見出し項目
          checked = $(this).find('.word_chk').is(':checked');
          if(checked){
            word = $(this).find('td:eq(1)').text();
            memo = $(this).find('td:eq(3)').find('div').html();
          }
        }else{
          if(checked){
            // 訳語
            level = "";
            pron = "";
            html = $(this).find('td:eq(1)').html();
            html = html.replace(/[\n\r]/g, "");

            // レベル抜き出し、削除
            if(html.match(/(<span class=[\'\"]?label[\'\"]?[^>]*><span class=[\'\"]?ls_normal[\'\"]?>レベル<\/span><\/span>[0-9]*、?)/i)){
              text = RegExp.$1;
              html = html.replace(text, "");
              level = text.replace(/<span class=[\'\"]?label[\'\"]?[^>]*><span class=[\'\"]?ls_normal[\'\"]?>レベル<\/span><\/span>/i, "").replace("、","");
            }

            // HTML→element化
            desc = $("<div/>").addClass("printdesc").css('display','none');
            desc.html(html);
            $("body").append(desc);

            $(".printdesc span").each(function(){
              if(($(this).attr('class') == "ls_normal" && $(this).text() == "発音") ||
                ($(this).attr('class') == "ls_alert" && $(this).text() == "発音") ||
                ($(this).attr('class') == "ls_normal" && $(this).text() == "音声を聞く")){
                  $(this).parent().remove();
//              }else if($(this).text() == "レベル"){
//                $(this).parent().remove();
//              }
              }else if($(this).attr('class') == "pron"){
                // 発音記号抜き出し
                if(pron.length == 0){
                  pron = $(this).html().replace("、","");
                }
                $(this).remove();
              }else if($(this).attr('class') == "exp" || $(this).attr('class') == "sound"){
                // 音声、全文表示削除
                $(this).remove();
              }
            });

            // 印刷用HTML生成
            doc.write('<tr><td><div class="word">'+word+'</div>');
            if(pron.length > 0){
              doc.write('<span class="pron">/'+pron+'/</span>');
            }
            doc.write('</td>');
            doc.write('<td class="memo">'+memo+'</td>');
            try{
              doc.write('<td class="desc">'+$(".printdesc").html()+'</td>');
            }catch(e){
              doc.write('<td class="desc">'+html+'</td>');
            }
            doc.write('<td>'+level+'</td>');
            doc.write('</tr>');
            $(".printdesc").remove();
          }
        }
        row++;
      }
    });
    $(".printdesc").remove();

    doc.write('</table>');
    doc.write('</div>');
    doc.write('</body>');
    doc.write('</html>');
    doc.close();

    win.focus();

    return false;
  });
  $('#test').click(function(){
    var checked = false;
    $('.word_chk').each(function(){
      if($(this).is(':checked')){
        checked = true;
        return false;
      }
    });
    if(!checked){
      alert("見出し項目が選択されていません。");
      return false;
    }

    var row = 0;
    var html, desc, eles, ele, text;
    var level, pron;
    checked = false;
    tests = new Array();
    testPageNo = 0;
    $('div.lefttable tr').each(function(){
      if($(this).children('td').length > 0){
        if(row % 2 == 0){
          // 見出し項目
          if($(this).find('.word_chk').is(':checked')){
            tests.push('<div class="midashi">' + $(this).find('td:eq(1)').text() + '</div>');
            html = $(this).find('td:eq(3)').find('div').html();
            if ($.trim(html) != "") tests.push(html);
          }
        }else{
          // メモが無い場合は訳語
          if(tests.length % 2 != 0){
            html = $(this).find('td:eq(1)').html();
            tests.push(normalize_desc(html));
          }
        }
        row++;
      }
    });

    $('#word_dialog_contents').empty();
    $('#word_dialog_contents').append('<div id="word_dialog_text"></div>');
    $('.word_dialog_num').remove();

    $('#word_dialog').dialog({
      title: "単語復習",
      resizable: false,
      width:500,
      height:230,
      modal: true,
      dialogClass: 'dialog_test',
      open: function() {
        show_test();

        // 問題数追加
        $('.ui-dialog-buttonpane').append('<div class="word_dialog_num"></div>');
        $('.word_dialog_num').text('1 問 / ' + tests.length/2 + ' 問中');
      },
      buttons: {
        "前へ": function() {
          change_test_page(-1);
        },
        "意味": function() {
          change_test_page(1);
        },
        "中止": function() {
          $(this).dialog("close");
        }
      }
    });

    return false;
  });
  // 選択した項目を削除
  $('#part').click(function(){
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
  $('#clean').click(function(){
	 var res=confirm("単語帳を一括削除します。よろしいですか？");
	 if (res == true) {
		 	var res=confirm("削除された見出し項目を、後から復元することはできません。\n単語帳から、本当に削除してよろしいですか？");
		if (res != true) { return false; }
	 	} else { return false; }
	 $.getJSON(JSON_URI+'wordbook/deleteAllWordbook', {'wordType': wordType}, function(json){
	   if(json.ret == 0){
	     location.reload(true);
	   }else{
	      alert('単語帳削除でエラーが発生いたしました。時間をおいてもう一度お試しください。(' + json.ret + ')');
	   }
	 });
  });
  $('#export').click(function(){
    var res=confirm("単語帳を一括エクスポートします。よろしいですか？");
    if (res != true) { return false; }
    if ("Blob" in window) {
      $.ajax({
        type: 'GET',
        url: '/json/wordbook/exportWordbook?wordType=' + wordType,
        cache: false,
        dataType: 'text',
        global: false,
        success: function(body) {
          var filename = '';
          if (wordType==1) {
            filename='単語帳_英和.tsv';
          } else {
            filename='単語帳_和英.tsv';
          }

          var b = new Blob([body], {type:"text/tab-separated-values;charset=utf-8"});
          var dataUrl = window.URL.createObjectURL(b);

          if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(b, filename);
            return false;
          }
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.textContent = filename;
          a.download = filename;
          a.href = dataUrl;
          a.click();
          document.body.removeChild(a);
          return false;
        }
      });
    } else {
      // IE9以下対応
      var iframe = null;
      if (document.getElementById("export_frame") == null) {
        iframe = document.createElement("iframe");
        iframe.id = "export_frame";
        iframe.height = 0;
        iframe.width = 0;
        iframe.style.display = 'none';
        document.getElementsByTagName("body").item(0).appendChild(iframe);
      }
      iframe = $("iframe#export_frame");
      iframe.attr('src', '/json/wordbook/exportWordbook?wordType=' + wordType).appendTo('body');
    }
  });
  $('#import').click(function(){
    $('#import_dialog_contents').empty();
    $('#import_dialog_contents').append(
      '<p>インポートする単語帳ファイルを選択してください。</p><p>　</p>'
     +'<form id="importForm" action="." method="post" enctype="multipart/form-data" >'
     +'<input type="file" id="importFile" name="importFile" /><br/>'
     +'<input type="hidden" id="importWordType" name="wordType" value="' + wordType + '" /><br/>'
     +'</form>'
    );

    $('#import_dialog').dialog({
      title: "単語帳インポート",
      resizable: false,
      width: 500,
      height: 300,
      modal: true,
      dialogClass: 'import_word',
      open: function(){
        $('#word_dialog_num').empty();
      },
      buttons: {
        "インポート": function(){
          if ($('#importFile')[0].files[0] == null) {
            alert('ファイルが選択されていません。');
            return;
          }
          var fd = new FormData($('#importForm').get()[0]);
          $.ajax({
            url: "/json/wordbook/importWordbook",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            dataType: 'json',
            timeout: 180000
          })
          .done(function(data){
            $('#import_result_dialog').dialog({
              title: "単語帳インポート結果",
              resizable: false,
              width: 300,
              height: 400,
              modal: true,
              dialogClass: 'import_word no-close',
              closeOnEscape: false,
              open: function(){
                $('#import_result_dialog_contents').empty();
                if (data != null && data.ret == 0) {
                  $('#import_result_dialog_contents').append(
                      '<div id="summery"><dl>'
                    + '<dt>ファイルの総行数 : </dt><dd>' + data.lineCount + '<dd/>'
                    + '<dt>データの件数 : </dt><dd>' + data.dataLineCount + '<dd/>'
                    + '<dt>インポート成功件数 : </dt><dd>' + data.successCount + '<dd/>'
                    + '<dt>　　新規追加見出し語数 : </dt><dd>' + data.addedWordCount + '<dd/>'
                    + '<dt>　　新規追加タグ数 : </dt><dd>' + data.addedTagCount + '<dd/>'
                    + '<dt>　　タグ付与見出し語数 : </dt><dd>' + data.wordTagModifyCount + '<dd/>'
                    + '<dt>　　メモ更新数 : </dt><dd>' + data.modifyMemoCount + '<dd/>'
                    + '<dt>失敗件数 : </dt><dd>' + data.errorLineCount + '<dd/>'
                    + '</dl><p style="clear: both;">　</p></div>'
                  );
                } else {
                  $('#import_result_dialog_contents').append(
                      '<p>インポート中にエラーが発生しました</p><p>　</p>'
                    + '<p>サーバ内部でエラーが発生しました。時間を置いてやり直してください。('
                    + data.ret + ')</p>'
                  );
                }
                if (data.errors && data.errors.length > 0) {
                  $('#import_result_dialog_contents').append('<div id="import_msgs"><p>エラー詳細：</p><pre style="overflow: scroll;">' + data.errors.join("\n") + '</pre></div>');
                }
              },
              buttons: {
                "OK": function(){
                  location.reload(true);
                  $(this).dialog("close");
                  $(importingDialog).dialog("close");
                  importingDialog = null;
                }
              }
            });
          })
          .error(function(){
            alert("単語帳インポート時に通信エラーが発生いたしました。\n再度お試しください。");
            location.reload(true);
          });

          $(this).dialog("close");

          // インポート中ダイアログ表示
          importingDialog = $('#import_progress_dialog').dialog({
            title: "単語帳のインポート中......",
            resizable: false,
            width: 300,
            height: 100,
            modal: true,
            dialogClass: 'import_word no-close',
            closeOnEscape: false,
            open: function(){
              $('#import_progress_dialog_contents').empty();
              $('#import_progress_dialog_contents').append(
                '<img src="'+IMG_URI+'import_progress.gif" alt="単語帳のインポート中" title="単語帳のインポート中" width="220" height="19" style="display: block;margin-left: auto;margin-right: auto;margin-top: auto;margin-bottom: auto;"/>'
              );
            },
            buttons: {}
          });
        },
        "キャンセル": function(){
          $(this).dialog("close");
        }
      }
    });
  });
  $('.open_memo').click(function(){
    var id = $(this).attr('id');
    var wordBkId = id.substring(id.lastIndexOf("_")+1, id.length);
    var html = $('#word_memo_'+wordBkId).html();
    html = html.replace(/<br>/g, "\n");
    $('#memo_word_dialog_contents').empty();
    $('#memo_word_dialog_contents').append(
      '<textarea id="word_dialog_free" name="word_dialog_free" rows="5" maxlength="200">'+html+'</textarea>'
    );
    var desc = normalize_desc($('#word_desc_'+wordBkId).html());
    $('#memo_word_dialog_contents').append('<div class="dialog_desc">≪意味・用例≫<div class="desc">'+desc+"</div></div>");

    $('.word_dialog_num').remove();

//2014.10.28 EOWPF-56 制限機能処理
    //単語帳のメモ帳ダイアログ
    $('#memo_word_dialog').dialog({
      title: "メモ",
      resizable: false,
      width:500,
      height:500,
      modal: true,
      dialogClass: 'dialog_word',
      open: function() {
      },
      buttons: {
        "保存": function() {
          var memo = $('#word_dialog_free').val();
          if (memo.indexOf('<') != -1 || memo.indexOf('>') != -1) {
            alert('< > の文字は使用できません');
            return;
          }
          if (memo.length > 200) {
            popup(-3, '200文字以上は設定できません');
            return;
          }
          $.getJSON(JSON_URI+'wordbook/setWordbookMemo', {'wordType': wordType, 'wordBkId': wordBkId, 'memo': memo}, function(json){
            if(json.ret == 0){
              html = memo.replace(/[\n\r]/g, "<br />");
              $('#word_memo_'+wordBkId).html(html);
              $('#memo_word_dialog').dialog("close");
            }else if(json.ret == -3){
              popup(-3, '200文字以上は設定できません');
            }else{ dialogs(json.ret); }
          });
        },
        "クリア": function() {
          $('.word_dialog_row').prop('checked', false);
          $('#word_dialog_free').val("");
        },
        "キャンセル": function() {
          $(this).dialog("close");
        },
      }
    });

    //単語帳のメモ帳ダイアログ 制限版
    $('#memo_word_dialog_f').dialog({
      title: "メモ",
      resizable: false,
      width:500,
      height:500,
      modal: true,
      dialogClass: 'dialog_word',
      //初期処理
      open: function() {
          //半透明のパネルを挿入
          $(".ui-dialog-buttonpane button:contains('保存')").addClass('inner_panel');
          $(".ui-dialog-buttonpane button:contains('クリア')").addClass('inner_panel');
          $(".ui-dialog-buttonset").addClass('dialog_memo_f');
          //ホップアップの文言
          var dialog_memo_hopup  = '<div class="fukidashi fukidashi_memo" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
              dialog_memo_hopup += '<p class="text">単語帳に登録した語句に、200字以内のメモを登録できる機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href="https://eowp.alc.co.jp/info2/?utm_source=eowf&utm_medium=popup&utm_campaign=wordbook" target="_blank"> <img src="/content/img/tango_btn.png" alt="試してみる" width="142" height="37" /></a></p></div>';
          $('.dialog_memo_f').append(dialog_memo_hopup);
      },
      buttons: {
        "保存": function() {
            //クリアボタンの吹き出しを削除
            $(".fukidashi_memo").removeClass('dialog_memo_clear_hopup');
            //保存ボタンの吹き出しを挿入
            $(".fukidashi_memo").addClass('dialog_memo_save_hopup');
            //ホップアップを閉じる
            hopup_close_Btn();
        },
        "クリア": function() {
            //保存ボタンの吹き出しを削除
            $(".fukidashi_memo").removeClass('dialog_memo_save_hopup');
            //クリアボタンの吹き出しを挿入
            $(".fukidashi_memo").addClass('dialog_memo_clear_hopup');
            //ホップアップを閉じる
            hopup_close_Btn();
      },
        "キャンセル": function() {
          $(this).dialog("close");
        }
      }
    });
  });
  $(document).on('click', '.word_dialog_row', function(e){
    if($(this).is(':checked')){
      $('#word_dialog_free').val($('#word_dialog_free').val()+$(this)[0].nextSibling.nodeValue+'\n');
    }
  });
  $(".lefttable table").resizableColumns();
});


//2014.10.28 EOWPF-56 制限機能処理
//単語帳のメモ帳ダイアログ クローズ処理 制限版
function hopup_close_Btn(){
    //一旦非表示
    $('.fukidashi').hide();
    //該当表示
    $('.ui-button').next('.fukidashi').show();
    $('.closeBtn').on({
        'click': function(){
            fuki_hide();
        },
        'mouseover': function(){
            $(this).css('cursor','pointer');
        },
        'mouseout': function(){
            $(this).css('cursor','default');
        }
    });

    $('.myTT').on({
        'click': function(){
            fuki_hide();
        }
    });
}

//2014.10.28 EOWPF-56 制限機能処理
//単語帳のメモ帳ダイアログ クローズ処理 制限版
function fuki_hide(){
    $('.fukidashi').hide();
}





function show_test(){
  $('#word_dialog_text').html(tests[testPageNo]);
  var back = $('.ui-dialog-buttonpane').find('button:eq(0)');
  if(testPageNo == 0){
    back.addClass('ui-state-disabled');
  }else{
    back.removeClass('ui-state-disabled');
  }
  var next = $('.ui-dialog-buttonpane').find('button:eq(1)');
  if(testPageNo == tests.length - 1){
    next.addClass('ui-state-disabled');
  }else{
    next.removeClass('ui-state-disabled');
  }
  if(testPageNo % 2 == 0){
    $('.ui-dialog-buttonpane').find('button:eq(1)').find('span').text("意味");
  }else{
    $('.ui-dialog-buttonpane').find('button:eq(1)').find('span').text("次へ");
  }
  next.focus();
  $('.word_dialog_num').text((parseInt(testPageNo/2)+1) + ' 問 / ' + tests.length/2 + ' 問中');
}
function change_test_page(num){
  if(testPageNo + num >= 0 && testPageNo + num <= tests.length - 1){
    testPageNo += num;
    show_test();
  }
}
function normalize_desc(desc){
  var div = $("<div/>").addClass("tmpdesc").css('display','none');
  div.html(desc);
  $("body").append(div);
  $(".tmpdesc span").each(function(){
    if($(this).attr('class') == "ls_normal" && $(this).text() == "音声を聞く"){
      $(this).parent().remove();
    }else if($(this).attr('class') == "exp" || $(this).attr('class') == "sound"){
      // 音声、全文表示削除
      $(this).remove();
    }
  });
  desc = $(".tmpdesc").html();
  $(".tmpdesc").remove();
  return desc;
}
//タグ関連付け
function add_tag(td, wordBkId, tagId){
  $.getJSON(JSON_URI+'wordbook/addWordbookTag', {'wordType': wordType, 'wordBkId': wordBkId, 'tagId': tagId}, function(json){
    if(json.ret == 0){
      td.append(
        '<span class="tag"><a id="js_id_'+wordBkId+'_'+tagId+'" class="js_tag_unset">'+
        '<img src="'+IMG_URI+'word_xmark_off.png" alt="このタグを解除します" title="このタグを解除します" width="11" height="11" />'+
        '</a>'+$('#js_tagtxt_'+tagId).text()+'</span>'
      );
      if(json.count < 10){
        td.find('.js_tag_assign').css('display', 'inline');
      }else{
        td.find('.js_tag_assign').css('display', 'none');
      }
    }else{
      switch(json.ret){
        case -4:
          popup(-4, 'このタグはすでに付与されています');break;
        case -5:
          td.find('.js_tag_assign').css('display', 'none');
          popup(-5, '１つの項目に付与できるタグの数は10件までです');break;
        default:
          dialogs(json.ret);break;
      }
    }
  });
}
//タグ追加
function new_tag(){
  var tag = $('input.js_tag_field').val();
  tag = tag.replace(/^[ 　]*/g, "").replace(/[ 　]*$/g, "").replace(/[\n]*$/g, "").replace(/[\r\n]*$/g, "");
  if (tag.length == 0) {
    $('input.js_tag_field').val("");
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
  $.getJSON(JSON_URI+'wordbook/addTag', {'wordType': wordType, 'tag': tag}, function(json){
    if(json.ret == 0){
      var newtags = new Array();
      newtags[0] = json.tagId;
      for(var i=0;i<tags.length;i++){newtags[i+1] = tags[i];}
      tags = newtags;
      var newtags2 = new Array();
      newtags2[0] = tag;
      for(var i=0;i<tags_text.length;i++){newtags2[i+1] = tags_text[i];}
      tags_text = newtags2;
      var tags_html = '';
      for(var i=0;i<tags.length;i++){
        tags_html += i %2!=0 ? '<tr class="grey" onmouseover="this.className=\'on\'" onmouseout="this.className=\'grey\'">' : '<tr class="off" onmouseover="this.className=\'on\'" onmouseout="this.className=\'off\'">';
        tags_html += '<td><div><a id="js_tagid_'+tags[i]+'" class="js_tag_list"><img src="'+IMG_URI+'word_tagmark.gif" alt="ドラッグできます" title="ドラッグできます" width="15" height="15" /></a>';
        tags_html += '<a id="js_tagtxt_'+tags[i]+'" class="js_tagtxt_list" href="/wordbook/'+(wordType == 1 ? 'ej' : 'je')+'?tag='+tags[i]+'">';
        tags_html += escapeHTML(tags_text[i]);
        tags_html += '</a></div></td>';
        tags_html += '<td align="right"><a href="" id="tag_'+tags[i]+'" class="del_tag"><img src="'+IMG_URI+'word_xmark_off.png" alt="このタグを削除します" title="このタグを削除します" width="11" height="11" /></a></td>';
        tags_html += '</tr>';
      }
      $("#js_tag_list_begin ~ tr").remove();
      $('div.righttable #js_tag_list_begin').after(tags_html);
      $('#tag_add').val("");
    }else{
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
// 矢印を利用するページ移動
var PAGE_CNT = "1";
var isPgFlg = false;
function changePage(act) {
  var pgNo = parseInt(document.forms["fmManage"].page.value);
  if (false == isPgFlg) {
    if (act == "back" && 0 < pgNo) {
      if (1 == pgNo) {
//        return false;
      } else {
        goPage(pgNo-1);
        isPgFlg = true;
      }
    } else if (act == "next" && parseInt(PAGE_CNT) > pgNo) {
      goPage(pgNo+1);
      isPgFlg = true;
    } else {
//      return false;
    }
  } else {
//    return false;
  }
};

