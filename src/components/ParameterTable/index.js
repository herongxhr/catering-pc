import React from 'react'
import { Table,Tag,Tabs } from 'antd'
import ParameterForm from './ParameterForm'

import { parameter } from '../../DataConfig'

import './index.less'

const TabPane = Tabs.TabPane;

const Columns = [{
  title: '供应商',
  dataIndex: 'Supplier',
  key: 'Supplier',
  render(Supplier) {
    let config = {
        '0': '金华市大鑫公司',
        '1': '烟台青田果蔬有限公司',
        '2': '浙江坚果智慧'
    }
    return config[Supplier];
  }
}, {
  title: '结算月份',
  dataIndex: 'Month',
  key: 'Month',
}, {
	title: '配送单数量(张)',
  dataIndex: 'Number',
	key: 'Number',
  render(Number) {
    let config = {
        '1': '',
        '2': '8',
    }
    return config[Number];
  }
}, {
	title: '总金额',
  dataIndex: 'Acount',
  key: 'Acount',
}];

class ParameterTable extends React.Component {
  render() {
    return(
      <div className='ParameterTable'>
        <ParameterForm />
        <Table columns={Columns} dataSource={parameter} />
      </div>
    )
  }
}

export default ParameterTable