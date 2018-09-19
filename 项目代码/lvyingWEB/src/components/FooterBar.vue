<template>
  <div>
		<van-tabbar v-model="navData.active" @change="toggle">
		  <van-tabbar-item v-for="(item, index ) in navData.list" :key="index">
		    <span class="color_title">{{item.text}}</span>
		    <img
		      slot="icon"
		      slot-scope="props"
		      :src="props.active ? item.active : item.normal"
		    >
		  </van-tabbar-item>
		</van-tabbar>
  </div>
</template>

<script>
export default {

	props:['curIndex'],
	
  data () {
    return {

			navData:{
				// 当前选项
				active: parseInt(this.curIndex),

				// 选项列表
				list:[
					{
						text:'首页',
						url:'/shopMallIdex',
						normal: '../static/images/icon/home.png',
						active: '../static/images/icon/_home.png'
					},
					{
						text:'分类',
						url:'/sortIndex',
						normal: '../static/images/icon/sort.png',
						active: '../static/images/icon/_sort.png'
					},
					{
						text:'购物车',
						url:'/shoppingCart',
						normal: '../static/images/icon/cart.png',
						active: '../static/images/icon/_cart.png'
					},
					{
						text:'我的',
						url:'/personCenter',
						normal: '../static/images/icon/user.png',
						active: '../static/images/icon/_user.png'
					}
				]

			}
  		
    }
  },
  methods: {

		// 跳转
  	toggle(){

			let index = this.navData.active;

			this.$router.push({

				path: this.navData.list[index].url
				
			})
			
  	}
  },
  mounted(){
  	
  }
}
</script>
<style>
	.van-tabbar-item--active{color:#00AA88!important;}
</style>
<style scoped>
	.van-tabbar-item--active{color:#00AA88}
</style>
