var info_msg = '<!--li class="info_item"><strong>6/29（金）19:00～20:00のメンテナンスは終了いたしました。ご協力どうもありがとうございました。</strong></li--><li class="info_item"><a href="https://eowp.blogspot.jp/2018/06/20186.html" target="_blank"><strong>データ更新を行いました［Ver.152（2018年6月7日時点）］</strong></a></li><li class="info_item"><a href="https://eowp.blogspot.jp/2018/05/blog-post.html" target="_blank"><strong><font color="red">アプリで音声が再生できない場合の対処方法はこちらをご覧ください。>>></font></strong></a></li><li class="info_item"><a href="https://eowp.blogspot.jp/2017/12/on-web-pro-on-web-pro-lite.html" target="_blank"><strong>「英辞郎 on the WEB Pro」「英辞郎 on the WEB Pro Lite」をご利用いただくには、各サービスでのログインが必要になりました。詳しくはこちら>>></strong></a></li><!--li class="info_item"><a href="https://eowp.blogspot.jp/2017/09/on-web-pro-lite.html" target="_blank"><strong>単語帳の見出し項目と総登録数に関する不具合の修正作業を行いました。(11/6)</a></strong></li--><li class="info_item"><strong><a href="https://play.google.com/store/apps/details?id=jp.co.alc.eow" target="_blank">【注意】AndroidアプリはVer.2.2.8にアップデートしてご利用ください。</a></strong></li><!--li class="info_item"><a href="https://eowp.blogspot.jp/2017/10/on-web.html" target="_blank"><strong>スマートフォンアプリで検索結果表示方法のカスタマイズが可能に<font color="red">New!</font></strong></a></li--><!--li class="info_item"><a href="https://eowp.blogspot.jp/2017/10/ios11.html" target="_blank"><strong>iPhone、iPadの最新OSでのアポストロフィを含む英語文字列の検索について</strong></a></li--><!--li class="info_item">「Pro Lite/Pro版」対応の<a href="https://eowp.alc.co.jp/info/app/?utm_source=eowpf_topinfo_app&utm_campaign=eowpf_topinfo_app"  target="_blank">アプリ「英辞郎 on the WEB」</a>もぜひご利用ください </li--><!--li class="info_item">「Pro Lite」で「Pro」の全機能が使えるのは30日間です。詳しくは<a href="https://www.alc.co.jp/tg/eowf/?utm_source=eowpf_pc_topinfo&utm_medium=text&utm_campaign=eowpf_pc_topinfo_function" target="_blank">こちら</a></li>-->';
var announce_msg = '';
var announce_msg2 = '';

// var info_msg = '';
// var announce_msg = '<a target="_blank" style="font-weight:bold; color:#0097EA; text-decoration: underline; " href="/fz">あいまい検索ベータ版をお試しください</a>';
// var announce_msg2 = '';


function __isOnChromeApp() {
  return /^https?:\/\/eowp.?\.alc\.co\.jp\/chrome/.test(location.href);
}

var info_box;
var announce_box;
var announce_box2;

if (info_msg == '') {
  info_box = '';
} else {
  info_box = '<div id="information"><img src="/content/img/announcement.png" width="30" height="25" align="left" style="margin-right:5px; margin-top:-3px"><p class="info_title">お知らせ</p><ul class="info_list">' + info_msg + '</ul></div>';
};

if (info_msg == '') {
  info_box_sp = '';
} else {
  info_box_sp = '<div id="information"><img src="/sp/content/img/announce.png" width="20" height="20" align="left" style="margin-right:8px;"><p class="info_title">お知らせ</p><ul class="info_list">' + info_msg + '</ul></div>';
};

if (announce_msg == '' || __isOnChromeApp()) {
  announce_box = '';
} else {
  announce_box = '<div id="acute_announcement" style="background-color: #ffffff; color: #000000; position: relative; padding:0.2em; margin-bottom:-1px; "><div style="text-align: center; font-size:85%; line-height:1.3em; ">' + announce_msg + '</div></div>';
};

if (announce_msg2 == '' || __isOnChromeApp()) {
  announce_box2 = '';
} else {
  announce_box2 = '<div id="acute_announcement" style="background-color: #ffffff; color: #000000; position: relative; padding:0.2em; margin-bottom:-1px; "><div style="text-align: center; font-size:85%; line-height:1.3em; ">' + announce_msg2 + '</div></div>';
};

