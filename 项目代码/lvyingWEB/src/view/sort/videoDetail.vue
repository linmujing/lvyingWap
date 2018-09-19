<template>
    <div class="body_bg" style="margin-bottom: 60px;">
    	
    	<div class="bg_fff">
	    	<div>
	    		<img src="../../../static/images/img/class.png" class="all_width" />
	    	</div>
	    	<div class="padding_10">
	    		<div class="van-ellipsis title">行业动态管控视频</div>
	    		<div class="color_999 margin_top_5">帮助拥有知识产权的企业完善知识产权帮助拥有知识产权的企业完善知识产权帮助拥有知识产权的企业完善知识产权</div>
	    		<div class="margin_top_10 juc_center_between">
                  <span class="color_title font_16">￥500.00</span>
                  <div class="color_999 font_12">123456人看过</div>
                </div>
	    	</div>
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
			    	<div v-if="index === 0" class="margin_top_10">
			    		<div class="padding_10">
				    		<van-row>
					    		<van-col span="5">适应企业</van-col>
					    		<van-col span="19" class="color_666">课程内容课程内容课程内容课程内容课程内容课程内容</van-col>
					    	</van-row>
				    	</div>
				    	<div class="padding_10">
				    		<van-row>
					    		<van-col span="5">内容介绍</van-col>
					    		<van-col span="19" class="color_666">课程内容课程内容课程内容课程内容课程内容</van-col>
					    	</van-row>
				    	</div>
			    	</div>
			    	<!--全程动态管控系统-->
			    	<div v-if="index === 0 || index === 1">
			    		<div class="div_line"></div>
			    		<div class="title padding_10">全程动态管控系统</div>
			    		<div class="padding_10">
			    			<p class="color_666">第一张  <span class="font_12">&nbsp;&nbsp;&nbsp;&nbsp;入职管理</span></p>
			    			<div v-for="(item,index) in 4" :key="index">
			    				<div class="margin_top_10 padding_10 body_bg juc_center_between">
				    				<div class="color_666 flex">
				    					<div class="width_20px">{{index + 1}}</div>
				    					<div class="font_12 van-ellipsis">入职申请管理{{index + 1}}</div>
				    				</div>
				    				<div class="align_center">
				    					<span class="color_999 font_12 margin_right_10">00:20:22</span>
				    					<div v-if="index === 0" class="width_70px">
				    						<button class="btn_warning">试听</button>
				    					</div>
			                          	<div v-else class="width_70px">
			                          		<button class="btn_title van-ellipsis line_height_20">立即购买</button>
			                          	</div>
				    				</div>
				    			</div>
			    			</div>
			    		</div>
			    	</div>
			    	<!--商品评价-->
			    	<div v-if="index === 0 || index === 2">
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
    			<div class="title">热门课程</div>
    			<div class="color_666 font_12">查看更多》</div>
    		</div>
    		<div v-for="item in 2" class="padding_10 bg_fff">
	  			<van-row>
				  <van-col span="10">
				  	<div>
				  		<img src="../../../static/images/img/class.png" class="all_width"/>
				  	</div>
				  </van-col>
				  <van-col span="14">
				  	<div class="class_box">
				  		<div class="title van-ellipsis">知识产权许可使用合同起草</div>
				  		<div class="van-ellipsis margin_top_5 color_666">知识产权许可使用合同起草</div>
				  		<div class="margin_top_10">
				  			<van-row>
					  			<van-col span="12">
					  				<span class="color_title font_16">￥500.00</span>
					  			</van-col>
					  			<van-col span="12">
					  				<div class="more"><span>1234人看过</span></div>
					  			</van-col>
					  		</van-row>
				  		</div>
				  		<div class="margin_top_10 juc_center_between">
				  			<div class="flex_warp van-ellipsis">
	                          <img src="../../../static/images/icon/headset.png" width="18" height="16"/>
	                          <span class="font_12 color_666 padding_left_5">试听</span>
	                        </div>
	                        <div>
	                        	<button class="btn_title van-ellipsis">立即购买</button>
	                        </div>
				  		</div>
				  	</div>
				  </van-col>
				</van-row>
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
        	subTab: ['简介','全程动态管控系统','商品评价'],
        	star: 4
        }
        
    },
    mounted(){
		console.log(this.$route.query.id)
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
</style>
