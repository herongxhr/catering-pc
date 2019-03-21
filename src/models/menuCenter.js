import {
    toCopyTemplate,
    toDeleteTemplate,
    queryMyMenuTemplate,
    queryNewMenuTemplate,
    queryMyTemplateDetails,
    queryNewTemplateDetails,
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
        // 我的菜单模板数据
        myMenuTemplate: {},
        // 推荐菜单模板数据
        newMenuTemplate: {},
        // 当前选中模板类型
        activeTemplateType: 'my',
        // 所有可选菜品数据
        dishesData: {},
        // 模板详情页数据
        templateDetails: {},
        // 排餐表格中菜品数据
        arrangedDishes: [],
        // 是不是统一菜单模式下
        isUnified: true,
        // 对模板操作的结果
        templateActionResult: true,
    },
    effects: {
        *fetchMyMenuTemplate({ payload }, { call, put }) {
            const defultOptions = {
                orderByAttr: 'create_date',
                desc: true,
                searchContent: null,
                current: 1,
                pageSize: 10
            };
            const newPayload = {
                ...defultOptions,
                ...payload
            };
            const data = yield call(queryMyMenuTemplate, newPayload);
            yield put({
                type: 'saveMyMenuTemplate',
                payload: data,
            })
        },
        *fetchNewMenuTemplate({ payload }, { call, put }) {
            const defultOptions = {
                orderByAttr: 'create_date',
                desc: true,
                searchContent: '',
                current: 1,
                pageSize: 10
            };
            const newPayload = {
                ...defultOptions,
                ...payload
            };
            const data = yield call(queryNewMenuTemplate, newPayload);
            yield put({
                type: 'saveNewMenuTemplate',
                payload: data,
            })
        },
        *fetchMenuTemplate({ payload = {} }, { call, put, select }) {
            const defultOptions = {
                orderByAttr: 'create_date',
                desc: true,
                searchContent: '',
                current: 1,
                pageSize: 10
            }
            const newPayload = {
                ...defultOptions,
                ...payload
            }
            const templateType = yield select(({ menuCenter }) => menuCenter.activeTemplateType);
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
        // 对模板进行复制和删除
        *templateActions({ payload }, { call, put }) {
            const { id, action } = payload;
            let actionFunc;
            // 根据操作类型调用不同的方法及相应的接口
            if (action === 'copy') {
                actionFunc = toCopyTemplate;
            }
            if (action === 'delete') {
                actionFunc = toDeleteTemplate;
            }
            const data = yield call(actionFunc, id);
            // 如果操作成功，获取一下模板数据
            if (data) {
                yield put({
                    type: 'fetchMenuTemplate',
                })
            }
            // 把操作结果保存一下
            yield put({
                type: 'saveTemplateActionResult',
                payload: data,
            })
        },
        // 编辑模板
        * editTemplate({ payload }, { call, put }) {
            const data = yield call(toDeleteTemplate, payload);
            yield put({
                type: 'saveTemplateActionResult',
                payload: data,
            })
        },
        // 获取统一菜单列表
        * fetchUnifiedMenu({ payload }, { call, put }) {
            const data = yield call(queryUnifiedMenu, payload);
            yield put({
                type: 'saveMenuList',
                payload: data,
            })
        },
        // 获取我的菜单列表
        * fetchMyMenu({ payload }, { call, put }) {
            const data = yield call(queryMyMenu, payload);
            yield put({
                type: 'saveMenuList',
                payload: data,
            })
        },
        // 获取统一菜单详情
        * fetchUnifiedMenuDetails({ payload }, { call, put }) {
            const data = yield call(queryUnifiedMenuDetails, payload);
            yield put({
                type: 'saveMenuDetails',
                payload: data
            });
            yield put({
                type: 'saveEverydayData',
                payload: data.camenuDetailVOMap
            })
            // 改为统一菜单模式
            yield put({
                type: 'changeMenuMode',
                payload: true
            })
        },
        // 获取我的菜单详情
        * fetchMyMenuDetails({ payload }, { call, put }) {
            const data = yield call(queryMyMenuDetails, payload);
            yield put({
                type: 'saveMenuDetails',
                payload: data,
            });
            yield put({
                type: 'saveEverydayData',
                payload: data.camenuDetailVOMap
            });
            // 改为我的菜单模式
            yield put({
                type: 'changeMenuMode',
                payload: false
            })
        },
        // 获取菜品数据 
        * fetchDishes({ payload }, { call, put }) {
            const data = yield call(queryDishes, payload);
            yield put({
                type: 'saveDishes',
                payload: data,
            })
        },
        // 获取我的模板详情数据
        * fetchMyTemplateDetails({ payload }, { call, put }) {
            const data = yield call(queryMyTemplateDetails, payload);
            yield put({
                type: 'saveTemplateDetails',
                payload: data,
            });
            // 将模板数据扁平化
            yield put({
                type: 'saveEverydayData',
                payload: data.camenuTemplateDetailVOMap
            });
        },
        // 获取我的模板详情数据
        * fetchNewTemplateDetails({ payload }, { call, put }) {
            const data = yield call(queryNewTemplateDetails, payload);
            yield put({
                type: 'saveTemplateDetails',
                payload: data,
            });
            // 将模板数据扁平化
            yield put({
                type: 'saveEverydayData',
                payload: data.camenuTemplateDetailVOMap
            });
        }
    },
    reducers: {
        saveMenuTemplate(state, { payload }) {
            return {
                ...state,
                menuTemplate: { ...payload }
            }
        },
        saveMyMenuTemplate(state, { payload }) {
            return {
                ...state,
                myMenuTemplate: { ...payload }
            }
        },
        saveNewMenuTemplate(state, { payload }) {
            return {
                ...state,
                newMenuTemplate: { ...payload }
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
        // 保存我的或推荐模板详情
        saveTemplateDetails(state, { payload }) {
            return {
                ...state,
                // 直接扁平化每天排餐数据
                templateDetails: payload
            }
        },
        // 改变菜单模式
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
        // 对模板的操作复制、删除结果
        saveTemplateActionResult(state, { payload }) {
            return {
                ...state,
                templateActionResult: payload
            }
        },
        editTag(state, { payload }) {
            const { tag, flag } = payload;
            // tags有可能undefined或为''
            const rawTags = state.templateDetails.tags || '';
            const tagReg = new RegExp(tag + ",")
            if (flag === 1) {
                return {
                    ...state,
                    templateDetails: {
                        ...state.templateDetails,
                        tags: `${rawTags},${tag}`
                    }
                }
            };
            if (flag === -1) {
                return {
                    ...state,
                    templateDetails: {
                        ...state.templateDetails,
                        tags: rawTags.replace(tagReg, '')
                    }
                }
            };
        },
        // 根据flag确定是增加还是删除
        changeArrangedMeals(state, { payload }) {
            const {
                record, colIndex, rowIndex, forStaff, isAdd, currFoodId, flag
            } = payload;
            console.log('payload:', payload);
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
                case 0:
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
                default:
                    return;
            }
        }
    }
}
