import React from 'react';
import { connect } from 'dva';
import BreadcrumbComponents from '../../components/BreadcrumbComponent';

import './index.less';



class PurOrderDetails extends React.Component {

    render() {
        console.log(this.props);
        const { location } = this.props;
        return (
            <div>
                <BreadcrumbComponents {...location} />
                <span>订单详情</span>
            </div>
        )
    }
}

export default connect(({ purOrderDetails }) => ({
    purOrderDetails
}))(PurOrderDetails);