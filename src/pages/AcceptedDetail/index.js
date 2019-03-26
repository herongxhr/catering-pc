import React from 'react';
import { connect } from 'dva';
import '../PendingDeliveryDetail/index.less'
import DisDetailPageHeader from '../../components/DisDetailPageHeader'
import ExchangeApplay from '../../components/ExchangeApplay'
import ProductBreakdown from '../../components/ProductBreakdown'
import DeliveryLog from '../../components/DeliveryLog'
import Ticket from '../../components/Ticket'
import Img from "./pic.jpg"
import './index.less'
import { withRouter } from "react-router";


class AcceptedDetail extends React.Component {
  render() {
    // const { location } = this.props;
    // const status = location.state.status;
    
    return (
      <div className='AcceptedDetail'>
        <DisDetailPageHeader/>
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
const ShowAcceptedDetailRouter = withRouter(AcceptedDetail);
export default connect(({ }) => ({
}))(ShowAcceptedDetailRouter);