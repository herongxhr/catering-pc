import React from 'react'
import { Table } from 'antd'
import ParameterForm from './ParameterForm'
import { withRouter } from 'react-router'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import './index.less'

const Columns = [{
  title: '供应商',
  dataIndex: 'supplierName',
  key: 'supplierName',
}, {
  title: '结算月份',
  dataIndex: 'distributionDate',
  key: 'distributionDate',
}, {
	title: '配送单数量(张)',
  dataIndex: 'distributionNum',
	key: 'distributionNum',
}, {
	title: '总金额',
  dataIndex: 'total',
  key: 'total',
}];



class ParameterTable extends React.Component {
  queryParameterTable() {
    const { dispatch } = this.props
    dispatch({
      type:'parameter/queryParameterTable'
    })
  }

  componentDidMount() {
    this.queryParameterTable()
  }

  handleLinkChange(record,id,startDate) {   
    const { props } = this
    props.dispatch(routerRedux.push({ 
      pathname: '/parameter/detail',
      id,
      startDate,
      endDate:record.endDate
    }))
  }

  handleTableChange = (page) => {   
		const { dispatch } = this.props;
		dispatch({
			type: 'purOrder/queryOrderTable',
			payload: { 
				current:page,
				pageSize:10
			},
		})
	}

  render() {
    const { ParameterTable } = this.props   
    const {
			current,
      records,
      total,
		} = ParameterTable;

    return(
      <div className='ParameterTable'>
        <ParameterForm />
        <Table 
          columns={Columns} 
          dataSource={records} 
          rowKey='supplierId'
          pagination={{
            total:total,
            current:current
          }}
          onChange={this.handleTableChange} 
          onRow={(record) => {
          return {
            onClick:() => {
              this.props.history.push('/parameter/detail')
              this.handleLinkChange(
                record,
                record.id,
                record.distributionDate
              )
            }
          }
        }} />
      </div>
    )
  }
}


export default connect(({parameter})=>({ParameterTable:parameter.ParameterTable}))
(withRouter(ParameterTable));