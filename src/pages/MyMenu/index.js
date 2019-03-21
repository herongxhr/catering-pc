import React from 'react';
import { Table, Card, Badge } from 'antd';
//import WrappedInlineForm from '../InlineForm';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import BreadcrumbWithTabs from '../../components/BreadcrumbWithTabs';
import CommonFilter from '../../components/CommonFilter';
import styles from './index.module.less';

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
	dropDownBtn: [{
		key: 'custom',
		text: '自定义'
	}, {
		key: 'choice-template',
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
		activeTabKey: 'my-menu',
		queryParams: {
			current: 1,
			pageSize: 10,
			startDate: '',
			endDate: '',
			status: '',
			onlyIssued: false
		}
	}

	// 点击tabs标签跳转到指定页面
	// 页面state中的activeTabKey会传给面包屑
	handleTabChange = key => {
		const { dispatch } = this.props;
		dispatch(routerRedux.push({
			pathname: `/menubar/${key}`,
		}));
	}

	// 查看订单详情
	handleShowDetail = record => {
		this.props.dispatch(routerRedux.push({
			pathname: `/menubar/my-menu/details`,
			state: {
				id: record.id,
				type: 'my'
			}
		}));
	}
	// 获取我的菜单数据
	getMenuData = (params = {}) => {
		this.props.dispatch({
			type: 'menuCenter/fetchMyMenu',
			payload: {
				...this.state.queryParams,
				...params
			}
		})
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

	// commonFilter按钮点击回调
	// 下拉式按钮返回e指向当前点击按钮本身
	// 新建时，清空之前排餐数据
	handleBtnClick = e => {
		const { dispatch } = this.props;
		// 清空之前数据
		dispatch({
			type: 'menuCenter/clearMenuDetails'
		})
		// 跳转页面
		dispatch(routerRedux.push({
			pathname: `/menubar/my-menu/${e.key}`,
			// 把新建类型也传过去
			state: { type: e.key }
		}))
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
							// 点击按钮时的回调
							handleMenuBtnClick={this.handleBtnClick}
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
		)
	}
}

export default connect(({ menuCenter }) => ({
	menuList: menuCenter.menuList
}))(MyMenu)