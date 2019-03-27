import React from 'react';
import { connect } from 'dva';
import './index.less'
import DisDetailPageHeader from '../../components/DisDetailPageHeader'
import ExchangeApplay from '../../components/ExchangeApplay'
import ProductBreakdown from '../../components/ProductBreakdown'
import DeliveryLog from '../../components/DeliveryLog'
import { withRouter } from "react-router";

class PendingDeliveryDetail extends React.Component {
  render() {
    return (
      <div className='deliveryDetail'>
        <DisDetailPageHeader/>
        <ExchangeApplay/> 
        <ProductBreakdown/>
        <DeliveryLog/>
      </div>
    )
  }
}
const ShowPendingDeliveryDetailRouter = withRouter(PendingDeliveryDetail);
export default connect(({ deliveryAcce }) => ({
  deliveryAcce,
}))(ShowPendingDeliveryDetailRouter);