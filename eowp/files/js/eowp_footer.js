function footer(option){
  var year = (new Date()).getYear();
  year = (year < 2000) ? year+1900 : year;
  if(window.name == 'eowpapp'){
    document.write(
    '<div id="chrome_footer">',
    '  <div id="chrome_copyright">'
    );
  }else{
    if(option == 'liquid'){
      document.write('<div id="footer_liquid">');
    }else{
      document.write('<div id="footer">');
    }
    document.write(
    '  <div id="footermenu">',
    '    <a href="https://www.alc.co.jp/index.html" target="_blank">アルクのウェブサイト</a> ｜ ',
    '    <a href="https://www.alc.co.jp/policy/privacy/" target="_blank">プライバシーポリシー</a> ｜ ',
    '    <a href="https://www.alc.co.jp/policy/other/#eowp" target="_blank">利用規約</a> ｜ ',
    '    <a href="https://www.alc.co.jp/press/" target="_blank">会社案内</a> ｜ ',
    '    <a href="https://eowp-user.alc.co.jp/" target="_blank">ご登録内容の変更</a>',
    '  </div>',
    '  <div id="copyright">'
    );
  }
  document.write(
  'Copyright &copy; 2000 ALC PRESS INC. All Rights Reserved.<img src="' + IMG_URI + 'blank.gif" title="' + HOSTNAME + '" style="zoom: 800%;"/></div>',
  '</div>'
  );
}
function spmode(url) {
  if(window.name == 'eowp' || window.name == 'eowpsp'){
    if (!url) url = "";
    if (navigator.userAgent.indexOf('iPhone') != -1
      || navigator.userAgent.indexOf('iPad') != -1
      || navigator.userAgent.indexOf('iPod') != -1
      || navigator.userAgent.indexOf('Android') != -1) {
      setSpCookie(COOKIE_PC_MODE);
      document.write(
      '<div id="sp_link">',
      '  <a href="javascript:goSpMode(' + (url ? "'" + url + "'" : "") + ')"><p class="sp_message">スマートフォン版を表示する</p></a>',
      '</div>');
    }
  }
}
