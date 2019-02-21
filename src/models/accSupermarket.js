import { queryCatalog, queryHotGoods } from '../services/api';

export default {
    namespace: 'accSupermarket',
    state: {
        catalogList: [],
        currCatalog: 0,
        brandList: [],
        currBrand: 0,
        collectStatusList: [
            {
                id: 1,
                status_name: "采购目录中商品"
            },
            {
                id: 2,
                status_name: "采购目录外商品"
            }
        ],
        currCollectStatus: 0,
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
                type: 'saveCatalog',
                payload: data || [],
            });
        },
    },

    reducers: {
        saveCatalog(state, { payload }) {
            return {
                ...state,
                catalogList: payload,
            };
        },
        saveHotGoods(state, { payload }) {
            console.log(payload);
            return {
                ...state,
                catalogF: state.catalogF.concat(payload),
            };
        },
        doFilter(state, { payload }) {
            if (payload.catalog_name) {
                return {
                    ...state,
                    currCatalog: payload.id,
                }
            } else if (payload.brand_name) {
                return {
                    ...state,
                    currBrand: payload.id
                }
            } else {
                return {
                    ...state,
                    currCollectStatus: payload.id,
                }
            }

        }
    },
};