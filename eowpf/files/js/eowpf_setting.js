<!--
// Cookieセット
function setUserSetting2Cookie() {
	var d = $('#setting :input').serializeArray();
	var j = 1;
    for(var i=0;i<d.length;i++) {
    	if (j < cookies.length-2) {
	        cookies[j]=d[i].value;
	    }
        j++;
    }
    setCookie();
};
function setUserSettingAll() {
	$('input[name="fontSize"]').val([cookies[1]]);
	$('input[name="lineHeight"]').val([cookies[2]]);
	$('input[name="font"]').val([cookies[3]]);
	$('input[name="kana"]').val([cookies[4]]);
	$('input[name="dblClick"]').val([cookies[5]]);
	$('input[name="refWindow"]').val([cookies[6]]);
	$('input[name="srchWord"]').val([cookies[7]]);
	$('input[name="suggest"]').val([cookies[8]]);
	$('input[name="reibun"]').val([cookies[9]]);
	$('input[name="srchExtension"]').val([cookies[10]]);
	$('#dispCnt').val([cookies[11]]);
	$('input[name="wordbook"]').val([cookies[12]]);
	$('input[name="history"]').val([cookies[13]]);
	$('#timezone').val([cookies[14]]);
};
function setUserSettingDisp() {
	$('#js_size').removeClass('large largest');
	$('#js_line').removeClass('normal wide');
	$('#js_font').removeClass('gothic mincho');
	switch($('input[name="fontSize"]:checked').val()){
		case "0":break;
		case "1":$('#js_size').addClass('large');break;
		case "2":$('#js_size').addClass('largest');break;
	}
	switch($('input[name="lineHeight"]:checked').val()){
		case "0":$('#js_line').addClass('normal');break;
		case "1":$('#js_line').addClass('wide');break;
	}
	switch($('input[name="font"]:checked').val()){
		case "0":$('#js_font').addClass('gothic');break;
		case "1":$('#js_font').addClass('mincho');break;
	}
};
function loadForm() {
	js_eowpf();
	setUserSettingAll();
	setUserSettingDisp();
};
// -->
