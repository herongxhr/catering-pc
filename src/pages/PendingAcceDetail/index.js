import React from 'react';
import { connect } from 'dva';
import '../PendingDeliveryDetail/index.less'
import DisDetailPageHeader from '../../components/DisDetailPageHeader'
import ExchangeApplay from '../../components/ExchangeApplay'
import ProductBreakdown from '../../components/ProductBreakdown'
import DeliveryLog from '../../components/DeliveryLog'
import Ticket from '../../components/Ticket'
import { withRouter } from "react-router";

class PendingAcceDetail extends React.Component {
  render() {
   
    return (
      <div className='pendingAcceDetail'>
        <DisDetailPageHeader/>
        <ExchangeApplay/>
        <ProductBreakdown/>
        <Ticket/>
        <DeliveryLog/>
      </div>
    )
  }
}
const ShowPendingAcceDetailRouter = withRouter(PendingAcceDetail);
export default connect(({deliveryAcce }) => ({
  deliveryAcce,
}))(ShowPendingAcceDetailRouter);