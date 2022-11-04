function gofms1() {
	//ALC Onlineshop search
	for ( i = 0; i < document.fms1.searchkey.length; i++ ) {
	    if ( document.fms1.searchkey[i].checked == true ) {
	        chkflg  = document.fms1.searchkey[i].value;
	    }
	}
	if( document.fms1.SEARCHTXT.value == "" ) {
		alert("検索キーワードを入力してください");
	} else {
		document.fms1.MATERIAL_DISP_NAME.value = "";
		document.fms1.AUTH_NAME.value = "";

		if ( chkflg == 1 ) {
			document.fms1.MATERIAL_DISP_NAME.value = document.fms1.SEARCHTXT.value;
		} else {
			document.fms1.AUTH_NAME.value = document.fms1.SEARCHTXT.value;
		}
		
//		document.charset='UTF-8'; 
		document.fms1.submit();
//		document.charset='shift_jis'; 
	}
};

