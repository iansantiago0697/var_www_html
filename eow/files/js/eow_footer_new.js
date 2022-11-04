var year = (new Date()).getYear();
year = (year < 2000) ? year+1900 : year;

footer = '<div id="footermenu">\
<a href="/" target="_blank">英辞郎&nbsp;on&nbsp;the&nbsp;WEB</a> ｜ <a href="https://www.alc.co.jp/index.html?utm_source=EOW&utm_medium=footer&utm_campaign=eow_wwwtop" target="_blank">アルクのウェブサイト</a> ｜ <a href="https://www.alc.co.jp/policy/privacy/" target="_top">プライバシーポリシー</a> ｜ <a href="https://www.alc.co.jp/policy/other/#eowp" target="_top">利用規約</a> ｜ <a href="https://www.alc.co.jp/company/" target="_top">会社案内</a> </div>\
<div id="copyright">Copyright &copy; 2000-'+year+' ALC PRESS INC. All Rights Reserved.</div>';
