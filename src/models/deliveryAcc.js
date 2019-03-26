import { queryDelivery , querySupplier , queryCount , queryDistributionDetail , queryDetailReplacement ,
    queryExecute , queryGoodsMX , queryLog , queryTicket } from '../services/api';

export default {
    namespace:'deliveryAcce',
    state: {
        delivery: {},
        Supplier:[],
        count:{},
        detailData:{},
        replacementList:{},
        execute:'',
        GoodsList:{},
        logList:[],
        ticketData:[]
    },
    effects: {
        *queryDelivery({payload}, { call, put }) {
            const data = yield call(queryDelivery,payload);
           //console.log(data)
            yield put({
                type:'saveDelivery',
                payload: data,
            })
        },
        *querySupplier({payload}, { call, put }) {
            const data = yield call(querySupplier,payload);
            //console.log(data)
            yield put({
                type:'saveSupplier',
                payload: data,
            })
        },
        *queryCount({payload}, { call, put }) {
            const data = yield call(queryCount,payload);
            //console.log(data)
            yield put({
                type:'savecount',
                payload: data,
            })
        },
        *queryDistributionDetail({payload}, { call, put }) {
            const data = yield call(queryDistributionDetail,payload);
            //console.log(data)
            yield put({
                type:'savedetail',
                payload: data,
            })
        },
        *queryDetailReplacement({payload}, { call, put }) {
            const data = yield call(queryDetailReplacement,payload);
            //console.log(data)
            yield put({
                type:'saveReplacement',   
                payload: data,
            })
        },
        *queryExecute({payload}, { call, put }) {
            const data = yield call(queryExecute,payload);
             //console.log(data,'11111')
            yield put({
                type:'saveExecute',   
                payload: data,
            })
        },
        *queryGoodsMX({payload}, { call, put }) {
            const data = yield call(queryGoodsMX,payload);
            //console.log(data)
            yield put({
                type:'saveGoods',   
                payload: data,
            })
        },
        *queryLog({payload}, { call, put }) {
            const data = yield call(queryLog,payload);
            //console.log(data)
            yield put({
                type:'saveLog',   
                payload: data,
            })
        },
        *queryTicket({payload}, { call, put }) {
            const data = yield call(queryTicket,payload);
            console.log(data)
            yield put({
                type:'saveTicket',   
                payload: data,
            })
        },
    },
    reducers: {
        saveDelivery(state, { payload }) {
            return {
                ...state,
                delivery: payload,
            }
        },
        saveSupplier(state, { payload }) {
            return {
                ...state,
                Supplier: payload,
            }
        },
        savecount(state, { payload }) {
            return {
                ...state,
                count: payload,
            }
        },
        savedetail(state, { payload }) {
            return {
                ...state,
                detailData: payload,
            }
        },
        saveReplacement(state, { payload }) {
            return {
                ...state,
                replacementList: payload,
            }
        },
        saveExecute(state, { payload }) {
            return {
                ...state,
                execute: payload,
            }
        },
        saveGoods(state, { payload }) {
            return {
                ...state,
                GoodsList: payload,
            }
        },
        saveLog(state, { payload }) {
            return {
                ...state,
                logList: payload,
            }
        },
        saveTicket(state, { payload }) {
            return {
                ...state,
                ticketData: payload,
            }
        },
    }
}