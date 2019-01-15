module.exports = function(idx) {
    var animateObj = $('.swiper-slide:eq(' + idx + ')').find('.animated');
    animateObj.each(function(idx, ele) {
        $(ele).one('animationend webkitAnimationEnd ', function() {
            if (!$(this).hasClass('infinite')) $(this).removeClass('animated');
        });
        var delay = $(ele).attr('data-animate-delay') ? parseInt($(ele).attr('data-animate-delay')) : 0;
        setTimeout(function() {
            $(ele).addClass($(ele).attr('data-animate') ? $(ele).attr('data-animate') : 'fadeInUp');
            $(ele).css('visibility', 'visible');
        }, delay);
    });
};