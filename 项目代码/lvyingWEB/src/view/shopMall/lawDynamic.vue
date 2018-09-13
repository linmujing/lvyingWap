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
		
		<div class="div_line"></div>
		<!--劳动推荐-->
      	<div>
            <div class="margin_10">
              <van-row>
                <van-col span="18">
                  <span class="title">劳动推荐</span>
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
    	
    },
    mounted(){
  		console.log(this.$route.params.id)
	}
}
</script>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import './shopMall.less'; 
   
   	
</style>
