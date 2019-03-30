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
    show: false,
    x: 0,
    y: 0,
    query: {
      catalogId: '',
      subcatalogId:'',
      startDate: '',
      endDate: '',
      keywords: '', 
      ingredientType: '', 
      pageSize: '',
      current: '',
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
        ...this.state.query,
        ...params
      }
    })
  }
  //分页器的功能
  queryParams = (params={}) => {
		const newQueryParams = {
			...this.state.query,
			...params,
		}
		this.setState({
			query: newQueryParams
		});
		this.queryPurCatalog(newQueryParams);
  }
  handleCatalogChange = (current, pageSize) => {
    const newQueryParams = {
			...this.state.queryParams,
			current,
			pageSize
    }
    this.setState({
			query: newQueryParams
    })
    this.queryPurCatalog(newQueryParams)
  }
  queryIngreType = (params = {}) =>{
    const { dispatch, } = this.props;
    dispatch({
      type:'purCatalog/queryIngreType',
      payload:{
       ...params,
      }
    })
  }
  handleType = (e) => {
  this.queryParams({ingredientType:e.target.value})
  this.queryIngreType({type:e.target.value})
  }
  handleMouseOver = (record, e) => {
    this.setState({
      show: !this.state.show,
      x: e.pageX,
      y: e.pageY,
    }, () => {
      const { dispatch } = this.props;
      const skuId = record.skuId
      const id= record.id
      dispatch({
        type: 'purCatalog/queryPriceHistory',
        payload: {
           skuId:skuId,
           id:id
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
    const { purCatalog = {}, location } = this.props;
    const { catalogData = {}, historyList = [] } = purCatalog;
    const { records = [] } = catalogData;
    const tabColumns = [{
      title: '食材名称',
      dataIndex: 'viewSku',
      key: 'viewSku',
      width: 200,
      render: (text, record) => {
        const type = record.viewSku.type
        var timestamp = Date.parse(new Date());
        var isNew = (timestamp - record.createDate) < 15 * 24 * 3600 * 1000;
        return (<Link to={{ pathname: type === 'S' ? '/ingredetail' : '/excipientdetail', 
          state: { id: record.id,skuId:record.skuId } }}>
          {text.wholeName}
          {isNew && <Tag color="red" style={{ marginLeft: 8 }}>NEW</Tag>}
        </Link>)
      },
      width: '260'
    },
    {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit',
    }, {
      title: '分类',
      dataIndex: 'viewSku',
      key: 'type',
      render: (text) => {
        return (
          <span>{text.type==='F' ? '辅料' : '食材'}</span>
        )
      }
    }, {
      title: '价格（元）',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => {
        return (
          <Tooltip title="查看定价记录" >
            <span
              onClick={this.handleMouseOver.bind(this, record)}
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
            <WrappedPurForm  queryParams ={this.queryParams}
              ingredientType={this.state.query.ingredientType}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
              <div style={{ display: 'flex', }}>
                <Radio.Group defaultValue="" onChange={this.handleType}>
                  <Radio.Button value="">全部</Radio.Button>
                  <Radio.Button value="S">食材</Radio.Button>
                  <Radio.Button value="F">辅料</Radio.Button>
                </Radio.Group>
                <Alert message={'共' + catalogData.total ? catalogData.total : '0' + '条'} type="warning" showIcon className='alert' />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Table
                columns={tabColumns}
                dataSource={records}
                rowKey="id"
                pagination={false}
              />
              <Pagination
                defaultCurrent={1}
                onChange={this.handleCatalogChange}
                total={catalogData.total}
                current={catalogData.current}
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