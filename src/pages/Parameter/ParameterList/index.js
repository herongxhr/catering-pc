import React from 'react'
import { List , Table} from 'antd'

import './index.less'

const columns = [{
  title:'商品',
  dataIndex:'commodity',
  key:'commodity'
},{
  title:'单位',
  dataIndex:'unit',
  key:'unit'
},{
  title:'单价(元)',
  dataIndex:'price',
  key:'price'
},{
  title:'验收数量',
  dataIndex:'number',
  key:'number'
},{
  title:'验收总价',
  dataIndex:'totalPrice',
  key:'totalPrice'
},]

const dataSource = [{
  commodity:'名称+规格参数',
  unit:'斤',
  price:'26',
  number:'20',
  totalPrice:'520'
},{
  commodity:'名称+规格参数',
  unit:'斤',
  price:'26',
  number:'20',
  totalPrice:'520'
},{
  commodity:'名称+规格参数',
  unit:'斤',
  price:'26',
  number:'20',
  totalPrice:'520'
},{
  commodity:'名称+规格参数',
  unit:'斤',
  price:'26',
  number:'20',
  totalPrice:'520'
},]


class ParameterList extends React.Component {
  state = {
    showTable:false
  }

  handleShow = () => {
    this.setState({
      showTable:!this.state.showTable
    })
  }

  render() {
    const {date , number , price} = this.props
    return(
      <div style={{marginBottom:'20px',border:'1px solid #D9D9D9'}}>
        <List.Item actions={[<a onClick={this.handleShow}>展开</a>]}>
          <div className='ParameterDetail-List'>
            <p>配送日期:<span>{date}</span></p>
            <p>配送单号:<span style={{color:'#54C4CE'}}>{number}</span></p>
            <p>合计金额:<span style={{color:'#F5222D'}}>{price}</span></p>
          </div>
        </List.Item>
        <Table columns={columns} dataSource={dataSource} pagination={false} className={this.state.showTable ? 'show': 'hidden'} />
      </div>
    )
  }
}

export default ParameterList