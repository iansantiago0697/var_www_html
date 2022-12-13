//<!--
function setConfig() {
	setSZ();
	setLH();
	setFF();
	var labelSz = "sz" + items["FONT_SIZE"];
	var labelLh = "lh" + items["LINE_HEIGHT"];
	var labelFf = "ff" + items["FONT_FAMILY"];
	setCookie();
	var label = document.getElementsByTagName("label");
	if (label != null) {
		for (i = 0; i < label.length; i++) {
			if (labelSz == label[i].htmlFor) {
				document.getElementById("set_sz").innerHTML = label[i].innerHTML;
			}
			if (labelLh == label[i].htmlFor) {
				document.getElementById("set_lh").innerHTML = label[i].innerHTML;
			}
			if (labelFf == label[i].htmlFor) {
				document.getElementById("set_ff").innerHTML = label[i].innerHTML;
			}
		}
	}
};
function setSZ() {
	if (document.fmConfig.sz.length) {
		for (i = 0; i < document.fmConfig.sz.length; i++) {
			if (document.fmConfig.sz[i].checked && items["FONT_SIZE"] != document.fmConfig.sz[i].value) {
				cssChange('eow_sz' + document.fmConfig.sz[i].value, 'eow_sz');
				items["FONT_SIZE"] = document.fmConfig.sz[i].value;
				break;
			}
		}
	}
};
function setLH() {
	if (document.fmConfig.lh.length) {
		for (i = 0; i < document.fmConfig.lh.length; i++) {
			if (document.fmConfig.lh[i].checked && items["LINE_HEIGHT"] != document.fmConfig.lh[i].value) {
				cssChange('eow_lh' + document.fmConfig.lh[i].value, 'eow_lh');
				items["LINE_HEIGHT"] = document.fmConfig.lh[i].value;
				break;
			}
		}
	}
};
function setFF() {
	if (document.fmConfig.ff.length) {
		for (i = 0; i < document.fmConfig.ff.length; i++) {
			if (document.fmConfig.ff[i].checked && items["FONT_FAMILY"] != document.fmConfig.ff[i].value) {
				cssChange('eow_ff' + document.fmConfig.ff[i].value, 'eow_ff');
				items["FONT_FAMILY"] = document.fmConfig.ff[i].value;
				break;
			}
		}
	}
};
function cssChange(file, cid){
	if (file == 'eow_sz0' || file == 'eow_lh0' || file == 'eow_ff0') {
		if (document.getElementById(cid)) {
			var link = document.getElementById(cid);
			link.disabled = true;
			var head = document.getElementsByTagName('head');
			head.item(0).removeChild(link);
		}
	} else {
		var ref = '//' + STATIC_DOMAIN + '/content/css/' + file + '.css';
		if (document.getElementById(cid)) {
			document.getElementById(cid).href = ref;
		} else {
			var link = document.createElement('link');
			with( link ) {
				href = ref;
				type = 'text/css';
				rel = 'stylesheet';
				id = cid;
			}
			var head = document.getElementsByTagName('head');
			head.item(0).appendChild(link);
		}
	}
};
function defaultSetting() {
	document.fmConfig.sz[0].checked = true;
	document.fmConfig.lh[0].checked = true;
	document.fmConfig.ff[0].checked = true;
	setConfig();
	document.fm1.q.focus();
	return false;
}
function saveSetting() {
	setConfig();
	document.fm1.q.focus();
	return false;
};
// クッキー読込み
function loadCookie(DomainName, CookieDomain, CookieName, CookieExpires) {
	STATIC_DOMAIN = getFinalDomain(DomainName);
	IMG_URI = "//" + STATIC_DOMAIN + "/content/img/";
	COOKIE_DOMAIN = getFinalDomain(CookieDomain);
	COOKIE_NAME = CookieName;
	COOKIE_EXPIRES = CookieExpires;
	var ex = COOKIE_EXPIRES.split("*");
	for(i = 0; i < ex.length; i++) {
		if (ex[i] != "undefined") {
			COOKIE_EXPIRES_SEC = COOKIE_EXPIRES_SEC * parseInt(ex[i]);
		}
	}
	// クッキー値取得(1つのクッキーに以下のアイテムがカンマ区切りで格納されている)
	items["DISP_CNT"] = "";
	items["KANA_STATUS"] = "";
	items["DBLCLICK_STATUS"] = "";
	items["SUGGEST_STATUS"] = "";
	items["HREF_STATUS"] = "";
	items["TEXTOBOX_STATUS"] = "";
	items["FONT_SIZE"] = "" ;
	items["LINE_HEIGHT"] = "" ;
	items["FONT_FAMILY"] = "" ;
	var ck = getCookie(COOKIE_NAME);
	if (ck != "") {
		if (ck.substring(0, 1) == "\"") {
			ck = ck.substring(1);
			if (ck.substring(ck.length - 1) == "\"") ck = ck.substring(0,ck.length - 1);
		}
		var arr = ck.split(COOKIE_DELIM);
		for(i = 0; i < itemNames.length; i++) {
			if (arr[i] != "undefined") {
				items[itemNames[i]] = arr[i];
			}
		}
	}
	// フォントサイズ
	if (items["FONT_SIZE"] == "2") {
		document.fmConfig.sz[1].checked = true;
		cssChange('eow_sz' + document.fmConfig.sz[1].value, 'eow_sz');
	} else {
		document.fmConfig.sz[0].checked = true;
		if (items["FONT_SIZE"] != "0") {
			items["FONT_SIZE"] == "0";
		}
	}
	// 行間
	if (items["LINE_HEIGHT"] == "1") {
		document.fmConfig.lh[1].checked = true;
		cssChange('eow_lh' + document.fmConfig.lh[1].value, 'eow_lh');
	} else {
		document.fmConfig.lh[0].checked = true;
		if (items["LINE_HEIGHT"] != "0") {
			items["LINE_HEIGHT"] == "0";
		}
	}
	// フォント
	if (items["FONT_FAMILY"] == "1") {
		document.fmConfig.ff[1].checked = true;
		cssChange('eow_ff' + document.fmConfig.ff[1].value, 'eow_ff');
	} else {
		document.fmConfig.ff[0].checked = true;
		if (items["FONT_FAMILY"] != "0") {
			items["FONT_FAMILY"] == "0";
		}
	}
	// 1ページあたりの表示件数
	if (items["DISP_CNT"] != "50") {
		items["DISP_CNT"] = "50";
	}
	// 振り仮名表示設定
	if (items["KANA_STATUS"] != "0" && items["KANA_STATUS"] != "1") {
		items["KANA_STATUS"] = "0";
	}
	// ダブルクリック設定
	if (items["DBLCLICK_STATUS"] != "0" && items["DBLCLICK_STATUS"] != "1") {
		items["DBLCLICK_STATUS"] = "1";
	}
	// インクリメンタル設定
	if (items["SUGGEST_STATUS"] != "0" && items["SUGGEST_STATUS"] != "1") {
		items["SUGGEST_STATUS"] = "0";
	}
	// 参照ページのウィンドウ設定
	if (items["HREF_STATUS"] != "0" && items["HREF_STATUS"] != "1") {
		items["HREF_STATUS"] = "1";
	}
	// 検索キーワード入力欄設定
	if (items["TEXTOBOX_STATUS"] != "0" && items["TEXTOBOX_STATUS"] != "1" && items["TEXTOBOX_STATUS"] != "2") {
		items["TEXTOBOX_STATUS"] = "0";
	}
	setCookie();
	document.fm1.q.focus();
};
function getFinalDomain(domain){
    return domain !=null && domain.length > 0 && domain.toLowerCase() != top.window.location.hostname.toLowerCase() ?
           top.window.location.hostname : 
           domain;
}
// -->
