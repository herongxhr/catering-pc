import React from 'react'
import { Tabs } from 'antd'
import { connect } from 'dva';
import TableOne from '../../components/TableOne'
import TableTwo from '../../components/TableTwo'
import MenuTemplate from '../../components/MenuTemplate'

import './index.less'
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

const TabPane = Tabs.TabPane;

const tab2Columns = [{
	title: '菜单编号',
	dataIndex: 'menuID',
	key: 'menuID',
}, {
	title: '周次',
	dataIndex: 'weekly',
	key: 'weekly',
}, {
	title: '日期',
	dataIndex: 'date',
	key: 'date',
}, {
	title: '执行状态',
	dataIndex: 'status',
	key: 'status',
	render(status) {
		let config = {
			'0': '已执行',
			'1': '未执行',
		}
		return config[status]
	}
}, {
	title: '操作',
	dataIndex: 'operation',
	key: 'operation',
	render(operation) {
		return operation == 1 ? <span style={{ color: 'blue' }}>删除</span> : ''
	}
}]


const requests = [{
	url: `/mymenu`
}, {
	url: `/menuItem`
}]

class MenuCenter extends React.Component {
	state = {
		key: 'tab1',
		tab: 0,
		tab1Source: [],
		Data1Source: [],
		tab2Source: [],
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch({
			type:'unifiedMenus/queryList',
			payload:{a:1}
		})
	}


	render() {
		const { location ,  unifiedMenus} = this.props;
		console.log(unifiedMenus)
		return (
			<div className='card-wrapper'>
				<BreadcrumbComponent {...location} />
				<Tabs defaultActiveKey="1" onChange={this.callback}>
					<TabPane tab="统一菜单" key="1">
						<TableOne  />
					</TabPane>
					<TabPane tab="我的菜单" key="2">
						<TableTwo />
					</TabPane>
					<TabPane tab="菜单模板" key="3">
					 <MenuTemplate />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default connect(({ unifiedMenus }) => ({ unifiedMenus

}))(MenuCenter); 