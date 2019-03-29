import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Drawer, Badge, Icon, List, Row, Col } from 'antd';
import GoodsItem from '../../components/GoodsItem';
import styles from './index.module.less';

class CartPage extends React.Component {
    // 显示购物车页面
    showCartDrawer = () => {
        this.props.dispatch({
            type: 'accSupermarket/showCartDrawer',
        })
    }
    // 隐藏购物车页面
    hideCartDrawer = () => {
        this.props.dispatch({
            type: 'accSupermarket/hideCartDrawer',
        })
    }
    // 返回id相匹配的商品
    getDetailByGoodsId = (id) => {
        const { FGoodData } = this.props;
        return FGoodData.records && FGoodData.records.find(item => item.id === id);
    }
    // 改变商品数量
    handleChangeNum = (id, value) => {
        this.props.dispatch({
            type: "accSupermarket/changeCartNum",
            payload: { id, value }
        })
    }

    // 删除购物车中商品
    handleDeleteGoods = (id) => {
        this.props.dispatch({
            type: "accSupermarket/deleteCartGoods",
            payload: { id }
        })
    }
    yieldPurOrder = () => {
        const { shoppingCart, dispatch } = this.props;
        dispatch(routerRedux.push({
            pathname: '/purOrder/detail/adjust',
            state: {
                type: 'supermarket',
                data: shoppingCart
            }
        }))
    }

    render() {
        const {
            className,
            showCartDrawer,
            shoppingCart,
        } = this.props;
        // 购物车中商品数量
        let countCart = shoppingCart.length;
        // 购物车详情标题
        const cartPageTitle = (
            <Badge
                onClick={this.showCartDrawer}
                className={styles.titleWithBadge}
                count={countCart} >
                <Icon type="shopping-cart" className={styles.shoppingCartIcon} />
                <div className={styles.cartText}>购物车</div>
            </Badge>
        )

        const cartPageFooter = (
            <div className={styles.cartPageFooter}>
                <Row>
                    <Col span={16}><span className={styles.goodsInCartCount}>
                        共有 <div className={styles.count}>{countCart || 0}</div> 件商品
                    <Icon
                            type="exclamation-circle"
                            theme="filled"
                            style={{ fontSize: 18, marginLeft: 20, color: "rgba(245, 34, 45, 1)" }}
                        />
                    </span>
                    </Col>
                    <Col span={8}>
                        <a className={styles.createOrder}
                            onClick={this.yieldPurOrder}
                        >生成采购单</a>
                    </Col>
                </Row>
            </div>
        )
        return (
            <div className={className}>
                <Drawer
                    className={styles.cartDrawer}
                    placement="right"
                    title={cartPageTitle}
                    closable={true}
                    width={470}
                    onClose={this.hideCartDrawer}
                    visible={showCartDrawer}
                    zIndex={99999}
                >
                    <div className={'itemWrap'}>
                        <List
                            dataSource={shoppingCart}
                            renderItem={item => {
                                return (
                                    <List.Item
                                        style={{ padding: 0 }}
                                        key={item.id}
                                    >
                                        <GoodsItem
                                            changeNum={this.handleChangeNum}
                                            deleteGoods={this.handleDeleteGoods}
                                            count={item.quantity}
                                            {...this.getDetailByGoodsId(item.id)}
                                        />
                                    </List.Item>
                                )
                            }}
                        />
                    </div>
                    {cartPageFooter}
                </Drawer>
            </div>
        )
    }
}

export default connect(({ accSupermarket }) => ({
    ...accSupermarket
}))(CartPage)