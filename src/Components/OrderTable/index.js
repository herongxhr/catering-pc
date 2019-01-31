import React from 'react'
import { Table,Tag,Tabs,Button,Radio } from 'antd'
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
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div><Button type='primary' icon="plus">新建菜单</Button></div>
            <div>
              <Radio.Group defaultValue="all" onChange={this.handleFormLayoutChange}>
                <Radio.Button value="all">全部</Radio.Button>
                <Radio.Button value="未下单">未下单</Radio.Button>
                <Radio.Button value="已下单">已下单</Radio.Button>
              </Radio.Group>
            </div>
          </div>  
          <div style={{marginTop:30}}>
            <Table columns={tabColumns} dataSource={this.state.DataSource}/>
          </div>
      </div>
    )
  }
}

export default OrderTable