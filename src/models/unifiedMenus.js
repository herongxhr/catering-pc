import {  unifiedMenusAlready  } from '../services/api';

export default {
  namespace:'unifiedMenus',
  state: {
    MenusList:[]
  },
  effects: {     
    *queryList({ payload }, { call, put }) {
        //call方法首参数为要调用的异步方法
        console.log(payload)
        const  data  = yield call(unifiedMenusAlready,payload);
        console.log(data);
        yield put({
            type: 'saveDistributionList',
            payload: data || {},
        });
    },   
},
  reducers:{
    'saveDistributionList'(state,{payload}) {
      return {
        ...state,
        MenusList: payload,
      };
    }
  }
}