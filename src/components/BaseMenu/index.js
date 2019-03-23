import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Menu, Icon, Badge,  Avatar  } from 'antd';
import logo from './logo.png';
import MenuDropDown from '../MenuDropDown'
import './index.less'
import { withRouter } from "react-router";

const menu = (
  <Menu>
		<Menu.Item>
			<div>
				<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
				<p>横店中心小学</p>
				<p>欢迎您</p>
			</div>
		</Menu.Item>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">账号设置</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">缺样上报</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">退当前账户</Menu.Item>
  </Menu>
);

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
						<Link to='/home'>
							<Icon type="home" />
							<span>工作台</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="menubar">
						<Link to='/menubar'>
							<span>
								<Icon type="bars"></Icon>
								菜单中心
								</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="accSupermarket">
						<Link to='/accSupermarket'>
							<Icon type="shopping"></Icon>
							<span>辅料超市</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="purOrder">
						<Link to='/purOrder'>
							<Icon type="profile"></Icon>
							<span>采购订单</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="delivery">
						<Link to='/delivery'>
							<Icon type="bar-chart"></Icon>
							<span>配送验收</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="parameter">
						<Link to='/parameter'>
							<Icon type="read"></Icon>
							<span>台账</span>
						</Link>
					</Menu.Item>

					<Menu.Item
						style={{ width: 60, textAlign: 'right', float: 'right' }}
						key="setting">
						{/* <Link to='/setting/'><Icon
							style={{ fontSize: 16 }}
							type="setting"></Icon>
						</Link> */}

						{/* <Dropdown overlay={menu} trigger={['click']} className='dropdown-setting'>
							<a className="ant-dropdown-link" href="#">
								<Icon
								style={{ fontSize: 16 }}
								type="setting"></Icon>
							</a>
						</Dropdown> */}
						<MenuDropDown />

					</Menu.Item>
					<Menu.Item
						style={{ width: 60, float: 'right' }}
						key="message" >
						<Link to='/message'>
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