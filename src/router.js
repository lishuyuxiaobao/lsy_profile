import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing.vue'


Vue.use(Router)

const route = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/register',
      name: 'register',
      //懒加载
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/DashBoard.vue')
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: () => import('./views/CreateProfile.vue')
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      component: () => import('./views/EditProfile.vue')
    },
    {
      path: '/add-experience',
      name: 'add-experience',
      component: () => import('./views/AddExperience.vue')
    },
    {
      path: '/add-education',
      name: 'add-education',
      component: () => import('./views/AddEducation.vue')
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: () => import('./views/Profiles.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('./views/Posts.vue')
    },
    {
      path: '/feedinfo',
      name: 'feedinfo',
      component: () => import('./views/PostsInfo.vue')
    },
    {
      path: '*',
      redirect: "/"
    }

  ]
})

//全局路由守卫   ***********************************************************
route.beforeEach((to, from, next) => {
  // console.log("to:", to);

  //执行
  // next();

  //isLogin
  const isLogin = localStorage.jwtToken ? true : false;

  if (to.path == "/login" || to.path == "/register" || to.path == "/") {
    next();
  } else {
    //判断用户是否处于登陆状态   如果登录随意跳  否则 /login 
    isLogin ? next() : next("/login")
  }

})

export default route;
