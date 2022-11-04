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
    '    <a href="https://eow.alc.co.jp/" target="_blank">「英辞郎 on the WEB」トップ</a> ｜ ',
    '    <a href="https://eowp.alc.co.jp/info/" target="_blank">「英辞郎 on the WEB Pro」トップ</a> ｜ ',
    '    <a href="https://www.alc.co.jp/index.html" target="_blank">アルクのウェブサイト</a> ｜ ',
    '    <a href="https://www.alc.co.jp/policy/privacy/" target="_blank">プライバシーポリシー</a> ｜ ',
    '    <a href="https://www.alc.co.jp/policy/other/#eowp" target="_blank">利用規約</a> ｜ ',
    '    <a href="https://www.alc.co.jp/company/" target="_blank">会社案内</a>',
    '  </div>',
    '  <div id="copyright">'
    );
  }
  document.write(
  'Copyright &copy; 2000-'+year+' ALC PRESS INC. All Rights Reserved.</div>',
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
