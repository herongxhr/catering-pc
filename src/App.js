import React, { Component } from 'react';
import Jheader from './components/Jheader';
import { Layout } from 'antd';

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout >
        <Jheader />
        <Content >
          {this.props.children}
        </Content>
      </Layout >
    );
  }
}

export default App;
