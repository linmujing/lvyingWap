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
        },
        {
          path: '/videoDetail',
          name: 'videoDetail',
          component:resolve => require(['@/view/sort/videoDetail'],resolve),
          meta:{
            title:'商品详情',
          }
        },
        {
          path: '/seeVideo',
          name: 'seeVideo',
          component:resolve => require(['@/view/sort/seeVideo'],resolve),
          meta:{
            title:'查看',
          }
        },
        {
          path: '/bookDetail',
          name: 'bookDetail',
          component:resolve => require(['@/view/sort/bookDetail'],resolve),
          meta:{
            title:'详情',
          }
        },
        {
          path: '/supplierStore',
          name: 'supplierStore',
          component:resolve => require(['@/view/sort/supplierStore'],resolve),
          meta:{
            title:'提供商店铺',
          }
        },
        {
          path: '/falvDetail',
          name: 'falvDetail',
          component:resolve => require(['@/view/sort/falvDetail'],resolve),
          meta:{
            title:'详情',
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
      path: '/myComment',
      name: 'myComment',
      meta:{
        title:'我的评价',
      },
      component: resolve => require(['@/view/personCenter/myComment'],resolve)
    },
    {
      path: '/myCoupon',
      name: 'myCoupon',
      meta:{
        title:'我的优惠券',
      },
      component: resolve => require(['@/view/personCenter/myCoupon'],resolve)
    },
    {
      path: '/myAfterService',
      name: 'myAfterService',
      meta:{
        title:'我的售后',
      },
      component: resolve => require(['@/view/personCenter/myAfterService'],resolve)
    },
    {
      path: '/myCourse',
      name: 'myCourse',
      meta:{
        title:'我的课程',
      },
      component: resolve => require(['@/view/personCenter/myCourse'],resolve)
    },
    {
      path: '/myOrder/checkLogistics',
      name: 'checkLogistics',
      meta:{
        title:'查看物流',
      },
      component: resolve => require(['@/view/personCenter/checkLogistics'],resolve)
    },
    {
      path: '/myOrder/goComment',
      name: 'goComment',
      meta:{
        title:'去评价',
      },
      component: resolve => require(['@/view/personCenter/goComment'],resolve)
    },
    {
      path: '/myOrder/refundMoney',
      name: 'refundMoney',
      meta:{
        title:'退货退款',
      },
      component: resolve => require(['@/view/personCenter/refundMoney'],resolve)
    },
    {
      path: '/myOrder/refundingMoney',
      name: 'refundingMoney',
      meta:{
        title:'退货退款',
      },
      component: resolve => require(['@/view/personCenter/refundingMoney'],resolve)
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      meta:{
        title:'我的地址',
      },
      component: resolve => require(['@/view/personCenter/myAddress'],resolve)
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
