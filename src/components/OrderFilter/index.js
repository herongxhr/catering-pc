import React from 'react'
import { Select, DatePicker, Input } from "antd";
import './index.less'
const Option = Select.Option;
const { RangePicker } = DatePicker;
const Search = Input.Search;


export default class OrderFilter extends React.Component {

  render() {
    const { handleFilter } = this.props;

    return (
      <div>
        <RangePicker
          style={{ width: 240 }}
          onChange={(_, dateStrings) => {
            let [startDate, endDate] = dateStrings;
            handleFilter({ startDate, endDate, })
          }} />
        <Select
          style={{ width: 200 }}
          defaultValue=''
          onChange={value => handleFilter({ channel: value })}
        >
          <Option value="">全部</Option>
          <Option value="M">菜单生成</Option>
          <Option value="S">辅料超市</Option>
          <Option value="N">自建订单</Option>
        </Select>
        <Search
          placeholder="订单号"
          onSearch={value => handleFilter({ keywords: value })}
          style={{ width: 300 }}
        />
      </div>
    )
  }
}


