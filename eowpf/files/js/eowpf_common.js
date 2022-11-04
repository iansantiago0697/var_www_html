var spcookies = new Array(5);
var SHARE_DOMAIN = "eowp.in";
var COOKIE_DOMAIN = ".alc.co.jp";
var COOKIE_DELIM = ".";
var COOKIE_SP_NAME = "eowpfsp";
var COOKIE_PC_MODE = "pc";
var COOKIE_SP_MODE = "sp";
var COOKIE_SP_EXPIRED_DAYS = 365;
var LOGIN_URI = "/login";
var SEARCH_URI = "/search";
var EXAMPLE_URI = "/search/example";
var WORDBOOK_EJ_URI = "/wordbook/ej";
var WORDBOOK_JE_URI = "/wordbook/je";
var HISTORY_URI = "/history";
var SETIING_URI = "/setting";
var SP_URI = "/sp";
var REF_SP_SEARCH = "ph";

// Cookie読込み
function getCookie(item) {
  var i, index, arr;
  arr = document.cookie.split(";");
  for(i = 0; i < arr.length; i++) {
    index = arr[i].indexOf("=");
    if(arr[i].substring(0, index) == item || 
      arr[i].substring(0, index) == " " + item)
      return decodeURL(arr[i].substring(index + 1));
  }
  return "";
};
// スマートフォン用Cookie書き込み
function setSpCookie(mode) {
  var ck = getCookie(COOKIE_SP_NAME);
  if (ck != "") {
    if (ck.substring(0, 1) == "\"") {
      ck = ck.substring(1);
      if (ck.substring(ck.length - 1) == "\"") ck = ck.substring(0,ck.length - 1);
    }
    var arr = ck.split(COOKIE_DELIM);
    for(i = 0; i < spcookies.length; i++) {
      if (arr[i] != "undefined") { spcookies[i] = arr[i];
      } else { spcookies[i] = ""; }
    }
  }
  var str = mode;
  for(i = 1; i < spcookies.length; i++) {
    str += COOKIE_DELIM + spcookies[i];
  }
  var cookie = COOKIE_SP_NAME + "=" + str;
  var date = new Date();
  date.setTime(date.getTime() + COOKIE_SP_EXPIRED_DAYS * 24 * 60 * 60 * 1000);
  cookie += "; expires=" + date.toGMTString();
  if (COOKIE_DOMAIN != "") cookie += "; domain=" + COOKIE_DOMAIN;
  cookie += "; path=/;";
  document.cookie = cookie;
}
// スマートフォン用Cookie削除
function deleteSpCookie() {
  var date = new Date();
  var year = date.getYear();
  year = (year < 2000) ? year + 1900 : year;
  date.setYear(year - 1);
  var cookie = COOKIE_SP_NAME + "=";
  cookie += "; expires=" + date.toGMTString();
  if (COOKIE_DOMAIN != "") cookie += "; domain=" + COOKIE_DOMAIN;
  cookie += "; path=/;";
  document.cookie = cookie;
}
// スマートフォン版ページ切替
function goSpMode(url) {
  setSpCookie(COOKIE_SP_MODE);
  if (!url) url = "/";
  if (url == SEARCH_URI) {
    document.location.href = SP_URI + url + "?q=" + encodeURL(document.f1.q.value) + "&ref=" + REF_SP_SEARCH;
  } else if (url == WORDBOOK_EJ_URI || url == WORDBOOK_JE_URI) {
    var tag = document.fmManage.tag.value;
    var alpha = "";
    if (document.fmManage.alpha) alpha = document.fmManage.alpha.value;
    document.location.href = SP_URI + url + "?page=" + document.fmManage.page.value
      + (alpha ? "&alpha=" + alpha : "")
      + (tag ? "&tag=" + tag : "");
  } else {
    document.location.href = SP_URI + url;
  }
}
// エンコード
function encodeURL(str){
  var s0, i, s, u;
  s0 = "";
  for (i = 0; i < str.length; i++){
    s = str.charAt(i);
    u = str.charCodeAt(i);
    if (s == " ") {
      s0 += "+";
//      s0 += " ";
    }
    else {
      if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){
        s0 = s0 + s;
      }
      else if (u == 0xa5) {
        s0 = s0 + "%5c";
      }
      else {
        if ((u >= 0x0) && (u <= 0x7f)){
          s = "0"+u.toString(16);
          s0 += "%"+ s.substr(s.length-2);
        }
        else if (u > 0x1fffff){
          s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
          s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
          s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
          s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
        }
        else if (u > 0x7ff){
          s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
          s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
          s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
        }
        else {
          s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
          s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
        }
      }
    }
  }
  return s0;
}
// デコード
function decodeURL(str){
  var s0, i, j, s, ss, u, n, f;
  s0 = "";
  for (i = 0; i < str.length; i++){
    s = str.charAt(i);
    if (s == "+"){s0 += " ";}
    else {
      if (s != "%"){s0 += s;}
      else{
        u = 0;
        f = 1;
        while (true) {
          ss = "";
          for (j = 0; j < 2; j++ ) {
            sss = str.charAt(++i);
            if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))  || ((sss >= "A") && (sss <= "F"))) {
              ss += sss;
            } else {--i; break;}
          }
          n = parseInt(ss, 16);
          if (n <= 0x7f){u = n; f = 1;}
          if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;}
          if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;}
          if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;}
          if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;}
          if (f <= 1){break;}
          if (str.charAt(i + 1) == "%"){ i++ ;}
          else {break;}
        }
        s0 += String.fromCharCode(u);
      }
    }
  }
  return s0;
}
// HTMLエスケープ
function escapeHTML(text) {
  return replaceAll(text,'\\','&yen;');
}
// HTMLタグ除去
function stripTags(text) {
  return text.replace(/<\/?[^>]+>/gi, "");
}
// HTMLリクエストパラメータ取得
var reqParams;
function getReqParameter(name) {
	if (reqParams == null) {
		reqParams = new Array();
		var query = window.location.search;
		if (query.length > 1) {
			query = decodeURL(query.substring(1));
			var params = query.split('&');
			for (var i = 0; i < params.length; i++) {
				var pos = params[i].indexOf('=');
				if (pos > 0) {
					var key = params[i].substring(0,pos);
					var val = params[i].substring(pos+1);
					reqParams[key] = val;
				}
			}
		}
	}
	return reqParams[name];
}
// 文字実体参照
function replaceCharacterEntityReference(text) {
	return text.replace(/ /g, "&nbsp;");
}
// 画像ファイル置換
function chgImg(chgId) {
  
  if("word_book_pnt" == chgId){
      document.getElementById("word_book_pnt").src = IMG_URI + 'icon_word_g.gif';
      document.getElementById("word_book_pnt").onmouseover = '';
      document.getElementById("word_book_pnt").onmouseout = '';
  }
  else if("setting_pnt" == chgId){
      document.getElementById("setting_pnt").src = IMG_URI + 'icon_setting_g.png';
      document.getElementById("setting_pnt").onmouseover = '';
      document.getElementById("setting_pnt").onmouseout = '';
  }
  else if("history_pnt" == chgId){
      document.getElementById("history_pnt").src = IMG_URI + 'icon_history_g.png';
      document.getElementById("history_pnt").onmouseover = '';
      document.getElementById("history_pnt").onmouseout = '';
  }
  
}
