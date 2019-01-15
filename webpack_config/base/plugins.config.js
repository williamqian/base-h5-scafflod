/*******************/
/*** plugins配置 ***/
/*******************/

let moduleExports = [];
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//var WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dir = require('./dir.config.js');
const pageAry = require('./page.config.js');
const isDebug = process.env.NODE_ENV === 'development';
let cssDir = 'css/';
//公用插件
moduleExports.push(
    new webpack.BannerPlugin("Copyright www.bigfoot.xin"),

    /* 抽取出所有通用的部分 */
    /*new webpack.optimize.CommonsChunkPlugin({
        names: ['commons', 'manifest'],
        //filename: 'js/[name].[hash:8]',
        minChunks: 4
    }),*/
    new webpack.DefinePlugin(
    {
        isDebug: JSON.stringify(isDebug)
    }),
    new ExtractTextPlugin(
    {
        filename: (isDebug ? dir.devAssetsPath : dir.proAssetsPath) + cssDir + '[name]' + (isDebug ? '' : '.[contenthash:8]') + '.css',
        allChunks: false /*是否将分散的css文件合并成一个文件*/
    })
);
/* htmlWebpackPlugin */
pageAry.forEach((page) =>
{
    const htmlPlugin = new HtmlWebpackPlugin(
    {
        //inject:false,
        page: page,
        filename: page + '.html',
        template: path.resolve(dir.pageDir, page + '/tpl.js'),
        chunks: [page, 'commons', 'manifest']
        //hash: true, // 为静态资源生成hash值
        //xhtml: true,
    });
    moduleExports.push(htmlPlugin);
});

/* 开发环境 */
if (isDebug)
{
    moduleExports.push(
        new webpack.HotModuleReplacementPlugin()
    );
    moduleExports.push(
        new CleanWebpackPlugin(
            ['css/*', 'js/*', 'img/*', '*.html'], 　 //匹配删除的文件
            {
                root: isDebug ? dir.devDir : dir.proDir, //根目录
                verbose: false,
                　　　　　　　　　　 //开启在控制台输出信息
                dry: false　　　　　 //启用删除文件
            }
        )
    );
}
/* 生产环境 */
else
{
    moduleExports.push(
        new webpack.optimize.UglifyJsPlugin(
        {
            sourceMap: false
        })
    );

}

module.exports = moduleExports;