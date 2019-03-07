import { queryDishes } from '../services/api';

export default {
    namespace: 'menuCenter',
    state: {
        menuData: [],
        templates: [],
        dishesData: {},
        // 记录一周每一天早中晚等每一餐的数组
        // 每个元素代表排餐表的一行，也就是一天
        dishesInMenu: []
    },
    effects: {
        *fetchDishes({ payload }, { call, put }) {
            const data = yield call(queryDishes, payload);
            yield put({
                type: 'saveDishes',
                payload: data,
            })
        }
    },
    reducers: {
        saveDishes(state, { payload }) {
            return {
                ...state,
                dishesData: { ...payload }
            }
        },
        // 根据flag确定是增加还是删除
        changeItemList(state, { payload }) {
            let { record, currRecord, currRowIndex, flag } = payload;
            // 增加
            if (flag === 1) {
                return {
                    ...state,
                    // 如果是同一行，就把新菜或食材放在当前列的数组里
                    dishesInMenu: state.dishesInMenu.map(item => {
                        return item.id === currRecord.id && item[currRowIndex].concat(record)
                    })
                }
            }
            // 删除
            if (flag === -1) {
                return {
                    ...state,
                    dishesInMenu: state.dishesInMenu.map(item => {
                        return item.id === currRecord.id && item[currRowIndex].filter(item => item.id !== record.id);
                    })
                }
            }
        }
    }
}