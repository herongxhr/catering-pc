import React, { Component } from 'react';
import './index.less';
import TodayMenuCard from '../../components/TodayMenuCard/TodayMenuCard'
import TodoListCard from '../../components/TodoListCard/TodoListCard'
import Accepting from '../../components/Accepting/Accepting'
import { Card, Button, Tabs,Radio,Table } from 'antd';
import moment from 'moment'
import Charts from 'ant-design-pro/lib/Charts';
import { Pie, yuan, } from 'ant-design-pro/lib/Charts';
import { connect } from 'dva';
import { withRouter } from "react-router";

const TabPane = Tabs.TabPane;
const operations = <span className='extra'>查看全部</span>;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const columns = [{
  dataIndex: 'device',
  key: 'device',
}, {
  dataIndex: 'time',
  key: 'time',
  //render:(time)=><span>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</span>
}];

const data = [{
  key: '1',
  device: '晨检仪',
  time: '2019-01-28  07：29：35',
}, {
  key: '2',
  device: '验货机',
  time: '2019-01-28  07：29：35',
}, {
  key: '3',
  device: '易检设备',
  time:'2019-01-28  07：29：35',
}];
const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
];

class A extends Component {
  state={
    tabkey:'today'
  }
  queryTodoList = () => {
		const { dispatch } = this.props;
		//请求待办事项
		dispatch({
			type: 'home/queryTodoLists',
		})
  }
  querytodayMenu = () => {
		const { dispatch } = this.props;
		//请求待办事项
		dispatch({
			type: 'home/querytodayMenu',
		})
  }
  querydeviceInfo = () => {
		const { dispatch } = this.props;
		//请求待办事项
		dispatch({
			type: 'home/querydeviceInfo',
		})
  }

  componentDidMount() {
    this.queryTodoList()
    this.querytodayMenu()
    this.querydeviceInfo()
  }

  render() {
    const title= <div className='device'>设备最后开机时间</div>
    const footer = <div style={{textAlign:'center',fontSize:14,color:'#54C4CE'}}>查看全部</div>
    const { home }= this.props
    const todoList = home.todoList || [];
    const todayMenu = home.todayMenu || {};
    const deviceInfo = home.deviceInfo || [];
    return ( 
      <div className="App">
        <div>{this.props.children}</div>
        <div className="App-content">
          <div className="App-content-header">
            <div className='App-pic'></div>
            <div className='App-time'>
              <h3>第32周</h3>
              <h6>2018-12-02 周一</h6>
            </div>
          </div>
          <div className="App-content-data">
            <div>
              <TodoListCard todoList = {todoList}/>
              <div className='tools'>
                <Card title="常用工具" bordered={false} style={{ width: 350 }}>
                  <Button className='toolsbtn cgml' onClick={() =>{
                    this.props.history.push('/order')
                  }}>采购目录</Button>
                  <Button className='toolsbtn' onClick={() =>{
                    this.props.history.push('/parameter')
                  }}>本月台账</Button>
                  <Button className='toolsbtn' onClick={() =>{
                    this.props.history.push('/OutStock')
                  }}>缺货上报</Button>
                </Card>
              </div>
            </div>
            <TodayMenuCard todayMenu={todayMenu}/>
          </div>
          <div className="App-content-accepting"> 
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab="今日验收" key="today"><Accepting /></TabPane>
              <TabPane tab="明日验收" key="tomorrow"><Accepting /></TabPane>
            </Tabs>
          </div>
          <div className='App-content-paying-wrapper'>
            <div className='App-content-paying'>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                  <p style={{width:226,height:65,fontSize:16,lineHeight:4,rgba:(0,0,0,0.85)}}>应付款统计分析</p>
                  <div> 
                    <RadioGroup defaultValue="month">
                      <RadioButton value="month">本月</RadioButton>
                      <RadioButton value="quarter">本季度</RadioButton>
                      <RadioButton value="year">本年</RadioButton>
                    </RadioGroup>
                  </div>
              </div>
              <div>
                  <Pie
                      hasLegend
                      data={salesPieData}
                      valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                      height={206}
                    />
              </div>
            </div>
            <div className='App-content-opening'>
            <Table showHeader={false} title={()=>title} columns={columns} dataSource={deviceInfo} footer={() => footer} pagination={false} />  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ShowARouter = withRouter(A);
export default connect(( {home} ) => ({
  home,
}))(ShowARouter);;
