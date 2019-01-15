module.exports = {
    getQueryString: function(str, name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        if (str.indexOf('?') != -1)
        {
            var r = (str.split('?'))[1].match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        }
        else return null;
    }
}