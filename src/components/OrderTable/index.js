import React from 'react'
import { Table,Tag,Button,Radio,Badge,Divider,Dropdown,Menu,Icon } from 'antd'
import Axios from '../../axios'
import WrappedOrderForm from '../OrderForm'

import './index.less'


const tabColumns = [{
  title: '采购单号',
  dataIndex: 'purchase',
  key: 'purchase',
}, {
  title: '订单来源',
  dataIndex: 'ResultSource',
  key: 'ResultSource',
  render(ResultSource) {
    let orderArray = {
      '0': '菜单生成',
      '1': '辅料超市',
      '2': '新建',
    }
     return <Tag color="magenta">{orderArray[ResultSource]}</Tag>
  }
}, {
  title: '创建日期',
  dataIndex: 'date',
  key: 'date',
}, {
	title: '摘要',
  dataIndex: 'subtract',
	key: 'subtract',
},{
	title: '状态',
  dataIndex: 'status',
	key: 'status',
	render(status){
		return status == 1 ? <span><Badge status="warning" />未下单</span> : <span>已下单</span>
	}
},{
	title: '操作',
  dataIndex: 'status',
  key: 'Status',
  render(status) {
    return status == 1 ? <div className='opertion'>
      <a className='orders' href='/details'>下单</a> <Divider type="vertical" /> <a className='delete'>删除</a>
      </div> : <a className='acceptance'>配送验收情况</a>
  }
}];

class OrderTable extends React.Component {
  state = {
    DataSource:[],
    tableSource:[]
  }

  componentDidMount() {
    Axios.ajax({
      url:'/order'
    }).then((value) => {
      this.setState({
        DataSource:value,
        tableSource:value
      })
    })
  }

  all = () => {
    this.setState({
      tableSource:this.state.DataSource
    })
  }

  notOrder = () => {
    var dataSource = this.state.DataSource.filter(item => item.status == 1)
    this.setState({
      tableSource:dataSource
    })
  }

  order = () => {
    var dataSource = this.state.DataSource.filter(item => item.status == 0)
    this.setState({
      tableSource:dataSource
    })
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">辅料订单</Menu.Item>
        <Menu.Item key="2">食材订单</Menu.Item>
      </Menu>
    )
    return(
      <div className='orderTable'>
          <WrappedOrderForm />
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>
              <Dropdown overlay={menu}>
                <Button type='primary' >
                <Icon type="plus" />  
                <span>新建</span>
                </Button>
              </Dropdown>
            </div>
            <div>
              <Radio.Group defaultValue="all" onChange={this.handleFormLayoutChange}>
                <Radio.Button value="all" onClick={this.all}>全部</Radio.Button>
                <Radio.Button value="未下单" onClick={this.notOrder}>未下单</Radio.Button>
                <Radio.Button value="已下单" onClick={this.order}>已下单</Radio.Button>
              </Radio.Group>
            </div>
          </div>  
          <div style={{marginTop:30}}>
            <Table columns={tabColumns} dataSource={this.state.tableSource} />
          </div>
      </div>
    )
  }
}

export default OrderTable