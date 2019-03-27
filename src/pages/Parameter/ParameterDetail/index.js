/*
 * @Author: suwei 
 * @Date: 2019-03-20 16:55:19 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-25 09:45:04
 */
import React from 'react'
import Bread from '../../../components/Bread'
import { Card , Button , Row, Col } from 'antd'
import ParameterCard from '../ParameterCard'
// import { Redirect } from 'dva/router';
import { withRouter } from "react-router";
import { connect } from 'dva';


import './index.less'

const bread = [{
  href:'parameter',
  breadContent:'台账'
},{
  href:'catalog',
  breadContent:'详情'
}]


class MyComponent extends React.Component {
  // queryParameterTable() {
  //   const { dispatch , location } = this.props
  //   dispatch({
  //     type:'parameter/queryParameterTable',
  //     payload: {
  //       id:location.id,
  //       startDate:location.startDate,
  //       endDate:location.endDate
  //     }
  //   })
  // }

  // queryParameterDetail() {
  //   const { dispatch , location } = this.props
  //   dispatch({
  //     type:'parameter/queryParameterDetail',
  //     payload: {
  //       id:location.id,
  //       startDate:location.startDate,
  //     }
  //   })
  // }


  // componentDidMount() {
  //   this.queryParameterTable()
  // }

  render() {
    const { record } = this.props.location
    if(!record) {
      this.props.history.push('/parameter')
      return null
    }
    const {distributionNum,startDate,endDate,total,id} = record
    return(
      <div className='ParameterDetail'>
          <Bread bread={bread} value='/parameter'/>
          <Card className='DetailsOperation'>
            <div className='card-body'>
                <Row className='card-header'>
                  <Col span={12} className='card-header-title'>
                    <span className="iconfont">&#xe62b;</span>
                    <span className='odd-number'>采购单号:{id}</span>
                  </Col>
                  <Col span={12}  className='right' style={{ fontSize: 14 }}>
                    <Button>导出</Button>
                  </Col>
                </Row>
                <Row className='card-content'>
                  <Col span={8} >
                    <p className='card-content-top'>结算开始时间:{startDate}</p>
                    <p>配送单数量(张)：{distributionNum}</p>
                  </Col>
                  <Col span={8}>
                    <p className='card-content-top'>结算结束时间：{endDate}</p>
                    {/* <p>备注内容:备注内容备注内容备注内容</p> */}
                  </Col>
                  <Col span={8}>
                    <Col span={12}></Col >
                    <Col span={12}><p className='card-content-top' style={{paddingBottom:'0px'}}>总金额</p><p style={{paddingTop:'5px'}}>{total}</p></Col >            
                  </Col>
                </Row>
              </div>
            </Card>
          <ParameterCard id={id} />
      </div>
    )
  }
}

const ParameterDetail = withRouter(MyComponent)

export default connect(({})=>({}))
(ParameterDetail);