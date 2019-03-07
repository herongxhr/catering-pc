import React from 'react'
import { Select,Input } from 'antd'

const Option = Select.Option;

class DosingUi extends React.Component {
  handleChange = (value) => {
    console.log(`selected${value}`)
  }

  render() {
    return(
      <div>
        <Select defaultValue='1' onChange={this.handleChange}>
          <Option value='1'>葱</Option>
          <Option value='2'>姜</Option>
          <Option value='3'>蒜</Option>
        </Select>
        <span>/</span>
        <Input></Input>
      </div>
    )
  }
}

export default DosingUi