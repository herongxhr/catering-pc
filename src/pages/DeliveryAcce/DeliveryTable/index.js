import React from 'react'
import DeliveryForm from '../DeliveryForm'
import Axios from '../../../axios'
import { Tag , Table} from 'antd'

import './index.less'

const tab1Columns = [{
  title: '配送单号',
  dataIndex: 'order',
  key: 'order',
}, {
  title: '供应商',
  dataIndex: 'Supplier',
  key: 'Supplier',
}, {
  title: '配送日期',
  dataIndex: 'Delivery',
  key: 'Delivery',
}, {
  title: '摘要',
  dataIndex: 'abstract',
  key: 'abstract',
  render: abstract => (
    <span>
      {abstract.map((item, i) => <Tag color="blue" key={i}>{item}</Tag>)}
    </span>
  ),
}, {
  title: '操作',
  dataIndex: 'Operation',
  key: 'Operation',
}];


class DeliveryTable extends React.Component {
  state = {
    DataSource: []
  }

  componentDidMount() {
    Axios.ajax({
      url: '/delivery'
    }).then((value) => {
      this.setState({
        DataSource: value
      })
    })
  }

  render() {
    return(
      <div className='DeliveryTable'>
        <DeliveryForm />
        <Table  columns={tab1Columns} dataSource={this.state.DataSource} style={{paddingLeft:30,paddingRight:30}} />
      </div>
    )
  }
}

export default DeliveryTable