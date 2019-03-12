import React from 'react'
import { Card, Divider } from 'antd'
import { routerRedux } from 'dva/router';
import './index.less';

export default class MenuTemplateCard extends React.Component {
  state = {
    cardHover: false
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

  handleShowDetails = id => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/menubar/template/newtemplate',
      state: { id }
    }))
  }

  handleCopy = () => {
    const { dispatch, id } = this.props
    dispatch({
      type: 'unifiedMenus/queryMyCopy',
      payload: { templateId: id }
    })
    window.location.reload()
  }

  render() {
    const { id, actionsText } = this.props;
    const { cardHover } = this.state;

    const cardFooter = !cardHover
      ? (<span>创建:{actionsText}</span>)
      : (
        <div className='cardFooter' style={{ width: 340, margin: 0 }}>
          <span className='cardFooterItem'
            style={{ margin: 0, fontSize: 16 }}
            onClick={this.handleCopy}>复制</span>
          <Divider type="vertical" />
          <span
            className='cardFooterItem'
            style={{ margin: 0, fontSize: 16 }}>删除</span>
          <Divider type="vertical" />
          <span
            className='cardFooterItem'
            style={{ margin: 0, fontSize: 16 }}>修改</span>
        </div>
      )

    return (
      <Card
        className='menuTemplateCard'
        actions={[cardFooter]}
        // hoverable={true}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
        onClick={this.handleShowDetails}
      >
        {this.props.children}
      </Card>
    )
  }
}