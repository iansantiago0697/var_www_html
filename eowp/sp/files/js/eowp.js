var WIKI_URL_EJ = "https://en.wikipedia.org/w/index.php?search=";
var WIKI_URL_JE = "https://ja.wikipedia.org/w/index.php?search=";
// var YAHOO_URL_EJ = "https://search.yahoo.com/search";
// var YAHOO_URL_JE = "https://search.yahoo.co.jp/search";
var GOOGLE_URL_EJ = "https://www.google.com/search";
var GOOGLE_URL_JE = "https://www.google.co.jp/search";
var SOUND_URL = "https://cdn2.alc.co.jp/eowp/sound/";
var REF_SEARCH = "ph";
var REF_HK = "hkph";
var REF_SP = "spph";
var REF_WL = "wlph";
var REF_EX = "exph";
var REF_REI = "stph";
var REF_HISTORY = "whph";
var REF_WORDBK = "vlph";
var REF_SEARCH_KWIC = "kw";
var SUGGEST_LIMIT_BYTE;
var SUGGEST_CNT = "5";
var SUGGEST_INTERVAL = 200;
var screen_height;
var page = 2;
var search_text = "";
var candidateList = [];
var suggest_timer = null;
var focusFlg = false;
function js_eowp() {
  //キャッシュ無効化（Android対応）
  $.ajaxSetup({ cache: false });
  setTimeout(scrollTo, 100, 0, 1);
  //インクリメンタル
  if(obj=document.getElementById('q')){
    search_text = obj.value;
    if (suggest_timer) clearTimeout(suggest_timer);
    suggest_timer = setTimeout("suggest()", SUGGEST_INTERVAL);

    if (search_text != '') {
      $(".del_bt").attr("style","display:block");
    }
    $(".del_bt").click(function(){
//    $(".del_bt").bind("touchstart", function(){
      $("#q").val('');
      $(".del_bt").attr("style","display:none");
      document.getElementById('q').focus();
      return false;
    });
    obj.onfocus=function(){
      focusFlg = true;
      if (suggest_timer) clearTimeout(suggest_timer);
      suggest_timer = setTimeout("suggest()", SUGGEST_INTERVAL);
    }
    obj.onblur=function(){
      focusFlg = false;
//      if (suggest_timer) clearTimeout(suggest_timer);
//      suggest_timer = null;
      //インクリメンタルを閉じる
      setTimeout("close_inc()",1000);
    }
  }
  label_icon();
  show_refVocabLink();
  screen_height = document.body.clientHeight;
}
//インクリメンタル
function suggest() {
  if (!focusFlg) {
    search_text = this.value;
    if (suggest_timer) clearTimeout(suggest_timer);
    suggest_timer = null;
    return;
  }
  var text = document.getElementById('q').value;
  if(text == ''){
    $(".del_bt").attr("style","display:none");
  } else {
    $(".del_bt").attr("style","display:block");
  }
  if (settings.suggest == "1") {
    if (text != search_text) {
      search_text = text;
      candidateList = [];
      if(text == '' || strLength(text) > SUGGEST_LIMIT_BYTE){
        close_inc();
      } else {
        getJSON_nojq(JSON_URI+'suggest', '?q='+encodeURIComponent(text)+'&cnt='+SUGGEST_CNT, function(json){
          if(json.ret == 0){
            var js_inc = document.getElementById('js_inc');
            js_inc.innerHTML ='';
            var html = ''
            if(json.list.length == 0){
              close_inc();
            }else{
//              html += '<table style="width: 100%;">';
              for (var i in json.list){
                var word = decodeURIComponent(json.list[i].word);
                candidateList.push(word);
//                js_inc.innerHTML += '<a onclick="put_form(\''+encodeURL(word)+'\')">'+word+'</a>';
//                html += '<tr><td><button style="width: 100%;border: 0 none;" onclick="put_form(\''+encodeURL(word)+'\')">'+word+'</button></td></tr>';
                html += '<button onclick="put_form(\''+encodeURL(word)+'\')"><div class="js_inc_item">'+escapeHTML(word)+'</div></button>';
              }
//              html += '</table>';
              js_inc.innerHTML =html;
              js_inc.parentNode.style.zIndex = 4;
              js_inc.style.zIndex = 1;
//              if(document.getElementById('q').value == text){
              if(search_text == text){
                js_inc.style.display = 'block';
              }
            }
          }
        });
      }
    }
  } else {
    search_text = text;
  }
  if (suggest_timer) clearTimeout(suggest_timer);
  suggest_timer = setTimeout("suggest()", SUGGEST_INTERVAL);
}
//インクリメンタル候補をフォームに投入
function put_form(word){
//  document.getElementById('q').value = document.getElementById('js_inc').childNodes[id].innerHTML;
//  document.getElementById('q').value = candidateList[id];
  document.getElementById('q').value = decodeURL(word);
//  close_inc();
  goSearch('fm1');
}
//インクリメンタルを閉じる
function close_inc(){
  if(obj=document.getElementById('js_inc'))obj.style.display = 'none';
}
//拡張検索パネルを閉じる
function close_mag() {
  document.getElementById('blackout').style.display="block";
  if(obj=document.getElementById('js_mag')){
    document.getElementById('js_mag').style.display="none";
  }
}
//拡張検索パネルを開く
function toggle_mag(id, kind, q) {
  if(obj=document.getElementById('js_mag')){
    document.getElementById('bt_wikipedia').setAttribute('onclick', 'return goService(1,\"'+kind+'\",\"'+q+'\");');
    // document.getElementById('bt_yahoo').setAttribute('onclick', 'return goService(2,\"'+kind+'\",\"'+q+'\");');
    document.getElementById('bt_google').setAttribute('onclick', 'return goService(3,\"'+kind+'\",\"'+q+'\");');
    document.getElementById('bt_googlebks').setAttribute('onclick', 'return goService(4,\"'+kind+'\",\"'+q+'\");');
    document.getElementById('bt_googleisch').setAttribute('onclick', 'return goService(5,\"'+kind+'\",\"'+q+'\");');
    var whole_h = document.body.clientHeight;
    document.getElementById('js_bg_box').style.height = whole_h+"px";
    document.getElementById('js_bg_box2').style.height = whole_h+"px";
    document.getElementById('js_mag').style.display="block";
    document.getElementById('js_modal').style.marginTop = document.body.scrollTop+20+"px";
  }
  if(navigator.userAgent.indexOf('Android') > -1){
    $('.sound > object').css('display', 'none');
    document.getElementById('blackout').style.display="none";
  }
  return false;
}
//単語帳へ追加
function add_book(index, word){
  var wordType;
  var decodeWord = decodeURL(word);
  if(document.body.className.indexOf('js_ej') > -1){wordType = 1;}else{wordType = 2;}
  if (decodeWord.indexOf('〔カタカナ発音〕') > -1) {
    popup(-3, 'カタカナ発音を示す見出し語は、単語帳登録できません');
    return false;
  }
  if (decodeWord.length > 100) {
    popup(-3, '100文字以上の見出し語は、単語帳登録できません');
    return false;
  }
  lock_screen();
  var eleAddBook = document.getElementById('add_book_'+index);
//  var onClickText = eleAddBook.getAttribute('onclick');
//  eleAddBook.setAttribute('onclick', 'return false;');
  getJSON_nojq(JSON_URI+'wordbook/addWordbook', '?wordType='+wordType+'&word='+word, function(json){
    if(json.ret == 0){
      document.getElementById('added_book_'+index).style.display="inline";
      eleAddBook.style.display="none";
    }else{
//      eleAddBook.setAttribute('onclick', onClickText);
    }
    unlock_screen();
    dialogs_addbook(json.ret, json.count);
  });
  return false;
}
//画面をロックする
function lock_screen(){
//  var whole_h = document.body.clientHeight;
  var whole_h = screen_height;
  var element = document.createElement('div');
  element.id = "lock_screen";
  element.innerHTML = '<div class="bg_box2" style="height: '+whole_h+'px;"></div>';
  document.body.appendChild(element);
}
function unlock_screen(){
  document.body.removeChild(document.getElementById('lock_screen'));
}
//続きを見る
function add_search(){
  lock_screen();
  document.getElementById('searchnext').style.display="none";
  document.getElementById('searchloading').style.display="block";
  var param = '';
  var ref = REF_SEARCH + page;
  if (document.f1.fn.value != "") {
    var fns = getRoute(document.f1.fn.value);
    if (fns[0].indexOf(REF_REI) == 0) {
      ref = REF_REI + page;
    }
    if (fns.length > 1) {
      param = '?q=' + encodeURL(document.f1.q.value) + '&ref=' + ref + '&fn=' + fns[1] + '&pg=' + page;
    } else {
      param = '?q=' + encodeURL(document.f1.q.value) + '&ref=' + ref + '&pg=' + page;
    }
  } else {
    param = '?q=' + encodeURL(document.f1.q.value) + '&ref=' + ref + '&pg=' + page;
  }
  getJSON_nojq(SP_JSON_URI+'search', param, function(json){
    if(json.ret == 0){
      page++;
      var result = document.createElement('div');
      for (var i in json.list){ result.innerHTML += json.list[i]; }
      document.getElementById('resultlist').insertBefore(result, document.getElementById('loop_end'));
      if(page <= json.page) {
        document.getElementById('searchnext').style.display="block";
      }
      label_icon();
      show_refVocabLink();
      unlock_screen();
    }else{
      unlock_screen();
      dialogs(json.ret);
    }
    document.getElementById('searchloading').style.display="none";
    screen_height = document.body.clientHeight;
  });
  return false;
}
//Ajaxリクエスト
function getJSON_nojq(url, param, callback){
  var request = null;
  if (window.ActiveXObject){request = new ActiveXObject("Microsoft.XMLHTTP");
  }else{
    if (window.XMLHttpRequest){
      request = new XMLHttpRequest();
    }else{request = null;}
  }
  if(request){
    request.open('GET', url+param, true);
    request.setRequestHeader('If-Modified-Since', '01 Jan 1970 00:00:00 GMT');
    request.onreadystatechange = function(){
      if (request.readyState == 4){ 
        if (request.status == 200 | request.status == 0){
          var json = eval( "(" + request.responseText + ")" );
          callback(json);
        }
        request = null;
      }
    };
    request.send(null);
  }
}
//ダイアログメッセージ分岐
function dialogs(ret){
  switch(ret){
    case 0:
      popup(ret, '設定を完了しました');break;
    case -1:
      popup(ret, 'セッションが無効になっています');break;
    case -2:
      document.location.href = "/expiration";break;
    case -3:
      popup(ret, 'エラー：文字数オーバーです');break;
    case -4:
      popup(ret, 'エラー：登録済みです');break;
    case -5:
      popup(ret, 'エラー：登録数オーバーです');break;
    case -8:
    case -9:
      document.location.href = "/error.html";break;
  }
}
//単語帳追加用メッセージ分岐
function dialogs_addbook(ret,count){
  switch(ret){
    case 0:
      if (count > 1) {
        popup(0, 'この見出し項目を単語帳に登録したのは'+count+'回目です');
      }
      break;
    case -3:
      popup(-3, '100文字以上の見出し語は、単語帳登録できません');break;
    case -4:
      popup(-4, 'この見出し語はすでに登録されています');break;
    case -5:
      popup(-5, '単語帳の登録件数が上限に達しているため、登録することができません');break;
    default:
      dialogs(ret);break;
  }
}
//ダイアログを開く
function popup(ret, text){
  if(obj=document.getElementById('js_p_tag2')){
    if(obj.style.display == "block"){
      alert(text);
      if (ret == -1) document.location.href = LOGIN_URI;
      return;
    }
  }
//  var whole_h = document.body.clientHeight;
  var whole_h = screen_height;
  var element = document.createElement('div');
  element.id = "alert";
  element.innerHTML =
    '<div class="bg_box" style="height: '+whole_h+'px;"></div>'+
    '<div class="bg_box2" style="height: '+whole_h+'px;"><div class="modal">'+
      '<div class="right close">'+
        '<img onclick="close_popup('+ret+')" src="' + IMG_URI + 'bt_del.png" width="40" height="40" alt="閉じる" title="閉じる" />'+
      '</div>'+
      '<p class="clear title center"></p>'+
      '<p class="center">'+text+'</p>'+
    '</div></div>';
  document.body.appendChild(element);
  $(".modal").css('margin-top', document.body.scrollTop+20+"px");
  if(navigator.userAgent.indexOf('Android') > -1){
    $('.sound > object').css('display', 'none');
    $('#blackout').css('display', 'none');
  }
}
//ダイアログを閉じる
function close_popup(ret){
  $('#blackout').css('display', 'block');
  document.body.removeChild(document.getElementById('alert'));
  if (ret == -1) document.location.href = LOGIN_URI;
  return false;
}
//バイト数カウント
function strLength(text) {
  var len = 0;
  var text = escape(text);
  for(i = 0; i < text.length; i++, len++){
    if(text.charAt(i) == "%"){
      if(text.charAt(++i) == "u"){
        i += 3;
        len += 2;
      }
      i++;
    }
  }
  return len;
}


$(function(){
    $('#window_fixed_wordp').exFlexFixed({ container : 'body'});
});

