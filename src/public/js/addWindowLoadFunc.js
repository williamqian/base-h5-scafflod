//增加window onload事件后执行的函数
module.exports = function addWindowLoadFunc(func)
{
    var oldFunc = window.onload;
    if (typeof(window.onload) !== 'function')
    {
        window.onload = func;
    }
    else
    {
        window.onload = function()
        {
            oldFunc();
            func();
        };
    };
};