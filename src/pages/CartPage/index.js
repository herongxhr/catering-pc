import React from 'react';
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

    render() {
        const {
            className,
            showCartDrawer,
            goodsList,
        } = this.props;

        // 购物车详情标题
        const cartPageTitle = (
            <Badge onClick={this.showCartDrawer} className="titleWithBadge fixedTop" count={6} >
                <Icon type="shopping-cart" style={{ fontSize: 20, color: "rgba(0, 0, 0, 0.25)" }} />
                <span className="cartText">购物车</span>
            </Badge>
        )

        const cartPageFooter = (
            <div className="cartPageFooter fixedBottom">
                <span className="goodsInCartCount">共有 6 件商品
                    <Icon
                        type="exclamation-circle"
                        theme="filled"
                        style={{ fontSize: 18, marginLeft: 20, color: "rgba(245, 34, 45, 1)" }}
                    />
                </span>
                <span className="createOrder">生成采购单</span>
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
                            dataSource={goodsList}
                            renderItem={item => {
                                return (
                                    <List.Item
                                        style={{padding:0}}
                                        key={item.id}
                                    >
                                        <GoodsItem {...item} />
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