/**
* rollOver on jQuery
* rollOver tag:img,input
* rollOver class:Hover
* rollOver FileName:*_over.*
* Last modify:20081210
* Licensed:MIT License
* @author	AkiraNISHIJIMA(https://nishiaki.probo.jp/2008/12/jquery.html)
*/

function rollOver(){
	var preLoad =	new Object();
	$('img.Hover,input.Hover').not("[src*='_over.']").each(function(){
		var imgSrc =	this.src;
		var fType	= imgSrc.substring(imgSrc.lastIndexOf('.'));
		var imgName = imgSrc.substr(0, imgSrc.lastIndexOf('.'));
		var imgOver = imgName + '_over' + fType;
		preLoad[this.src] =	new Image();
		preLoad[this.src].src = imgOver;
		$(this).hover(
			function	(){
				  this.src	= imgOver;
			},
			function	(){
				this.src	= imgSrc;
			}
		);
	});
}
$(document).ready(rollOver);