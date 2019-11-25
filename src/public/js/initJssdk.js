const $ = require('jquery');
const wx = require('wx');
let wxConfig = function(jssdkInfo, shareInfo)
{
    wx.config(
    {
        debug: false,
        appId: jssdkInfo.appid,
        timestamp: jssdkInfo.timestamp,
        nonceStr: jssdkInfo.nonce_str,
        signature: jssdkInfo.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });
    wx.ready(function()
    {

        wx.onMenuShareTimeline(
        {
            title: shareInfo.title, // 分享标题
            link: shareInfo.link, // 分享链接
            imgUrl: shareInfo.image, // 分享图标
            success: function() {

            },
            cancel: function()
            {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage(
        {
            title: shareInfo.title, // 分享标题
            desc: shareInfo.des, // 分享描述
            link: shareInfo.link, // 分享链接
            imgUrl: shareInfo.image, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function()
            {
                // 用户确认分享后执行的回调函数
            },
            cancel: function()
            {
                // 用户取消分享后执行的回调函数
            }
        });
    });
    wx.error(function(res) {});
};

module.exports = function(argApp, shareInfo)
{
    let app = argApp;
    if (typeof(app) == 'undefined')
    {
        app = 'xtk';
    }
    let defaultShareInfo = {
        title: $(document).attr('title'),
        des: $(document).attr('title'),
        link: location.href,
        image: location.protocol + '//' + location.hostname + location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) + $('#wx_share_img').attr('src')
    };
    shareInfo = $.extend(
    {}, defaultShareInfo, shareInfo);
    let jssdkUrl = location.href;
    let url = '';
    if (app == 'xtk')
    {
        url = '//api.signin.cityche.cn/jssdk/v1/';
    }
    else if (app == 'bf')
    {
        url = '//api.bigfoot.xin/jssdk/v1/';
    }
    $.getJSON(url + '?jssdk_url=' + encodeURIComponent(jssdkUrl) + '&callback=?', function(res)
    {
        wxConfig(res, shareInfo);
    });

}