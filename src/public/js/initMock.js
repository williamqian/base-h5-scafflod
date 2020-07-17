const $ = require('jquery');
let mock = require('mockjs');
let random = mock.Random;
module.exports = function(argOptions)
{
    let options = argOptions;
    if (typeof(options) == 'undefined')
    {
        options = {};
    }
    let defaultOptions = {
        'init':
        {
            'state|1': [1],
            'msg|1': function()
            {
                return this.state == 1 ? '成功（测试接口返回）' : '失败（测试接口返回）'
            },
            'data':
            {
                'name': '',
                'headimg': random.dataImage("400x400")
            },
        },
        'signin':
        {
            'state|1': [1, -1],
            'msg|1': function()
            {
                return this.state == 1 ? '成功（测试接口返回）' : '失败（测试接口返回）'
            },
            'data': function()
            {
                switch (this.state)
                {
                    case 1:
                        return {
                            'name': '刘德华',
                            'headimg': random.dataImage("400x400")
                        };
                        break;
                    case -1:
                        return {};
                        break;
                }

            }
        }
    };

    let finalOptions = $.extend(true,
    {}, defaultOptions, options);

    if (isDebug)
    {

        mock.setup(
        {
            timeout: '20-80'
        });
        $.each(finalOptions, function(action, tpl)
        {
            let reg = new RegExp(`api\\.php\\?type=action&action=${action}`);
            mock.mock(reg, tpl);
        });

    }
}