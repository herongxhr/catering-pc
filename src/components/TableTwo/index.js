import React from 'react'
import { Table,Tag,Tabs,Button } from 'antd'
import WrappedInlineForm from '../InlineForm'

import './index.less'

const ButtonGroup = Button.Group;

class TableTwo extends React.Component {
  render() {
    return(
      <div className='tableTwo'>
        <WrappedInlineForm />
        <div style={{display:'flex',justifyContent:'space-between'}} className='sub-group'>
          <div>
            <Button type='primary' icon="plus">新建菜单</Button>
          </div>
          <div>
            <ButtonGroup>
              <Button>全部</Button>
              <Button>未执行</Button>
              <Button>已执行</Button>
            </ButtonGroup>  
          </div>
        </div>
        <Table columns={this.props.columns} dataSource={this.props.dataSource}/>
      </div>
    )
  }
}

export default TableTwo