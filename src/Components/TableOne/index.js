import React from 'react'
import { Table,Tag,Tabs } from 'antd'
import WrappedInlineForm from '../InlineForm'

import './index.less'

const TabPane = Tabs.TabPane;

class TableOne extends React.Component {
  render() {
    return(
      <div>
          <WrappedInlineForm />
          <Tabs defaultActiveKey="1" style={{marginTop:-68}} className='tableOne'>
            <TabPane tab="Tab 1" key="1">
              <Table columns={this.props.columns} dataSource={this.props.dataSource}/>
            </TabPane>
            <TabPane tab="Tab 2" key="2">未执行</TabPane>
            <TabPane tab="Tab 3" key="3">更多</TabPane>
          </Tabs>
      </div>
    )
  }
}

export default TableOne