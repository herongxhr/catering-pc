/*
 * @Author: suwei 
 * @Date: 2019-03-21 11:07:42 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-21 15:23:10
 */
import React ,{ Fragment } from 'react';
import { connect } from 'dva';
import './index.less'
import {  Alert,Tag , Table, Button, Popconfirm } from 'antd';
import { pendingDeliveryDetail } from '../../DataConfig'
import { isEven } from '../../utils/utils'
import DeliveryConfirm from '../DeliveryConfirm'


class ExchangeApplay extends React.Component {
  state={
      expander:true,
      opertion:true
  }
  handleExpender = () => {
   this.setState({
     expander:!this.state.expander,
   })
  }

  handleAgree = (key) => {
    console.log(1)
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
          width: '20%',
          render: (value, record, index) => {
            const obj = {
              children: value,
              props: {},
            };
            // console.log(isEven(index))
            // if (isEven(index)) {
            //   obj.props.rowSpan = 0;
            // }
            // if(isEven(index)) {
            //   obj.props.rowSpan = 2;
            // }
            if(isEven(index)) {
              obj.props.rowSpan = 2;
              obj.children =  (
                // <Fragment>
                //   <Popconfirm title="是否要继续此操作？" onConfirm={() => this.handleAgree(record.key)}>
                //     <Button type='primary' style={{marginRight:10}} >同意</Button>
                //   </Popconfirm>
                //   <Popconfirm title="是否要继续此操作？" onConfirm={() => this.handleAgree(record.key)}>
                //     <Button type='danger' style={{marginRight:10}} >拒绝</Button>
                //   </Popconfirm>
                // </Fragment>
                <DeliveryConfirm />
              )
            }
            if(!isEven(index)) {
              obj.props.rowSpan = 0;
            }
            // These two are merged into above cell
            return obj;
          }
          // render:() =>{
          //     return <div><Button type='primary' style={{marginRight:10}}>同意</Button><Button type='danger'>拒绝</Button></div>
          // }
        },
       ];

    return (
        // 换货申请的逻辑
        <div className='exchangeApplay'>
            <div className='exchangeHead'>
              <div className='exchangeTitle'>换货申请</div>
              <Alert message={`共${pendingDeliveryDetail.length}条`} type="warning" showIcon className='alert' />
              <div className='operation' onClick={this.handleExpender}>{this.state.expander ? '收起' : '展开'}</div>
            </div>
           {this.state.expander ? 
            <div className='exchangeTable'>
            <Table
            style={{background:'white'}}
            columns={tab1Columns}  
            dataSource={pendingDeliveryDetail}
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