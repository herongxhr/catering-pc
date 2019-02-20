import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
//路由对应的组件
import App from './App'
import A from './pages/index/index'
import B from './pages/MenuCenter'
import C from './pages/AccSupermarket'
import D from './pages/PurOrder'
import E from './pages/DeliveryAcce'
import Parameter from './pages/Parameter';
import Setting from './pages/Setting';
import BaseView from './pages/acount/BaseView';
import BasicConfig from './pages/acount/basicConfig';
import SecurityView from './pages/acount/SecurityView';
import Dosing from './pages/acount/Dosing';
import Supply from './pages/acount/Supply';

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path='/' render={() =>
        <App>
          <Switch>
            <Route path="/home" component={A} />
            <Route path="/menubar" component={B} />
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
            <Redirect to="/home" />
          </Switch>
        </App>
      } />
    </Router>
  )
}
