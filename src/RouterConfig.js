import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
//路由对应的组件
import App from './App';
import Index from './pages/Index/index';
import MenuCenter from './pages/MenuCenter';
import AccSupermarket from './pages/AccSupermarket';
import PurOrder from './pages/PurOrder';
import DeliveryAcce from './pages/DeliveryAcce';
import Parameter from './pages/Parameter';
import Setting from './pages/Setting';
import BaseView from './pages/acount/BaseView';
import BasicConfig from './pages/acount/basicConfig';
import SecurityView from './pages/acount/SecurityView';
import Dosing from './pages/acount/Dosing';
import Supply from './pages/acount/Supply';
import OutStock from './pages/OutStock/index';
import PurCatalog from './pages/PurCatalog/index';
import IngreDetail from './pages/IngreDetail'
import ExcipientDetail from './pages/ExcipientDetail'
import details from './pages/Details'
import PurOrderDetails from './pages/PurOrderDetails'
import ReportDetail from './pages/ReportDetail'
import Test from './pages/Test';
// 国际化配置
import { LocaleProvider } from 'antd';
import zh_cn from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './style/common.less';
import Particulars from './pages/Particulars';
import Edit from './pages/Edit';

moment.locale('zh-cn');


export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path='/' render={() =>
        <LocaleProvider locale={zh_cn}>
          <App>
            <Switch>
              <Route path="/home" exact component={Index} />
              <Route path="/home/purCatalog/" component={PurCatalog} />
              <Route path="/home/outStock" component={OutStock} />
              <Route path="/menubar/" exact component={MenuCenter} />
              <Route path="/menubar/public/" exact component={MenuCenter} />
              <Route path="/menubar/public/details/" component={MenuCenter} />
              <Route path="/menubar/private/" exact component={MenuCenter} />
              <Route path="/menubar/private/new/" component={MenuCenter} />
              <Route path="/menubar/private/details/" exact component={MenuCenter} />
              <Route path="/menubar/template/" exact component={MenuCenter} />
              <Route path="/menubar/template/new" component={MenuCenter} />
              <Route path='/details/' component={details} />
              <Route path="/accSupermarket/" component={AccSupermarket}></Route>
              <Route path="/purOrder/" exact component={PurOrder}></Route>
              <Route path="/purOrder/new/" component={PurOrder}></Route>
              <Route path="/purOrder/details/" component={PurOrderDetails}></Route>
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
              <Route path="/reportdetail" component={ReportDetail}></Route>
              <Route path="/excipientdetail" component={ExcipientDetail}></Route>
              <Route path="/ingredetail" component={IngreDetail}></Route>
              <Route path='/test' component={Test}></Route>
              <Redirect to="/home" />
            </Switch>
          </App>
        </LocaleProvider>
      } />
    </Router>
  )
}
