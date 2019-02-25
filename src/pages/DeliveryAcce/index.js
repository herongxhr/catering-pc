import React from 'react'
import { Card,Table,Tag,Row,Col  } from 'antd'
import Axios from '../../axios'
import Bread from '../../components/Bread'
import DeliveryForm from './DeliveryForm'

import './index.less'

const tabList = [{
  key: 'tab1',
  tab: '待配送',
}, {
  key: 'tab2',
  tab: '待验收',
},{
	key:'tab3',
	tab:'已验收'
}]

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
      {abstract.map((item,i) => <Tag color="blue" key={i}>{item}</Tag>)}
    </span>
  ),
}, {
	title: '操作',
  dataIndex: 'Operation',
  key: 'Operation',
}];





class E extends React.Component {
  state = {
    key: 'tab1',
		noTitleKey: 'app',
		DataSource:[]
  }

  onTabChange = (key, type) => {
		this.setState({ [type]: key });
	}
	
	componentDidMount() {
    Axios.ajax({
      url:'/delivery'
    }).then((value) => {
      this.setState({
        DataSource:value
      })
    })
	}

  render() {
    const dataSource = this.state.DataSource
		const contentList = {
			tab1: <Table columns={tab1Columns} dataSource={dataSource} />,
			tab2: <Table columns={tab1Columns} dataSource={dataSource} />,
			tab3: <Table columns={tab1Columns} dataSource={dataSource} />
    };
    const bread = [{
      href:'/delivery',
      breadContent:'配送验收'
    },{
      href:'/wait',
      breadContent:'待配送'
    }]
    return (
      <div className='DeliveryAcce'>
        <Bread bread={bread}  />
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
        	<Row type="flex" justify="center">
						<Col xl={{span: 15}}>
              <div style={{ background: '#ECECEC' }}>
                <div style={{ background: 'white'}}>
                  <DeliveryForm />
                  {contentList[this.state.key]}
                </div>
              </div>
						</Col>
					</Row>
        </Card>
      </div>
    );
  }
}

export default E