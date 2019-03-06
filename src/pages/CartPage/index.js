import React from 'react';
import { Link } from 'dva/router';
import { Drawer, Badge, Icon, List } from 'antd';
import GoodsItem from '../../components/GoodsItem';
import './index.less';

export default class CartPage extends React.Component {
    // 隐藏购物车页面
    hideCartDrawer = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'accSupermarket/hideCartDrawer',
        })
    }
    // 返回id相匹配的商品
    getDetailByGoodsId = (id) => {
        const { goodsList } = this.props;
        return goodsList.find(item => item.id === id);
    }
    // 改变商品数量
    handleChangeNum = (id, value) => {
        const { dispatch } = this.props;
        console.log("商品数量变为:", value);
        dispatch({
            type: "accSupermarket/changeCartNum",
            payload: { id, value }
        })
    }

    // 删除购物车中商品
    handleDeleteGoods = (id) => {
        const { dispatch } = this.props;
        console.log("要删除的商品id", id);
        dispatch({
            type: "accSupermarket/deleteCartGoods",
            payload: {
                id,
            }
        })
    }
    render() {
        console.log("props in cartPage", this.props)
        const {
            className,
            showCartDrawer,
            shoppingCart,
        } = this.props;
        // 购物车中商品数量
        let countCart = shoppingCart.length;
        // 购物车详情标题
        const cartPageTitle = (
            <Badge onClick={this.showCartDrawer} className="titleWithBadge fixedTop" count={countCart} >
                <Icon type="shopping-cart" style={{ fontSize: 20, color: "rgba(0, 0, 0, 0.25)" }} />
                <span className="cartText">购物车</span>
            </Badge>
        )

        const cartPageFooter = (
            <div className="cartPageFooter fixedBottom">
                <span className="goodsInCartCount">共有 {countCart} 件商品
                    <Icon
                        type="exclamation-circle"
                        theme="filled"
                        style={{ fontSize: 18, marginLeft: 20, color: "rgba(245, 34, 45, 1)" }}
                    />
                </span>
                <Link to="/purOrder/details" className="createOrder">生成采购单</Link>
            </div>
        )
        return (
            <div className={className}>
                <Drawer
                    className="cartDrawer"
                    placement="right"
                    bodyStyle={{ padding: 0 }}
                    title={cartPageTitle}
                    closable={true}
                    width={470}
                    onClose={this.hideCartDrawer}
                    visible={showCartDrawer}
                    zIndex={99999}
                >
                    <div className="cartPageBody">
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
                            }
                            }
                        />
                    </div>
                    {cartPageFooter}
                </Drawer>
            </div>
        )
    }
}