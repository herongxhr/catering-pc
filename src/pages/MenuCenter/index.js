import React from 'react'
import { Tabs } from 'antd'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Badge, Pagination } from 'antd';
import MyMenu from '../../components/MyMenu'
import MenuTemplate from '../../components/MenuTemplate'
import './index.less'
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import FilterByDateAndStatus from '../../components/FilterByDateAndStatus';

const TabPane = Tabs.TabPane;
class MenuCenter extends React.Component {
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

	handleTabsChange = key => {
		const { dispatch } = this.props;
		dispatch(routerRedux.push({
			pathname: `/menubar/${key}`
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
			<div className='card-wrapper'>
				<BreadcrumbComponent {...location} />
				<Tabs
					className="unifiedMenu"
					defaultActiveKey=""
					onChange={this.handleTabsChange}>
					<TabPane tab="统一菜单" key="unified-menu">
						<FilterByDateAndStatus
							status={['全部', '未执行', '已执行']}
							handleFilterChange={this.handleFetchUnifiedMenu}
						/>
						<Table
							columns={tableColumns}
							dataSource={records}
							rowKey="id"
							style={{ padding: '0px 25px' }}
							onRow={(record) => {
								return {
									onClick: (event) => {
										this.props.history.push('/menubar/public/details')
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
					</TabPane>
					<TabPane tab="我的菜单" key="my-menu">
						<MyMenu />
					</TabPane>
					<TabPane tab="菜单模板" key="menu-template">
						<MenuTemplate />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default connect(({ menuCenter }) => ({
	unifiedMenuData: menuCenter.unifiedMenu
}))(MenuCenter); 