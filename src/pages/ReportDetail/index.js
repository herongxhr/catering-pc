import React, { Component } from 'react';
import './index.less';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { List } from 'antd'
import { withRouter } from "react-router";
import { connect } from 'dva';
import moment from 'moment'

const data = [
    '豆瓣酱/海天/280g/瓶',
];
const gooddata = [
    '豆瓣酱/海天/580g/瓶',
    '豆瓣酱/美味鲜/280g/瓶',
    '豆瓣酱/味事达/1kg/瓶'
]
class ReportDetail extends Component {
    state = {
        detail: '详情',

    }
    componentDidMount() {
        this.queryDetail()
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
    render() {
        const { location,detailData={} } = this.props;
        const { viewSku={},recommendSkus=[] } = detailData
        let data = viewSku.goodsName+'/'
        + viewSku.brand +'/'+ (viewSku.type === 'S' ? viewSku.propertySimple : viewSku.spec)
        const replayData = [data];
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
                                <div className='mess' onClick={() => {
                                    this.props.history.push({
                                        pathname: "/excipientdetail",
                                    })
                                }}>
                                    <List
                                        bordered
                                        dataSource={replayData}
                                        renderItem={item => (
                                            <List.Item actions={[<a style={{ color: '#54C4CE' }}>查看详情</a>]}>
                                                {item}
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
                                    dataSource={gooddata}
                                    renderItem={item => (
                                        <List.Item onClick={() => { this.props.history.push('/excipientdetail') }} actions={[<a style={{ color: '#54C4CE' }}>查看详情</a>]}>
                                            {item}
                                        </List.Item>)}
                                />
                            </div>
                        </div> : null
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