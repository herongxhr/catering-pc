import React, { Component } from 'react';
import './TodoListCard.less';
import {  Table ,Badge} from 'antd';


const columns = [{
    title: '待办事项',
    dataIndex: 'name',
    key: 'name',
  }, {
    dataIndex: 'count',
    key: 'count',
    align: 'right',
    className: 'all',
    render: count => (
      <span>
        <Badge count={count} style={{ backgroundColor: '#FF9500', boxShadow: '0 0 0 1px #d9d9d9 inset',border:'none' }} />
      </span>
    ), 
  }];

class TodoListCard extends Component {
  render() {
    return (
      <div className="TodoListCard">
        <Table rowKey={record => record.uid} columns={columns} dataSource={this.props.todoList} pagination={false}/>
      </div>
    );
  }
}



export default TodoListCard;