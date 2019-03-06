import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Table, Tag, Menu, Button, Radio, Badge, Divider, Dropdown, Icon } from 'antd';
import WrappedOrderFilter from '../../components/OrderFilter';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

import './index.less';
// 定义表格列
const tabColumns = [
	{
		title: '采购单号',
		key: 'orderId',
		dataIndex: 'orderId',
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
		key: 'date',
		dataIndex: 'date',
	},
	{
		title: '摘要',
		key: 'abstract',
		dataIndex: 'abstract',

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
		key: 'orderActions',
		dataIndex: 'status',
		render: (status) => {
			return status === "0" ?
				(<div className='opertion'>
					<a className='orders' >下单</a> <Divider type="vertical" /> <a className='delete'>删除</a>
				</div>) :
				(<Link to='/purOrder/details/' className='acceptance'>配送验收情况</Link>)
		}
	}
];

class PurOrder extends React.Component {
	state = {
		setFilter: {
			dateRange: ['', ''],
			channel: '',
			status: ''
		}
	}

	// 请求订单数据
	getOrderData = (params) => {
		const { dispatch } = this.props;
		console.log("query", params);
		dispatch({
			type: 'purOrder/fetchOrderData',
			payload: { ...params },
		})
		console.log('finish')
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
			Object.assign(this.state.setFilter, newArgs),
			this.getOrderData(this.state.setFilter)
		);
	}

	render() {
		console.log(this.state.setFilter);
		const {
			className,
			location,
			rawData,
			orderedData,
		} = this.props;

		// 点击新建时会下拉的按钮
		const dropdownBtn = () => {
			const menu = (
				<Menu>
					<Menu.Item key="FOrder">食材订单</Menu.Item>
					<Menu.Item key="SOrder">辅料订单</Menu.Item>
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
		const tableData = orderedData.length ? orderedData : rawData;
		return (
			<div className={className}>
				{/* 面包屑 */}
				<BreadcrumbComponent {...location} />
				<div className="orderWrapper">
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
					<div style={{ mArgsinTop: 30 }}>
						<Table columns={tabColumns} dataSource={tableData} />
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ purOrder }) => ({
	...purOrder
}))(PurOrder)