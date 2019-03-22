import React from 'react';
import { connect } from 'dva';
import './index.less'
import { PageHeader, Button, Statistic, Row, Col, Icon, Alert } from 'antd';
import ExchangeApplay from '../../components/ExchangeApplay'
import ProductBreakdown from '../../components/ProductBreakdown'
import DeliveryLog from '../../components/DeliveryLog'
import Bread from '../../components/Bread'
import { withRouter } from "react-router";


const Description = ({ term, children, }) => (
  <div className="description">
    <div className="term">{term}</div>
    <div className="detail">{children}</div>
  </div>
);
const bread = [{
  href:'/delivery',
  breadContent:'配送验收'
},{
  href:'/delivery',
  breadContent:'待配送'
},{
  href:'/delivery',
  breadContent:'详情'
}]

const extraContent = (
  <Row>
    <Col span={14}><Statistic title="状态" value="待配送" /></Col>
    <Col span={10}><Statistic title="总金额" prefix="￥" value={8.8 + '万'} /></Col>
  </Row>
);


class PendingDeliveryDetail extends React.Component {
  render() {
    const { location } = this.props;
    const status = location.state.status
    const content = (
      <Row >
        <Col span={14}>
          <Description term="来源订单：">
            <a onClick={()=>{this.props.history.push(
                { pathname:"/purOrder/details", state:{} }
              )}}>201812027265</a>
          </Description>
      </Col>
        <Col span={10}>
          <Description term="供货商：">
            金华市大鑫公司
          </Description>
        </Col>
        <Col span={14}><Description term="配送日期：">2018-12-02  周二</Description></Col>
        <Col span={10}><Description term="联系电话：">13987857348</Description></Col>
      </Row>
    );
    return (
      <div className='deliveryDetail'>
        {/* <BreadcrumbComponent {...location} /> */}
        <Bread bread={bread} value='/delivery'></Bread>
        <div className='headerWrapper' style={{margin:'3px auto 0px auto'}}>
          <div className='pageHeader'>
            <PageHeader
              title={<span><Icon type="bell" />配送单号:</span>}
              subTitle={<span>201812027265-0102</span>}
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
        { status==0 ? <ExchangeApplay/> : null}
        <ProductBreakdown/>
        <DeliveryLog/>
      </div>
    )
  }
}
const ShowPendingDeliveryDetailRouter = withRouter(PendingDeliveryDetail);
export default connect(({ }) => ({
}))(ShowPendingDeliveryDetailRouter);