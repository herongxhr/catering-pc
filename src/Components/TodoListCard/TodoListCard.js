import React, { Component } from 'react';
import './TodoListCard.less';
import {  Table } from 'antd';

const columns = [{
    title: '待办事项',
    dataIndex: 'todolist',
    key: 'todolist',
  }, {
    title: '全部',
    dataIndex: 'all',
    key: 'all',
    align: 'right',
    className: 'all'
  }];

  const data = [{
    key: '1',
    todolist: '下周订单',
    all: '待处理',
  }, {
    key: '2',
    todolist: '未接订单',
    all: '0个',
  }, {
    key: '3',
    todolist: '未验收订单',
    all: '0件',
  },{
    key: '4',
    todolist: '换菜审批',
    all: '0个',
  },{
    key: '5',
    todolist: '新加食材审批',
    all: '处理中',
  },{
    key: '6',
    todolist: '新加食材审批',
    all: '处理中',
  }];
class TodoListCard extends Component {
  render() {
    return (
      <div className="TodoListCard">
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    );
  }
}

export default TodoListCard;