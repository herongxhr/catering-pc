import React from 'react';
import Report from '../../components/Report';
import TwoBread from '../../components/TwoBread';
import { Card,} from 'antd'
import { connect } from 'dva';
import './index.less'

class OutStorck extends React.Component {
	queryReportmissing = (params = {}) => {
		const { dispatch } = this.props;
		//请求待办事项
		dispatch({
		  type: 'report/queryReportmissing',
		  payload:{
			...params,
		  }
		})
	  }
	  componentDidMount() {
		this.queryReportmissing()
	  }
	render() {
		const { report } = this.props
    const reportList = report.reportList
		return(
			<div className='outstock'>
				<Card
				style={{ width: '100%' }}
				title={<TwoBread title='工作台' subTitle='缺样上报' />}
				>
					<Report queryReportmissing={this.queryReportmissing} reportList={reportList}/>
				</Card>
			</div>
		)
	}
}

export default connect(( {report} ) => ({
	report,
  }))(OutStorck);