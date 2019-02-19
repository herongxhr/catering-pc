import React, { Component } from 'react';
import Jheader from './components/Jheader'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Content, Footer } = Layout;

class App extends Component {
  render() {
    const style = {
      width: 1200,
      margin: '0 auto',
    }
    return (
      <Layout className="layout">
        <Jheader />
        <Content style={style}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default App;
