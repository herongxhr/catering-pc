import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Table, Badge } from 'antd';
import styles from './index.module.less';
import BreadcrumbWithTabs from '../../components/BreadcrumbWithTabs';
import CommonFilter from '../../components/CommonFilter';

// breadcrumbWithTabs中tabs数据
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

// 列表表格上面筛选过滤功能组件所需数据
const filterData = {
	datePicker1: true,
	statusGroup: [
		['', '全部'],
		['0', '未执行'],
		['1', '已执行']
	]
};
class MenuCenter extends React.Component {
	state = {
		activeTabKey: 'unified-menu',
		queryParams: {
			current: 1,
			pageSize: 10,
			startDate: '',
			endDate: '',
			status: '',
			onlyIssued: true
		}
	}

	// 点击tabs标签跳转到指定页面
	// 页面state中的activeTabKey会传给面包屑
	handleTabChange = key => {
		this.props.dispatch(routerRedux.push({
			pathname: `/menubar/${key}`,
		}));
	}

	// 查看订单详情
	handleShowDetail = record => {
		this.props.dispatch(routerRedux.push({
			pathname: `/menubar/unified-menu/details`,
			state: {
				id: record.id,
				type: 'unified'
			}
		}));
	}
	// 获取统一菜单列表
	getMenuData = (params = {}) => {
		this.props.dispatch({
			type: 'menuCenter/fetchMenuData',
			payload: {
				...this.state.queryParams,
				...params
			}
		});
	}

	// 筛选区域下拉框或状态按钮组变化时的回调
	handleFilterChange = (params = {}) => {
		// 改变state中相应参数的值
		const newQueryParams = {
			...this.state.queryParams,
			// 直接展开参数进行覆盖
			...params,
		}
		this.setState({
			queryParams: newQueryParams
		});
		// 请求接口
		this.getMenuData(newQueryParams);
	}

	// 表格的onChange方法
	handleTableChange = pagination => {
		const { current, pageSize } = pagination;
		const newQueryParams = {
			...this.state.queryParams,
			current,
			pageSize
		}
		// 改变state中current,pageSize
		this.setState({
			queryParams: newQueryParams
		})
		// 向后端发送请求
		this.getMenuData(newQueryParams);
	}
	componentDidMount() {
		// 使用默认的state值发请求
		this.getMenuData();
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
					if (text === '1') {
						return (
							<span>
								<Badge status="success" />
								<span>已执行</span>
							</span>
						)
					} else if (text === '0') {
						return (
							<span>
								<Badge status="warning" />
								<span>未执行</span>
							</span>)
					} else {
						return (
							<span>
								<Badge status="default" />
								<span>已过期</span>
							</span>)
					}
				}
			}
		];
		const { location, menuList = {} } = this.props;
		// menuList可能为空对象，报以设置默认值
		const {
			current = 1,
			records = [],
			size = 10,
			total = '',
		} = menuList;
		const { activeTabKey } = this.state;
		return (
			<div>
				<BreadcrumbWithTabs
					{...location}
					tabList={tabList}
					onChange={this.handleTabChange}
					activeTabKey={activeTabKey}
				/>
				<Card className={styles.tableList} bordered={false}>
					<div >
						<CommonFilter
							// 过滤器所用控件数据
							filterData={filterData}
							// 控制改变时的回调
							handleFilterChange={this.handleFilterChange}
							// 点击按钮时的回调,此页面没有按钮，空函数
							handleBtnClick={() => { }}
						/>
						<Table
							columns={tableColumns}
							dataSource={records}
							rowKey="id"
							onRow={(record) => {
								return {
									onClick: () => this.handleShowDetail(record)
								}
							}
							}
							pagination={{
								current,
								pageSize: size,
								total
							}}
							onChange={this.handleTableChange}
						/>
					</div>
				</Card>
			</div>
		);
	}
}

export default connect(({ menuCenter }) => ({
	menuList: menuCenter.menuList,
}))(MenuCenter); 