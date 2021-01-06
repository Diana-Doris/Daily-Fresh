import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
import getMenuRoute from "../utils/permission";

Vue.use(VueRouter);

/* 商品路由取决于用户的角色 */
const asyncRouterMap = [
  {
    path: "/product",
    name: "Product",
    meta: {
      title: "商品"
    },
    component: Home,
    children: [
      {
        path: "/goodAdd:id",
        name: "goodAdd",
        meta: {
          title: "商品添加"
        },
        component: () => import("../views/home_layout/goodAdd.vue")
      },
      {
        path: "/goodList",
        name: "goodList",
        meta: { title: "商品列表" },
        component: () => import("../views/home_layout/goodList.vue"),
        children: [
          {
            path: "/goodListEdit:id",
            name: "goodListEdit",
            meta: { title: "商品添加模态框" },
            component: () => import("../views/home_layout/goodAdd.vue")
          }
        ]
      },

      {
        path: "/cateGory",
        name: "cateGory",
        meta: { title: "商品类目" },
        component: () => import("../views/home_layout/goodCategory.vue")
      }
    ]
  }
];

const routes = [
  {
    path: "/",
    redirect: "/goodSum"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/goodSum",
    meta: { title: "首页" },
    component: Home,
    children: [
      {
        /* 统计 */
        path: "/goodSum",
        name: "goodSum",
        meta: { title: "统计" },
        component: () => import("../views/home_layout/goodSum.vue")
      }
    ]
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

let isAddRoutes = false;
router.beforeEach(function(to, from, next) {
  if (to.path != "/login") {
    const { appkey, username, role } = store.state.user;
    if (appkey && username && role) {
      // 还需要实现一个功能：通过我们的角色判断有哪些路由；如果说已经登陆了，要是想要进入到系统当中，动态处理我们的路由
      /* 路由导航代表的是每一次路由跳转的时候，它都会执行这个函数，每一次我都忘router里面添加了，但是我们不想每一次都往里面添加，我们只让它添加一次就可以了，整个权限只添加一次； */
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoute(role, asyncRouterMap);
        // router.addRoutes(menuRoutes);
        store
          .dispatch("changeMenuRoutes", routes.concat(menuRoutes))
          .then(() => {
            next();
            router.addRoutes(menuRoutes);
          });
        isAddRoutes = true;
      } /* 我们的store进行添加路由的时候，以及存储菜单nav路由，都是异步方式，那就是说执行next的时候，还没有执行完这样的一个设置我们就需要用到then的方法了；我们的dispatch返回的是一个promise */
      return next();
    } else {
      // console.log(next("/login"));
      return next("/login");
    }
  }
  return next();
});
export default router;
