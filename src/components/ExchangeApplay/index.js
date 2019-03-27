/*
 * @Author: suwei 
 * @Date: 2019-03-21 11:07:42 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-21 15:23:10
 */
import React, { Fragment } from 'react';
import { connect } from 'dva';
import './index.less'
import { Alert, Tag, Table, Button, Popconfirm } from 'antd';
import { withRouter } from "react-router";


class ExchangeApplay extends React.Component {
  state = {
    expander: true,
    opertion: true,
  }

  handleExpender = () => {
    this.setState({
      expander: !this.state.expander,
    })
  }
  queryDistributionDetail = (params = {}) => {
    const { dispatch, location } = this.props;
    const id = location.state && location.state.id;
    dispatch({
        type: 'deliveryAcce/queryDistributionDetail',
        payload: {
            ...params,
            id
        }
    })
}
 
  queryExecute = (params={}) =>{
    const { dispatch} = this.props;
    dispatch({
      type: 'deliveryAcce/queryExecute',
      payload: {
        ...params,
      }
    })
  }
  handleAgree = (params) => {
    //console.log(params,'1111')
    const { location } = this.props;
    const id = location.state && location.state.id;
    const applyId= params.id
   this.queryExecute({
     id:applyId,
     approveStatus:'1',
     distributionId:id
   })
   window.location.reload()
  }
  handleRefuse = (params) => {
    //console.log(params,'2222')
    const { location } = this.props;
    const id = location.state && location.state.id;
    const applyId= params.id
    this.queryExecute({
      id:applyId,
      approveStatus:'0',
      distributionId:id
    })
    window.location.reload()
  }

  componentDidMount() {
    this.queryDistributionDetail()
  }
  render() {
    const handleRender = (text,record)=>{
      if(record.status === '0'){
        return (
          <span></span>
        )
      }else{
        var Arr =text.length>0 && text.split('||') || [];
        return(
          <div className='renderText'>
            {
              Arr.map((item,index)=>{
                  return(<div key={index}>{item}</div>)
              })
            }
          </div>
        )
      } 
      }
    const tab1Columns = [{
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render:(text,record)=>{
        const data = record.combineGoodsSummary
        var Arr =data.length>0 && data.split('||') || [];
        if(record.status === '0'){
          return(
            <span></span>
          )
        }else{
          return (
            <div className='tags'>
              <div>{Arr[0] ? <Tag color='cyan'>订单商品</Tag> : ''}</div>
              <div>{Arr[1] ? <Tag color='orange'>置换商品</Tag> : ''}</div>
            </div>
          )
        }
      }
    }, {
      title: '商品',
      dataIndex: 'combineGoodsSummary',
      key: 'combineGoodsSummary',
      render:handleRender
    }, {
      title: '单位',
      dataIndex: 'combineUnit',
      key: 'combineUnit',
      render:handleRender
    }, {
      title: '单价(元)',
      dataIndex: 'combinePrice',
      key: 'combinePrice',
      render:handleRender
    }, {
      title: '数量',
      dataIndex: 'combineQuantity',
      key: 'combineQuantity',
      render:handleRender
    },
    {
      title: '总价(元)',
      dataIndex: 'combineTotal',
      key: 'combineTotal',
      render:handleRender
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (text,record)=>{
        if(record.status === '0'){
          return (
            <span></span>
          )
        }
        if(record.status === '1'){
          return(
            <div>
               <Fragment>
                 <Popconfirm title="是否要继续此操作？" onConfirm={this.handleAgree.bind(this,record)}>
                  <Button type='primary' style={{marginRight:10}} >同意</Button>
                 </Popconfirm>
                 <Popconfirm title="是否要继续此操作？" onConfirm={ this.handleRefuse.bind(this,record)}>
                  <Button type='danger' style={{marginRight:10}} >拒绝</Button>
                 </Popconfirm>
               </Fragment>
            </div>
          )
        }
       if(record.status === '2'){
         return(
          <span>{record.approveStatus === '0' ? <span style={{color:'red'}}>已拒绝</span> : '已同意'}</span>
         ) 
       }
      }
    }
    ];
    const { detailData = {} } = this.props
    const replacementVoList = detailData.replacementVoList || []
     const remark = replacementVoList[0] || {}
     const total = replacementVoList.length ? replacementVoList.length : 0
    return (
      // 换货申请的逻辑待修改
      <div className='exchangeApplay'>
        <div className='exchangeHead'>
          <div className='exchangeTitle'>换货申请</div>
          <Alert message={`共${total}条`} type="warning" showIcon className='alert' />
          <div className='operation' onClick={this.handleExpender}>{this.state.expander ? '收起' : '展开'}</div>
        </div>
        {this.state.expander ?
          <div className='exchangeTable'>
            <Table
              style={{ background: 'white' }}
              columns={tab1Columns}
              dataSource={replacementVoList}
              rowKey='id'
              pagination={false}
              footer={() => <div className="changeMark">
                换货备注：{remark.remark}
            </div>}
            />
          </div> : ''
        }
      </div>
    )
  }
}

export default connect(({ deliveryAcce }) => ({
  detailData: deliveryAcce.detailData,
  execute:deliveryAcce.execute
}))(withRouter(ExchangeApplay));