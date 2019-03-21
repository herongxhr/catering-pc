import React from 'react';
import { Table, Card, Pagination, Badge } from 'antd';
//import WrappedInlineForm from '../InlineForm';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import BreadcrumbWithTabs from '../../components/BreadcrumbWithTabs';
import CommonFilter from '../../components/CommonFilter';

import './index.less';

const tabList = [
	{
		key: 'unified-menu',
		tab: '统一菜单',
	},
	{
		key: 'my-menu',
		tab: '我的菜单',
	},
	{
		key: 'menu-template',
		tab: '菜单模板',
	},
];

const filterData = {
	datePicker1: true,
	dropDownBtn: [{
		key: 'custom',
		text: '自定义'
	}, {
		key: 'fromTemplate',
		text: '模板导入'
	}],
	statusGroup: [
		['', '全部'],
		['0', '未执行'],
		['1', '已执行']
	]
};

class MyMenu extends React.Component {
	state = {
		activeTabKey: 'my-menu'
	}

	// 获取我的菜单数据
	handleFetchMyMenu = (params) => {
		const { dispatch } = this.props;
		const defultOptions = {
			startDate: null,
			endDate: null,
			status: null,
			current: 1,
			pageSize: 10
		}
		dispatch({
			type: 'menuCenter/fetchMyMenu',
			payload: {
				...defultOptions,
				...params
			}
		})
	}

	handleLinkChange = (key, params) => {
		const { dispatch } = this.props;
		// 不是所有key要setState
		if (tabList.find(item => item.key === key)) {
			this.setState({
				activeTabKey: key
			})
		}
		dispatch(routerRedux.push({
			pathname: `/menubar/${key}`,
			state: { ...params }
		}))
	}

	// commonFilter按钮点击回调
	// 下拉式按钮返回e指向当前点击按钮本身
	handleBtnClick = e => {
		console.log(e.key);
	}

	componentDidMount() {
		this.handleFetchMyMenu();
	}

	render() {
		const tableColumns = [{
			title: '菜单编号',
			dataIndex: 'menuCode',
			key: 'menuCode',
		}, {
			title: '周次',
			dataIndex: 'week',
			key: 'week',
		}, {
			title: '日期',
			dataIndex: 'date',
			key: 'date',
		}, {
			title: '执行状态',
			key: 'execute',
			render: (_, { status }) => {
				return (
					status === '已执行'
						? (<span>
							<Badge status="success" />
							<span>已执行</span>
						</span>)
						: (<span>
							<Badge status="warning" />
							<span>未执行</span>
						</span>)
				)
			}
		}, {
			title: '操作',
			dataIndex: 'status',
			key: 'status',
			render(text) {
				return text === '未执行' ? <a>删除</a> : <span style={{ cursor: 'pointer' }}>查看</span>;
			}
		}];

		const { location, menuListData } = this.props;
		const { current = 1, records = [], size, total } = menuListData;
		const { activeTabKey } = this.state;

		return (
			<div>
				<BreadcrumbWithTabs
					{...location}
					tabList={tabList}
					onChange={this.handleLinkChange}
					activeTabKey={activeTabKey}
				/>
				<Card className="tableList" bordered={false}>
					<div >
						<CommonFilter
							// 过滤器所用控件数据
							filterData={filterData}
							// 控制改变时的回调
							handleFilterChange={() => { }}
							// 点击按钮时的回调
							handleMenuClick={this.handleBtnClick}
						/>
						<Table
							columns={tableColumns}
							dataSource={records}
							rowKey="id"
							onRow={(record) => {
								return {
									onClick: () => {
										this.handleLinkChange(
											'my-menu/details',
											{
												id: record.id,
												type: 'my'
											}
										)
									}
								}
							}}
							pagination={
								<Pagination
									current={current}
									onChange={(page, pageSize) =>
										this.handleFetchMyMenu({
											page, pageSize
										})}
								/>}
						/>
					</div>
				</Card>
			</div>
		)
	}
}

export default connect(({ menuCenter }) => ({
	menuListData: menuCenter.menuList
}))(MyMenu)