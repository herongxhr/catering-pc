import React from 'react'
import { Form, Select, DatePicker, Input } from "antd";
import './index.less'

const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class OrderFilter extends React.Component {

  render() {
    const {
      className,
      form: { getFieldDecorator },
      handleFilter,
    } = this.props;

    return (
      <div className={className}>
        <Form layout="inline" >
          <FormItem label='日期选择' >
            {
              getFieldDecorator('date', {
                initialValue: "all",
              })(
                <Select
                  style={{ width: 240 }}
                  onChange={(value) => handleFilter({ dateRange: value })}
                >
                  <Option value="all">全部</Option>
                  <Option value="thisYear">本年</Option>
                  <Option value="lastYear">去年</Option>
                  <Option value="thisMonth">本月</Option>
                  <Option value="nearly3month">最近三个月</Option>
                  <Option value="doSelect"> <RangePicker /> </Option>
                </Select>
              )
            }
          </FormItem>

          <FormItem label='订单来源' >
            {
              getFieldDecorator('source', {
                initialValue: "all",
              })(
                <Select
                  style={{ width: 200 }}
                  onChange={(value) => handleFilter({ channel: value })}
                >
                  <Option value="all">全部</Option>
                  <Option value="M">菜单生成</Option>
                  <Option value="S">辅料超市</Option>
                  <Option value="N">自建订单</Option>
                </Select>
              )
            }
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedOrderForm = Form.create()(OrderFilter)

export default WrappedOrderForm;

