/*
 * @Author: suwei 
 * @Date: 2019-03-23 10:48:22 
 * @Last Modified by: suwei
 * @Last Modified time: 2019-03-25 10:08:16
 */
import React from 'react'
import { List , Table} from 'antd'
import { connect } from 'dva';

import './index.less'

const columns = [{
  title:'商品',
  dataIndex:'summary',
  key:'summary'
},{
  title:'单位',
  dataIndex:'unit',
  key:'unit'
},{
  title:'单价(元)',
  dataIndex:'distributionPrice',
  key:'distributionPrice'
},{
  title:'验收数量',
  dataIndex:'distributionQuantity',
  key:'distributionQuantity'
},{
  title:'验收总价',
  dataIndex:'total',
  key:'total'
},]

// const dataSource = [{
//   commodity:'名称+规格参数',
//   unit:'斤',
//   price:'26',
//   number:'20',
//   totalPrice:'520'
// },{
//   commodity:'名称+规格参数',
//   unit:'斤',
//   price:'26',
//   number:'20',
//   totalPrice:'520'
// },{
//   commodity:'名称+规格参数',
//   unit:'斤',
//   price:'26',
//   number:'20',
//   totalPrice:'520'
// },{
//   commodity:'名称+规格参数',
//   unit:'斤',
//   price:'26',
//   number:'20',
//   totalPrice:'520'
// },]


class ParameterList extends React.Component {
  state = {
    showTable:false
  }

  handleShow = () => {
    this.setState({
      showTable:!this.state.showTable
    })
  }

  queryParameterUnfoldItem(id) {
    const { dispatch  } = this.props
    dispatch({
      type:'parameter/queryParameterUnfoldItem',
      payload: {
        id,
        // startDate:location.startDate,
      }
    })
    this.handleShow()

  }


  render() {
    const {date , number , price , id , ParameterUnfoldItem} = this.props
    const { records } = ParameterUnfoldItem
    return(
      <div style={{marginBottom:'20px',border:'1px solid #D9D9D9'}}>
        <List.Item actions={[<a onClick={e => this.queryParameterUnfoldItem(id)}>展开</a>]}>
          <div className='ParameterDetail-List'>
            <p>配送日期:<span>{date}</span></p>
            <p>配送单号:<span style={{color:'#54C4CE'}}>{number}</span></p>
            <p>合计金额:<span style={{color:'#F5222D'}}>{price}</span></p>
          </div>
        </List.Item>
        <Table columns={columns} dataSource={records} pagination={false} className={this.state.showTable ? 'show': 'hidden'} />
      </div>
    )
  }
}

export default connect(({parameter})=>({ParameterUnfoldItem:parameter.ParameterUnfoldItem}))
(ParameterList);