function js_eowpf(){
  if(obj=document.getElementById('q')){
    moveFocus();
  }
/*
  if(obj=document.getElementById('js_search_hst'))getList(JSON_URI+'history/getLatestHistory', 10, 'js_search_hst');
  if(obj=document.getElementById('js_search_hst_s'))getList(JSON_URI+'history/getLatestHistory', 5, 'js_search_hst_s');
  if(obj=document.getElementById('js_word_hst'))getList(JSON_URI+'wordbook/getLatestWordbook', 10, 'js_word_hst');
*/
  if(obj=document.getElementById('js_open_cond'))obj.onclick=function(){toggle_n('cond_w');toggle_v('tabselect');return false;}
  if(obj=document.getElementById('js_close_cond'))obj.onclick=function(){toggle_n('cond_w');toggle_v('tabselect');return false;}
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
  document.body.onclick=function(){
    close_mag(open_mag);
  }
  //拡張検索プラス
  extensionFlg="1";
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
}
//単語帳へ追加
function add_book(index, word){
  popup_free();
  return false;
}
//拡張検索プラスOFF
function off_extension(){
  popup_free();
  return false;
}
function popup_free(){
  popup(-99, '「英辞郎 on the WEB Pro」にお申し込みのうえ、\nログインしてご利用ください');
}
