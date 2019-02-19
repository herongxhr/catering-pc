import React from 'react'
import SubHeader from '../../Components/SubHeader'
import { Card,Row,Col } from 'antd'
import ParameterTable from '../../Components/ParameterTable'


import './index.less'

class Parameter extends React.Component {
  render() {
    return(
      <div className='Parameter'>
        <Card
				style={{ width: '100%' }}
				title={<SubHeader title='采购订单' subTitle='' />}
				>
					<Row>
						<Col xl={{span: 15, offset: 4}}>
              <ParameterTable />
						</Col>
					</Row>
				</Card>
      </div>
    )
  }
}

export default Parameter