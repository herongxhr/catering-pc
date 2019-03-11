import React from 'react'
import { Form, Input, Switch, Select, Button } from 'antd';
import './basicConfig.less'
var classNames = require('classnames');


const FormItem = Form.Item;
const { Option } = Select;

class BasicCon extends React.Component {
  state = {
    show:false
  }

  handleSubmit = ()=>{
    let userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo))
  }

  switchChange = ()=> {
    this.setState({
      show:!this.state.show
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    var btn = classNames({foo:this.state.show},{bar:!this.state.show})
    return(
      <div className='basicConfig'>
        <div className='setting-title'>
          <div className='setting-main-title'>
            基本配置
          </div>
          <div className='setting-sub-title'>
          -  单位基本配置设置
          </div>
        </div>
        <Form layout='vertical'>
          <FormItem label={<span>就餐人数<span style={{color:'#D9D9D9',marginLeft:10}}>(学生)</span></span>}>
            {getFieldDecorator('student', {
                  rules: [
                    {
                      required: true,
                      message: 2000,
                    },
                  ],
                })(
                <div style={{width:200}}>
                  <Input placeholder='2000' style={{width:100,height:32,marginRight:10}} />
                  <span>人</span>
                </div>)}
          </FormItem>
          <FormItem label={<span>就餐人数<span style={{color:'#D9D9D9',marginLeft:10}}>(教职工)</span></span>}>
            {getFieldDecorator('worker', {
                  rules: [
                    {
                      required: true,
                      message: 300,
                    },
                  ],
                })(
                <div style={{width:200}}>
                  <Input placeholder='300' style={{width:100,height:32,marginRight:10}} />
                  <span>人</span>
                </div>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('checked', {
              initialValue:true
                })(<div>
                    <span style={{marginRight:8}}>自动下单</span><Switch onChange={this.switchChange} />
                  </div>)}
          </FormItem>
          <div className={btn}>
                <FormItem label={<span>菜单<span style={{color:'#D9D9D9',marginLeft:10}}>(选择时间后,系统将自动为你执行菜单)</span></span>}>
              {
                  getFieldDecorator('state', {
                      initialValue: '1'
                  })(
                      <Select>
                          <Option value="1">菜单下发后1小时</Option>
                          <Option value="2">菜单下发后2小时</Option>
                          <Option value="3">菜单下发后3小时</Option>
                          <Option value="4">菜单下发后4小时</Option>
                          <Option value="5">菜单下发后5小时</Option>
                      </Select>
                  )
              }
            </FormItem>
            <FormItem label={<span>采购订单<span style={{color:'#D9D9D9',marginLeft:10}}>(选择时间后,系统将自动为你下达采购订单)</span></span>}>
              {
                    getFieldDecorator('value', {
                        initialValue: '请选择'
                    })(
                        <Select>
                            <Option value="1">菜单下发后1小时</Option>
                            <Option value="2">菜单下发后2小时</Option>
                            <Option value="3">菜单下发后3小时</Option>
                            <Option value="4">菜单下发后4小时</Option>
                            <Option value="5">菜单下发后5小时</Option>
                        </Select>
                    )
                }
            </FormItem>
          </div>
          <Button type="primary" onClick={this.handleSubmit}>
              更新基本配置
          </Button>
        </Form>
      </div>
    )
  }
}

const BasicConfig = Form.create()(BasicCon)


export default BasicConfig