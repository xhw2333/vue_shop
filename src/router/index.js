import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login'
import Index from '@/views/Index/Index';
import Welcome from '@/views/Index/Welcome/Welcome';
import User from '@/views/Index/User/User';
import Power from '@/views/Index/Power/Power';
import Role from '@/views/Index/Power/Role';

Vue.use(VueRouter)

const routes = [
  //重定向
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/index',
    component: Index,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User },
      { path: '/rights', component: Power },
      { path: '/roles', component: Role },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //to 将要访问的路劲
  //from 代表从哪个路径跳转而来
  //next 是一个函数 表示放行
  //next()放行 next('/login') 强制跳转

  if (to.path === '/login') return next();

  //获取token
  const tokenStr = window.sessionStorage.getItem("token");
  
  //无token强制跳转登陆页
  if (!tokenStr) return next('/login');
  next();
})

export default router
