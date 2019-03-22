import React, { Component } from 'react';
import { Form, Input, Upload, Select, Button , Card } from 'antd';
import PhoneView from './PhoneView';
import CitySelect from './citySelect';
import PhoneNumber from './PhoneNumber';


import './BaseView.less';

const FormItem = Form.Item;
const { Option } = Select;


const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  console.log(values)
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};


class Imformation extends Component {
  // componentDidMount() {
  //   this.setBaseInfo();
  // }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  handleSubmit = ()=>{
    let userInfo = this.props.form.getFieldsValue();
    // this.props.form.validateFields((err,values)=>{
    //     if(!err){
    //         message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
    //     }
    // })
    console.log(userInfo)
  }

  getViewDom = ref => {
    this.view = ref;
  };
  
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className='baseView' ref={this.getViewDom} >
        <div className='left'>
          <div className='setting-title'>
            <div className='setting-main-title'>
              基本资料
            </div>
            <div className='setting-sub-title'>
            -  单位基本资料设置
            </div>
          </div>
          <Form layout='vertical' onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label='单位全称'>
              {getFieldDecorator('company', {
                rules: [
                  {
                    required: true,
                    message: '浙江省东阳市横店镇中心小学',
                  },
                ],
              })(<Input placeholder='浙江省东阳市横店镇中心小学' />)}
            </FormItem>
            <FormItem label='单位简称'>
              {getFieldDecorator('corporation', {
                rules: [
                  {
                    required: true,
                    message: '横店中心小学',
                  },
                ],
              })(<Input placeholder='横店中心小学' />)}
            </FormItem>
            <FormItem label='单位地址'>
              {getFieldDecorator('city',{
                initialValue:''
              })
                (<CitySelect />)
              }
            </FormItem>
            <FormItem label={<span>平台管理员/手机号<span style={{color:'#D9D9D9',marginLeft:10}}>(用于接收平台相关信息)</span></span>}>
              {getFieldDecorator('Telephone', {
                rules: [
                  {
                    required: true,
                    message: 'a',
                  }
                ],
              })(<PhoneNumber />)}
            </FormItem>
            <FormItem
              label={<span>常用邮箱<span style={{color:'#D9D9D9',marginLeft:10}}>(用于接收平台相关信息与各类报表)</span></span>}
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '邮箱格式不正确',
                }, {
                  required: true, message: '请输入你的邮箱',
                }],
              })(
                <Input placeholder='968874937@163.com' />
              )}
            </FormItem>
            <FormItem label={<span>固定电话<span style={{color:'#D9D9D9',marginLeft:10}}>(用于接收日常咨询)</span></span>}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的联系电话',
                  },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem>
            <Button type="primary" onClick={this.handleSubmit}>
              更新信息
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const BaseView = Form.create()(Imformation)

export default BaseView