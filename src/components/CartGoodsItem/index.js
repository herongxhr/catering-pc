import React from 'react';
import { Card, InputNumber } from 'antd';

export default class CartGoodsItem extends React.Component {
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
                <div className="goodsItemWrapper">
                    <div className="thumb">
                        <img src={img} alt={`${brand}${name}`} />
                    </div>
                    <div className="content">
                        <div className="details">
                            <div>{brand} {name}{attribute}</div>
                            <div>￥ {price} {priceType}</div>
                            <div style={{fontSize: "12px"}}>{provider}</div>
                        </div>
                        <div className="actions">
                            <a>删除</a>
                            <InputNumber
                                defaultValue={1}
                                min={1}
                                size="small"
                                onChange={() => { }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
} 