import React from 'react'
import {
  Form, Input, Icon, Button, Select, InputNumber
} from 'antd';


import './Dosing.less'

const Option = Select.Option;
let id = 0;

class Dose extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {  //给一个空数组计算已经加了几个值
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    console.log(keys)
    const nextKeys = keys.concat(id++);
    console.log(nextKeys)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => { 
    e.preventDefault();
    let userInfo = this.props.form.getFieldsValue();
    console.log(userInfo)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });  // 给keys一个初始值
    const keys = getFieldValue('keys'); //获取输入控件的值
    const formItems = keys.map((k, index) => (
      <Form.Item
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input passenger's name or delete this field.",
            initialValue:'1'
          }],
        })(
          <Select  style={{width:200}}>
            <Option value="1">葱</Option>
            <Option value="2">猪</Option>
            <Option value="3">鼠</Option>
            <Option value="4">牛</Option>
            <Option value="5">龙</Option>
          </Select>
        )}                      
        {
          getFieldDecorator(`number[${k}]`, {
              initialValue: '3'
          })(
            <div className='inputNumber'>
              <span className='interval'>/</span>
              <InputNumber min={1} max={10} defaultValue={3} />
              <span className='interval'>斤</span>
            </div>
          )
        }
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <div className='Dosing'>
        <div className='setting-title'>
          <div className='setting-main-title'>
            常用配料
          </div>
          <div className='setting-sub-title'>
            - 可设置日常使用较为频繁食材,将在您生成食材采购订单时自动加入
          </div>
          <div style={{marginTop:'40px',color:'#000000',fontSize:'14px'}}>
            食材/数量
          </div>
        </div>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item >
            <Button type="dashed" onClick={this.add} style={{ width: '330px',height: '32px' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Dosing =  Form.create()(Dose)

export default Dosing