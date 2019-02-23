import { queryTodoList, querytodayMenu,querydeviceInfo } from '../services/api';

export default {
    namespace: 'home',
    state: {
        todoList: [],
        todayMenu:{},
        deviceInfo:[]
    },
    effects: {     
        *queryTodoLists(_, { call, put }) {
            //call方法首参数为要调用的异步方法
            const  data  = yield call(queryTodoList);
             //console.log(data);
            yield put({
                type: 'saveTodoLists',
                payload: data.data || [],
            });
        },
        *querytodayMenu(_, { call, put }) {
            //call方法首参数为要调用的异步方法
            const  data  = yield call(querytodayMenu);
            //console.log(data);
            yield put({
                type: 'saveTodayMenu',
                payload: data.data || {},
            });
        },
        *querydeviceInfo({payload}, { call, put }) {
            //call方法首参数为要调用的异步方 法
            const  data  = yield call(querydeviceInfo);
            //console.log(data);
            yield put({
                type: 'savedeviceInfo',
                payload: data.data || {},
            });
        },
        
    },
    reducers: {
        saveTodoLists(state, { payload }) {
            //console.log(state)
            return {
                ...state,
                todoList: payload,
            };
        },
        saveTodayMenu(state, { payload }) {
            //console.log(payload);
            return {
                ...state,
                todayMenu: payload,
            };
        },
        savedeviceInfo(state, { payload }) {
            //console.log(payload);
            return {
                ...state,
                deviceInfo: payload,
            };
        },
    },
};