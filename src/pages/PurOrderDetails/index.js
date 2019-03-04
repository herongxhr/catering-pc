import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Menu, Row, Col, } from 'antd';
import classNames from 'classnames';
import DescriptionList from '../../components/DescriptionList';
import BreadcrumbComponents from '../../components/BreadcrumbComponent';
import PageHeadWrapper from '../../components/PageHeaderWrapper';

import styles from './index.module.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

class PurOrderDetails extends React.Component {
    componentDidMount() {
        const { dispatch, location } = this.props;
    }

    render() {
        const {
            location,
            orderData,
        } = this.props;
        const { id } = location.query;
        const {
            orderId,
            //status,
            date,
            channel,
            totalAmount,
            comment,
        } = orderData.filter(order => order.orderId == id)[0];

        let orderChannel;
        if (channel === 'M') {
            orderChannel = '菜单生成';
        } else if (channel === 'S') {
            orderChannel = '辅料订单';
        } else {
            orderChannel = '自建订单';
        }

        const action = (
            <Fragment>
                <ButtonGroup>
                    <Button>打印</Button>
                    <Button>删除</Button>
                    <Button>调整</Button>
                </ButtonGroup>
                <Button type="primary">下单</Button>
            </Fragment>
        );

        const extra = (
            <Row>
                <Col xs={24} sm={12}>
                    <div className={styles.textSecondary}>状态</div>
                    <div className={styles.heading}>未下单</div>
                </Col>
                <Col xs={24} sm={12}>
                    <div className={styles.textSecondary}>总金额</div>
                    <div className={styles.heading}>{`¥ ${totalAmount}元`}</div>
                </Col>
            </Row>
        );

        const description = (
            <DescriptionList className={styles.headerList} size="small" col="2">
                <Description term="订单来源">{orderChannel}</Description>
                <Description term="采购区间">2017-07-07 ~ 2017-08-08</Description>
                <Description term="创建时间">{date}</Description>
                <Description term="备注内容">{comment}</Description>
            </DescriptionList>
        );

        return (
            <div>
                <BreadcrumbComponents {...location} />
                {/* 页头容器 */}
                <PageHeadWrapper
                    title={`采购单号：${orderId}`}
                    logo={
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
                    }
                    action={action}
                    content={description}
                    extraContent={extra}
                    {...this.props}
                />
            </div>
        )
    }
}

export default connect(({ purOrder }) => ({
    orderData: purOrder.rawData
}))(PurOrderDetails);