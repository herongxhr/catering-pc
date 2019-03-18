import React from 'react'
import WrappedPurForm from '../../components/PurForm'
import BreadcrumbComponent from '../../components/BreadcrumbComponent'
import { Card, Radio, Table, Alert,Tooltip,Modal,Tag } from 'antd'
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import './index.less'
import moment from 'moment'

class PurCatalog extends React.Component {
  state = {
    disabled: true,
    visible: false,
    ingreType:'',
    pagination:{},
    query:{},
  }
  componentDidMount (){
    this.queryPurCatalog()
    this.queryPriceHistory()
  }
  queryPurCatalog = (params ={}) =>{
    const { dispatch } = this.props;
    dispatch({
      type:'purCatalog/queryPurCatalog',
      payload:{
       ...params
        }
      })     
  }
  queryParams = (params)=>{
    this.setState({
      query:params
    },()=>{
      const {pagination} = this.state
      this.queryPurCatalog({
        ...this.state.query,
        ingredientType:this.state.ingreType,
        pageSize:pagination.pageSize,
        current:pagination.current
        }
      )     
    })
  }
  handleCatalogChange = (pagination) =>{
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({
      pagination: pager,
    });
    this.queryParams();
  }
  handleType = (e) =>{
    this.setState({ingreType:e.target.value})
  }
  
  showModal = (event) => {
    var e = event || window.event;
      this.setState({
        visible: true
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false
      });
    };
    queryPriceHistory = (params={})=>{
      const { dispatch } = this.props;
      dispatch({
        type:'purCatalog/queryPriceHistory',
        payload:{
          ...params,
          }
        })   
    }
  render() {
    const {purCatalog,location} = this.props;
    const catalogData = purCatalog.catalogData.records || [];
    const historyList = purCatalog.historyList || [];
    const tabColumns = [{
      title: '食材名称',
      dataIndex: 'goodsInfo',
      key: 'goodsInfo',
      render: (text,record) => {
        var timestamp = Date.parse(new Date());
        var newDate =timestamp - record.createDate;
        if(newDate < 15*24*3600*1000 ){
          return(<Link to={{pathname:"/ingredetail",query:{id:record.id}}}>{text}<Tag color="red" style={{marginLeft:8}}>NEW</Tag></Link>)
        }else{
          return(<Link to={{pathname:"/ingredetail",query:{id:record.id}}}>{text}</Link>)
        }
    },
      width:'260'
    },
     {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit',
    }, {
      title: '分类',
      dataIndex: 'catalogName',
      key: 'catalogName',
    }, {
      title: '价格（元）',
      dataIndex: 'price',
      key: 'price',
      render: text =>{
      return(
            <Tooltip title="查看定价记录" >
              <span onMouseDown={this.showModal}>
                {text}
              </span>
            </Tooltip>)},
    }, {
      title: '最新定价时间',
      dataIndex: 'publishTime',
      key: 'publishTime',            
      render: (text) => {return <span>{moment(text).format("YYYY-MM-DD")}</span>}
    }
    ];
    return (
      <div className='purCata'>
      <BreadcrumbComponent {...location} />
        <Card>
          <div className='cataTable'>
            <WrappedPurForm queryParams={this.queryParams.bind(this)} ingreType={this.state.ingreType}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
              <div  style={{ display: 'flex', }}>
                <Radio.Group defaultValue="" onChange={this.handleType}>
                  <Radio.Button value="">全部</Radio.Button>
                  <Radio.Button value="S">食材</Radio.Button>
                  <Radio.Button value="F">辅料</Radio.Button>
                </Radio.Group>
                <Alert message={catalogData ? catalogData.length : null} type="warning" showIcon className='alert' />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Table 
                columns={tabColumns} 
                dataSource={catalogData} 
                rowKey="id"
                onChange={this.handleCatalogChange} 
                pagination={this.state.pagination}
              />
            </div>
          </div>
        </Card>
        <div className='modalList'>
          <Modal
            className='modal'
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
            closable={false}
            footer={null}
            ref={(modal)=>{this.myRef=modal}}
          >{
            historyList.map((item,index)=>{
              return(
                <li key={index}>{item.price}<span>{moment(item.publishTime).format("YYYY-MM-DD")}</span></li>
              )
            })
          }
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(({ purCatalog}) => ({
  purCatalog,    
}))(PurCatalog)