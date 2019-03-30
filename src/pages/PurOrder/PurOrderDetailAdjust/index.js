/*
 * @Author: suwei 
 * @Date: 2019-03-20 14:41:40 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-30 15:11:15
 */
import React, { Fragment } from 'react'
import Bread from '../../../components/Bread'
import PurOrderTable from '../PurOrderTable'
import { connect } from 'dva';
import { Card, Button, Form, message, Alert, Icon, Modal } from 'antd'
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
    id:'',
    visible:false
  }

  validatorForm = (orderTableForm) => {
    for (let i = 0; i < orderTableForm.length; i++) {
      if (orderTableForm[i].price.toString() == '0') {
        message.error('商品单价不能为0')
        return
      }
      if (!orderTableForm[i].price  || !orderTableForm[i].supplierId || !orderTableForm[i].requiredDate) {
        message.error('请完善所有信息')
        return
      }
    }
  }

  cancelModalShow = () => {
    this.setState({
      visible:true
    })
  }

  handleCancel = () => {
    this.setState({
      visible:false
    })
  }

  handleOK = () => {
    const { type, data , channel } = this.props.location.state;
    if(channel == 'M') {
      data.channel = 'M'
      this.TableLinkChange('/menubar/unified-menu/details',data)
    }
    if(channel == 'S') {
      data.channel = 'S'
      this.TableLinkChange('/accSupermarket',data)
    }

  }

  handleSubmit = () => {
    let object = {} 
    const { location } = this.props;
    const { type, data , channel } = location.state;
    // 类型
    const { orderTableForm } = this.props
    //表单验证 message提示
    this.validatorForm(orderTableForm)
    //处理传递给后端表格数据
    object.type = type || ''
    object.channel = channel || '' 
    object.orderDetails = orderTableForm || {}
    if(data) {
      object.camenuId = data.id || ''
    }
    console.log(object)
    if(this.state.id) {
      object.id = this.state.id
      object.callback = (value) => {
        if(value) {
          this.TableLinkChange('/purOrder/details',this.state.id)
        } else {
          message.error('更新出错')
        }
      }  
      this.queryOrderForm(object)   
    }
    if(!this.state.id) {
      object.callback = (id) => {
        this.TableLinkChange('/purOrder/details',id)
      }
      this.queryOrderForm(object)
    }
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
    const { type = '', data = {}, channel = '' , adjustId } = this.props.location.state;
    if(adjustId) {
      this.setState({
        id:adjustId
      })
      this.props.dispatch({
        type:'purOrder/judgeDetailsOrderForm',
        payload:adjustId
      })
    }
    if(channel == 'S') {
      this.props.dispatch({
        type:'purOrder/mallPreOrder',
        payload:data
      })
    }
    if(channel == 'M') {
      const { id } = data
      this.props.dispatch({
        type:'purOrder/camenuPreOrder',
        payload:id
      })
    }
    if(channel == 'N') {
      this.props.dispatch({
        type:'purOrder/clearOrderTableForm'
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
		const modalObject = {
			width: '340px',
			height: '140px',
			display: 'flex',
		}
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
            <Button onClick={this.cancelModalShow}>取消</Button>
            <Button onClick={this.handleSubmit} type='primary' style={{ margin: '0px 20px' }}>保存</Button>
          </div>
        </div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
          bodyStyle={modalObject}
          width='340px'
          closable={false}
        >
          <Alert message='确认取消保存' type="warning" showIcon style={{ background: 'white', border: '0px', marginTop: '40px' }} />
        </Modal> 
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
