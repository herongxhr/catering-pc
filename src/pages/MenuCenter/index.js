import React from 'react'
import { Card, Tabs, Row, Col } from 'antd'
import { connect } from 'dva';
//import TableOne from '../../components/TableOne'
import TableTwo from '../../components/TableTwo'
import MenuTemplate from '../../components/MenuTemplate'

import './index.less'
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

const tabList = [{
	key: 'tab1',
	tab: '统一菜单',
}, {
	key: 'tab2',
	tab: '我的菜单',
}, {
	key: 'tab3',
	tab: '菜单模板'
}];



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

	onTabChange = (key, type) => {
		const titleList = ['tab1', 'tab2', 'tab3']
		const count = titleList.indexOf(key) //通过改变count来修改传入SubHeader的值
		this.setState({
			[type]: key,
			tab: count
		});
	}



	render() {
		const contentList = {
			// tab1: <TableOne />,
			tab2: <TableTwo columns={tab2Columns} dataSource={this.state.tab2Source} />,
			tab3: <MenuTemplate />
		};
		const titleList = ['统一菜单', '我的菜单', '菜单模板']
		const { location } = this.props;
		return (
			<div className='card-wrapper'>
				<BreadcrumbComponent {...location} />
				<br/>
				<Card
					tabList={tabList}
					activeTabKey={this.state.key}
					defaultActiveTabKey={this.state.key}
					onTabChange={(key) => { this.onTabChange(key, 'key'); }}
				>
					<Row type="flex" justify="center">
						<Col xl={{ span: 15 }}>
							<div className='content-wrapper'>
								{contentList[this.state.key]}
								{/* <MenuTemplate /> */}
							</div>
						</Col>
					</Row>
				</Card>
			</div>
		);
	}
}

export default connect(({ }) => ({

}))(MenuCenter);