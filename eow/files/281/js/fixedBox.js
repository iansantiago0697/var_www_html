$(function() {
    var offset = $('#fix').offset();
 
    $(window).scroll(function () {
        if ($(window).scrollTop() > offset.top) {
            $('#fix').addClass('fixed');
        } else {
            $('#fix').removeClass('fixed');
        }
    });
});


