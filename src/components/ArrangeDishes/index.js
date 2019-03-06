import React, { Component } from 'react';
import classNames from 'classnames'

import { Table, Button } from 'antd';


import styles from './index.module.less';

const tableColumns = [
    {
        title: '周',
        key: 'weekday',
        dataIndex: 'weekday',
        align: 'center',
        width: 80
    },
    {
        title: '早餐',
        key: 'breakfast',
        dataIndex: 'breakfast',
        width: 260
    },
    {
        title: '午餐',
        key: 'lunch',
        dataIndex: 'lunch',
        width: 260
    },
    {
        title: '点心',
        key: 'dessert',
        dataIndex: 'dessert',
        width: 260
    },
    {
        title: '晚餐',
        key: 'supper',
        dataIndex: 'supper',
        width: 260
    },
]

class ArrangeDishes extends Component {


    render() {
        const {
            className
        } = this.props;

        // 初始表格数据
        const tableSource = Array.from({ length: 7 }).map((weekdayRow = {}, index) => {
            const weekday = ['一', '二', '三', '四', '五', '六', '日'];
            const addButton = <Button type="dashed" block >+添加</Button>
            weekdayRow.id = index;
            weekdayRow.weekday = weekday[index];
            weekdayRow.breakfast = addButton;
            weekdayRow.lunch = addButton;
            weekdayRow.dessert = addButton;
            weekdayRow.supper = addButton;
            return weekdayRow;
        })

        const clsString = classNames(styles.arrangeDishes, className);

        return (
            <div className={clsString}>
                <Table
                    bordered
                    columns={tableColumns}
                    dataSource={tableSource}
                    rowKey
                    pagination={false}
                />
            </div>
        )
    }
}

export default ArrangeDishes;