var num		=	'143';  // <- 『英辞郎』データのバージョンの値を記入
var eiwa	=	'197';  // <- 『英辞郎』データの英和の見出し語数
var eiwa_fr	=	'';  // <- 『英辞郎』データの英和の見出し語数 端数
var waei	=	'307';  // <- 『英辞郎』データの和英の見出し語数
var waei_fr	=	'';  // <- 『英辞郎』データの和英の見出し語数 端数
var rdate	=	'2015年3月12日';  // <- 『英辞郎』データのバージョン（そのバージョンの EOW のリリース日ではない！）のリリース日を YYYY年MM月DD日 形式で記入
var reibun	=	'94';  // <- 『英辞郎 on the WEB Pro』に含まれる例文データ項目数
var rei_eow	=	'14';  // <- 『英辞郎 on the WEB Pro』お試し版(eowf)に含まれる例文データ項目数
var del		=	'1,185';

var note_index ='■『英辞郎 on the Web』の見出項目数（Ver.' + num + '：' + rdate + ' 時点）：英和 ' + eiwa + ' 万' + eiwa_fr + '・和英 ' + waei + ' 万' + waei_fr + '<br />';

var note_about = '<ul><li>現在収録しているデータは、Ver.' + num + '（' + rdate + '時点のもので、英和見出項目数 = ' + eiwa + ' 万' + eiwa_fr + '、和英見出項目数 = ' + waei + ' 万' + waei_fr + '）となります。</li></ul>';

var note_eiwa = eiwa + '万' + eiwa_fr + '（Ver.' + num + '：' + rdate + ' 時点）';

function showVer(type) {
	if (type == 0) {
		document.write(note_index);
	} else if (type == 1) {
		document.write(note_about);
	} else {
		document.write(note_eiwa);
	};
};

function showDel() {
	if (del !== '') {
		document.write('「英辞郎 on the WEB Pro」には英和見出項目 ' + eiwa + ' 万件に加え、例文が ' + reibun + ' 万件収録されています。（お試し版に収録されている例文は ' + rei_eow + ' 万件です。初回ご利用日から30日間のみ、全例文をご覧いただけます）<br />また、この例文データには、独立行政法人情報通信研究機構作成の『日英新聞記事対応付けデータ』が、英和対訳、和英対訳の形で、' + del + '件ずつ組み込まれています。');
	};
};
