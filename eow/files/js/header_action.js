$(function(){
    // SP メニュー ------------------------------
    $('.header-gnav-btn, .header-gnav-sp-btn, .header-gnav-sp-menu div, .header-gnav-sp-menu a').on('click', function(){
        $('.header').toggleClass('is-open');
    });
  
    // スムーススクロール
    var scrollObject = (function() {
        var elm = (function() {
            if('scrollingElement' in document) {
                return document.scrollingElement;
            }
            if(navigator.userAgent.indexOf('WebKit') != -1) {
                return document.body;
            }
            return document.documentElement;
        })();
        var speed = 500;
        var easing = 'swing';
        return {
            getElm: function() {
                return elm;
            },
            smoothScroll: function() {
                var href = $(this).attr("href");
                $(elm).animate({
                    scrollTop: -50 + $(href == "#" ? 'html' : href).offset().top
                }, speed, easing);
                return false;
            }
        }
    })();
    $('a[href^="#"]').not('.noscroll').on('click', scrollObject.smoothScroll);
});

/**
 * When using this script, you need to copy the html elements (dialogs) from 
 * top page (index.html) - can be found at the bottom.
 * 
 * Div elements with ids:
 * - js_p_onsei
 * - js_p_history
 * - js_p_wordbook
 */
$(function(){
    // 音声再生パネルを開く
    $('#js_s_onsei').click(function () {
        open_panel('#js_p_onsei');
        return false;
    });
    // EOWP_SHOP-323 Click register for menus on small screen
    $('#js_s_onsei_sp').click(function () {
        open_panel('#js_p_onsei');
        return false;
    });

    // 検索履歴パネルを開く
    $('#js_s_history').click(function () {
        open_panel('#js_p_history');
        return false;
    });
    // EOWP_SHOP-323 Click register for menus on small screen
    $('#js_s_history_sp').click(function () {
        open_panel('#js_p_history');
        return false;
    });

    // 単語帳パネルを開く
    $('#js_s_wordbook').click(function () {
        open_panel('#js_p_wordbook');
        return false;
    });
    // EOWP_SHOP-323 Click register for menus on small screen
    $('#js_s_wordbook_sp').click(function () {
        open_panel('#js_p_wordbook');
        return false;
    });

    // パネルを閉じる
    $(".js_p_close").click(function () {
        $('#js_p_onsei').css('display', 'none');
        $('#js_p_history').css('display', 'none');
        $('#js_p_wordbook').css('display', 'none');
    });
});

// パネルを開く
function open_panel(id) {
    $(id).css('display', 'block');
    var whole_h = document.body.clientHeight;
    $(id + ' > .bg_box').css('height', whole_h);
    $(id + ' > .bg_box2').css('height', whole_h);
}

