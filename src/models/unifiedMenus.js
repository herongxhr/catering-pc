import {  unifiedMenusAlready ,  myMenu , myTemplate , isRecommend , recommendTemplate , myCopy} from '../services/api';

export default {
  namespace:'unifiedMenus',
  state: {
    MenusList:[],
    myMenu:[],
    myTemplate:[],
    myRecommend:false,
    RecommendTemplate:[],
    myCopy:false
  },
  effects: {     
    *queryList({ payload }, { call, put }) {
        //call方法首参数为要调用的异步方法
        const  data  = yield call(unifiedMenusAlready,payload);
        yield put({
            type: 'saveDistributionList',
            payload: data || {},
        });
    },
    *queryMyMenu(_,{ call, put }) {
      const data = yield call(myMenu)
      yield put({
        type:'saveMyMenu',
        payload:data || {}
      })
    },
    *queryMytemplate(_,{ call,put }) {
      const data = yield call(myTemplate)
      yield put({
        type:'saveMytemplate',
        payload:data || {}
      })
    },
    *queryRecommend(_,{ call,put }) {
      const data = yield call(isRecommend)
      yield put({
        type:'saveRecommend',
        payload:data || {}
      })
    },
    *queryRecommendTemplate(_,{ call,put }) {
      const data = yield call(recommendTemplate)
      yield put({
        type:'saveRecommendTemplate',
        payload:data || {}
      })
    },
    *queryMyCopy({ payload },{ call,put }) {
      const data = yield call(myCopy,payload)
      yield put({
        type:'saveMyCopy',
        payload:data || {}
      })
    },
},
  reducers:{
    'saveDistributionList'(state,{payload}) {
      return {
        ...state,
        MenusList: payload,
      };
    },
    'saveMyMenu'(state,{payload}) {
      return {
        ...state,
        myMenu:payload
      }
    },
    'saveMytemplate'(state,{payload}) {
      return {
        ...state,
        myTemplate:payload
      }
    },
    'saveRecommend'(state,{payload}) {
      return {
        ...state,
        myRecommend:payload
      }
    },
    'saveRecommendTemplate'(state,{payload}) {
      return {
        ...state,
        myTemplate:payload
      }
    },
    'saveMyCopy'(state,{payload}) {
      return {
        ...state,
        myCopy:payload
      }
    }
  }
}
