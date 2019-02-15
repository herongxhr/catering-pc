import React, { Component,Fragment } from 'react';
import { List } from 'antd';

class SecurityView extends Component {
  getData = () => [
    {
      title: '用户名',
      description: (
        <p>968874937@163.com</p>
      ),
      actions: [
        <a>
          修改
        </a>,
      ],
    },
    {
      title: '登录密码',
      description: '已设置',
      actions: [
        <a>
          修改
        </a>,
      ],
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default SecurityView;