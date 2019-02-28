import React, { Component } from 'react';
import BaseMenu from './components/BaseMenu';
import { Layout, Table, } from 'antd';

const { Content, Header } = Layout;

class App extends Component {
  render() {
    return (
      <Layout >
        <Header style={{
          width: '100%',
          height: 70,
          background: '#1F253E',
        }}>
          <BaseMenu />
        </Header>
        <Content >
          {this.props.children}
        </Content>
      </Layout >
    );
  }
}

export default App;
