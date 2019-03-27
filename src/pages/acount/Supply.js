/*
 * @Author: suwei 
 * @Date: 2019-03-23 16:56:28 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-24 10:20:11
 */
import React from 'react'
import { Form , Tabs , Card } from 'antd';
import { connect } from 'dva';
import TableForm from './TableForm';
import NestedTable from './NestedTable'

import './style.less'

const TabPane = Tabs.TabPane;

class CommonSupply extends React.Component {

  queryListQuery = (params = {}) => {
    this.props.dispatch({
      type: 'setting/queryListQuery',
      payload: {
        ...params
      },
    })
  }

  componentDidMount() {
    this.queryListQuery()
  }

  render() {
    const {
      form: { getFieldDecorator },
      listQuery
    } = this.props;
    //对后端返回的数据进行包装
    const tableData = listQuery
    const array = []
    tableData.forEach(item => array.push(item.supplierVo))
    for(let i = 0; i < array.length; i++) {
      array[i].supplierId = tableData[i].supplierId
    }
    return(
      <div>
        <h1>供货商</h1>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="常见供货商" key="1">
            <Card bordered={false}>
              {getFieldDecorator('members', {
                initialValue: array,
              })(<TableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="配送类别匹配" key="2">
            <NestedTable />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const Supply = Form.create()(CommonSupply)

export default connect(({setting})=>({listQuery:setting.listQuery}))
(Supply);