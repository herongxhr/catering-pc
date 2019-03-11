import React from 'react'
import { Table,Tag,Tabs,Button,Badge } from 'antd'
import WrappedInlineForm from '../InlineForm'
import { withRouter } from 'react-router'
import { connect } from 'dva'


import './index.less'

const ButtonGroup = Button.Group;

const tab2Columns = [{
	title: '菜单编号',
	dataIndex: 'menuID',
	key: 'menuID',
}, {
	title: '周次',
	dataIndex: 'weekly',
	key: 'weekly',
}, {
	title: '日期',
	dataIndex: 'date',
	key: 'date',
}, {
	title: '执行状态',
	dataIndex: 'status',
	key: 'status',
	render(status) {
		let config = {
			'0': '已执行',
			'1': '未执行',
		}
		return config[status]
	}
}, {
	title: '操作',
	dataIndex: 'operation',
	key: 'operation',
	render(operation) {
		return operation == 1 ? <span style={{ color: 'blue' }}>删除</span> : ''
	}
}]
const Columns = [{
	title: '菜单编号',
	dataIndex: 'menuCode',
	key: 'menuCode',
}, {
	title: '周次',
	dataIndex: 'week',
	key: 'week',
}, {
	title: '日期',
	dataIndex: 'date',
	key: 'date',
}, {
	title: '执行状态',
	dataIndex: 'status',
	key: 'status',
  render:(text) => {
    if(text == '已执行') {
      return text
    } else {
      return <span>
        <Badge status="warning" />
        <span>未执行</span>
      </span>
    }
  }
}, {
	title: '操作',
	dataIndex: 'status',
	key: 'status',
	render(text) {
		if(text == '未执行') {
      return <a href=''>删除</a>
    }
	}
}]

class MyMenu extends React.Component {
  handleChange = () => {
    this.props.history.push('/menubar/public/details')
  }

  componentDidMount() {
    const { dispatch } = this.props
		dispatch({
			type:'unifiedMenus/queryMyMenu',
		})
	}

  render() {
    const { unifiedMenus }  = this.props
    const DataSource = unifiedMenus.myMenu.records
    return(
      <div className='tableTwo'>
        <WrappedInlineForm />
        <div style={{display:'flex',justifyContent:'space-between'}} className='sub-group'>
          <div>
            <Button type='primary' icon="plus" onClick={this.handleChange}>新建菜单</Button>
          </div>
          <div>
            <ButtonGroup>
              <Button>全部</Button>
              <Button>未执行</Button>
              <Button>已执行</Button>
            </ButtonGroup>  
          </div>
        </div>
        <Table columns={Columns} dataSource={DataSource} rowKey="id" style={{padding:'0px 20px 0px 20px'}} onRow={(record) => {
          return {
            onClick:(event) => {
              this.props.history.push('/menubar/public/details')
            }
          }
        }}/>
      </div>
    )
  }
}


const TableTwo = withRouter(MyMenu)

export default connect(( {unifiedMenus} ) => ({
  unifiedMenus,
}))(MyMenu)