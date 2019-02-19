import React, { Component } from 'react';
import { BrowserRouter as Router , Link, NavLink } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import dan from '../../assest/pic/导航栏_工作台24.png'
import center from '../../assest/pic/导航栏_菜单中心.png'

import './index.less'

const { Header } = Layout;

class Jheader extends Component {
	render() {
		return (
				<div className='header-wrapper'>
					<Header>
						<div className="logo" />
						<Menu
							theme="dark"
							mode="horizontal"
							style={{ lineHeight: '70px' }}
						>
							<Menu.Item key="1">
								<NavLink to='/home'><span><Icon type="home" style={{fontSize:'16px'}}/></span>主页</NavLink>
							</Menu.Item>
							<Menu.Item key="2">
								<div>
									<img src={center}></img>
									<NavLink to='/menubar'>菜单中心</NavLink>
								</div>
							</Menu.Item>
							<Menu.Item key="3">
								<div>
									<img src={dan}></img>
									<NavLink to='/supermarket'>辅料超市</NavLink>
								</div>								
							</Menu.Item>
							<Menu.Item key="4">
								<NavLink to='/order'>采购订单</NavLink>
							</Menu.Item>
							<Menu.Item key="5">
								<NavLink to='/delivery'>配送验收</NavLink>
							</Menu.Item>
							<Menu.Item key="6">
								<NavLink to='/message'>
									<span className="iconfont">&#xe62b;</span>
								</NavLink>
							</Menu.Item>
							<Menu.Item key="7">
								<NavLink to='/setting'>
									<span className="iconfont">&#xe620;</span>
								</NavLink>
							</Menu.Item>
						</Menu>
						<div>
							<span></span>
							<div></div>
						</div>
					</Header>
				</div>
		);
	}
}

export default Jheader