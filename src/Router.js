import React from 'react'
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'
import App from './App'
import Total from './Total'
import A from './pages/A/index'
import B from './pages/B/index'
import C from './pages/C/index'
import D from './pages/D/index'
import E from './pages/E/index'


class IRouter extends React.Component {
  render() {
    console.log(1)
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