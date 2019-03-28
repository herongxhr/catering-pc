/*
 * @Author: suwei 
 * @Date: 2019-03-20 14:41:40 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-27 19:27:10
 */
import React, { Fragment } from 'react'
import Bread from '../../../components/Bread'
import PurOrderTable from '../PurOrderTable'
import { connect } from 'dva';
import { Card , Button , Form , message , Alert , Icon } from 'antd'
import { routerRedux } from 'dva/router';

import './index.less'

const bread = [{
  href:'/purOrder',
  breadContent:'采购订单'
},{
  breadContent:'调整'
}]

class PurOrderAdjust extends React.Component {
  state = {
    showAlert:false,
    alertPrice:false,
    index:1,
  }

  handleSubmit = () => {
    let object = {}
    let id = '' //建立一个变量保存后端返回的ID
    const { type } = this.props.location
    const { orderTableForm , orderItemGoods , orderDetails} = this.props
    //表单验证 message提示
    for(let i = 0; i < orderTableForm.length; i++) {
      if(orderTableForm[i].price.toString() == '0' ) {
        message.error('商品单价不能为0')
        return      
      }
      if(!orderTableForm[i].price || !orderTableForm[i].quantity || !orderTableForm[i].supplierId || !orderTableForm[i].requiredDate) {
        message.error('请完善所有信息')    
        return
      }
    }
    if(type) {
      object.type = type
      object.channel = 'N'
      object.orderDetails = orderTableForm
    }
    console.log(object)
    this.queryOrderForm(object) 
    this.purOrderSave('/purOrder/details')
    // if(orderItemGoods) {
    //   message.success('请求成功')
    //   this.purOrderSave(orderItemGoods)
    // }
    // this.purOrderSave('',{
    //   id:'303c452ba8d4b4a068f84413d286aedf'
    // })
  }

  queryOrderForm = (data) => {
    const { props } = this
    props.dispatch({
      type:'purOrder/queryOrderForm',
      payload:data
    })
  }
  //点击出现表单验证card
  showAlert = () => {
    this.setState({
      showAlert:!this.state.showAlert
    })
  }

  purOrderSave = (pathname,rest) => {
    const { props } = this
    props.dispatch(routerRedux.push({ 
      pathname,
      ...rest
    }))
  }   

  render() {
    const { alertPrice } = this.props
    return (
      <Fragment>
        <Bread bread={bread} value='/purOrder'></Bread>
        <Card
          style={{width:'1160px',margin:'10px auto 0px auto'}}>
          <PurOrderTable />
        </Card>
        <div className='PurOrderDetailAdjust-footer'>
          {
            this.state.showAlert ? ( 
            <Card title="表单校验结果" style={{width:'290px',height:'215px'}}>
              { alertPrice ? <Alert showIcon message="商品单价不能为0" type="error"  description="单价"  /> : null}
              <Alert showIcon message="商品数量不能为0" type="error"  description="单价"  />
            </Card> ) : null
          }
          <div className='footer'>
            <a style={{marginRight:'20px'}} onClick={this.showAlert}>
              <Icon type="info-circle" theme="twoTone" twoToneColor="red" />
              { alertPrice ?<span style={{marginLeft:'5px'}}>{this.state.index}</span>:null}
            </a>
            <Button>取消</Button>
            <Button onClick={this.handleSubmit} type='primary' style={{margin:'0px 20px'}}>保存</Button>
          </div>
        </div>
      </Fragment>
    )
  }
}

const  PurOrderDetailAdjust =  Form.create()(PurOrderAdjust)

export default connect(({ purOrder }) => ({
  orderDetails:purOrder.orderDetails,
  alertPrice:purOrder.alertPrice,
  orderTableForm:purOrder.orderTableForm,
  orderItemGoods:purOrder.changeOrderForm,
}))(PurOrderDetailAdjust);
