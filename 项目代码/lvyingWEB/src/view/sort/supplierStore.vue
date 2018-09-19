<template>
    <div class="body_bg">

      <!--轮播-->
      <div>
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img :src="image" class="all_width"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--提供商-->
      <div class="bg_fff padding_10">
        <div class="title">提供商</div>
        <div class="margin_top_10">
          <van-row>
            <van-col span="5">
              <img src="../../../static/images/img/falv.png" class="img_box" />
            </van-col>
            <van-col span="19">
              <div class="juc_center_between">
                <div class="font_16">法律教育网</div>
                <div class="color_999 font_12">
                  <span>客户数：80</span>
                  <span class="padding_left_10">用户数：1280</span>
                </div>
              </div>
              <div class="color_999 margin_top_5">教育网成立于XXXX一直致力于XXXX</div>
            </van-col>
          </van-row>
        </div>
      </div>

		  <div class="margin_top_20 bg_fff">
        <div v-for="item in 4" class="padding_10 bg_fff">
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
        <div class="padding_10 text_center van-hairline--top color_999">查看更多》</div>
      </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
          images: [
            '../static/images/img/banner.png',
            '../static/images/img/banner.png'
          ],
        }
        
    },
    mounted(){

	},
	methods: {

    }
}
</script>
<style type="text/css">
  /*轮播的点*/
  .van-swipe__indicators{display: none;}
</style>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import '../shopMall/shopMall.less';

  .img_box{width:1.2rem;height: 1.2rem;border: 1px solid #efefef;}
  .padding_left_10{padding-left: 0.2rem}
</style>
