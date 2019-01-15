/*******************/
/*** output配置 ***/
/******************/

let moduleExports = {};
const dir = require('./dir.config.js');
const isDebug = process.env.NODE_ENV === 'development';

/* 如果是开发环境 */
if (isDebug)
{
    moduleExports = {
        path: dir.devDir,

        filename: dir.devAssetsPath + "js/[name].js"
    }
}
/* 如果是生产环境 */
else
{
    moduleExports = {
        path: dir.proDir,

        filename: dir.proAssetsPath + "js/[name].[chunkhash:8].js"
    }
}

module.exports = moduleExports;