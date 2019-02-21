import { queryCatalog, queryHotGoods } from '../services/api';

export default {
    namespace: 'accSupermarket',
    state: {
        catalogF: {
            curr: 0,
            list: ['']
        },
        brand: {
            curr: 0,
            list: []
        },
        isCollect: {
            curr: 0,
            list: ['采购目录商品', '采购目录外商品']
        },
        saveHotGoods: [],
        filteredGoods: []
    },
    effects: {
        //请求辅料分类
        *fetchCatalog(_, { call, put }) {
            //call方法首参数为要调用的异步方法
            const data = yield call(queryCatalog);
            //put方法类似于dispatch方法
            yield put({
                //本模块内方法的type不需要加namespace前缀
                type: 'saveCatalogF',
                payload: data || [],
            });
        },

        // 获取热销产品，每个分类1-2个
        // *fetchHotGoods({ payload }, { call, put }) {
        //     const { data } = yield call(queryHotGoods, payload);
        //     yield put ({
        //         type: 'saveHotGoods',
        //         payload: data.saveHotGoods || [],
        //     })

        // }
    },
    reducers: {
        saveCatalogF(state, { payload }) {
            return {
                ...state,
                catalogF: {
                    ...state.catalogF,
                    list: payload
                },
            };
        },
        saveHotGoods(state, { payload }) {
            console.log(payload);
            return {
                ...state,
                catalogF: state.catalogF.concat(payload),
            };
        },
    },
};