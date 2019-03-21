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

class DeliveryTable extends React.Component {
  state = {
    DataSource: []
  }
  handleonClick = (id) =>{
    const {tabkey} = this.props;
    if(tabkey == 'pendingDelivery'){
    this.props.history.push({ pathname:"/pendingDeliveryDetail", query:{id:id} })
    }
    if(tabkey == 'pendingAccept'){
      this.props.history.push({ pathname:"/pendingAcceDetail", query:{id:id} })
    }
    if(tabkey == 'accepted'){
      this.props.history.push({ pathname:"/acceptedDetail", query:{id:id} })
    }
  }
  render() {
    const tab1Columns = [{
      title: '配送单号',
      dataIndex: 'distributionNo',
      key: 'distributionNo',
    }, {
      title: '供应商',
      dataIndex: 'supplierName',
      key: 'supplierName',
    }, {
      title: '配送日期',
      dataIndex: 'distributionDate',
      key: 'distributionDate',
    }, {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
    },
     ];
    const {delivery,tabkey} = this.props;
    if(tabkey == 'pendingDelivery'){
      tab1Columns.push({
        title: '操作',
        dataIndex: 'Operation',
        key: 'Operation',
        render:(text)=>{return <span style={{color:'#FF9500'}}>{text}</span>}
      })
    }
    return(
      <div className='DeliveryTable'>
        <DeliveryForm />
        <Table  
        columns={tab1Columns} 
        dataSource={delivery} 
        style={{paddingLeft:30,paddingRight:30}}
        rowKey='id'
        onRow={
          (record) => {
              return {
                onClick: () => {
                  this.handleonClick(record.id)
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