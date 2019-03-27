import React from 'react'
import {  Table} from 'antd'
import { connect } from 'dva';
import { withRouter } from "react-router";
import './index.less'
import moment from 'moment'

class DeliveryLog extends React.Component {
  state = {
    opertion:true
  }
  queryLog = (params = {}) => {
    const { dispatch, location } = this.props;
    const id = location.state && location.state.id;
    dispatch({
      type: 'deliveryAcce/queryLog',
      payload: {
        ...params,
        id:id
      }
    })
  }
  componentDidMount(){
    this.queryLog()
  }
  render() {
    const {logList=[]} = this.props
    const tab1Columns = [{
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
    },{
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
    }, {
      title: '操作时间',
      dataIndex: 'operationTime',
      key: 'operationTime',
      render:(text)=>{
        return(
            <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
        )
      }
    },{
        title: '耗时',
        dataIndex: 'useTime',
        key: 'useTime',
      }
     ];
    return(
      <div className='DeliveryLog'>
        <div className='delilogTitle'>
            配送验收日志
        </div>
          <Table  
            columns={tab1Columns}  
            rowKey='id'
            dataSource={logList}
            />
      </div>
    )
  }
}
export default connect(({deliveryAcce }) => ({
  logList:deliveryAcce.logList,
}))(withRouter(DeliveryLog));