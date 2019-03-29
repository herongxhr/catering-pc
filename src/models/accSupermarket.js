import { queryCatalogF, queryBrands, queryFGoods } from '../services/api';

export default {
    namespace: 'accSupermarket',
    state: {
        catalogList: [],
        brandList: [],
        FGoodData: {},
        showCartDrawer: false,
        shoppingCart: []
    },
    effects: {
        *fetchCatalogF({ payload }, { call, put }) {
            const data = yield call(queryCatalogF, payload);
            yield put({
                type: 'saveCatalogF',
                payload: data
            });
        },
        *fetchBrands({ payload }, { call, put }) {
            const data = yield call(queryBrands, payload);
            yield put({
                type: 'saveBrands',
                payload: data
            });
        },
        *fetchFGoods({ payload }, { call, put }) {
            const data = yield call(queryFGoods, payload);
            yield put({
                type: 'saveFGoods',
                payload: data
            })
        }
    },

    reducers: {
        saveCatalogF(state, { payload }) {
            return {
                ...state,
                catalogList: payload
            };
        },
        saveBrands(state, { payload }) {
            return {
                ...state,
                brandList: payload.records
            }
        },
        saveFGoods(state, { payload }) {
            return {
                ...state,
                FGoodData: payload || {}
            }
        },
        // 显示购物车页面
        showCartDrawer(state) {
            return {
                ...state,
                showCartDrawer: true,
            }
        },
        // 隐藏购物车详情
        hideCartDrawer(state) {
            return {
                ...state,
                showCartDrawer: false,
            }
        },
        // 加商品到购物车
        addToCart(state, { payload }) {
            const { id, quantity } = payload;
            // 看一下购物车里，有没有要加的商品
            let isExist = state.shoppingCart.find(item => item.id === id);
            // 如果有的话,改一下数量
            if (isExist) {
                return {
                    ...state,
                    shoppingCart: state.shoppingCart.map(item => {
                        if (item.id === id) {
                            return {
                                skuId: id,
                                quantity: item.quantity + quantity,
                            }
                        }
                        return item;
                    }),
                }
            } else {
                return {
                    ...state,
                    shoppingCart: state.shoppingCart.concat({
                        skuId: id,
                        quantity,
                    }),
                }
            }
            // 如果购物车为空，直接把商品加进去
        },
        // 修改购物车内商品数量
        changeCartNum(state, { payload }) {
            let { id, value } = payload;
            return {
                ...state,
                shoppingCart: state.shoppingCart.map(item => {
                    if (item.id === id) {
                        return {
                            id,
                            quantity: value,
                        }
                    }
                    return item;
                })
            }
        },
        // 删除购物车中商品
        deleteCartGoods(state, { payload }) {
            let { id } = payload;
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(item => item.id !== id),
            }
        }
    },
};