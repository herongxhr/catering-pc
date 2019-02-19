import React from 'react'
import { Card,Table,Tag,Tabs } from 'antd'
import axios from 'axios'
import SubHeader from '../../Components/SubHeader'
import TableOne from '../../Components/TableOne'
import TableTwo from '../../Components/TableTwo'

import './index.less'

const baseURL =	'https://www.easy-mock.com/mock/5c4c02ec50f5ab309c7dec17/DataSource'
const TabPane = Tabs.TabPane;

const tabList = [{
  key: 'tab1',
  tab: '统一菜单',
}, {
  key: 'tab2',
  tab: '我的菜单',
},{
	key:'tab3',
	tab:'菜单模板'
}];

const tab1Columns = [{
  title: '菜单编号',
  dataIndex: 'menuID',
  key: 'menuID',
}, {
  title: '周次',
  dataIndex: 'weekly',
  key: 'weekly',
}, {
  title: '日期',
  dataIndex: 'date',
  key: 'date',
}, {
	title: '下达单位',
  dataIndex: 'unit',
	key: 'unit',
}, {
	title: '下达时间',
  dataIndex: 'time',
  key: 'time',
}, {
	title: '执行状态',
  dataIndex: 'status',
	key: 'status',
	render(status){
		return status == 1?'已执行':'未执行'
	}
}];

const tab2Columns = [{
	title: '菜单编号',
  dataIndex: 'menuID',
  key: 'menuID',
},{
	title: '周次',
  dataIndex: 'weekly',
  key: 'weekly',
},{
	title: '日期',
  dataIndex: 'date',
  key: 'date',
},{
	title: '执行状态',
  dataIndex: 'status',
	key: 'status',
	render(status){
		let config  = {
			'0':'已执行',
			'1':'未执行',
	}
		return config[status]
	}
},{
	title:'操作',
	dataIndex:'operation',
	key:'operation',
	render(operation){
		return operation == 1?<span style={{color:'blue'}}>删除</span>:''
	}
}]


const requests = [{
	url:`${baseURL}/mymenu`
},{
	url:`${baseURL}/menuItem`
}]



class B extends React.Component {
  state = {
    key: 'tab1',
		tab1Source:[],
		tab2Source:[]
  }

  onTabChange = (key, type) => {
		this.setState({ [type]: key });
	}
	
	componentDidMount() {
		let promises = []
		for(let i = 0; i <  requests.length; i++) {
			promises.push(axios.get(requests[i].url))
		}
		axios.all(promises).then(axios.spread((...args) => {
			this.setState({
				tab1Source:args[1].data.result,
				tab2Source:args[0].data.result,
			})
		}))
	}

  render() {
		const contentList = {
			tab1: <TableOne columns={tab1Columns} dataSource={this.state.tab1Source}  />,
			tab2: <TableTwo columns={tab2Columns} dataSource={this.state.tab2Source} />,
			tab3: <Table columns={tab1Columns} dataSource={this.state.DataSource} />
		};
    return (
      <div className='card-wrapper'>
        <Card
          title={<SubHeader title='菜单中心' subTitle='统一菜单' />}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
            <div className='content-wrapper'>
							{contentList[this.state.key]}
            </div>        
        </Card>
      </div>
    );
  }
}

export default B