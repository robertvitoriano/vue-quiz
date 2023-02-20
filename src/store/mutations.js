export default {
  toggleLoading: (state) =>{
    state.loading = !state.loading
  },
  setUserInfo: (state, newInfo) =>{
    state.userInfo = newInfo
  },
}
