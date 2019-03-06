import React, { Component } from 'react';
import { Form, Input, Upload, Select, Button , Card } from 'antd';
import PhoneView from './PhoneView';
import CitySelect from './citySelect'

import './BaseView.less';

const FormItem = Form.Item;
const { Option } = Select;


const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
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
            <FormItem label='个人简介'>
              {getFieldDecorator('city')
                (<CitySelect />)
              }
            </FormItem>
            <FormItem label='国家/地区'>
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: 'a',
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label='所在省市'>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: 'a',
                  }
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label='街道地址'>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: 'a',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label='联系电话'>
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