/*
 * @Author: suwei 
 * @Date: 2019-03-23 15:11:29 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-28 10:18:48
 */
import React, { Component } from 'react';
import { Form, Input, Select, Button , message} from 'antd';
import PhoneView from './PhoneView';
import CitySelect from './citySelect';
import PhoneNumber from './PhoneNumber';
import { connect } from 'dva';



import './BaseView.less';

const FormItem = Form.Item;


const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('请输入固定电话!');
  }
  if (!values[1]) {
    callback('请输入固定电话!');
  }
  callback();
};

const validatorMobile = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('请输入平台管理员!');
  }
  if (!values[1]) {
    callback('请输入手机号!');
  }
  callback();
};


class Imformation extends Component {

  handleSubmit = ()=>{
    let userInfo = this.props.form.getFieldsValue();
    const { cateringName , shortName , address , email , mobile ,telephone } = userInfo
    if(!cateringName || !shortName || !address || !email || !mobile || !telephone) {
      message.error('请完善所有信息')
      return 
    }
    const { props } = this
    props.dispatch({
      type:'setting/querySendBaseView',
      payload:userInfo
    })
  }

  queryBaseView = (params = {}) => {
		this.props.dispatch({
			type: 'setting/queryBaseView',
			payload: {

			},
		})
  }
  
  componentDidMount() {
    this.queryBaseView()
  }

  
  render() {
    const {
      form: { getFieldDecorator },
      baseView
    } = this.props;
    const { cateringName , shortName  } = baseView
    return (
      <div className='baseView'  >
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
              {getFieldDecorator('cateringName', {
                rules: [
                  {
                    required: true,
                    message:'请输入单位全称'
                  },
                ],
              })(<Input placeholder={cateringName} />)}
            </FormItem>
            <FormItem label='单位简称'>
              {getFieldDecorator('shortName', {
                rules: [
                  {
                    required: true,
                    message:'请输入单位简称'
                  },
                ],
              })(<Input placeholder={shortName} />)}
            </FormItem>
            <FormItem label='单位地址'>
              {getFieldDecorator('address',{
                initialValue:''
              })
                (<CitySelect />)
              }
            </FormItem>
            <FormItem label={<span>平台管理员/手机号<span style={{color:'#D9D9D9',marginLeft:10}}>(用于接收平台相关信息)</span></span>}>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的联系电话',
                  },
                  { validator: validatorMobile },
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
              {getFieldDecorator('telephone', {
                rules: [
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

export default connect(({setting})=>({baseView:setting.baseView}))
(BaseView);