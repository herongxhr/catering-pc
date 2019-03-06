import { queryOrderData } from '../services/api';

export default {
    namespace: 'purOrder',
    state: {
        orderedData: [],
        rawData: [],
    },
    effects: {
        *fetchOrderData({ payload }, { call, put }) {
            const data = yield call(queryOrderData, payload);
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
                rawData: payload,
            }
        },
        filterOrder(state, { payload }) {
            return {
                ...state,
                orderedData: payload.filteredData,
                rawData: payload.rawData
            }
        }
    }
}