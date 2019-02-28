import React, { Component } from 'react';
import './TodoListCard.less';
import {  Divider,Badge  } from 'antd';

class TodoListCard extends Component {
  render() {
    const { todoList }= this.props
    return (
      <div className="TodoListCard">
          <div className='todoTitle'>待办事项</div>
          <Divider />
          <div className='todoItem'><span>待执行菜单</span><span><Badge count={todoList.pendingExecuteOrder} style={{ backgroundColor: '#FF9500'}} /></span></div>
          <Divider />
          <div className='todoItem'><span>待下单</span><span><Badge count={todoList.pendingOrder} style={{ backgroundColor: '#FF9500'}} /></span></div>
          <Divider />
          <div className='todoItem'><span>换货审核</span><span><Badge count={todoList.exchangeReview} style={{ backgroundColor: '#FF9500'}} /></span></div>
          <Divider />
          <div className='todoItem'><span>待验收</span><span><Badge count={todoList.acceptance} style={{ backgroundColor: '#FF9500'}} /></span></div>
      </div>
    );
  }
}



export default TodoListCard;