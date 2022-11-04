(function($) {
	"use strict";

	$(function() {
		/**************************
		 * スムーススクロール
		 *
		 * @スムーススクロールさせない場合はclassにnoscrをつける。
		 * @飛び先をページのトップへ持ってくる場合にはclassにnoScをつける。
		 *************************/
		$("a[href^=#]").click(function(e) {
			var h, t;
			e.preventDefault();
			try {
				t = this.hash;
				h = $(t).offset().top;
				return $("html,body").animate({scrollTop: h-73}, 800);
			} catch (err) {}
		});


		/**************************
		 * ロールオーバー
		 *************************/
		$('img.over').not('[src*="_on."]').each(function() {
			var img, src, src_on;
			img = $(this);
			src = img.attr('src');
			src_on = src.substr(0, src.lastIndexOf('.')) + '_on' + src.substring(src.lastIndexOf('.'));

			//プリロード
			$('<img>').attr('src', src_on);

			//アクティブ化対策のため、マウスオン・オフのたびにクラスが存在するか確認。
			return img.hover(function() {
				if ($(this).hasClass("over")) {
					return $(this).attr('src', src_on);
				}
			}, function() {
				if ($(this).hasClass("over")) {
					return $(this).attr('src', src);
				}
			});
		});


	});
})(jQuery);
