module.exports = {
    start: (swiper) =>
    {
        let idx = swiper.activeIndex;
        let animateObj = $(swiper.slides[idx]).find('.animated');
        let defaultDelay = 0;
        let defaultAnimation = 'fadeInUp';
        animateObj.each(function(idx, ele)
        {
            $(ele).one('animationend webkitAnimationEnd ', function()
            {
                if (!$(this).hasClass('infinite'))
                {
                    //$(this).removeClass('animated');
                    $(this).removeClass($(this).attr('data-animate'));
                }
            });
            let delay = $(ele).attr('data-animate-delay');
            let animation = $(ele).attr('data-animate');
            if (delay)
            {
                delay = parseInt(delay);
            }
            else
            {
                delay = defaultDelay;
                $(ele).attr('data-animate-delay', delay);
            }
            if (!animation)
            {
                animation = defaultAnimation;
                $(ele).attr('data-animate', animation);
            }
            setTimeout(function()
            {
                $(ele).addClass(animation);
                $(ele).css('visibility', 'visible');
            }, delay);
        });
    },
    //swiper切换完成后，隐藏切换前的slide的动画元素
    hide: (swiper) =>
    {
        let animateObj = $(swiper.slides[swiper.previousIndex]).find('.animated');
        animateObj.css('visibility', 'hidden');
    }

};