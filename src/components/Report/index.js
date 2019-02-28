import React from 'react'
import { Table, Tabs, Button, Radio, Badge, Divider, Menu, Dropdown, } from 'antd'
import { connect } from 'dva';
import WrappedReportForm from '../ReportForm'
import WrappedReportButton from '../ReportButton';
import './index.less'
import { withRouter } from "react-router";

const TabPane = Tabs.TabPane;

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
    return status == 1 ? <span><Badge status="warning" />未审核</span> : <span>已通过</span>
  }
}, {
  title: '操作',
  dataIndex: 'status',
  key: 'status',
  render(action) {
    return (
      action == 1 ? <div className='opertion'>
      <a className='orders'>催促</a> <Divider type="vertical" /> <a className='delete'>撤回申请</a>
    </div> : <span className='check'>查看详情</span>)
  }
}];
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
    disabled: true,
    visible: false
  }
  queryReportmissing = (params = {}) => {
    const { dispatch } = this.props;
    //请求待办事项
    dispatch({
      type: 'report/queryReportmissing',
      payload:{
        ...params
      }
    })
  }
  componentDidMount() {
    this.queryReportmissing()
  }
  onClick = (value) => {
    console.log(value)
  }; 
  render() {
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="pass">已通过</Menu.Item>
        <Menu.Item key="notpass">未通过</Menu.Item>
      </Menu>
    );
    const { report } = this.props
    const reportList = report.reportList
    return (
      <div className='reportTable'>
        <WrappedReportForm />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WrappedReportButton />
          <div>
            <Radio.Group defaultValue="all" onChange={(value)=>{console.log(value.target.value)}}>
              <Radio.Button value="all" >全部</Radio.Button>
              <Radio.Button value="nopass">未审核</Radio.Button>
              <Dropdown overlay={menu}><Radio.Button value="more">更多</Radio.Button></Dropdown>
            </Radio.Group>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table columns={tabColumns} dataSource={reportList}
            onRow={(record)=>{
                    return{
                      onClick : (e) =>{
                        this.props.history.push({ pathname:"/reportdetail", query:{id:record.id} })
                       }    
                    }
               }}
          />
        </div>
      </div>
    )
  }
}
const ShowReportRouter = withRouter(Report);
export default connect(( {report} ) => ({
  report,
}))(ShowReportRouter);