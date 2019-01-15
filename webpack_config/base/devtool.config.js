/******************/
/*** devtoo配置 **/
/******************/

let moduleExports = null;
const isDebug = process.env.NODE_ENV === 'development';
/* 如果是开发环境则生成source-map */
if (isDebug) {
    moduleExports = '#source-map';
}
/* 如果是生产环境则不生成source-map */
else {
    moduleExports = false;
}

module.exports = moduleExports;