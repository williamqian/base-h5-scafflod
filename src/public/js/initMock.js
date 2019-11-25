module.exports = function()
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
                    'name': '',
                    'headimg': '@dataImage(400x400)'
                },

            }
        );
        mock.mock(
            /api\.php\?type=action&action=signin/,
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
                            return {};
                            break;
                        case -1:
                            return {};
                            break;
                    }

                }


            }
        );

    }
}