import React from 'react'
import WrappedPurForm from '../../components/PurForm'
import TwoBread from '../../components/TwoBread'
import BreadcrumbComponent from '../../components/BreadcrumbComponent'
import { Card, Radio, Table, Alert,Tooltip,Modal } from 'antd'
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import './index.less'

class PurCatalog extends React.Component {
  state = {
    disabled: true,
    visible: false,
    query:{
      ingreType:'',
      orderTime:['',''],
      status:''
    }
  }
  queryPurCatalog = (params = {}) =>{
    const { dispatch } = this.props;
    //请求待办事项
    dispatch({
      type:'purCatalog/queryPurCatalog',
      payload:{
       ...params
      }
    })
  }
  componentDidMount (){
    this.queryPurCatalog()
    }
  handlePurCatalog = (obj) =>{
    let data={};
    if(obj.ingreType){
      data={ ingreType:obj.ingreType}
    }
    if(obj.status){
      data={status:obj.status}
    }
    if(obj.orderTime){
      data={orderTime:obj.orderTime}
    }
    this.setState(
      Object.assign(this.state.query, data),
      this.queryPurCatalog(this.state.query)
    )
  }
  showModal = (event) => {
    var e = event || window.event;
    console.log(e.clientX,e.clientY,'11111')
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
  render() {
    const {purCatalog,location} = this.props;
    const catalogData = purCatalog.catalogData;
    const tabColumns = [{
      title: '食材名称',
      dataIndex: 'ingredientName',
      key: 'ingredientName',
      render: (text,record) => {
      return(<Link to={{pathname:"/ingredetail",query:{id:record.id}}}>{text}</Link>)
    },
      width:'260'
    }, {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit',
    }, {
      title: '分类',
      dataIndex: 'type',
      key: 'type',
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
      dataIndex: 'newtime',
      key: 'newtime',
    }
    ];
    return (
      <div className='purCata'>
      <BreadcrumbComponent {...location} />
        <Card>
          <div className='cataTable'>
            <WrappedPurForm handlePurCatalog={this.handlePurCatalog}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
              <div  style={{ display: 'flex', }}>
                <Radio.Group defaultValue="all" onChange={(e)=>{this.handlePurCatalog({status:e.target.value})}}>
                  <Radio.Button value="all">全部</Radio.Button>
                  <Radio.Button value="ingredients">食材</Radio.Button>
                  <Radio.Button value="excipient">辅料</Radio.Button>
                </Radio.Group>
                <Alert message={catalogData.length} type="warning" showIcon className='alert' />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Table columns={tabColumns} dataSource={catalogData} rowKey="id" />
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
          >
            <li>28元<span>2018-11-12</span></li>
            <li>28元<span>2018-11-12</span></li>
            <li>28元<span>2018-11-12</span></li>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(({ purCatalog}) => ({
  purCatalog,    
}))(PurCatalog)