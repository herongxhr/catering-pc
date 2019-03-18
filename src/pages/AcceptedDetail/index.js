import React from 'react';
import { connect } from 'dva';
import '../PendingDeliveryDetail/index.less'
import { PageHeader, Button, Statistic, Row, Col, Icon,} from 'antd';
import BreadcrumbComponent from '../../components/BreadcrumbComponent'
import ExchangeApplay from '../../components/ExchangeApplay'
import ProductBreakdown from '../../components/ProductBreakdown'
import DeliveryLog from '../../components/DeliveryLog'
import Ticket from '../../components/Ticket'
import Img from "./pic.jpg"
import './index.less'
const Description = ({ term, children }) => (
  <div className="description">
    <div className="term">{term}</div>
    <div className="detail">{children}</div>
  </div>
);
const content = (
  <Row>
    <Col span={14}><Description term="来源订单："><a>201812027265</a></Description></Col>
    <Col span={10}>
      <Description term="供货商：">
        金华市大鑫公司
          </Description>
    </Col>
    <Col span={14}><Description term="配送日期：">2018-12-02  周二</Description></Col>
    <Col span={10}><Description term="联系电话：">13987857348</Description></Col>
  </Row>
);

const extraContent = (
  <Row>
    <Col span={14}><Statistic title="状态" value="已验收" /></Col>
    <Col span={10}><Statistic title="总金额" prefix="￥" value={8.8 + '万'} /></Col>
  </Row>
);


class AcceptedDetail extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <div className='AcceptedDetail'>
        {/* <BreadcrumbComponent {...location} /> */}
        <div className='headerWrapper'>
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
        <ExchangeApplay/>
        <ProductBreakdown/>
        <Ticket/>
        <div className='signature'>
            <div className='signatureTitle'>签名</div>
            <div className='signaturePic'>
                <figure>
                    <img src={Img} alt=""/>
                    <figcaption>
                    验货员签字
                    </figcaption>            
                </figure>
                <figure style={{marginLeft:47}}>
                    <img src={Img} alt=""/>
                    <figcaption>
                    配送员签字
                    </figcaption>            
                </figure>
            </div>
        </div>
        <DeliveryLog/>
      </div>
    )
  }
}
export default connect(({ }) => ({
}))(AcceptedDetail);