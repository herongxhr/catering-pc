import React from 'react';
import { connect } from 'dva';
import { Table, Tag, Menu, Button, Radio, Badge, Divider, Dropdown } from 'antd';
import WrappedOrderForm from '../../components/OrderFilter';
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
		key: 'orderType',
		dataIndex: 'orderType',
		render: (orderType) => {
			switch (orderType) {
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
				(<a className='acceptance'>配送验收情况</a>)
		}
	}
];

class PurOrder extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({
			type: 'purOrder/fetchData',
		})
	}

	all = () => {
		this.setState({
			tableSource: this.state.DataSource
		})
	}

	noOrder = () => {
		var dataSource = this.state.DataSource.filter(item => item.status == 1)
		this.setState({
			tableSource: dataSource
		})
	}

	order = () => {
		var dataSource = this.state.DataSource.filter(item => item.status == 0)
		this.setState({
			tableSource: dataSource
		})
	}
	render() {
		const {
			className,
			location,
			orderData,
		} = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="FOrder">辅料订单</Menu.Item>
				<Menu.Item key="SOrder">食材订单</Menu.Item>
			</Menu>
		);
		return (
			<div className={className}>
				<BreadcrumbComponent {...location} />
				<div className="orderWrapper">
					<WrappedOrderForm className="wrappedOrderForm" />
					<div className="buttonsWrapper">
						<span>
							<Dropdown.Button type="primary" overlay={menu}>
								新建
							</Dropdown.Button>
							<Button type='primary' icon="plus">新建</Button>
						</span>
						<span>
							<Radio.Group defaultValue="all" onChange={this.handleFormLayoutChange} >
								<Radio.Button value="all" onClick={this.all}>全部</Radio.Button>
								<Radio.Button value="noOrder" onClick={this.noOrder}>未下单</Radio.Button>
								<Radio.Button value="ordered" onClick={this.order}>已下单</Radio.Button>
							</Radio.Group>
						</span>
					</div>
					<div style={{ marginTop: 30 }}>
						<Table columns={tabColumns} dataSource={orderData} />

					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ purOrder }) => ({
	...purOrder
}))(PurOrder)