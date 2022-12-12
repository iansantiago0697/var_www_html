<!--
if (navigator.appName.charAt(0) == 'N'){
	if (navigator.userAgent.match(/Opera/)){
		var app = '8';
	}else if (navigator.userAgent.match(/Mozilla\/(2\.\d?)/)){
		var app = RegExp.$1;
	}else if (navigator.userAgent.match(/Mozilla\/(3\.\d?)/)){
		var app = RegExp.$1;
	}else if (navigator.userAgent.match(/Mozilla\/(4\.\d?)/)){
		var app = RegExp.$1;
	}else{
		var app = '8';
	}
}else{
	var app = '8';
};
if (app.substr(0,1) < 5){
	var scyho = "<table width='550' border='0' cellspacing='0' cellpadding='10' bgcolor='#FFCCCC'><tr><td class='j18'><font color='#CC0000'>★</font><b>推奨ブラウザについて</b><br />Internet Explorerは5.0以上で、Netscapeは6.0以上でご利用ください</td></tr></table><br />";
}else{
	var scyho = "";
};
function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments;
	for(i=0; i<a.length; i++) if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
};
function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
};
function MM_findObj(n, d) { //v4.01
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && d.getElementById) x=d.getElementById(n); return x;
};
function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
};
// 対象文字列全置換
function allReplace(text, sText, rText) {
	while (true) {
		dummy = text;
		text = dummy.replace(sText, rText);
		if (text == dummy) {
			break; // 置換しても変化しなければループを抜ける。
		}
	}
	return text;
};
// 半角スペース2個を1個
function spaces2space(s1) {
	var s = s1;
	while(-1 != s.indexOf("  ")) {
		s = s.replace("  ", " ");
	}
	return s;
};

