import React from 'react';
import { connect } from 'dva';
import './index.less'
import {  Alert, Table, } from 'antd';

class ProductBreakdown extends React.Component {
  state={
      proExpander:true,
      opertion:true
  }
  handleProExpender = () =>{
    this.setState({
      proExpander:!this.state.proExpander,
    })
   }
  render() {
    const tab1Columns = [{
        title: '商品',
        dataIndex: 'goods',
        key: 'goods',
      },{
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
      }, {
        title: '单价(元)',
        dataIndex: 'univalent',
        key: 'univalent',
      },{
          title: '数量',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: '总价(元)',
          dataIndex: 'totalPrice',
          key: 'totalPrice',
        },
        {
          title: '进货渠道',
          dataIndex: 'purChannel',
          key: 'purChannel',
          render:(text)=>{return <span style={{color:'#F5222D'}}>{text}</span>}
        },
        {
          title: '生产日期',
          dataIndex: 'productDate',
          key: 'productDate',
          render:(text)=>{return <span style={{color:'#F5222D'}}>{text}</span>}
        },
        {
          title: '有效期(天)',
          dataIndex: 'validityPeriod',
          key: 'validityPeriod',
          render:(text)=>{return <span style={{color:'#F5222D'}}>{text}</span>}
        }
       ];
       const data = [
        {
          key: '1',
          goods: '名称+规格参数',
          unit: '斤',
          univalent: '26',
          count: '30',
          totalPrice:'780',
          purChannel:'未上传',
          productDate:'未上传',
          validityPeriod:'未上传',
        },
        {
          key: '2',
          goods: '名称+规格参数',
          unit: '斤',
          univalent: '26',
          count: '30',
          totalPrice:'780',
          purChannel:'未上传',
          productDate:'未上传',
          validityPeriod:'未上传',
        },
        {
          key: '3',
          goods: '名称+规格参数',
          unit: '斤',
          univalent: '26',
          count: '30',
          totalPrice:'780',
          purChannel:'未上传',
          productDate:'未上传',
          validityPeriod:'未上传',
        },
        {
          key: '4',
          goods: '名称+规格参数',
          unit: '斤',
          univalent: '26',
          count: '30',
          totalPrice:'780',
          purChannel:'未上传',
          productDate:'未上传',
          validityPeriod:'未上传',
        },
        {
          key: '5',
          goods: '名称+规格参数',
          unit: '斤',
          univalent: '26',
          count: '30',
          totalPrice:'780',
          purChannel:'未上传',
          productDate:'未上传',
          validityPeriod:'未上传',
        },
        {
          key: '6',
          goods: '名称+规格参数',
          unit: '斤',
          univalent: '26',
          count: '30',
          totalPrice:'780',
          purChannel:'未上传',
          productDate:'未上传',
          validityPeriod:'未上传',
        },
       ]
    return (
        <div className='productBreakdown'>
            <div className='productHead'>
              <div className='productTitle'>商品明细</div>
              <Alert message='共10条' type="warning" showIcon className='alert' />
              <div className='operation' onClick={this.handleProExpender}>{this.state.proExpander ? '收起' : '展开'}</div>
            </div>
            {this.state.proExpander ? 
            <div className='exchangeTable'>
                <Table  
                columns={tab1Columns}  
                rowKey='id'
                dataSource={data}
                />
            </div>: ''} 
        </div>
    )
  }
}
export default connect(({ }) => ({
}))(ProductBreakdown);