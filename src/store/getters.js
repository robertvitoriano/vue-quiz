export default {
  isLoading:(state) =>{
    return state.loading
  },
  userInfo:(state) =>{
    return state.userInfo
  },
  getSelectedCourse: state => {
    return state.selectedCourse;
  }
}
