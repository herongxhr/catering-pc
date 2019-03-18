import React from 'react';
import { connect } from 'dva';
import './index.less'
import {  Alert,Tag , Table, Button } from 'antd';

class ExchangeApplay extends React.Component {
  state={
      expander:true,
      opertion:true
  }
  handleExpender = () =>{
   this.setState({
     expander:!this.state.expander,
   })
  }
  render() {
    const tab1Columns = [{
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render:(text,record)=>{return record.status == 'Z' ? <Tag color='orange'>{text}</Tag> : <Tag color='cyan'>{text}</Tag>}
      }, {
        title: '商品',
        dataIndex: 'goods',
        key: 'goods',
      }, {
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
          title: '操作',
          dataIndex: 'opertion',
          key: 'opertion',
          rowSpan :2,
          render:() =>{
              return <div><Button type='primary' style={{marginRight:10}}>同意</Button><Button type='danger'>拒绝</Button></div>
          }
        },
       ];
       const data = [
        {
          key: '1',
          tags: '订单商品',
          goods: '名称+规格参数',
          unit: '斤',
          univalent: '26',
          count: '30',
          totalPrice:'780',
          status:'O'
        },
        {
          key: '2',
          tags: '置换商品',
          goods: '名称+规格参数',
          unit: '斤',
          univalent: '26',
          count: '30',
          totalPrice:'780',
          status:'Z'
        }
       ]
    return (
        // 换货申请的逻辑
        <div className='exchangeApplay'>
            <div className='exchangeHead'>
              <div className='exchangeTitle'>换货申请</div>
              <Alert message='共2条' type="warning" showIcon className='alert' />
              <div className='operation' onClick={this.handleExpender}>{this.state.expander ? '收起' : '展开'}</div>
            </div>
           {this.state.expander ? 
            <div className='exchangeTable'>
            <Table  
            columns={tab1Columns}  
            rowKey='id'
            dataSource={data}
            footer={() =>  <div className="changeMark">
                换货备注：备注内容备注内容备注内容备注内容备注内容备注内容备注内容
            </div>}
            />
            </div> : ''
           }  
        </div>
    )
  }
}
export default connect(({ }) => ({
}))(ExchangeApplay);