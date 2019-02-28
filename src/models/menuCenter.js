//import { queryPurOrder, queryOrderDetails } from '../services/api';

export default {
    namespace: 'menuCenter',
    state: {
        menuData: [],
    },
    // effects: {
    //     *fetchData(_, { call, put }) {
    //         const data = yield call(queryPurOrder);
    //         yield put({
    //             type: 'savePurOrderData',
    //             payload: data.purOrder,
    //         })
    //     }
    // },
    // reducers: {
    //     savePurOrderData(state, { payload }) {
    //         return {
    //             ...state,
    //             orderData: payload,
    //         }
    //     }
    // }
}