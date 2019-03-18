import React from 'react'
import {  Table} from 'antd'
import { withRouter } from "react-router";
import './index.less'

class DeliveryLog extends React.Component {
  state = {
    opertion:true
  }
  render() {
    const tab1Columns = [{
      title: '操作类型',
      dataIndex: 'operType',
      key: 'operType',
    },{
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
    }, {
      title: '操作时间',
      dataIndex: 'operTime',
      key: 'operTime',
    },{
        title: '耗时',
        dataIndex: 'timeConsume',
        key: 'timeConsume',
      }
     ];
     const data = [
      {
        key: '1',
        operType: '发起换货申请',
        operator: '供货商名称',
        operTime: '2018-11-28 12:26:58',
        timeConsume: '1mins',
      },
      {
        key: '2',
        operType: '配送单生成',
        operator: '管理员',
        operTime: '2018-11-28  12:11:10',
        timeConsume: '1mins',
      },
     ]
    return(
      <div className='DeliveryLog'>
        <div className='delilogTitle'>
            配送验收日志
        </div>
          <Table  
            columns={tab1Columns}  
            rowKey='id'
            dataSource={data}
            />
      </div>
    )
  }
}
export default DeliveryLog;