import React from 'react'
import { Card,Table,Tag,Tabs } from 'antd'
import Axios from '../../axios'
import SubHeader from '../../components/SubHeader'
import WrappedInlineForm from '../../components/InlineForm'
import TableOne from '../../components/TableOne'
import TableTwo from '../../components/TableTwo'
import MenuTemplate from '../../components/MenuTemplate'


import './index.less'

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
	url:`/mymenu`
},{
	url:`/menuItem`
}]



class B extends React.Component {
  state = {
		key: 'tab1',
		tab:0,
		tab1Source:[],
		tab2Source:[],
  }

  onTabChange = (key, type) => {
		const titleList = ['tab1','tab2','tab3']
		const count = titleList.indexOf(key) //通过改变count来修改传入SubHeader的值
		this.setState({ 
			[type]: key,
			tab:count
		 });
	}
	
	componentDidMount() {
		Axios.ajaxGroup(requests).then((dataSource) => {
			this.setState({
				tab1Source:dataSource[1].data.result,
				tab2Source:dataSource[0].data.result,
			})
		})
	}

  render() {
		const contentList = {
			tab1: <TableOne columns={tab1Columns} dataSource={this.state.tab1Source}  />,
			tab2: <TableTwo columns={tab2Columns} dataSource={this.state.tab2Source} />,
		//tab3: <Table columns={tab1Columns} dataSource={this.state.DataSource} />
			tab3: <MenuTemplate />
		};
		const titleList = ['统一菜单','我的菜单','菜单模板']
    return (
      <div className='card-wrapper'>
        <Card
          title={<SubHeader title='菜单中心' subTitle={titleList[this.state.tab]} cascade={this.state.tab1} />}
          tabList={tabList}
					activeTabKey={this.state.key}
					defaultActiveTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
            <div className='content-wrapper'>
							{contentList[this.state.key]}
							{/* <MenuTemplate /> */}
            </div>        
        </Card>
      </div>
    );
  }
}

export default B