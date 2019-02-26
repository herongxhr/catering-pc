import React from 'react'
import { Form , Tabs , Table , Card } from 'antd';

import TableForm from './TableForm';
import NestedTable from './NestedTable'

import './style.less'

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;


const tableData = [{
  key: '1',
  supply: '坚果智慧',
  legalPerson: '赵丽颖',
  address: '横店',
  phone:'111111111'
}, {
  key: '2',
  supply: '东阳市康有食品有限公司',
  legalPerson: '王海',
  address: '东阳市',
  phone:'17683763005'
}];


class CommonSupply extends React.Component {
  state = {
    supplier:[]
  }



  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return(
      <div>
        <h1>供货商</h1>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="常见供货商" key="1">
            <Card bordered={false}>
              {getFieldDecorator('members', {
                initialValue: tableData,
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




export default Supply