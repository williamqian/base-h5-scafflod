/*******************/
/*** resolve配置 ***/
/*******************/

let moduleExports = {};
//const path = require('path');
const dir = require('./dir.config.js');
moduleExports = {
    // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
    alias:
    {
        /* 各种目录 */
        public: dir.publicDir,
        components: dir.comDir,
        /* css */
        //bootstrap: dir.bsDir,
        /* cdn */
        cdn: dir.cdnDir
    },
    // 当require的模块找不到时，尝试添加这些后缀后进行寻找
    extensions: ['.js', '.scss', '.less', '.css', '.html'],
};

module.exports = moduleExports;