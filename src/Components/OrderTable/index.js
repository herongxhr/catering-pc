import React from 'react'
import { Table,Tag,Tabs,Button } from 'antd'
import Axios from '../../axios'
import WrappedOrderForm from '../OrderForm'

import './index.less'

const TabPane = Tabs.TabPane;

const tabColumns = [{
  title: '采购单号',
  dataIndex: 'purchase',
  key: 'purchase',
}, {
  title: '订单来源',
  dataIndex: 'ResultSource',
  key: 'ResultSource',
  render(ResultSource) {
    return <Tag color="magenta">ResultSource</Tag>
  }
}, {
  title: '创建日期',
  dataIndex: 'date',
  key: 'date',
}, {
	title: '摘要',
  dataIndex: 'subtract',
	key: 'subtract',
}, {
	title: '操作',
  dataIndex: 'operation',
  key: 'operation',
}, {
	title: '状态',
  dataIndex: 'status',
	key: 'status',
	render(status){
		return status == 1?'未下单':'已下单'
	}
}];

class OrderTable extends React.Component {
  state = {
		DataSource:[]
  }
  componentDidMount() {
    Axios.ajax({
      url:'/order'
    }).then((value) => {
      this.setState({
        DataSource:value
      })
    })
  }
  render() {
    return(
      <div className='orderTable'>
          <WrappedOrderForm />
          <Button type='primary' icon="plus" style={{marginLeft:25}}>新建菜单</Button>
          <Tabs defaultActiveKey="1" style={{marginTop:-47}} className='tableOne'>
            <TabPane tab="全部" key="1">
              <Table columns={tabColumns} dataSource={this.state.DataSource}/>
            </TabPane>
            <TabPane tab="未下单" key="2">未执行</TabPane>
            <TabPane tab="已下单" key="3">更多</TabPane>
          </Tabs>
      </div>
    )
  }
}

export default OrderTable