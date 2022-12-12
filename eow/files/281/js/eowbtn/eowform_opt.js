/* function for form generation - by SPACE ALC : Oct. 28, 2008 ALL RIGHTS RESERVED */
/* modified by SPACE ALC : Nov. 11, 2008 */

function eow_f(t) {
	bu = '//eowimg.alc.co.jp/content/js/eowbtn/'
	f1 = '<form action="javascript:void(0);" name="eow">';
	f2 = '<input type="text" name="q" size="20" class="eowbtn_input_t" onclick="this.select();" ondblclick="reset(this.form);">';
	if (t == 0) {
		btn_img = 'btn_l.png';
	} else if (t == 1) {
		btn_img = 'btn_s.png';
	} else {
		btn_img = 'btn_l.png';
	}
	f3 = '<input type="image" name="btn" src="'+ bu + btn_img + '" class="eowbtn_input_i" onclick="seow_f(this.form.q.value);"; ondblclick="seow_f(this.form.q.value);";>';
	f4 = '<a href="//eowimg.alc.co.jp/content/help/eowbtn_opt.html" target="_blank" class="tooltip">';
	f5 = '<img src="'+ bu + 'ic_help.gif" border="0" width="13" height="13"" class="eowbtn_tip_i">';
	f6 = '<span>この『英辞郎ボタン』を使って SPACE ALC 提供の『英辞郎 on the Web』の英和・和英辞書検索ができます。詳しくは、「？」アイコンをクリックしてください</span>';
	f7 = '</a>';
	f8 = '<span class="eowbtn_link_t"-->supported by <a href="http://www.alc.co.jp/" target="_blank">SPACE ALC</a></span><br><span class="eowbtn_link_t">ダブルクリック検索：<input id="on" type="radio" name="d" value="1" checked><label for="on"> on</label> <input id="off" type="radio" name="d" value="0"><label for="off"> off</label></span>';
	f9 = '</form>';
	f0 = f1 + f2 + f3 + f4 + f5 + f6 + f7 + f8 + f9;
	document.write(f0);
}
