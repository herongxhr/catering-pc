/*
 * @Author: suwei 
 * @Date: 2019-03-28 09:50:13 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-28 10:33:58
 */
import React from 'react'
import { Form, Input, Button, message } from 'antd';
import './basicConfig.less'
import { connect } from 'dva';


const FormItem = Form.Item;

class BasicCon extends React.Component {
  state = {
    show:false
  }

  handleSubmit = ()=>{
    const { props } = this
    let userInfo = this.props.form.getFieldsValue();
    const { numberStudent , numberTeacher } = userInfo
    if(!numberStudent || !numberTeacher) {
      message.error('请完善所有信息')
      return
    }
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
    const { numberStudent , numberTeacher } = baseView
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
            {getFieldDecorator('numberStudent', {
              
                })(
                <div style={{width:200}}>
                  <Input placeholder={numberStudent} style={{width:100,height:32,marginRight:10}} />
                  <span>人</span>
                </div>)}
          </FormItem>
          <FormItem label={<span>就餐人数<span style={{color:'#D9D9D9',marginLeft:10}}>(教职工)</span></span>}>
            {getFieldDecorator('numberTeacher', {
                
                })(
                <div style={{width:200}}>
                  <Input placeholder={numberTeacher} style={{width:100,height:32,marginRight:10}} />
                  <span>人</span>
                </div>)}
          </FormItem>
          <Button type="primary" onClick={this.handleSubmit}>
              更新基本配置
          </Button>
        </Form>
      </div>
    )
  }
}

const BasicConfig = Form.create()(BasicCon)

export default connect(({setting})=>({baseView:setting.baseView}))
(BasicConfig);
