import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SelectDishes from '../SelectIDishes';
import classNames from 'classnames'
import { Table, Button, Tag } from 'antd';
import styles from './index.module.less';

class ArrangeDishes extends Component {
    state = {
        showModal: false,
        columnIndex: '',
        rowIndex: ''
    }

    // 控制选菜或选食材modal的显示
    handleShowModal = (columnIndex, rowIndex) => {
        this.setState({
            showModal: true,
            columnIndex,
            rowIndex
        })
    }

    // 在选菜或选食材modal中点击确定或取消隐藏modal
    handleHideModal = () => {
        this.setState({
            showModal: false
        })
    }

    // 在选菜或选食材modal中点击添加或点击标签关闭时回调
    // flag===1为添加，flag===-1时为删除
    // 使用state中的currRecord和currRowIndex定位单元格
    changeItemList = (record, flag) => {
        if (!flag) {
            this.setState({
                showModal: true
            })
        }
        const { dispatch } = this.props;
        const { columnIndex, rowIndex } = this.state;
        dispatch({
            type: 'menuCenter/handleChangeList',
            payload: {
                record,
                columnIndex,
                rowIndex,
                flag
            }
        })
    }

    // 选菜或选食材中筛选区域
    handlFetchDishes = (value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'menuCenter/fetchDishes',
            payload: value
        })

    }

    // 表格中点击查看的回调,要添加到表头定义中
    handlePreviewItem = ({ id }) => {
        const { dispatch } = this.props;
        dispatch(routerRedux.push({
            pathname: '/',
            state: { id }
        }))
    }


    componentDidMount() {
        this.handlFetchDishes('all');
    }

    render() {
        const {
            className,
            // 所有菜品或食材数据
            dishesData,
            // 排餐表
            dishesInMenu,
        } = this.props;
        const { columnIndex, rowIndex } = this.state;
        const clsTd = styles.weekdayTd;
        const clsBtn = styles.clsBtn

        // 定义表头数据
        const tableColumns = [
            {
                title: '周',
                key: 'weekday',
                dataIndex: 'weekday',
                width: 80,
                align: 'center'
            },
            {
                title: '早餐',
                key: 'breakfast',
                dataIndex: 'breakfast',
                className: clsTd,
                render: (text, record) => (
                    <ul>
                        {text.length ? text.map(item =>
                            <li
                                onClick={() => {
                                    this.handleShowModal('breakfast', record.id)
                                }}
                                className={styles.dishItem}
                                key={item.id}
                            >{item.foodName}</li>) : ''}
                        <Button
                            className={clsBtn}
                            onClick={() => { this.handleShowModal('breakfast', record.id) }}
                            type="dashed" block
                        >+添加</Button>
                    </ul>
                ),
            },
            {
                title: '午餐',
                key: 'lunch',
                dataIndex: 'lunch',
                className: clsTd,
                render: (text, record) => (
                    <ul>
                        {text.length ? text.map(item => <li className={styles.dishItem} key={item.id}>{item.foodName}</li>) : ''}
                        <Button
                            className={clsBtn}
                            onClick={() => { this.handleShowModal('lunch', record.id) }}
                            type="dashed" block
                        >+添加</Button>
                    </ul>
                ),
            },
            {
                title: '点心',
                key: 'dessert',
                dataIndex: 'dessert',
                className: clsTd,
                render: (text, record) => (
                    <ul>
                        {text.length ? text.map(item => <li className={styles.dishItem} key={item.id}>{item.foodName}</li>) : ''}
                        <Button
                            className={clsBtn}
                            onClick={() => { this.handleShowModal('dessert', record.id) }}
                            type="dashed" block
                        >+添加</Button>
                    </ul>
                ),
            },
            {
                title: '晚餐',
                key: 'supper',
                dataIndex: 'supper',
                className: clsTd,
                render: (text, record) => (
                    <ul>
                        {text.length ? text.map(item => <li className={styles.dishItem} key={item.id}>{item.foodName}</li>) : ''}
                        <Button
                            className={clsBtn}
                            onClick={() => { this.handleShowModal('supper', record.id) }}
                            type="dashed" block
                        >+添加</Button>
                    </ul>
                ),
            },
        ]

        // 弹出框modal表头数据
        const modalTableColumns = [
            {
                title: '名称',
                key: 'foodName',
                dataIndex: 'foodName'
            },
            {
                title: '类别',
                key: 'type',
                dataIndex: 'type'
            },
            {
                title: '食材明细',
                key: 'properties',
                dataIndex: 'properties'
            },
            {
                title: '图片',
                key: 'img',
                dataIndex: 'img',
                render: (_, record) => <a onClick={() => {
                    this.handlePreviewItem(record);
                }}>查看</a>
            },
            {
                title: '操作',
                key: 'add',
                width: 100,
                render: (_, record) => {
                    console.log('filter', dishesInMenu, rowIndex, columnIndex);
                    // modal表格在点击单元格后才会渲染
                    return dishesInMenu[rowIndex][columnIndex].length
                        ? (dishesInMenu[rowIndex][columnIndex]
                            .some(item => item.id === record.id)
                            ? <span>已添加</span>
                            : <a onClick={() => { this.changeItemList(record, 1) }}>添加</a>)
                        : <a onClick={() => { this.changeItemList(record, 1) }}>添加</a>;
                }
            },
        ];

        const clsString = classNames(styles.arrangeDishes, className);
        return (
            <div className={clsString}>
                <Table
                    bordered
                    columns={tableColumns}
                    dataSource={dishesInMenu}
                    rowKey="id"
                    pagination={false}
                />
                {/* 弹出的选菜/或选食材modal */}
                <SelectDishes
                    // modal标题
                    title="选菜"
                    // modal中表格列定义
                    tableColumns={modalTableColumns}
                    // modal的显示属性
                    visible={this.state.showModal}
                    // 隐藏modal的方法
                    handleHideModal={this.handleHideModal}
                    // modal中表格数据
                    tableData={dishesData}
                    // 选菜或选食材modal中已选菜品或食材数据
                    dishesInMenu={dishesInMenu}
                    // 选择类别下拉框时的回调
                    handlFetchDishes={this.handlFetchDishes}
                    // 关闭标签时的回调
                    changeItemList={this.changeItemList}
                    columnIndex={this.state.columnIndex}
                    rowIndex={this.state.rowIndex}
                />
            </div>
        )
    }
}

export default connect(({ menuCenter }) => ({
    ...menuCenter
}))(ArrangeDishes);