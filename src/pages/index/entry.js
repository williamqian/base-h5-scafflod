require('./css/style.scss');
//加载组件js,组件css也是在组件的js里加载的
//const r = require.context('components', true, /.+\/script\.js$/);
const r = require.context('components', true, /^\.\/(header|footer|loading)\/script\.js$/);
r.keys().forEach(r);
//页面

const $ = require('jquery');
const weui = require('weui');
let initJssdk = require('public/js/initJssdk');
let initMock = require('public/js/initMock');
let initData = require('public/js/initData');
let initSwiper = require('public/js/initSwiper');
let initForm = require('public/js/initForm');
let render = function(res)
{
    let data = res.data;
    $.each(data, function(key, val)
    {
        let obj = $(`.my-${key}`);
        if (obj.length)
        {
            let tagName = obj[0].tagName.toLowerCase();
            if (tagName == 'img')
            {
                obj.attr('src', `${val}`);
            }
            else
            {
                obj.text(`${val}`);
            }
        }
    });
}

let mySwiper = null;

let init = function()
{
    initJssdk();
    initMock();

    initData(function(res)
    {
        render(res);
        let initSlide = 0;
        if (res.data.name)
        {
            initSlide = 1;
        }
        mySwiper = initSwiper(initSlide);
        initForm(function(argRes)
        {
            if (argRes.state == 1)
            {
                render(argRes);
                weui.toast(argRes.msg,
                {
                    duration: 1000
                });
                mySwiper.slideNext(800);
            }
            else
            {
                weui.alert(argRes.msg);
            }

        });
    });


};
init();