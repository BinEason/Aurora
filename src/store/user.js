export default {
    namespaced: true,

    state() {
        return {
            userInfo: JSON.parse(localStorage.getItem('cgb')) || {},
            menuList: JSON.parse(localStorage.getItem('cgb')).menuList || [],
            actionList: JSON.parse(localStorage.getItem('cgb')).actionList || [],
            noticeCount: 0

        }
    },
    mutations: {
        // 修改用户信息，payload就是用户信息对象
        setUser(state, payload) {
            state.userInfo = payload
            localStorage.setItem('cgb', JSON.stringify(state.userInfo))
        },
        setMenuLIst(state, payload) {
            state.menuList = payload
            state.userInfo.menuList = state.menuList
            localStorage.setItem('cgb', JSON.stringify(state.userInfo))
        },
        setActionList(state, payload) {
            state.actionList = payload
            state.userInfo.actionList = state.actionList
            localStorage.setItem('cgb', JSON.stringify(state.userInfo))
        },
        setNoticeCount(state, payload) {
            state.noticeCount = payload
            state.userInfo.noticeCount = state.noticeCount
            localStorage.setItem('cgb', JSON.stringify(state.userInfo))
        }
    }

}