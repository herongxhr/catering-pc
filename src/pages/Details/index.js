import React from 'react'
import DetailsSubHeader from '../../components/SubHeader'
import { Card , Table } from 'antd'
import Axios from '../../axios'
import axios from 'axios'

import './index.less'

const tabColumns = [{
  title: '商品',
  dataIndex: 'commodity',
  key: 'commodity',
}, {
  title: '单位',
  dataIndex: 'unit',
  key: 'unit'
}, {
  title: '单价',
  dataIndex: 'price',
  key: 'price',
}, {
	title: '数量',
  dataIndex: 'Number',
	key: 'Number',
},{
	title: '供应商',
  dataIndex: 'supply',
	key: 'supply'
},{
	title: '配送日期',
  dataIndex: 'date',
  key: 'date'
}];

class Details extends React.Component {
  state = {
    tab1Source:[],
    tab2Source:[]
  }

  componentDidMount() {
    const requests = [{
      url:'/order'
    },{
      url:'/more'
    }]
    Axios.ajaxGroup(requests).then((dataSource) => {
      this.setState({
				tab1Source:dataSource[1].data.result,
				tab2Source:dataSource[0].data.result,
			})
    })
  }

  render() {
    let Item
    if(this.state.tab2Source.join('') != '') {
      Item = this.state.tab1Source[0]
    } 
    let orderArray = {
      '0': '菜单生成',
      '1': '辅料超市',
      '2': '新建',
    }
    let status = {
      '0':'未下单',
      '1':'已下单'
    }
    return(
      <div>
        <DetailsSubHeader title='采购订单' subTitle='详情' />
        <Card>
          {
           Item ? 

              <div className='card-body'>
                  <p className='card-content'>
                    <span className='card-content-title'>
                    采购单号：{Item.purchase}
                    </span>
                    <span className='right' style={{ fontSize: 14 }}>
                    订单来源: {orderArray[Item.ResultSource]}
                    </span>
                  </p>
                  <p className='card-content'>
                    <span>
                    采购区间: {Item.date}
                    </span>
                    <span className='right'>
                    创建日期: {Item.date}
                    </span>
                  </p>
                  <p className='card-content'>
                    <span>
                    备注内容：备注内容备注内容备注内容备注内容
                    </span>
                    <span className='right'>
                    状态： {status[Item.status]}
                    </span>
                    <span>
                    总金: $8.8万

                    </span>
                  </p>
                </div>
           : null 
          }
        </Card>
        <Card>
          <p>商品明细</p>
          <Table columns={tabColumns} dataSource={this.state.tab1Source}></Table>
        </Card>
      </div>
    )
  }
}

export default Details