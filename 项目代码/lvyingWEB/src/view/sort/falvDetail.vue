<template>
    <div class="body_bg" style="margin-bottom: 60px;">

    	<div class="bg_fff">
	    	<div>
          <div v-if="typeId === 3">
            <img v-if="videoData.videoSrc == ''" :src="dataDetail.productProfileUrl" class="all_width" />
            <Video v-else :videoSrc="videoData.videoSrc" :imgSrc="dataDetail.productProfileUrl"></Video>
          </div>
          <div v-else-if="typeId === 4">
            <img v-if="videoData.videoSrc == ''" :src="dataDetail.productProfileUrl" class="all_width" />
            <Audio v-else :audioSrc="audioData.audioSrc" :imgSrc="dataDetail.productProfileUrl"></Audio>
          </div>
          <div v-else>
            <img :src="dataDetail.productProfileUrl" class="all_width" />
          </div>
	    	</div>
	    	<div class="padding_10">
	    		<div class="van-ellipsis title">{{dataDetail.productTitle}}</div>
	    		<div class="color_999 margin_top_5 van-ellipsis">{{dataDetail.productKeyWord}}</div>
	    		<div class="margin_top_10 juc_center_between">
            <div>
              <span class="color_title font_16">￥{{dataDetail.productOrgPrice}}</span>
              <del v-show="typeBook" class="color_999">￥80.00</del>
            </div>
            <div class="color_999 font_12">{{dataDetail.saleCount}}人看过</div>
          </div>
	    	</div>
    	</div>
      <!--优惠券-->
      <div v-show="cuponList.length > 0" class="bg_fff margin_top_20 padding_10">
        <div class="juc_between" @click="couponShow = true">
          <div class="font_16 color_666">优惠</div>
          <div class="color_warning align_center">领券<van-icon name="arrow" /></div>
        </div>
      </div>
      <van-popup v-model="couponShow" position="bottom">
        <div class="padding_left_20 padding_right_20 padding_top_20" style="max-height: 8.0rem;overflow: scroll">
          <div v-for="item in cuponList">
            <div @click="selectCoupon(item.couponCode+','+item.couponForm)" class="juc_between padding_10 margin_bottom_20" style="background: #FFF3E5">
              <div class="color_F5320D"style="width:70%;border-right: 2px dashed #EBDFD1">
                <div class="font_16 font_weight_bold van-ellipsis">{{item.couponTitle}}</div>
                <div class="margin_top_5 van-ellipsis">{{item.couponDesc}}</div>
                <div class="margin_top_5 van-ellipsis">有效期{{dateFormat(item.couponStartTime)}} 至 {{dateFormat(item.couponEndTime)}}</div>
              </div>
              <div class="color_F5320D font_18 juc_center align_center" style="width:30%">立即领取</div>
            </div>
          </div>
        </div>
      </van-popup>
      <!--提供商-->
      <div v-if="showCourse" class="bg_fff margin_top_20 padding_10">
        <div class="title">提供商</div>
        <div @click="goStore" class="margin_top_10">
          <van-row>
            <van-col span="5">
              <img src="../../../static/images/img/falv.png" class="img_box" />
            </van-col>
            <van-col span="19">
              <div class="font_16">{{merchantInfo.orgName}}</div>
              <div class="color_999 margin_top_5 font_12">{{merchantInfo.personIntroduce}}</div>
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
			    	<div v-show="!typeBook">
              <div v-if="index === 0 || index === 1">
                <div class="div_line"></div>
                <div class="title padding_10">全程动态管控系统</div>
                <!--课程目录-->
                <div v-if="showCourse" class="padding_10">
                  <!--<p class="color_666">第一张  <span class="font_12">&nbsp;&nbsp;&nbsp;&nbsp;入职管理</span></p>-->
                  <div v-for="(item,index) in productSection" :key="index">
                    <div class="margin_top_10 padding_10 body_bg juc_center_between">
                      <div class="color_666 flex">
                        <!--<div class="width_20px">{{index + 1}}</div>-->
                        <div class="font_12 van-ellipsis">{{item.sectionName}}</div>
                      </div>
                      <!--视频-->
                      <div v-if="typeId == 3" class="align_center">
                        <span class="color_999 font_12 margin_right_10">{{item.videoTime}}</span>
                        <div v-if="isBuy === 1">
                          <button class="btn_warning" @click="toCourse">开始播放</button>
                        </div>
                        <div v-else>
                          <div v-if="parseInt(item.videoStatus) === 1" class="width_70px">
                            <button class="btn_warning" @click="audition(item)">试听</button>
                          </div>
                          <div v-else class="width_70px">
                            <button class="btn_title van-ellipsis line_height_20" @click="goBuy(item.productCode)">立即购买</button>
                          </div>
                        </div>
                      </div>
                      <!--音频-->
                      <div v-if="typeId == 4" class="align_center">
                        <span class="color_999 font_12 margin_right_10">{{item.voiceTime}}</span>
                        <div v-if="isBuy === 1">
                          <button class="btn_warning" @click="toCourse">开始播放</button>
                        </div>
                        <div v-else>
                          <div v-if="parseInt(item.voiceStatus) === 1" class="width_70px">
                            <button class="btn_warning" @click="audition(item)">试听</button>
                          </div>
                          <div v-else class="width_70px">
                            <button class="btn_title van-ellipsis line_height_20" @click="goBuy(item.productCode)">立即购买</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--动态管控-->
                <div v-else class="padding_10">
                  <div class="align_center font_12">
                    <div class="align_center" v-for="(item,index) in sectionNav" @click="classBtn(index,item.sectionIndex)">
                      <span class="padding_5" :class="{color_title: classCur == index}">{{item.sectionName}}</span>
                      <img v-show="index != (sectionNav.length-1) " src="../../../static/images/icon/jt.png" class="jt">
                    </div>
                  </div>
                  <div v-for="(item,index) in sectionList" :key="index">
                    <div class="margin_top_10 padding_10 van-hairline--bottom">
                      <!--<p>1.1.1专项服务合同</p>-->
                      <div class="juc_center_between padding_left_20">
                        <div class="van-ellipsis color_999">{{item.sectionName}}</div>
                        <div v-show="courseBtn == 1">
                          <Button @click="courseStates" class="btn_gary van-ellipsis margin_right_10">查看详情</Button>
                          <button class="btn_title van-ellipsis" @click="goBuy(item.productCode)">立即购买</button>
                        </div>
                      </div>
                      <div v-show="courseBtn == 2" class="margin_top_10">
                        <button @click="toCourse" class="btn_plain van-ellipsis margin_right_10">视频</button>
                        <button @click="toCourse" class="btn_plain van-ellipsis margin_right_10">音频</button>
                        <button class="btn_plain van-ellipsis margin_right_10">文字预览</button>
                        <button v-show="parseInt(item.docStatus) === 0" class="btn_plain van-ellipsis">下载</button>
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
    	<div v-if="recommendList.length > 0" class="margin_top_20 bg_fff">
        <!--热门书籍-->
        <div v-if="typeBook">
          <div class="padding_10 juc_center_between">
            <div class="title">热门书籍</div>
            <!--<div class="color_666 font_12">查看更多》</div>-->
          </div>
          <div class="padding_10">
            <div class="juc_wrap_between">
              <div v-for="item in recommendList" class="width_48 border_999 margin_bottom_20 padding_5 box_sizing">
                <div @click="jumpDetail(item.productCode)">
                  <img :src="item.productProfileUrl" class="all_width height_110px"/>
                </div>
                <div class="van-ellipsis margin_top_5 title">{{item.productTitle}}</div>
                <div class="van-ellipsis margin_top_5 color_666" v-html="item.productDesc"></div>
                <div class="juc_between align_center margin_top_10">
                  <span class="color_title font_16 van-ellipsis">￥{{item.productPrice}}</span>
                  <button class="btn_title van-ellipsis" @click="goBuy(item.productCode)">立即购买</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--课程和推荐-->
    		<div v-else>
          <div class="padding_10 juc_center_between">
            <div v-if="showCourse" class="title">热门课程</div>
            <div v-else class="title">热门推荐</div>
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
                      <button v-else class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                        <van-icon name="cart" size="16px" color="#fff" />
                      </button>
                    </div>
                    <div>
                      <button class="btn_title van-ellipsis" @click="goBuy(item.productCode)">立即购买</button>
                    </div>
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
    	</div>


		<!--加入购物车底部-->
		<div>
			<van-goods-action>
			  <van-goods-action-mini-btn icon="shop" text="店铺" @click="goStore"/>
			  <van-goods-action-mini-btn icon="cart" text="购物车" to="/shoppingCart" />
			  <van-goods-action-big-btn text="加入购物车" @click="addProductCart(productCode)" style="background: #F09105;color: #fff;"/>
			  <van-goods-action-big-btn text="立即购买" @click="goBuy(productCode)" style="background: #00AA88;color: #fff;"/>
			</van-goods-action>
		</div>

    </div>
