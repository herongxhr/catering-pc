/*
 * @Author: suwei 
 * @Date: 2019-03-21 10:10:55 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-21 10:11:38
 */
import React from 'react'
import DeliveryForm from '../DeliveryForm'
import { Tag , Table} from 'antd'
import { withRouter } from "react-router";
import './index.less'
import moment from 'moment'

class DeliveryTable extends React.Component {
  state = {
    DataSource: []
  }
  handleonClick = (record) =>{
    const {status} = this.props;
    if(status == '1'){
    this.props.history.push(
      { pathname:"/pendingDeliveryDetail", state:{id:record.id,status:record.status} }
    )
    }
    if(status == '2'){
      this.props.history.push(
        { pathname:"/pendingAcceDetail", state:{id:record.id,status:record.status} }
      )
    }
    if(status == '3'){
      this.props.history.push(
        { pathname:"/acceptedDetail", state:{id:record.id,status:record.status} }
      )
    }
  }
  handleTable = (pagination) =>{
   const {current,pageSize} = pagination;
   const {handleFilterChange} = this.props
   handleFilterChange({
    current,
    pageSize
   });
  }
  render() {
    const tab1Columns = [{
      title: '配送单号',
      dataIndex: 'distributionNo',
      key: 'distributionNo',
    }, {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier',
      render: supplier => supplier.supplierName
    }, {
      title: '配送日期',
      dataIndex: 'distributionDate',
      key: 'distributionDate',
      render:(text) =>{
        return (
          moment(text).format('YYYY-MM-DD dddd')
        )
      }
    }, {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
    },
     ];
    const {delivery,status,handleFilterChange} = this.props;
    const {records= [],current,total} = delivery;
    if(status == '1'){
      tab1Columns.push({
        title: '操作',
        dataIndex: 'Operation',
        key: 'Operation',
        render:(text,record)=>{
         return ( record.replacementNum ? 
              <span style={{color:'#FF9500'}}>有{record.replacementNum}个换货申请</span>
              : ''
              )
        }
      })
    }
    return(
      <div className='DeliveryTable'>
        <DeliveryForm handleFilterChange={handleFilterChange} />
        <Table  
        columns={tab1Columns} 
        dataSource={records} 
        style={{paddingLeft:30,paddingRight:30}}
        rowKey='id'
        onChange={this.handleTable}
        pagination={{current,total}}
        onRow={
          (record) => {
              return {
                onClick: () => {
                  this.handleonClick(record)
                },
              };
          }
        }
        />
      </div>
    )
  }
}
const ShowDeliveryRouter = withRouter(DeliveryTable);
export default ShowDeliveryRouter