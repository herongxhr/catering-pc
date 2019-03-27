import React from 'react';
import { Card, InputNumber, Button, List } from 'antd';
import goodsWine from './wine.png';
import './index.less';

export default class FGoodList extends React.Component {
    state = {
        cart: []
    }

    // 只要修改数量，将改过数量的商品
    // 商品的id和改后的值保存到state中
    handleValueChange = (qty, id) => {
        if (this.state.cart.some(item => item.id === id)) {
            // console.log('old goods');
            this.setState({
                cart: this.state.cart.map(item => {
                    if (item.id === id) {
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

    // 加购物车前统计数量
    readyToAddCart = id => {
        const { cart } = this.state;
        const quantity = (cart.length && cart.find(item => item.id === id).qty) || 1;
        const { handleAddToCart } = this.props;
        handleAddToCart(id, quantity);
    }

    render() {
        const { records } = this.props;

        return (
            <div >
                <List
                    className="goodsList"
                    column={4}
                    dataSource={records}
                    renderItem={item => {
                        if (item) {
                            const goodsTitle = <span>{item.brand} {item.goodsName}{item.property}</span>;
                            const goodsDescription = (
                                <div>
                                    <h4> ￥{`${item.price || 0} `}元{item.unit}</h4>
                                    <div className="goodsProvider" >
                                        {item.supplier && item.supplier.supplierName} </div>
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
                                        <Button style={{ width: 100 }}
                                            type="primary"
                                            onClick={() => this.readyToAddCart(item.id)} >
                                            加入购物车 </Button>
                                    ]}
                                    hoverable
                                    cover={<img alt={item.goodsName} src={item.img1 || goodsWine}
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
                    }
                />
            </div>
        )
    }
}