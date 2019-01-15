/**********************************************/
/*** 遍历page目录，获取所有页面的文件夹名称 ***/
/**********************************************/

let moduleExports = [];
const glob = require('glob');
const dir = require('./dir.config.js');
let options = {
    cwd: dir.pageDir, // 在page目录里找
    sync: true, // 这里不能异步，只能同步
};
let globInstance = new glob.Glob('*', options);
moduleExports = globInstance.found; // 一个数组，形如['index', 'product']

module.exports = moduleExports;