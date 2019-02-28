import { queryPurOrder, queryOrderDetails } from '../services/api';

export default {
    namespace: 'purOrder',
    state: {
        orderData: [],
    },
    effects: {
        *fetchData(_, { call, put }) {
            const data = yield call(queryPurOrder);
            yield put({
                type: 'savePurOrderData',
                payload: data.purOrder,
            })
        }
    },
    reducers: {
        savePurOrderData(state, { payload }) {
            return {
                ...state,
                orderData: payload,
            }
        }
    }
}