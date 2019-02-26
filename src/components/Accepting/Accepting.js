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
    queryList = (params = {}) => {
      const { dispatch,key } = this.props;
      //请求待办事项
      dispatch({
        type: 'accept/queryList',
        payload:{
          timeType:key,
          ...params
        }
      })
    }
    componentDidMount() {
       this.queryList()
      }
      handleTableChange = (pagination) =>{
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.queryList({
          current:pagination.current,
          pageSize:pagination.pageSize
        })
      }
    render() {
      const { accept }= this.props
      const distributionList = accept.distributionList.records || [];
        return ( 
        <div className="accepting">
           <Table 
           columns={Columns} 
           dataSource={distributionList} 
           onChange={this.handleTableChange} 
           pagination={this.state.pagination}
           rowKey="id"/> 
        </div>
        );
    }
    }

    export default connect(( {accept} ) => ({
      accept,
    }))(Accepting); 
