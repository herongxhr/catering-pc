import {
    toCopyTemplate,
    toDeleteTemplate,
    queryMyMenuTemplate,
    queryNewMenuTemplate,
    queryTemplateDetail,
    queryDishes,
    queryUnifiedMenu,
    queryUnifiedMenuDetails,
    queryMyMenu,
    queryMyMenuDetails,
} from '../services/api';

export default {
    namespace: 'menuCenter',
    state: {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
        sunday: {},
        // 统一或我的菜单数据
        menuList: {},
        // 统一或我的菜单详情
        menuDetails: {},
        // 菜单模板数据
        menuTemplate: {},
        // 当前选中模板类型
        activeTemplateType: 'my',
        // 所有可选菜品数据
        dishesData: {},
        // 菜单详情页数据
        templateDetail: {},
        arrangedDishes: [],
        // 是不是统一菜单模式下
        isUnified: true,
        // 记录一周每一天早中晚等每一餐的数组
        // 每个元素代表排餐表的一行，也就是一天
        //dishesInMenu: [],
        // dishesInMenu: Array.from({ length: 7 }).map((weekdayRow = {}, index) => {
        //     const weekday = ['一', '二', '三', '四', '五', '六', '日'];
        //     weekdayRow.id = index;
        //     weekdayRow.weekday = weekday[index];
        //     weekdayRow.breakfast = [];
        //     weekdayRow.lunch = [];
        //     weekdayRow.dessert = [];
        //     weekdayRow.dinner = [];
        //     return weekdayRow;
        // })
    },
    effects: {
        *fetchMenuTemplate({ payload = {} }, { call, put, select }) {
            const defultOptions = {
                orderByAttr: 'create_date',
                desc: true,
                searchContent: null,
                current: 1,
                pageSize: 10
            }
            const newPayload = {
                ...defultOptions,
                ...payload
            }
            const templateType = yield select(({ menuCenter }) => menuCenter.activeTemplateType);
            console.log('tem', templateType);
            let data = {};
            if (templateType === 'new') {
                data = yield call(queryNewMenuTemplate, newPayload);
            } else {
                data = yield call(queryMyMenuTemplate, newPayload);
            }
            yield put({
                type: 'saveMenuTemplate',
                payload: data,
            })
        },
        *copyTemplate({ payload }, { call, put }) {
            const data = yield call(toCopyTemplate, payload);
            yield put({
                type: 'saveMenuTemplate',
                payload: data,
            })
        },
        *deleteTemplate({ payload }, { call, put }) {
            const data = yield call(toDeleteTemplate, payload);
            yield put({
                type: 'saveMenuTemplate',
                payload: data,
            })
        },
        // 获取统一菜单列表
        *fetchUnifiedMenu({ payload }, { call, put }) {
            const data = yield call(queryUnifiedMenu, payload);
            yield put({
                type: 'saveMenuList',
                payload: data,
            })
        },
        // 获取我的菜单列表
        *fetchMyMenu({ payload }, { call, put }) {
            const data = yield call(queryMyMenu, payload);
            yield put({
                type: 'saveMenuList',
                payload: data,
            })
        },
        // 获取统一菜单详情
        *fetchUnifiedMenuDetails({ payload }, { call, put }) {
            const data = yield call(queryUnifiedMenuDetails, payload);
            yield put({
                type: 'saveMenuDetails',
                payload: data
            });
            yield put({
                type: 'saveEverydayData',
                payload: data.camenuDetailVOMap
            })
            yield put({
                type: 'changeMenuMode',
                payload: true
            })
        },
        // 获取我的菜单详情
        *fetchMyMenuDetails({ payload }, { call, put }) {
            const data = yield call(queryMyMenuDetails, payload);
            yield put({
                type: 'saveMenuDetails',
                payload: data,
            });
            yield put({
                type: 'saveEverydayData',
                payload: data.camenuDetailVOMap
            });
            yield put({
                type: 'changeMenuMode',
                payload: false
            })
        },
        *fetchDishes({ payload }, { call, put }) {
            const data = yield call(queryDishes, payload);
            yield put({
                type: 'saveDishes',
                payload: data,
            })
        },
        *fetchTemplateDetail({ payload }, { call, put }) {
            const data = yield (queryTemplateDetail, payload);
            yield put({

            })
        }
    },

    reducers: {
        saveMenuTemplate(state, { payload }) {
            return {
                ...state,
                menuTemplate: { ...payload }
            }
        },
        // 保存菜品库中的菜品数据
        saveDishes(state, { payload }) {
            return {
                ...state,
                dishesData: { ...payload }
            }
        },
        // 保存菜单统一或我的菜单列表数据
        saveMenuList(state, { payload }) {
            return {
                ...state,
                menuList: { ...payload }
            }
        },
        // 保存菜单统一或我的菜单详情
        saveMenuDetails(state, { payload }) {
            return {
                ...state,
                // 直接扁平化每天排餐数据
                menuDetails: payload
            }
        },
        // 保存菜单统一或我的菜单详情中每天的排餐数据
        saveEverydayData(state, { payload }) {
            return {
                ...state,
                // 直接扁平化每天排餐数据
                ...payload,
            }
        },
        changeMenuMode(state, { payload }) {
            return {
                ...state,
                isUnified: payload
            }
        },
        changeTemplateType(state, { payload }) {
            return {
                ...state,
                activeTemplateType: payload
            }
        },
        // 根据flag确定是增加还是删除
        changeArrangedDishes(state, { payload }) {
            const {
                record, colIndex, rowIndex, forStaff, isAdd, currFoodId, flag
            } = payload;
            // 进行数组操作时，没有排餐的餐次取默认空数组
            const rawDishes = state[rowIndex][colIndex] || [];
            // 增加
            switch (flag) {
                // 增加
                case 1:
                    return {
                        ...state,
                        // [rowIndex] 代表的是周几，如monday
                        [rowIndex]: {
                            ...state[rowIndex],
                            // [colIndex] 为餐次名称，如早、中、晚餐
                            [colIndex]: rawDishes.concat({
                                ...record,
                                forStaff,
                                isAdd
                            })
                        }
                    }
                // 删除
                case -1:
                    return {
                        ...state,
                        [rowIndex]: {
                            ...state[rowIndex],
                            // [colIndex] 为餐次名称，如breakfast,lunch等
                            [colIndex]: rawDishes.filter(item =>
                                item.foodId !== record.foodId
                            )
                        }
                    }
                // 点击列表时对菜品进行替换
                // 如果是统一菜品，isAdd和forStaff属性值为undefined
                // 如果是自己加的菜品，这些属性可以在属性展开的时候保留
                default:
                    return {
                        ...state,
                        [rowIndex]: {
                            ...state[rowIndex],
                            [colIndex]: rawDishes.map(item => {
                                // 如果是我们点进去准备操作的菜品
                                if (item.foodId === currFoodId) {
                                    return {
                                        ...item,
                                        // 记录之前的菜名和id
                                        preFoodId: item.foodId,
                                        preFoodName: item.foodName,
                                        ...record,
                                    }
                                }
                                // 如果不是我们点进去的那个菜品
                                return item;
                            })
                        }
                    };
            }
        }
    }
}
