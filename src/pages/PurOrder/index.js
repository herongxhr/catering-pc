import React from 'react';
import { connect } from 'dva';
import OrderTable from '../../components/OrderTable';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import {  Row, Col } from 'antd';

import './index.less';

class PurOrder extends React.Component {
	render() {
		console.log(this.props);
		// const bread = [{
		// 	href: '/order',
		// 	breadContent: '采购订单'
		// }]
		const { location } = this.props;
		return (
			<div className='purOrder'>
				<BreadcrumbComponent {...location} />
				<Row type="flex" justify="center">
					<Col xl={{ span: 15 }} style={{ marginTop: 15, padding: 15 }}>
						<OrderTable />
					</Col>
				</Row>
			</div>
		)
	}
}

export default connect(({ }) => ({}))(PurOrder)