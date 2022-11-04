var CONTEXT_PATH = "/";
var SEARCH_URI = "search";

function allReplace(text, sText, rText) {
	while (true) {
		dummy = text;
		text = dummy.replace(sText, rText);
		if (text == dummy) {
			break;
		}
	}
	return text;
};

function spaces2space(s1) {
	var s = s1;
	while (-1 != s.indexOf("  ")) {
		s = s.replace("  ", " ");
	}
	return s;
};

function checkWord(obj) {
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
	if (!ck) {
		alert("* 以外の検索語が入力されていません");
		return false;
	};
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
			window.open(wname + SEARCH_URI + "?q=" + encodeURL(document.forms[obj].q.value) + ref, wname);
		} else {
			document.location.href = CONTEXT_PATH + SEARCH_URI + "?q=" + encodeURL(document.forms[obj].q.value) + ref;
		}
	}
	return false;
};

function wordClear(obj) {
	document.forms[obj].q.value = "";
	document.forms[obj].q.focus();
};

function encodeURL(str) {
	var s0, i, s, u;
	s0 = "";
	for (i = 0; i < str.length; i++) {
		s = str.charAt(i);
		u = str.charCodeAt(i);
		if (s == " ") {
			s0 += "+";
		} else {
			if (u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))) {
				s0 = s0 + s;
			} else if (u == 0xa5) {
				s0 = s0 + "%5c";
			} else {
				if ((u >= 0x0) && (u <= 0x7f)) {
					s = "0" + u.toString(16);
					s0 += "%" + s.substr(s.length - 2);
				} else if (u > 0x1fffff) {
					s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
					s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				} else if (u > 0x7ff) {
					s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				} else {
					s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
			}
		}
	}
	return s0;
};

function decodeURL(str) {
	var s0, i, j, s, ss, u, n, f;
	s0 = "";
	for (i = 0; i < str.length; i++) {
		s = str.charAt(i);
		if (s == "+") {
			s0 += " ";
		} else {
			if (s != "%") {
				s0 += s;
			} else {
				u = 0;
				f = 1;
				while (true) {
					ss = "";
					for (j = 0; j < 2; j++) {
						sss = str.charAt(++i);
						if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f")) || ((sss >= "A") && (sss <= "F"))) {
							ss += sss;
						} else {
							--i;
							break;
						}
					}
					n = parseInt(ss, 16);
					if (n <= 0x7f) {
						u = n;
						f = 1;
					}
					if ((n >= 0xc0) && (n <= 0xdf)) {
						u = n & 0x1f;
						f = 2;
					}
					if ((n >= 0xe0) && (n <= 0xef)) {
						u = n & 0x0f;
						f = 3;
					}
					if ((n >= 0xf0) && (n <= 0xf7)) {
						u = n & 0x07;
						f = 4;
					}
					if ((n >= 0x80) && (n <= 0xbf)) {
						u = (u << 6) + (n & 0x3f);
						--f;
					}
					if (f <= 1) {
						break;
					}
					if (str.charAt(i + 1) == "%") {
						i++;
					} else {
						break;
					}
				}
				s0 += String.fromCharCode(u);
			}
		}
	}
	return s0;
};

$(document).ready(function() {
	if (!$('html').hasClass('msie-lt9') && !$('html').hasClass('msie9') && !$('html').hasClass('msie10')) {
		$('#q').focus();
	}
});
