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
    this.props.history.push({ pathname:"/delivery/deliveryAcceDetail", query:{id:id} })
  }
  componentDidMount() {
    
  }

  render() {
    const tab1Columns = [{
      title: '配送单号',
      dataIndex: 'order',
      key: 'order',
    }, {
      title: '供应商',
      dataIndex: 'Supplier',
      key: 'Supplier',
    }, {
      title: '配送日期',
      dataIndex: 'Delivery',
      key: 'Delivery',
    }, {
      title: '摘要',
      dataIndex: 'abstract',
      key: 'abstract',
    },
     ];
    const {delivery,tabkey} = this.props;
    if(tabkey == 'pendingDelivery'){
      tab1Columns.push({
        title: '操作',
        dataIndex: 'Operation',
        key: 'Operation',
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