import React from 'react'
import { Card } from 'antd'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Badge, Pagination } from 'antd';
import './index.less'
import BreadcrumbWithTabs from '../../components/BreadcrumbWithTabs';
import FilterByDateAndStatus from '../../components/FilterByDateAndStatus';

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
class MenuCenter extends React.Component {
	state = {
		activeTabKey: ''
	}
	handleFetchUnifiedMenu = (params) => {
		console.log('params', params);
		const { dispatch } = this.props;
		const defultOptions = {
			startDate: null,
			endDate: null,
			status: null,
			current: 1,
			pageSize: 10
		}
		dispatch({
			type: 'menuCenter/fetchUnifiedMenu',
			payload: {
				...defultOptions,
				...params
			}
		})
	}

	handleLinkChange = (key, params) => {
		const { dispatch } = this.props;
		// 不是所有key都setState
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

	componentDidMount() {
		this.handleFetchUnifiedMenu();
	}

	render() {
		const tableColumns = [
			{
				title: '菜单编号',
				dataIndex: 'menuCode',
				key: 'menuCode',
			},
			{
				title: '周次',
				dataIndex: 'week',
				key: 'week',
			},
			{
				title: '日期',
				dataIndex: 'date',
				key: 'date',
			},
			{
				title: '下达单位',
				dataIndex: 'superiorName',
				key: 'superiorName',
			},
			{
				title: '下达时间',
				dataIndex: 'issuedTime',
				key: 'issuedTime',
			},
			{
				title: '执行状态',
				dataIndex: 'status',
				key: 'status',
				render: (text) => {
					if (text == '已执行') {
						return (
							<span>
								<Badge status="success" />
								<span>已执行</span>
							</span>
						)
					} else {
						return (
							<span>
								<Badge status="warning" />
								<span>未执行</span>
							</span>)
					}
				}
			}
		];
		const { location, unifiedMenuData } = this.props;
		const {
			current,
			pages,
			records,
			searchCount,
			size,
			total
		} = unifiedMenuData;
		return (
			<div>
				<BreadcrumbWithTabs
					{...location}
					tabList={tabList}
					onChange={this.handleLinkChange}
					activeTabKey={this.state.activeTabKey}
				/>
				<Card className="tableList" bordered={false}>
					<div >
						<FilterByDateAndStatus
							// 状态按钮栏标题
							status={['全部', '未执行', '已执行']}
							// 点击下拉框或单选按钮组后的回调函数
							handleFilterChange={this.handleFetchUnifiedMenu}
						/>
						<Table
							columns={tableColumns}
							dataSource={records}
							rowKey="id"
							onRow={(record) => {
								return {
									onClick: () => {
										this.handleLinkChange(
											'unified-menu/details',
											{
												id: record.id,
												status: record.status
											}
										)
									}
								}
							}}
							pagination={
								<Pagination
									current={current}
									onChange={(page, pageSize) =>
										this.handleFetchUnifiedMenu({
											page, pageSize
										})}
								/>}
						/>
					</div>
				</Card>
			</div>
		);
	}
}

export default connect(({ menuCenter }) => ({
	unifiedMenuData: menuCenter.unifiedMenu,

}))(MenuCenter); 