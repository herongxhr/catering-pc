import React from 'react';
import { Card, InputNumber, Button, List } from 'antd';
import goodsWine from './wine.png';
import './index.less';

export default class GoodsCardList extends React.Component {
    state = {
        num: 1,
        goodsId: null,
    }

    HandleAddToCart = (id, num) => {
        const { dispatch } = this.props;
        num = id === this.state.goodsId ? this.state.num : 1;
        console.log(num);
        dispatch({
            type: 'accSupermarket/addToCart',
            payload: {
                id,
                num,
            }
        })
    }

    handleValueChange = (value, id) => {
        this.setState({
            num: value,
            goodsId: id
        })
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
                                        onClick={() => this.HandleAddToCart(item.id, this.state.num)} >
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