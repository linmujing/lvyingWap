<template>
    <div class="body_bg">
    	<div>
			  	<!--搜索-->
			  	<div class="bg_fff">
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
			  	<!--视频课程-->
			  	<div>
            <div class="div_line"></div>
			  		<div class="padding_10 bg_fff">
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
          <!--音频课程-->
          <div>
            <div class="div_line"></div>
            <div class="padding_10 bg_fff">
              <van-row>
                <van-col span="18">
                  <span class="title">音频课程</span>
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
			  	<!--广告-->
          <div>
            <img src="../../../static/images/img/ad.png" class="all_width"/>
          </div>
          <!--行业动态-->
          <div>
            <div class="padding_10 bg_fff">
              <van-row>
                <van-col span="18">
                  <span class="title">行业动态管控</span>
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
                    <div class="van-ellipsis margin_top_5 color_666">知识产权许可使用合同起草知识产权许可使用合同起草</div>
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
                      <div class="juc_center_between">
                        <button class="btn_warning width_40px align_center juc_center">
                          <van-icon name="cart" size="16px" color="#fff" />
                        </button>
                        <button class="btn_title">立即购买</button>
                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
          <!--法律动态-->
          <div>
            <div class="div_line"></div>
            <div class="padding_10 bg_fff">
              <van-row>
                <van-col span="18">
                  <span class="title">法律动态管控</span>
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
                    <div class="van-ellipsis margin_top_5 color_666">知识产权许可使用合同起草知识产权许可使用合同起草</div>
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
                      <div class="juc_center_between">
                        <button class="btn_warning width_40px align_center juc_center">
                          <van-icon name="cart" size="16px" color="#fff" />
                        </button>
                        <button class="btn_title">立即购买</button>
                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
          <!--广告-->
          <div >
            <img src="../../../static/images/img/ad-02.png" class="all_width"/>
          </div>
          <!--律瀛商城-->
          <div>
            <div class="padding_10 bg_fff">
              <van-row>
                <van-col span="18">
                  <span class="title">律瀛商城</span>
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
            <div class="juc_wrap_around bg_fff">
              <div v-for="item in 4" class="width_45 border_999 margin_bottom_20 padding_10 box_sizing">
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
		
    </div>
</template>
<script>
export default {
    components : {
    	
    },
    data() {
        return {
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
</style>
