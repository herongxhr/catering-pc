import React from 'react'
import { Table,Tag,Tabs,Button,Badge } from 'antd'
import WrappedInlineForm from '../InlineForm'
import { withRouter } from 'react-router'
import { connect } from 'dva'


import './index.less'

const ButtonGroup = Button.Group;

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

class MyTableTwo extends React.Component {
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

const TableTwo = withRouter(MyTableTwo)

export default connect(( {unifiedMenus} ) => ({
  unifiedMenus,
}))(TableTwo)