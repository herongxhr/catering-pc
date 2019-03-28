import React from 'react';
import { connect } from 'dva';
import '../PendingDeliveryDetail/index.less'
import DisDetailPageHeader from '../../components/DisDetailPageHeader'
import ExchangeApplay from '../../components/ExchangeApplay'
import AccepProductBreakdown from '../../components/AccedProductBreakdown';
import DeliveryLog from '../../components/DeliveryLog'
import Ticket from '../../components/Ticket'
import Img from "./pic.jpg"
import './index.less'
import { withRouter } from "react-router";


class AcceptedDetail extends React.Component {
  querySignature = (params = {}) => {
    const { dispatch, location } = this.props;
    const id = location.state && location.state.id;
    dispatch({
      type: 'deliveryAcce/querySignature',
      payload: {
        ...params,
        id:id
      }
    })
  }
  componentDidMount(){
    this.querySignature()
  }
  render() {
     const { signatureData } = this.props;
    return (
      <div className='AcceptedDetail'>
        <DisDetailPageHeader/>
        <ExchangeApplay/>
        <AccepProductBreakdown/>
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
export default connect(({deliveryAcce }) => ({
  signatureData:deliveryAcce.signatureData || [],
}))(ShowAcceptedDetailRouter);