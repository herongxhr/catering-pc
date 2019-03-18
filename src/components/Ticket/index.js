import React from 'react';
import { connect } from 'dva';
import './index.less'
import Img from "./pic.jpg"

class Ticket extends React.Component {
  render() {
    return (
        <div className='ticket'>
            <div className='ticketTitle'>索证索票</div>
            <div className='ticketPic'>
                <figure>
                <img src={Img} alt=""/>
                <figcaption>
                    食品检验检测证
                </figcaption>            
                </figure>
                <figure>
                <img src={Img} alt=""/>
                <figcaption>
                动物检测检疫证明
                </figcaption>            
                </figure>
                <figure>
                <img src={Img} alt=""/>
                <figcaption>
                动物检测检疫证明
                </figcaption>            
                </figure>
                <figure>
                <img src={Img} alt=""/>
                <figcaption>
                动物检测检疫证明
                </figcaption>            
                </figure>
                <figure>
                <img src={Img} alt=""/>
                <figcaption>
                    食品检验检测证
                </figcaption>            
                </figure>
            </div>
    </div>
    )
  }
}
export default connect(({ }) => ({
}))(Ticket);