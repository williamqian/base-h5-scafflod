const $ = require('jquery');
const swiper = require('swiper');
let animation = {
    start: (swiper) =>
    {
        let idx = swiper.activeIndex;
        let animateObj = $(swiper.slides[idx]).find('.animated');
        let defaultDelay = 0;
        let defaultAnimation = 'fadeInUp';
        let lastDelay = null;
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
                if (lastDelay == null)
                {
                    delay = defaultDelay;
                }
                else
                {
                    delay = lastDelay + 300;
                }
                $(ele).attr('data-animate-delay', delay);
            }
            lastDelay = delay;
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

module.exports = function(argInitSlide, argContainer)
{
    let initSlide = argInitSlide;
    let container = argContainer;
    if (typeof(container) == 'undefined')
    {
        container = '.swiper-container';
    }
    if (typeof(initSlide) == 'undefined')
    {
        initSlide = 0;
    }
    return new swiper(container,
    {
        initialSlide: initSlide,
        threshold: 20,
        speed: 800,
        noSwiping: true,
        direction: 'vertical',
        on:
        {
            init: function(swiper)
            {
                animation.start(this);
            },
            slideChange: function()
            {
                animation.start(this);
            },
            slideChangeTransitionEnd: function()
            {
                animation.hide(this);
                if ($(this.slides[this.activeIndex]).hasClass('no-prev'))
                {
                    this.allowSlidePrev = false;
                }
                else
                {
                    this.allowSlidePrev = true;
                }
                if ($(this.slides[this.activeIndex]).hasClass('no-next'))
                {
                    this.allowSlideNext = false;
                }
                else
                {
                    this.allowSlideNext = true;
                }
            }
        }
    });
}