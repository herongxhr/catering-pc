import React from 'react'
import WrappedPurForm from '../../components/PurForm'
import TwoBread from '../../components/TwoBread'
import { Card, Radio, Table, Alert } from 'antd'

import './index.less'

const tabColumns = [{
  title: '食材名称',
  dataIndex: 'ingredientName',
  key: 'ingredientName',
}, {
  title: '计量单位',
  dataIndex: 'unit',
  key: 'unit',
}, {
  title: '分类',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '价格（元）',
  dataIndex: 'price',
  key: 'price',
}, {
  title: '最新定价时间',
  dataIndex: 'newtime',
  key: 'newtime',
}
];
class PurCatalog extends React.Component {
  state = {
    DataSource: [],
    tableSource: [],
    disabled: true,
    visible: false
  }
  notPass = () => {
    var dataSource = this.state.DataSource.filter(item => item.status == 1)
    this.setState({
      tableSource: dataSource
    })
  }

  pass = () => {
    var dataSource = this.state.DataSource.filter(item => item.status == 0)
    this.setState({
      tableSource: dataSource
    })
  }
  render() {
    return (
      <div className='purCata'>
        <Card
          title={<TwoBread title='工作台' subTitle='采购目录' />}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
          <div className='cataTable'>
            <WrappedPurForm />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
              <div  style={{ display: 'flex', }}>
                <Radio.Group defaultValue="all" onChange={this.handleFormLayoutChange}>
                  <Radio.Button value="all" onClick={this.all}>全部</Radio.Button>
                  <Radio.Button value="ingredients" onClick={this.notPass}>食材</Radio.Button>
                  <Radio.Button value="excipient">辅料</Radio.Button>
                </Radio.Group>
                <Alert message="共9993条" type="warning" showIcon className='alert' />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Table columns={tabColumns} dataSource={this.state.tableSource} />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default PurCatalog