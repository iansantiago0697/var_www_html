var num		=	'143';  // <- 『英辞郎』データのバージョンの値を記入
var eiwa	=	'197';  // <- 『英辞郎』データの英和の見出し語数
var eiwa_fr	=	'';  // <- 『英辞郎』データの英和の見出し語数 端数
var waei	=	'228';  // <- 『英辞郎』データの和英の見出し語数
var waei_fr	=	'';  // <- 『英辞郎』データの和英の見出し語数 端数
var rdate	=	'2015年3月12日';  // <- 『英辞郎』データのバージョン（そのバージョンの EOW のリリース日ではない！）のリリース日を YYYY年MM月DD日 形式で記入
var rei_eow	=	'14';  // <- 『英辞郎 on the WEB』の例文項目数
var rei_eowp	=	'94';  // <- 『英辞郎 on the WEB Pro』の例文項目数
var rei_sabun	=	'80';  // <- 『英辞郎 on the WEB Pro』との例文項目数の差
var del		=	'1,185';

var note_index ='■『英辞郎 on the Web』の見出項目数（Ver.' + num + '：' + rdate + ' 時点）：英和 ' + eiwa + ' 万' + eiwa_fr + '・和英 ' + waei + ' 万' + waei_fr + '<br />';

var note_about = '<li>現在収録しているデータは、Ver.' + num + '（' + rdate + '時点のもので、英和見出項目数 = ' + eiwa + ' 万' + eiwa_fr + '、和英見出項目数 = ' + waei + ' 万' + waei_fr + '）となります。</li>';

var note_about2 = ''; //但書き about.html

var note_eiwa = eiwa + '万' + eiwa_fr + '（Ver.' + num + '：' + rdate + ' 時点）';

function showVer(type) {
	if (type === 0) {
		document.write(note_index);
	} else if (type === 1) {
		document.write(note_about);
	} else if (type === 2) {
		document.write(note_about2);
	} else {
		document.write(note_eiwa);
	}
}

function showRei() {
	if (rei_eow !== ''){
		document.write('「英辞郎 on the WEB」には英和見出項目' + eiwa + '万件に加え、例文が ' + rei_eow + ' 万件収録されています。（有料版「英辞郎 on the WEB Pro」の例文数は ' + rei_eowp + ' 万件で、 ' + rei_sabun + ' 万件多くなっています）');
		// document.write('※ 例文の件数は、（株）アルクの判断により削除している例文があるため、EDP が制作・直販しているものより' + del + '件少なくなっています。');
	}
}
