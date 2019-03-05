import { queryGoodsByOrderId } from '../services/api';

export default {
    namespace: 'orderById',
    state: {
        orderDetail: {
            orderInfo: {},
            goodsDetail: []
        },
        currOrderId: '',
    },

    effects: {
        *fetchGoodsByOrderId({ payload }, { call, put }) {
            const data = yield call(queryGoodsByOrderId, payload);
            // select 用于从 state 里获取数据。
            // const todos = yield select(state => state.todos);
            yield put({
                type: 'saveGoods',
                payload: {
                    data,
                    id: payload
                },
            })
        }
    },
    reducers: {
        saveGoods(state, { payload }) {
            return {
                ...state,
                orderDetail: payload.data,
                currOrderId: payload.id
            };
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/purOrder/details') {
                    dispatch({
                        type: 'fetchGoodsByOrderId',
                        payload: location.query.id,
                    })
                }
            })
        }
    }
}