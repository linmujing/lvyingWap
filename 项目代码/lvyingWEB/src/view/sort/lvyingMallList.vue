<template>
    <div >
    	
    	<div>

        <!--律瀛商城-->
        <div class="padding_10">
          <div class="juc_wrap_between">
            <div v-for="item in 4" class="width_48 border_999 margin_bottom_20 padding_5 box_sizing">
              <div @click="toDetail">
                <img src="../../../static/images/img/book.png" class="all_width">
              </div>
              <div class="van-ellipsis margin_top_5 title">知识产权许可使用合同起草</div>
              <div class="van-ellipsis margin_top_5 color_666">知识产权许可使用合同起草知识产权许可使用合同起草</div>
              <div class="juc_between align_center margin_top_10">
                <span class="color_title font_16 van-ellipsis">￥500.00</span>
                <button class="btn_title van-ellipsis">立即购买</button>
              </div>
            </div>
          </div>
        </div>

    	</div>
		
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
        
    },
    mounted(){
    	//设置页面的title
		document.title = this.$route.query.name;
		console.log(this.$route.query.id)
//		console.log(this.$route.params.name)
	},
	methods: {
    toDetail(i){
      this.$router.push({
        path:'/bookDetail',
        // query: {
        //   id: i
        // }
      })
    }
  }
}
</script>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import '../shopMall/shopMall.less';

  .width_48{width: 48%}
</style>
