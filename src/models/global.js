

export default {
    namespace: 'global',
    state: {
        acitveMenuItem: '工作台'
    },
    reducers: {
        changeActiveMenu(state, { payload }) {
            return {
                ...state,
                acitveMenuItem: payload
            }
        }
    }
}