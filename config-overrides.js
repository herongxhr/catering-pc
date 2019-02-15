const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { 
            //主色
            '@primary-color': 'rgba(84, 196, 206, 1)',
            /* 按钮 */
            //主按钮
            '@btn-primary-bg': '@primary-color',
            //默认按钮
            '@btn-default-color': '@text-color',
            /* LINK */
            //LINK 悬浮
            '@link-hover-color': '@primary-color',
            //LINK 按下
            '@link-active-color': 'rgba(55, 161, 170, 1)',
         },
    }),
);