var num		=	'128';  // <- 『英辞郎』データのバージョンの値を記入
var eiwa	=	'182';  // <- 『英辞郎』データの英和の見出し語数
var eiwa_fr	=	'';  // <- 『英辞郎』データの英和の見出し語数 端数
var waei	=	'211';  // <- 『英辞郎』データの和英の見出し語数
var rdate	=	'2011年3月9日';  // <- 『英辞郎』データのバージョン（そのバージョンの EOW のリリース日ではない！）のリリース日を YYYY年MM月DD日 形式で記入
var del		=	' 16 万';

var note_index ='&nbsp;&nbsp;■『英辞郎 on the Web』の見出項目数（Ver.' + num + '：' + rdate + ' 時点）：英和 ' + eiwa + ' 万' + eiwa_fr + '・和英 ' + waei + ' 万<br />';

var note_about = '<ul><li>現在収録しているデータは、Ver.' + num + '（' + rdate + '時点のもので、英和見出項目数 = ' + eiwa + ' 万' + eiwa_fr + '、和英見出項目数 = ' + waei + ' 万）となります。</li></ul>';

var note_eiwa = eiwa + '万' + eiwa_fr + '（Ver.' + num + '：' + rdate + ' 時点）';

function showVer(type) {
	if (type === 0) {
		document.write(note_index);
	} else if (type === 1) {
		document.write(note_about);
	} else {
		document.write(note_eiwa);
	}
}

function showDel() {
	if (del !== '') {
		document.write('※ 和英の見出項目は、（株）アルクネットワークスの判断により削除している項目があるため、EDP が制作・直販しているものより' + del + '項目少なくなっています。');
	}
}
