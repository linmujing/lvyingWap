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
        },
        {
          path: '/industryDynamic',
          name: 'industryDynamic',
          component:resolve => require(['@/view/shopMall/industryDynamic'],resolve),
          meta:{
            title:'行业动态管控',
          }
        },
        {
          path: '/lawDynamic',
          name: 'lawDynamic',
          component:resolve => require(['@/view/shopMall/lawDynamic'],resolve),
          meta:{
            title:'法律动态管控',
          }
        },
        {
          path: '/videoCourse',
          name: 'videoCourse',
          component:resolve => require(['@/view/shopMall/videoCourse'],resolve),
          meta:{
            title:'视频课程',
          }
        },
        {
          path: '/audioCourse',
          name: 'audioCourse',
          component:resolve => require(['@/view/shopMall/audioCourse'],resolve),
          meta:{
            title:'音频课程',
          }
        }
      ]
    },
     /**分类**/ 
    {
      path: '/sort',
      name: 'sort',
      meta:{
        title:'分类',
      },
      component:  resolve => require(['@/view/sort/index'],resolve),
      children: [
       	{
          path: '/sortIndex',
          name: 'sortIndex',
          component:resolve => require(['@/view/sort/sortIndex'],resolve),
          meta:{
            title:'分类',
          }
        },
        {
          path: '/videoList',
          name: 'videoList',
          component:resolve => require(['@/view/sort/videoList'],resolve),
          meta:{
            title:'',
          }
        },
        {
          path: '/dynamicList',
          name: 'dynamicList',
          component:resolve => require(['@/view/sort/dynamicList'],resolve),
          meta:{
            title:'',
          }
        },
        {
          path: '/lvyingMallList',
          name: 'lvyingMallList',
          component:resolve => require(['@/view/sort/lvyingMallList'],resolve),
          meta:{
            title:'律瀛商城',
          }
        }
    	]
    },

    /**购物车部分**/ 
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component:resolve => require(['@/view/shopCart/shoppingCart'],resolve),
      meta:{
        title:'购物车',
      }
    },
    {
      path: '/submitOrder',
      name: 'submitOrder',
      meta:{
        title:'确认订单',
      },
      component: resolve => require(['@/view/shopCart/submitOrder'],resolve)
    },

    /**个人中心部分**/ 
    {
      path: '/personCenter',
      name: 'personCenter',
      meta:{
        title:'我的',
      },
      component: resolve => require(['@/view/personCenter/personCenter'],resolve)
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      meta:{
        title:'我的订单',
      },
      component: resolve => require(['@/view/personCenter/myOrder'],resolve)
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
