import React, { Component } from 'react';
import './TodayMenuCard.less';
import {  Table } from 'antd';

const columns = [{
    title: '早餐',
    dataIndex: 'breakfast',
    key: 'breakfast',
  }, {
    title: '午餐',
    dataIndex: 'lunch',
    key: 'lunch',
  }, {
    title: '晚餐',
    dataIndex: 'dinner',
    key: 'dinner',
  }];

  const data = [{
    key: '1',
    breakfast: '鹌鹑蛋',
    lunch: '大白菜油豆腐',
    dinner: '冬瓜排骨汤',
  }, {
    key: '2',
    breakfast: '鹌鹑蛋',
    lunch: '大白菜油豆腐',
    dinner: '冬瓜排骨汤',
  }, {
    key: '3',
    breakfast: '鹌鹑蛋',
    lunch: '大白菜油豆腐',
    dinner: '冬瓜排骨汤',
  },{
    key: '4',
    breakfast: '鹌鹑蛋',
    lunch: '大白菜油豆腐',
    dinner: '冬瓜排骨汤',
  },{
    key: '5',
    breakfast: '银耳粥',
    lunch: '',
    dinner: '冬瓜排骨汤',
  },{
    key: '6',
    breakfast: '',
    lunch: '桔子',
    dinner: '',
  }];
class TodayMenuCard extends Component {
  render() {
    return (
      <div className="MenuCard">
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    );
  }
}

export default TodayMenuCard;