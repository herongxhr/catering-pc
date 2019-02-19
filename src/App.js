import React, { Component } from 'react';
import Jheader from './components/Jheader'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Jheader />
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default App;
