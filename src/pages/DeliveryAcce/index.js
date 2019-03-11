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
    this.queryDelivery()
  }
  callback = (value) =>{
   this.setState({tabkey:value})
  }

  render() {
    const { location,deliveryAcce } = this.props;
    const delivery = deliveryAcce.delivery || [];
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