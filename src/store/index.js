import Vue from "vue";
import Vuex from "vuex";
import {
  setCookie,
  getUserCookie,
  removeUserCookie
} from "../utils/userCookie";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* 用于切换菜单的闭合状态 false: 不闭合  true: 闭合 */
    collapsed: false,
    /* 用户信息 */
    user: getUserCookie(),

    /* {
      username: '',
      appkey: "",
      role: "" /* 决定列表当中可以展示哪些列表 ,
      email: ""
    } */
    /* 存储菜单的路由 */
    menuRoutes: [],
    /* 存储指定表单行的信息 */
    form: {
      title: "",
      desc: "",
      category: "",
      c_items: [],
      tags: [],
      price: null,
      price_off: null,
      unit: "",
      inventory: null,
      images: [],
      status: 0
    }
  },
  mutations: {
    /* 改变状态的方法 */
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    /* 移除Cookie */
    loginOut(state) {
      state.user = {
        username: "",
        appkey: "",
        role: "",
        email: ""
      };
    },
    /* 改变路由 */
    changeMenuRoutes(state, routes) {
      // console.log(routes);
      state.menuRoutes = routes;
    }
  },
  actions: {
    /* 我们最好在操作数据的时候用dispatch，防止我们异步操作的时候，我们可以检测到 */
    changeCollapsed({ commit }) {
      commit("changeCollapsed");
    },
    setUserInfo({ commit }, userInfo) {
      setCookie(userInfo);
      commit("setUserInfo", userInfo);
    },
    /* 不要直接改变这个状态，也不哟通过mutataions去改变，这样在我们的工具插件里面，像vue插件方便我们观察我们的状态改变   */
    loginOut({ commit }) {
      commit("loginOut");
      removeUserCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      // console.log(routes);
      let filterRoutes = routes.filter(ele => {
        if (ele.meta) {
          return ele;
        }
      });
      // console.log(filterRoutes);
      commit("changeMenuRoutes", filterRoutes);
    }
  },
  modules: {}
});
