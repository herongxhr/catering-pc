import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router';
import SelectDishes from '../SelectIDishes';
import classNames from 'classnames';
import { Button, Tag, Dropdown, Menu } from 'antd';
import styles from './index.module.less';

export default class ArrangeDishes extends Component {
    state = {
        // 显示选菜或食材modal
        showModal: false,
        // 当前操作列
        colIndex: '',
        // 当前操作行
        rowIndex: '',
        // 是不是教职工菜
        forStaff: false,
        // 是不是自己加的菜
        isAdd: false,
        // 当前操作的菜品id
        currFoodId: ''
    }

    // 在选菜或食材modal中点击确定或取消隐藏modal
    handleHideModal = () => {
        this.setState({
            showModal: false
        })
    }

    // 在选菜或选食材modal中点击添加或点击标签关闭时回调
    // flag===1为添加，flag===-1时为删除
    // 使用state中的rowIndex和colIndex定位单元格
    changeArrangedDishes = (record, flag) => {
        // if (!flag) {
        //     this.setState({
        //         showModal: true
        //     })
        // }
        const { dispatch } = this.props;
        const { colIndex, rowIndex, forStaff, isAdd, currFoodId } = this.state;
        dispatch({
            type: 'menuCenter/changeArrangedDishes',
            payload: {
                record,
                colIndex,
                rowIndex,
                forStaff,
                isAdd,
                currFoodId,
                flag
            }
        })
        if (!isAdd) {
            this.setState({
                currFoodId: record.foodId
            })
        }
    }

