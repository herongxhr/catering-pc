import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Card, Row, Col, Table, Tag } from 'antd';
import classNames from 'classnames';
import DescriptionList from '../../components/DescriptionList';
import BreadcrumbComponents from '../../components/BreadcrumbComponent';
import PageHeadWrapper from '../../components/PageHeaderWrapper';

import styles from './index.module.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

// 定义表格列
const tabColumns = [
    {
        title: '商品',
        key: "goodsName",
        dataIndex: "goodsName"
    },
    {
        title: '单位',
        key: "unit",
        dataIndex: "unit"
    },
    {
        title: '单价',
        key: "price",
        dataIndex: "price"
    },
    {
        title: '数量',
        key: "quantity",
        dataIndex: "quantity"
    },
    {
        title: '供应商',
        key: "provider",
        dataIndex: "provider"
    },
    {
        title: '配送日期',
        key: "deliveryDate",
        dataIndex: "deliveryDate"
    },
]
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

class PurOrderDetails extends React.Component {

    componentDidMount() {
        const { dispatch, location } = this.props;
        const { id } = location.query;
        dispatch({
            type: 'orderById/fetchGoodsByOrderId',
            payload: id
        });
    }

    render() {
        const {
            location,
            orderInfo,
            goodsDetail
        } = this.props;
        const { id } = location.query;
        const {
            orderId,
            createTime,
            distributionDate,
            channel,
            remark,
            totalAmount
        } = orderInfo;

        let orderChannel;
        if (channel === 'M') {
            orderChannel = '菜单生成';
        } else if (channel === 'S') {
            orderChannel = '辅料订单';
        } else {
            orderChannel = '自建订单';
        }

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
                <Description term="采购区间">{distributionDate}</Description>
                <Description term="创建时间">{createTime}</Description>
                <Description term="备注内容">{remark}</Description>
            </DescriptionList>
        );

        const cardTitle = (
            <span className={styles.cardTitle}>商品明细：<Tag color="cyan">共10条</Tag></span>
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
                >
                    <Card
                        title={cardTitle}
                        className={styles.tableCard}
                        bordered={false}
                        headStyle={{ padding: "14px 30px 6px" }}
                        bodyStyle={{ padding: "0 30px" }}
                    >
                        <Table
                            pagination
                            loading={false}
                            columns={tabColumns}
                            dataSource={goodsDetail}
                        />
                    </Card>
                </PageHeadWrapper>

            </div>
        )
    }
}

export default connect(({ orderById }) => ({
    orderInfo: orderById.orderInfo,
    goodsDetail: orderById.goodsDetail
}))(PurOrderDetails);