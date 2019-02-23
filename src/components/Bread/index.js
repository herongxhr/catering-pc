import React from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const routes = [{
  path: 'menubar',
  breadcrumbName: '菜单中心'
}, {
  breadcrumbName: 'a'
}];

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}

class Bread extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb itemRender={itemRender} routes={routes}/>
      </div>
    )
  }
}

export default Bread