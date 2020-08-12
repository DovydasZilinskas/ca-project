/** @format */

import Vue from "vue";
import VueRouter from "vue-router";

import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/students",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/add",
    name: "AddStudent",
    component: () =>
      import(/* webpackChunkName: "add" */ "../views/AddStudent.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/students",
    name: "Students",
    component: () =>
      import(/* webpackChunkName: "students" */ "../views/StudentList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/groups",
    name: "Groups",
    component: () =>
      import(/* webpackChunkName: "groups" */ "../views/Groups.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/addgroup",
    name: "AddGroup",
    component: () =>
      import(/* webpackChunkName: "addgroup" */ "../views/AddGroup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/editstudent/:id",
    name: "EditStudent",
    component: () =>
      import(/* webpackChunkName: "editstudent" */ "../views/EditStudent.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/editgroup/:id",
    name: "EditGroup",
    component: () =>
      import(/* webpackChunkName: "editgroup" */ "../views/EditGroup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
      next({ path: "/login" });
    } else if (user && to.matched.some((route) => route.meta.requiresAnon)) {
      next({ path: "/" });
    } else {
      next();
    }
  });
});

export default router;
