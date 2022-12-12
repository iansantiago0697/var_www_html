var suggestBase = null;
var cookies = new Array(17);
var fzcookies = new Array(2);
var COOKIE_NAME = "eowpfuser";
var COOKIE_FZ_NAME = "eowpffz";
var COOKIE_FZ_EXPIRED_DAYS = 365;
var REF_HIST = 'whn';
var REF_WORDBK = 'vln';
var WINDOW_NAME = "eowpf";
var WINDOW_NAME_SMALL = "eowpfs";
var WINDOW_NAME_APP = "eowpfapp";
var WINDOW_NAME_OPTION = "eowpf_opt";
var WINDOW_NAME_OPTION_SMALL = "eowpfs_opt";
var WINDOW_NAME_EOWPFKC = "eowpfkc";
var JSON_URI="/json/";
var IMG_URI = "/content/img/";
var GUIDE_URI = "/guide/";
var VOA_URI = "/voa";
var VOA_EXAMPLE_URI = "/voa/example";
var KWIC_URI = "/kc/kwic";
var COLLOCATION_URI = "/kc/collocation";
var FZ_URI = "/fz/search";
var CLIPBOARD_SWF = "/content/js/ZeroClipboard.swf";
var WIKI_URL_EJ = "https://en.wikipedia.org/w/index.php?search=";
var WIKI_URL_JE = "https://ja.wikipedia.org/w/index.php?search=";
// var YAHOO_URL_EJ = "https://search.yahoo.com/search";
// var YAHOO_URL_JE = "https://search.yahoo.co.jp/search";
var GOOGLE_URL_EJ = "https://www.google.com/search";
var GOOGLE_URL_JE = "https://www.google.co.jp/search";
// var GOOGLE_SCHOLAR_URL = "https://scholar.google.co.jp/scholar";
var SOUND_URL = "https://cdn2.alc.co.jp/eowp/sound/";
var REF_HK = "hk";
var REF_SP = "sp";
var REF_WL = "wl";
var REF_EX = "ex";
var REF_REI = "st";
var REF_SEARCH = "";
var REF_SEARCH_KWIC = "kw";
var REF_SEARCH_COLLOCATION = "cl";
var REF_SEARCH_KWIC_R = "btk";
var REF_SEARCH_COLLOCATION_R = "btc";
var TEXTOBOX_STATUS = "0";
var DBLCLICK_STATUS = "1";
var HREF_STATUS = "1";
var SUGGEST_LIMIT_BYTE;
var extensionFlg;
var shareFlg = false;
var shareUrl;
var clip;
function js_eowpf(){
  normalizeCookie();
  if(obj=document.getElementById('q')){
    ini_suggest();
    moveFocus();
  }
  if (fzcookies[1] == "1") {
    $('.vague_box label').click();
  }
  if(obj=document.getElementById('js_search_hst'))getList(JSON_URI+'history/getLatestHistory', 10, 'js_search_hst', '検索履歴取得に失敗しました');
  if(obj=document.getElementById('js_search_hst_s'))getList(JSON_URI+'history/getLatestHistory', 5, 'js_search_hst_s', '検索履歴取得[s]に失敗しました');
  if(obj=document.getElementById('js_word_hst'))getList(JSON_URI+'wordbook/getLatestWordbook', 10, 'js_word_hst', '単語帳登録履歴取得に失敗しました');
  if(obj=document.getElementById('js_open_cond'))obj.onclick=function(){toggle_n('cond_w');toggle_v('tabselect');return false;}
//  if(obj=document.getElementById('js_close_cond'))obj.onclick=function(){toggle_n('cond_w');toggle_v('tabselect');return false;}
  if(obj=document.getElementById('js_open_cond_top'))obj.onclick=function(){toggle_n('cond_w');toggle_v('tabselect');return false;}
  if(obj=document.getElementById('js_open_cond'))obj.onclick=function(){toggle_n('cond_w');toggle_v('tabselect'); $('body').addClass('hidden'); return false;}
  if(obj=document.getElementById('js_close_cond'))obj.onclick=function(){toggle_n('cond_w');toggle_v('tabselect'); $('body').removeClass('hidden'); return false;}
  if(obj=document.getElementById('q_iw1'))obj.onfocus=function(){
    if(this.value=='単語１')this.value=''; this.className='option_textfield2 marginright5';
  }
  if(obj=document.getElementById('q_iw1'))obj.onblur=function(){
    if(this.value==''){this.value='単語１'; this.className='option_textfield2 marginright5 color999'};
  }
  if(obj=document.getElementById('q_iw2'))obj.onfocus=function(){
    if(this.value=='単語２')this.value=''; this.className='option_textfield2 marginleft5';
  }
  if(obj=document.getElementById('q_iw2'))obj.onblur=function(){
    if(this.value==''){this.value='単語２'; this.className='option_textfield2 marginleft5 color999'};
  }
  if(obj=document.getElementById('tag_add'))obj.onfocus=function(){
    if(this.value=='新しいタグを追加')this.value=''; this.className='option_textfield2 marginleft5 js_tag_field';
  }
  if(obj=document.getElementById('tag_add'))obj.onblur=function(){
    if(this.value==''){this.value='新しいタグを追加'; this.className='option_textfield2 marginleft5 color999 js_tag_field'};
  }
  if(obj=document.getElementById('tag_not_add'))obj.onfocus=function(){
    if(this.value=='新しいタグを追加')this.value=''; this.className='option_textfield2 marginleft5 js_tag_field';
  }
  if(obj=document.getElementById('tag_not_add'))obj.onblur=function(){
    if(this.value==''){this.value='新しいタグを追加'; this.className='option_textfield2 marginleft5 color999 js_tag_field'};
  }
  document.body.onclick=function(){
    close_mag(open_mag);
  }
  //拡張検索プラス
  extensionFlg=cookies[10];
}
//非表示デフォルトのトグル
function toggle_n(elm){
  if(obj=document.getElementById(elm)) obj.style.display="block" == obj.style.display ? "none" : "block";
  if(obj=document.getElementById('overlay')) obj.style.display="block" == obj.style.display ? "none" : "block";
}
//拡張検索の非表示デフォルトのトグル
function toggle_n_mag(elm){
  if(obj=document.getElementById(elm)) obj.style.display="block" == obj.style.display ? "none" : "block";
}
//表示デフォルトのトグル
function toggle_v(elm){
  if(obj=document.getElementById(elm)) obj.style.display="none" == obj.style.display ? "block" : "none";
}
var open_mag = null;
var opening = false;
//拡張検索パネルを閉じる
function close_mag(mag) {
  if(mag){
    toggle_n_mag(mag);
    var obj = document.getElementById(mag).parentNode;
    obj.style.zIndex=3 == obj.style.zIndex ? 2 : 3;
    if(!opening)open_mag = null;
    opening = false;
  }
  return false;
}
//拡張検索パネルを開く
function toggle_mag(id, kind, q) {
  if(id != open_mag){
    close_mag(open_mag);
    var tooltip = document.getElementById(id);
    tooltip.style.display = 'block';
    if (tooltip.innerHTML.length == 0) {
      if (kind == "EJ") {
        tooltip.innerHTML = 
          '<a href="" onclick=\'return goService(3,\"'+kind+'\",\"'+q+'\");\'>Wikipediaで検索</a>' +
          // '<a href="" onclick=\'return goService(4,\"'+kind+'\",\"'+q+'\");\'>Yahoo!で検索</a>' +
          '<a href="" onclick=\'return goService(5,\"'+kind+'\",\"'+q+'\");\'>Googleで検索</a>' +
          '<a href="" onclick=\'return goService(6,\"'+kind+'\",\"'+q+'\");\'>Google Books で検索</a>' +
          '<a href="" onclick=\'return goService(7,\"'+kind+'\",\"'+q+'\");\' class="last">Google画像で検索</a>';
      } else {
        tooltip.innerHTML = '<a href="" onclick=\'return goService(3,\"'+kind+'\",\"'+q+'\");\'>Wikipediaで検索</a>' +
          // '<a href="" onclick=\'return goService(4,\"'+kind+'\",\"'+q+'\");\'>Yahoo!で検索</a>' +
          '<a href="" onclick=\'return goService(5,\"'+kind+'\",\"'+q+'\");\'>Googleで検索</a>' +
          '<a href="" onclick=\'return goService(6,\"'+kind+'\",\"'+q+'\");\'>Google Books で検索</a>' +
          '<a href="" onclick=\'return goService(7,\"'+kind+'\",\"'+q+'\");\' class="last">Google 画像で検索</a>';
      }
    }
    toggle_v(id);
    opening = true;
    open_mag = id;
  }
  return false;
}
//キーワード入力補助初期化
function ini_suggest(){
  if (cookies[8] != null && cookies[8] == '1') {
    if (suggestBase == null) {
      suggestBase = new Suggest.Local(document.getElementById('q'), 'js_inc', ['']);
    }
  }
}
//キーワード入力補助OFF
function off_inc(){
  getJSON_nojq(JSON_URI+'setUserSetting', '?param=suggest&value=0', function(json){
    if(json.ret == 0){
      setCookieValue(8, 0);
      if(obj=document.getElementById('assist2'))obj.checked = true;
      dialogs(json.ret);
    }else{ dialogs(json.ret, 'キーワード入力補助設定保存失敗'); }
  });
  return false;
}
//拡張検索プラスOFF
function off_extension(){
  getJSON_nojq(JSON_URI+'setUserSetting', '?param=srchExtension&value=0', function(json){
    if(json.ret == 0){
      setCookieValue(10, 0);
      extensionFlg="0";
    }else{ dialogs(json.ret, '拡張検索プラス設定保存失敗'); }
  });
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
  var eleAddBook = document.getElementById('add_book_'+index);
  var onClickText = eleAddBook.getAttribute('onclick');
  eleAddBook.setAttribute('onclick', 'return false;');
  getJSON_nojq(JSON_URI+'wordbook/addWordbook', '?wordType='+wordType+'&word='+word+'&count=10', function(json){
    if(json.ret == 0){
      if (document.getElementById('js_word_hst')) {
        showList(json.list, 'js_word_hst');
      }
      document.getElementById('added_book_'+index).style.display="inline";
      eleAddBook.style.display="none";
    }else{
      eleAddBook.setAttribute('onclick', onClickText);
    }
    dialogs_addbook(json.ret, json.count, '単語帳登録失敗');
  });
  return false;
}
//履歴リストを取得
function getList(url, count, document_id, message){
  getJSON_nojq(url, '?count='+count, function(json){
    if(json.ret == 0){ showList(json.list, document_id); setLeftHight(); $(document.body).trigger('sticky_kit:recalc');}
    else {
      // dialogs(json.ret, message);
      var element = document.getElementById(document_id);
      element.innerHTML = '[' + message + '(' + json.ret + ')]';
    }
  });
}
//履歴リスト表示
function showList(list, document_id){
  document.getElementById(document_id).innerHTML ='';
  for (var i in list){
    var element = document.createElement('li');
    var ref = '';
    if (document_id == 'js_word_hst') {
      element.innerHTML = '<a href="'+SEARCH_URI+'?q='+encodeURL(list[i].word)+'&ref='+REF_WORDBK+'">'+escapeHTML(list[i].word)+'</a>';
    } else {
      if (list[i].service && list[i].service == 1) {
        var url = FZ_URI+'?q='+encodeURL(list[i].word)+'&ref='+REF_HIST;
        if (document_id == 'js_search_hst_s') {
          element.innerHTML = '<a href="'+url+'" onclick=\'return openWindow(\"'+url+'\", \"'+WINDOW_NAME+'\")\'><img src="'+IMG_URI+'vague_icon.png" alt="あいまい検索アイコン" /> '+escapeHTML(list[i].word)+'</a>';
        } else {
          element.innerHTML = '<span class="icon"><img src="'+IMG_URI+'vague_icon.png" alt="あいまい検索アイコン" title="あいまい検索アイコン" /></span><a href="'+url+'">'+escapeHTML(list[i].word)+'</a>';
        }
      } else {
        element.innerHTML = '<a href="'+SEARCH_URI+'?q='+encodeURL(list[i].word)+'&ref='+REF_HIST+'">'+escapeHTML(list[i].word)+'</a>';
      }
    }
    document.getElementById(document_id).appendChild(element); 
  }
}
//続きを見る
function search_next(pg){
  document.getElementById('searchnext').style.display="none";
  document.getElementById('searchloading').style.display="block";
  var param = '';
  var ref = REF_SEARCH + pg;
  if (document.f1.fn.value != "") {
    var fns = getRoute(document.f1.fn.value);
    if (fns[0].indexOf(REF_REI) == 0) {
      ref = REF_REI + pg;
    }
    if (fns.length > 1) {
      param = '?q=' + encodeURL(document.f1.q.value) + '&ref=' + ref + '&fn=' + fns[1] + '&pg=' + pg;
    } else {
      param = '?q=' + encodeURL(document.f1.q.value) + '&ref=' + ref + '&pg=' + pg;
    }
  } else {
    param = '?q=' + encodeURL(document.f1.q.value) + '&ref=' + ref + '&pg=' + pg;
  }
  getJSON_nojq(JSON_URI+'search', param, function(json){
    if(json.ret == 0){
      var resultlist = document.getElementById('resultlist');
      var totop = document.getElementById('totop');
      var element = document.createElement('div');
      element.setAttribute('class', 'chrome_10results');
      resultlist.insertBefore(element, totop);
      for (var i in json.list){
        element = document.createElement('div');
        element.setAttribute('class', 'list');
        element.innerHTML = json.list[i];
        resultlist.insertBefore(element, totop);
      }
      if(pg < json.page) {
        document.getElementById('searchnext').style.display="block";
        document.getElementById('gosearchnext').setAttribute('onclick', 'return search_next('+(pg+1)+');');
      }
      label_icon();
      show_refVocabLink();
    }else{
      dialogs(json.ret, '検索次ページ取得失敗');
    }
    document.getElementById('searchloading').style.display="none";
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
function dialogs(ret, message){
  switch(ret){
    case 0:
      popup(ret, '設定を完了しました');break;
    case -1:
      popup(ret, 'セッションが無効になっています。OKをクリックするとログインフォームに移動します');break;
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
      popup(ret, 'エラー：' + message + '(' + ret + ')');break;
    default:
      popup(ret, 'エラー：' + message + '(null)');break;
  }
}
//単語帳追加用メッセージ分岐
function dialogs_addbook(ret,count, message){
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
      dialogs(ret, message);break;
  }
}
//環境設定用メッセージ分岐
function dialogs_setting(ret, message){
  switch(ret){
    case 0:
      popup(0, '設定を保存しました');break;
    default:
      dialogs(ret, message);break;
  }
}
//環境設定用(初期化)メッセージ分岐
function dialogs_initsetting(ret, message){
  switch(ret){
    case 0:
      popup(0, '初期設定に戻して保存しました');break;
    default:
      dialogs(ret, message);break;
  }
}
//画面をロックする
function lock_screen(){
  var element = document.createElement('div');
  element.id = "lock_screen";
  element.innerHTML = '<iframe scrolling="no" frameborder="0" id="shim"> </iframe>';
  document.body.appendChild(element);
  element.style.display="block";
}
//ダイアログを開く
function popup(ret, text){
  var element = document.createElement('div');
  element.id = "alert";
  element.innerHTML =
    '<iframe scrolling="no" frameborder="0" id="shim"> </iframe>'+
    '<div id="black"> </div>'+
    '<div id="alert2"><div class="inner">'+
      '<span class="alertmsg">'+text+'</span>'+
      '<div class="margintop20"><a href="" id="alertbtn" onclick="return close_popup('+ret+')"><img src="' + IMG_URI + 'alert_button.gif" alt="OK" title="OK" width="79" height="20" /></a></div>'+
    '</div></div>';
  document.body.appendChild(element);
  element.style.display="block";
  document.getElementById('alertbtn').focus();
}
//ダイアログを閉じる
function close_popup(ret){
  document.body.removeChild(document.getElementById('alert'));
  if (ret == -1) {
    if (window.name == WINDOW_NAME_APP) {
      document.location.href = "/login?url=" + encodeURL("/chrome");
    } else if (window.name == WINDOW_NAME_SMALL || window.name == WINDOW_NAME_OPTION_SMALL) {
      document.location.href = "/login?url=" + encodeURL("/small");
    } else {
      document.location.href = "/login";
    }
  }
  return false;
}
//別ウィンドウを開く
function openWindow(url, target) {
  var newWindow;
  var name = WINDOW_NAME;
  if (target) name = target;
  if (name == WINDOW_NAME_SMALL || name == WINDOW_NAME_OPTION_SMALL) {
//    newWindow = window.open(url,name,'width=700,height=800,menubar=yes,toolbar=yes,location=yes,scrollbars=yes,resizable=1');
//2013.12.02    newWindow = window.open(url,name,'dialog=yes,width=380,height=580,menubar=no,toolbar=no,location=no,scrollbars=yes,resizable=1');
    newWindow = window.open(url,name,'dialog=yes,width=380,height=580,menubar=no,toolbar=no,location=no,scrollbars=yes,resizable=1');
  } else if (WINDOW_NAME_OPTION == WINDOW_NAME_OPTION_SMALL && name == "_blank") {
//    newWindow = window.open(url,name,'width=700,height=800,menubar=yes,toolbar=yes,location=yes,scrollbars=yes,resizable=1');
//2013.12.02    newWindow = window.open(url,name,'dialog=yes,width=380,height=580,menubar=no,toolbar=no,location=no,scrollbars=yes,resizable=1');
    newWindow = window.open(url,name,'dialog=yes,width=380,height=580,menubar=no,toolbar=no,location=no,scrollbars=yes,resizable=1');
  } else {
    newWindow = window.open(url,name);
  }
  newWindow.focus();
  return false;
};
// Cookie正規化
function normalizeCookie() {
  var ck = getCookie(COOKIE_NAME);
  if (ck != "") {
    if (ck.substring(0, 1) == "\"") {
      ck = ck.substring(1);
      if (ck.substring(ck.length - 1) == "\"") ck = ck.substring(0,ck.length - 1);
    }
    var arr = ck.split(COOKIE_DELIM);
    for(i = 0; i < cookies.length; i++) {
      if (arr[i] != "undefined") { cookies[i] = arr[i];
	  } else { cookies[i] = ""; }
    }
  }
  if (cookies[1] != "0" && cookies[1] != "1" && cookies[1] != "2") cookies[1] = "0"; // フォントサイズ
  if (cookies[2] != "0" && cookies[2] != "1") cookies[2] = "0"; // 行間
  if (cookies[3] != "0" && cookies[3] != "1") cookies[3] = "0"; // フォント
  if (cookies[4] != "0" && cookies[4] != "1") cookies[4] = "0"; // 読みがな
  if (cookies[5] != "0" && cookies[5] != "1") cookies[5] = "1"; // ダブルクリック
  if (cookies[6] != "0" && cookies[6] != "1" && cookies[6] != "2") cookies[6] = "1"; // 参照ページウィンドウ
  if (cookies[7] != "0" && cookies[7] != "1" && cookies[7] != "2") cookies[7] = "0"; // 検索キーワード入力欄
  if (cookies[8] != "0" && cookies[8] != "1") cookies[8] = "1"; // キーワード入力補助
  if (cookies[9] != "0" && cookies[9] != "1" && cookies[9] != "2") cookies[9] = "2"; // 例文検索
  if (cookies[10] != "0" && cookies[10] != "1") cookies[10] = "1"; // 拡張検索プラス
  if (cookies[11] != "10" && cookies[11] != "20" && cookies[11] != "30" && cookies[11] != "50") cookies[11] = "50"; // 表示件数
  if (cookies[12] != "0" && cookies[12] != "1") cookies[12] = "1"; // 単語帳
  if (cookies[13] != "0" && cookies[13] != "1") cookies[13] = "1"; // 検索履歴
  if (cookies[14] == "") cookies[14] = "0"; // タイムゾーン
  if (cookies[15] != "0" && cookies[15] != "1") cookies[15] = "0"; // オートログイン
  
  ck = getCookie(COOKIE_FZ_NAME);
  if (ck != "") {
    if (ck.substring(0, 1) == "\"") {
      ck = ck.substring(1);
      if (ck.substring(ck.length - 1) == "\"") ck = ck.substring(0,ck.length - 1);
    }
    var arr = ck.split(COOKIE_DELIM);
    for(i = 0; i < fzcookies.length; i++) {
      if (arr[i] != "undefined") { fzcookies[i] = arr[i];
	  } else { fzcookies[i] = ""; }
    }
  }
  if (fzcookies[0] != "score" && fzcookies[0] != "match") fzcookies[0] = "score"; // ソート
  if (fzcookies[1] != "0" && fzcookies[1] != "1") fzcookies[1] = "0"; // あいまい検索フラグ
};
// Cookie書き込み
function setCookie() {
  var str = cookies[0];
  for(i = 1; i < cookies.length; i++) {
    str += COOKIE_DELIM + cookies[i];
  }
  var cookie = COOKIE_NAME + "=" + str;
  if (cookies[cookies.length-2] == "1") cookie += "; expires=" + cookies[cookies.length-1].replace("_", ",");
  if (COOKIE_DOMAIN != "") cookie += "; domain=" + COOKIE_DOMAIN;
  cookie += "; path=/;";
  document.cookie = cookie;
};
// Cookie値変更
function setCookieValue(idx, value){
  normalizeCookie();
  cookies[idx] = value;
  setCookie();
}
// Cookie(あいまい)書き込み
function setFzCookie() {
  var str = fzcookies[0];
  for(i = 1; i < fzcookies.length; i++) {
    str += COOKIE_DELIM + fzcookies[i];
  }
  var cookie = COOKIE_FZ_NAME + "=" + str;
  var date = new Date();
  date.setTime(date.getTime() + COOKIE_FZ_EXPIRED_DAYS * 24 * 60 * 60 * 1000);
  cookie += "; expires=" + date.toGMTString();
  if (COOKIE_DOMAIN != "") cookie += "; domain=" + COOKIE_DOMAIN;
  cookie += "; path=/;";
  document.cookie = cookie;
}
// jQuery
$(function(){
  // 共有URL生成
  $('.result_page').click(function(){
    $('.common_box').slideUp(200);
    $('.common_tab').removeClass('tab_open');
  });
  $('#common_wrap').click(function(){
    if (shareUrl) {
      if ($('.common_box').css('display') == 'none') {
        $('.common_box').slideDown(200);
        $('.common_tab').addClass('tab_open');
        $('#common_url').select();
      } else {
        $('.common_box').slideUp(200);
        $('.common_tab').removeClass('tab_open');
      }
      return false;
    }
    if (shareFlg) {
      return false;
    }
    shareFlg = true;
    var param = '?q=' + encodeURL(document.f1.q.value);
    if (document.f1.pg.value != "") param += '&pg=' + document.f1.pg.value;
    if (document.f1.exp.value != "") param += '&exp=' + document.f1.exp.value;
    if (document.f1.dn.value != "") param += '&dn=' + document.f1.dn.value;
    if (document.f1.dk.value != "") param += '&dk=' + document.f1.dk.value;
    if (document.f1.ref.value != "") param += '&ref=' + document.f1.ref.value;
    param += '&rei=' + cookies[9] + '&dc=' + cookies[11];
    param += '&callback=?';
    var url = "//" + SHARE_DOMAIN + "/shortenj.php" + param;
/*
    $.getJSON(url, function(json){
      $('.common_box').slideDown(200);
      $('.common_tab').addClass('tab_open');
      if(json){
        shareUrl = json.url;
        $('#common_url').val(shareUrl);
//        $('.common_box').slideDown(200);
//        $('.common_tab').addClass('tab_open');
        $('#common_url').select();
        $('#copy_url').zclip({
          path:CLIPBOARD_SWF,
          copy:shareUrl,
          afterCopy:function(){}
        });
      }else{
        $('#common_url').val("エラーが発生しました");
        shareFlg = false;
      }
    });
*/
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      timeout: 5000,
      url: url,
      success: function(json) {
        $('.common_box').slideDown(200);
        $('.common_tab').addClass('tab_open');
        if(json){
          shareUrl = json.url;
          $('#common_url').val(shareUrl);
//        $('.common_box').slideDown(200);
//        $('.common_tab').addClass('tab_open');
          $('#common_url').select();
          $('#copy_url').zclip({
            path:CLIPBOARD_SWF,
            copy:shareUrl,
            afterCopy:function(){}
          });
        }else{
          $('#common_url').val("エラーが発生しました");
          shareFlg = false;
        }
      },
      error: function(XMLHttpRequest, status, errorThrown) {
        $('.common_box').slideDown(200);
        $('.common_tab').addClass('tab_open');
        $('#common_url').val("エラーが発生しました");
        shareFlg = false;
      }
    });
    
    return false;
  });
/*
  ※.toggle(function, function)はjQuery1.9以降削除されているため
  $('.vague_box label').toggle(
    function () {
      $(this)
        .addClass('checked')
        .prev('input').attr('checked','checked');
    },
    function () {
      $(this)
        .removeClass('checked')
        .prev('input').removeAttr('checked');
    }
  );
*/
  $('.vague_box label').click(function() {
    if ($(this).attr('class') != 'checked') {
      $(this)
        .addClass('checked')
        .prev('input').prop('checked', true);
    } else {
      $(this)
        .removeClass('checked')
        .prev('input').prop('checked', false);
    }
  });
  

 $(document.getElementById('logo')).tooltip({
    items: "a, .vague_button",
    tooltipClass: "position_fixed",
    content: function() {
      var element = $(this);
      if(element.attr("title") == "小窓モード"){
        return "小窓モード";
      }else if(element.attr("title") == "検索履歴"){
        return "検索履歴";
      }else if(element.attr("title") == "単語帳"){
        return "単語帳";
      }else if(element.attr("title") == "ガイド"){
        return "ガイド";
      }else if(element.attr("title") == "環境設定"){
        return "環境設定";
      }
    },
    position: {
      my: "center top+15",
      at: "center bottom",
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
  
  $(document).tooltip({
    items: "a, .vague_button",
    tooltipClass: "position_fixed",
    content: function() {
      var element = $(this);
      if($(this).attr("class") == "vague_button"){
        return "ぴったりマッチがなくても類似した対訳（表現）が検索結果として表示されます。文章まるごとの入力もＯＫです！";
      }else if(element.attr("title") == "整列"){
        return "検索した結果を、前後で使われている単語が見やすいようキーワードを中心に配置して一覧表示します。";
      }else if(element.attr("title") == "頻度集計"){
        return "検索キーワードの前後でよく使われる単語を集計し、出現回数の多いものから順に前後３語目まで表示します。";
      }
    },
    position: {
      my: "right+40 top+15",
      at: "center bottom",
      collision: "none",
      using: function(position, feedback) {
        $(this).css(position);
        $("<div>")
          .addClass("arrow")
          .addClass("result_search")
          .addClass(feedback.vertical)
          .addClass(feedback.horizontal)
          .appendTo(this);
      }
    }
  });

});


//checkbox
$(function () {
    $("input[type='checkbox']").change(function(){
        if($(this).is(":checked")){
            $(this).parent().addClass("c_on");
        }else{
            $(this).parent().removeClass("c_on");
        }
    });
});

//タブ用追加
$(function() {
	$('#tabs a[href^="#panel"]').click(function(){
		$("#tabs .panel").hide();
		$(this.hash).fadeIn();
		return false;
	});
	$('#tabs a[href^="#panel"]:eq(0)').trigger('click');
})

//マウスオーバー
$(function(){
	$('a img').hover(function(){
		$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
			}, function(){
			if (!$(this).hasClass('currentPage')) {
			$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
		}
	});
});

//吹き出し表示
function balloon() {
		//遷移先のURL
		//検索履歴
		var historyURL="https://eowp.alc.co.jp/info2/?utm_source=eowf&utm_medium=popup&utm_campaign=history";
		//あいまい検索
		var vagueURL="https://eowp.alc.co.jp/info2/?utm_source=eowf&utm_medium=popup&utm_campaign=fz";
		//整列・頻度集計
		var clkwURL="https://eowp.alc.co.jp/info2/?utm_source=eowf&utm_medium=popup&utm_campaign=kc";
		//音声
		var soundURL="https://eowp.alc.co.jp/info2/?utm_source=eowf&utm_medium=popup&utm_campaign=sound";
		//単語帳
		var tangoURL ="https://eowp.alc.co.jp/info2/?utm_source=eowf&utm_medium=popup&utm_campaign=wordbook";
		//検索結果共有
		var commonURL ="https://eowp.alc.co.jp/info2/?utm_source=eowf&utm_medium=popup&utm_campaign=share";

		// あいまい検索 
		var vague_hopup  = '<div class="fukidashi vague_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			vague_hopup += '<p class="text">「あいまい検索」は、類似した対訳表現を探す機能です（連語の部分一致）。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href="'+vagueURL+'" target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.vague_f').append(vague_hopup);
		// 頻度 
		var cl_hopup  = '<div class="fukidashi cl_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			cl_hopup += '<p class="text">「頻度集計」は、検索語の前後で使用頻度が高い３語目までを表示する機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+clkwURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.cl_f').append(cl_hopup);
		// 整列 
		var kw_hopup  = '<div class="fukidashi kw_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			kw_hopup += '<p class="text">「整列」は、検索結果を、検索語を中心に置いて一覧表示させる機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+clkwURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.kw_f').append(kw_hopup);
		// 検索履歴 
		var icon_history_hopup  = '<div class="fukidashi icon_history_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			icon_history_hopup += '<p class="text">「検索履歴」は、検索語を最新50件まで保持し、そこから再検索できる機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+historyURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.icon_history_f').append(icon_history_hopup);
		// 検索結果共有 
		var common_wrap_hopup  = '<div class="fukidashi common_wrap_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			common_wrap_hopup += '<p class="text">検索結果のページ（画面）をシェアするためのURLを発行する機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+commonURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.common_wrap_hopup').append(common_wrap_hopup);
		// 音声再生(検索結果) 
		var sound_hopup  = '<div class="fukidashi sound_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			sound_hopup += '<p class="text">クリックするとその英単語の音声が再生されて、発音を確認できる機能です。<br /><sound_moji_small class="sound_hopup_small">スピーカーのマークは、音声が収録されている英単語のみに付与されています。</sound_moji_small><br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+soundURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.sound_f').append(sound_hopup);

		// 音声再生(検索結果 小窓モード) 
		var smallmode_sound_hopup  = '<div class="fukidashi smallmode_sound_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			smallmode_sound_hopup += '<p class="text">クリックするとその英単語の音声が再生されて、発音を確認できる機能です。<br /><sound_moji_small class="sound_hopup_small">スピーカーのマークは、音声が収録されている英単語のみに付与されています。</sound_moji_small><br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+soundURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.smallmode_sound_f').append(smallmode_sound_hopup);
		// 音声再生(単語帳) 
		var word_book_sound_hopup  = '<div class="fukidashi word_book_sound_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			word_book_sound_hopup += '<p class="text">クリックするとその英単語の音声が再生されて、発音を確認できる機能です。<br /><sound_moji_small class="sound_hopup_small">スピーカーのマークは、音声が収録されている英単語のみに付与されています。</sound_moji_small><br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+soundURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.word_book_sound_f').append(word_book_sound_hopup);
		// 単語へのタグ付与 
		var spacing_hopup  = '<div class="fukidashi spacing_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			spacing_hopup += '<p class="text">単語帳に登録した語句を分類するために、タグを付与したり外したりする機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+tangoURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.spacing_f').append(spacing_hopup);
		// 単語へのタグ削除 
		var spacing_del_hopup  = '<div class="fukidashi spacing_del_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			spacing_del_hopup += '<p class="text">単語帳に登録した語句を分類するために、タグを付与したり外したりする機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+tangoURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.spacing_del_f').append(spacing_del_hopup);
		// 単語へのタグ作成ボタン 
		var create_tag_f_hopup  = '<div class="fukidashi create_tag_f_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			create_tag_f_hopup += '<p class="text">単語帳に登録した語句をグループ分けするために、タグを設定する機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+tangoURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.create_tag_f').append(create_tag_f_hopup);
		// 単語へのタグ作成ボタンの横の削除ボタン 
		var create_del_tag_hopup  = '<div class="fukidashi create_del_tag_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			create_del_tag_hopup += '<p class="text">単語帳に登録した語句をグループ分けするために、タグを設定する機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+tangoURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.create_del_tag_f').append(create_del_tag_hopup);
		// 単語へのタグ ドラッグ＆ドロップ 
		var tag_list_hopup  = '<div class="fukidashi tag_list_hopup" align="center"> <p class="closeBtn"> <img src="/content/img/tango_close.png" alt="閉じる" width="24" height="24" /> </p>';
			tag_list_hopup += '<p class="text">単語帳に登録した語句を分類するために、タグを付与したり外したりする機能です。<br />有料版「英辞郎 on the WEB Pro」でご利用いただけます。<br /> この「Pro Lite」ではご利用いただけません。</p> <p class="btn"> <a href='+tangoURL+' target="_blank"> <img src="/content/img/tango_btn.png" alt="有料版を申し込む" width="142" height="37" /></a></p></div>';
		$('.tag_list_f').append(tag_list_hopup);

		// 吹き出し出力 
		$('.inner_panel').on({
			'click': function(){
				//一旦非表示
				$('.fukidashi').hide();
				//該当表示
				$('.myTT').show();
				$(this).next('.fukidashi').show();
			}
		});

		// 吹き出し出力(ドロップ) 
		$('.cursor_move').on({
			'mousedown': function(){
				//一旦非表示
				$('.fukidashi').hide();
				//該当表示
				$('.myTT').show();
				$(this).next('.fukidashi').show();
			}
		});

		// 吹き出し非表示(閉じる) 
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

		// 吹き出しを覆うdivクリック  全て閉じる 
		$('.myTT').on({
			'click': function(){
				fuki_hide();
			}
		});

		// 吹き出しと吹き出しを覆うdivを閉じる 
		function fuki_hide(){
			$('.fukidashi').hide();
			$('.myTT').hide();
		}
}

function setLeftHight() {
	var aur = $('#leftbar').height();
	var aul = $('#maincontent').height();
	if(aul > aur){
	aul = aul - 100;
		$(".rectangle_right").css("height", aul);
	}
}
