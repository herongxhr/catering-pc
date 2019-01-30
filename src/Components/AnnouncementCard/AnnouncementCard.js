import React, { Component } from 'react';
import './AnnouncementCard.less';
import {  Table } from 'antd';

const columns = [{
    title: '通知公告',
    dataIndex: 'announcement',
    key: 'announcement',
  }, {
    title: '全部',
    dataIndex: 'all',
    key: 'all',
    align: 'right',
    className: 'col'
  }];

  const data = [{
    key: '1',
    announcement: '防蚊灭蚊宣传知识要点',
    all: '2018-12-01',
  }, {
    key: '2',
    announcement: '防蚊灭蚊宣传知识要点',
    all: '2018-12-01',
  }, {
    key: '3',
    announcement: '防蚊灭蚊宣传知识要点',
    all: '2018-12-01',
  },{
    key: '4',
    announcement: '防蚊灭蚊宣传知识要点',
    all: '2018-12-01',
  },{
    key: '5',
    announcement: '防蚊灭蚊宣传知识要点',
    all: '2018-12-01',
  },{
    key: '6',
    announcement: '防蚊灭蚊宣传知识要点',
    all: '2018-12-01',
  }];
class AnnouncementCard extends Component {
  render() {
    return (
      <div className="AnnouncementCard">
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    );
  }
}

export default AnnouncementCard;