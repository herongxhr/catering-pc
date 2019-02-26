import React from 'react'
import { Table, Tabs, Button, Radio, Badge, Divider, Menu, Dropdown, } from 'antd'
import Axios from '../../axios'
import WrappedReportForm from '../ReportForm'
import WrappedReportButton from '../ReportButton';
import './index.less'

const TabPane = Tabs.TabPane;

const tabColumns = [{
  title: '申请日期',
  dataIndex: 'date',
  key: 'date',
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render(status) {
    return status == 1 ? <span><Badge status="warning" />未审核</span> : <span>已通过</span>
  }
}, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render(action) {
    return action == 1 ? <div className='opertion'>
      <Button className='orders' onClick={() => { this.setState({ disabled: false }) }}>催促</Button> <Divider type="vertical" /> <a className='delete' onClick={this.showModal}>撤回申请</a>
    </div> : <a className='check' href='/reportDetail'>查看详情</a>
  }
}];
const onClick = (value) => {
  console.log(value)
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="pass">已通过</Menu.Item>
    <Menu.Item key="notpass">未通过</Menu.Item>
  </Menu>
);

class Report extends React.Component {
  state = {
    DataSource: [],
    tableSource: [],
    disabled: true,
    visible: false
  }

  componentDidMount() {

  }

  all = () => {
    this.setState({
      tableSource: this.state.DataSource
    })
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
  more = () => {

  }

  render() {
    return (
      <div className='reportTable'>
        <WrappedReportForm />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WrappedReportButton />
          <div>
            <Radio.Group defaultValue="all" onChange={this.handleFormLayoutChange}>
              <Radio.Button value="all" onClick={this.all}>全部</Radio.Button>
              <Radio.Button value="未下单" onClick={this.notPass}>未审核</Radio.Button>
              <Dropdown overlay={menu}><Radio.Button value="more">更多</Radio.Button></Dropdown>
            </Radio.Group>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table columns={tabColumns} dataSource={this.state.tableSource} />
        </div>
      </div>
    )
  }
}

export default Report;