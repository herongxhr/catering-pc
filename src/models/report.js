import {  queryReportmissing,  } from '../services/api';

export default {
    namespace: 'report',
    state: {
       reportList:[],
    },
    effects: {     
        *queryReportmissing({ payload }, { call, put }) {
            //call方法首参数为要调用的异步方法
            const  data  = yield call(queryReportmissing,payload);
            console.log(data);
            yield put({
                type: 'savereportList',
                payload: data || {},
            });
        },
        
    },
    reducers: {
        savereportList(state, { payload }) {
            //console.log(payload);
            return {
                ...state,
                reportList: payload,
            };
        },
    },
};