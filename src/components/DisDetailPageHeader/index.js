import React from 'react';
import { connect } from 'dva';
import { PageHeader, Button, Statistic, Row, Col, Icon, Alert } from 'antd';
import Bread from '../../components/Bread'
import { withRouter } from "react-router";
import orderPic from './orderPic.png';
import moment from 'moment'

const Description = ({ term, children, }) => (
    <div className="description">
        <div className="term">{term}</div>
        <div className="detail">{children}</div>
    </div>
);
const bread = [{
    href: '/delivery',
    breadContent: '配送验收'
}, {
    href: '/delivery',
    breadContent: '待配送'
}, {
    href: '/delivery',
    breadContent: '详情'
}]

class DisDetailPageHeader extends React.Component {
    queryDistributionDetail = (params = {}) => {
        const { dispatch, location } = this.props;
        const id = location.state && location.state.id;
        dispatch({
            type: 'deliveryAcce/queryDistributionDetail',
            payload: {
                ...params,
                id
            }
        })
    }
    componentDidMount() {
        this.queryDistributionDetail()
    }
    render() {
        const { detailData = {} } = this.props
        const supplier=detailData.supplier || {}
        const content = (
            <Row >
                <Col span={13} offset={1}>
                    <Description term="来源订单：">
                        <a onClick={() => {
                            this.props.history.push(
                                { pathname: "/purOrder/details", state: {} }
                            )
                        }}>{detailData.orderNo}</a>
                    </Description>
                </Col>
                <Col span={10}>
                    <Description term="供货商：">
                        {supplier.supplierName}
                    </Description>
                </Col>
                <Col span={13} offset={1}>
                    <Description term="配送日期：">
                        {moment(detailData.distributionDate).format('YYYY-MM-DD dddd')}
                    </Description>
                </Col>
                <Col span={10}><Description term="联系电话：">
                    {supplier.mobile}
                </Description></Col>
            </Row>
        );
        const extraContent = (
            <Row>
                <Col span={14}><Statistic title="状态"
                    value={detailData.status === '1'
                        ? '待配送'
                        : (detailData.status === '2' ? '待验收' : '已验收')} /></Col>
                <Col span={10}>
                    <Statistic title="总金额" prefix="￥"
                        value={detailData.total ? detailData.total : '0' } />
                </Col>
            </Row>
        );
        return (
            <div>
                {/* <BreadcrumbComponent {...location} /> */}
                <Bread bread={bread} value='/delivery'></Bread>
                <div className='headerWrapper' style={{ margin: '3px auto 0px auto' }}>
                    <div className='pageHeader'>
                        <PageHeader
                            title={<span><img src={orderPic} alt='配送单号' style={{ marginRight: 10 }} />配送单号:</span>}
                            subTitle={<span>{detailData.distributionNo}</span>}
                            extra={[
                                <Button key="1">打印</Button>,
                            ]}
                        >
                            <div className="wrap">
                                <div className="contentpadding">{content}</div>
                                <div className="extraContent">{extraContent}</div>
                            </div>
                        </PageHeader>
                    </div>
                </div>
            </div>
        )
    }
}
const ShowDisDetailPageHeaderRouter = withRouter(DisDetailPageHeader);
export default connect(({ deliveryAcce }) => ({
    detailData: deliveryAcce.detailData,
}))(ShowDisDetailPageHeaderRouter);