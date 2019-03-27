import React from 'react'
import { Table } from 'antd';
import axios from 'axios';
import Selectf from '../../components/SelectIngredients';



class Test extends React.Component {

  state = {
    visible:false
  }

  handleModalVisble = () => {
   this.setState({
    visible:true
   }) 
  }

  handleModalHidden = () => {
    this.setState({
      visible:false
    })
  }

	render() {
		const dataSource = [{
			id: '1',
			name: '胡彦斌',
			age: 32,
			address: '西湖区湖底公园1号'
		}, {
			id: '2',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号'
		}];
		
		return(
      <Selectf 
        dataSource={dataSource} 
        handleModalVisble={this.handleModalVisble} 
        handleModalHidden={this.handleModalHidden} 
        visible={this.state.visible}
        />
		)
	}
}

export default Test