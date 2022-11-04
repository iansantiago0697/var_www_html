$(function(){
  // SP メニュー ------------------------------
  $('.header-gnav-btn, .header-gnav-sp-btn, .header-gnav-sp-menu div, .header-gnav-sp-menu a').on('click', function() {
    $('.header').toggleClass('is-open');
  });
});