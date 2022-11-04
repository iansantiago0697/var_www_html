var settings = {
  kana: "0",
  fontSize: "0",
  suggest: "1",
  reibun: "2"
};
var cookies = new Array(15);
var spcookies = new Array(5);
var COOKIE_DOMAIN = ".alc.co.jp";
var COOKIE_DELIM = ".";
var COOKIE_NAME = "eowpfuser";
var COOKIE_SP_NAME = "eowpfsp";
var COOKIE_SP_MODE = "sp";
var COOKIE_SP_EXPIRED_DAYS = 365;
var STORAGE_SETTINGS = "settings";
var JSON_URI="/json/";
var IMG_URI = "/sp/content/img/";
var SP_URI = "/sp";
var SP_JSON_URI="/json/sp/";
var GUIDE_URI = "/sp/guide/";
var LOGIN_URI = "/sp/login";
var SEARCH_URI = "/sp/search";
var EXAMPLE_URI = "/sp/search/example";
var WORDBOOK_EJ_URI = "/sp/wordbook/ej";
var WORDBOOK_JE_URI = "/sp/wordbook/je";
var WORDBOOK_EJ_TAG_URI = "/sp/wordbook/ej/tag";
var WORDBOOK_JE_TAG_URI = "/sp/wordbook/je/tag";
var HISTORY_URI = "/sp/history";


function js_eowp() {
}
function initializeForm() {
//  deleteSpCookie();
//  normalizeCookie();
//  settings = getStorage(STORAGE_SETTINGS, settings);
  normalizeSpCookie();
  setSpCookie();
}
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
  if (cookies[11] != "0" && cookies[11] != "1") cookies[11] = "1";
  if (cookies[12] != "0" && cookies[12] != "1") cookies[12] = "1";
}
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
}
// スマートフォン用Cookie正規化
function normalizeSpCookie() {
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
  if (spcookies[1]) settings.kana = spcookies[1];
  if (spcookies[2]) settings.fontSize = spcookies[2];
  if (spcookies[3]) settings.suggest = spcookies[3];
  if (spcookies[4]) settings.reibun = spcookies[4];
}
// スマートフォン用Cookie書き込み
function setSpCookie(mode) {
  var str = COOKIE_SP_MODE;
  if (mode) str = mode;
  str += COOKIE_DELIM + settings.kana;
  str += COOKIE_DELIM + settings.fontSize;
  str += COOKIE_DELIM + settings.suggest;
  str += COOKIE_DELIM + settings.reibun;
  var cookie = COOKIE_SP_NAME + "=" + str;
  var date = new Date();
  date.setTime(date.getTime() + COOKIE_SP_EXPIRED_DAYS * 24 * 60 * 60 * 1000);
  cookie += "; expires=" + date.toGMTString();
  if (COOKIE_DOMAIN != "") cookie += "; domain=" + COOKIE_DOMAIN;
  cookie += "; path=/;";
  document.cookie = cookie;
}
/*
未使用
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
// LocalStorage読み込み
function getStorage(name, def) {
  var storage = window.localStorage;
  var data = storage.getItem(name);
  if (data) {
    return JSON.parse(data);
  }
  return def;
}
// LocalStorage書き込み
function setStorage(name, values) {
  localStorage.setItem(name, JSON.stringify(values));
}
*/
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
// 文字実体参照
function replaceCharacterEntityReference(text) {
	return text.replace(/ /g, "&nbsp;");
}
