import React from 'react';
import Report from '../../components/Report';
import TwoBread from '../../components/TwoBread';
import { Card, Row, Col } from 'antd'

import './index.less'

class OutStorck extends React.Component {
	render() {
		return(
			<div className='outstock'>
				<Card
				style={{ width: '100%' }}
				title={<TwoBread title='工作台' subTitle='缺样上报' />}
				onTabChange={(key) => { this.onTabChange(key, 'key'); }}
				>
					<Report />
				</Card>
			</div>
		)
	}
}

export default OutStorck