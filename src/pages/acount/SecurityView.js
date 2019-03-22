/*
 * @Author: suwei 
 * @Date: 2019-03-22 09:48:17 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-22 10:15:16
 */
import React, { Component } from 'react';
import { List , Modal , Form , Input , message } from 'antd';

import './SecurityView.less'

const FormItem = Form.Item;

class Security extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    message.success('操作成功');
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  getData = () => [
    {
      description: (
        <div>
          <span style={{marginRight:40}}>用户名</span>
          <span>968874937@163.com</span>
        </div>
      ),
      actions: [
        // <a>
        //   修改
        // </a>,
      ],
    },
    {
      description: (
        <div>
          <span style={{marginRight:40}}>登录密码</span>
          <span style={{color:'#7ED31F'}}>已设置</span>
        </div>
      ),
      actions: [
        <a style={{marginRight:'60px'}} onClick={this.showModal}>
          修改
        </a>,
      ],
    },
  ];

  render() {
    const { getFieldDecorator } = this.props.form;
    const modalObject = {
      width:'340px',
      height:'340px'
    }
    const inputObject = {
      width:'300px',
      height:'32px'
    }
    const buttonObject = {
      width:'54px',
      height:'32px'
    }
    return (
      <div className='security-view'>
        <div className='setting-title' style={{marginBottom:30}}>
          <div className='setting-main-title'>
            账户安全
          </div>
          <div className='setting-sub-title'>
          － 请尽早完善账户安全信息，更好地保护您的数据安全！
          </div>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{height:'380px'}}
          bodyStyle={modalObject}
          // centered={true}
          closable={false}
          width='340px'
          // getContainer={() => document.getElementsByClassName('security-view')}
        > 
          <Form layout='vertical'>
            <FormItem>重置密码</FormItem>
            <FormItem label={<span>原密码<span style={{color:'#D9D9D9',marginLeft:10}}>(请先验证原密码)</span></span>}>
              {getFieldDecorator('originalPassword', {
                rules: [
                  {
                    // required: true,
                    message: '请输入',
                  },
                ],
              })(
                <Input placeholder='请输入' style={{...inputObject}} />
              )}
            </FormItem>
            <FormItem label={<span>新密码<span style={{color:'#D9D9D9',marginLeft:10}}>(最小长度为6个字符)</span></span>}>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    // required: true,
                    message: '请输入',
                  },
                ],
              })(
                <Input placeholder='请输入'  />
              )}
            </FormItem>
            <FormItem label={<span>新密码<span style={{color:'#D9D9D9',marginLeft:10}}>(最小长度为6个字符)</span></span>}>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    // required: true,
                    message: '请再次输入',
                  },
                ],
              })(
                <Input placeholder='请输入'  />
                )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
const SecurityView =  Form.create()(Security)
export default SecurityView;