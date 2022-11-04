// tel
$(document).ready(function() {
	var ua = navigator.userAgent.toLowerCase();
	var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);
	if (!isMobile) {
			$('a[href^="tel:"]').on('click', function(e) {
					e.preventDefault();
			});
	}
});

$(function(){

	// #で始まるアンカーをクリックした場合に処理
	$('a[href^=#]').click(function() {
		var speed = 400;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});


	//高さを揃える
	$('#pro .proList .comment').matchHeight();
	$('#pro .proList dl').matchHeight();


});


$(function(){
	// Pro アコーディオン開閉
	$('#proBtn').click(function(){
		$('#proIn').slideToggle();
	});
	$('#pro .closeBtn img').click(function(){
		$('#proIn').slideUp();
	});

	// course アコーディオン開閉
	$('#courseBtn').click(function(){
		$(this).toggleClass('on');
		$('#courseIn').slideToggle();
	});
	$('#courseIn .closeBtn').click(function(){
		$('#courseBtn').removeClass('on');
		$('#courseIn').slideUp();
	});


});

$(window).bind("load", function(){
	var target;
	var position;
    if(document.URL.match(/\?function$/)) {
		$('#proIn').slideToggle();
		target = $('#function');
		position = target.offset().top;
		$('body,html').animate({scrollTop:position}, 'normal', 'swing');
		return false;
    }
    if(document.URL.match(/\?comparizon$/)) {
		$('#courseIn').slideToggle();
		target = $('#comparizon');
		position = target.offset().top;
		$('body,html').animate({scrollTop:position}, 'normal', 'swing');
		return false;
    }
    if(document.URL.match(/\?yearly$/)) {
		target = $('#yearly');
		position = target.offset().top-60;
		$('body,html').animate({scrollTop:position}, 'normal', 'swing');
		return false;
	}
    if(document.URL.match(/\?monthly$/)) {
		target = $('#monthly');
		position = target.offset().top-60;
		$('body,html').animate({scrollTop:position}, 'normal', 'swing');
		return false;
	}
    if(document.URL.match(/\?prolite$/)) {
		target = $('#prolite');
		position = target.offset().top;
		$('body,html').animate({scrollTop:position}, 'normal', 'swing');
		return false;
	}
});


