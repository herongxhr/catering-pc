import React from 'react';
import Report from '../../components/Report';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { Card,} from 'antd'
import { connect } from 'dva';
import './index.less'

class OutStorck extends React.Component {

	render() {
		const {location} = this.props;
		return(
			<div className='outstock'>
			<BreadcrumbComponent {...location} />
				<Card>
					<Report />
				</Card>
			</div>
		)
	}
}

export default connect(( {report} ) => ({
	report,
  }))(OutStorck);