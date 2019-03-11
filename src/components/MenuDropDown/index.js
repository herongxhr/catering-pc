import React from 'react'
import { Menu, Icon, Dropdown, Avatar  } from 'antd';
import { Link } from 'dva/router';

import './index.less'

const menu = (
  <Menu>
		<Menu.Item>
			<div>
				<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
				<p>横店中心小学</p>
				<p>欢迎您</p>
			</div>
		</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="0">
      <a href="/Setting">      
        <Icon
          style={{ fontSize: 16 }}
          type="setting"></Icon>
          <span style={{marginLeft:10}}>账号设置</span>
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">
      <Icon type="snippets" />
      <span style={{marginLeft:10}}>缺样上报</span></a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
    <Icon type="export" />
    <span style={{marginLeft:10}}>退出当前账户</span>
    </Menu.Item>
  </Menu>
);

class MenuDropDown extends React.Component {
  render() {
    return( 
      <Dropdown overlay={menu} placement="bottomRight" style={{width:220,height:242}} overlayClassName='menu-dropdown' trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          <Icon
          style={{ fontSize: 16 }}
          type="setting"></Icon>
        </a>
      </Dropdown>
    )
  }
}

export default MenuDropDown