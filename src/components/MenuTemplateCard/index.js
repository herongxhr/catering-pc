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

  render() {
    const {
      id,
      actionsText,
      handleCopy,
      handleDelete,
      handleShowDetails
    } = this.props;
    const { cardHover } = this.state;

    const cardFooter = !cardHover
      ? (<span>创建：{actionsText}</span>)
      : (
        <div key={id} className='cardFooter' style={{ width: 340, margin: 0 }}>
          <span className='cardFooterItem'
            style={{ margin: 0, fontSize: 16 }}
            onClick={handleCopy}>复制</span>
          <Divider type="vertical" />
          <span
            className='cardFooterItem'
            style={{ margin: 0, fontSize: 16 }}
            onClick={handleDelete}>删除</span>
          <Divider type="vertical" />
          <span
            className='cardFooterItem'
            style={{ margin: 0, fontSize: 16 }}>修改</span>
        </div>
      )

    return (
      <Card
        className='menuTemplateCard'
        id={id}
        actions={[cardFooter]}
        // hoverable={true}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
        onClick={() => handleShowDetails(id)}
      >
        {this.props.children}
      </Card>
    )
  }
}