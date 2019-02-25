import React from 'react';
import { Card, InputNumber } from 'antd';
import goodsWine from './wine.png'

export default class GoodsCard extends React.Component {
    render() {
        const {
            className,
            name,
            brand,
            price,
            priceType,
            provider,
            isCollected,
            img,
            attribute
        } = this.props;

        const goodsTitle = (
            <span>{brand} {name}{attribute}</span>
        );

        const goodsDescription = (
            <div>
                <h4>￥ {price} {priceType}</h4>
                <div className="goodsProvider">{provider}</div>
            </div>
        )

        return (
            <div className={className}>
                <Card
                    bordered={false}
                    actions={[
                        <InputNumber
                            defaultValue={1}
                            min={1}
                            size="small"
                            onChange={() => { }}
                        />,
                        <a>加入购物车</a>
                    ]}
                    hoverable
                    cover={<img alt={goodsTitle} src={goodsWine} />}
                >
                    <Card.Meta
                        className="cardMeta"
                        title={goodsTitle}
                        description={goodsDescription}
                    />
                </Card>
            </div>

        )
    }
} 