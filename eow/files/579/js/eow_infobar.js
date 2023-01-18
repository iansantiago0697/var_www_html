var cookieDomain = '';
var reg1 = /^eow\.alc\.co\.jp:4437$/;
var subDir = reg1.test(location.host) ? 'eow-st' : 'eow';
var infoFile = 'https://cdn2.alc.co.jp/eow/' + subDir + '/js/infos.txt';
var infoData = new Array();
var tipsCnt = 0;
var tipsId = 0;
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
        if (window.XMLHttpRequest){
          request = new XMLHttpRequest();
        }else{request = null;}
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
				tipsTxt = infoData[tipsId][0];
				tipsUrl = infoData[tipsId][1];
//				tipsId++;
//				if (infoData.length == tipsId) tipsId = 0;
				setTimeout("setInfoData()",5000);
			}
			if(document.getElementById(idname)){
				if (tipsTxt != '') {
					// 2014.08.18 EOW SERP デザイン改修 PR広告欄変更
					//document.getElementById(idname).innerHTML = "<table style='table-layout: fixed; width: 100%; margin-top: 2px; padding: 2px; border: 3px solid #D0D0D0;'><tr><td style='overflow: hidden; white-space: nowrap; width: 100%; text-overflow: ellipsis; -o-text-overflow: ellipsis;' width='535'><a target='_blank' href='" + tipsUrl + "' style='font-size:12px; text-decoration:none;' title='" + tipsTxt + "'><img src='" + tipsImg + "' border='0' hspace='5'>" + tipsTxt + "</a></td><td width='15' valign='top'><a href='javascript:void(0);' onClick='hideToolstrip(\"" + cookieDomain + "\");' title='メモを非表示にする'><img src='/content/img/close.gif' border='0' alt='メモを非表示にする' /></a></td></tr></table>";
					document.getElementById(idname).innerHTML = "<a target='_blank' href='" + tipsUrl + "'text-decoration:none;' title='" + tipsTxt + "'>" + tipsTxt + "</a><a href='javascript:void(0);' onClick='hideToolstrip(\"" + cookieDomain + "\");' title='メモを非表示にする'></a>";
				} else {
					document.getElementById(idname).style.display  = 'none';
				}
			}
		}
	}
}
