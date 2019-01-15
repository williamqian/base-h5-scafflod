/*****************/
/*** entry配置 ***/
/*****************/

let moduleExports = {};
const path = require('path');
const pageAry = require('./page.config.js');
const dir = require('./dir.config.js');

pageAry.forEach((page) => {
    moduleExports[page] = path.resolve(dir.pageDir, page + '/entry');
});

module.exports = moduleExports;