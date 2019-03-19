import React from 'react';
import { connect } from 'dva';
import { Table, Tag, Menu, Button, Radio, Badge, Divider, Dropdown, Icon } from 'antd';
import WrappedOrderFilter from '../../components/OrderFilter';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { withRouter } from 'react-router'
import { routerRedux } from 'dva/router';
import styles from './index.module.less';
// 定义表格列
const tabColumns = [
	{
		title: '采购单号',
		key: 'orderNo',
		dataIndex: 'orderNo',
		filterMultiple: true,
	},
	{
		title: '订单来源',
		key: 'channel',
		dataIndex: 'channel',
		render: (channel) => {
			switch (channel) {
				case 'N':
					return <Tag color="orange">自建订单</Tag>;
				case 'M':
					return <Tag color="green">菜单生成</Tag>
				case 'S':
					return <Tag color="cyan">辅料订单</Tag>
				default:
					break;
			}
		},
	},
	{
		title: '创建日期',
		key: 'orderTime',
		dataIndex: 'orderTime',
	},
	{
		title: '摘要',
		key: 'summary',
		dataIndex: 'summary',

	},
	{
		title: '状态',
		key: 'status',
		dataIndex: 'status',
		render: (status) => {
			return status === '0' ?
				(<span><Badge status="warning" />未下单</span>) :
				(<span><Badge status="success" />已下单</span>)
		}
	},
	{
		title: '操作',
		render: (text, record) => {
			return record.status === "0" ?
				(<div className='opertion'>
					<a onClick={() => this.previewOrder(record.orderId)} className='orders'>下单</a>
					<Divider type="vertical" />
					<a className='delete'>删除</a>
				</div>) :
				(<a className='acceptance'>配送验收情况</a>)
		}
	}
];

class PurOrder extends React.Component {

	// 请求采购订单表格数据
	getOrderTable = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'purOrder/queryOrderTable',
			payload: { 
				current:1,
				pageSize:10
			},
		})
	}

	handleFilter = (args) => {
		let newArgs = {};
		if (args.dateRange) {
			newArgs = { dateRange: args.dateRange }
		} else if (args.channel) {
			newArgs = { channel: args.channel }
		} else {
			newArgs = { status: args.status }
		}
		this.setState(
			Object.assign(this.state, newArgs),
			this.getOrderData(this.state)
		);
	}


	//新建按钮跳转
	handleLinkChange = () => {
		this.props.history.push('/purOrder/detail/adjust')
	}

	TableLinkChange = (pathname,record,rest) => {
		const { props } = this
		props.dispatch(routerRedux.push({ 
			pathname,
			id:record.id,
			...rest
		}))
	}
	

	componentDidMount() {
		this.getOrderTable();
	}

	//table current 套装
	handleTableChange = (page) => {   
		const { dispatch } = this.props;
		dispatch({
			type: 'purOrder/queryOrderTable',
			payload: { 
				current:page,
				pageSize:10
			},
		})
	}

	render() {
		const {
			className,
			location,
			orderTable,
		} = this.props;

		// 点击新建时会下拉的按钮
		const dropdownBtn = () => {
			const menu = (
				<Menu>
					<Menu.Item key="FOrder" onClick={this.handleLinkChange}>食材订单</Menu.Item>
					<Menu.Item key="SOrder" onClick={this.handleLinkChange}>辅料订单</Menu.Item>
				</Menu>
			)
			return (
				<span>
					<Dropdown overlay={menu}>
						<Button type="primary">
							<Icon type="plus" />新建<Icon type="down" />
						</Button>
					</Dropdown>
				</span>
			)
		}
		// 表格数据
		console.log(orderTable)
		const {
			current,
			total,
			records
		} = orderTable
		// const tableData = orderTable.records
		return (
			<div className={className}>
				{/* 面包屑 */}
				<BreadcrumbComponent {...location} />
				<div className={styles.orderWrapper}>
					{/* 排序筛选部分 */}
					<WrappedOrderFilter
						handleFilter={this.handleFilter}
						className="wrappedOrderForm" />
					<div className="buttonsWrapper">
						{/* 新建及按钮组部分 */}
						{dropdownBtn()}
						<span>
							<Radio.Group defaultValue="all" onChange={e => {
								this.handleFilter({
									status: e.target.value
								})
							}} >
								<Radio.Button value="all">全部</Radio.Button>
								<Radio.Button value="0">未下单</Radio.Button>
								<Radio.Button value="1">已下单</Radio.Button>
							</Radio.Group>
						</span>
					</div>
					<div style={{ marginTop: 30 }}>
						<Table
							columns={tabColumns}
							dataSource={records}
							pagination={{
								total:total,
								current:current
							}}
							onChange={this.handleTableChange}
							rowKey="id"
							onRow={(record) => {
								const rest = {
									status:record.status
								}
								return {
									onClick: () => {
										this.TableLinkChange('/purOrder/details',record,rest)
									}
								}
							}}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ purOrder }) => ({
	orderTable:purOrder.orderTable
}))(withRouter(PurOrder))