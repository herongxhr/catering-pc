import React from 'react'
import { Form, Select, Input, Button, Badge, Tag, Icon, Radio, Card } from 'antd';
import classNames from 'classnames';

import './index.less'

class Arrow extends React.Component {
  constructor(props) {
    super(props)
    const value = props.value || {}
    // this.state = {
    //   tags: value,
    //   inputVisible: false,
    //   inputValue: '',      
    // }
    this.state = {
      desc: value,
    }
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    console.log(onChange)
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  handleSorter = () => {
    const state = this.state;
    let desc = state.desc;

    this.setState({
      desc: !desc
    })
    this.triggerChange({
      desc
    })
  }

  render() {
    const { desc } = this.state;
    return(
      <div className='top-down' onClick={this.handleSorter}>
        <Icon id='up' type="caret-up"
          className={classNames({ 'blue-color': desc })} />
        <Icon id='down' type="caret-down"
          className={classNames({ 'blue-color': !desc })} />
      </div>
    )
  }
}

export default Arrow