import Vue from 'vue'
import Vant from 'vant'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  
  routes: [
    {path: '/', redirect: 'shopMallIdex'},
    {
      path: '/',
      name: 'Index',
      meta:{
        title:'律瀛官方主页',
      },
      component:  resolve => require(['@/view/shopMall/index'],resolve),
      children: [
       	{
          path: '/shopMallIdex',
          name: 'shopMallIdex',
          component:resolve => require(['@/view/shopMall/shopMallIdex'],resolve),
          meta:{
            title:'律瀛官方主页',
          }
        }
      ]
    },
    {
      path: '*',
      name: '404',
      meta:{
        title:'404',
      },
      component: resolve => require(['@/view/404'],resolve)
    }
  	
  ],
  mode: 'history'
})

router.beforeEach((to,form,next) =>{ 
  /*路由变化修改title*/ 
  if(to.meta.title){
    document.title=to.meta.title;
  } 
  next(); 
})
export default router
