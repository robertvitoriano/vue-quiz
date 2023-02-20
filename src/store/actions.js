export default {
  changeLoadingState: (context) =>{
    context.commit('toggleLoading')
  },
  setUserInfo:(context) =>{
    context.commit('setUserInfo')
  }
}
