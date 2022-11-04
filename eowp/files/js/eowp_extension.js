$(document).ready(function(){

if (navigator.userAgent.indexOf('iPhone') == -1
	&& navigator.userAgent.indexOf('iPad') == -1
	&& navigator.userAgent.indexOf('iPod') == -1
	&& navigator.userAgent.indexOf('Android') == -1) {

	var selectedText = '';
	var enhancedText = '';
	var dc = "EJ";
	var mouseupFlg = false;

	// EOWP-841
	var speechSubMenu = '';
	if (scrmode === 'main') {
		if (canUseSpeech) {
			speechSubMenu = "<li id='speech'><span>音声再生</span></li>";
		} else {
			speechSubMenu = "<li id='speech'><span style='color: gray'>音声再生</span></li>";
		}
	}
	$('body').append(
		"<ul id='extendedmenu'>" +
			speechSubMenu +
			"<li id='research'><span>選択範囲を再検索</span></li>" +
			"<li id='wiki'><span>Wikipediaで検索</span></li>" +
			"<li id='google'><span>Googleで検索</span></li>" +
			"<li id='googlebks'><span>Google Booksで検索</span></li>" +
			"<li id='googleisch'><span>Google 画像で検索</span></li>" +
			"<li id='off' class='last' style='text-align:right;'><a href='' onclick='return off_extension()'>表示をOFF</a></li>" +
		"</ul>"
	);

	var mouseX = 0;
	var mouseY = 0;
	$(document).mousemove(function(e){
		mouseX = e.pageX;
		mouseY = e.pageY;
	});

	var winH = 0;
	var winW = 0;
	function resizeScreen() {
		winH = $(window).height();
		winW = $(window).width();
	}

	var origMargin = $('body').css("margin-top");
	var origbgPosition =  $('body').css("backgroundPosition");
	if (!origbgPosition) {
		origbgPosition = '0 0';
		$('body').css("backgroundPosition", origbgPosition);
	}

	if (origMargin == 'auto') origMargin = 0;
	resizeScreen();
	$(window).resize(function(){
		resizeScreen();
	});

	var isIE = /msie|MSIE/.test(navigator.userAgent);
	var isIE6 = /msie|MSIE 6/.test(navigator.userAgent);
	var isIE7 = /msie|MSIE 7/.test(navigator.userAgent);
	var isIE8 = /msie|MSIE 8/.test(navigator.userAgent);

	if (isIE6 || isIE7 == true){
		if (isIE6){
			try {
				document.execCommand('BackgroundImageCache', false, true);
			} catch(e) {}
		}
		$('#extendedmenu li').hover(
		  function () {
			$(this).addClass('ie');
		  },
		  function () {
			$(this).removeClass('ie');
		  }
		);
	}

	function closeExtendedMenu() {
		$('#extendedmenu').animate({opacity:.01}, 100, function(){
			$('#extendedmenu').css('left', -1000);
		});
	}
	closeExtendedMenu();

	$('body').mouseup(function(){
		if(!(extensionFlg != null && extensionFlg == '1')){
			return;
		}
		if (mouseupFlg) {
			mouseupFlg = false;
			return;
		}
		closeExtendedMenu();
	});

	var showExtendedMenu = function(){
		if(!(extensionFlg != null && extensionFlg == '1')){
			return;
		}

		mouseupFlg = true;

		var userSelection;
		if(window.getSelection){
			userSelection=window.getSelection();
		}else if(document.selection){
			userSelection=document.selection.createRange();
		}
		selectedText=userSelection;
		if(userSelection.text){
			selectedText=userSelection.text;
		}
		if (isIE == false){
			selectedText=selectedText.toString();
		}

		if (selectedText.length > 0) {

			// EJ or JE
			dc = "EJ";
			for (i = 0; i < selectedText.length; i++) {
				var c = selectedText.charCodeAt(i);
				if (
						(c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c == 0x00A5) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4) ||
						(c >= 0x2010 && c <= 0x2014) || (c >= 0x2018 && c <= 0x201f) || (c >= 0xFF08 && c <= 0xFF09) || (c == 0xFF3B || c == 0xFF3D)
				) {
				} else {
					dc = "JE";
					break;
				}
			}

			if (isIE7 || isIE8 == true){
				mouseX += 25;
				mouseY += 25;
			}

			var boxH = $('#extendedmenu').height();
			var boxW = $('#extendedmenu').width();

			var scrollTop = $(window).scrollTop();
			var scrollLeft = $(window).scrollLeft();

			var bodyH = winH + scrollTop;
			var bodyW = winW + scrollLeft;

			if (mouseY + boxH > bodyH) {
				$('#extendedmenu').css({top: bodyH - boxH});
			}
			else if (mouseY < 0) {
				$('#extendedmenu').css({top: 0});
			}
			else {
				$('#extendedmenu').css({top: mouseY});
			}

			if (mouseX + boxW > bodyW) {
				$('#extendedmenu').css({left: bodyW - boxW});
			}
			else if (mouseX < 0) {
				$('#extendedmenu').css({left: 0});
			}
			else {
				$('#extendedmenu').css({left: mouseX});
			}

			// EOWP-841
			if (dc === 'EJ') {
				$('#speech').css({display: 'list-item'});
			} else {
				$('#speech').css({display: 'none'});
			}

			$('#extendedmenu').animate({opacity:1}, 100);
 		} else {
			closeExtendedMenu();
		}
	};

	$('#resultlist').mouseup(showExtendedMenu); // SERP
	$('#wordlist td .desc').mouseup(showExtendedMenu); // 単語帳

	$('#extendedmenu li').mousedown(function(){

		var id = $(this).attr("id");
		if (id == 'off') return false;
		// EOWP-841
		if (id == 'speech') {
			if (canUseSpeech) {
				playSpeech(selectedText);
			}
			return false;
		}
		if (id == 'wiki') sid = 3;
		else if (id == 'research') sid = 4;
		else if (id == 'google') sid = 5;
		else if (id == 'googlebks') sid = 6;
		else if (id == 'googleisch') sid = 7;

		goService(sid, dc, encodeURL(selectedText));

		return false;
	});
}
});
