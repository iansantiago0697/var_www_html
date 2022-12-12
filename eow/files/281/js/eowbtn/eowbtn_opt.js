/* "Eijiro on the Web" Button Script - by SPACE ALC : Oct. 28, 2008 ALL RIGHTS RESERVED */
/* modified by SPACE ALC : Nov. 11, 2008 */

var rf;
if (!rf) {
	rf = 'bt';
}

var u1 = '/';
var u2 = '/UTF-8/?ref=' + rf;
var u3 = '&dom=' + location.hostname;
var u9 = '//UTF-8/';
var bt = navigator.userAgent.indexOf('MSIE');

window.onload = function ini(){
	document.ondblclick = function seow_s() {
		if (document.eow.d[0].checked) {
			var s = '';
			if (bt == -1) {
				s = String(getSelection());
				} else {
				s = document.selection.createRange().text;
			}
			if ((!s) || (s == ' ') || (s == '.')) {
				void(0);
			} else {
				u_op = u1 + encodeURIComponent(s) + u2 + u3;
				if (u_op.indexOf(u9) > -1) {
					void(0);
				} else {
					void(window.open(u_op,'eowb'));
				}
			}
		}
	}
}

function seow_f(q) {
	var s = '';
	if (bt == -1) {
		s = String(getSelection());
	} else {
		s = document.selection.createRange().text;
	}
	s = s.substr(0,64);
	if (!s) {
		if (!q) {
			q = prompt('『英辞郎 on the Web』で検索','');
			u_op = u1 + encodeURIComponent(q) + u2 + u3;
			if (!q) {
				void(0);
			} else {
				void(window.open(u_op,'eowb'));
			}
		} else {
			u_op = u1 + encodeURIComponent(q) + u2 + u3;
			void(window.open(u_op,'eowb'));
		}
	} else {
		if (!q) {
			u_op = u1 + encodeURIComponent(s) + u2 + u3;
			void(window.open(u_op,'eowb'));
		} else {
			u_op = u1 + encodeURIComponent(s) + u2 + u3;
			void(window.open(u_op,'eowb'));
		}
	}
}
