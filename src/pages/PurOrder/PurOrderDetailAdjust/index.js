import React from 'react'
import Bread from '../../../components/Bread'
import TotalNumber from '../../../components/TotalNumber'
import PurOrderTable from '../PurOrderTable'
import { connect } from 'dva';
import { Card , Table , Button , Form } from 'antd'
import { routerRedux } from 'dva/router';

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
    date:'2018-12-01'
  },
  {
    id:'2',
    commodity:'名称',
    unit:'斤',
    price:'26',
    supply:'东阳市食品有限公司',
    date:'2018-12-01'
  },
  {
    id:'3',
    commodity:'名称',
    unit:'斤',
    price:'26',
    supply:'东阳市食品有限公司',
    date:'2018-12-01'
  },
]

class PurOrderAdjust extends React.Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo))
    this.purOrderSave('/purOrder/details')
  }

  purOrderSave = (pathname,rest) => {
    const { props } = this
    props.dispatch(routerRedux.push({ 
      pathname,
      ...rest
    }))
  }

  render() {
    const CardTitle = () => {
      return (
        <div>
          <span>商品明细</span>
          <TotalNumber value={`共10条`}/>
        </div>
      )
    }
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='PurOrderDetailAdjust'>
        <Bread bread={bread} value='/purOrder'></Bread>
        <Card
          title={CardTitle()}
          style={{width:'1160px',margin:'10px auto 0px auto'}}>
            {getFieldDecorator('foodDetails', {
              initialValue: dataSource,
            })(<PurOrderTable />)}
        </Card>
        <div className='food-new-footer'>
          <Button>取消</Button>
          <Button onClick={this.handleSubmit} type='primary' style={{margin:'0px 20px'}}>保存</Button>
        </div>
      </div>
    )
  }
}

const  PurOrderDetailAdjust =  Form.create()(PurOrderAdjust)

export default connect(({  }) => ({
}))(PurOrderDetailAdjust);
