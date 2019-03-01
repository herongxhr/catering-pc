import React from 'react';
import { connect } from 'dva';
import { Card, Table, Tag, Row, Col, Tabs } from 'antd'
import Axios from '../../axios'
import BreadcrumbComponent from '../../components/BreadcrumbComponent'
import DeliveryTable from './DeliveryTable'

import './index.less'

const TabPane = Tabs.TabPane;


const tab1Columns = [{
  title: '配送单号',
  dataIndex: 'order',
  key: 'order',
}, {
  title: '供应商',
  dataIndex: 'Supplier',
  key: 'Supplier',
}, {
  title: '配送日期',
  dataIndex: 'Delivery',
  key: 'Delivery',
}, {
  title: '摘要',
  dataIndex: 'abstract',
  key: 'abstract',
  render: abstract => (
    <span>
      {abstract.map((item, i) => <Tag color="blue" key={i}>{item}</Tag>)}
    </span>
  ),
}, {
  title: '操作',
  dataIndex: 'Operation',
  key: 'Operation',
}];

class E extends React.Component {
  state = {
    DataSource: []
  }

  componentDidMount() {
    Axios.ajax({
      url: '/delivery'
    }).then((value) => {
      this.setState({
        DataSource: value
      })
    })
  }

  render() {
    const { location } = this.props;
    const dataSource = this.state.DataSource
    return (
      <div className='DeliveryAcce'>
        <BreadcrumbComponent {...location} />
        <Tabs defaultActiveKey="1" onChange={this.callback}>
					<TabPane tab="待配送(8)" key="1">
            <DeliveryTable />
					</TabPane>
					<TabPane tab="待验收(4)" key="2">
            <DeliveryTable />
					</TabPane>
          <TabPane tab="已验收" key="3">
            <DeliveryTable />
					</TabPane>
				</Tabs>
      </div>
    );
  }
}

export default connect(({ }) => ({}))(E);