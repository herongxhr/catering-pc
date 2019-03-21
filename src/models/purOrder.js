import { queryOrderTable , queryOrderDetails , queryOrderItemGoods} from '../services/api';

export default {
    namespace: 'purOrder',
    state: {
        orderTable:[],
        orderDetails: [],
        orderItemGoods:[]
    },
    effects: {
        *queryOrderTable({ payload }, { call, put }) {
            const data = yield call(queryOrderTable, payload);
            yield put({
                type: 'savePurOrderTable',
                payload: data,
            })
        },
        *queryOrderDetails({ payload }, { call, put }) {
            const data = yield call(queryOrderDetails, payload);
            yield put({
                type: 'savePurOrderDetails',
                payload: data,
            })
        },
        *queryOrderItemGoods({ payload },{ call, put}) {
            const data = yield call(queryOrderItemGoods, payload);
            yield put({
                type: 'saveItemGoods',
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
        savePurOrderDetails(state, { payload }) {
            return {
                ...state,
                orderDetails: payload,
            }
        },
        saveItemGoods(state, { payload }) {
            return {
                ...state,
                orderItemGoods: payload.records.concat(state.orderItemGoods),
            }
        },
    }
}