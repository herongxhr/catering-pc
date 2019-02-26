import React from 'react'
import { Breadcrumb , Button } from 'antd';
import { withRouter } from 'react-router'

import './index.less'

class Sub extends React.Component {
  handleClick = () => {
    this.props.history.push('/order')
  }

  render() {
    return(
      <div className='SubHeader'>
       <Breadcrumb>
          <Breadcrumb.Item><a href="/order">{this.props.title}</a></Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.subTitle}</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={this.handleClick}>返回</Button>
      </div>
    )
  }
}

const SubHeader = withRouter(Sub)

export default SubHeader