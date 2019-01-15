let notie = require('notie');
let validator = require('./validator.js');
module.exports = function(onSuccess)
{
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
            //btn.html('正在提交');
            $.ajax(
            {
                type: 'post',
                url: 'api.php?type=action&action=submit',
                data: formObj.serialize(),
                dataType: 'json',
                complete: function()
                {
                    btn.html(txt);

                },
                success: function(res)
                {
                    if (onSuccess) onSuccess(formObj, res);
                    else
                    {
                        console.log('submit success');
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
};