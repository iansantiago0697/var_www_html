settings.suggest = "0";
function js_eowpf() {
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
  var display_tag = document.getElementsByTagName("a");
  for (var i = 0; i < display_tag.length; i++) {
    var n = display_tag[i].firstChild;
    while(n){
      if (n.nodeName == "#text") {
        if (n.nodeValue == "▲ページトップへ" || n.nodeValue == "▼該当箇所へ") {
          var h = location.href;
          if (h.indexOf("#top") != -1) h = h.substring(0, h.indexOf("#top"));
          if (h.indexOf("#jump") != -1) h = h.substring(0, h.indexOf("#jump"));
          if (n.nodeValue == "▲ページトップへ") display_tag[i].href = h + "#top";
          else display_tag[i].href = h + "#jump";
        }
        break;
      }
      n = n.nextSibling;
    }
  }
  label_icon();
  show_refVocabLink();
  screen_height = document.body.clientHeight;
}
//クッキー関連は何もしない
function normalizeSpCookie(){}
function setSpCookie(){}
//単語帳へ追加
function add_book(index, word){
  popup_free();
  return false;
}
//続きを見る
function add_search(){
  popup_free();
  return false;
}
function popup_free(){
  popup(-99, '「英辞郎 on the WEB Pro」にお申し込みのうえ、\nログインしてご利用ください');
}
