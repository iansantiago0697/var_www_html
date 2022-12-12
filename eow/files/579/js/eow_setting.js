<!--
function setConfig() {
	var labelYm = "ym";
	var labelWd = "wd";
	var labelLw = "lw";
	var labelKw = "kw";
	var labelIs = "is";
	for(i = 0; i < document.fmConfig.ym.length; i ++){
		if(document.fmConfig.ym[i].checked){
			items["KANA_STATUS"] = document.fmConfig.ym[i].value;
			labelYm += i;
		}
	}
	for(i = 0; i < document.fmConfig.wd.length; i ++){
		if(document.fmConfig.wd[i].checked){
			items["DBLCLICK_STATUS"] = document.fmConfig.wd[i].value;
			labelWd += i;
		}
	}
	for(i = 0; i < document.fmConfig.lw.length; i ++){
		if(document.fmConfig.lw[i].checked){
			items["HREF_STATUS"] = document.fmConfig.lw[i].value;
			labelLw += i;
		}
	}
	for(i = 0; i < document.fmConfig.kw.length; i ++){
		if(document.fmConfig.kw[i].checked){
			items["TEXTOBOX_STATUS"] = document.fmConfig.kw[i].value;
			labelKw += i;
		}
	}
	for(i = 0; i < document.fmConfig.is.length; i ++){
		if(document.fmConfig.is[i].checked){
			items["SUGGEST_STATUS"] = document.fmConfig.is[i].value;
			labelIs += i;
		}
	}
	setCookie();
	var label = document.getElementsByTagName("label");
	if (label != null) {
		for (i = 0; i < label.length; i++) {
			if (labelYm == label[i].htmlFor) {
				document.getElementById("set_ym").innerHTML = label[i].innerHTML;
			}
			if (labelWd == label[i].htmlFor) {
				document.getElementById("set_wd").innerHTML = label[i].innerHTML;
			}
			if (labelLw == label[i].htmlFor) {
				document.getElementById("set_lw").innerHTML = label[i].innerHTML;
			}
			if (labelKw == label[i].htmlFor) {
				document.getElementById("set_kw").innerHTML = label[i].innerHTML;
			}
			if (labelIs == label[i].htmlFor) {
				document.getElementById("set_is").innerHTML = label[i].innerHTML;
			}
		}
	}
}
function defaultSetting() {
	document.fmConfig.ym[0].checked = true;
	document.fmConfig.wd[1].checked = true;
	document.fmConfig.lw[1].checked = true;
	document.fmConfig.kw[0].checked = true;
	document.fmConfig.is[0].checked = true;
	setConfig();
	document.getElementById("beforeSettingMessage").style.display  = 'none';
	document.getElementById("afterSettingMessage").style.display  = 'inline';
	document.fm1.q.focus();
	return false;
}
function saveSetting() {
	setConfig();
	document.getElementById("beforeSettingMessage").style.display  = 'none';
	document.getElementById("afterSettingMessage").style.display  = 'inline';
	document.fm1.q.focus();
	return false;
}
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
	// 振り仮名表示設定
	if (items["KANA_STATUS"] == "1") {
		document.fmConfig.ym[1].checked = true;	// 表示
	} else {
		document.fmConfig.ym[0].checked = true;	// 非表示(default)
		if (items["KANA_STATUS"] != "0") {
			items["KANA_STATUS"] = "0";
		}
	}
	// ダブルクリック設定
	if (items["DBLCLICK_STATUS"] == "0") {
		document.fmConfig.wd[0].checked = true;	// 無効
	} else {
		document.fmConfig.wd[1].checked = true;	// 有効(default)
		if (items["DBLCLICK_STATUS"] != "1") {
			items["DBLCLICK_STATUS"] = "1";
		}
	}
	// インクリメンタル設定
	if (items["SUGGEST_STATUS"] == "1") {
		document.fmConfig.is[1].checked = true;	// 有効
	} else {
		document.fmConfig.is[0].checked = true;	// 無効(default)
		if (items["SUGGEST_STATUS"] != "0") {
			items["SUGGEST_STATUS"] = "0";
		}
	}
	// 参照ページのウィンドウ設定
	if (items["HREF_STATUS"] == "0") {
		wn = "self";
		document.fmConfig.lw[0].checked = true;	// 同じウィンドウで開く
	} else if (items["HREF_STATUS"] == "2") {
		wn = "blank";
		document.fmConfig.lw[2].checked = true;	// 常に新しいウィンドウで開く
	} else {
		wn = "eow_opt";
		document.fmConfig.lw[1].checked = true;	// 別のウィンドウで開く(default)
		if (items["HREF_STATUS"] != "1") {
			items["HREF_STATUS"] = "1";
		}
	}
	// 検索キーワード入力欄設定
	if (items["TEXTOBOX_STATUS"] == "1") {
		document.fmConfig.kw[1].checked = true;	// キーワード入力欄をクリアする
	} else if (items["TEXTOBOX_STATUS"] == "2") {
		document.fmConfig.kw[2].checked = true;	// キーワードが選択された状態にする
	} else {
		document.fmConfig.kw[0].checked = true;	// キーワードをそのまま残す(default)
		if (items["TEXTOBOX_STATUS"] != "0") {
			items["TEXTOBOX_STATUS"] = "0";
		}
	}
	// 1ページあたりの表示件数
	if (items["DISP_CNT"] != "50") {
		items["DISP_CNT"] = "50";
	}
	// フォントサイズ
	if (items["FONT_SIZE"] != "0" && items["FONT_SIZE"] != "1" && items["FONT_SIZE"] != "2") {
		items["FONT_SIZE"] = "0";
	}
	// 行間
	if (items["LINE_HEIGHT"] != "0" && items["LINE_HEIGHT"] != "1" && items["LINE_HEIGHT"] != "2") {
		items["LINE_HEIGHT"] = "0";
	}
	// フォント
	if (items["FONT_FAMILY"] != "0" && items["FONT_FAMILY"] != "1") {
		items["FONT_FAMILY"] = "0";
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
