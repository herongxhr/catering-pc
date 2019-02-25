import React from 'react'
import { Table , Button , Dropdown , Menu , Badge} from 'antd'
import WrappedInlineForm from '../InlineForm'
import Axios from '../../axios'

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
    DataSource:[]
  }

  handleMenuClick = (e) => {
    console.log('click', e);
  }

  componentDidMount() {
    Axios.request({
      url:'/unifiedMenus'
    }).then((res) => {
      this.setState({
        DataSource:res.records
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
    return(
      <div className='TableOne'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <WrappedInlineForm />
          <ButtonGroup>
            <Button>全部</Button>
            <Button>未执行</Button>
            <Dropdown overlay={menu}>
              <Button>
                更多
              </Button>
            </Dropdown>
          </ButtonGroup>  
        </div>
        <Table columns={tab1Columns} dataSource={this.state.DataSource} />
      </div>
    )
  }
}

export default TableOne