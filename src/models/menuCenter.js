import {
    toCopyTemplate,
    toDeleteTemplate,
    queryPMenuTemplate,
    queryCMenuTemplate,
    queryPTemplateDetails,
    queryCTemplateDetails,
    queryDishes,
    queryMenuData,
    queryMenuDetails,
    toUpdateMenu,
    addMenuData
} from '../services/api';
import { sortMealsData } from '../utils/utils';

export default {
    namespace: 'menuCenter',
    state: {
        // 统一或我的菜单数据
        menuList: {},
        // 统一或我的菜单详情
        menuDetails: {},
        // 每个菜单中所有的菜品数据
        allMealsData: [],
        // 餐饮单位模板数据
        PMenuTemplate: {},
        // 管理单位模板数据
        CMenuTemplate: {},
        // 模板详情页数据
        templateDetails: {},
        // 所有可选菜品数据
        dishesData: {},
        // 对模板操作的结果
        templateActionResult: true,
        // 新建菜单结果
        createMenuDataResult: ''
    },
    effects: {
        // 获取菜单列表,统一接口
        *fetchMenuData({ payload }, { call, put }) {
            const data = yield call(queryMenuData, payload);
            yield put({
                type: 'saveMenuList',
                payload: data || {}
            })
        },
        // 获取菜单详情,统一接口
        *fetchMenuDetails({ payload }, { call, put }) {
            const data = yield call(queryMenuDetails, payload);
            yield put({
                type: 'saveMenuDetails',
                payload: data || {}
            });
        },
        // 餐饮单位模板列表
        *fetchPMenuTemplate({ payload = {} }, { call, put }) {
            const defultOptions = {
                orderByAttr: 'create_date',
                isAsc: false,
                keywords: '',
                current: 1,
                pageSize: 10
            };
            const newPayload = {
                ...defultOptions,
                ...payload
            };
            const data = yield call(queryPMenuTemplate, newPayload);
            yield put({
                type: 'savePMenuTemplate',
                payload: data,
            })
        },
        // 餐饮管理单位模板列表
        *fetchCMenuTemplate({ payload = {} }, { call, put }) {
            const defultOptions = {
                orderByAttr: 'create_date',
                isAsc: false,
                keywords: '',
                current: 1,
                pageSize: 10
            };
            const newPayload = {
                ...defultOptions,
                ...payload
            };
            const data = yield call(queryCMenuTemplate, newPayload);
            yield put({
                type: 'saveCMenuTemplate',
                payload: data,
            })
        },
        // 获取我的模板详情数据
        *fetchPTemplateDetails({ payload }, { call, put }) {
            const data = yield call(queryPTemplateDetails, payload);
            yield put({
                type: 'saveTemplateDetails',
                payload: data,
            });
            // 将模板数据扁平化
            yield put({
                type: 'saveEverydayData',
                payload: data && data.camenuTemplateDetailVOMap
            });
        },
        // 获取我的模板详情数据
        *fetchCTemplateDetails({ payload }, { call, put }) {
            const data = yield call(queryCTemplateDetails, payload);
            yield put({
                type: 'saveTemplateDetails',
                payload: data,
            });
            // 将模板数据扁平化
            yield put({
                type: 'saveEverydayData',
                payload: data && data.camenuTemplateDetailVOMap
            });
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
        *editTemplate({ payload }, { call, put }) {
            const data = yield call(toDeleteTemplate, payload);
            yield put({
                type: 'saveTemplateActionResult',
                payload: data,
            })
        },
        // 更新菜单数据
        *updateMenu(_, { call, put, select }) {
            const params = yield select(({ menuCenter }) => {
                const {
                    camenu,
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday,
                    sunday,
                } = menuCenter;
                return {
                    camenu,
                    camenuDetailsMap: {
                        monday,
                        tuesday,
                        wednesday,
                        thursday,
                        friday,
                        saturday,
                        sunday,
                    }
                }
            });
            const res = yield call(toUpdateMenu, params);
        },
        // 新建菜单数据
        *createMenuData({ payload }, { call, put, select }) {
            const params = yield select(({ menuCenter }) => {
                const {
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday,
                    sunday,
                } = menuCenter;
                return {
                    camenuDetailsMap: {
                        monday,
                        tuesday,
                        wednesday,
                        thursday,
                        friday,
                        saturday,
                        sunday,
                    }
                }
            });
            const res = yield call(addMenuData, { ...params, camenu: payload, });
            yield put({
                type: 'saveCreateMenuDataResult',
                payload: res
            })
            console.log('上传', res);
        },
        // 获取菜品数据 
        *fetchDishes({ payload }, { call, put }) {
            const data = yield call(queryDishes, payload);
            yield put({
                type: 'saveDishes',
                payload: data,
            })
        },
    },
    reducers: {
        // 保存菜单列表数据
        saveMenuList(state, { payload }) {
            return {
                ...state,
                menuList: payload
            }
        },
        // 保存菜单详情
        saveMenuDetails(state, { payload }) {
            return {
                ...state,
                menuDetails: payload,
                allMealsData: payload.camenuDetailVos || [],
            }
        },
        // 保存菜单/模板详情中每天的排餐数据
        saveEverydayData(state, { payload }) {
            return {
                ...state,
                // 直接扁平化每天排餐数据
                ...payload,
            }
        },
        savePMenuTemplate(state, { payload }) {
            return {
                ...state,
                PMenuTemplate: { ...payload }
            }
        },
        saveCMenuTemplate(state, { payload }) {
            return {
                ...state,
                CMenuTemplate: { ...payload }
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
        // 保存菜品库中的菜品数据
        saveDishes(state, { payload }) {
            return {
                ...state,
                dishesData: { ...payload }
            }
        },
        // 清空state中的菜单/模板的排餐数据
        // 包含菜单详情，模板详情
        // 以及它们展开之后每天的排餐数据
        clearMenuDetails(state, _) {
            return {
                ...state,
                monday: {},
                tuesday: {},
                wednesday: {},
                thursday: {},
                friday: {},
                saturday: {},
                sunday: {},
                menuDetails: {},
                templateDetails: {},
            }
        },
        // 对模板的操作复制、删除结果
        saveTemplateActionResult(state, { payload }) {
            return {
                ...state,
                templateActionResult: payload
            }
        },
        // 新建菜单执行结果
        saveCreateMenuDataResult(state, { payload }) {
            return {
                ...state,
                createMenuDataResult: !payload
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
                record, mealTimes, zj, forStaff, isAdd, currFoodId, flag
            } = payload;
            // const oneDayMealsSorted = state.mealsByWeekday[zj] != null
            //     ? sortMealsData(mealsByWeekday[zj], 'mealTimes') : {};
            // const oneMeal = oneDayMealsSorted[mealTimes] != null
            //     ? getTD(oneDayMealsSorted[mealTimes])
            //     : [];
            // 增加
            switch (flag) {
                // 增加
                case 1:
                    return {
                        ...state,
                        allMealsData: state.allMealsData.concat({
                            foodId: record.id,
                            foodVo: {
                                foodName: record.foodName
                            },
                            forStaff,
                            mealTimes,
                            zj,
                            isAdd,
                        })
                    }
                // 删除
                case -1:
                    return {
                        ...state,
                        allMealsData: state.allMealsData
                            .filter(meal => meal.foodId !== currFoodId)
                    }
                case 0:
                    return {
                        ...state,
                        allMealsData: state.allMealsData
                            .map(meal => {
                                if (meal.foodId === currFoodId) {
                                    return {
                                        sort: meal.sort,
                                        foodId: currFoodId,
                                        forStaff,
                                        mealTimes,
                                        zj,
                                        isAdd
                                    }
                                }
                                return meal;
                            })

                    };
                default:
                    return;
            }
        }
    }
}
