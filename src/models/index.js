//这里的flase参数表示不遍历文件夹
const context = require.context('./', false, /\.js$/);
export default context
    .keys()
    //过滤掉index.js
    .filter(item => item != './index.js')
    //获取所有的key值包含到context中去
    .map(key => context(key));