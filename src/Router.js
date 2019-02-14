import React from 'react'
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'
import App from './App'
import Total from './Total'
import A from './pages/index/index'
import B from './pages/MenuCenter/index'
import C from './pages/AccSupermarket/index'
import D from './pages/PurOrder/index'
import E from './pages/DeliveryAcce/index'


class IRouter extends React.Component {
  render() {
    return (
      <Router>
            <Route path='/'  render={()=> 
                <App>
                  <Switch>
                      <Route path="/home" component={A} />
                      <Route path="/menubar" component={B} />
                      <Route path="/supermarket" component={C}></Route>
                      <Route path="/order" component={D}></Route>
                      <Route path="/delivery" component={E}></Route>
                  </Switch>
                </App>
            } />
      </Router>
    ) 
  }
}

export default IRouter