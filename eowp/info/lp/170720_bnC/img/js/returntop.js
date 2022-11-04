var windowWidth = $(window).width();
var windowSm = 640;
if (windowWidth <= windowSm) {
    //横幅640px以下のとき（スマホ等）に行う処理を書く
   $(function() {
    var showFlag = false;
    var topBtn = $('#returnTop');
    topBtn.css('bottom', '-100px');
    var showFlag = false;
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        if (showFlag == false) {
          showFlag = true;
          topBtn.stop().animate({'bottom' : '5px'}, 200);
        }
      } else {
        if (showFlag) {
          showFlag = false;
          topBtn.stop().animate({'bottom' : '-100px'}, 200);
        }
      }
    });
    //スクロールしてトップ
    topBtn.click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  });
} else {
    //横幅640px超のとき（タブレット、PC）に行う処理を書く
   $(function() {
    var showFlag = false;
    var topBtn = $('#returnTop');
    topBtn.css('bottom', '-100px');
    var showFlag = false;
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        if (showFlag == false) {
          showFlag = true;
          topBtn.stop().animate({'bottom' : '50px'}, 200);
        }
      } else {
        if (showFlag) {
          showFlag = false;
          topBtn.stop().animate({'bottom' : '-100px'}, 200);
        }
      }
    });
    //スクロールしてトップ
    topBtn.click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  });
}