import { queryDelivery } from '../services/api';

export default {
    namespace:'deliveryAcce',
    state: {
        delivery: [],
    },
    effects: {
        *queryDelivery({payload}, { call, put }) {
            const data = yield call(queryDelivery,payload);
            //console.log(data)
            yield put({
                type:'saveDelivery',
                payload: data,
            })
        }
    },
    reducers: {
        saveDelivery(state, { payload }) {
            return {
                ...state,
                delivery: payload,
            }
        }
    }
}