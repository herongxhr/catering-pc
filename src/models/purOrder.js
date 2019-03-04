import { queryPurOrder, queryOrderDetails } from '../services/api';

export default {
    namespace: 'purOrder',
    state: {
        orderedData: [
            // {
            //     "key": 2,
            //     "date": "1975-07-05",
            //     "abstract": "胡萝卜丶山药丶番茄丶香蕉",
            //     "distribution_date": "1975-07-05",
            //     "status": "1",
            //     "channel": "N",
            //     "comment":"快点送到啊",
            //     "totalAmount": 133134,
            //     "orderId": 12334456,
            // }
        ],
        rawData: [],
    },
    effects: {
        *fetchData({ payload }, { call, put }) {
            const data = yield call(queryPurOrder, payload);
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