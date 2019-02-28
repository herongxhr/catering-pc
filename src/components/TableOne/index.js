import React from 'react'
import { Table , Button , Dropdown , Menu , Badge} from 'antd'
import WrappedInlineForm from '../InlineForm'
import Axios from '../../axios'
import axios from 'axios'
import { connect } from 'dva'

import './index.less'

const ButtonGroup = Button.Group;

const tab1Columns = [{
  title: '菜单编号',
  dataIndex: 'menuCode',
  key: 'menuCode',
}, {
  title: '周次',
  dataIndex: 'week',
  key: 'week',
}, {
  title: '日期',
  dataIndex: 'beginDate',
  key: 'beginDate',
}, {
	title: '下达单位',
  dataIndex: 'superiorName',
	key: 'superiorName',
}, {
	title: '下达时间',
  dataIndex: 'endDate',
  key: 'endDate',
}, {
	title: '执行状态',
  dataIndex: 'status',
	key: 'status',
	render(status){
    if(status == 0) {
      return <span><Badge status="warning" />未执行</span>
    }
    if(status == 1) {
      return <span>已执行</span>
    }
    if(status == 2) {
      return <span>失效</span>
    }
	}
}];

class TableOne extends React.Component {
  state = {
    DataSource:null,
    status:1
  }

  
  handleMenuClick = (e) => {
    console.log('click', e);
  }

  handleHeaderClick = () => {
    // const { dispatch,key } = this.props;
    // //请求待办事项
    // dispatch({
    //   type: 'unifiedMenus/queryList',
    //   payload:{
    //     status:this.state.status,
    //   }
    // })
    axios.post('http://yapi.jgzh.com/mock/17/catering/unifiedMenus', {
      status:0
    })
    .then(function (response) {
      console.log(response);
    })
  }

  componentDidMount() {
    Axios.request({
      url:'/unifiedMenus'
    }).then((res) => {
      this.setState({
        DataSource:res
      })
    })
  }



  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">已执行</Menu.Item>
        <Menu.Item key="2">已失效</Menu.Item>
      </Menu>
    );
    let tableSource
    if(this.state.DataSource) {
      const DataSource = this.state.DataSource
      let key = Object.keys(DataSource)[1]
      let value = Object.values(DataSource)[1]
      if(DataSource) {
        tableSource = DataSource.camenus.records
        let test =  tableSource.map(item => item[key] = value)
      }
    }

    
    return(
      <div className='TableOne'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <WrappedInlineForm />
          <ButtonGroup>
            <Button>全部</Button>
            <Button onClick={this.handleHeaderClick}>未执行</Button>
            <Dropdown overlay={menu}>
              <Button>
                更多
              </Button>
            </Dropdown>
          </ButtonGroup>  
        </div>
        <Table columns={tab1Columns} dataSource={tableSource} rowKey="id" />
      </div>
    )
  }
}



export default connect(( {unifiedMenus} ) => ({
  unifiedMenus,
}))(TableOne); 