import React from 'react'
import { Card, Spin, Popconfirm } from 'antd'
import { routerRedux } from 'dva/router';
import './index.less';

export default class MenuTemplateCard extends React.Component {
  state = {
    cardHover: false,
  }
  handleMouseOver = () => {
    this.setState({
      cardHover: true
    })
  }

  handleMouseOut = () => {
    this.setState({
      cardHover: false
    })
  }
  // 删除模板多一个二次确认的过程
  handleDelete = e => {

    const { handleTemplateActions, id } = this.props;
    handleTemplateActions({ delAction: 'delete' }, id);
  }

  render() {
    const {
      id,
      actionsText,
      spinning,
      handleTemplateActions,
      handleShowDetails
    } = this.props;
    const { cardHover } = this.state;

    const cardFooter = !cardHover
      ? [<span>创建：{actionsText}</span>]
      : [<span id='copy'> 复制</span>,
      <Popconfirm
        title='确定删除此模板吗？'
        onConfirm={this.handleDelete}>
        <span id='delete'>删除</span>
      </Popconfirm>,
      <span id='view'>查看</span>]
    return (
      <Spin spinning={spinning}>
        <Card
          className={"menuTemplateCard"}
          bodyStyle={{ height: 147, padding: 20 }}
          actions={cardFooter}
          // hoverable={true}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
          onClick={e => handleTemplateActions(e, id)}
        >
          {this.props.children}
        </Card>
      </Spin>
    )
  }
}