import React from 'react'
import WrappedPurForm from '../../components/PurForm'
import BreadcrumbComponent from '../../components/BreadcrumbComponent'
import { Card, Radio, Table, Alert, Tooltip, Tag, Pagination, } from 'antd'
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import './index.less'
import moment from 'moment'

class PurCatalog extends React.Component {
  state = {
    disabled: true,
    visible: false,
    ingreType: '',
    pageSize: '',
    current: 1,
    show: false,
    x: 0,
    y: 0,
    query: {
      catalogId: '',
      startDate: '',
      endDate: '',
      searchKey: '',
    },
  }
  componentDidMount() {
    this.queryPurCatalog()
  }
  queryPurCatalog = (params = {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'purCatalog/queryPurCatalog',
      payload: {
        ...params
      }
    })
  }
  //分页器的功能
  queryParams = (data) => {
    let dataFilter = {}
    if (data.catalogId) {
      dataFilter = { catalogId: data.catalogId }
    }
    if (data.orderTime) {
      const startDate = moment(data.orderTime[0]).format('YYYY-MM-DD');
      const endDate = moment(data.orderTime[1]).format('YYYY-MM-DD');
      dataFilter = { startDate: startDate };
      dataFilter = { endDate: endDate };
    }
    if (data.searchKey) {
      dataFilter = { searchKey: data.searchKey }
    }
    this.setState(Object.assign(this.state.query, dataFilter))
  }
  handleCatalogChange = (current, pageSize) => {
    this.setState({
      current: current,
      pageSize: pageSize
    }, () => {
      this.queryPurCatalog({
        ...this.state.query,
        ingredientType: this.state.ingreType,
        pageSize: this.state.pageSize,
        current: this.state.current
      })
    })

  }
  handleType = (e) => {
    this.setState({ ingreType: e.target.value })
  }

  handleMouseOver = (id, e) => {
    this.setState({
      show: !this.state.show,
      x: e.pageX, 
      y: e.pageY,
    }, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'purCatalog/queryPriceHistory',
        payload: {
          skuId: id
        }
      })
      if (this.state.show) {
        this.myRef.style.display = 'block';
      }
      else {
        this.myRef.style.display = 'none';
      }
    })
  }
  render() {
    const { purCatalog, location } = this.props;
    const catalogData = purCatalog.catalogData.records || [];
    const historyList = purCatalog.historyList || [];
    const tabColumns = [{
      title: '食材名称',
      dataIndex: 'goodsInfo',
      key: 'goodsInfo',
      render: (text, record) => {
        var timestamp = Date.parse(new Date());
        var isNew = (timestamp - record.createDate) < 15 * 24 * 3600 * 1000;
        {
         return  isNew ? <Link to={{pathname: '/ingredetail',state:{id:record.id}}}
          >{text}<Tag color="red" style={{ marginLeft: 8 }}>NEW</Tag></Link> 
          : 
          <Link to={{pathname: '/ingredetail',state:{id:record.id}}}>{text}</Link>
        }

      },
      width: '260'
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
      render: (text, record) => {
        return (
          <Tooltip title="查看定价记录" >
            <span
              onClick={this.handleMouseOver.bind(this, record.id)}
            >
              {text}
            </span>
          </Tooltip>)
      },
    }, {
      title: '最新定价时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      render: (text) => { return <span>{moment(text).format("YYYY-MM-DD")}</span> }
    }
    ];
    const { x, y } = this.state;
    return (
      <div className='purCata'>
        <BreadcrumbComponent {...location} />
        <Card>
          <div className='cataTable'>
            <WrappedPurForm queryPurCatalog={this.queryPurCatalog.bind(this)}
              ingreType={this.state.ingreType}
              current={this.state.current}
              pageSize={this.state.pageSize}
              queryParams={this.queryParams.bind(this)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
              <div style={{ display: 'flex', }}>
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
                pagination={false}
              />
              <Pagination
                defaultCurrent={1}
                onChange={this.handleCatalogChange}
                total={purCatalog.catalogData.total}
                current={this.state.current}
                showSizeChanger
                showQuickJumper />
            </div>
          </div>
        </Card>
        <div className='modalList'
          style={{ position: 'absolute', top: y, left: x, display: 'none' }}
          ref={(node) => this.myRef = node}
        >
          {
            historyList.map((item, index) => {
              return (
                <li key={index}><span>{item.price}</span>{moment(item.publishTime).format("YYYY-MM-DD")}</li>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(({ purCatalog }) => ({
  purCatalog,
}))(PurCatalog)