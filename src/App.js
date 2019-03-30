import React, { Component } from 'react';
import Header from './pages/Header';
import { Layout } from 'antd';

const { Content } = Layout;

export default class App extends Component {
  render() {
    return (
      <Layout >
        <Header />
        <Content >
          {this.props.children}
        </Content>
      </Layout >
    );
  }
}
