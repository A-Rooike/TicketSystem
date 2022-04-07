import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const mutations ={
  // 获取搜索信息
  getSearchInfo(state,data){
    console.log(data);
    state.SearchInfo = data
  },
  //获取登录状态
  getLogin(state,data){
    state.isLogin=!state.isLogin
    state.phone=data
  }
}
const actions ={}
const state ={
  SearchInfo:{},
  isLogin:false,
  phone:''
}
export default new Vuex.Store({
  mutations,
  actions,
  state
})