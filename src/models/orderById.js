import { queryGoodsByOrderId } from '../services/api';

export default {
    namespace: 'orderById',
    state: {
        goods: [],
    },

    effects: {
        *fetchGoodsByOrderId(_, { call, put }) {
            console.log('123');
            const data = yield call(queryGoodsByOrderId);
            console.log('1a',data);
            yield put({
                type: 'saveGoods',
                payload: data,
            })
        }
    },
    reducers: {
        saveGoods(state, { payload }) {
            return {
                ...state,
                goods: payload,
            };
        }
    }
}