<template>
  <div>
		<van-tabbar v-model="active" @change="toggle">
		  <van-tabbar-item>
		    <span>首页</span>
		    <img
		      slot="icon"
		      slot-scope="props"
		      :src="props.active ? icon.active : icon.normal"
		    >
		  </van-tabbar-item>
		  <van-tabbar-item>
		    <span>分类</span>
		    <img
		      slot="icon"
		      slot-scope="props"
		      :src="props.active ? icon2.active : icon2.normal"
		    >
		  </van-tabbar-item>
		  <van-tabbar-item>
		    <span>购物车</span>
		    <img
		      slot="icon"
		      slot-scope="props"
		      :src="props.active ? icon3.active : icon3.normal"
		    >
		  </van-tabbar-item>
		  <van-tabbar-item>
		    <span>我的</span>
		    <img
		      slot="icon"
		      slot-scope="props"
		      :src="props.active ? icon4.active : icon4.normal"
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
  		active: parseInt(this.curIndex),
      icon: {
        normal: '../../static/images/icon/home.png',
        active: '../../static/images/icon/_home.png'
      },
      icon2: {
        normal: '../../static/images/icon/sort.png',
        active: '../../static/images/icon/_sort.png'
      },
      icon3: {
        normal: '../../static/images/icon/cart.png',
        active: '../../static/images/icon/_cart.png'
      },
      icon4: {
        normal: '../../static/images/icon/user.png',
        active: '../../static/images/icon/_user.png'
      }
    }
  },
  methods: {
  	toggle(active){
  		console.log(active)
  		switch(active){
  			case 0:
  				this.$router.push({
	          path:'/shopMallIdex'
	        })
        	break;
        	case 1:
  				this.$router.push({
	          path:'/sortIndex'
	        })
        	break;
  		}
  	}
  },
  mounted(){
  	
  }
}
</script>
<style>
	.van-tabbar-item--active{color:#00AA88}
</style>
<style scoped>

</style>
