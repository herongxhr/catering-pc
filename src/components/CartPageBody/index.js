import React from 'react';
import { List } from 'antd';
import GoodsItem from '../GoodsItem';
import './index.less';

export default class CartPageBody extends React.Component {
    render() {
        const {
            className,
            goodsList,
        } = this.props;

        const cartPageBodyDom = (
            <List
                dataSource={goodsList}
                renderItem={item => {
                    return (
                        <List.Item
                            key={item.id}
                        >
                            <GoodsItem {...item} />
                        </List.Item>
                    )
                }
                }
            />
        )

        return (
            <div className={className}>
                {cartPageBodyDom}
            </div>
        )
    }
} 