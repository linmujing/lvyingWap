<template>
    <div class="body_bg" style="margin-bottom: 60px;">
    	
    	<div class="bg_fff">
	    	<div>
	    		<img src="../../../static/images/img/book.png" class="all_width" />
	    	</div>
	    	<div class="padding_10">
	    		<div class="van-ellipsis title">行业动态管控视频</div>
	    		<div class="color_999 margin_top_5">帮助拥有知识产权的企业完善知识产权帮助拥有知识产权的企业完善知识产权帮助拥有知识产权的企业完善知识产权</div>
	    		<div class="margin_top_10 juc_center_between">
                  <div>
                    <span class="color_title font_16">￥500.00</span>
                    <del class="color_999">￥80.00</del>
                  </div>
                  <div class="color_999 font_12">123456人看过</div>
                </div>
	    	</div>
        <van-notice-bar :scrollable="false" color="#fff" background="#F09105">
          活动：还剩3天四小时十分
        </van-notice-bar>
    	</div>
    	
    	<!--提供商-->
    	<div class="bg_fff margin_top_20 padding_10">
    		<div class="title">提供商</div>
    		<div @click="toSupplier" class="margin_top_10">
    			<van-row>
				  <van-col span="5">
				  	<img src="../../../static/images/img/falv.png" class="img_box" />
				  </van-col>
				  <van-col span="19">
				  	<div class="font_16">法律教育网</div>
				  	<div class="color_999 margin_top_5">教育网成立于XXXX一直致力于XXXX</div>
				  </van-col>
				</van-row>
    		</div>
    	</div>
    	
    	<!--简介-->
    	<div class="bg_fff margin_top_20">
    		<van-tabs color="#00AA88" v-model="active" sticky>
				<van-tab v-for="(item,index) in subTab" :key="index" :title="item">
					<!--简介-->
			    	<div v-if="index === 0" class="margin_top_10 color_999">
			    		<div class="padding_10">
				    		<div class="juc_between">
                  <div>开本：16开</div>
                  <div>纸张：胶版纸</div>
                </div>
                <div class="juc_between">
                  <div>开本：16开</div>
                  <div>纸张：胶版纸</div>
                </div>
                <div class="juc_between">
                  <div>开本：16开</div>
                  <div>纸张：胶版纸</div>
                </div>
				    	</div>
              <div class="padding_10 text_center bg_all">显示全部信息</div>
			    	</div>
			    	<!--商品评价-->
			    	<div v-if="index === 0 || index === 1">
			    		<div class="div_line"></div>
			    		<div class="padding_10 van-hairline--bottom align_center">
			    			<div class="title margin_right_10">商品评价</div>
			    			<van-rate v-model="star" :size="16" color="#F09105" readonly class="align_center"/>
			    			<span class="font_12 color_warning">{{star}}.0</span>
			    		</div>
			    		<div v-for="item in 3">
			    			<div class="padding_10 van-hairline--bottom">
			    				<div class="juc_between">
			    					<div class="align_center">
			    						<img src="../../../static/images/img/class.png" class="photo"/>
			    						<div>
			    							<div>小熊猫</div>
			    							<van-rate v-model="star" :count="star" :size="16" color="#F09105" readonly class="align_center margin_top_5"/>
			    						</div>
			    					</div>
			    					<div class="color_999">2018-08-02 15:14</div>
			    				</div>
			    				<div class="margin_top_5 color_666">合同全面，值得购买合同全面，值得购买合同全面，值得购买合同全面，值得购买</div>
			    			</div>
			    		</div>
			    		<div class="color_666 padding_10 text_center">查看更多》</div>
			    	</div>
			    	
				</van-tab>
			</van-tabs>
    	</div>
    	
    	<!--推荐-->
    	<div class="margin_top_20 bg_fff">
    		<div class="padding_10 juc_center_between">
    			<div class="title">热门书籍</div>
    			<div class="color_666 font_12">查看更多》</div>
    		</div>
        <div class="padding_10">
          <div class="juc_wrap_between">
            <div v-for="item in 2" class="width_48 border_999 margin_bottom_20 padding_5 box_sizing">
              <div>
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
		
		<!--加入购物车底部-->
		<div>
			<van-goods-action class="bg_fff">
			  <van-goods-action-mini-btn icon="shop" text="店铺" />
			  <van-goods-action-mini-btn icon="cart" text="购物车" to="/shoppingCart" />
			  <van-goods-action-big-btn text="加入购物车" @click="addCart" style="background: #F09105;color: #fff;"/>
			  <van-goods-action-big-btn text="立即购买" @click="buyNow" style="background: #00AA88;color: #fff;"/>
			</van-goods-action>
		</div>
		
    </div>
</template>
<script>
export default {
    data() {
        return {
        	active: 0,
        	subTab: ['商品详情','商品评价'],
        	star: 4
        }
        
    },
    mounted(){
		// console.log(this.$route.query.id)
	},
	methods: {
		
		//加入购物车
    	addCart(){
    		this.$toast('加入购物车');
    	},
    	//立即购买
    	buyNow(){
    		this.$toast('立即购买');
    	},
    	toSupplier(){
    		this.$router.push({
		       path:'/supplierStore',
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

	.img_box{width:1.2rem;height: 1.2rem;border: 1px solid #efefef;}
	.width_20px{width: 0.4rem;}
	.width_70px{width: 1.4rem;}
	.margin_right_10{margin-right: 0.2rem;}
	.padding_left_5{padding-left: 0.1rem;}
	.photo{width: 0.8rem;height: 0.8rem;border-radius: 50%;display: block;margin-right: 0.2rem;}
  .bg_all{background: #f9f9f9}
  .width_48{width: 48%}
</style>
