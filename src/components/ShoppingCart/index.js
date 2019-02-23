import React from 'react';
import { List } from 'antd';

export default class ShoppingCart extends React.Component {
    
    render() {

        const selectedGoods = [];
        const shoppingCartDom = (
            <List
                dataSource = { selectedGoods }
                renderItem = { item => (
                    <List.Item>
                        
                    </List.Item>
                )

                }
            />
        );

        return (
            <div>ShoppingCart</div>
        )
    }
}