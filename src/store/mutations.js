export default {
  toggleLoading: (state) =>{
    state.loading = !state.loading
  },
  setUserInfo: (state, newInfo) =>{
    state.userInfo = newInfo
  },
  setSelectedCourse(state, course) {
    state.selectedCourse = course;
  }
}