// バリデーション
function checkWord(obj) {
	// バリデーション文字配列
	var validwd = new Array(18);
	validwd[0] = "<";
	validwd[1] = ">";
	validwd[2] = "index.html";
	validwd[3] = "favicon.ico";
	validwd[4] = "■";
	validwd[5] = "□";
	validwd[6] = "◆";
	validwd[7] = "◇";
	validwd[8] = "▲";
	validwd[9] = "△";
	validwd[10] = "▼";
	validwd[11] = "▽";
	validwd[12] = "★";
	validwd[13] = "☆";
	validwd[14] = "setting.html";
	validwd[15] = "setting2.html";
	validwd[16] = "voa.html";
	validwd[17] = "voa_exp.html";
	var ck = document.forms[obj].q.value;
	ck = ck.replace(/^\s+|\s+$/g, "");
	if (!ck) {
		alert("検索語が入力されていません");
		return false;
	};
	var st = ck;
	ck = allReplace(ck, "*", "");
//	ck = allReplace(ck, "＊", "");
	if (!ck) {
		alert("* 以外の検索語が入力されていません");
		return false;
	};
//	var st = document.forms[obj].q.value;
	// 禁止ワードチェック
	for (var i = 0; i < validwd.length; i++) {
		if (st.toLowerCase().indexOf(validwd[i]) != -1) {
			alert(validwd[i] + " の文字は使用できません。");
			return false;
		}
	}
	st = allReplace(st, "'", "\'");
	st = allReplace(st, "　", " ");
	st = spaces2space(st);
	document.forms[obj].q.value = st;
	return true;
};
// submitボタンクリック
function goF1() {
	var a = goF1.arguments;
	var obj = "";
	var wname = "";
	if (a.length > 0) {
		obj = a[0];
	}
	if (a.length > 1) {
		wname = a[1];
	}
	if (obj != "") {
		if (!checkWord(obj)) return false;
		var ref = "";
		var ie = "UTF-8";
		if (!!window.document.f1.ie) {
			if (document.f1.ie.value != "") {
				ie = document.f1.ie.value;
			}
		}
		if (!!window.document.f1.ref) {
			if (document.f1.ref.value != "") {
				ref = "&ref=" + document.f1.ref.value;
			}
		}
		if (wname != "") {
			window.open(CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(document.forms[obj].q.value) + ref, wname);
		} else {
			document.location.href = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(document.forms[obj].q.value) + ref;
		}
	}
	return false;
};
// Enter
function goF2() {
	var a = goF2.arguments;
	var obj = "";
	var wname = "";
	if (a.length == 1) {
		obj = a[0];
		
		if (obj != "") {
			goF1(obj);
		}
	} else if (a.length > 1) {
		obj = a[0];
		wname = a[1];
		if (obj != "" && wname != "") {
			goF1(obj, wname);
		}
	}
	return false;
};
// クリアボタン
function wordClear(obj) {
	document.forms[obj].q.value = "";
	document.forms[obj].q.focus();
};
// エンコード
function encodeURL(str){
	var s0, i, s, u;
	s0 = "";
	for (i = 0; i < str.length; i++){
		s = str.charAt(i);
		u = str.charCodeAt(i);
		if (s == " ") {
			s0 += "+";
//			s0 += " ";
		}
		else {
			if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){
				s0 = s0 + s;
			}
			else if (u == 0xa5) {
				s0 = s0 + "%5c";
			}
			else {
				if ((u >= 0x0) && (u <= 0x7f)){
					s = "0"+u.toString(16);
					s0 += "%"+ s.substr(s.length-2);
				}
				else if (u > 0x1fffff){
					s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
					s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
				else if (u > 0x7ff){
					s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
				else {
					s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
			}
		}
	}
	return s0;
};
// デコード
function decodeURL(str){
	var s0, i, j, s, ss, u, n, f;
	s0 = "";
	for (i = 0; i < str.length; i++){
		s = str.charAt(i);
		if (s == "+"){s0 += " ";}
		else {
			if (s != "%"){s0 += s;}
			else{
				u = 0;
				f = 1;
				while (true) {
					ss = "";
					for (j = 0; j < 2; j++ ) {
						sss = str.charAt(++i);
						if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))  || ((sss >= "A") && (sss <= "F"))) {
							ss += sss;
						} else {--i; break;}
					}
					n = parseInt(ss, 16);
					if (n <= 0x7f){u = n; f = 1;}
					if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;}
					if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;}
					if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;}
					if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;}
					if (f <= 1){break;}
					if (str.charAt(i + 1) == "%"){ i++ ;}
					else {break;}
				}
				s0 += String.fromCharCode(u);
			}
		}
	}
	return s0;
};
// 変化形検索
function goGradable(value) {
	document.location.href = CONTEXT_PATH + SEARCH_URI + "?q=%22" + encodeURL(value) + "%22&ref=hk";
	return false;
};
// もしかして検索
function goFairWord(value) { 
	document.location.href = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(value) + "&ref=sp";
	return false;
};
// ワードリンク検索
function goWordLink(value) {
//	document.location.href = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(value) + "&ref=wl";
	document.location.href = CONTEXT_PATH + SEARCH_URI + "?q=" + value + "&ref=wl";
	return false;
};
// 全文表示検索
function goFullText() {
	var a = goFullText.arguments;
	var value = "";
	var dicno = "";
	if (a.length > 0) {
		value = a[0];
	}
	if (a.length > 1) {
		dicno = a[1];
	}
	if (document.f1.fn.value == "wlc") {
		document.location.href = CONTEXT_PATH + EXAMPLE_URI + "?q=" + encodeURL(document.f1.q.value) + "&ref=ex&exp=" + value + "&dn=" + dicno + "&dk=" + document.f1.dk.value + "&fn=" + document.f1.fn.value + "&pg=" + document.f1.pg.value;
	} else {
		document.location.href = CONTEXT_PATH + EXAMPLE_URI + "?q=" + encodeURL(document.f1.q.value) + "&ref=ex&exp=" + value + "&dn=" + dicno + "&dk=" + document.f1.dk.value + "&pg=" + document.f1.pg.value;
	}
	return false;
};
// ページング処理
function goPage(pg) {
	if (document.f1.fn.value == "wlc") {
		document.location.href = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(document.f1.q.value) + "&ref=" + document.f1.fn.value + "&pg=" + pg;
	} else {
		document.location.href = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(document.f1.q.value) + "&pg=" + pg;
	}
	return false;
};
// 戻る処理(例文全文表示からの戻り)
function goBack() {
	var url = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(document.f1.q.value);
	var pg = "";
	if (!!window.document.f1.pg) {
		pg = document.f1.pg.value;
	}
	if (document.f1.fn.value == "wlc") {
		url = url + "&ref=" + document.f1.fn.value;
	}
	if (pg != "" && pg != "1") {
		url = url + "&pg=" + document.f1.pg.value;
	}
	document.location.href = url;
	return false;
};
// イディオムの表示切替
function changeIdiomDisplay(id1, id2) {
	var elm = document.getElementById(id1);
	if (elm.style.display == "none") {
		elm.style.display = "";
	} else {
		elm.style.display = "none";
	}
	elm = document.getElementById(id2);
	if (elm.style.display == "none") {
		elm.style.display = "";
	} else {
		elm.style.display = "none";
	}
};
// 振り仮名の表示切替
function changeKanaDisplay(flg) {
	var display_tag = document.getElementsByTagName("span");		// 非表示させたい部分のタグ
	for (var i = 0; i < display_tag.length; i++) {
		if ( display_tag[i].className == "kana" ) {
			var ele = display_tag.item(i);
			ele.style.display = (flg == "on") ? "inline" : "none";
		}
	}
	if (flg == "on") {
		if (items["KANA_STATUS"] != "1") {
			items["KANA_STATUS"] = "1";
//			setCookie();
		}
	} else {
		if (items["KANA_STATUS"] != "0") {
			items["KANA_STATUS"] = "0";
//			setCookie();
		}
	}
};
// インクリメンタルの表示非表示
function changeSuggestDisplay(flg) {
	if (flg == "on") {
		if (items["SUGGEST_STATUS"] != "1") {
			items["SUGGEST_STATUS"] = "1";
//			setCookie();
		}
	} else {
		if(document.getElementById){
			document.getElementById("suggest").style.display  = 'none';
		}
		if (items["SUGGEST_STATUS"] != "0") {
			items["SUGGEST_STATUS"] = "0";
//			setCookie();
		}
	}
};
// インクリメンタル窓Close
function closeSuggestDisplay() {
	if(document.getElementById){
		document.getElementById("suggest").style.display  = 'none';
	}
};
// 対象語強調色つけ(全文表示に使用)
function highlightExample(text, wd) {
	var fulltext = text;
	var fulltext = allReplace(text, "　", " ");
	var wk = allReplace(wd, "　", " ");
	var spanJumpS = "<span id='jump'>";
	var spanJumpE = "</span>";
	var fontJumpS = "<strong><font class='expwordfont' color='#BF0000'>";
	var fontJumpE = "</font></strong>";
	var midashis = new Array(2);
	midashis[0] = wk;
	if (wk.lastIndexOf("。") == wk.length - 1) {
		midashis[1] = wk.substring(0, wk.length - 1);
	} else {
		midashis[1] = allReplace(wk, "。", "");
	}
	for (var i = 0; i < midashis.length; i++ ) {
		if ( fulltext.indexOf(midashis[i]) >= 0 ) {
			var rep = spanJumpS + fontJumpS + midashis[i] + fontJumpE + spanJumpE;
			fulltext = fulltext.replace(midashis[i], rep);
			break;
		}
	}
	return fulltext;
};
// 対象語強調色つけ(全文表示でアイコン使用の場合)
function highlightExampleIcon(text, wd, domain) {
	var fulltext = allReplace(text, "　", " ");
	fulltext = allReplace(fulltext, "<domain>", domain);
	var wk = allReplace(wd, "　", " ");
	var spanJumpS = "<span id='jump'>";
	var spanJumpE = "</span>";
	var fontJumpS = "<strong><font class='expwordfont' color='#BF0000'>";
	var fontJumpE = "</font></strong>";
	var midashis = new Array(2);
	midashis[0] = wk;
	if (wk.lastIndexOf("。") == wk.length - 1) {
		midashis[1] = wk.substring(0, wk.length - 1);
	} else {
		midashis[1] = allReplace(wk, "。", "");
	}
	var iStart = fulltext.indexOf('■');
	var iEnd = -1;
	if (iStart == 0) {
		iEnd = fulltext.indexOf("<br />", 1);
		fulltext = "<span style='font-size: 115%; font-weight: bold;'>【 " + fulltext.substring(1, iEnd) + " 】</span>" + fulltext.substring(iEnd);
	}
	for (var i = 0; i < midashis.length; i++ ) {
		if ( fulltext.indexOf(midashis[i]) >= 0 ) {
			var rep = spanJumpS + fontJumpS + midashis[i] + fontJumpE + spanJumpE;
			fulltext = fulltext.replace(midashis[i], rep);
			break;
		}
	}
	return fulltext;
};
// 参照語彙リンク
function show_refVocabLink() {
	var display_tag = document.getElementsByTagName("span");
	for (var i = 0; i < display_tag.length; i++) {
		if ( display_tag[i].className == "refvocab" ) {
			var ele = display_tag.item(i);
			var linkStr = ele.innerHTML;
			var the = "";
			var pel = ele.previousSibling;  // 直前のエレメント
			if (pel != null) {
				while ((pel != null) && (pel.className != "label")) {
					pel = pel.previousSibling;
				}
				if ((pel != null) && (pel.innerHTML != null)) {
					if (linkStr.match("^[Tt]he ")) {
						the = linkStr.substring(0, 4);
						linkStr = linkStr.substring(4);
					}
				}
			}
			ele.innerHTML = "<a href='javascript:void(0);' onclick='return goWordLink(\"" + encodeURL(stripTags(linkStr)) + "\");'>" + the + linkStr + "</a>";
		}
	}
};
// 内部アンカーへジャンプ(OnLoad時使用)
function jumpT(anc){
	var s = "#" + anc;
	if(location.hash != s) {
		location.href = s;
	}
};
// クッキー書き込み
function setCookie() {
	// 有効期限の作成
	var nowtime = new Date().getTime();
	var clear_time = new Date(nowtime + (COOKIE_EXPIRES_SEC * 1000));
	var expires = clear_time.toGMTString();
	// クッキー作成
	var str = items["DISP_CNT"] + COOKIE_DELIM + items["KANA_STATUS"] + COOKIE_DELIM + items["DBLCLICK_STATUS"] + COOKIE_DELIM + items["SUGGEST_STATUS"] + COOKIE_DELIM + items["HREF_STATUS"] + COOKIE_DELIM + items["TEXTOBOX_STATUS"];
	str += COOKIE_DELIM + items["FONT_SIZE"] + COOKIE_DELIM + items["LINE_HEIGHT"] + COOKIE_DELIM + items["FONT_FAMILY"];
	if (COOKIE_DOMAIN == "") {
		document.cookie = COOKIE_NAME + "=" + encodeURL(str) + "; expires=" + expires + "; path=/;";
	} else {
		document.cookie = COOKIE_NAME + "=" + encodeURL(str) + "; expires=" + expires + "; domain=" + COOKIE_DOMAIN + "; path=/;";
	}
};
// クッキー読込み
function getCookie(item) {
    var i, index, arr;
    arr = document.cookie.split(";");
    for(i = 0; i < arr.length; i++) {
        index = arr[i].indexOf("=");
        //2番目は頭がスペースのとき
        if(arr[i].substring(0, index) == item || 
                arr[i].substring(0, index) == " " + item)
            return decodeURL(arr[i].substring(index + 1));
    }
    return "";
};
// フォーカス移動
function moveFocus() {
	if (items["TEXTOBOX_STATUS"] == "1") {
		document.fm1.q.value = "";
		document.fm1.q.focus();
	} else {
		var elm = document.fm1.q; // テキストエリアのelement取得
		elm.focus();
		// 入力文字の最後にフォーカスを移動
		if (elm.createTextRange) {
			var range = elm.createTextRange();
			if (items["TEXTOBOX_STATUS"] == "0") {
				range.move('character', elm.value.length);
			}
			range.select();
		} else if (elm.setSelectionRange) {
			elm.setSelectionRange(elm.value.length, elm.value.length);
			if (items["TEXTOBOX_STATUS"]== "2") {
				elm.setSelectionRange(0, elm.value.length);
			}
		}
	}
};
// ラベルアイコン化
function label_icon() {
	var icon = new Array(20);
	for(i = 0; i < 21; i++){
		icon[i] = new Array(2);
	}
// ラベルの CSS 化：081127
	icon[0][0] = "【URL】";
	icon[0][1] = "<span class='ls_normal'>URL</span>";
	icon[1][0] = "【発音】";
	icon[1][1] = "<span class='ls_normal'>発音</span>";
	icon[2][0] = "【発音！】";
	icon[2][1] = "<span class='ls_alert'>発音</span>";
	icon[3][0] = "【＠】";
	icon[3][1] = "<span class='ls_normal'>カナ</span>";
	icon[4][0] = "【変化】";
	icon[4][1] = "<span class='ls_normal'>変化</span>";
	icon[5][0] = "【レベル】";
	icon[5][1] = "<span class='ls_normal'>レベル</span>";
	icon[6][0] = "【分節】";
	icon[6][1] = "<span class='ls_normal'>分節</span>";
	icon[7][0] = "【表現パターン】";
	icon[7][1] = "<span class='ls_normal'>表現パターン</span>";
	icon[8][0] = "【文例】";
	icon[8][1] = "<span class='ls_normal'>文例</span>";
	icon[9][0] = "【自動】";
	icon[9][1] = "<span class='wordclass_gray'>自動</span>";
	icon[10][0] = "【他動】";
	icon[10][1] = "<span class='wordclass_gray'>他動</span>";
	icon[11][0] = "【名】";
	icon[11][1] = "<span class='wordclass_gray'>名</span>";
	icon[12][0] = "【映画】";
	icon[12][1] = "<span class='wordclass_gray'>映画</span>";
	icon[13][0] = "【略】";
	icon[13][1] = "<span class='wordclass_gray'>略</span>";
	icon[14][0] = "【組織】";
	icon[14][1] = "<span class='wordclass_gray'>組織</span>";
	icon[15][0] = "【名詞】";
	icon[15][1] = "<span class='wordclass_gray'>名詞</span>";
	icon[16][0] = "【動詞】";
	icon[16][1] = "<span class='wordclass_gray'>動詞</span>";
	icon[17][0] = "【名】";
	icon[17][1] = "<span class='wordclass_gray'>名</span>";
	icon[18][0] = "【形容詞】";
	icon[18][1] = "<span class='wordclass_gray'>形容詞</span>";
	icon[18][0] = "【形】";
	icon[18][1] = "<span class='wordclass_gray'>形</span>";
	icon[19][0] = "【副詞】";
	icon[19][1] = "<span class='wordclass_gray'>副詞</span>";

// 全文表示のアイコン変更：081127
	var display_tag = document.getElementsByTagName("span");
	for (var i = 0; i < display_tag.length; i++) {
		if ( display_tag[i].className == "exp" ) {
			var ele = display_tag.item(i);
			var label = ele.innerHTML;
// ラベルの CSS 化：081127
			ele.innerHTML = "<span class='vat'><a href='javascript:goFullText(" + stripTags(label) + ")' title='全文を表示する'><img src='" + IMG_URI + "zenbun.png' border='0' align='absbottom'> <u>全文表示</u></a></span>";
			continue;
		}
		if ( display_tag[i].className == "label" ) {
			var ele = display_tag.item(i);
			var label = ele.innerHTML;
			for(j = 0; j < 9; j++){
				if (label.indexOf(icon[j][0]) != -1) {
					ele.innerHTML = icon[j][1];
					break;
				}
			}
		}
		if ( display_tag[i].className == "wordclass" ) {
			var ele = display_tag.item(i);
			var label = ele.innerHTML;
			// for(j = 0; j < 21; j++){
			// 	if (label.indexOf(icon[j][0]) != -1) {
			// 		ele.innerHTML = icon[j][1];
			if( label.search(/【.+】/) != -1) {
				var repLabel = label.replace(/【(.+)】/,"<span class='wordclass_gray'>$1</span>");
				ele.innerHTML = repLabel;
			}
		}

	}
};
// GETパラメータ取得
function getParameter(){
	if(window.location.search){
		var query = window.location.search;
		query = query.substring(1,query.length);
		var querys = new Array();
		querys = query.split("&");
		for(i=0;i<querys.length;i++){
			var works = new Array();
			works = querys[i].split("=");
			var name = works[0];
			var value = works[1];
			params[name] = value;
		}
	}
};
// フォームロード処理
function form_load(DomainName, CookieDomain, CookieName, CookieExpires) {
	STATIC_DOMAIN = DomainName;
	IMG_URI = "//" + STATIC_DOMAIN + "/content/img/";
	COOKIE_DOMAIN = CookieDomain;
	COOKIE_NAME = CookieName;
	COOKIE_EXPIRES = CookieExpires;
	var ex = COOKIE_EXPIRES.split("*");
    for(i = 0; i < ex.length; i++) {
    	if (ex[i] != "undefined") {
        	COOKIE_EXPIRES_SEC = COOKIE_EXPIRES_SEC * parseInt(ex[i]);
        }
    }
	// クッキー値取得(1つのクッキーに以下のアイテムがカンマ区切りで格納されている)
	items["DISP_CNT"] = "" ;
	items["KANA_STATUS"] = "" ;
	items["DBLCLICK_STATUS"] = "" ;
	items["SUGGEST_STATUS"] = "" ;
	items["HREF_STATUS"] = "" ;
	items["TEXTOBOX_STATUS"] = "" ;
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
	// 1ページあたりの表示件数
	if (items["DISP_CNT"] != "50") {
		items["DISP_CNT"] = "50";
	}
	// 振り仮名表示設定
	if (items["KANA_STATUS"] != "0") {
		if (items["KANA_STATUS"] != "1") {
			items["KANA_STATUS"] = "0";
		}
	}
	// ダブルクリック設定
	if (items["DBLCLICK_STATUS"] != "0") {
		if (items["DBLCLICK_STATUS"] != "1") {
			items["DBLCLICK_STATUS"] = "1";
		}
	}
	// インクリメンタル設定
	if (sgflg == 1) {
		if (items["SUGGEST_STATUS"] == "1") {
			changeSuggestDisplay("on");
		} else {
			changeSuggestDisplay("off");
		}
	} else {
		changeSuggestDisplay("off");
	}
	// 参照ページのウィンドウ設定
	if (items["HREF_STATUS"] == "0") {
		wn = "_self";
	} else if (items["HREF_STATUS"] == "2") {
		wn = "_blank";
	} else {
		wn = "eow_opt";
		if (items["HREF_STATUS"] != "1") {
			items["HREF_STATUS"] = "1";
		}
	}
	// 検索キーワード入力欄設定
	if (items["TEXTOBOX_STATUS"] != "0" && items["TEXTOBOX_STATUS"] != "1" && items["TEXTOBOX_STATUS"] != "2") {
		items["TEXTOBOX_STATUS"] = "0";
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
	// クッキー書き込み
	setCookie();

// 2014.08.14 デザイン変更。タブがなくなった為削除
	// タブ制御
//	tabDisplay(0);

	// アイコン化
	label_icon();
};
/* 2014.08.14 デザイン変更。タブがなくなった為削除
// タブ表示制御 031014タブ数変更（3→2）
function tabDisplay(idx) {
	var tabs = 2;
	for (var i=0; i<tabs; i++) {
		document.getElementById("head-tab"+i).className = '';
		document.getElementById("body-tab"+i).className = 'search_box';
	}
	var body_tab = document.getElementById("body-tab"+idx);
	document.getElementById("head-tab"+idx).className = 'on';
	body_tab.className = 'search_box current';
	if (idx == 0) {
		moveFocus();
	} else {
		tabSetFocus(body_tab);
	}
};
*/
// タブ内textフォーカス制御
var focusFlg = 0;
function tabSetFocus(node) {
	focusFlg = 0;
	var nodeList = node.childNodes;
	for (var i=0; i<nodeList.length; i++) {
		if (nodeList[i].type == "text") {
			nodeList[i].focus();
			focusFlg = 1;
		} else {
			tabSetFocus(nodeList[i]);
		}
		if (focusFlg == 1) break;
	}
};
// HTMLタグ除去
function stripTags(text) {
  return text.replace(/<\/?[^>]+>/gi, "");
}
var COOKIE_NAME = "eowuser";		// クッキー名
var COOKIE_DOMAIN = "";				// クッキードメイン
var COOKIE_EXPIRES = "60*60*24*30";	// 有効期限設定値
var COOKIE_EXPIRES_SEC = 1;			// 有効期限秒
var COOKIE_DELIM = "<";				// クッキー値デリミタ
var COOKIE_WORDLINK_DELIM = ">";	// ワードリンク履歴デリミタ
var items = new Array();			// クッキー内アイテム配列
var itemNames = new Array(9);		// クッキー内アイテム名
var params = new Array();			// GETパラメータ値格納
itemNames[0] = "DISP_CNT";
itemNames[1] = "KANA_STATUS";
itemNames[2] = "DBLCLICK_STATUS";
itemNames[3] = "SUGGEST_STATUS";
itemNames[4] = "HREF_STATUS";
itemNames[5] = "TEXTOBOX_STATUS";
itemNames[6] = "FONT_SIZE";
itemNames[7] = "LINE_HEIGHT";
itemNames[8] = "FONT_FAMILY";
var SEARCH_URI = "search";
var EXAMPLE_URI = "search/example";
var IMG_URI = "";
var STATIC_DOMAIN = "";				//静的コンテンツドメイン
var CONTEXT_PATH = "/";

// ダブルクリックアクション
var rf = 'wl';
var u2 = '&ref=' + rf;
var u9 = 'q=&ref';
var bt = navigator.userAgent.indexOf('MSIE');
var wn = "eow_opt";
function seow() {
	// 拡張検索側でダブルクリック検索が有効になっている場合はアクションしない
	if (document.getElementById('exdbl').value == 'true') return;

	if (items["DBLCLICK_STATUS"] == "1") {
		var s = '';
		if (bt == -1) {
			s = String(getSelection()).replace(/｛.*｝/,'');
		} else {
			s = document.selection.createRange().text.replace(/｛.*｝/,'');
		}
		if ((!s) || (s == ' ') || (s == '.')) {
			void(0);
		} else {
			var u_op = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(trim(s)) + u2;
			if (u_op.indexOf(u9) > -1) {
				void(0);
			} else {
				void(window.open(u_op,wn));
			}
		}
	}
};
// 矢印を利用するページ移動
var PAGE_CNT = "1";
var isPgFlg = false;
function changePage(act) {
	var pgNo = parseInt(document.forms["f1"].pg.value);
	if (false == isPgFlg) {
		if (act == "back" && 0 < pgNo) {
			if (1 == pgNo) {
//				return false;
			} else {
				goPage(pgNo-1);
				isPgFlg = true;
			}
		} else if (act == "next" && parseInt(PAGE_CNT) > pgNo) {
			goPage(pgNo+1);
			isPgFlg = true;
		} else {
//			return false;
		}
	} else {
//		return false;
	}
};
// Context Menu
function trim(str) {
	str = str.replace(/^(\t|\n|\r)+|(\t|\n|\r)+$/g,'');
	str = unescape(escape(str).replace(/^(%u3000|%20|%09)+|(%u3000|%20|%09)+$/g,''));
	return str;
}
function ctx_execSearch(qry) {
	var url;
	if(!qry || qry === '' || qry === '.') { return false; } 
//	url = CONTEXT_PATH + encodeURL(qry) + '/UTF-8/?ref=ctx';
	url = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(qry) + '&ref=ctx';
	if(wn && wn !== '') {
		window.open(url, wn); //wnは 712行目のもの
	} else {
		location.href = url;
	}
}
// suggest flg
var sgflg = 1;
// new picture flg
var newFlg = 0;

(function(global) {
    global.degitalice = function() {
      valDegitalice = [
        '<script type="text/javascript">',
        'var DIGITALICE_CID = "ev1xzIGCbPmd";',
        'var DIGITALICE_SID = "0pkuBNcAAV7_";',
        '(function() {',
        'var io = document.createElement(\'script\');',
        'io.type = \'text/javascript\';',
        'io.src = (\'https:\' == document.location.protocol ? \'//\' : \'//\') + \'c.iogous.com/js/banner/DIGITALICE_REC.js\';',
        'var s = document.getElementsByTagName(\'script\')[0];',
        's.parentNode.insertBefore(io, s);',
        '})();',
        '</script>'
      ].join('\n');
    document.write(valDegitalice);
    }
}(window));

// -->

var fbox;
function initReady() {
	var aur = $('#AreaUpperRight').height();
	var aul = $('#AreaUpperLeft').height();
	if(aul > aur){
		$("#AreaUpperRight").css("height", aul);
	}

	fbox = $('#fixedBox').height();
}
$(function($){
   $('#fixedBox').exFlexFixed({ 
       container : '#AreaBody' 
   });
});
