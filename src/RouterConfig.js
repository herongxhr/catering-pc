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
import ExcipientDetail from './pages/ExcipientDetail';
import ReportDetail from './pages/ReportDetail';
import IngreDetail from './pages/IngreDetail';
import PurOrderDetails from './pages/PurOrderDetails';
import PendingDeliveryDetail from './pages/PendingDeliveryDetail';
import PendingAcceDetail from './pages/PendingAcceDetail';
import AcceptedDetail from './pages/AcceptedDetail';
import ArrangeDishes from '../src/components/ArrangeDishes';
import SelectIngredients from '../src/components/SelectIngredients';
import DishDetails from './pages/DishDetails';
// 国际化配置
import { LocaleProvider } from 'antd';
import zh_cn from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './style/common.less';
import MenuDetails from './pages/MenuDetails';
import TemplateDetails from '../src/pages/TemplateDetails';
import EditTemplate from './pages/EditTemplate';
import Edit from './pages/Edit';
import MenuTemplate from '../src/pages/MenuTemplate';
import AdjustMenu from '../src/pages/AdjustMenu';
import CustomMenu from '../src/pages/CustomMenu';
import MyMenu from './pages/MyMenu';
import ChoiceTemplate from './pages/ChoiceTemplate';
import ParameterDetail from '../src/pages/Parameter/ParameterDetail'
import PurOrderDetailAdjust from './pages/PurOrder/PurOrderDetailAdjust'

moment.locale('zh-cn');

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path='/' render={() =>
        <LocaleProvider locale={zh_cn}>
          <App>
            <Switch>
              <Route path="/home" exact component={Index} />
              <Route path="/home/purCatalog" component={PurCatalog} />
              <Route path="/home/outStock" exact component={OutStock} />
              <Route path="/home/outStock/reportdetail" component={ReportDetail} />
              <Route path="/menubar" exact component={MenuCenter} />
              <Route path="/menubar/unified-menu" exact component={MenuCenter} />
              <Route path="/menubar/unified-menu/details" exact component={MenuDetails} />
              <Route path="/menubar/unified-menu/adjust" exact component={AdjustMenu} />
              <Route path="/menubar/my-menu" exact component={MyMenu} />
              <Route path="/menubar/my-menu/details" component={MenuDetails} />
              <Route path="/menubar/my-menu/adjust" component={AdjustMenu} />
              <Route path="/menubar/my-menu/custom" component={CustomMenu} />
              <Route path="/menubar/my-menu/choice-template" component={ChoiceTemplate} />
              <Route path="/menubar/my-menu/from-template" component={CustomMenu} />
              <Route path="/menubar/menu-template" exact component={MenuTemplate} />
              <Route path="/menubar/menu-template/details" component={TemplateDetails} />
              <Route path="/menubar/menu-template/edit-template" component={EditTemplate} />
              <Route path="/accSupermarket" component={AccSupermarket}></Route>
              <Route path="/purOrder" exact component={PurOrder}></Route>
              <Route path="/purOrder/detail/adjust" exact component={PurOrderDetailAdjust}></Route>
              <Route path="/purOrder/details" component={PurOrderDetails}></Route>
              <Route path="/delivery" component={DeliveryAcce}></Route>
              <Route path="/delivery/acceptedDetail" component={DeliveryAcce}></Route>
              <Route path="/outStock" component={OutStock}></Route>
              <Route path="/parameter" exact component={Parameter}></Route>
              <Route path="/parameter/detail" component={ParameterDetail} exact></Route>
              <Route path="/Setting" render={() =>
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
              <Route path="/purCatalog" component={PurCatalog}></Route>
              <Route path="/ingredetail" component={IngreDetail}></Route>
              <Route path="/reportdetail" component={ReportDetail}></Route>
              <Route path="/excipientdetail" component={ExcipientDetail}></Route>
              <Route path="/ingredetail" component={IngreDetail}></Route>
              <Route path="/pendingAcceDetail" component={PendingAcceDetail}></Route>
              <Route path="/pendingDeliveryDetail" component={PendingDeliveryDetail}></Route>
              <Route path="/acceptedDetail" component={AcceptedDetail}></Route>
              <Route path="/arrangeDishes" component={ArrangeDishes}></Route>
              <Route path="/selectIngredients" component={SelectIngredients}></Route>
              <Route path="/dishDetails" component={DishDetails}></Route>
              {/* <Route path="/deliveryAcceDetail" component={DeliveryAcceDetail}></Route> */}
              <Redirect to="/home" />
            </Switch>
          </App>
        </LocaleProvider>
      } />
    </Router>
  )
}
