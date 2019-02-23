import { } from '../../../services/api';

export default {
    namespace: 'rule',

    state: {
        data: {
            list: [],
            pagination: {},
        }
    },

    effects: {
        *fetcth({ payload }, { call, put }) {
            const response = yield call(queryRule, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        //加载更多
        *loadMore({ payload }, { call, put }) {

        },
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                data: payload
            }
        }
    }
}