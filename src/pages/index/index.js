import React, { Component } from 'react';
import './index.less';
import TodayMenuCard from '../../Components/TodayMenuCard/TodayMenuCard'
import TodoListCard from '../../Components/TodoListCard/TodoListCard'
import DataStatistics from '../../Components/DataStatistics/DataStatistics'
import { Link, } from 'react-router-dom'
import axios from 'axios'
import { Card, Button, Tabs } from 'antd';

const TabPane = Tabs.TabPane;
const operations = <span className='extra'>查看全部</span>;
class A extends Component {
  componentDidMount() {
    axios.get('http://yapi.demo.qunar.com/mock/44634/jianguo/data').then((res) =>{
      console.log(res)
    })
  }
  render() {
    return ( 
      <div className="App">
        <div>{this.props.children}</div>
        <div className="App-content">
          <div className="App-content-header">
            <div className='App-pic'></div>
            <div className='App-time'>
              <h3>第32周</h3>
              <h6>2018年12月2日</h6>
            </div>
          </div>
          <div className="App-content-data">
            <div>
              <TodoListCard />
              <div className='tools'>
                <Card title="常用工具" bordered={false} style={{ width: 350 }}>
                  <Button className='toolsbtn cgml'>采购目录</Button>
                  <Button className='toolsbtn'>本月台账</Button>
                  <Button className='toolsbtn'>缺货上报</Button>
                </Card>
              </div>
            </div>
            <TodayMenuCard />
          </div>
          <div className="App-content-accepting"> 
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab="今日验收" key="1">Content of tab 1</TabPane>
              <TabPane tab="明日验收" key="2">Content of tab 2</TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default A;
