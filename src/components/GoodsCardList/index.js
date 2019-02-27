import React from 'react';
import { Card, InputNumber, Button, List } from 'antd';
import goodsWine from './wine.png';
import './index.less';

export default class GoodsCardList extends React.Component {
    state = {
        cart: []
    }

    // 只要修改数量，将改过数量的商品
    // 商品的id和改后的值保存到state中
    handleValueChange = (qty, id) => {
        if (this.state.cart.some(item => item.id == id)) {
            // console.log('old goods');
            this.setState({
                cart: this.state.cart.map(item => {
                    if (item.id == id) {
                        return { id, qty }
                    }
                    return item;
                }),
            });
        } else {
            // console.log('new goods');
            this.setState({
                cart: this.state.cart.concat({
                    id,
                    qty,
                }),
            });
        }
        // console.log("valueChange", this.state.cart);
    }

    HandleAddToCart = (id) => {
        const { dispatch } = this.props;
        // 在state中保存的改过数量的商品数组中
        // 找到本id对应的数量，如果没有就默认为1
        let quantity = (this.state.cart.length && this.state.cart.find(item => item.id == id).qty) || 1;
        dispatch({
            type: 'accSupermarket/addToCart',
            payload: { id, quantity }
        })
        console.log("id", id, "qty", quantity);
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