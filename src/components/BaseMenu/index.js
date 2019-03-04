import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Menu, Icon, Badge } from 'antd';
import logo from './logo.png';

import './index.less'

class BaseMenu extends Component {
	render() {
		return (
			<div className='jWrapper'>
				<Menu
					key="Menu"
					theme="dark"
					mode="horizontal"
					className="baseMenu"
				>
					<Menu.Item disabled style={{ width: 125 }} key="logo">
							<img src={logo} alt="安品" />
					</Menu.Item>
					<Menu.Item key="home">
						<Link to='/home/'>
							<Icon type="home" />
							<span>工作台</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="menubar">
						<Link to='/menubar/'>
							<span>
								<Icon type="bars"></Icon>
								菜单中心
								</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="accSupermarket">
						<Link to='/accSupermarket/'>
							<Icon type="shopping"></Icon>
							<span>辅料超市</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="purOrder">
						<Link to='/purOrder/'>
							<Icon type="profile"></Icon>
							<span>采购订单</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="delivery">
						<Link to='/delivery/'>
							<Icon type="bar-chart"></Icon>
							<span>配送验收</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="parameter">
						<Link to='/parameter/'>
							<Icon type="read"></Icon>
							<span>台账</span>
						</Link>
					</Menu.Item>

					<Menu.Item
						style={{ width: 60, textAlign: 'right', float: 'right' }}
						key="setting">
						<Link to='/setting/'><Icon
							style={{ fontSize: 16 }}
							type="setting"></Icon>
						</Link>
					</Menu.Item>
					<Menu.Item
						style={{ width: 60, float: 'right' }}
						key="message" >
						<Link to='/message/'>
							<Badge count={5}>
								<Icon
									style={{ fontSize: 16 }}
									type="bell"></Icon>
							</Badge>
						</Link>
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

export default BaseMenu;