import React from 'react'
import WrappedPurForm from '../../components/PurForm'
import TwoBread from '../../components/TwoBread'
import BreadcrumbComponent from '../../components/BreadcrumbComponent'
import { Card, Radio, Table, Alert,Tooltip,Modal } from 'antd'
import { connect } from 'dva';
import './index.less'

class PurCatalog extends React.Component {
  state = {
    DataSource: [],
    tableSource: [],
    disabled: true,
    visible: false
  }
  notPass = () => {
    var dataSource = this.state.DataSource.filter(item => item.status == 1)
    this.setState({
      tableSource: dataSource
    })
  }
  pass = () => {
    var dataSource = this.state.DataSource.filter(item => item.status == 0)
    this.setState({
      tableSource: dataSource
    })
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
    showModal = () => {
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
      render: text => <a href="/ingredetail">{text}</a>,
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
            <WrappedPurForm />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
              <div  style={{ display: 'flex', }}>
                <Radio.Group defaultValue="all" onChange={this.handleFormLayoutChange}>
                  <Radio.Button value="all" onClick={this.all}>全部</Radio.Button>
                  <Radio.Button value="ingredients" onClick={this.notPass}>食材</Radio.Button>
                  <Radio.Button value="excipient">辅料</Radio.Button>
                </Radio.Group>
                <Alert message="共9993条" type="warning" showIcon className='alert' />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Table columns={tabColumns} dataSource={catalogData} rowKey="id" />
            </div>
          </div>
        </Card>
        <div className='modalList'>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
            closable={false}
            footer={null}
            style={{ top: 300 ,right:-30}}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(({ purCatalog}) => ({
  purCatalog,    
}))(PurCatalog)