var cookieDomain = '';
var infoFile = '/content/js/infos.txt';
var infoData = new Array();
var tipsCnt = 0;
var tipsId = 0;
var tipsImg = '';
var tipsTxt = '';
var tipsUrl = '';
var idname = 'box';
var hideFlg = false;	// ON
//var hideFlg = true;	// OFF
var loadInfoFlg = false;
function loadInfoFile(){
	if (document.cookie.indexOf('toolstrip=0') != -1) {
		document.getElementById(idname).style.display  = 'none';
	} else {
		if (!hideFlg) {
			if (loadInfoFlg) {
				var request = null;
				if (window.ActiveXObject){request = new ActiveXObject("Microsoft.XMLHTTP");
				}else{
					if (window.XMLHttpRequest){
						request = new XMLHttpRequest();
					}else{request = null;}
				}
				if(request){
					request.open('GET', infoFile, true);
					request.setRequestHeader('If-Modified-Since', '01 Jan 1970 00:00:00 GMT');
					request.onreadystatechange = function(){
						if (request.readyState == 4){ 
							if (request.status == 200 | request.status == 0){
								parseText(request.responseText);
								setInfoData();
							}
							request = null;
						}
					};
					request.send(null);
				}
			} else {
				setInfoData();
			}
		}
	}
}
function parseText(str) {
	var CR = String.fromCharCode(13);
	var LF = String.fromCharCode(10);
	var lines = str.split(LF);
	for (var i = 0; i < lines.length; i++) {
		var cells = lines[i].split("\t");
		if( cells.length != 1 ) infoData.push(cells);
	}
	tipsCnt = infoData.length;
}
function hideToolstrip(cookieDomain) {
	if(document.getElementById){
		document.getElementById(idname).style.display  = 'none';
		if (cookieDomain.indexOf('localhost') != -1) {
			document.cookie = 'toolstrip=0; path=/';
		} else {
			document.cookie = 'toolstrip=0; domain=' + cookieDomain + '; path=/';
		}
	}
}
function setInfoData() {
// ▼ 期間限定：ツール誘導 ▼
var uaStr = navigator.userAgent;
if ((uaStr.indexOf('MSIE') > -1) && (uaStr.indexOf('Windows') > -1)) {
	tipsTxt = '【New】Yahoo! ツールバーで「英辞郎 on the WEB」が使える！';
	tipsUrl = 'https://eowimg.alc.co.jp/content/ytb/index.html?utm_source=eow&utm_medium=serps&utm_content=infobar_ytb';
} else if ((uaStr.indexOf('iPhone') > -1) || (uaStr.indexOf('iPod') > -1)) {
	tipsTxt = '【New!】iPhone / iPod touch アプリで『英辞郎 on the WEB』を使おう！';
	tipsUrl = 'https://bit.ly/c6AqVN';
};
// ▲ 期間限定：ツール誘導 ▲
	if (document.cookie.indexOf('toolstrip=0') != -1) {
		document.getElementById(idname).style.display  = 'none';
	} else {
		if (!hideFlg) {
			if (loadInfoFlg) {
				if (infoData == null) {
					setTimeout("setInfoData()",1000);
					return;
				}
				tipsId = Math.floor(Math.random() * tipsCnt);
				tipsImg = infoData[tipsId][0];
				tipsTxt = infoData[tipsId][1];
				tipsUrl = infoData[tipsId][2];
//				tipsId++;
//				if (infoData.length == tipsId) tipsId = 0;
				setTimeout("setInfoData()",5000);
			}
			if (tipsTxt != '') {
// 2014.08.18 EOW SERP デザイン改修 PR広告欄変更
//				document.getElementById(idname).innerHTML = "<table style='table-layout: fixed; width: 100%; margin-top: 2px; padding: 2px; border: 3px solid #D0D0D0;'><tr><td style='overflow: hidden; white-space: nowrap; width: 100%; text-overflow: ellipsis; -o-text-overflow: ellipsis;' width='535'><a target='_blank' href='" + tipsUrl + "' style='font-size:12px; text-decoration:none;' title='" + tipsTxt + "'><img src='" + tipsImg + "' border='0' hspace='5'>" + tipsTxt + "</a></td><td width='15' valign='top'><a href='javascript:void(0);' onClick='hideToolstrip(\"" + cookieDomain + "\");' title='メモを非表示にする'><img src='/content/img/close.gif' border='0' alt='メモを非表示にする' /></a></td></tr></table>";
				document.getElementById(idname).innerHTML = "<a target='_blank' href='" + tipsUrl + "'text-decoration:none;' title='" + tipsTxt + "'>" + tipsTxt + "</a><a href='javascript:void(0);' onClick='hideToolstrip(\"" + cookieDomain + "\");' title='メモを非表示にする'></a>";
			} else {
				document.getElementById(idname).style.display  = 'none';
			}
		}
	}
}
