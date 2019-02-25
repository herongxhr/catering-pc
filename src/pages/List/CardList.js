import React, { PureComponent } from "react";
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';

import styles from './CardList.less';

@connect(({ list }) => ({
    list,
}))
class CardList extends PureComponent {
    componentDidMount() {
        const { distpatch } = this.props;
        dispatch({
            type: 'list/fetch',
            payload: {
                count: 12,
            },
        });
    }

    render() {
        const {
            list: { list },
        } = this.props;

        return (
            <div className="card-list">
                <List
                    rowKey="id"
                    loading={loading}
                    grid={{ gutter: 24, lg: 4, md: 3, sm: 3, xs: 2}}
                    dataSource={['', ...list]}
                    renderItem={item =>
                        item ? (
                            <List.Item 
                            key={item.id}
                            actions={}
                            extra={}
                            >
                                <Card hoverable className={styles.card} actions={[<a>操作一</a>, <a>操作二</a>]}>
                                    <Card.Meta
                                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                                        title={<a>{item.title}</a>}
                                        description={
                                            <Ellipsis className={styles.item} lines={3}>
                                                {item.description}
                                            </Ellipsis>
                                        }
                                    />
                                </Card>
                            </List.Item>
                        ) : "暂时没有商品"
                    }
                />
            </div>
        );

    }
}