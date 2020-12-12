import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login'
import Index from '../views/Index/Index';

Vue.use(VueRouter)

const routes = [
  //重定向
  {
    path: '/',redirect: '/login'
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/index',component: Index
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  //to 将要访问的路劲
  //from 代表从哪个路径跳转而来
  //next 是一个函数 表示放行
  //next()放行 next('/login') 强制跳转

  if(to.path === '/login') return next();
  //获取token

  const tokenStr = window.sessionStorage.getItem("token");
  //无token强制跳转登陆页
  if(!tokenStr) return next('/login');
  next();
})

export default router
