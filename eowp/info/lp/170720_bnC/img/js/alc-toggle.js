$(function(){
	//toggle 切り替え
	$(".toggleArea .toggleTitle").click(function(){
		$(this).next().slideToggle("fast");
		$(this).toggleClass("on");
	})
} );