function footer(option){
  var year = (new Date()).getYear();
  year = (year < 2000) ? year+1900 : year;
  if(window.name == 'eowpfapp'){
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
    '    <a href="https://www.alc.co.jp" target="_blank">アルクのウェブサイト</a> ｜ ',
    '    <a href="https://www.alc.co.jp/policy/privacy/" target="_blank">プライバシーポリシー</a> ｜ ',
    '    <a href="https://www.alc.co.jp/policy/other/#eowp" target="_blank">利用規約</a> ｜ ',
    '    <a href="https://eowp.alc.co.jp/info-business/" target="_blank" onClick="ga(\'send\', \'event\', \'eowf_sp_footerhojin\', \'click\', \'https://eowp.alc.co.jp/info-business/\');" id="eowf_sp_footerhojin">法人のお客様</a> ｜ ',
    '    <a href="https://www.alc.co.jp/company/" target="_blank">会社案内</a>',
    '  </div>',
    '  <div id="copyright">'
    );
  }
  document.write(
  'Copyright &copy; 2000-'+year+' ALC PRESS INC. All Rights Reserved.<img src="' + IMG_URI + 'blank.gif" title="' + HOSTNAME + '" style="zoom: 800%;"/></div>',
  '</div>'
  );
}
function spmode(url) {
  if(window.name == 'eowpf' || window.name == 'eowpfsp'){
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
