import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import RouterConfig from './RouterConfig';


//创建应用
const app = dva({
    history: createHistory(),
});

//加载插件
// app.use({});

//创建model
require('./models').default.forEach(key => {
    app.model(key.default)
});

//创建视图
app.router(RouterConfig);

//启动应用
app.start('#root');

//import './index.css';
//import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
