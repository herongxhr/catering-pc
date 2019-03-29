/*
 * @Author: suwei 
 * @Date: 2019-03-20 14:41:40 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-29 12:48:29
 */
import React, { Fragment } from 'react'
import Bread from '../../../components/Bread'
import PurOrderTable from '../PurOrderTable'
import { connect } from 'dva';
import { Card, Button, Form, message, Alert, Icon } from 'antd'
import { routerRedux } from 'dva/router';

import './index.less'

const bread = [{
  href: '/purOrder',
  breadContent: '采购订单'
}, {
  breadContent: '调整'
}]

class PurOrderAdjust extends React.Component {
  state = {
    showAlert: false,
    alertPrice: false,
    index: 1,
  }

  handleSubmit = () => {
    let object = {}
    let id = '' //建立一个变量保存后端返回的ID
    const { location } = this.props;
    const { type, data } = location.state;
    // 类型
    const { orderTableForm, orderItemGoods, orderDetails } = this.props
    console.log(orderTableForm)
    debugger;
    //表单验证 message提示
    for (let i = 0; i < orderTableForm.length; i++) {
      if (orderTableForm[i].price.toString() == '0') {
        message.error('商品单价不能为0')
        return
      }
      if (!orderTableForm[i].price || !orderTableForm[i].quantity || !orderTableForm[i].supplierId || !orderTableForm[i].requiredDate) {
        message.error('请完善所有信息')
        return
      }
    }
    if (type) {
      object.type = type
      object.channel = 'N'
      object.orderDetails = orderTableForm
    }
    console.log(object)
    object.callback = (id) => {
      this.TableLinkChange('/purOrder/details',id)
    }
    this.queryOrderForm(object)
  }

  queryOrderForm = (data) => {
    const { props } = this
    props.dispatch({
      type: 'purOrder/queryOrderForm',
      payload: data
    })
  }

  componentDidMount() {
    console.log(this.props.location.state)
    const { type = '', data = {} , adjustId } = this.props.location.state;
    if(adjustId) {
      this.props.dispatch({
        type:'purOrder/judgeDetailsOrderForm',
        payload:adjustId
      })
    }
    if(Object.keys(data).length) {
      this.props.dispatch({
        type:'purOrder/mallPreOrder',
        payload:data
      })
    }
  }
  

  //点击出现表单验证card
  showAlert = () => {
    this.setState({
      showAlert: !this.state.showAlert
    })
  }

	TableLinkChange = (pathname, id) => {
		this.props.dispatch(routerRedux.push({
			pathname,
			state: { id: id }
		}))
	}

  render() {
    const { alertPrice } = this.props
    const { location } = this.props;
    // 类型

    return (
      <Fragment>
        <Bread bread={bread} value='/purOrder'></Bread>
        <Card
          style={{ width: '1160px', margin: '10px auto 0px auto' }}>
          <PurOrderTable/>
        </Card>
        <div className='PurOrderDetailAdjust-footer'>
          {
            this.state.showAlert ? (
              <Card title="表单校验结果" style={{ width: '290px', height: '215px' }}>
                {alertPrice ? <Alert showIcon message="商品单价不能为0" type="error" description="单价" /> : null}
                <Alert showIcon message="商品数量不能为0" type="error" description="单价" />
              </Card>) : null
          }
          <div className='footer'>
            <a style={{ marginRight: '20px' }} onClick={this.showAlert}>
              <Icon type="info-circle" theme="twoTone" twoToneColor="red" />
              {alertPrice ? <span style={{ marginLeft: '5px' }}>{this.state.index}</span> : null}
            </a>
            <Button>取消</Button>
            <Button onClick={this.handleSubmit} type='primary' style={{ margin: '0px 20px' }}>保存</Button>
          </div>
        </div>
      </Fragment>
    )
  }
}

const PurOrderDetailAdjust = Form.create()(PurOrderAdjust)

export default connect(({ purOrder }) => ({
  orderDetails: purOrder.orderDetails,
  alertPrice: purOrder.alertPrice,
  orderTableForm: purOrder.orderTableForm,
  orderItemGoods: purOrder.changeOrderForm,
}))(PurOrderDetailAdjust);
