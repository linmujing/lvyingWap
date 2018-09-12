<template>
    <div>
    	<!--tab标签-->
    	<div>
    		<van-tabs color="#00AA88">
			  <van-tab v-for="(item,index) in tabTitle" :title="item">
			  	<!--轮播-->
			  	<div>
			  		<van-swipe :autoplay="3000">
					  <van-swipe-item v-for="(image, i) in images" :key="i">
					    <img :src="image" class="all_width"/>
					  </van-swipe-item>
					</van-swipe>
			  	</div>
			  	<!--搜索-->
			  	<div v-if="index == 0">
			  		<van-row>
					  <van-col span="20">
					  	<div class="search_box">
			  				<input type="text" placeholder="视频/音频/合同"/>
			  				<button>
			  					<van-icon name="search" color="#fff" size="16px"/>
			  				</button>
			  			</div>	
					  </van-col>
					  <van-col span="4">
					  	<div class="scan">
					  		<img src="../../../static/images/icon/sao.png" width="30"/>
					  	</div>
					  </van-col>
					</van-row>
			  	</div>
			  	<div class="div_line"></div>
			  	<!--视频课程-->
			  	<div v-if="index == 0 || index == 3">
			  		<div class="margin_10">
			  			<van-row>
						  <van-col span="18">
						  	<span class="title">视频课程</span>
						  </van-col>
						  <van-col span="6">
						  	<div class="more">
						  		<router-link tag="a" to="">
						  			<span>查看更多》</span>
						  		</router-link>
						  	</div>
						  </van-col>
						</van-row>
			  		</div>
			  		<div v-for="item in 2" class="margin_10">
			  			<van-row>
						  <van-col span="10">
						  	<div>
						  		<img src="../../../static/images/img/class.png" class="all_width"/>
						  	</div>
						  </van-col>
						  <van-col span="14">
						  	<div class="class_box">
						  		<div class="title van-ellipsis">知识产权许可使用合同起草</div>
						  		<div class="van-ellipsis margin_top_10">知识产权许可使用合同起草</div>
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
						  		<div class="margin_top_10">
						  			<van-row>
							  			<van-col span="6">
							  				<div class="juc_center_between">
							  					<img src="../../../static/images/icon/headset.png" width="20" height="18"/>
							  					<span class="font_14">试听</span>
							  				</div>
							  			</van-col>
							  			<van-col span="16" offset="2">
							  				<div class="juc_around">
							  					<button class="btn_warning width_50px align_center juc_center">
							  						<van-icon name="cart" size="16px" color="#fff" />
							  					</button>
							  					<button class="btn_title">立即购买</button>
							  				</div>
							  			</van-col>
							  		</van-row>
						  		</div>
						  	</div>
						  </van-col>
						</van-row>
			  		</div>
			  	</div>
			  	
			  </van-tab>
			</van-tabs>
    	</div>
		
    </div>
</template>
<script>
export default {
    components : {
    	
    },
    data() {
        return {
        	tabTitle: ['推荐','行业动态管控','法律动态管控','视频课程','音频课程'],
        	images: [
		      '../../../static/images/img/banner.png',
		      '../../../static/images/img/banner.png'
		    ],
		    value: ''
        }
        
    },
    methods: {
    	onSearch(){
    		console.log('搜索')
    	}
    }
}
</script>
<style type="text/css">
	/*轮播的点*/
	.van-swipe__indicators{display: none;}
	/*搜索*/
	.van-search .van-cell{border-radius: 15px; border: 1px solid #D8D8D8;border-right:transparent}
</style>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import './shopMall.less'; 
   
   	/*搜索框*/
	.search_box{
		margin: 0.2rem;
		padding: 0.05rem;
		border: 1px solid #D8D8D8;
		border-radius: 0.4rem;
		position: relative;
		input{
			border: none;
			width: 80%;
			padding: 0.12rem;
			border-radius: 0.4rem;
		}
		button{
			position: absolute;
			top: 0;
			right: 0;
			border: 1px solid #00AA88;
			border-radius: 0 0.4rem 0.4rem 0;
			width: 15%;
			height: 100%;
			background: #00AA88;
		}
	}
	/*扫一扫*/
	.scan{
		margin: 0.25rem 0.2rem 0.2rem 0.2rem;
		text-align: right;
	}
	/*课程内容*/
	.class_box{
		margin-left: 0.2rem;
	}
</style>