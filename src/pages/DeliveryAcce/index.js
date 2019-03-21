/*
 * @Author: suwei 
 * @Date: 2019-03-21 09:53:01 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-21 10:00:49
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd'
import BreadcrumbComponent from '../../components/BreadcrumbComponent'
import DeliveryTable from './DeliveryTable'

import './index.less'

const TabPane = Tabs.TabPane;

class E extends React.Component {
  state = {
    DataSource: [],
    tabkey:'pendingDelivery',
  }

  queryDelivery = (params = {}) =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'deliveryAcce/queryDelivery',
      payload:{
       ...params
      }
    })
  }
  componentDidMount() {
    this.queryDelivery({
      status:0,
      current:1,
      pageSize:10
    })
  }

  callback = (value) =>{
   this.setState({tabkey:value})
   if(value='pendingDelivery') {
      this.queryDelivery({
        status:0
      })  
   }
   if(value='pendingAccept') {
    this.queryDelivery({
      status:1
    })
   }
   if(value='accepted') {
    this.queryDelivery({
      status:2
    })
   }
  }

  render() {
    const { location,deliveryAcce } = this.props;
    console.log(deliveryAcce);
    const delivery = deliveryAcce.delivery.records || [];
    return (
      <div className='DeliveryAcce'>
        <BreadcrumbComponent {...location} /> 
        <Tabs defaultActiveKey="pendingDelivery" onChange={this.callback}>
					<TabPane tab={'待配送'+'('+delivery.length+')'} key="pendingDelivery">
            <DeliveryTable delivery={delivery} tabkey={this.state.tabkey}/>
					</TabPane>
					<TabPane tab={'待验收'+'('+delivery.length+')'} key="pendingAccept">
            <DeliveryTable delivery={delivery} tabkey={this.state.tabkey}/>
					</TabPane>
          <TabPane tab={'已验收'+'('+delivery.length+')'} key="accepted">
            <DeliveryTable delivery={delivery} tabkey={this.state.tabkey}/>
					</TabPane>
				</Tabs>
      </div>
    );
  }
}

export default connect(({ deliveryAcce }) => ({
  deliveryAcce,
}))(E);