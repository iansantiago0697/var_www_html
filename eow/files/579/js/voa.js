var disps = 20;// 1ページ内件数
var disp_page_max = 9;// 表示ページングMAX
var IMG_PATH = "//eowimg.alc.co.jp/content/img/"
var npg = 1;
var p_cnt = 1;
function voa_disp() {
	var args = voa_disp.arguments;
	// 指定ページ取得
	if (args.length > 0) {
		if (isNum(args[0])) npg = parseInt(args[0]);
	}
	if (npg <= 0) npg = 1;
//	var p_cnt = getPageCnt();// 総ページ数算出
	// 総ページ数よりカレントページ番号が大きい場合、最終ページへ誘導
	if (p_cnt < npg) {
		npg = p_cnt;
	}
	// ページナビ作成
	var pageNavi = getPageNavi(npg, p_cnt);
	replaceInnerHtml("pageNaviTop", pageNavi);
	replaceInnerHtml("pageNaviBottom", pageNavi);

	var content = getContent(npg);
	replaceInnerHtml("resultList", content);
	return;
};
// コンテンツ取得
function getContent(pg_no) {
	var roopStart = disps * (pg_no-1);
	var roopEnd = disps * pg_no;
	if (roopEnd >= voa.length) roopEnd = voa.length;
	var content = "<ul>";
	var olno = (disps * (pg_no - 1)) + 1;
	for (var i = roopStart; i < roopEnd; i++) {
		content += "<li>" + replaceVoaTag(voa[i]) + "</li>";
	}
	content += "</ul>";
	return content;
};
function replaceVoaTag(s) {
	var voa = s;
	var cid = "0";

	if (voa.match(/(<VF>.+<\/VF>)/i)) {
		cid = RegExp.$1;
		cid = cid.replace("<VF>","");
		cid = cid.replace("</VF>","");
	}
	voa = voa.replace("<VT>","<span class='midashi' id='" + cid + "'>");
	voa = voa.replace("</VT>","</span><br />");
	voa = voa.replace("<VF>","<div><span class='vat'><a href='javascript:goVoaText(\"");
	voa = voa.replace("</VF>","\")' title='全文を表示する'><img src='" + IMG_PATH + "zenbun.png' border='0' align='absbottom'> <u>全文表示</u></a></span></div>");
	return voa;
};
function isNum(num){
    if(num.match(/[\D]/g)){
        return false;
    }else{
        return true;
    }
};
// GETパラメータ取得
function getRequestParameter(){
// npg: （カレントページNO）
	var reqParams = new Array();
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
			reqParams[name] = value;
		}
	}
	return reqParams;
};
// 総ページ数算出
function getPageCnt() {
	var remainder = pgs % disps;	// pgs defined voa_content.js
	var p = 1;
	if (0 == remainder) {
		p = pgs / disps;
	} else {
		p = parseInt(pgs / disps) + 1;
	}
	return p;
};
// ページナビ
function getPageNavi(p_no, p_cnt) {
	// 全ページ番号にページング処理タグ付け
	var arrPageHTML = new Array(p_cnt);
	for (i=1; i <= arrPageHTML.length; i++) {
		if (p_no == i) {
			// カレントページ番号
//			arrPageHTML[i-1] = "<td class='active'>&nbsp;" + i + "&nbsp;</td>";
			arrPageHTML[i-1] = "<span class='cur'>" + i + "</span>&nbsp;";
		} else {
			// その他のページ番号
//			arrPageHTML[i-1] = "<td>&nbsp;<a href='javascript:goVoaPage(\""+ i + "\")'>" + i + "</a>&nbsp;</td>";
			arrPageHTML[i-1] = "<span class='blk'><a href='javascript:goVoaPage(\""+ i + "\")'>" + i + "</a></span>&nbsp;";
		}
	}

	// 前へと次への表示制御フラグ
	var preNo = "";
	var nextNo = "";
	var p = 1;
	if (p_no > 1 && p_cnt > 1) {
		p = p_no - 1;
//		preNo = "<td>&nbsp;<a href='javascript:goVoaPage(\"" + p + "\")'>前へ</a>&nbsp;</td>";
		preNo = "<a href='javascript:goVoaPage(\"" + p + "\")'><strong>&#x25C0;</strong></a>&nbsp;";
	}
	if (p_no < p_cnt && p_cnt > 1) {
		p = p_no + 1;
//		nextNo = "<td>&nbsp;<a href='javascript:goVoaPage(\"" + p + "\")'>次へ</a>&nbsp;</td>";
		nextNo = "<a href='javascript:goVoaPage(\"" + p + "\")'><strong>&#x25B6;</strong></a>";
	}

	// 表示するページ番号決定
	var startPage = 1;
	if ((p_no - parseInt(disp_page_max / 2)) < 1 || p_cnt <= disp_page_max) {
		startPage = 1;
	} else {
		startPage = p_no - parseInt(disp_page_max / 2);
	}
	endPage = 1;
	if ((startPage + (disp_page_max - 1)) > p_cnt) {
		endPage = p_cnt;
		startPage = p_cnt - (disp_page_max - 1);
		if ( 1 > startPage ) startPage = 1;
	} else {
		endPage = startPage + (disp_page_max - 1);
	}
	
	// ページナビ作成
	var page = "";
	if (preNo.length != "") page = preNo;
	if (p_cnt > 1) {
		for (i = startPage-1; i < endPage; i++) {
			page += arrPageHTML[i];
		}
	}
	if (nextNo != "") page += nextNo;

//	var tbl = "<table border=\"0\" cellspacing=\"2\" cellpadding=\"0\" align=\"right\" class=\"pageNavi\">";
//	tbl += "<tbody>";
//	tbl += "<tr>";
//	tbl += page;
//	tbl += "</tr>";
//	tbl += "</tbody>";
//	tbl += "</table>";
//	return tbl;
	return page;
};
// ページング処理
function goVoaPage(pg) {
	document.location.href = CONTEXT_PATH + "voa.html?npg=" + pg;
	return false;
};
// VOA全文表示検索
function goVoaText(fileNo) {
	document.location.href = CONTEXT_PATH + "voa_exp.html?ref=ex&exp=" + fileNo + "&npg=" + npg;
	return false;
};
function voaText_disp() {
	var wd = "";
	var content = "";
	var refer = CONTEXT_PATH + "voa.html?npg=" + npg + "#" + exp; // exp defined voa_exp.html
	var hist = "<p class=\"mt_10\"><strong><a href=\""+ refer + "\">≪ 索引ページに戻る</a></strong></p>";
	content += hist;
	content += "<ul>";
	if (!!window.fulltext) {
		wd = "";
		if (imgflg) {
			fulltext = highlightExampleIcon(fulltext, wd, "eowimg.alc.co.jp");
		} else {
			fulltext = highlightExample(fulltext, wd);
		}
		if (!!window.linktext) {
			content += "<br /><br />";
			content += linktext;
		}
		content += "<ul class='mt_10' style='margin-left: 0px;'>";
		content += "<div>";
		content += allReplace(fulltext,'\\','&yen;');
		content += "</div>";
		content += "</ul>";
	} else {
		content += "<br /><br />";
		content += "<ul>";
		content += "<div><strong><font color=\"#BF0000\">Sorry...</font></strong><br /><br />";
		content += "<font color=\"#BF0000\">該当する情報は見つかりませんでした。</font><br /><br /></div>";
		content += "</ul>";
	}
	content += "</ul>";
	content += hist;
	document.write(content);
};
// 矢印を利用するページ移動
var isPgFlg = false;
function changePage(act) {
//	var p_cnt = getPageCnt();// 総ページ数算出
	if (false == isPgFlg) {
		if (act == "back" && 0 < npg) {
			if (1 == npg) {
//				return false;
			} else {
				goVoaPage(npg-1);
				isPgFlg = true;
			}
		} else if (act == "next" && parseInt(p_cnt) > npg) {
			goVoaPage(npg+1);
			isPgFlg = true;
		} else {
//			return false;
		}
	} else {
//		return false;
	}
};
// スタイルシート変更
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
// CSSロード処理
function css_load(DomainName, CookieDomain, CookieName, CookieExpires) {
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
	if (items["SUGGEST_STATUS"] != "1") {
		items["SUGGEST_STATUS"] != "0"
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
	cssChange('eow_sz' + items["FONT_SIZE"], 'eow_sz');
	// 行間
	if (items["LINE_HEIGHT"] != "0" && items["LINE_HEIGHT"] != "1" && items["LINE_HEIGHT"] != "2") {
		items["LINE_HEIGHT"] = "0";
	}
	cssChange('eow_lh' + items["LINE_HEIGHT"], 'eow_lh');
	// フォント
	if (items["FONT_FAMILY"] != "0" && items["FONT_FAMILY"] != "1") {
		items["FONT_FAMILY"] = "0";
	}
	cssChange('eow_ff' + items["FONT_FAMILY"], 'eow_ff');
	// クッキー書き込み
	setCookie();
};
