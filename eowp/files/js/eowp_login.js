var WINDOW_NAME = "eowp";
var COOKIE_NAME_LOGIN = "eowplogin";
function js_eowp() {
  var cookie = COOKIE_NAME_LOGIN + "=valid";
  if (COOKIE_DOMAIN != "") cookie += "; domain=" + COOKIE_DOMAIN;
  cookie += "; path=/;";
  document.cookie = cookie;
  var ck = getCookie(COOKIE_NAME_LOGIN);
  if (ck == "") {
    var newElement = document.createElement('p');
    newElement.className = 'error';
    newElement.innerHTML = '<strong>ログインにはCookieを使用します。ブラウザーの設定にてCookieを有効にしてご利用ください。</strong>';
    var parent = document.getElementById('fmLogin').parentNode;
    parent.insertBefore(newElement, parent.firstChild);
  }
  var date = new Date();
  cookie += "; expires=" + date.toGMTString();
  document.cookie = cookie;
  document.getElementById('MAIL_ADDRESS').focus();
}
function valCheck(){
  el = document.fmLogin;
  if(! valChkLib(el.MAIL_ADDRESS,null,null,null,'MAIL_ID')) return false;
  if(! valChkLib(el.PASSWORD)) return false;
  return true;
}
var elName;
var alVal;
function valChkLib(el,el2,el3,el4,keyword){
  elName = el.name;
  if(null != keyword){
    elName = keyword;
  }
  alVal = "";
  if(elName == 'MAIL_ID'){
    if(el.value.length == 0){
      alVal += 'メールアドレスを入力してください。';
    }else{
      if(! chkMailAddress(el.value)){
        alVal += 'メールアドレスを正しく入力してください。';
      }
    }
    if(alVal.length > 0){
      alert(alVal);
      return false;
    }
  }
  if(elName == 'PASSWORD'){
    if(el.value.length == 0){
      alVal += 'パスワードを入力してください。';
    }
    if(alVal.length > 0){
      alert(alVal);
      return false;
    }
  }
  return true;
}
//メールアドレス妥当性チェック
function chkMailAddress(str){
  var i, len, okstr, numOfAt, numOfDot;
  okstr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#%&\'=`|\~+*?_@-^./';
  len = str.length;
  for (i = 0; i < len; i++){
    if (okstr.indexOf(str.charAt(i)) == -1){
      return false;
    }
  }
  if(str.charAt(0)=='@' || str.charAt(len-1)=='@') {
    return false;
  }
  numOfAt = 0;
  for ( i=0; i<len; i++) {
    if(str.charAt(i)=='@') {
      numOfAt++;
      if(numOfAt==2) {
        return false;
      }
    }
  }
  if(numOfAt==0) {
    return false;
  }
  if(str.charAt(0)=='.' || str.charAt(len-1)=='.') {
    return false;
  }
  numOfDot = 0;
  for ( i=0; i<len; i++) {
    if(str.charAt(i)=='.') {
      numOfDot++;
    }
  }
  if(numOfDot==0) {
    return false;
  }
  return true;
}
