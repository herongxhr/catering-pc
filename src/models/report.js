import {  queryReportmissing, queryEager,queryWithdrawal,queryDetail,querySave } from '../services/api';

export default {
    namespace: 'report',
    state: {
       reportList:[],
       urgent:'',
       apply:'',
       detailData:{},
       reportGood:''
    },
    effects: {     
        *queryReportmissing({ payload }, { call, put }) {
            //call方法首参数为要调用的异步方法
            const  data  = yield call(queryReportmissing,payload);
            //console.log(data);
            yield put({
                type: 'savereportList',
                payload: data || {},
            });
        },
        *queryEager({ payload }, { call, put }) {
            //call方法首参数为要调用的异步方法
            const  data  = yield call(queryEager,payload);
            //console.log(data);
            yield put({
                type: 'saveEager',
                payload: data || {},
            });
        },
        *queryWithdrawal({ payload }, { call, put }) {
            //call方法首参数为要调用的异步方法
            const  data  = yield call(queryWithdrawal,payload);
            //console.log(data);
            yield put({
                type: 'saveWithdrawal',
                payload: data || {},
            });
        },
        *queryDetail({ payload }, { call, put }) {
            //call方法首参数为要调用的异步方法
            const  data  = yield call(queryDetail,payload);
            console.log(data);
            yield put({
                type: 'saveDetail',
                payload: data || {},
            });
        },
        //上报商品
        *querySave({ payload }, { call, put }) {
            //call方法首参数为要调用的异步方法
            const  data  = yield call(querySave,payload);
            //console.log(data);
            yield put({
                type: 'save',
                payload: data || {},
            });
            //上报商品判断渲染
            if(data){
                yield put({
                    type: 'queryReportmissing'
                });
            }
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
        saveEager(state, { payload }) {
            //console.log(payload);
            return {
                ...state,
                urgent: payload,
            };
        },
        saveWithdrawal(state, { payload }) {
            //console.log(payload);
            return {
                ...state,
                apply: payload,
            };
        },
        saveDetail(state, { payload }) {
            //console.log(payload);
            return {
                ...state,
                detailData: payload,
            };
        },
        save(state, { payload }) {
            //console.log(payload);
            return {
                ...state,
                reportGood: payload,
            };
        },
    },
};