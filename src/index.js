import dva from 'dva';
import RouterConfig from './RouterConfig';
import createHistory from 'history/createBrowserHistory';
//dva的model
import globalModel from '../src/models/global';
import './style/common.less';

//创建应用
const app = dva({
    // initialState: {},
    history: createHistory(),
});
//加载插件
app.use({});
//创建model
app.model(globalModel);
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
