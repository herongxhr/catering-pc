//用于获取初始化项目（一般是首页）的数据
export default {
    namespace: 'home',
    state: {
    },

    // effects: {
    //     *fetchNotices(_, { call, put, select }) {
    //         const data = yield call (queryNotices);
    //         yield put({
    //             type: 'saveNotices',
    //             payload: data.filter(item => item),
    //         });
    //     }
    // },

    // reducers: {
    //     saveNotices(state, { payload }) {
    //         return {
    //             ...state,
    //             notices: payload,
    //         };
    //     },
    // }
};
