import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import SelectDishes from '../SelectIDishes';
import classNames from 'classnames';
import { Button, Tag, Dropdown, Menu } from 'antd';
import styles from './index.module.less';

// 选菜/选食材弹出框中筛选下拉框的数据
const selectData = [
    ['all', '全部'],
    ['meatDish', '荤菜'],
    ['vegetable', '素菜'],
    ['halfAMeat', '半荤'],
    ['dessert', '点心'],
    ['others', '其它'],
]
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
// 一日四餐
const meals = ['breakfast', 'lunch', 'dessert', 'dinner'];

// 定义加菜按钮
const menu = (<Menu >
    <Menu.Item id='everyone' key='all'>所有人</Menu.Item>
    <Menu.Item id='forStaff' key='forStaff'>教职工</Menu.Item>
</Menu>)
const addBtn = (<div>
    <Dropdown overlay={menu}>
        <Button className={styles.addBtn} type='dashed'>+添加</Button>
    </Dropdown>
</div>)
// 组件要接收arrangedMeals数据，
// 即camenuDetailVOMap和camenuTemplateDetailVOMap
// 还要接收menuCenter state中周一到周日每天的排餐数据
export default class ArrangeDishes extends Component {
    state = {
        // 显示选菜/选食材弹出框
        showModal: false,
        // 当前操作列也就是餐次
        colIndex: '',
        // 当前操作行也就是周次
        rowIndex: '',
        // 是不是教职工菜
        forStaff: false,
        // 是不是自己加的菜
        isAdd: false,
        // 当前操作的菜品id
        currFoodId: ''
    }

    // 选菜/选食材弹出框中点击确定或取消的回调
    hideModal = () => {
        this.setState({
            showModal: false
        })
    }
    // 点击(添加/更换按钮)时弹出(选菜/选食材弹出框)
    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    // 在选菜/选食材弹出框中点击添加或点击标签关闭时回调
    // flag为1为添加，-1时为删除，0为替换
    // 使用state中的rowIndex和colIndex定位单元格
    changeArrangedMeals = (record, flag) => {
        console.log('changeMeals:', record, flag);
        const { dispatch } = this.props;
        const { isAdd } = this.state;
        dispatch({
            type: 'menuCenter/changeArrangedMeals',
            payload: {
                record,
                ...this.state,
                flag
            }
        });
        // 当换过一次菜后，将之前所换菜的id设为currFoodId
        if (!isAdd) {
            this.setState({
                currFoodId: record.foodId
            })
        }
    }

    // 选菜或选食材中筛选区域
    handlFetchDishes = params => {
        const { dispatch } = this.props;
        dispatch({
            type: 'menuCenter/fetchDishes',
            payload: params
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

    /**
     * 所有事件冒泡到td单元格上，好采集周次rowIndew餐次colIndex信息
     * 同时利用state保存当前点击信息；同时控制选菜或选食材modal的显示
     * 利用forStaff,isAdd,currFoodId保存是否职工餐，是否新加餐，当前操作菜名
     */
    handleShowModal = (e, rowIndex, colIndex) => {
        // 只有添加按钮和两个更换和删除按钮是LI标签
        if (e.target.nodeName !== 'LI') return;
        // 添加按钮本身有id, 更换和删除的id在parentNode上
        const foodId = e.target.id || e.target.parentNode.id;
        // 根据e.target.id来判断是职工餐还是自己加的菜
        let forStaff = foodId === 'forStaff' ? true : false;
        let isAdd = foodId === 'everyone' || foodId === 'forStaff';
        // 记录当前点击菜名的id，要考虑点了按钮的情况
        let currFoodId = (!isAdd && foodId) || '';
        const flag = e.target.getAttribute('flag') || null;
        console.log('isAdd:', isAdd, 'row:', rowIndex, 'col:', colIndex, 'staff:', forStaff, 'currId:', currFoodId, 'flag:', e.target);
        this.setState({
            colIndex,
            rowIndex,
            forStaff,
            isAdd,
            currFoodId
        }, () => {
            // 点击了删除按钮,则执行删除操作
            if (flag === '-1') {
                this.changeArrangedMeals({ foodId: this.state.currFoodId }, -1);
                return;
            }
            this.showModal();
        })
    }

    // 构造表格行的DOM
    renderWeekday = weekday => {
        const { arrangedMeals } = this.props;
        const getTD = this.getMealsTD
        // 检查父组件传递的数据是否某一天的数据
        if (this.props[weekday]) {
            return (
                <tr key={weekday}>
                    <td>{weekdays[weekday]}</td>
                    {/* 循环出一日四餐的表格行 */}
                    {meals.map(meal => {
                        return <td key={meal} onClick={e => this.handleShowModal(e, weekday, meal)}>
                            {/* meal没安排，this.props[weekday][meal]可能为undefined,则会取默认[] */}
                            {getTD(this.props[weekday][meal])}
                            {addBtn}
                        </td>
                    })}
                </tr>
            )
        } else {// 当天没排餐，则显示空按钮
            return (
                <tr key={weekday}>
                    <td>{weekdays[weekday]}</td>
                    {/* 循环出一日四餐的表格行 */}
                    {meals.map(meal =>
                        <td key={meal} onClick={e => this.handleShowModal(e, weekday, meal)}>
                            {addBtn}
                        </td>
                    )}
                </tr>
            )
        }
    }

    /**
    * 根据是否图片模式，是否显示配料详情来返回每个单元格中的内容
    * @param{array} dishes 每一餐的菜品数据,有可能未定义
    * @param{boolean} imgMode 是否图片模式
    * @param{boolean} showDetail 是否显示配料详情
    */
    getMealsTD = (dishes = []) => {
        const { isMy = true } = this.props;
        if (dishes.length) {// 如果当前餐次有作安排
            return (<ul>
                {dishes.map((item, index) => (
                    // li负责展示每一个菜品，自己加的菜背景色不一样
                    <li key={index} className={classNames({ [styles.isAdd]: item.isAdd })}>
                        <span className={styles.dishName}>{item.foodName}</span>
                        {!!item.forStaff &&
                            <Tag color='orange' className={styles.tag}>教职工</Tag>}
                        {/* 自己加的悬浮时会显示删除按钮 */}
                        <ul id={item.foodId} className={styles.actionsWrap}>
                            <li className={
                                classNames(styles.changeBtn, { [styles.onlyChange]: (!item.isAdd && !isMy) })
                            }>更换</li>
                            {(item.isAdd || isMy) && <li flag='-1' className={styles.deleteBtn}>删除</li>}
                        </ul>
                    </li>)
                )}
            </ul>)
        }
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
                this.changeArrangedMeals(record, flag);
            }}>选择</a>)
    }
    componentDidMount() {
        this.handlFetchDishes();
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
                        {/* 周一到周日都调用一下方法生成表格行 */}
                        {Object.keys(weekdays).map(weekday =>
                            this.renderWeekday(weekday)
                        )}
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
                    handleHideModal={this.hideModal}
                    // modal中表格数据
                    modalTableData={dishesData}
                    // 选择类别下拉框时的回调
                    doFilter={this.handlFetchDishes}
                    // 关闭标签时的回调
                    changeArrangedMeals={this.changeArrangedMeals}
                    colIndex={colIndex}
                    rowIndex={rowIndex}
                    // 当前周次和餐次中菜品数据
                    currMeals={this.getCurrMeals()}
                    selectData={selectData}
                />
            </div>
        )
    }
}