    // 选菜或选食材中筛选区域
    handlFetchDishes = (value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'menuCenter/fetchDishes',
            payload: value
        })
    }

    // 选菜或选食材modal表格中点击查看的回调
    // 此方法要添加到选菜或选食材modal表头定义中
    handlePreviewItem = ({ id }) => {
        const { dispatch } = this.props;
        dispatch(routerRedux.push({
            pathname: '/',
            state: { id }
        }))
    }

    // 控制选菜或选食材modal的显示
    // 同时设置点击单元格的所代表的是周几及餐次
    handleShowModal = (e, rowIndex, colIndex) => {
        // 不是有效点击退出
        if (e.target.nodeName !== 'LI') return;
        // 根据e.target.id来判断是不是职工餐，是不是自己加的菜
        let forStaff = e.target.id === 'forStaff' ? true : false;
        let isAdd = e.target.id === 'everyone' || e.target.id === 'forStaff';
        let currFoodId = (!isAdd && e.target.id) || '';
        // console.log('isAdd', isAdd, 'e', e.target, 'staff', forStaff, 'currId', currFoodId);
        this.setState({
            showModal: true,
            colIndex,
            rowIndex,
            forStaff,
            isAdd,
            currFoodId
        })
    }

    // 构造表格行的DOM
    // 根据参数是周几来得到当天的表格行数据
    renderWeekday = weekday => {
        const { weekData } = this.props;
        // 简洁显示星期几
        const weekdays = {
            monday: '一',
            tuesday: '二',
            wednesday: '三',
            thursday: '四',
            friday: '五',
            saturday: '六',
            sunday: '日'
        };
        const getTD = this.getMealsTD
        // 检查父组件传递的数据是否某一天的数据
        if (weekData[weekday]) {
            const {
                // 如果当餐没作安排，则值为undefined
                lunch, breakfast, dessert, dinner
            } = this.props[weekday];
            return (
                <tr key={weekday}>
                    <td>{weekdays[weekday]}</td>
                    <td onClick={e => this.handleShowModal(e, weekday, 'breakfast')}>
                        {getTD(breakfast)}
                    </td>
                    <td onClick={e => this.handleShowModal(e, weekday, 'lunch')}>
                        {getTD(lunch)}
                    </td>
                    <td onClick={e => this.handleShowModal(e, weekday, 'dessert')}>
                        {getTD(dessert)}
                    </td>
                    <td onClick={e => this.handleShowModal(e, weekday, 'dinner')}>
                        {getTD(dinner)}
                    </td>
                </tr>
            )
        }
    }

    /**
    * 根据是否图片模式，是否显示配料详情来返回每个单元格中的内容
    * @param{array} dishes 每一餐的菜品数据
    * @param{boolean} imgMode 是否图片模式
    * @param{boolean} showDetail 是否显示配料详情
    */
    getMealsTD = (dishes = []) => {
        const menu = (
            <Menu >
                <Menu.Item id='everyone' key='all'>所有人</Menu.Item>
                <Menu.Item id='forStaff' key='forStaff'>教职工</Menu.Item>
            </Menu>
        )
        return (<Fragment>
            <ul>
                {dishes.map((item, index) => (
                    <li className={classNames({ [styles.isAdd]: item.isAdd })}
                        id={item.foodId} key={index}>
                        {item.foodName}
                        {!!item.forStaff &&
                            <Tag color='orange' className={styles.tag}>教职工</Tag>}
                    </li>)
                )}
            </ul>
            <div>
                <Dropdown overlay={menu}>
                    <Button className={styles.addBtn} type='dashed'>+添加</Button>
                </Dropdown>
            </div>
        </Fragment>)
    }

    // 得到当前天当前餐次的菜品列表
    getCurrMeals = () => {
        const { rowIndex, colIndex } = this.state;
        // 先看看是不是设置过周次和餐次数据
        // 如果周次有数据，但也可能没有排餐，会取到undefined值
        // 这时取默认值[]
        return rowIndex && this.props[rowIndex][colIndex] || [];
    }

    // 根据条件来显示选菜modal中，操作文本显示内容
    // 并根据模式不同，实现多选或单选功能
    renderActions = record => {
        // 判断当前食材或菜品是否已经添加
        // 当前是加菜还是换菜模式
        let { isAdd } = this.state;
        let flag = isAdd ? 1 : 0;
        return (this.getCurrMeals()
            .some(item => item.foodId === record.foodId))
            ? <span>已选</span>
            : (<a onClick={() => {
                this.changeArrangedDishes(record, flag);
            }}>选择</a>)
    }
    componentDidMount() {
        this.handlFetchDishes('all');
    }

    render() {
        const {
            className,
            // 所有菜品或食材数据
            dishesData,
        } = this.props;
        const { colIndex, rowIndex, isAdd } = this.state;
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
                render: (_, record) => (
                    <a onClick={() => {
                        this.handlePreviewItem(record);
                    }}>查看</a>
                )
            },
            {
                title: '操作',
                key: 'add',
                width: 100,
                render: (_, record) => {
                    return this.renderActions(record);
                }
            },
        ];

        const clsString = classNames(styles.arrangeDishes, className);
        return (
            <div className={clsString}>
                {/* 排餐表格 */}
                <table className={styles.arrangeDisthTable} >
                    <thead>
                        <tr>
                            <th>周</th><th>早餐</th><th>中餐</th><th>点心</th><th>晚餐</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderWeekday('monday')}
                        {this.renderWeekday('tuesday')}
                        {this.renderWeekday('wednesday')}
                        {this.renderWeekday('thursday')}
                        {this.renderWeekday('friday')}
                        {this.renderWeekday('saturday')}
                        {this.renderWeekday('sunday')}
                    </tbody>
                </table>
                {/* 弹出的选菜/或选食材modal */}
                <SelectDishes
                    // modal标题
                    title={isAdd ? '加菜' : "换菜"}
                    // modal中表格列定义
                    tableColumns={modalTableColumns}
                    // modal的显示属性
                    visible={this.state.showModal}
                    // 隐藏modal的方法
                    handleHideModal={this.handleHideModal}
                    // modal中表格数据
                    modalTableData={dishesData}
                    // 选择类别下拉框时的回调
                    handlFetchDishes={this.handlFetchDishes}
                    // 关闭标签时的回调
                    changeArrangedDishes={this.changeArrangedDishes}
                    colIndex={colIndex}
                    rowIndex={rowIndex}
                    // 当前周次和餐次中菜品数据
                    currMeals={this.getCurrMeals()}
                />
            </div>
        )
    }
}

