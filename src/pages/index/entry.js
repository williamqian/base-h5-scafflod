require('./css/style.scss');
//加载组件js,组件css也是在组件的js里加载的
//const r = require.context('components', true, /.+\/script\.js$/);
const r = require.context('components', true, /^\.\/(header|footer|loading)\/script\.js$/);
r.keys().forEach(r);
//页面

const $ = require('jquery');
const notie = require('notie');
const swiper = require('swiper');

let mySwiper = null;
let initSlide = 0;
//微信jssdk
let jssdk = require('public/js/jssdk.2.0.js');
//表单验证
let validator = require('public/js/validator.js');
//动画
let animation = require('public/js/animation.js');
let render = function(data)
{
    $.each(data, function(key, val)
    {
        $(`.my-${key}`).text(val);
    });
}
let initSwiper = function()
{
    mySwiper = new swiper('.swiper-container',
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
            }
        }


    });

}
let initData = function()
{
    $.ajax(
    {
        type: 'get',
        url: 'api.php?type=action&action=init',
        dataType: 'json',
        complete: function() {


        },
        success: function(res)
        {

            if (res.state == 1)
            {

                if (res.data.name)
                {

                    initSlide = 1;




                }
                render(res.data);
                initSwiper();
            }
            else
            {
                notie.alert(
                {
                    type: 'error',
                    text: res.msg,
                    time: 2,

                });

            }
        },
        error: function()
        {
            notie.alert(
            {
                type: 'error',
                text: '初始化失败，服务器发生错误',
                time: 2,

            });

        }
    });
}

let initForm = function()
{
    $('input').on('blur', function()
    {
        window.scroll(0, 0);
    });
    $('form').on('submit', function(e)
    {
        e.preventDefault();
        var formObj = $(this);
        var id = formObj.attr('id');
        var validatorRes = validator.checkForm(id);
        if (!validatorRes.bool)
        {
            notie.alert(
            {
                type: 'error',
                text: validatorRes.msg,
                time: 2
            });


        }
        else
        {
            var btn = formObj.find('[type="submit"]');
            var txt = btn.html();
            btn.attr('disabled', 'disabled');
            btn.html('正在提交');
            $.ajax(
            {
                type: 'post',
                url: 'api.php?type=action&action=signin',
                data: formObj.serialize(),
                dataType: 'json',
                complete: function()
                {
                    btn.html(txt);
                    //formObj.find('input[name="name"]').val('');
                    formObj.find('input[name="name"]').removeAttr('readonly');
                    formObj.find('input[name="id"]').val('');
                },
                success: function(res)
                {

                    if (res.state == 1)
                    {
                        render(res.data);


                        mySwiper.slideNext(800);

                    }
                    else
                    {
                        btn.removeAttr('disabled');

                    }
                    if (res.state != 0)
                    {
                        notie.alert(
                        {
                            type: res.state == 1 ? 'success' : 'error',
                            text: res.msg,
                            time: 2,
                        });
                    }

                    else
                    {
                        let choices = [];
                        $.each(res.data, function(idx, ele)
                        {
                            let text = ele.name + '  ' + ele.company;
                            choices.push(
                            {
                                text: text,
                                handler: () =>
                                {
                                    console.log('choose ' + ele.id);

                                    formObj.find('input[name="name"]').val(text);
                                    formObj.find('input[name="name"]').attr('readonly', 'readonly');
                                    formObj.find('input[name="id"]').val(ele.id);
                                }
                            });
                        });
                        notie.select(
                        {
                            text: res.msg,
                            cancelText: '取消',
                            choices: choices
                        });
                    }
                },
                error: function()
                {
                    btn.removeAttr('disabled');
                    notie.alert(
                    {
                        type: 'error',
                        text: '提交失败！服务器发生错误',
                        time: 2,

                    });


                }
            });
        }
        return false;
    });
}
let initMock = function()
{
    if (isDebug)
    {
        let mock = require('mockjs');
        mock.setup(
        {
            timeout: '20-80'
        });
        mock.mock(
            /api\.php\?type=action&action=init/,
            {
                'state|1': [1],
                'msg|1': function()
                {
                    return this.state == 1 ? '成功（测试接口返回）' : '失败（测试接口返回）'
                },
                'data':
                {
                    'order': 0,
                    'company': '大脚网络科技',
                    'name': '',
                    'table': '88',
                    'headimg': ''
                },

            }
        );
        mock.mock(
            /api\.php\?type=action&action=signin/,
            {
                'state|1': [1, -1, 0],
                'msg|1': function()
                {
                    return this.state == 1 ? '成功（测试接口返回）' : (this.state == -1 ? '失败（测试接口返回）' : '含有重名信息，请从列表选择您的信息并提交')
                },
                'data': function()
                {
                    switch (this.state)
                    {
                        case 1:
                            return {
                                'order': 0,
                                'company': '大脚网络科技',
                                'name': '钱伟民',
                                'table': '88',
                            };
                            break;
                        case -1:
                            return {};
                            break;
                        case 0:
                            return [
                            {
                                'id': 1,
                                'company': '大脚网络科技',
                                'name': '钱伟民',
                            },
                            {
                                'id': 2,
                                'company': '百度',
                                'name': '李彦宏',
                            }];
                            break;
                    }

                }


            }
        );

    }
}
let init = function()
{
    $('img').on('touchstart', function(e)
    {
        e.preventDefault();
    });
    jssdk();
    initMock();
    initData();
    initForm();
};
init();