/*********************/
/*** devServer配置 ***/
/*********************/

let moduleExports = {};
const dir = require('./dir.config.js');
const isDebug = process.env.NODE_ENV === 'development';

if (isDebug) {
    moduleExports = {
        contentBase: dir.devDir,
        compress: true,
        port: 9800,
        hot: true,
        publicPath: 'http://localhost:9800/'
    }

}

module.exports = moduleExports;