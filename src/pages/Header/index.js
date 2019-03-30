/*
 * @Author: suwei 
 * @Date: 2019-03-28 16:42:13 
 * @Last Modified by:   suwei 
 * @Last Modified time: 2019-03-28 16:42:13 
 */
import React, { Component } from 'react';
import { Link, withRouter } from 'dva/router';
import { Menu, Icon, Badge, Layout } from 'antd';
import logo from './logo.png';
import MenuDropDown from '../../components/MenuDropDown';
import styles from './index.module.less';

const { Header } = Layout;
const menuData = [
    {
        path: '/home',
        name: '工作台',
        icon: 'home'
    },
    {
        path: '/menubar',
        name: '菜单中心',
        icon: 'bars'
    },
    {
        path: '/accSupermarket',
        name: '辅料超市',
        icon: 'shopping'
    },
    {
        path: '/purOrder',
        name: '采购订单',
        icon: 'profile'
    },
    {
        path: '/delivery',
        name: '配送验收',
        icon: 'bar-chart'
    },
    {
        path: '/parameter',
        name: '台帐',
        icon: 'read'
    }
]
class HeaderView extends Component {
    getMenuItems = menuData => {
        const { pathname } = this.props.location;
        let matches;
        // 默认选择中首页菜单
        const matchUrl = (matches = pathname.match(/(\/.+)\/?/)) ? matches[0] : '/home';
        const selectedMenuItem = menuData.find(item => item.path === matchUrl).name;
        const menuItems = menuData.map(menu => (
            <Menu.Item key={menu.name}>
                <Link to={menu.path}>
                    <Icon type={menu.icon} />
                    <span>{menu.name}</span>
                </Link>
            </Menu.Item>
        ));
        return (
            <Menu
                key="Menu"
                theme="dark"
                mode="horizontal"
                className={styles.baseMenu}
                defaultSelectedKeys={[selectedMenuItem]}
            >
                <Menu.Item disabled style={{ width: 125 }} key="logo">
                    <img src={logo} alt="安品" />
                </Menu.Item>
                {menuItems}
                <Menu.Item
                    style={{ width: 60, textAlign: 'right', float: 'right' }}
                    key="setting">
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
        )
    }
    render() {

        return (
            <Header
                style={{
                    width: '100%',
                    height: 70,
                    background: '#1F253E',
                }}>
                <div className={styles.menuWrap}>
                    {this.getMenuItems(menuData)}
                </div>
            </Header>
        );
    }
}

export default withRouter(HeaderView);