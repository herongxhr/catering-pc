import React from 'react';
import { Card, Spin, Popconfirm, Row, Col, Tag } from 'antd';
import Moment from 'moment';
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
      itemData,
      spinning,
      handleTemplateActions,
    } = this.props;

    const {
      // 有的属性可能会没有，设置默认值
      id = '',
      createDate = '',
      echoMealTimesesVO = '',
      echoZjsVO = '',
      tags = '',
      used = 0,
      templateName = '',
      lastTime = '未使用'
    } = itemData;

    const cardFooter = !this.state.cardHover
      ? [<span>创建于：{Moment(createDate).format('YYYY-MM-DD HH:mm:ss')}</span>]
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
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
          onClick={e => handleTemplateActions(e, id)}
        >
          <div className='templateCardContent'>
            <Row style={{ marginBottom: 16 }} span={24} >
              <Col span={16}>{templateName}</Col>
              <Col style={{ textAlign: 'right' }} span={8}>{used || 0}次</Col>
            </Row>
            {/* 餐次/排餐天数 */}
            <Row style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 16 }} span={24}>
              <Col>
                <Row>
                  <Col span={18}>{echoMealTimesesVO}</Col>
                  <Col span={6} style={{ textAlign: 'right' }}>上次使用</Col>
                </Row>
                <Row>
                  <Col span={18}>{echoZjsVO}</Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                    {Moment(lastTime).format('YYYY-MM-DD')}
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* 标签 */}
            <Row style={{ marginBottom: 16 }} span={24}>
              <Col>{tags.split(',').map((tag, index) => {
                const colors = ['cyan', 'orange', 'green', 'magenta', 'lime', 'pruple', 'red', 'blue'];
                return <Tag key={index} color={colors[index]}>{tag}</Tag>
              })}</Col>
            </Row>
          </div>
        </Card>

      </Spin>
    )
  }
}