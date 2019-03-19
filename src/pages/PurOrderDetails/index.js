import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Card, Row, Col, Table, Tag } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import Bread from '../../components/Bread'
import PageHeadWrapper from '../../components/PageHeaderWrapper';
import Cartoon from '../../components/Cartoon'
import styles from './index.module.less';
import { routerRedux } from 'dva/router';


const { Description } = DescriptionList;

// 定义表格列
const tabColumns = [
    {
        title: '商品',
        key: "name",
        dataIndex: "name"
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
        key: "supplier",
        dataIndex: "supplier"
    },
    {
        title: '配送日期',
        key: "requiredDate",
        dataIndex: "requiredDate"
    },
]
const bread = [{
  href:'/purOrder',
  breadContent:'采购订单'
},{
  breadContent:'详情'
}]


class PurOrderDetails extends React.Component {
		purOrderAdjust = (pathname,rest) => {
			const { props } = this
			props.dispatch(routerRedux.push({ 
				pathname,
				...rest
			}))
		}

    render() {
        const {
            location,
            orderDetail: {
                orderInfo,
                goodsDetail,
            },
        } = this.props;
        let orderChannel;
        if (orderInfo.channel === 'M') {
            orderChannel = '菜单生成';
        } else if (orderInfo.channel === 'S') {
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
                    <div className={styles.heading}>10元</div>
                </Col>
            </Row>
        );

        const description = (
            <DescriptionList className={styles.headerList} size="small" col="2">
                <Description term="订单来源">{orderChannel}</Description>
                <Description term="采购区间">{orderInfo.distributionDate}</Description>
                <Description term="创建时间">{orderInfo.createTime}</Description>
                <Description term="备注内容">{orderInfo.remark}</Description>
            </DescriptionList>
        );

        
        const cardTitle = (
            <span className={styles.cardTitle}>商品明细：<Tag color="cyan">共{goodsDetail.length}条</Tag></span>
				);

				const { id , status } = location

				const chooseButtonGroup = () => {
					if(status == 0) return otherAction
						else return action
				}

				const action = (
					<Fragment>
							<Button>打印</Button>
							<Button style={{marign:'0px 20px'}}>删除</Button>
							<Button onClick={() => this.purOrderAdjust('/purOrder/detail/adjust')}>调整</Button>
							<Button type="primary">下单</Button>
					</Fragment>
			);
			
			const otherAction = (
					<Fragment>
							{/* <Cartoon bell={false} value={'点击这里可以查看配送验收情况哦'} /> */}
							<Button>打印</Button>
							<Button style={{marign:'0px 20px'}}>再来一单</Button>
							<Button type="primary">查看配送验收情况</Button>
							{/* <Button type="primary">查看配送验收情况</Button> */}
					</Fragment>
			)

        return (
            <div className={styles.PurOrderDetails}>
      				  <Bread bread={bread} value='/purOrder'></Bread>
                {/* 页头容器 */}
                <PageHeadWrapper
                    title={`采购单号：${id}`}
                    logo={
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
                    }
                    action={chooseButtonGroup()}
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
                            rowKey='id'
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
    ...orderById,
}))(PurOrderDetails);