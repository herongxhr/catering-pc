import { queryDelivery , querySupplier , queryCount , queryDistributionDetail , queryDetailReplacement ,
    queryExecute , queryGoodsMX , queryLog , queryTicket } from '../services/api';

export default {
    namespace:'deliveryAcce',
    state: {
        delivery: {},
        count:{},
        detailData:{},
        execute:'',
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
        *queryExecute({payload}, { call, put }) {
            const data = yield call(queryExecute,payload);
             //console.log(data,'11111')
            yield put({
                type:'saveExecute',   
                payload: data,
            })
        },
        *queryTicket({payload}, { call, put }) {
            const data = yield call(queryTicket,payload);
            //console.log(data)
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
        saveExecute(state, { payload }) {
            return {
                ...state,
                execute: payload,
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