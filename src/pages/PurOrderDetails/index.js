/*
 * @Author: suwei 
 * @Date: 2019-03-20 14:43:54 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-28 09:10:10
 */
import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Card, Row, Col, Table, Tag, Modal, Alert, message } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import Bread from '../../components/Bread'
import PageHeadWrapper from '../../components/PageHeaderWrapper';
import styles from './index.module.less';
import { routerRedux, Redirect } from 'dva/router';
import isLength from 'lodash/isEqual';


import Item from 'antd/lib/list/Item';


const { Description } = DescriptionList;

// 定义表格列
const tabColumns = [
	{
		title: '商品',
		key: "skuSummary",
		dataIndex: "skuSummary"
	},
	{
		title: '单位',
		key: "unit",
		dataIndex: "unit"
	},
	{
		title: '单价',
		key: "price",
		dataIndex: "price"
	},
	{
		title: '数量',
		key: "quantity",
		dataIndex: "quantity"
	},
	{
		title: '供应商',
		key: "supplierName",
		dataIndex: "supplierName"
	},
	{
		title: '配送日期',
		key: "requiredDate",
		dataIndex: "requiredDate"
	},
]

const bread = [{
	href: '/purOrder',
	breadContent: '采购订单'
}, {
	breadContent: '详情'
}]

class PurOrderDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			initLoading: true,
			loading: false,
			data: [],
			list: [],
			current: 1,
			visible: false
		}
		// this.onLoadMore = this.onLoadMore.bind(this)
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleOk = (e) => {
		this.setState({
			visible: false,
		});
		message.success('操作成功');
	}

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}

	purOrderAdjust = (pathname, rest) => {
		const { props } = this
		props.dispatch(routerRedux.push({
			pathname,
			...rest
		}))
	}

	queryOrderDetails() {
		const { dispatch, location } = this.props
		console.log(location.id)
		dispatch({
			type: 'purOrder/queryOrderDetails',
			payload: {
				id: location.id
			}
		})
	}

	//点击loadMore的时候拼接数据

	// queryChangeOrderItemGoods = () => {
	// 	console.log(1);
	// 	const { dispatch, location } = this.props
	// 	dispatch({
	// 		type: 'purOrder/queryChangeOrderItemGoods',
	// 		payload: {
	// 			id: location.id,
	// 			current: this.state.current,
	// 			pageSize: 10
	// 		}
	// 	})
	// 	this.setState({
	// 		loading: false
	// 	})
	// }

	// //当页面加载的时候请求数据
	// queryOrderItemGoods() {
	// 	const { dispatch, location } = this.props
	// 	dispatch({
	// 		type: 'purOrder/queryOrderItemGoods',
	// 		payload: {
	// 			id: location.id,
	// 			current: this.state.current,
	// 			pageSize: 10
	// 		}
	// 	})

	// }

	//  onLoadMore() {
	// 	this.setState({
	// 		loading: true,
	// 	});
	// 	this.queryChangeOrderItemGoods()
	// }

	componentDidMount() {
		this.queryOrderDetails()
	}

	render() {
		const modalObject = {
			width: '340px',
			height: '140px',
			display: 'flex',
		}
		const {
			location,
			orderDetails,
		} = this.props;
		const {
			...rest
		} = orderDetails //取值
		let records = [];
		let orderDetailVos = rest.orderDetailVos || [];
		if(orderDetailVos) {
			const length = orderDetailVos.length
			records = Array(length).fill(undefined).map(() => Object.create(null));
			for(let i = 0; i < length; i++) {
				records[i].id = orderDetailVos[i].id
				records[i].goodsName = orderDetailVos[i].viewSku.goodsName
				records[i].price = orderDetailVos[i].price
				records[i].quantity = orderDetailVos[i].quantity
				records[i].requireDate = orderDetailVos[i].requireDate
				records[i].supplierName = orderDetailVos[i].supplier.supplierName
			}
		}

		// console.log(records)
		let orderChannel;
		if (rest.channel === 'M') {
			orderChannel = '菜单生成';
		} else if (rest.channel === 'S') {
			orderChannel = '辅料订单';
		} else {
			orderChannel = '自建订单';
		}

		const extra = (
			<Row>
				<Col xs={24} sm={12}>
					<div className={styles.textSecondary}>状态</div>
					{rest.status == '0' ? <span>未下单</span> : <span>已下单</span>}
					<div className={styles.heading}>未下单</div>
				</Col>
				<Col xs={24} sm={12}>
					<div className={styles.textSecondary}>总金额</div>
					<div className={styles.heading}>{rest.total}元</div>
				</Col>
			</Row>
		);

		const description = (
			<DescriptionList className={styles.headerList} size="small" col="2">
				<Description term="订单来源">{orderChannel}</Description>
				<Description term="采购区间">{rest.interval}</Description>
				<Description term="创建时间">{rest.createTime}</Description>
				<Description term="备注内容">{rest.remark}</Description>
			</DescriptionList>
		);


		const cardTitle = (
			<span className={styles.cardTitle}>商品明细：<Tag color="cyan">共8条</Tag></span>
		);

		const { id, status } = location

		const chooseButtonGroup = () => {
			if (status == 0) return otherAction
			else return action
		}

		const action = (
			<Fragment>
				<Button>打印</Button>
				<Button style={{ marign: '0px 20px' }}>删除</Button>
				<Button onClick={() => this.purOrderAdjust('/purOrder/detail/adjust')}>调整</Button>
				<Button type="primary" onClick={this.showModal}>下单</Button>
			</Fragment>
		);

		const otherAction = (
			<Fragment>
				{/* <Cartoon bell={false} value={'点击这里可以查看配送验收情况哦'} /> */}
				<Button>打印</Button>
				<Button style={{ marign: '0px 20px' }}>再来一单</Button>
				<Button type="primary">查看配送验收情况</Button>
				{/* <Button type="primary">查看配送验收情况</Button> */}
			</Fragment>
		)
		const loadMore = () => {
			return (
				<div style={{
					textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
				}}
				>
					<Button onClick={this.onLoadMore}>加载更多</Button>
				</div>
			)
		}

		const { loading, data, visible } = this.state
		return (
			<div className={styles.PurOrderDetails}>
				{  orderDetailVos   ? null : <Redirect to='/purOrder'></Redirect>}
				{/* {location.id ? null : <Redirect to="/purOrder" />} */}
				<Bread bread={bread} value='/purOrder'></Bread>
				{/* 页头容器 */}
				<PageHeadWrapper
					className={styles.pageHeadWrap}
					title={`采购单号：${rest.orderNo}`}
					logo={
						<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
					}
					action={chooseButtonGroup()}
					content={description}
					
					Content={extra}
					{...this.props}
				>
					<Card
						title={cardTitle}
						className={styles.tableCard}
						bordered={false}
						headStyle={{ padding: "14px 30px 6px" }}
						bodyStyle={{ padding: "0 30px" }}
					>
						<Table
							pagination={false}
							loading={loading}
							rowKey='id'
							columns={tabColumns}
							dataSource={records}
							footer={() => loadMore()}
						/>
					</Card>
					<Modal
						visible={visible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						bodyStyle={modalObject}
						width='340px'
						closable={false}
					>
						<Alert message="采购单将下发给各供货商，确认下单？" type="warning" showIcon style={{ background: 'white', border: '0px', marginTop: '40px' }} />
					</Modal>
				</PageHeadWrapper>
			</div>
		)
	}
}

export default connect(({ purOrder }) => ({
	orderDetails: purOrder.orderDetails,
	orderItemGoods: purOrder.orderItemGoods
}))(PurOrderDetails)