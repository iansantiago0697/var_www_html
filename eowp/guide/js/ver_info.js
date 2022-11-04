var num		=	'152';  // <- 『英辞郎』データのバージョンの値を記入
var eiwa	=	'206';  // <- 『英辞郎』データの英和の見出し語数
var eiwa_fr	=	'';  // <- 『英辞郎』データの英和の見出し語数 端数
var waei	=	'346';  // <- 『英辞郎』データの和英の見出し語数
var waei_fr	=	'';  // <- 『英辞郎』データの和英の見出し語数 端数
var rdate	=	'2018年6月7日';  // <- 『英辞郎』データのバージョン（そのバージョンの EOW のリリース日ではない！）のリリース日を YYYY年MM月DD日 形式で記入
var reibun	=	'119';  // <- 『英辞郎 on the WEB Pro』に含まれる例文データ項目数
var rei_eow	=	'14';  // <- 『英辞郎 on the WEB Lite』に含まれる例文データ項目数
var del		=	'50,999';

var note_index ='■『英辞郎 on the Web』の見出項目数（Ver.' + num + '／' + rdate + ' 時点）：英和 ' + eiwa + ' 万' + eiwa_fr + '・和英 ' + waei + ' 万' + waei_fr + '<br />';

var note_about = '<ul><li>現在収録しているデータは、Ver.' + num + '（' + rdate + '時点のもので、英和見出項目数 = ' + eiwa + ' 万' + eiwa_fr + '、和英見出項目数 = ' + waei + ' 万' + waei_fr + '）となります。</li></ul>';

var note_eiwa = eiwa + '万' + eiwa_fr + '（Ver.' + num + '／' + rdate + ' 時点）';

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
		document.write('「英辞郎 on the WEB Pro」には英和見出項目 ' + eiwa + ' 万件に加え、例文が ' + reibun + ' 万件収録されています。（「英辞郎 on the WEB Pro お試し版」に収録されている例文は ' + rei_eow + '万件です）<br />また、この例文データには、国立研究開発法人情報通信研究機構作成の『日英新聞記事対応付けデータ』が、英和対訳、和英対訳の形で組み込まれています。');
	};
};
