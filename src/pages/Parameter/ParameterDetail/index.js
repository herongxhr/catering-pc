import React from 'react'
import Bread from '../../../components/Bread'
import { Card , Button , Row, Col } from 'antd'
import ParameterCard from '../ParameterCard'
import { connect } from 'dva';


import './index.less'

const bread = [{
  href:'parameter',
  breadContent:'台账'
},{
  href:'catalog',
  breadContent:'采购目录'
}]


class ParameterDetail extends React.Component {
  queryParameterTable() {
    const { dispatch , location } = this.props
    dispatch({
      type:'parameter/queryParameterTable',
      payload: {
        id:location.id,
        startDate:location.startDate
      }
    })
  }

  queryParameterDetail() {
    const { dispatch , location } = this.props
    dispatch({
      type:'parameter/queryParameterDetail',
      payload: {
        id:location.id,
        startDate:location.startDate,
      }
    })
  }


  componentDidMount() {
    this.queryParameterTable()
  }

  render() {
    return(
      <div className='ParameterDetail'>
        <Bread bread={bread} value='/parameter'/>
        <Card className='DetailsOperation'>
          <div className='card-body'>
              <Row className='card-header'>
                <Col span={12} className='card-header-title'>
                  <span className="iconfont">&#xe62b;</span>
                  <span className='odd-number'>采购单号：5472563456765</span>
                </Col>
                <Col span={12}  className='right' style={{ fontSize: 14 }}>
                  <Button>导出</Button>
                </Col>
              </Row>
              <Row className='card-content'>
                <Col span={8} >
                  <p className='card-content-top'>订单来源:菜单生成</p>
                  <p>创建日期:2018-12-01</p>
                </Col>
                <Col span={8}>
                  <p className='card-content-top'>采购区间:2018-12-01至2018-12-07</p>
                  {/* <p>备注内容:备注内容备注内容备注内容</p> */}
                </Col>
                <Col span={8}>
                  <Col span={12}></Col >
                  <Col span={12}><p className='card-content-top' style={{paddingBottom:'0px'}}>总金额</p><p style={{paddingTop:'5px'}}>¥8.8万</p></Col >            
                </Col>
              </Row>
            </div>
          </Card>
        <ParameterCard />
      </div>
    )
  }
}

export default connect(({parameter})=>({ParameterTable:parameter.ParameterTable}))
(ParameterDetail);