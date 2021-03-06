module.exports = {
    animateCSS: function(obj, animationName, callback)
    {
        if (!obj.hasClass('animated'))
        {
            function handleAnimationEnd()
            {
                obj.removeClass(`animated ${animationName}`);
                obj.off('animationend webkitAnimationEnd', handleAnimationEnd)
                console.log(`${animationName} end`);
                if (typeof callback === 'function') callback()
            }
            obj.on('animationend webkitAnimationEnd', handleAnimationEnd);
            obj.addClass(`animated ${animationName}`).css('visibility', 'visible');
        }

    },

    /**
     * 
     * @desc   url参数转对象
     * @param  {String} url  default: window.location.href
     * @return {Object} 
     */
    parseQueryString: function(url)
    {
        url = !url ? window.location.href : url;
        if (url.indexOf('?') === -1)
        {
            return {};
        }
        var search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
        if (search === '')
        {
            return {};
        }
        search = search.split('&');
        var query = {};
        for (var i = 0; i < search.length; i++)
        {
            var pair = search[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }


}