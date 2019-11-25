const $ = require('jquery');
const swiper = require('swiper');
const animation = require('public/js/animation.js');
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