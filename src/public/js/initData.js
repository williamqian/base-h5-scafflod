const $ = require('jquery');
const weui = require('weui');
module.exports = function(callback)
{
    $.ajax(
    {
        type: 'get',
        url: 'api.php?type=action&action=init',
        dataType: 'json',
        complete: function()
        {
            console.log('init ajax load completed');
            let loadingObj = $('#c-loading');
            let percentObj = loadingObj.find('span');
            loadingObj.attr('data-ajax-complete', 1);
            if (loadingObj.attr('data-img-complete'))
            {
                percentObj.html(100);
                loadingObj.fadeOut('fast');
            }

        },
        success: function(res)
        {

            if (res.state == 1)
            {
                if (typeof(callback) == 'function')
                {
                    callback(res);
                }
            }
            else
            {
                weui.alert(res.msg);
            }
        },
        error: function()
        {
            weui.alert('初始化失败，服务器发生错误')

        }
    });
}