/*
 * @Author: suwei 
 * @Date: 2019-03-20 15:20:39 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-27 09:48:31
 */
import React, { PureComponent, Fragment } from 'react';
import { Table, Button, message, Popconfirm, Select, Form, Modal } from 'antd';
import isEqual from 'lodash/isEqual';
import { connect } from 'dva';

import './style.less';

const Option = Select.Option

class SettingTableForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.value,
      loading: false,
      value: props.value,
      visible: false
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  //删除按钮                                                                                                                                                                                                                                                                                                                                                                                                        
  remove(key) {
    const { props } = this
    props.dispatch({
      type:'setting/queryDeleteFavoriteSupplier',
      payload:key
    })
  }

  //modal确定按钮
  handleOk = (e) => {
    let userInfo = this.props.form.getFieldsValue();
    const { props } = this
    const { savefavoriteSupplier } = props
    props.dispatch({
      type:'setting/queryfavoriteSupplier',
      payload:userInfo
    })
    this.setState({
      visible:false
    })
  }

  //modal框取消按钮
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  //查询供应商列表
  querySupplier = (params = {}) => {
    this.props.dispatch({
      type: 'setting/querySupplier',
      payload: {
        ...params
      },
    })
  }


  //展开modal框
  showModal = () => {
    this.setState({
      visible: true,
    });
    this.querySupplier()
  }

  render() {
    const columns = [
      {
        title: '供应商',
        dataIndex: 'supplierName',
        key: 'supplierName',
        width: '20%',
      },
      {
        title: '地区',
        dataIndex: 'zoneInfo',
        key: 'zoneInfo',
        width: '20%',
      },
      {
        title: '联系电话',
        dataIndex: 'mobile',
        key: 'mobile',
        width: '20%',
      },
      {
        title: '法人',
        dataIndex: 'corporation',
        key: 'corporation',
        width: '20%',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              {/* <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a> */}
              {/* <Divider type="vertical" /> */}
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.supplierId)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
    const { getFieldDecorator } = this.props.form;
    const modalObject = {
      height:'328px'
    }
    const { loading, data } = this.state;
    const { supplier } = this.props
    return (
      <Fragment>
        <Table
          loading={loading}  //通过loading这个变量的值判断页面是否在加载中
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey='supplierId'
          rowClassName={record => (record.editable ? 'editable' : '')} //点击编辑的话样式变化
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          // onClick={this.newMember}
          onClick={this.showModal}
          icon="plus"
        >
          添加
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{height:'380px'}}
          bodyStyle={modalObject}
          // centered={true}
          closable={false}
          width='370px'
          // getContainer={() => document.getElementsByClassName('security-view')}
        >   
          <div style={{marginBottom:'20px'}}>添加供货商</div>
            {getFieldDecorator('supplierId', {

            })(
              <Select  style={{width:'330px'}} placeholder='请选择'>
                {supplier.map(item => (
                  <Option key={item.id} value={item.id}>{item.supplierName}</Option>
                ))}
              </Select>
            )}

        </Modal>
      </Fragment>
    );
  }
}

const TableForm = Form.create()(SettingTableForm)

export default connect(({setting})=>({
  listQuery:setting.listQuery,
  supplier:setting.supplier,
  savefavoriteSupplier:setting.savefavoriteSupplier,
  deleteSupply:setting.deleteSupply
}))(TableForm);


