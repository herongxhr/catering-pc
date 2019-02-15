import React, { Component } from 'react';
import { Button } from 'antd';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">主按钮</Button>
        <Button>次按钮</Button>
        <a>文本按钮</a>
      </div>
    )
  }
}

export default App;
