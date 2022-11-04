<!--
//----------------------------
// 共通
//----------------------------
var EOWP_URI = "/search";
var EOWP_EXAMPLE_URI = "/search/example";
var IMG_URI = "/kc/content/img/";
var GUIDE_URI = "/guide/";
var KWIC_URI = "/kc/kwic";
var COLLOCATION_URI = "/kc/collocation";
var WINDOW_NAME_EOWP = "eowp";
var WINDOW_NAME_EOWP_OPTION = "eowp_opt";

var REF_WL = "wlk";
var REF_IW = "wlc";
var REF_EX = "exk";
var REF_KC = "kc";

var TEXTOBOX_STATUS = "0";
var DBLCLICK_STATUS = "1";
var HREF_STATUS = "1";
// 検索バリデーション
function validation(txt, type, actionName) {
	// バリデーション文字配列
	var ngWord = "<,>,■,□,◆,◇,▲,△,▼,▽,★,☆";
	var validwd = ngWord.split(",");
	// アクションチェック
	var msgs = "";
	var msg = "";
	var front = "";
	var word = replaceAll(txt," ","");
	// 検索タイプチェック
	if (type == 'q') {
		front = "基本検索 : ";
		// 入力チェック
		if (!word) {
			msg = front + "検索語を入力してください。\r\n";
			msgs = msgs.concat(msg);
			document.forms["fmKC"].rfn.value = "";
		}
	} else if (type == 'rfn') {
		front = "絞り込み検索 : ";
	} else if (type == 'rcq') {
		front = "指定した単語を除去して集計する : ";
	}

	word = replaceAll(word, "*", "");
	if (!word) {
		msg = front + "* 以外の検索語が入力されていません。\r\n";
		msgs = msgs.concat(msg);
	}

	// 全角チェック
	var isValidwdFlg = 0;
	var isCharFlg = 0;
	for (i = 0; i < word.length; i++) {
		var c = word.charCodeAt(i);
		var isNotCharFlg = 0;
		if (isValidwdFlg != 1) {
			for (var j = 0; j < validwd.length; j++) {
				if (c == validwd[j].charCodeAt(0)) {
					isValidwdFlg = 1;
					isNotCharFlg = 1;
					break;
				}
			}
		}
		if (isCharFlg != 1 && actionName != 'eowp') {
			if (c > 0xff) {
			// 全角英数字以外
				if (!((c >= 0xff10 && c <= 0xff19) || (c >= 0xff41 && c <= 0xff5a) || (c >= 0xff21 && c <= 0xff3a)
				// EOW_NEW-116 非ASCII文字のクオーテーション、ハイフンなどをASCII文字に変換して検索する
				|| (c >= 0x2010 && c <= 0x2015) || (c >= 0x2018 && c <= 0x201F))) {
					if (isNotCharFlg != 1) {
						isCharFlg = 1;
					}
				}
			}
		}
		if (isValidwdFlg == 1) {
			if (actionName == 'eowp') break;
			if (isCharFlg == 1) break;
		}
	}
	if(isCharFlg == 1) {
		msg = front + "英数字で入力してください。\r\n";
		msgs = msgs.concat(msg);
	}
	if (isValidwdFlg == 1) {
		msg = front + "< , > , ■ , □ , ◆ , ◇ , ▲ , △ , ▼ , ▽ , ★ , ☆ は入力できません。\r\n";
		msgs = msgs.concat(msg);
	}
	
	if (actionName != 'eowp') {
		// 51文字以上チェック
		if ((type == 'q') && 50 < word.length) {
			msg = front + "検索語は50文字以内で入力してください。\r\n";
			msgs = msgs.concat(msg);
		}
		// 201文字以上チェック
		if ((type == 'rfn') && 200 < word.length) {
			msg = front + "検索語は200文字以内で入力してください。\r\n";
			msgs = msgs.concat(msg);
		}
		// 129文字以上チェック
		if ((type == 'rcq') && 128 < word.length) {
			msg = front + "検索語は128文字以内で入力してください。\r\n";
			msgs = msgs.concat(msg);
		}
	}

	// 	エラーメッセージ出力
	if (msgs.length > 0) {
		alert(msgs);
		return false;
	}
	return true;
};
// Submit Action
function doAction(actionName) {
	var q = document.forms["fmKC"].q.value;
	q = replaceAll(q, "　", " ");
	if (!validation(q, 'q', actionName)) return false;
//	q = replaceAll(q, "'", "\'");
	q = decodeURL(encodeURL(q));
	//EOW_NEW-116
	q = toHalfWidth(q);
	document.forms["fmKC"].q.value = q;
	
	var rfn = document.forms["fmKC"].rfn.value;
	rfn = decodeURL(encodeURL(rfn));
	document.forms["fmKC"].rfn.value = rfn;
	
	if (document.forms["fmKC"].rcq) {
		var rcq = document.forms["fmKC"].rcq.value;
		rcq = decodeURL(encodeURL(rcq));
		document.forms["fmKC"].rcq.value = rcq;
	}
	
	if (actionName == 'kwic') {
		submitForm(KWIC_URI);
	} else if (actionName == 'collocation'){
		submitForm(COLLOCATION_URI);
	} else if (actionName == 'eowp'){
		var param = "ref=" + REF_KC;
//		doEowpSearch(q, param);
		doEowpSearch(encodeURL(q), param);
	}
//	return false;
};
//EOW_NEW-116
function toHalfWidth(val) {
    return val.replace(/‘|’|‚|‛/g, '\'')
        .replace(/“|”|„|‟/g, '"')
        .replace(/―|‐|‒|–|—|‑ /g, '-');
}
// submit
function submitForm(actionName) {
	document.forms["fmKC"].action = actionName;
	document.forms["fmKC"].submit();
//	isPgFlg = 0;
};
// clear
function clearWord() {
	document.forms["fmKC"].q.value = "";
	document.forms["fmKC"].q.focus();
	return false;
};
// 基本検索（整列ボタン押下)
function doSubmit(actionName) {
	document.forms["fmKC"].rfn.value = "";
	if (actionName == 'kwic') {
		// kwic特有の処理
		if (!!window.document.fmKC.pg) {
			document.forms["fmKC"].pg.value = "1";
		}
		if (!!window.document.fmKC.srt) {
			document.forms["fmKC"].srt.value = "r1";
		}
	}
	doAction(actionName);
	return false;
};
// 基本検索（Enter押下)
function doEnter(actionName) {
	document.forms["fmKC"].rfn.value = "";
	if (actionName == 'kwic') {
		// kwic特有の処理
		if (!!window.document.fmKC.pg) {
			document.forms["fmKC"].pg.value = "1";
		}
		if (!!window.document.fmKC.srt) {
			document.forms["fmKC"].srt.value = "r1";
		}
	}
	doAction(actionName);
	return false;
};
// 変化形チェック
function doHkCheck() {
	if (document.forms["fmKC"].hk.value=="1") {
		document.forms["fmKC"].hk.checked = true;
	} else {
		document.forms["fmKC"].hk.checked = false;
	}
};
// 絞込みリンク押下
function doSrCnd(txt, actionName) {
	txt = decodeURL(txt);
	var rfn2 = '';
	if (txt == '') {
		rfn2 = txt;
	} else {
		rfn2 = txt + ' ';
	}
	var rfn = prompt("この検索結果に対して絞り込み検索", rfn2);
	if (rfn != null) {
		rfn = replaceAll(rfn,"　"," ");
	 	if (validation(rfn,'rfn')) {
			var s2 = replaceAll(rfn2," ","");
			var s1 = replaceAll(rfn," ","");
			if (s1 != s2) {
				document.forms["fmKC"].rfn.value = rfn;
				document.forms["fmKC"].q.value = document.forms["fmHdn"].q2.value;
				document.forms["fmKC"].hk.value = document.forms["fmHdn"].hk2.value;
				if ('kwic' == actionName) {
					document.forms["fmKC"].srt.value = document.forms["fmHdn"].srt2.value;
				} else if ('collocation' == actionName) {
					document.forms["fmKC"].gkr.value = document.forms["fmHdn"].gkr2.value;
					document.forms["fmKC"].rcr.value = document.forms["fmHdn"].rcr2.value;
					document.forms["fmKC"].rcq.value = document.forms["fmHdn"].rcq2.value;
				}
				doHkCheck();
				doAction(actionName);
			}
		}
	}
};
// 候補単語リンク押下
function doSuggest(q, actionName) {
	if (0 < q.length) {
		document.forms["fmKC"].q.value = q;
		createParam("ref", "sp");
		doAction(actionName);
	}
};
// 要素作成
function createParam(name, value) {
	 var fm=document.getElementById('fmKC');
	 var ele=document.createElement('input');
	 ele.setAttribute("type","hidden");
	 ele.setAttribute("name",name);
	 ele.setAttribute("value",value);
	 fm.appendChild(ele);
};
// 対象文字列全置換
function replaceAll(text, sText, rText) {
  return text.split(sText).join(rText);
};
// 連続する半角、全角スペースを1個に
function spaces2space(text) {
  var s = text.replace(/　+/g," "); // 全角⇒半角
  return s.replace(/\s+/g," ");
};
// StringクラスにTrimメソッドの追加
String.prototype.trim = function() {
	return this.replace(/^[ ]+|[ ]+$/g, '');
};
// 文字実体参照を元に戻す
function reverseCharacterEntityReference (value) {
	var word = replaceAll(value, "&amp;", "&");
	word = replaceAll(word, "&quot;", "\"");
	word = replaceAll(word, "&yen;", "\\");
	return value;
};
// フォーカス移動
function moveFocus() {
	if (TEXTOBOX_STATUS == "1") {
		document.forms["fmKC"].q.value = "";
		document.forms["fmKC"].q.focus();
	} else {
		var elm = document.forms["fmKC"].q; // テキストエリアのelement取得
		elm.focus();
		// 入力文字の最後にフォーカスを移動
		if (elm.createTextRange) {
			var range = elm.createTextRange();
			if (TEXTOBOX_STATUS == "0") {
				range.move('character', elm.value.length);
			}
			range.select();
		} else if (elm.setSelectionRange) {
			elm.setSelectionRange(elm.value.length, elm.value.length);
			if (TEXTOBOX_STATUS == "2") {
				elm.setSelectionRange(0, elm.value.length);
			}
		}
	}
};
// EOWP検索
function doEowpSearch(value, param) {
//	window.open(EOWP_URI + "?q=" + encodeURL(value) + "&" + param, WINDOW_NAME_EOWP);

//20180516 かな1文字(半角カナを含む)だけの検索の場合、ref="vl"を設定
if(decodeURL(value).match(/^([\u3040-\u309f\u30a0-\u30ff]{1}|[\uff65-\uff9f]{1}[\uff9e\uff9f]?)$/)) {
	param = "ref=vl";
	alert("該当件数が多すぎるため、完全一致する見出し語が存在する場合のみ結果を表示します");
	}
  
	window.open(EOWP_URI + "?q=" + value + "&" + param, WINDOW_NAME_EOWP);
//	return false;
};
// EOWP全文例文検索
function doEowpExSearch(value, param) {
	window.open(EOWP_EXAMPLE_URI + "?q=" + encodeURL(value) + "&" + param, WINDOW_NAME_EOWP);
//	return false;
};
// KWIC・Collocation連係
function doChangeAction(actionName) {
	document.forms["fmKC"].q.value = document.forms["fmHdn"].q2.value;
	document.forms["fmKC"].rfn.value = document.forms["fmHdn"].rfn2.value;
	document.forms["fmKC"].hk.value = document.forms["fmHdn"].hk2.value;
	doHkCheck();
	doAction(actionName);
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
// -->
