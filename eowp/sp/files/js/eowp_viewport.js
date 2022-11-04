(function() {
	//viewport設定のmetaタグを書き込み
	if(navigator.userAgent.indexOf('iPhone') > -1  || navigator.userAgent.indexOf('iPod')  > -1){
		document.write('<meta id="viewport" name="viewport" content="width=640px, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no" />');
	}else if(navigator.userAgent.indexOf('iPad') > -1){
		document.write('<meta id="viewport" name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no" />');
	}else if(navigator.userAgent.indexOf('Mobile') > -1){
		document.write('<meta id="viewport" name="viewport" content="width=640px, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5" />');
	}else{//タブレット
		document.write('<meta id="viewport" name="viewport" content="width=device-width, target-densitydpi=device-dpi, initial-scale=0.7, maximum-scale=0.7, minimum-scale=0.7, user-scalable=no" />');
	//	document.write('<meta id="viewport" name="viewport" content="width=device-width, target-densitydpi=medium-dpi" />');
	}
})();