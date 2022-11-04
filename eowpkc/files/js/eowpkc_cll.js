<!--
/*-------------------------------------------------
  Collocation
-------------------------------------------------*/
// 頻度集計オプション表示・非表示
function changeCllOptionDisplay() {
  var elm = document.getElementById("cllOptionArea");
  if (elm.style.display == "none") {
    elm.style.display = "block";
    document.getElementById("cllOptLink").innerHTML = '<img src="' + IMG_URI + 'open_on.gif" width="93" height="16" alt="頻度集計設定" border="0" />';
    return;
  }
  elm.style.display = "none";
  document.getElementById("cllOptLink").innerHTML = '<img src="' + IMG_URI + 'open_off.gif" width="93" height="16" alt="頻度集計設定" border="0" />';
};
// 指定した単語を除去して再集計テキストボックス
function changeTextControl() {
  if(document.getElementById("notSearchKeyword").value=="ここに除去したい単語を入力してください")document.getElementById("notSearchKeyword").value="";
  document.getElementById("notSearchKeyword").style.color="Black";
};
function changeTextControl2() {
  if(document.getElementById("notSearchKeyword").value=="") {
    document.getElementById("notSearchKeyword").value="ここに除去したい単語を入力してください";
    document.getElementById("notSearchKeyword").style.color="#666666";
  }
};
// 指定した単語を除去して再集計の説明
function getNotSearchKeywordDescription() {
	var words = noWords.replace(/\s/g, ", ");
  alert('・除去したい単語の指定があれば、入力欄に入力してください。\n・複数の単語を指定する場合は、半角スペースで区切ってください\n・入力がない場合は、自動的に\n「'+words+'」\nを除去します');
};
// 同じ頻度の単語を表示・非表示
function changeWordsDisplay(idname) {
  var elm = document.getElementById(idname);
  if (elm.style.display == "none") {
    elm.style.display = "inline";
    document.getElementById("wordsArea_" + idname).innerHTML = '<img src="' + IMG_URI + 'frequency_on.gif" width="93" height="11" alt="同じ頻度の単語" border="0" style="margin:3px;" /></a>';
    return;
  }
  elm.style.display = "none";
  document.getElementById("wordsArea_" + idname).innerHTML = '<img src="' + IMG_URI + 'frequency_off.gif" width="93" height="11" alt="同じ頻度の単語" border="0" style="margin:3px;" /></a>';
};
// var noWords = '';
// 再集計ボタン押下
function doCllRecount() {
	var gkrName = 'genkei';
	var rcrName = 'jokyo';
	var rcqId = 'notSearchKeyword';
	var isChecked;
	var msg = "ここに除去したい単語を入力してください";
	var elm = document.getElementById(rcqId);
	var rcq = '';
	var rcr = '0';
	var gkr = '0';
	var rcq2 = document.forms["fmHdn"].rcq2.value;
	var rcr2 = document.forms["fmHdn"].rcr2.value;
	var gkr2 = document.forms["fmHdn"].gkr2.value;
	var gkrbutton = document.getElementsByName(gkrName);
	var rcrbutton = document.getElementsByName(rcrName);
	var gkrStatusFlg = 0;
	var rcrStatusFlg = 0;

	if (gkrbutton[1].checked && rcrbutton[1].checked) {
		if (('0' == rcr2 && '0' == gkr2) || ('' == rcr2 && '' == gkr2)) {
			return false;
		}
		if (rcr != rcr2 || gkr != gkr2) {
			document.forms["fmKC"].rcr.value = "0";
			document.forms["fmKC"].rcq.value = "";
			document.forms["fmKC"].gkr.value = "0";
		}
		if ('1' == gkr2) {
			document.forms["fmKC"].gkr.value = "0";
		}
	} else {
		if (gkrbutton[0].checked) {
			gkr = "1";
			if (gkr == gkr2) {
				gkrStatusFlg = 1;
			}
			document.forms["fmKC"].gkr.value = "1";
		} else if (gkrbutton[1].checked) {
			gkr = "0";
			if (gkr == gkr2) {
				gkrStatusFlg = 1;
			}
			document.forms["fmKC"].gkr.value = "0";
		}

		if(rcrbutton[0].checked){
			rcr = "1";
			elm.value = replaceAll(elm.value,"　"," ");
			rcq = replaceAll(elm.value," ","");
			rcq2 = replaceAll(rcq2," ","");
	    	if (elm.value == msg) {
				elm.value = noWords;
			} else if (rcq == "") {
				elm.value = noWords;
			}
			if (true == validation(elm.value, 'rcq')) {
				if (rcq == rcq2) {
					rcrStatusFlg = 1;
				} 
				if (rcr == rcr2) {
					if (rcq == rcq2) {
						rcrStatusFlg = 1;
					}
				}
				document.forms["fmKC"].rcr.value = "1";
				document.forms["fmKC"].rcq.value = elm.value;
			} else {
				return false;
			}
		} else if (rcrbutton[1].checked) {
			rcr = "0";
			if (rcr2 == rcr) {
				rcrStatusFlg = 1;
			}
			document.forms["fmKC"].rcr.value = "0";
			document.forms["fmKC"].rcq.value = "";
		}
	}

	if (gkrStatusFlg == 1 && rcrStatusFlg == 1) {
		return false;
	}

	document.forms["fmKC"].q.value = document.forms["fmHdn"].q2.value;
	document.forms["fmKC"].hk.value = document.forms["fmHdn"].hk2.value;
	document.forms["fmKC"].rfn.value = document.forms["fmHdn"].rfn2.value;
	doHkCheck();
	doAction('collocation');
};
// フォームロード処理
function loadForm() {
	// カーソル移動
	moveFocus();
};
var noWords = '';
// -->