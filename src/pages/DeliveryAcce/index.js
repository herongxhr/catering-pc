/*
 * @Author: suwei 
 * @Date: 2019-03-21 09:53:01 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-21 16:16:06
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd'
import Bread from '../../components/Bread'
import DeliveryTable from './DeliveryTable'

import './index.less'
import { denodeify } from 'q';

const TabPane = Tabs.TabPane;

class E extends React.Component {
  state = {
    DataSource: [],
    tabkey:'pendingDelivery',
    bread:[{
      href:'/delivery',
      breadContent:'配送验收'
    },{
      breadContent:'待配送'
    }]
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
   console.log(value);
   if(value=='pendingDelivery') {
      this.queryDelivery({
        status:0
      })
      this.setState({
        bread:[{
          href:'/delivery',
          breadContent:'配送验收'
        },{
          breadContent:'待配送'
        }]
      })  
   }
   if(value=='pendingAccept') {
    this.queryDelivery({
      status:1
    })
    this.setState({
      bread:[{
        href:'/delivery',
        breadContent:'配送验收'
      },{
        breadContent:'待验收'
      }]
    })
   }
   if(value=='accepted') {
    this.queryDelivery({
      status:2
    })
    this.setState({
      bread:[{
        href:'/delivery',
        breadContent:'配送验收'
      },{
        breadContent:'已验收'
      }]
    })
   }
  }

  render() {

    const { location,deliveryAcce } = this.props;
    const delivery = deliveryAcce.delivery.records || [];
    return (
      <div className='DeliveryAcce'>
        <Bread bread={this.state.bread} />
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