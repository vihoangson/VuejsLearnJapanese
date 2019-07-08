import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home/Home";
import Login from "@/components/login/LoginPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    { path: "*", redirect: "/" }
  ]
});
