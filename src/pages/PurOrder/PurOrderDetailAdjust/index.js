/*
 * @Author: suwei 
 * @Date: 2019-03-20 14:41:40 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-20 19:36:40
 */
import React, { Fragment } from 'react'
import Bread from '../../../components/Bread'
// import TotalNumber from '../../../components/TotalNumber'
import PurOrderTable from '../PurOrderTable'
import { connect } from 'dva';
import { Card , Button , Form , message } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';

import './index.less'

const bread = [{
  href:'/purOrder',
  breadContent:'采购订单'
},{
  breadContent:'调整'
}]

const dataSource = [
  {
    id:'1',
    commodity:'名称',
    unit:'斤',
    price:'26',
    supply:'东阳市食品有限公司',
    date:'2018-12-01',
    number:''
  },
  {
    id:'2',
    commodity:'名称',
    unit:'斤',
    price:'26',
    supply:'东阳市食品有限公司',
    date:'2018-12-01',
    number:''
  },
  {
    id:'3',
    commodity:'名称',
    unit:'斤',
    price:'26',
    supply:'东阳市食品有限公司',
    date:'2018-12-01',
    number:''
  },
]

class PurOrderAdjust extends React.Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    const { goodsInfo } = userInfo
    console.log(goodsInfo);
    const newID = {
      id:'new'
    }
    for(let i = 0; i < goodsInfo.length; i++) {
      if(!goodsInfo[i].commodity || !goodsInfo[i].unit || !goodsInfo[i].price || !goodsInfo[i].supply || !goodsInfo[i].date || !goodsInfo[i].number) {
        message.error('请完善所有信息。');
        return
      }  
    }
    // this.purOrderSave('/purOrder/details',newID)
  }

  purOrderSave = (pathname,rest) => {
    const { props } = this
    props.dispatch(routerRedux.push({ 
      pathname,
      ...rest
    }))
  }   

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Bread bread={bread} value='/purOrder'></Bread>
        <Card
          style={{width:'1160px',margin:'10px auto 0px auto'}}>
            {getFieldDecorator('goodsInfo', {
              initialValue: dataSource,
            })(<PurOrderTable />)}
        </Card>
        <div className='PurOrderDetailAdjust-footer'>
          <Button>取消</Button>
          <Button onClick={this.handleSubmit} type='primary' style={{margin:'0px 20px'}}>保存</Button>
        </div>
      </Fragment>
    )
  }
}

const  PurOrderDetailAdjust =  Form.create()(PurOrderAdjust)

export default connect(({  }) => ({
}))(PurOrderDetailAdjust);
