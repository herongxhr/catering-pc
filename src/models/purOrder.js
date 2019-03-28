import { queryModalSelect, queryOrderForm, queryOrderSelectf, 
    queryOrderTable, queryOrderDetails, queryOrderItemGoods,
    queryOrderPlace, queryDeleteByIds } from '../services/api';

export default {
    namespace: 'purOrder',
    state: {
        orderTable: {},
        orderDetails: [],
        orderItemGoods: [],
        orderSelectf: [],
        changeOrderForm: false,
        modalSelect: [],
        orderTableForm: [], //采购订单表单列表
        alertPrice: false,
        orderPlace:'',
        orderDelete:''
    },
    effects: {
        *queryModalSelect({ payload }, { call, put }) {
            const data = yield call(queryModalSelect, payload);
            yield put({
                type: 'saveModalSelect',
                payload: data,
            })
        },
        *queryOrderSelectf({ payload, callback }, { call, put }) {
            const { type } = payload
            const data = yield call(queryOrderSelectf, payload);
            yield put({
                type: 'queryModalSelect',
                payload: {
                    type
                }
            })
            if (data) {
                if (callback && typeof callback === 'function') {
                    callback(data);
                }
            }
        },
        *queryOrderTable({ payload }, { call, put }) {
            const data = yield call(queryOrderTable, payload);
            //console.log(data)
            yield put({
                type: 'savePurOrderTable',
                payload: data || {},
            })
        },
        *queryOrderDetails({ payload }, { call, put }) {
            const data = yield call(queryOrderDetails, payload);
            yield put({
                type: 'savePurOrderDetails',
                payload: data,
            })
        },
        *queryOrderItemGoods({ payload }, { call, put }) {
            const data = yield call(queryOrderItemGoods, payload);
            yield put({
                type: 'saveItemGoods',
                payload: data,
            })
        },
        *queryChangeOrderItemGoods({ payload }, { call, put }) {
            const data = yield call(queryOrderItemGoods, payload);
            yield put({
                type: 'changeItemGoods',
                payload: data,
            })
        },
        *queryOrderForm({ payload }, { call, put }) {
            const data = yield call(queryOrderForm, payload);
            yield put({
                type: 'changeOrderForm',
                payload: data,
            })
        },
        *queryOrderPlace({ payload }, { call, put }) {
            const data = yield call(queryOrderPlace, payload);
            console.log(data)
            yield put({
                type: 'saveOrderPlace',
                payload: data,
            })
            if(data){
                yield put({
                    type: 'queryOrderTable',
                })
            }
        },
        *queryDeleteByIds({ payload }, { call, put }) {
            console.log(payload)
            const data = yield call(queryDeleteByIds, payload);
            yield put({
                type: 'saveDeleteByIds',
                payload: data,
            })
            if(data){
                yield put({
                    type: 'queryOrderTable',
                })
            }
        },
    },
    reducers: {
        priceVerify(state, { payload }) {
            return {
                ...state,
                alertPrice: payload
            }
        },
        InputorderForm(state, { payload }) {
            return {
                ...state,
                orderTableForm: payload
            }
        },
        addOrderTableForm(state, { payload }) {
            state.orderTableForm.push(payload)
            return {
                ...state,
                orderTableForm: state.orderTableForm
            }
        },
        delelteOrderTableForm(state, { payload }) {
            const { orderTableForm } = state
            for (let i = 0; i < orderTableForm.length; i++) {
                if (orderTableForm[i].skuId == payload) {
                    orderTableForm.splice(i, 1)
                    i--
                }
            }
            return {
                ...state,
                orderTableForm: [...state.orderTableForm]
            }
        },
        saveModalSelect(state, { payload }) {
            return {
                ...state,
                modalSelect: payload
            }
        },
        // saveOrderSelectf(state, { payload }) {

        //     return {
        //         ...state,
        //         orderSelectf: payload,
        //     }
        // },
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
                orderItemGoods: payload.records,
            }
        },
        changeItemGoods(state, { payload }) {
            return {
                ...state,
                orderItemGoods: payload.records.concat(state.orderItemGoods),
            }
        },
        changeOrderForm(state, { payload }) {
            return {
                ...state,
                orderItemGoods: payload,
            }
        },
        saveOrderPlace(state, { payload }) {
            return {
                ...state,
                orderPlace: payload,
            }
        },
        saveDeleteByIds(state, { payload }) {
            return {
                ...state,
                orderDelete: payload,
            }
        },
    }
}