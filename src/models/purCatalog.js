import { queryPurCatalog } from '../services/api';

export default {
    namespace:'purCatalog',
    state: {
        catalogData: [],
    },
    effects: {
        *queryPurCatalog({payload}, { call, put }) {
            const data = yield call(queryPurCatalog,payload);
            //console.log(data)
            yield put({
                type:'savePurCatalog',
                payload: data,
            })
        }
    },
    reducers: {
        savePurCatalog(state, { payload }) {
            return {
                ...state,
                catalogData: payload,
            }
        }
    }
}