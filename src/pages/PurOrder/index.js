import React from 'react'
import OrderTable from '../../components/OrderTable'
import SubHeader from '../../components/SubHeader'
import { Card } from 'antd'

import './index.less'

class D extends React.Component {
	render() {
		return(
			<div className='PurchaseOrder'>
				<Card
				style={{ width: '100%' }}
				title={<SubHeader title='采购订单' subTitle='' />}
				onTabChange={(key) => { this.onTabChange(key, 'key'); }}
				>
					<OrderTable />
				</Card>
			</div>
		)
	}
}

export default D