import {  queryParameterTable , queryParameterDetail } from '../services/api';

export default {
    namespace: 'parameter',
    state: {
        ParameterTable:[],
        ParameterDetail:[]
    },
    effects: {     
        *queryParameterTable({ payload }, { call, put }) {
            //call方法首参数为要调用的异步方法
            
            const  data  = yield call(queryParameterTable,payload);
            //console.log(data);
            yield put({
                type: 'saveParameterTable',
                payload: data || {},
            });
        },
        *queryParameterDetail({ payload }, { call, put }) {
          //call方法首参数为要调用的异步方法
          const  data  = yield call(queryParameterDetail,payload);
          //console.log(data);
          yield put({
              type: 'saveParameterDetail',
              payload: data || {},
          });
      },
    },
    reducers: {
        saveParameterTable(state, { payload }) {
            //console.log(payload);
            return {
                ...state,
                ParameterTable: payload,
            };
        },
        saveParameterDetail(state, { payload }) {
          //console.log(payload);
          return {
              ...state,
              ParameterDetail: payload,
          };
      },
    },
};