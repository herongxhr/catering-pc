import React from 'react'
import WrappedPurForm from '../../components/PurForm'
import TwoBread from '../../components/TwoBread'
import BreadcrumbComponent from '../../components/BreadcrumbComponent'
import { Card, Radio, Table, Alert,Tooltip } from 'antd'
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
    showModal = () =>{
      var tooltip=this.myref;
      tooltip.style.display='block'
    }
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
              <span onClick={this.showModal} className='tooltipwrapper'>
                {text}
                <ul className='tooltip' ref={ref=>{this.myref=ref}}></ul>
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
      </div>
    )
  }
}

export default connect(({ purCatalog}) => ({
  purCatalog,    
}))(PurCatalog)