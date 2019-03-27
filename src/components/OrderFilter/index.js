import React from 'react'
import { Form, Select, DatePicker, Input } from "antd";
import './index.less'

const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Search = Input.Search;


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
                initialValue: "",
              })( 
                <RangePicker 
                  style={{ width: 250 }}
                  onChange={(_, dateStrings) => {
                    let [startDate, endDate] = dateStrings;
                    handleFilter({ startDate, endDate, })
                  }} 
                /> 
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
          <FormItem>
            {
              getFieldDecorator('source', {
                initialValue: "",
              })(
                <Search
                  placeholder="订单号"
                  onSearch={value => handleFilter({ keywords: value })}
                  style={{ width: 300 }}
              />
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

