import React from 'react'
import { Form , Select , DatePicker , Input, Button ,LocaleProvider   } from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const Option = Select.Option;

const Search = Input.Search;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;



class PurForm extends React.Component {

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <LocaleProvider locale={zh_CN}>
      <div>
      <Form layout="inline">
        <FormItem label='食材类别'>
          {
            getFieldDecorator('foodType',{
                initialValue:'all',
            })(
              <Select     
                style={{ width: 170 }}
              > 
                <Option value="all">全部</Option>
                <Option value="ingredients">食材</Option>
                <Option value="excipient">辅料</Option>
              </Select>            
            )
          }
        </FormItem>

        <FormItem label='定价时间'>
          {
            getFieldDecorator('time',{
                initialValue:'',
            })(
              <DatePicker style={{width:240}}/>
            )
          }
        </FormItem>

        <FormItem>
          {
            getFieldDecorator('search',{
                initialValue:'',
            })(
              <Search
                placeholder="请输入关键字进行搜索"
                onSearch={value => console.log(value)}
                style={{ width:300,}}
            />
            )
          }
        </FormItem>
        <FormItem>
            <Button type="primary" htmlType="submit" style={{width:74,marginRight:10,marginLeft:39}}>查询</Button>
            <Button htmlType="submit" style={{width:74}}>重置</Button>
        </FormItem>
      </Form>
      </div>
      </LocaleProvider>
    )
  }
}

const WrappedPurForm = Form.create()(PurForm)

export default WrappedPurForm;

      