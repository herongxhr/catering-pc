import React from 'react'
import { Table, Tabs, Button, Radio, Badge, Divider,Popconfirm, message } from 'antd'
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
    disabled: false,
    visible: false,
    query:{
      type:'',
      status:''
    }
  }
  queryReportmissing = (params = {}) => {
		const { dispatch } = this.props;
		dispatch({
		  type: 'report/queryReportmissing',
		  payload:{
			...params,
		  }
		})
	}
	componentDidMount() {
		 this.queryReportmissing()
   }
  handleReport = (argm) =>{
    let dataFilter={};
    if(argm.type){
      dataFilter={type:argm.type}
    }
    if(argm.status){
      dataFilter={status:argm.status}
    }
    this.setState(
      Object.assign(this.state.query, dataFilter),
      this.queryReportmissing(this.state.query)
    )
  } 
  //催促
  handleUrg = (id)=>{
    console.log(id,"111")
    this.setState({disabled:true})
  }
  //删除申请
  confirm = (id) =>{
    console.log(id,"222")
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
          return <span>已回执</span>
        }      
      }
    }, {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      render(action,record) {
        return (
          action == 1 ? <div className='opertion'>
          <a className='orders' disabled={_this.state.disabled} onClick={_this.handleUrg.bind(this,record.id)}>催促</a> 
          <Divider type="vertical" />
          <Popconfirm title="确定继续操作?" onConfirm={_this.confirm.bind(this,record.id)}>
            <a className='delete'>删除申请</a>
          </Popconfirm> 
          </div> : <span className='check'>查看详情</span>)
      }
    }];
    const { report } = this.props
    const reportList = report.reportList
    const _this = this
    return (
      <div className='reportTable'>
        <WrappedReportForm  handleReport={this.handleReport} queryReportmissing={this.queryReportmissing}/>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WrappedReportButton />
          <div>
            <Radio.Group defaultValue="all" onChange={(e)=>{this.handleReport({status:e.target.value})}}>
              <Radio.Button value="all" >全部</Radio.Button>
              <Radio.Button value="unreviewed">未审核</Radio.Button>
              <Radio.Button value="receipt">已回执</Radio.Button>
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
      </div>
    )
  }
}
const ShowReportRouter = withRouter(Report);
export default connect(({ report }) => ({
  report,
}))(ShowReportRouter);