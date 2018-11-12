<template>
    <div class="body_bg">

      <!--轮播-->
      <div>
        <van-swipe :autoplay="4000">
          <van-swipe-item v-for="(item,index) in banner" :key="index">
            <img :src="item.src" class="all_width"/>
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
                <div class="font_16">{{merchantInfo.orgName}}</div>
                <div class="color_999 font_12">
                  <span>客户数：{{merchantInfo.ciCount}}</span>
                  <span class="padding_left_10">用户数：{{merchantInfo.productCount}}</span>
                </div>
              </div>
              <div class="color_999 margin_top_5">{{merchantInfo.personIntroduce}}</div>
            </van-col>
          </van-row>
        </div>
      </div>

		  <div class="margin_top_20 bg_fff">
        <div v-for="item in productList" class="padding_10 bg_fff">
          <van-row>
            <van-col span="10">
              <div @click="jumpDetail(item.productCode)">
                <img :src="item.productProfileUrl" class="all_width height_110px"/>
              </div>
            </van-col>
            <van-col span="14">
              <div class="class_box">
                <div class="title van-ellipsis">{{item.productTitle}}</div>
                <div class="van-ellipsis margin_top_5 color_666">{{item.productKeyWord}}</div>
                <div class="margin_top_10">
                  <van-row>
                    <van-col span="12">
                      <span class="color_title font_16">￥{{item.productPrice}}</span>
                    </van-col>
                    <van-col span="12">
                      <div class="more"><span>{{item.saleCount}}人看过</span></div>
                    </van-col>
                  </van-row>
                </div>
                <div class="margin_top_10">
                  <van-row>
                    <van-col span="6">
                      <div class="flex_warp van-ellipsis" @click="jumpDetail(item.productCode)">
                        <img src="../../../static/images/icon/headset.png" width="18" height="16"/>
                        <span class="font_12 color_666">试听</span>
                      </div>
                    </van-col>
                    <van-col span="16" offset="2">
                      <div class="juc_around">
                        <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                          <van-icon name="cart" size="16px" color="#fff" />
                        </button>
                        <button class="btn_title van-ellipsis" @click="goBuy(item.productCode)">立即购买</button>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div @click="seeMore" class="padding_10 text_center van-hairline--top color_999">查看更多》</div>
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
        banner: JSON.parse(sessionStorage.getItem("Banner")),
        merchantCode: this.$route.query.merchantCode,
        merchantInfo: {},
        productList: [],
        total: 0,
        pageSize: 4,
      }

  },
  mounted(){
    this.getProductList(this.pageSize)
    this.getMerchantInfo()
	},
	methods: {
    // 获取商品列表
    getProductList(pageSize){
      this.$api.getProductList( this.$Qs.stringify({'pageNo': 1, 'pageSize': pageSize, 'merchantCode': this.merchantCode, 'orderByStr': 10}) )

        .then( (res) => {
          // console.log(res);
          if(res.data.code == 200){
            var result = res.data.content
            this.productList = result.list
            this.total = result.count

          }else {
            this.$toast.fail(res.data.message);

          }
        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    //获取商户详细信息
    getMerchantInfo(){
      this.$api.getMerchantInfo( this.$Qs.stringify({'merchantCode': this.merchantCode}) )

        .then( (res) => {
          // console.log(res);
          if(res.data.code == 200){

            this.merchantInfo = res.data.content

          }else {

            this.$toast.fail(res.data.message);

          }
        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 跳转到详情
    jumpDetail(code){
      this.$router.push({
        path:'/falvDetail',
        query: {
          productCode: code
        }
      })
    },
    // 查看更多评价
    seeMore(){
      if(this.pageSize >= this.total){
        this.$toast('已经没有更多了');
        return
      }
      this.pageSize += 4
      this.getProductList(this.pageSize)
    },
    /** 数据 **/
    // 添加商品到购物车 MT
    addProductCart(code){
      if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
        this.$Message.warning('您还没有登录，请登录后再尝试！');
        return ;
      }
      let param = {
        ciCode:this.$store.state.userData.cicode,
        productCode: code,
        productCount:1
      }
      // 存储商品信息
      this.$store.commit('cart/addToCart', param);
      this.$store.dispatch('cart/addCartTo', param);
    },
    // 立即购买
    goBuy(code){
      if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
        this.$Message.warning('您还没有登录，请登录后再尝试！');
        return ;
      }
      // 页面跳转
      this.$router.push({
        path:'/submitOrder',
        query: {
          productCode: code
        }
      })
    }
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
