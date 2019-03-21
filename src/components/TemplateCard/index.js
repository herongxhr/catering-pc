import React, { PureComponent } from 'react';
import { Card, Row, Col, Tag } from 'antd';
import isNewPng from './new.png';
import './index.less';

export default class TemplateCard extends PureComponent {
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

  render() {
    const {
      templateFrom = '',
      itemData,
      isSelect,
      handleTemplateActions,
    } = this.props;

    const {
      // 有的属性可能会没有，设置默认值
      id = '',
      createDate = '',
      echoMealTimeses = '',
      echoZjs = '',
      tags = '',
      used = 0,
      templateName = '',
      lastTime = '未使用'
    } = itemData;

    const cardFooter = !this.state.cardHover
      ? [<span>创建于：{createDate.substring(0, 10)}</span>]
      : [<span id='preview'> 查看详情</span>,
      <span id='choice'>选择</span>];

    const clsString = isSelect ? 'templateCard selected' : 'templateCard';

    return (
      <Card
        className={clsString}
        bodyStyle={{ height: 147, padding: 20 }}
        actions={cardFooter}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
        onClick={e => handleTemplateActions(e, id, templateFrom)}
      >
        <div className='templateCardContent'>
          {templateFrom && <span className={'newPng'}><img src={isNewPng} /></span>}
          <Row style={{ marginBottom: 10 }} >
            <Col span={16}>{templateName}</Col>
            {!templateFrom && <Col style={{ textAlign: 'right' }} span={8}>{used}次</Col>}
          </Row>
          <Row style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 16 }} span={24}>
            <Col>
              <Row>
                <Col span={18}>{echoMealTimeses}</Col>
                {templateFrom && <Col span={6} style={{ textAlign: 'right' }}>使用次数</Col>}
                {!templateFrom && <Col span={6} style={{ textAlign: 'right' }}>上次使用</Col>}
              </Row>
              <Row>
                <Col span={18}>{echoZjs}</Col>
                {templateFrom && <Col span={6} style={{ textAlign: 'right' }}>
                  {used}次
                </Col>}
                {!templateFrom && <Col span={6} style={{ textAlign: 'right' }}>
                  {lastTime.substring(0, 10)}
                </Col>}
              </Row>
            </Col>
          </Row>
          <Row style={{ marginBottom: 16 }} span={24}>
            <Col>{tags.split(',').map((tag, index) => {
              const colors = ['cyan', 'orange', 'green', 'magenta', 'lime', 'pruple', 'red', 'blue'];
              return <Tag key={index} color={colors[index]}>{tag}</Tag>
            })}</Col>
          </Row>
        </div>
      </Card>
    )
  }
}