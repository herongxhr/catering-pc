import React, { Component } from 'react';
import { BrowserRouter as Router , Link,NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';

import './index.less'

const { Header } = Layout;

class Jheader extends Component {
	render() {
		return (
				<Layout className="layout">
					<Header>
						<div className="logo" />
						<Menu
							theme="dark"
							mode="horizontal"
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1">
								<NavLink to='/home'>主页</NavLink>
							</Menu.Item>
							<Menu.Item key="2">
								<NavLink to='/menubar'>菜单中心</NavLink>
							</Menu.Item>
							<Menu.Item key="3">
								<NavLink to='/supermarket'>辅料超市</NavLink>
							</Menu.Item>
							<Menu.Item key="4">
								<NavLink to='/order'>采购订单</NavLink>
							</Menu.Item>
							<Menu.Item key="5">
								<NavLink to='/delivery'>配送验收</NavLink>
							</Menu.Item>
						</Menu>
					</Header>
				</Layout>
		);
	}
}

export default Jheader