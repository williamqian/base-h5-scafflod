var webpack = require('webpack');
var path = require('path');
const dir = require('./base/dir.config.js');
const isDebug = process.env.NODE_ENV === 'development';
const outputPath = isDebug ? dir.devDllDir : dir.proDllDir;
const fileName = '[name].js';
const dll = ['bootstrap'];
const plugins = [
    new webpack.DllPlugin({
        /**
         * path
         * 定义 manifest 文件生成的位置
         * [name]的部分由entry的名字替换
         */
        path: path.join(outputPath, 'manifest.json'),
        /**
         * name
         * dll bundle 输出到那个全局变量上
         * 和 output.library 一样即可。
         */
        name: '[name]_[chunkhash:8]',
        context: __dirname
    }),
    //new webpack.optimize.OccurenceOrderPlugin()
];
if (!isDebug) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    }));
}
module.exports = {
    devtool: '#source-map',
    entry: {
        dll: dll
    },
    output: {
        path: outputPath,
        filename: fileName,
        library: '[name]_[chunkhash:8]',
        libraryTarget: 'umd',
    },
    plugins: plugins
};