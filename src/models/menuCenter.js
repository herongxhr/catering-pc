import { queryDishes } from '../services/api';

export default {
    namespace: 'menuCenter',
    state: {
        menuData: [],
        templates: [],
        dishesData: {},
        // 记录一周每一天早中晚等每一餐的数组
        // 每个元素代表排餐表的一行，也就是一天
        dishesInMenu: Array.from({ length: 7 }).map((weekdayRow = {}, index) => {
            const weekday = ['一', '二', '三', '四', '五', '六', '日'];
            weekdayRow.id = index;
            weekdayRow.weekday = weekday[index];
            weekdayRow.breakfast = [];
            weekdayRow.lunch = [];
            weekdayRow.dessert = [];
            weekdayRow.supper = [];
            return weekdayRow;
        })
    },

    effects: {
        *fetchDishes({ payload }, { call, put }) {
            const data = yield call(queryDishes, payload);
            yield put({
                type: 'saveDishes',
                payload: data,
            })
        },
    },

    reducers: {
        saveDishes(state, { payload }) {
            return {
                ...state,
                dishesData: { ...payload }
            }
        },
        // 根据flag确定是增加还是删除
        handleChangeList(state, { payload }) {
            let { record, columnIndex, rowIndex, flag } = payload;
            console.log(payload, 'payload')
            // 增加
            switch (flag) {
                // 增加
                case 1:
                    return {
                        ...state,
                        // 如果是同一行，就把新菜或食材放在当前列的数组里
                        dishesInMenu: state.dishesInMenu.map(item => {
                            if (item.id === rowIndex) {
                                return {
                                    ...item,
                                    [columnIndex]: item[columnIndex].concat(record)
                                }
                            }
                            return item;
                        })
                    }
                // 删除
                case -1:
                    return {
                        ...state,
                        dishesInMenu: state.dishesInMenu.map(item => {
                            if (item.id === rowIndex) {
                                return {
                                    ...item,
                                    [columnIndex]: item[columnIndex].filter(item => item.id !== record.id)
                                };
                            }
                            return item;
                        })
                    }
                // 替换
                default:
                    return {
                        ...state,
                        dishesInMenu: state.dishesInMenu.map(item => {
                            // 找到要替换的行数据
                            if (item.id === rowIndex) {
                                return {
                                    ...item,
                                    // 改变相应餐次的数据
                                    [columnIndex]: item[columnIndex].map(item => {
                                        // 如果是我们点击那个菜名或食材，用新数据替换它
                                        if (item.id === record.id) {
                                            return record;
                                        }
                                        return item;
                                    })
                                }
                            }
                            // 不是要替换的数据直接返回
                            return item;
                        }),
                    };
            }
        }
    }
}
