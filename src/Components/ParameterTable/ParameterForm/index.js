import React from 'react'
import { Form , Select , DatePicker , Input , Button  } from "antd";

import './index.less'

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const ButtonGroup = Button.Group;

class InForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{
        xs:22,
      }
    }
    return(
      <Form layout="inline">
        <FormItem label='日期选择' style={{ margin:20 }}>
          {
            getFieldDecorator('date',{
                initialValue:'1',
            })(
              <Select     
                style={{ width: 250 }}              
              > 
                <Option value="1">全部</Option>
                <Option value="2">本年</Option>
                <Option value="3">去年</Option>
                <Option value="4">本月</Option>
                <Option value="5">近3个月</Option>
                <Option value="6"> <RangePicker /> </Option>
              </Select>            
            )
          }
        </FormItem>
        <FormItem label='供应商' style={{ marginTop:20 }}>
          {
            getFieldDecorator('search',{
                initialValue:'1',
            })(
              <Select     
                style={{ width: 250 }}              
              > 
                <Option value="1">全部</Option>
                <Option value="2">本年</Option>
                <Option value="3">去年</Option>
                <Option value="4">本月</Option>
                <Option value="5">近3个月</Option>
                <Option value="6"> <RangePicker /> </Option>
              </Select>   
            )
          }
        </FormItem>
        <FormItem style={{marginLeft:240,marginTop:20}}>
          <ButtonGroup>
            <Button>全部</Button>
            <Button>本月</Button>
            <Button>本年</Button>
        </ButtonGroup>        
        </FormItem>
      </Form>
    )
  }
}

const ParameterForm = Form.create()(InForm)

export default ParameterForm;
