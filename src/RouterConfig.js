import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
//路由对应的组件
import App from './App'
import Index from './pages/Index/index'
import MenuCenter from './pages/MenuCenter'
import AccSupermarket from './pages/AccSupermarket'
import PurOrder from './pages/PurOrder'
import DeliveryAcce from './pages/DeliveryAcce'
import Parameter from './pages/Parameter';
import Setting from './pages/Setting';
import BaseView from './pages/acount/BaseView';
import BasicConfig from './pages/acount/basicConfig';
import SecurityView from './pages/acount/SecurityView';
import Dosing from './pages/acount/Dosing';
import Supply from './pages/acount/Supply';
import OutStock from './pages/OutStock/index';
import PurCatalog from './pages/PurCatalog/index';
import details from './pages/Details'
import Test from './pages/Test'
<<<<<<< HEAD
import ReportDetail from './pages/ReportDetail/index'
import ExcipientDetail from './pages/ExcipientDetail'
=======
// 国际化配置
import { LocaleProvider } from 'antd';
import zh_cn from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './style/common.less';
import Particulars from './pages/Particulars'
import Edit from './pages/Edit'

moment.locale('zh-cn');

>>>>>>> 1b56687ab8f0a4b1832feb06923875a273109e50

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path='/' render={() =>
<<<<<<< HEAD
        <App>
          <Switch>
            <Route path="/home" component={A} />
            <Route path="/menubar" component={B} />
            <Route path='/createtemplate' component={CreateTemplate} />
            <Route path='/details' component={Details} />
            <Route path="/supermarket" component={C}></Route>
            <Route path="/order" component={D}></Route>
            <Route path="/delivery" component={E}></Route>
            <Route path="/parameter" component={Parameter}></Route>
            <Route path="/Setting" render={() =>
              <Setting>
                <Switch>
                  <Route path="/Setting/imformation" component={BaseView}></Route>
                  <Route path="/Setting/set" component={BasicConfig}></Route>
                  <Route path="/Setting/security" component={SecurityView}></Route>
                  <Route path="/Setting/supply" component={Supply}></Route>
                  <Route path="/Setting/cuisine" component={Dosing}></Route>
                  <Redirect to="/Setting/imformation" />
                </Switch>
              </Setting>
            }></Route>
             <Route path="/outstock" component={OutStock}></Route>
             <Route path="/purcatalog" component={PurCatalog}></Route>
             <Route path="/reportdetail" component={ReportDetail}></Route>
             <Route path="/excipientdetail" component={ExcipientDetail}></Route>
            <Route path='/test' component={Test}></Route>
            <Redirect to="/home" />
          </Switch>
        </App>
=======
        <LocaleProvider locale={zh_cn}>
          <App>
            <Switch>
              <Route path="/home" component={Index} />
              <Route path="/menubar/" exact component={MenuCenter} />
              <Route path="/menubar/public/" exact component={MenuCenter} />
              <Route path="/menubar/public/details/" component={MenuCenter} />
              <Route path="/menubar/private/" exact component={MenuCenter} />
              <Route path="/menubar/private/new/" component={MenuCenter} />
              <Route path="/menubar/private/details/" exact component={MenuCenter} />
              <Route path="/menubar/template/" exact component={MenuCenter} />
              <Route path="/menubar/template/new" component={MenuCenter} />
              <Route path='/details/' component={details} />
              <Route path="/supermarket/" component={AccSupermarket}></Route>
              <Route path="/order/" exact component={PurOrder}></Route>
              <Route path="/order/new/" component={PurOrder}></Route>
              <Route path="/order/details/" component={PurOrder}></Route>
              <Route path="/delivery/" component={DeliveryAcce}></Route>
              <Route path="/outStock/" component={OutStock}></Route>
              <Route path="/parameter/" component={Parameter}></Route>
              <Route path="/Setting/" render={() =>
                <Setting>
                  <Switch>
                    <Route path="/Setting/information" component={BaseView}></Route>
                    <Route path="/Setting/set" component={BasicConfig}></Route>
                    <Route path="/Setting/security" component={SecurityView}></Route>
                    <Route path="/Setting/supply" component={Supply}></Route>
                    <Route path="/Setting/cuisine" component={Dosing}></Route>
                    <Redirect to="/Setting/information" />
                  </Switch>
                </Setting>
              }></Route>
              <Route path="/outstock" component={OutStock}></Route>
              <Route path="/purcatalog" component={PurCatalog}></Route>
              <Route path='/test' component={Test}></Route>
              <Redirect to="/home" />
            </Switch>
          </App>
        </LocaleProvider>
>>>>>>> 1b56687ab8f0a4b1832feb06923875a273109e50
      } />
    </Router>
  )
}
