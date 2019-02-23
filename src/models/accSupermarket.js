import { queryCatalogF, queryHotGoods } from '../services/api';

export default {
    namespace: 'accSupermarket',
    state: {
        catalogF: [],
        saveHotGoods: [],
    },
    effects: {
        //请求辅料分类
        *fetchCatalogF(_, { call, put }) {
            console.log('123')
            //call方法首参数为要调用的异步方法
            const { data } = yield call(queryCatalogF);
            console.log("model:data", data);
            //put方法类似于dispatch方法
            yield put({
                //本模块内方法的type不需要加namespace前缀
                type: 'saveCatalogF',
                payload: data.catalogF || [],
            });
        }

    },

    // 获取热销产品，每个分类1-2个
    // *fetchHotGoods({ payload }, { call, put }) {
    //     const { data } = yield call(queryHotGoods, payload);
    //     yield put ({
    //         type: 'saveHotGoods',
    //         payload: data.saveHotGoods || [],
    //     })

    // }
    reducers: {
        saveCatalogF(state, { payload }) {
            console.log(payload);
            return {
                ...state,
                catalogF: state.catalogF.concat(payload),
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