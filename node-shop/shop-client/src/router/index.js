import Vue from "vue";
import VueRouter from "vue-router";
import Index from ".././views/Index.vue";
import Register from ".././views/Register.vue";
import Login from ".././views/Login.vue";
import NotFound from ".././views/404.vue"
import Home from ".././views/Home.vue";
import InfoShow from ".././views/InfoShow.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        redirect: "/index",
      },
      {
        path: "/index",
        name: "index",
        component: Index,
        children: [
            { path: "", component: Home },
            { path: "/home", name: "home", component: Home },
            { path: "/infoshow", name: "infoshow", component: InfoShow }
        ]
      },
      {
        path: "/register",
        name: "register",
        component: Register
      },
      {
        path: "*",
        name: "NotFound",
        component: NotFound
      },
      {
        path: "/login",
        name: "login",
        component: Login
      },
      {
        path: "/home",
        name: "home",
        component: Home
      },
    ]
});

// 路由守卫, 全局前置守卫 to是跳转到的路由， from当前的路由， next()是回调的方法【一定要调用该方法来 resolve 这个钩子】
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;
