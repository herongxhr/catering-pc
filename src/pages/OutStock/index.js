import React from 'react'
import Report from '../../components/Report/Report'
import SubHeader from '../../components/SubHeader'
import { Card, Row, Col } from 'antd'

import './index.less'

class D extends React.Component {
	render() {
		return(
			<div className='qhbz'>
				<Card
				style={{ width: '100%' }}
				title={<SubHeader title='工作台' subTitle='缺样上报' />}
				onTabChange={(key) => { this.onTabChange(key, 'key'); }}
				>
					<Row>
						<Col xl={{span: 15, offset: 4}}>
							<Report />
						</Col>
					</Row>
				</Card>
			</div>
		)
	}
}

export default D