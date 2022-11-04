<!--
/*-------------------------------------------------
  KWIC
-------------------------------------------------*/
// ソート位置(KWIC) 
function doSort(srt) {
	if (0 < srt.length) {
		document.forms["fmKC"].srt.value = srt;
		document.forms["fmKC"].q.value = document.forms["fmHdn"].q2.value;
		document.forms["fmKC"].rfn.value = document.forms["fmHdn"].rfn2.value;
		document.forms["fmKC"].hk.value = document.forms["fmHdn"].hk2.value;
		doHkCheck();
		doAction('kwic');
	}
};
// ページング
function doPage(pgNo) {
//alert("pgNo?? : "+pgNo);
	document.forms["fmKC"].pg.value = pgNo;
	document.forms["fmKC"].q.value = document.forms["fmHdn"].q2.value;
	document.forms["fmKC"].rfn.value = document.forms["fmHdn"].rfn2.value;
	document.forms["fmKC"].hk.value = document.forms["fmHdn"].hk2.value;
	document.forms["fmKC"].srt.value = document.forms["fmHdn"].srt2.value;
	doHkCheck();
	doAction('kwic');
};
// 詳細ボタン押下
function changeShosaiDisplay(idname, num) {
  var elm = document.getElementById(idname);
  if (elm.style.display == "none") {
    elm.style.display = "";
    dt = document.getElementById("dt" + num);
    dt.innerHTML="<span class='detail' id='dt" + num + "'><img src='" + IMG_URI + "skwic_on.gif' border='0' alt='詳細' class='dtl_btn' /></span>";
    return;
  }
  elm.style.display = "none";
  dt = document.getElementById("dt" + num);
  dt.innerHTML="<span class='detail' id='dt" + num + "'><img src='" + IMG_URI + "skwic_off.gif' border='0' alt='詳細' class='dtl_btn' /></span>";
};
// 全文表示検索
function doFullText() {
	var a = doFullText.arguments;
	var value = "";
	var dicno = "";
	if (a.length > 0) {
		value = a[0];
	}
	if (a.length > 1) {
		dicno = a[1];
	}
	var q = document.forms["fmHdn"].q2.value;
	var rfn = document.forms["fmHdn"].rfn2.value;
	var tmp = replaceAll(rfn," ","");
	if (!!tmp) {
		q = q + " " + rfn;
	}
	var param = "ref=" + REF_EX + "&exp=" + value + "&dn=" + dicno + "&dk=EJ";
	doEowpExSearch(q, param);
};
// 参照語彙リンク
function showRefVocabLink() {
	var display_tag = document.getElementsByTagName("span");
	for (var i = 0; i < display_tag.length; i++) {
		if ( display_tag[i].className == "refvocab" ) {
			var ele = display_tag.item(i);
			var linkStr = ele.innerHTML;
			ele.innerHTML = "<a href='javascript:void(0);' onclick='window.open(\"" + EOWP_URI + "?q=" + encodeURL(linkStr) + "&ref=wlk\", \"" + WINDOW_NAME_EOWP + "\");return false;'>" + linkStr + "</a>";
		}
	}
};
// ラベルスタイル定義
function setLabelStyle() {

	var icon = new Array(9);
	for(i = 0; i < 9; i++){
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
	icon[8][0] = "【音声を聞く】";
	icon[8][1] = "<span class='ls_normal'>音声を聞く</span>";

// 全文表示のアイコン変更：081127
	var display_tag = document.getElementsByTagName("span");
	for (var i = 0; i < display_tag.length; i++) {
		if ( display_tag[i].className == "exp" ) {
			var ele = display_tag.item(i);
			var label = ele.innerHTML;
// ラベルの CSS 化：081127
			ele.innerHTML = "<span class='vat'><a href='javascript:doFullText(" + label + ")' title='全文を表示する'><img src='" + IMG_URI + "zenbun.png' border='0' align='absbottom'> <u>全文表示</u></a></span>";
			continue;
		}
// 音声対応：110513
		if (display_tag[i].className == "sound") {
			var ele = display_tag.item(i);
			var onseiFile = ele.innerHTML;
			if (!onseiFile.match(/^<a/)) {
				var onseiId = "svl" + i;
				var onseiHTML = "<a href='' title='クリックして音声を聞く' onclick='return playSound(\"" + onseiFile + "\", \"" + onseiId + "\")'>";
				onseiHTML += "<img class='play' src='" + IMG_URI + "play.png' alt='クリックして音声を聞く' />";
				onseiHTML += "</a>";
				onseiHTML += "<span id='" + onseiId + "'></span>";
				ele.innerHTML = onseiHTML;
				ele.style.display = "inline";
			}
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
	}
};
// フォームロード処理
function loadForm() {
	// 参照語彙リンク
	showRefVocabLink();
	// ラベルスタイル定義
	setLabelStyle(); 
	// カーソル移動
	moveFocus();
};
// ダブルクリックアクション
function seow() {
	// 拡張検索側でダブルクリック検索が有効になっている場合はアクションしない
	if(obj=document.getElementById('exdbl')){
		if(obj.value == 'true'){
			return;
		}
	}
	var u2 = '&ref=' + REF_WL;
	var u9 = 'q=&ref';
	var bt = navigator.userAgent.indexOf('MSIE');
	var wn = WINDOW_NAME_EOWP_OPTION;
	// 参照ページのウィンドウ設定
	if (HREF_STATUS == "0") {
		wn = "_self";
	} else if (HREF_STATUS == "2") {
		wn = "_blank";
	}
	// ダブルクリック設定
	if (DBLCLICK_STATUS == "1") {
		var s = '';
		if (bt == -1) {
			s = String(getSelection()).replace(/｛.*｝/,'');
		} else {
			s = document.selection.createRange().text.replace(/｛.*｝/,'');
		}
		if ((!s) || (s == ' ') || (s == '.')) {
			void(0);
		} else {
			var u_op = EOWP_URI + "?q=" + encodeURIComponent(trim(s)) + u2;
			if (u_op.indexOf(u9) > -1) {
				void(0);
			} else {
				void(window.open(u_op, wn));
			}
		}
	}
};
function trim(text) {
  return text.replace(/^\s+|^　+|\s+$|　+$/g, "");
};
// 矢印を利用するページ移動
var PAGE_CNT = "1";
var isPgFlg = false;
function changePage(act) {
	var pgNo = parseInt(document.forms["fmHdn"].pg2.value);
	if (false == isPgFlg) {
		if (act == "back" && 0 < pgNo) {
			if (1 == pgNo) {
//				return false;
			} else {
				doPage(pgNo-1);
				isPgFlg = true;
			}
		} else if (act == "next" && parseInt(PAGE_CNT) > pgNo) {
			doPage(pgNo+1);
			isPgFlg = true;
		} else {
//			return false;
		}
	} else {
//		return false;
	}
};
// 音声再生
var SOUND_URL = "https://cdn2.alc.co.jp/eowp/sound/";
var ele_play = null;
function playSound(file, id) {
  try {
    var ele = document.createElement("audio");
    if (ele && ele.canPlayType("audio/mp3")) {
      ele.setAttribute("src", SOUND_URL + file);
      ele.play();
      return false;
    }
  } catch (e) {}
  
  var flash = false;
  try{
    var f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
    flash = true;
  } catch(e) {}
  if (!flash) {
    if ((navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0) {
      flash = true;
    }
  }
  if (swfobject && flash) {
    try {
      var vars = {
         u : SOUND_URL + file
      };
      var prms = {
        scale : "noScale", 
        menu : "false", 
        allowFullscreen : "true", 
        allowScriptAccess : "always", 
        bgcolor : "#FFFFFF"
      };
      var atts = {};
      swfobject.embedSWF(SOUND_URL + "eowp.swf", id, "0", "0", "9.0.0", SOUND_URL + "expressInstall.swf", vars, prms, atts);
      return false;
    } catch (e) {}
  }
  
  if (navigator.userAgent && (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Firefox") >= 0)) {
    if (ele_play != null) {
      document.body.removeChild(ele_play);
    }
    if (navigator.userAgent.indexOf("MSIE") >= 0) {
      ele_play = document.createElement('div');
      var html = '';
      html += '<object width="0" height="0" classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="application/x-oleobject">';
      html += '<param name="FileName" value="' + SOUND_URL + file + '">';
      html += '<param name="AutoStart" value="true">';
      html += '<param name="ShowControls" value="false">';
      html += '<param name="ShowStatusBar" value="false">';
      html += '</object>';
      ele_play.innerHTML = html;
    }
    else {
      ele_play = document.createElement("embed");
      ele_play.setAttribute("src", SOUND_URL + file);
//      ele_play.setAttribute("hidden", "true");
      ele_play.setAttribute("autostart", "true");
      ele_play.setAttribute("autoplay", "true");
      ele_play.setAttribute("style", "visibility: hidden;");
    }
    document.body.appendChild(ele_play);
    return false;
  }
//  window.open(SOUND_URL + file, "音声", "width=400,height=100,location=no,menubar=no,toolbar=no");
  var win = window.open("","_blank","width=400,height=100,location=no,menubar=no,toolbar=no");
  win.document.write("<html><head><title>音声</title>");
  win.document.write("</head>");
  win.document.write("<body><iframe src=\"" + SOUND_URL + file + "\" frameborder=\"0\" width=\"100%\" height=\"80%\"></iframe></body>");
  win.document.write("</html>");
  win.document.close();
  return false;
}
// -->
