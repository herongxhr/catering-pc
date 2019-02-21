import { queryTodoList } from '../services/api';

export default {
    namespace: 'home',
    state: {
        todoList: {},
    },
    effects: {     
        //其中payload为视图层dispatch方法所传
        //作为call方法首参数异步方法的参数再传入
        *queryTodoLists(_, { call, put }) {
            console.log('123');
            //call方法首参数为要调用的异步方法
            const { data } = yield call(queryTodoList);
            console.log(data);
            yield put({
                type: 'save',
                payload: data || {},
            });
        },
    },
    reducers: {
        save(state, { payload }) {
            console.log(payload);
            return {
                ...state,
                todoList: payload,
            };
        },
    },
};