/*
 * @Author: suwei 
 * @Date: 2019-03-28 16:45:44 
 * @Last Modified by:   suwei 
 * @Last Modified time: 2019-03-28 16:45:44 
 */
import React from 'react'
import {
  Table, Select,Modal
} from 'antd';
import { connect } from 'dva';
import { destruct } from '@aximario/json-tree';

import './NestedTable.less'

const Option = Select.Option;


class NestedTable extends React.Component {
  state = { 
    visible: false,
    supplierId:'',
    skuIds:[]
  }

  querySettingCateringCatalog = () => {
    const { props } = this
    props.dispatch({
      type:'setting/querySettingCateringCatalog'
    })
  }
  
  componentDidMount() {
    this.querySettingCateringCatalog()
  }

  showModal = (record) => {
    this.querySupplier()
    let destructedData = destruct([record], {
      pid: 'parentId', 
    })
    destructedData = destructedData.map(item =>  {
     return item.id
    })  //取出数组id中的值
    this.setState({
      visible: true,
      skuIds:destructedData
    });
  }

  handleOk = (e) => {
    const { props , state } = this
    const { supplierId , skuIds } = state 
    debugger;
    props.dispatch({
      type:'setting/queryCateringSupplier',
      payload:{
        supplierId,
        skuIds
      }
    })
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  
  handleChange = (value) => {
    this.setState({
      supplierId:value
    })
  }

  querySupplier = (params = {}) => {
    this.props.dispatch({
      type: 'setting/querySupplier',
      payload: {
        ...params
      },
    })
  }




  render() {
    const columns = [
      { title: '食材类别', dataIndex: 'name', key: 'name' },
      { title: '供应商', dataIndex: 'supplierNames', key: 'supplierNames' },
      { 
        title: '操作',
        key: 'setting',
        render: (text,record) => (
          <a onClick={() => this.showModal(record)}>
            设置
          </a>
        ),
      },
    ];

    const modalObject = {
      height:'273px'
    }

    const { cateringCatalog , supplier} = this.props

    return (
      <div>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={cateringCatalog}
          rowKey='id'
        />
        <Modal
          title="设置供货商"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width='370px'
          bodyStyle={modalObject}
        >
          <Select  style={{width:'330px'}} placeholder='请选择' onChange={this.handleChange}>
            {supplier.map(item => (
              <Option key={item.id} value={item.id}>{item.supplierName}</Option>
            ))}
          </Select>
        </Modal>
      </div>

    );
  }

}

export default connect(({setting})=>({
  cateringCatalog:setting.cateringCatalog,
  supplier:setting.supplier,
}))
(NestedTable)