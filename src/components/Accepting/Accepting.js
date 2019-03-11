import React, { Component } from 'react';
import './Accepting.less';
import { Table,Badge } from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router-dom';

const Columns = [{
    title: '配送单号',
    dataIndex: 'distributionNo',
    key: 'distributionNo',
    render:(text,record) =>{
      if(record.status == '0'){
        return(<Link to={{ pathname:"/select",query:{id:record.id} }}>{text}</Link>) 
      }
      if(record.status == '1'){
        return(<Link to={{ pathname:"/select",query:{id:record.id} }}>{text}</Link>) 
      }
      if(record.status == '2'){
        return(<Link to={{ pathname:"/deliveryAcceDetail/",query:{id:record.id} }}>{text}</Link>) 
      }
    } 
  }, {
    title: '供应商',
    dataIndex: 'supplierId',
    key: 'supplierId',
    width:270
  }, {
      title: '摘要',
      dataIndex: 'abstract',
      key: 'abstract',
      width:300
  }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status){
        if(status == '0'){
          return (<span> <Badge status="success" />待验收</span>)
        }
        if(status == '1'){
          return (<span> <Badge status="warning" />待配送</span>)
        }
        if(status == '2'){
          return (<span> <Badge status="default" />已验收</span>)
        }
      },
      width:160
  },{
    title: '配送日期',
    dataIndex: 'distributionDate',
    key: 'distributionDate',
  }];
  
class Accepting extends Component {
    state={
        pagination: {},
    }
    
    componentDidMount() {
       this.props.queryList()
      }
      handleTableChange = (pagination) =>{
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.props.queryList({
          current:pagination.current,
          pageSize:pagination.pageSize
        })
      }
    render() {
      const { distributionList }= this.props
        return ( 
        <div className="accepting">
           <Table 
           columns={Columns} 
           dataSource={distributionList} 
           onChange={this.handleTableChange} 
           pagination={this.state.pagination}
           rowKey="id"
           pagination={false}
           /> 
        </div>
        );
    }
    }

    export default connect(( {accept} ) => ({
      accept,
    }))(Accepting); 
