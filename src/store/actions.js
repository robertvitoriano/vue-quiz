export default {
  changeLoadingState: (context) =>{
    context.commit('toggleLoading')
  },
  setUserInfo:(context) =>{
    context.commit('setUserInfo')
  },
  setSelectedCourse({ commit }, course) {
    commit('setSelectedCourse', course);
  }
}
