import React from 'react'
import { Table,Tag,Tabs,Button } from 'antd'
import WrappedInlineForm from '../InlineForm'

import './index.less'

const TabPane = Tabs.TabPane;

class TableTwo extends React.Component {
  render() {
    return(
      <div className='tableTwo'>
          <WrappedInlineForm />
          <Button type='primary' icon="plus" style={{marginLeft:25}}>新建菜单</Button>
          <Tabs defaultActiveKey="1" style={{marginTop:-47}} className='tableOne'>
            <TabPane tab="全部" key="1">
              <Table columns={this.props.columns} dataSource={this.props.dataSource}/>
            </TabPane>
            <TabPane tab="未下单" key="2">未执行</TabPane>
            <TabPane tab="已下单" key="3">更多</TabPane>
          </Tabs>
      </div>
    )
  }
}

export default TableTwo