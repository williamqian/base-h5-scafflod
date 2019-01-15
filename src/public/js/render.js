const cdn = require('cdn');
module.exports = function(webpackConfig) {
    let page = webpackConfig.htmlWebpackPlugin.options.page;
    const pageDir = '../../pages/';
    let data = require('../../pages/' + page + '/data.js');

    const content = require('ejs-loader!../../pages/' + page + '/content');
    const tplRaw = require('raw-loader!../../pages/' + page + '/content');
    //console.log(tplRaw);
    const components = require('components')(tplRaw);
    //console.log(components);
    data = Object.assign({}, { data: data }, { cdn });
    let renderData = {};
    for (let c in components) {
        renderData[components[c]] = require('../../components/' + components[c] + '/content')(data);
    }
    renderData = Object.assign({}, data, renderData);
    return content(renderData);
};