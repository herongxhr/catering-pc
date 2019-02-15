import React, { Component } from 'react';
import './index.less';
import TodayMenuCard from '../../components/TodayMenuCard/TodayMenuCard'
import TodoListCard from '../../components/TodoListCard/TodoListCard'
import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard'
import PurchaseStatistics from '../../components/PurchaseStatistics/PurchaseStatistics'
import DataStatistics from '../../components/DataStatistics/DataStatistics'
import { Link } from 'react-router-dom'

class A extends Component {
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
