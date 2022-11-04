//var alert_msg = 'ただ今、検索しにくい状態になっております。正常に検索ができない場合は、しばらくお時間をおいてからお試し下さい。';

var alert_msg = '';

var alert_box;
if (alert_msg == '') {
	alert_box = '';
} else {
	alert_box = '<div style="border: 2px #F94A00 dotted;padding:3px;margin:3px 3px 3px 0; text-align:center;"><span style="color:#F94A00; font-size:10pt;">' + alert_msg + '</span></div>';
//	alert_box = '<table style="border-collapse: collapse; border: 1px #BF0000 solid;"><tr><td style="border: 1px #BF0000 solid;"><span style="color:#BF0000; font-size:10pt;">' + alert_msg + '</span></td></tr></table>';
};

