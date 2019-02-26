import React from 'react'
import OrderTable from '../../components/OrderTable'
import Bread from '../../components/Bread'
import { Card, Row, Col } from 'antd'

import './index.less'

class D extends React.Component {
	render() {
		const bread = [{
			href:'/order',
			breadContent:'采购订单'
		}]
		return(
			<div className='PurchaseOrder'>
					<Bread bread={bread} />
					<Row type="flex" justify="center">
						<Col xl={{span: 15}} style={{marginTop:15,padding:15}}>
							<OrderTable />
						</Col>
					</Row>
			</div>
		)
	}
}

export default D