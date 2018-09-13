<template>
    <div>
    
    	<!--热门推荐-->
  		<div>
  			<div class="margin_10">
	  			<van-row>
				  <van-col span="18">
				  	<span class="title">热门推荐</span>
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
				  			<div class="margin_top_10">
					        	<van-row>
						          <van-col span="6">
						            <div class="flex_warp van-ellipsis">
						              <img src="../../../static/images/icon/headset.png" width="18" height="16"/>
						              <span class="font_12 color_666">试听</span>
						            </div>
						          </van-col>
						          <van-col span="16" offset="2">
						            <div class="juc_around">
						              <button class="btn_warning width_40px align_center juc_center">
						                <van-icon name="cart" size="16px" color="#fff" />
						              </button>
						              <button class="btn_title van-ellipsis">立即购买</button>
						            </div>
						          </van-col>
						        </van-row>
					  		</div>
				  		</div>
		  		  </van-col>
				</van-row>
			</div>
  		</div>
  		<div class="div_line"></div>
  		<!--入职推荐-->
  		<div>
  			<div class="margin_10">
	  			<van-row>
				  <van-col span="18">
				  	<span class="title">入职推荐</span>
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
				  			<div class="margin_top_10">
					        	<van-row>
						          <van-col span="6">
						            <div class="flex_warp van-ellipsis">
						              <img src="../../../static/images/icon/headset.png" width="18" height="16"/>
						              <span class="font_12 color_666">试听</span>
						            </div>
						          </van-col>
						          <van-col span="16" offset="2">
						            <div class="juc_around">
						              <button class="btn_warning width_40px align_center juc_center">
						                <van-icon name="cart" size="16px" color="#fff" />
						              </button>
						              <button class="btn_title van-ellipsis">立即购买</button>
						            </div>
						          </van-col>
						        </van-row>
					  		</div>
				  		</div>
		  		  </van-col>
				</van-row>
			</div>
  		</div>
  		
    </div>
</template>
<script>
export default {
    components : {
    	
    },
    data() {
        return {
        	
        }
        
    },
    methods: {
    	
    }
}
</script>

<style scoped lang='less'>
 	/*引入共用less文件*/
    @import './shopMall.less'; 
   
</style>
