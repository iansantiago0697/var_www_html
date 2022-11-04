var info_msg = '<li class="info_item"><a href="https://eowp.blogspot.jp/2012/12/on-web-pro.html" target="_blank"><strong>【12月7日（金）24時〜29時（翌朝5時）】メンテナンスを実施いたします</strong></a></li><li class="info_item"><a href="https://eowp.blogspot.jp/2012/11/on-web-pro.html" target="_blank">データ更新をおこないました（Ver.135 2012年11月16日版）</a></li><li class="info_item"><a href="https://eowp.blogspot.jp/2012/10/on-webandroid.html" target="_blank">Androidのホーム画面から「英辞郎 on the WEB Pro」の検索ができるウィジェットが登場！</a></li><li class="info_item"><a href="https://eowp.alc.co.jp/guide/recept.html" target="_blank">領収書の発行が可能になりました！ 発行の仕方はご利用ガイドをご覧ください</a></li><li class="info_item"><a href="https://eowp.blogspot.jp/2012/07/on-web-pro_21.html" target="_blank">スマートフォン版とPC版での同時ログイン、タイムゾーンの設定等が可能になりました</a></li>';
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
  info_box = '<div id="information"><p class="info_title">お知らせ</p><ul class="info_list">' + info_msg + '</ul></div>';
};

if (announce_msg == '' || __isOnChromeApp()) {
  announce_box = '';
} else {
  announce_box = '<div id="acute_announcement" style="background-color: #f2f2f2; color: #FFF; position: relative; padding:0.2em; margin-bottom:-1px; "><div style="text-align: center; font-size:85%; line-height:1.3em; ">' + announce_msg + '</div></div>';
};

if (announce_msg2 == '' || __isOnChromeApp()) {
  announce_box2 = '';
} else {
  announce_box2 = '<div id="acute_announcement" style="background-color: #f2f2f2; color: #FFF; position: relative; padding:0.2em; margin-bottom:-1px; "><div style="text-align: center; font-size:85%; line-height:1.3em; ">' + announce_msg2 + '</div></div>';
};

