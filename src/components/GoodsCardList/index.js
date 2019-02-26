import React from 'react';
import { Card, InputNumber, Button, List } from 'antd';
import goodsWine from './wine.png';
import './index.less';

export default class GoodsCardList extends React.Component {
    state = {
        cart: []
    }



    HandleAddToCart = (id) => {
        const { dispatch } = this.props;
        // 在state中保存的改过数量的商品数组中
        // 找到本id对应的数量，如果没有就默认为1
        let qty = this.state.goodsInCart.find(item => item.id === id) || 1;
        console.log(qty);
        dispatch({
            type: 'accSupermarket/addToCart',
            payload: {
                id,
                qty,
            }
        })
    }

    // 判断商品是否在cart中
    checkGoods(goodsId) {
        let cart = this.state.cart;
        return cart.some(item => item.id === goodsId);
    }

    // 只要修改数量，将改过数量的商品的id和改后的值保存到state中
    handleValueChange = (value, id) => {
        console.log(id, value);
        if (this.checkGoods(id)) {
            this.setState({
                cart: this.state.cart.map(item => {
                    if (item.id === id) {
                        return {
                            id,
                            qty: item.qty + value,
                        }
                    }
                    return item;
                })
            })
        } else {
            this.setState({
                cart: this.state.cart.concat({
                    id,
                    value,
                })
            })
        }
        console.log(this.state.cart);
    }

    render() {
        const {
            className,
            goodsList,
        } = this.props;

        return (
            <div className={className} >
                <List
                    className="goodsList"
                    column={4}
                    dataSource={goodsList}
                    renderItem={item => {
                        const goodsTitle = (<span>{item.brand} {item.name}{item.attribute}</span>);

                        const goodsDescription = (
                            <div>
                                <h4> ￥{item.price} {item.priceType}</h4>
                                <div className="goodsProvider" >
                                    {item.provider} </div>
                            </div>
                        )
                        return (<List.Item
                            className="goodsListItem"
                            key={item.id} >
                            <Card
                                bordered={false}
                                actions={[
                                    <InputNumber
                                        defaultValue={1}
                                        min={1}
                                        size="small"
                                        onChange={(value) => this.handleValueChange(value, item.id)}
                                    />,
                                    <Button
                                        type="primary"
                                        onClick={() => this.HandleAddToCart(item.id)} >
                                        加入购物车 </Button>
                                ]}
                                hoverable
                                cover={<img alt={item.goodsTitle} src={goodsWine}

                                />} >
                                <Card.Meta
                                    className="cardMeta"
                                    title={goodsTitle}
                                    description={goodsDescription}
                                />
                            </Card>
                        </List.Item>
                        )
                    }
                    }
                />
            </div>
        )
    }
}