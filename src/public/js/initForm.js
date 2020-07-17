const $ = require('jquery');
const weui = require('weui');
module.exports = function(ajaxCallback)
{
    $('input').on('blur', function()
    {
        window.scroll(0, 0);
    });

    $('.btn-submit').on('click', function()
    {
        let btn = $(this);
        let formId = $(this).attr('data-form');
        let form = null;
        if (formId)
        {
            form = $(`#${formId}`);
        }
        else
        {
            form = $(this).parents('.form,form');
            formId = form.attr('id');
        }
        let action = form.attr('data-action') || 'submit';
        weui.form.validate('#' + formId, function(error)
        {
            if (!error)
            {
                let submit = function()
                {
                    let loading = weui.loading('提交中...');
                    $.ajax(
                    {
                        type: 'post',
                        url: `api.php?type=action&action=${action}`,
                        data: form.serialize(),
                        dataType: 'json',
                        complete: function()
                        {
                            loading.hide();
                        },
                        success: function(res)
                        {
                            if (typeof(ajaxCallback) == 'function')
                            {
                                ajaxCallback(res);
                            }
                        },
                        error: function()
                        {
                            weui.topTips('提交失败，服务器发生错误');
                        }
                    });
                };

                submit();

            }
        },
        {
            regexp:
            {
                IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
            }
        });


    });

}