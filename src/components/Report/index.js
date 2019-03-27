import React from 'react'
import { Table,  Radio, Badge, Divider,Popconfirm, Menu, Dropdown, } from 'antd'
import { connect } from 'dva';
import WrappedReportForm from '../ReportForm'
import WrappedReportButton from '../ReportButton';
import './index.less'
import { withRouter } from "react-router";
import moment from 'moment'

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
      ingredientType:'',
      status:'',
      keywords:'',
    },
    pagination: {},
    currId:'',
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
    const {pagination} = this.state
    if(argm.ingredientType){
      dataFilter={ingredientType:argm.ingredientType}
    }
    if(argm.status){
      dataFilter={status:argm.status}
    }
    if(argm.keywords){
      dataFilter={keywords:argm.keywords}
    }
    this.setState(
      Object.assign(this.state.query, dataFilter),
      this.queryReportmissing({
        ...this.state.query,
        pageSize: pagination.pageSize,
        current: pagination.current,
      })
    )
  } 
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({
      pagination: pager,
    });
    this.queryReportmissing({
      pageSize: pagination.pageSize,
      current: pagination.current,
      ...this.state.query
    });
  }
  //催促
  handleUrg = (id)=>{
      this.setState({
        currId:id
      }) 
      const { dispatch } = this.props;
      dispatch({
        type: 'report/queryEager',
        payload:{
          id:id
        }
      })
  }
  //删除申请
  confirm = (id) =>{
    const { dispatch } = this.props;
      dispatch({
        type: 'report/queryWithdrawal',
        payload:{
          id:id
        }
      })
      window.location.reload()
  }
  //状态
  onClick = ({ key }) => {
    this.handleReport({status:key})
  };
  render() {
    const tabColumns = [{
      title: '申请日期',
      dataIndex: 'submitTime',
      key: 'submitTime',
      render:(text)=>{
        return(
          moment(text).format("YYYY-MM-DD")
        )
      }
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render(type){
        return type == 'S' ? <span>食材</span> : <span>辅料</span>
      }
    }, {
      title: '名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
      width:'270'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'Status',
      render(status) {
        if(status == 1){
          return <span><Badge status="warning" />未审核</span>
        }
        if(status == 2){
          return <span>通过</span>
        } 
        if(status == 3){
          return <span>未通过</span>
        }      
      }
    }, {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      render(action,record) {
        return (
          action == 1 ? <div className='opertion'>
         <a className='orders' disabled={record.id === _this.state.currId} onClick={_this.handleUrg.bind(this,record.id)}>催促</a> 
          <Divider type="vertical" />
          <Popconfirm title="确定继续操作?" onConfirm={_this.confirm.bind(this,record.id)}>
            <a className='delete'>删除申请</a>
          </Popconfirm> 
          </div>: <span className='check'>查看详情</span>)
      }
    }];
    const { report={} } = this.props
    const {reportList= {} }= report
    const {records=[],current,total}=reportList
    const _this = this
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key='2'>通过</Menu.Item>
        <Menu.Item key='3'>未通过</Menu.Item>
      </Menu>
    );
    return (
      <div className='reportTable'>
        <WrappedReportForm  
        handleReport={this.handleReport} 
        queryReportmissing={this.queryReportmissing}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WrappedReportButton />
          <div>
            <Radio.Group defaultValue="" onChange={(e)=>{this.handleReport({status:e.target.value})}}>
              <Radio.Button value="" >全部</Radio.Button>
              <Radio.Button value="1">未审核</Radio.Button>
              <Dropdown overlay={menu}><Radio.Button value="hz">更多</Radio.Button></Dropdown>
            </Radio.Group>
          </div>
        </div>                                                                            
        <div style={{ marginTop: 20 }}>
          <Table columns={tabColumns} 
            dataSource={records}
            rowKey="id"
            pagination={{current,total}}
            onRow={(record)=>{
              if(record.status != 1){
                 return{
                  onClick : (e) =>{
                    this.props.history.push({ 
                      pathname:"/home/outStock/reportdetail",
                      state:{id:record.id,status:record.status} 
                    })
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