</template>
<script>
import Video from '../../components/Video.vue'
import Audio from '../../components/Audio.vue'
export default {
  components : {
    Video,
    Audio
  },
  data() {
      return {
        active: 0,
        subTab: ['简介','全程动态管控系统','商品评价'],
        star: 4,
        typeId: 0,
        productCode: 'P154036432807121',
        // productCode: this.$route.query.productCode,
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
        // 商户信息对象
        merchantInfo: {},
        // 商品属性
        productProperty: '',
        // 如果是实物
        typeBook: false,
        // 课程数据
        productSection: [],
        proSection: '',
        videoData: {
          playStatus: false,
          videoSrc: ''
        },
        audioData: {
          audioSrc: ''
        },
        // 课程状态
        courseBtn: 1,
        // 动态管控课程
        sectionNav: [],
        sectionList: [],
        sectionSize: 6,
        sectionCont: 0,
        sectionIndex: 0,
        classCur: 0,
        isBuy: 0,
        // 优惠券
        couponShow: false,
        cuponList: [],
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
      this.judgeProperty()
    }
  },
  mounted(){
    // if(this.$route.query.typeId == null){
    //   // this.showCourse = false
    //   this.judgeProperty()
    // }else {
    //   this.typeId = parseInt(this.$route.query.typeId)
    //   this.typeId === 3 || this.typeId === 4 ? this.showCourse = true : this.showCourse = false
    // }
    this.judgeProperty()
    this.getProductInfo()
    this.getEvaluateList(this.pageSize)
	},
	methods: {
    // 查看产品详情
    getProductInfo(){
      // 查看产品详情
      this.$api.getProductInfo( this.$Qs.stringify({'productCode': this.productCode, 'ciCode': this.$store.state.userData.cicode}) )

        .then( (res) => {
          console.log(res);
          if(res.data.code == 200){
            var result = res.data.content
            this.dataDetail = result
            //获取推荐产品
            if(!result.productRecommendCode == '' || !result.productRecommendCode == null){
              this.getProductShowCase(result.productRecommendCode)
            }
            // 获取商户信息
            this.getMerchantInfo(result.merchantCode)
            // 商品属性
            this.productProperty = result.productProperty
            //获取优惠券列表
            this.getProductCoupon(this.productCode, result.merchantCode)
            //商品评分
            result.productScore == null ? this.valueCustomText = 0 : this.valueCustomText = result.productScore
            // 动态管控列表
            this.sectionNav = result.productSectionIndexList
            this.sectionIndex = result.productSectionIndexList[0].sectionIndex
            // 动态管控课程目录
            this.sectionList = result.productSectionList

            // 课程目录
            var productSection = eval(result.productSection)
            this.proSection = result.productSection
            this.productSection = productSection
            console.log(productSection)
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
    //获取商户详细信息
    getMerchantInfo(code){
      this.$api.getMerchantInfo( this.$Qs.stringify({'merchantCode': code}) )

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
    // 获取动态管控列表
    getSectionIndex(sectionIndex){
      let params = this.$Qs.stringify({'pageNo': 1, 'pageSize': this.sectionSize,'productSectionIndex': sectionIndex, 'productSection': this.proSection});
      this.$api.getProductCommentList( params )

        .then( (res) => {
          console.log(res);
          if(res.data.code == 200){
            var result = res.data.content
            var arr = []
            for (var i = 0; i < result.list.length; i++) {
              arr.push(result.list[i].productInfo.productSectionList)
            }
            this.sectionList = arr
            this.sectionCont = result.count
            console.log(arr)

          }else if (res.data.code == 500){

            this.$toast.fail(res.data.message);

          }

        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 选择优惠券
    selectCoupon(couponCode){
      var arr = couponCode.split(",")
      var ciCode = this.$store.state.userData.cicode
      if(ciCode == null || ciCode == "null" || ciCode == undefined){
        this.$toast('您还没有登录，请登录后再尝试！');
        return ;
      }
      let params = this.$Qs.stringify({'ciCode': ciCode, 'couponCode': arr[0], 'couponForm': arr[1]});
      this.$api.addCoupont( params )

        .then( (res) => {
          console.log(res);
          if(res.data.code == 200){
            this.$toast('领取成功');
            // 刷新优惠券列表
            this.getProductCoupon(this.productCode,this.merchantCode)
          }else{
            this.$toast.fail(res.data.message);
          }
        })
        .catch((error) => {
          this.$toast.fail('领取失败');
          console.log('发生错误！', error);
        });
    },
    // 获取优惠券列表
    getProductCoupon(productCode, merchantCode){
      let params = this.$Qs.stringify({'pageNo': 1, 'pageSize': 100, 'productCode': productCode, 'merchantCode': merchantCode});
      this.$api.getProductCoupon( params )

        .then( (res) => {
          console.log(res);
          if(res.data.code == 200){
            this.cuponList = res.data.content.list
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
    // 跳转到课程
    toCourse(){
      if(this.isBuy === 0){
        this.$toast('对不起，您需要购买后才能观看！');
        return false;
      }
      switch (this.typeId) {
        case 1:
        case 2:
          this.$router.push({
            path:'/seeFalv',
            query: {

            }
          })
          break
        case 3:
        case 4:
          this.$router.push({
            path:'/seeVideo',
            query: {

            }
          })
          break
      }
    },
    // 文字预览
    openTxt(item){
      if(this.isBuy === 0){
        this.$toast('对不起，您需要购买后才能观看！');
        return false;
      }
      if(item.txtUrl === ''){
        this.$toast('对不起，暂无数据！');
        return false;
      }
    },
    courseStates(){
      this.courseBtn = 2
    },
    // 试听
    audition(item){
      if (this.typeId == 3) {
        if(item.videoUrl == ''){
          this.$toast('对不起，当前没有播放源！');
          return false;
        }
        this.videoData.videoSrc = item.videoSrc
      }else if (this.typeId == 4) {
        if(item.voiceUrl == ''){
          this.$toast('对不起，当前没有播放源！');
          return false;
        }
        this.audioData.audioSrc = item.voiceUrl
      }
    },
    //课程
    classBtn(i,sIndex){
      this.classCur = i;
      this.sectionIndex = sIndex
      this.getSectionIndex(sIndex)
    },
    // 跳转到提供商店铺
    goStore(){
      this.$router.push({
        path:'/supplierStore',
        query: {
          merchantCode: this.dataDetail.merchantCode
        }
      })
    },
    // 判断商品属性
    judgeProperty(){
      //@attr 商品属性1-实物，2-音频 3-视频 4-文档 包含多个使用逗号链接
     if(this.$route.query.typeId == null){
       // 如果没有参数typeId
       var attr = this.productProperty
       var arr = attr;
       if(attr.indexOf(',') != -1){ attr = attr.split(',') }
       if(arr.length > 1 || arr == '4'){
         this.typeId = 1
         this.showCourse = false
       }else {
         this.showCourse = true
         switch (attr) {
           case '1':
             this.typeId = 5
             this.typeBook = true
             this.subTab[1] = ''
             break
           case '2':
             this.typeId = 4
             break
           case '3':
             this.typeId = 3
             break
         }
       }
     }else {
       // 如果有参数typeId
       this.typeId = parseInt(this.$route.query.typeId)
       switch (this.typeId) {
         case 3 :
         case 4 :
           this.showCourse = true
           break
         case 5 :
           this.showCourse = true
           this.typeBook = true
           this.subTab[1] = ''
           break
       }
     }
    },
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat:function(time) {
      var date=new Date(time);
      var year=date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      // 拼接
      return year+"-"+month+"-"+day;
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
  .width_48{width: 48%}
</style>
