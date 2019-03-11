import React from 'react'
import { Form, Select, Input } from "antd";
import { connect } from 'dva';
const Option = Select.Option;

const Search = Input.Search;
const FormItem = Form.Item;

class ReportForm extends React.Component {


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label='类型' style={{ marginBottom: 30 }}>
          {
            getFieldDecorator('type', {
              initialValue: 'all',
            })(
              <Select
                style={{ width: 240 }}
                onChange={(value) => { this.props.handleReport({
                  type:value
                }) }}
              >
                <Option value="all">全部</Option>
                <Option value="excipient">辅料</Option>
                <Option value="ingredients">食材</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem style={{ marginLeft: 40 }}>
          {
            getFieldDecorator('search', {
              initialValue: '',
            })(
              <Search
                placeholder="名称/备注"
                onSearch={(value) => {this.props.queryReportmissing({name:value})}}
                style={{ width: 300, height: 32 }}
              />
            )
          }
        </FormItem>
      </Form>
    )
  }
}

const WrappedReportForm = Form.create()(ReportForm)
export default connect(({ report }) => ({
  report,
}))(WrappedReportForm);
