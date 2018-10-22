<template>
    <div class="body_bg" style="margin-bottom: 60px;">

    	<div class="bg_fff">
	    	<div>
	    		<img :src="dataDetail.productProfileUrl" class="all_width" />
	    	</div>
	    	<div class="padding_10">
	    		<div class="van-ellipsis title">{{dataDetail.productTitle}}</div>
	    		<div class="color_999 margin_top_5 van-ellipsis" v-html="dataDetail.productDesc"></div>
	    		<div class="margin_top_10 juc_center_between">
                  <span class="color_title font_16">￥{{dataDetail.productOrgPrice}}</span>
                  <div class="color_999 font_12">{{dataDetail.saleCount}}人看过</div>
                </div>
	    	</div>
    	</div>
      <!--提供商-->
      <div v-if="showCourse" class="bg_fff margin_top_20 padding_10">
        <div class="title">提供商</div>
        <div @click="goStore" class="margin_top_10">
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
              <div class="padding_10" v-html="dataDetail.productDesc"></div>
			    	</div>
			    	<!--全程动态管控系统-->
			    	<div v-if="index === 0 || index === 1">
			    		<div class="div_line"></div>
			    		<div class="title padding_10">全程动态管控系统</div>
			    		<div class="padding_10">
			    			<div class="align_center font_12">
                  <div class="align_center">
                    <span class="padding_5">项目启动</span>
                    <img src="../../../static/images/icon/jt.png" class="jt">
                  </div>
                  <div class="align_center">
                    <span class="padding_5">调研</span>
                    <img src="../../../static/images/icon/jt.png" class="jt">
                  </div>
                  <div class="align_center">
                    <span class="padding_5">入职</span>
                    <img src="../../../static/images/icon/jt.png" class="jt">
                  </div>
                  <div class="align_center">
                    <span class="padding_5">在职</span>
                    <img src="../../../static/images/icon/jt.png" class="jt">
                  </div>
                  <div class="align_center">
                    <span class="padding_5">离职</span>
                  </div>
                </div>
			    			<div v-for="(item,index) in 4" :key="index">
			    				<div class="margin_top_10 padding_10 van-hairline--bottom">
				    				<p>1.1.1专项服务合同</p>
                    <div class="juc_center_between padding_left_20">
                      <div class="van-ellipsis color_999">视频音频详细讲解</div>
                      <div>
                        <Button class="btn_gary van-ellipsis margin_right_10">查看详情</Button>
                        <button class="btn_title van-ellipsis">立即购买</button>
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
			    			<van-rate v-model="valueCustomText" :size="16" color="#F09105" readonly class="align_center"/>
			    			<span class="font_12 color_warning">{{valueCustomText}}</span>
			    		</div>
			    		<div v-for="item in evaluateList">
			    			<div class="padding_10 van-hairline--bottom">
			    				<div class="juc_between">
			    					<div class="align_center">
			    						<img :src="item.customerInfo.ciProfileUrl" class="photo"/>
			    						<div>
			    							<div>{{item.customerInfo.ciName}}</div>
			    							<van-rate v-model="item.productScore == null ? 0 : item.productScore" :count="item.productScore" :size="16" color="#F09105" readonly class="align_center margin_top_5"/>
			    						</div>
			    					</div>
			    					<div class="color_999">{{item.createDate}}</div>
			    				</div>
			    				<div class="margin_top_5 color_666" v-html="item.commentDesc"></div>
			    			</div>
			    		</div>
			    		<div class="color_666 padding_10 text_center" @click="seeMore">查看更多》</div>
			    	</div>

				</van-tab>
			</van-tabs>
    	</div>

    	<!--推荐-->
    	<div class="margin_top_20 bg_fff">
    		<div class="padding_10 juc_center_between">
    			<div v-if="showCourse" class="title">热门课程</div>
    			<div v-else class="title">热门课程</div>
    			<!--<div class="color_666 font_12">查看更多》</div>-->
    		</div>
    		<div v-for="item in recommendList" class="padding_10 bg_fff">
	  			<van-row>
				  <van-col span="10">
				  	<div @click="jumpDetail(item.productCode)">
				  		<img :src="item.productProfileUrl" class="all_width height_110px"/>
				  	</div>
				  </van-col>
				  <van-col span="14">
				  	<div class="class_box">
				  		<div class="title van-ellipsis">{{item.productTitle}}</div>
				  		<div class="van-ellipsis margin_top_5 color_666" v-html="item.productDesc"></div>
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
				  		<div class="margin_top_10 juc_center_between">
				  			<div>
                  <div v-if="showCourse" class="flex_warp van-ellipsis" @click="jumpDetail(item.productCode)">
                    <img src="../../../static/images/icon/headset.png" width="18" height="16"/>
                    <span class="font_12 color_666 padding_left_5">试听</span>
                  </div>
                  <button v-else class="btn_warning width_40px align_center juc_center">
                    <van-icon name="cart" size="16px" color="#fff" />
                  </button>
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
			<van-goods-action>
			  <van-goods-action-mini-btn icon="shop" text="店铺" @click="goStore"/>
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
        star: 4,
        typeId: 0,
        productCode: this.$route.query.productCode,
        // 产品详情数据
        dataDetail: {},
        // 评价列表
        evaluateList: [],
        total: 0,
        pageSize: 3,
        //星星评分
        valueCustomText: 0,
        // 推荐产品
        recommendList: [],
        showCourse: false,
      }

  },
  watch: {
    //监听参数变化
    $route(){
      this.productCode = this.$route.query.productCode
    },
    productCode() {
      this.getProductInfo()
      this.getEvaluateList(this.pageSize)
    }
  },
  mounted(){
    if(this.$route.query.typeId){
      var typeId = parseInt(this.$route.query.typeId)
      this.typeId = typeId
      typeId === 3 || typeId === 4 ? this.showCourse = true : this.showCourse = false
    }
    this.getProductInfo()
    this.getEvaluateList(this.pageSize)
	},
	methods: {
    // 查看产品详情
    getProductInfo(){
      // 查看产品详情
      this.$api.getProductInfo( this.$Qs.stringify({'productCode': this.productCode}) )

        .then( (res) => {
          console.log(res);
          if(res.data.code == 200){
            var result = res.data.content
            this.dataDetail = result
            //获取推荐产品
            this.getProductShowCase('P121212121213,P121212121212,P121212121211,P121212121214') //测试
            // if(!result.productRecommendCode == '' || !result.productRecommendCode == null){
            //   this.getProductShowCase(result.productRecommendCode)
            // }
            // this.merchantCode = result.merchantCode
            // //获取优惠券列表
            // this.getProductCoupon(this.productCode, result.merchantCode)
            //商品评分
            result.productScore == null ? this.valueCustomText = 0 : this.valueCustomText = result.productScore
            // // 课程目录
            // this.productSection = eval(result.productSection)
            // console.log(this.productSection)

          }else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 获取推荐列表或猜你喜欢
    getProductShowCase(productCode){

      this.$api.getProductShowCase( this.$Qs.stringify({'productCode': productCode}) )

        .then( (res) => {
          // console.log(res);
          if(res.data.code == 200){
            var result = []
            if(res.data.content.length > 2){
              for(var i=0;i<2;i++){
                result.push(res.data.content[i])
              }
            }else {
              result = res.data.content
            }
            this.recommendList = result
          }else {

            this.$toast.fail(res.data.message);

          }

        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 获取评价列表
    getEvaluateList(pageSize){
      let params = this.$Qs.stringify({'pageNo': 1, 'pageSize': pageSize, 'productCode': this.productCode});
      this.$api.getProductCommentList( params )

        .then( (res) => {
          console.log(res);
          if(res.data.code == 200){
            var result = res.data.content
            this.evaluateList = result.list
            this.total = result.count

          }else if (res.data.code == 500){

            this.$toast.fail(res.data.message);

          }

        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 查看更多评价
    seeMore(){
      if(this.pageSize >= this.total){
        this.$toast('已经没有更多了');
        return
      }
      this.pageSize += 3
      this.getEvaluateList(this.pageSize)
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
    // 跳转到提供商店铺
    goStore(){
      this.$router.push({
        path:'/supplierStore',
        query: {
          merchantCode: dataDetail.merchantCode
        }
      })
    },
    //加入购物车
    addCart(){
      this.$toast('加入购物车');
    },
    //立即购买
    buyNow(){
      this.$toast('立即购买');
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
  .jt{width: 0.4rem;}
</style>
