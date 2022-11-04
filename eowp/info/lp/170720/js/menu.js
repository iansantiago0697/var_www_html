$(function(){
	$('nav').hide();
	$('header .menu-btn').on('click',function(){
		$(this).toggleClass('active');
		$('nav').slideToggle();

		if($(this).hasClass('active')){
			$(this).find('img').attr('src','/lp/toeic_new/lib/img/common/menu_btn_close.png');
		} else {
			$(this).find('img').attr('src','/lp/toeic_new/lib/img/common/menu_btn.png');
		}
	});

	$('nav li a').on('click',function(){
		$('nav').hide();
		$('header .menu-btn').removeClass('active');
		$('header .menu-btn').find('img').attr('src','/lp/toeic_new/lib/img/common/menu_btn.png');
	});


});
