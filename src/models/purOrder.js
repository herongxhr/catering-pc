import { queryOrderTable } from '../services/api';

export default {
    namespace: 'purOrder',
    state: {
        orderTable:[],
        rawData: [],
    },
    effects: {
        *queryOrderTable({ payload }, { call, put }) {
            const data = yield call(queryOrderTable, payload);
            yield put({
                type: 'savePurOrderTable',
                payload: data,
            })
        }
    },
    reducers: {
        savePurOrderTable(state, { payload }) {
            return {
                ...state,
                orderTable: payload,
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