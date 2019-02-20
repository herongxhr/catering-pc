const { override, fixBabelImports, addLessLoader, useBabelRc } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            //字体
            '@font-family': `'PingFang SC', 'Microsoft YaHei',  Arial, 'Helvetica Neue'`,
            //代码
            '@code-family': `Consolas, SF UI Text`,
            //主色
            '@primary-color': 'rgba(84, 196, 206, 1)',
            /* 按钮 */
            //主按钮
            '@btn-primary-bg': '@primary-color',
            /* LINK */
            //LINK 悬浮
            '@link-hover-color': '@primary-color',
            //LINK 按下
            '@link-active-color': 'rgba(55, 161, 170, 1)',
        },
        modules: true
    }),
    //使用.babelrc文件
    useBabelRc(),
);