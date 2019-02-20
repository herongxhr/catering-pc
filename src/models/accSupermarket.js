import { queryCatalogF } from '../services/api';

export default {
    namespace: 'accSupermarket',
    state: {
        catalogF: [],
    },
    effects: {
        //其中payload为视图层dispatch方法所传
        //作为call方法首参数异步方法的参数再传入
        *fetch({}, { call, put }) {
            //call方法首参数为要调用的异步方法
            const response = yield call(queryCatalogF);
            console.log(response);
            //put方法类似于dispatch方法
            yield put({
                //本模块内方法的type不需要加namespace前缀
                type: 'getCatalogF',
                payload: response.body.catalogF || [],
            });
        }
    },
    reducers: {
        getCatalogF(state, action) {
            return { ...state, catalogF: action.payload }
        },
    }
};