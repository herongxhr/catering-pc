import React from 'react'
import { Table, Tabs, Button, Radio, Badge, Divider, Menu, Dropdown,Modal } from 'antd'
import { connect } from 'dva';
import WrappedReportForm from '../ReportForm'
import WrappedReportButton from '../ReportButton';
import './index.less'
import { withRouter } from "react-router";

const TabPane = Tabs.TabPane;


const data=[{
  "key": 1,
  "date": "2019-01-29",
  "type": "0",
  "name": "竹箫笋",
  "remark": "春季小笋，请尽快入库",
  "status": "0"
},
{
  "key": 2,
  "date": "2019-01-28",
  "type": "1",
  "name": "海天酱油",
  "remark": "280克的那种",
  "status": "0"
},
{
  "key": 3,
  "date": "2019-01-27",
  "type": "0",
  "name": "老豆腐",
  "remark": "手工制作的带洞的",
  "status": "0"
},  
{
  "key": 4,
  "date": "2019-01-26",
  "type": "1",
  "name": "胡椒粉",
  "remark": "什么牌都行",
  "status": "1"
}
]
class Report extends React.Component {
  state = {
    DataSource: [],
    tableSource: [],
    disabled: false,
    visible: false,
    reportKey:'all'
  }

  onClick = (value) => {
    this.props.queryReportmissing({more:value.key})
  };
  handleReport = (e) =>{
    const { queryReportmissing } = this.props;
    queryReportmissing({status:e.target.value})
  } 
  handleUrg = () =>{
    this.setState({disabled:true})
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    const tabColumns = [{
      title: '申请日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render(type){
        return type == 0 ? <span>食材</span> : <span>辅料</span>
      }
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width:'270'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'Status',
      render(status) {
        if(status == 1){
          return <span><Badge status="warning" />未审核</span>
        }
        if(status == 0){
          return <span>已通过</span>
        }
        if(status == 2){
          return <span>未通过</span>
        }
             
      }
    }, {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      render(action) {
        return (
          action == 1 ? <div className='opertion'>
          <Button className='orders' disabled={_this.state.disabled} onClick={()=>{_this.setState({disabled:true})}}>催促</Button> <Divider type="vertical" /> <a className='delete' onClick={_this.showModal} >撤回申请</a>
        </div> : <span className='check'>查看详情</span>)
      }
    }];
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="pass">已通过</Menu.Item>
        <Menu.Item key="notpass">未通过</Menu.Item>
      </Menu>
    );
    const { reportList } = this.props
    const _this = this
    return (
      <div className='reportTable'>
        <WrappedReportForm />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WrappedReportButton />
          <div>
            <Radio.Group defaultValue="all" onChange={this.handleReport}>
              <Radio.Button value="all" >全部</Radio.Button>
              <Radio.Button value="nopass">未审核</Radio.Button>
              <Dropdown overlay={menu}><Radio.Button value="more">更多</Radio.Button></Dropdown>
            </Radio.Group>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table columns={tabColumns} 
            dataSource={reportList}
            rowKey="id"
            onRow={(record)=>{
              if(record.status != 1){
                 return{
                  onClick : (e) =>{
                    this.props.history.push({ pathname:"/reportdetail", query:{id:record.id} })
                   }    
                }
              }   
               }}
          />
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}
const ShowReportRouter = withRouter(Report);
export default connect(( {report} ) => ({
  report,
}))(ShowReportRouter);