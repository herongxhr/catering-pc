import React, { Component } from 'react';
import './index.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { List } from 'antd'
import { withRouter } from "react-router";
import { connect } from 'dva';
import moment from 'moment'


class ReportDetail extends Component {
    state = {
        detail: '详情',

    }
    handleReplayMess =(data) => {
        this.props.history.push({
            pathname: data.type === 'F' ?  "/excipientdetail" : '/ingredetail',
            state:{skuId:data.id}
        })
    }
    handleRelateMess = (item)=>{
        const {history} = this.props
        history.push({
            pathname: item.type === 'F' ?  "/excipientdetail" : '/ingredetail',
            state:{skuId:item.id}
        })
    }
    
    queryDetail = (params = {}) => {
        const { dispatch, location } = this.props;
        const id = location.state.id
        dispatch({
            type: 'report/queryDetail',
            payload: {
                ...params,
                id
            }
        })
    }
    componentDidMount() {
        this.queryDetail()
    }
    render() {
        const { location,detailData={} } = this.props;
        const recommendSkus= detailData.recommendSkus || []
        const viewSku = detailData.viewSku || {};
        const replayData = [viewSku];
        const status = location.state.status;
        return (
            <div className='reportdetail'>
                <div className='detailheader'>
                    <div className='breadwrapper'><BreadcrumbComponent {...location} /></div>
                </div>
                <div className='detailcontent'>
                    <div className='apply'>
                        <div className='applyTitle'>
                            入库申请
                        </div>
                        <ul>
                            <li>
                                申请日期：
                                <span>{moment(detailData.submitTime).format('YYYY-MM-DD')}</span>
                            </li>
                            <li style={{ marginLeft: 100, marginRight: 100 }}>
                                名称：<span>{detailData.goodsName}</span>
                            </li>
                            <li>
                                类型：<span>{detailData.type ==='S' ? '食材' : '辅料'}</span>
                            </li>
                            <li>备注：<span>{detailData.description}</span></li>
                        </ul>
                    </div>
                    <div className='review'>
                        <div className='reviewTitle'>
                            审核结果
                        </div>
                        <ul style={{ height: 70, borderBottom: '1px solid #E8E8E8' }}>
                            <li>审核时间：
                                <span>{moment(detailData.replyTime).format('YYYY-MM-DD')}</span>
                            </li>
                            <li style={{ marginLeft: 100 }}>
                                状态：
                                <span>{detailData.status === '1'
                                ? '未审核'
                                : (detailData.status === '2' ? '通过' : '未通过')}</span>
                            </li>
                        </ul>
                        <div className='receiptinfo'>
                            回执信息
                        </div>
                        {
                            status === '2' ?
                                <div className='mess'>
                                    <List
                                        bordered
                                        dataSource={replayData}
                                        renderItem={item => (
                                            <List.Item onClick={this.handleReplayMess.bind(this,item)}
                                            actions={[<a style={{ color: '#54C4CE' }}>查看详情</a>]}>
                                                {item.wholeName}
                                            </List.Item>)}
                                    />
                                </div> :
                                <div className='mess'>
                                    {detailData.replyContent}
                                </div>
                        }
                    </div>
                    {status === '2' ?
                        <div className='relategood'>
                            <div className='goodTitle'>
                                相关商品
                            </div>
                            <div className='goodlist'>
                                <List
                                    bordered
                                    dataSource={recommendSkus}
                                    renderItem={item => (
                                        <List.Item onClick={this.handleRelateMess.bind(this,item)} 
                                         actions={[<a style={{ color: '#54C4CE' }}>查看详情</a>]}>
                                             {item.wholeName}
                                        </List.Item>)}
                                />
                            </div>
                        </div> : ''
                    }
                </div>
            </div>
        )
    }
}
const ShowReportDetailRouter = withRouter(ReportDetail);
export default connect(({ report }) => ({
    detailData:  report.detailData,
}))(ShowReportDetailRouter)