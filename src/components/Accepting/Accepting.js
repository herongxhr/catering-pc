import React, { Component } from 'react';
import './Accepting.less';
import { Table, } from 'antd';
import { connect } from 'dva';

const Columns = [{
    title: '配送单号',
    dataIndex: 'distributionNo',
    key: 'distributionNo',
  }, {
    title: '供应商',
    dataIndex: 'supplierId',
    key: 'supplierId',
  }, {
    title: '配送日期',
    dataIndex: 'distributionDate',
    key: 'distributionDate',
  }, {
      title: '摘要',
    dataIndex: 'abstract',
      key: 'abstract',
      width:260
    //   render: abstract => (
    //   <span>
    //     {abstract.map((item,i) => item)}
    //   </span>
    // ),
  }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status){
        if(status == '2'){
          return (<a style={{color:'#FF9500'}}>未验收</a>)
        }
        if(status == '3'){
          return ('已验收')
        }
	}
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
