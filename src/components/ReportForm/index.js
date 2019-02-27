import React from 'react'
import { Form , Select , Input  } from "antd";
const Option = Select.Option;

const Search = Input.Search;
const FormItem = Form.Item;

class ReportForm extends React.Component {

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline">
        <FormItem label='类型' style={{ marginBottom:30 }}>
          {
            getFieldDecorator('type',{
                initialValue:'1',
            })(
              <Select     
                style={{ width: 240 }}
              > 
                <Option value="1">全部</Option>
                <Option value="2">辅料</Option>
                <Option value="3">食材</Option>
              </Select>            
            )
          }
        </FormItem>

        <FormItem  style={{marginLeft:40 }}>
          {
            getFieldDecorator('search',{
                initialValue:'',
            })(
              <Search
                placeholder="名称/备注"
                onSearch={value => console.log(value)}
                style={{ width:300,height:32 }}
            />
            )
          }
        </FormItem>
      </Form>
    )
  }
}

const WrappedReportForm = Form.create()(ReportForm)

export default WrappedReportForm;

      