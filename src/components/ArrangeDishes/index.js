import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SelectDishes from '../SelectIDishes';
import classNames from 'classnames'
import { Table, Button } from 'antd';
import styles from './index.module.less';

class ArrangeDishes extends Component {

    state = {
        showModal: false,
        currRrecord: '',
        currRowIndex: ''
    }
    // 控制选菜或选食材modal的显示
    handleShowModal = (record, rowIndex) => {
        this.setState({
            showModal: true,
            currRecord: record,
            currRowIndex: rowIndex
        })
    }
    // 在选菜或选食材modal中点击确定或取消隐藏modal
    handleModalVisble = () => {
        this.setState({
            showModal: false
        })
    }
    // 在选菜或选食材modal中点击添加或点击标签关闭时回调
    // flag===1为添加，flag===-1时为删除
    // 使用state中的currRecord和currRowIndex定位单元格
    changeItemList = (record, flag) => {
        const { dispatch } = this.props;
        const { currRecord, currRowIndex } = this.state;
        dispatch({
            type: 'menuCenter/changeItemList',
            payload: {
                record,
                currRecord,
                currRowIndex,
                flag
            }
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
        const { dispatch } = this.props;
        dispatch({
            type: 'menuCenter/fetchDishes'
        })
    }
    render() {
        const {
            className,
            // 所有菜品或食材数据
            dishesData,
            // 排餐表
            dishesInMenu,
        } = this.props;

        // 初始化表头数据
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
                width: 260,
                render: (text, record) => (
                    <ul>
                        {text.length ? text.map(item => <li key={item.id}>{item.foodName}</li>) : null}
                        <Button type="dashed" block>+添加</Button>
                    </ul>
                ),
                onCell: (record, rowIndex) => {
                    return {
                        onClick: () => this.handleShowModal(record, rowIndex),
                    }
                }
            },
            {
                title: '午餐',
                key: 'lunch',
                dataIndex: 'lunch',
                width: 260,
                render: (text, record) => (
                    <ul>
                        {text.length ? text.map(item => <li key={item.id}>{item.foodName}</li>) : null}
                        <Button type="dashed" block>+添加</Button>
                    </ul>
                ),
                onCell: (record, rowIndex) => {
                    return {
                        onClick: this.handleShowModal,
                    }
                }
            },
            {
                title: '点心',
                key: 'dessert',
                dataIndex: 'dessert',
                width: 260,
                render: (text, record) => (
                    <ul>
                        {text.length ? text.map(item => <li key={item.id}>{item.foodName}</li>) : null}
                        <Button type="dashed" block>+添加</Button>
                    </ul>
                ),
                onCell: (record, rowIndex) => {
                    return {
                        onClick: this.handleShowModal,
                    }
                }
            },
            {
                title: '晚餐',
                key: 'supper',
                dataIndex: 'supper',
                width: 260,
                render: (text, record) => (
                    <ul>
                        {text.length ? text.map(item => <li key={item.id}>{item.foodName}</li>) : null}
                        <Button type="dashed" block>+添加</Button>
                    </ul>
                ),
                onCell: (record, rowIndex) => {
                    return {
                        onClick: this.handleShowModal,
                    }
                }
            },
        ]
        //表格数据,通过循环加上一个weekday属性
        const dishesArranged = dishesInMenu.concat(Array.from({ length: 7 })).map((weekdayRow = {}, index) => {
            const weekday = ['一', '二', '三', '四', '五', '六', '日'];
            weekdayRow.id = index;
            weekdayRow.weekday = weekday[index];
            weekdayRow.breakfast = [];
            weekdayRow.lunch = [];
            weekdayRow.dessert = [];
            weekdayRow.supper = [];
            console.log(weekdayRow);
            return weekdayRow;
        })

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
                render: (_, record) => <span onClick={() => {
                    this.handlePreviewItem(record);
                }}>查看</span>
            },
            {
                title: '操作',
                key: 'add',
                dataIndex: 'add',
                render: (_, record) => <a onClick={() => {
                    this.changeItemList(record, 1)
                }
                }>添加</a>
            },
        ];

        console.log(1, dishesInMenu);
        const clsString = classNames(styles.arrangeDishes, className);
        return (
            <div className={clsString}>
                <Table
                    bordered
                    columns={tableColumns}
                    dataSource={dishesArranged}
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
                    handleModalVisble={this.handleModalVisble}
                    // modal中表格数据
                    tableData={dishesData}
                    // 选菜或选食材modal中已选菜品或食材数据
                    dishesInMenu={dishesInMenu}
                    // 关闭标签时的回调
                    changeItemList={this.changeItemList}
                />
            </div>
        )
    }
}

export default connect(({ menuCenter }) => ({
    ...menuCenter
}))(ArrangeDishes);