import React, { Component } from 'react';
import './index.less';
import { Table,Badge } from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import moment from 'moment'

const Columns = [{
    title: '配送单号',
    dataIndex: 'distributionNo',
    key: 'distributionNo',
    render:(text,record) =>{
      if(record.status == '1'){
        return(<Link to={{ pathname:"/pendingDeliveryDetail",state:{id:record.id} }}>{text}</Link>) 
      }
      if(record.status == '2'){
        return(<Link to={{ pathname:"/pendingAcceDetail",state:{id:record.id} }}>{text}</Link>) 
      }
      if(record.status == '3'){
        return(<Link to={{ pathname:"/acceptedDetail",state:{id:record.id} }}>{text}</Link>) 
      }
    } 
  }, {
    title: '供应商',
    dataIndex: 'supplier',
    key: 'supplier',
    width:270,
    render:(text)=>text.supplierName
  }, {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
      width:300
  }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status){
        if(status == '1'){
          return (<span> <Badge status="warning" />待配送</span>)
        }
        if(status == '2'){
          return (<span> <Badge status="success" />待验收</span>)
        }
        if(status == '3'){
          return (<span> <Badge status="default" />已验收</span>)
        }
      },
      width:160
  },{
    title: '配送日期',
    dataIndex: 'distributionDate',
    key: 'distributionDate',
    render:(text)=>{return <span>{moment(text).format("YYYY-MM-DD dddd")}</span>}
  }];
  
class DisAcceptTable extends Component {
    render() {
      const records = this.props.deliveryRecords || []
        return ( 
        <div className="accepting">
           <Table 
           columns={Columns} 
           dataSource={records} 
           pagination={false}
           rowKey="id"
           /> 
        </div>
        );
    }
    }
export default connect(( {deliveryAcce} ) => ({
  delivery:deliveryAcce.delivery,
}))(DisAcceptTable); 
