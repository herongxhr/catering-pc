import React from 'react'
import './index.less'

class SubHeader extends React.Component {
  render() {
    return(
      <div className='SubHeader'>
        <span className='title'>{this.props.title}</span>
        <span className='middle'>/</span>
        <span className='subTitle'>{this.props.subTitle}</span>
      </div>
    )
  }
}

export default SubHeader