import {
    queryDishes,
    queryMenuData,
    queryMenuDetails,
    toUpdateMenu,
    toNewMenu,
    queryPMenuTemplate,
    queryCMenuTemplate,
    queryPTemplateDetails,
    queryCTemplateDetails,
    toNewTemplate,
    toUpdateTemplate,
    toCopyTemplate,
    toDeleteTemplate,
    toSaveAsMyTemplate,
    queryHasAnyTemplate,
    queryFoodDetail
} from '../services/api';

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
        // 对菜单操作结果
        createMenuDataResult: '',
        newTemplateResult: '',
        // 模板标签
        tagString: '',
        queryHasAnyTemplate: 0,
        dishDetailData:{}
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
        // 更新菜单数据
        *updateMenu({ payload }, { call, put, select }) {
            const params = yield select(({ menuCenter }) => {
                const camenuDetailVos = menuCenter.allMealsData;
                return {
                    ...payload,
                    camenuDetailVos
                }
            });
            const res = yield call(toUpdateMenu, params);
        },
        *newMenu({ payload }, { call, put, select }) {
            const params = yield select(({ menuCenter }) => {
                const camenuDetails = menuCenter.allMealsData;
                return {
                    ...payload,
                    camenuDetails
                }
            });
            const res = yield call(toNewMenu, params);
            yield put({
                type: 'saveNewMenuDataResult',
                payload: res
            })
        },
        // 餐饮单位模板列表
        *fetchPMenuTemplate({ payload }, { call, put }) {
            const data = yield call(queryPMenuTemplate, payload);
            yield put({
                type: 'savePMenuTemplate',
                payload: data || {},
            })
        },
        // 获取我的模板详情数据
        *fetchPTemplateDetails({ payload }, { call, put }) {
            const data = yield call(queryPTemplateDetails, payload);
            yield put({
                type: 'saveTemplateDetails',
                payload: data || {},
            });
        },
        // 餐饮管理单位模板列表
        *fetchCMenuTemplate({ payload }, { call, put }) {
            const data = yield call(queryCMenuTemplate, payload);
            yield put({
                type: 'saveCMenuTemplate',
                payload: data || {},
            })
        },
        // 获取我的模板详情数据
        *fetchCTemplateDetails({ payload }, { call, put }) {
            const data = yield call(queryCTemplateDetails, payload);
            yield put({
                type: 'saveTemplateDetails',
                payload: data || {},
            });
        },
        // 对模板进行复制和删除
        *templateActions({ payload }, { call, put }) {
            const { id, action, callback } = payload;
            let actionFunc;
            // 根据操作类型调用不同的方法及相应的接口
            if (action === 'copy') {
                actionFunc = toCopyTemplate;
            }
            if (action === 'delete') {
                actionFunc = toDeleteTemplate;
            }
            if (action === 'saveAsMy') {
                actionFunc = toSaveAsMyTemplate;
            }
            const data = yield call(actionFunc, id);
            // 把操作结果保存一下
            yield put({
                type: 'saveTemplateActionResult',
                payload: data,
            });
            callback();
        },
        // 新建模板
        *newTemplate({ payload }, { call, put, select }) {
            const params = yield select(({ menuCenter }) => {
                const camenuTemplateDetails = menuCenter.allMealsData;
                const tags = menuCenter.tagString;
                return {
                    payload,
                    tags,
                    camenuTemplateDetails
                }
            });
            const data = yield call(toNewTemplate, params);
            yield put({
                type: 'saveNewTemplateResult',
                payload: data || ''
            })
        },
        // 新建模板或编辑模板
        *updateTemplate({ payload }, { call, put, select }) {
            const params = yield select(({ menuCenter }) => {
                const camenuTemplateDetails = menuCenter.allMealsData;
                return {
                    ...payload,
                    camenuTemplateDetails
                }
            });
            const res = yield call(toUpdateTemplate, params);
            yield put({
                type: 'saveNewTemplateDataResult',
                payload: res
            })
        },
        *hasAnyTemplate(_, { call, put }) {
            const data = yield call(queryHasAnyTemplate)
            yield put({
                type: 'saveQueryHasAnyTemplate',
                payload: data || 0
            })
        },
        // 获取菜品数据 
        *fetchDishes({ payload }, { call, put }) {
            const data = yield call(queryDishes, payload);
            yield put({
                type: 'saveDishes',
                payload: data || {}
            })
        },
        *queryFoodDetail({ payload }, { call, put }) {
            const data = yield call(queryFoodDetail, payload);
            console.log(data)
            yield put({
                type: 'saveDishesDetail',
                payload: data || {}
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
        savePMenuTemplate(state, { payload }) {
            return {
                ...state,
                PMenuTemplate: payload
            }
        },
        saveCMenuTemplate(state, { payload }) {
            return {
                ...state,
                CMenuTemplate: payload || {}
            }
        },
        // 保存我的或推荐模板详情
        saveTemplateDetails(state, { payload }) {
            return {
                ...state,
                // 直接扁平化每天排餐数据
                templateDetails: payload,
                tagString: state.templateDetails.tagString || '',
                allMealsData: payload.foodArrangeVOMap || [],
            }
        },
        // 保存菜品库中的菜品数据
        saveDishes(state, { payload }) {
            return {
                ...state,
                dishesData: payload
            }
        },
        // 清空state中的菜单/模板的排餐数据
        // 包含菜单详情，模板详情
        // 以及它们展开之后每天的排餐数据
        clearMenuDetails(state, _) {
            return {
                ...state,
                allMealsData: [],
                menuDetails: {},
                templateDetails: {},
                createMenuDataResult: ''
            }
        },
        clearTemplateDetails(state, _) {
            return {
                ...state,
                allMealsData: [],
                templateDetails: {},
                newTemplateResult: ''
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
        saveNewMenuDataResult(state, { payload }) {
            return {
                ...state,
                createMenuDataResult: payload
            }
        },
        // 新建模板执行结果
        saveNewTemplateResult(state, { payload }) {
            return {
                ...state,
                newTemplateResult: payload
            }
        },
        editTag(state, { payload }) {
            const { tag, flag } = payload;
            // tags有可能undefined或为''
            const tagReg = new RegExp(tag + ",?")
            if (flag === 1) {
                return {
                    ...state,
                    tagString: state.tagString
                        ? state.tagString + ',' + tag
                        : `${tag}`
                }
            };
            if (flag === -1) {
                return {
                    ...state,
                    tagString: state.tagString.replace(tagReg, '')
                }
            };
        },
        saveQueryHasAnyTemplate(state, { payload }) {
            return {
                ...state,
                queryHasAnyTemplate: payload
            }
        },
        saveDishesDetail(state, { payload }) {
            return {
                ...state,
                dishDetailData: payload
            }
        },
        // 根据flag确定是增加还是删除
        changeArrangedMeals(state, { payload }) {
            const {
                record, mealTimes, zj, forStaff, isAdd, currFoodId, flag
            } = payload;
            // const mealsByWeekday = sortMealsData(allMealsData, 'zj');
            // const oneDayMeals = zj && mealsByWeekday[zj] || {};
            // const oneDayMealsSortByName = mealTimes && sortMealsData(oneDayMeals, 'mealTimes') || {}
            // const isExist = oneDayMealsSortByName[mealTimes].some(meal => meal.foodId === currFoodId);
            switch (flag) {
                // 增加
                case 1:
                    return {
                        ...state,
                        allMealsData: [...state.allMealsData, {
                            foodId: record.id,
                            viewFood: {
                                foodName: record.foodName,
                                gg: record.gg
                            },
                            forStaff,
                            mealTimes,
                            zj,
                            isAdd,
                        }]
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
                                        foodId: record.id,
                                        viewFood: {
                                            foodName: record.foodName,
                                            gg: record.gg
                                        },
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
                    return null;
            }
        }
    }
}
