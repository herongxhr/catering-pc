import React, { Component } from 'react';
import './index.less';
import TodayMenuCard from '../../Components/TodayMenuCard/TodayMenuCard'
import TodoListCard from '../../Components/TodoListCard/TodoListCard'
import AnnouncementCard from '../../Components/AnnouncementCard/AnnouncementCard'
import PurchaseStatistics from '../../Components/PurchaseStatistics/PurchaseStatistics'
import DataStatistics from '../../Components/DataStatistics/DataStatistics'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
          <div className="App-content-info">
            <TodayMenuCard></TodayMenuCard>
            <TodoListCard></TodoListCard>
            <AnnouncementCard></AnnouncementCard>
          </div>
          <div className="App-content-data">
            <PurchaseStatistics></PurchaseStatistics>
            <DataStatistics></DataStatistics>
          </div>
        </div>
      </div>
    );
  }
}

export default A;
