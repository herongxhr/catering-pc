import React from 'react'
import DetailsSubHeader from './DetailsSubHeader'
import { Card , Table , Button , Row, Col} from 'antd'
import Axios from '../../axios'

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
      <div className='Details'>
        <DetailsSubHeader title='采购订单' subTitle='详情' />
        <Card className='DetailsOperation'>
          <div className='card-body'>
              <Row className='card-header'>
                <Col span={12} className='card-header-title'>
                  <span className="iconfont">&#xe62b;</span>
                  <span className='odd-number'>采购单号：5472563456765</span>
                </Col>
                <Col span={12}  className='right' style={{ fontSize: 14 }}>
                  <Button>打印</Button>
                  <Button>删除</Button>
                  <Button>调整</Button>
                  <Button type='primary'>下单</Button>
                </Col>
              </Row>
              <Row className='card-content'>
                <Col span={8} >
                  <p className='card-content-top'>订单来源:菜单生成</p>
                  <p>创建日期:2018-12-01</p>
                </Col>
                <Col span={8}>
                  <p className='card-content-top'>采购区间:2018-12-01至2018-12-07</p>
                  <p>备注内容:备注内容备注内容备注内容</p>
                </Col>
                <Col span={8}>
                  <Col span={12}><p className='card-content-top'>状态</p><p>待下单</p></Col >
                  <Col span={12}><p className='card-content-top'>总金额</p><p>¥8.8万</p></Col >            
                </Col>
              </Row>
            </div>
          </Card>
          <Card className='DetailContent'>
            <p>商品明细</p>
            <Table columns={tabColumns} dataSource={this.state.tab1Source} pagination={false}></Table>
          </Card>
      </div>
    )
  }
}

export default Details