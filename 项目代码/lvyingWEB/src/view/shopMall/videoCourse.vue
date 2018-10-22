<template>
	<div>
    <!--轮播-->
    <div>
      <van-swipe :autoplay="4000">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <img :src="item.src" class="all_width"/>
        </van-swipe-item>
      </van-swipe>
    </div>
		<!--热门推荐-->
  		<div>
  			<div class="margin_10">
	  			<van-row>
				  <van-col span="18">
				  	<span class="title">热门推荐</span>
				  </van-col>
				  <van-col span="6">
            <div class="more" @click="moreList()">
              <span>查看更多》</span>
            </div>
				  </van-col>
				</van-row>
	  		</div>
	  		<div v-for="item in hotArr" class="margin_10">
	  			<van-row>
				  <van-col span="10">
            <div @click="toDetail">
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
				  			<div class="margin_top_10">
					        	<van-row>
						          <van-col span="6">
						            <div class="flex_warp van-ellipsis" @click="toDetail">
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
            <div class="more" @click="moreList()">
              <span>查看更多》</span>
            </div>
				  </van-col>
				</van-row>
	  		</div>
	  		<div v-for="item in laborArr" class="margin_10">
	  			<van-row>
				  <van-col span="10">
            <div @click="toDetail">
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
				  			<div class="margin_top_10">
					        	<van-row>
						          <van-col span="6">
						            <div class="flex_warp van-ellipsis" @click="toDetail">
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
        typeName: '视频课程',
        hotArr:[],
        laborArr:[],
        banner: [],
        value: 0,
      }

  },
  mounted(){
    this.getCaseProduct(4)
    this.getNavTitle()
  },
  methods: {
    // 获取导航标题
    getNavTitle(){
      this.$api.getProductCatList( this.$Qs.stringify({'parentId': '0'}) )

        .then( (res) => {

          if(res.data.code == 200){

            // 导航标题信息
            sessionStorage.setItem("NavTitle", JSON.stringify(res.data.content));

          }else{

            this.$toast.fail(res.data.message);

          }
        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    //获取橱窗对象
    getCaseProduct(pageLocat){
      this.$api.getProductShowCaseList(this.$Qs.stringify({appType:2, pageLocat: pageLocat})).then((res)=>{

        if(res.data.code == 200){
          let {content}=res.data;
          // 保存轮播数据
          this.banner = eval(res.data.content[2].caseUrl)
          for(let item of content){
            if(item.caseName=="音频推荐" || item.caseName=="视频推荐"){
              this.getProductShowCase(item.productCode, item.productSortBy, 1)
            }else if(item.caseName=="热门推荐"){
              this.getProductShowCase(item.productCode, item.productSortBy, 2)
            }
          }
        }else{
          this.$toast.fail(res.data.message);
        }
      })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    //获取推荐商品
    getProductShowCase(productCode, productSortBy, type){
      var params = this.$Qs.stringify({'productCode': productCode, 'productSortBy': productSortBy})
      this.$api.getProductShowCase( params )

        .then( (res) => {

          if(res.data.code == 200){

            switch (type) {
              case 1:
                this.laborArr = res.data.content
                break
              case 2:
                this.hotArr = res.data.content
                break
            }

          }else{

            this.$toast.fail(res.data.message);

          }
        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 查看更多
    moreList(){
      this.$router.push({
        path:'/lvyingMallList',
        query: {
          typeId: 1
        }
      })
    },
    // 跳转到详情
    toDetail(){
      this.$router.push({
        path:'/videoDetail',
        query: {
          typeId: 1
        }
      })
    }
  }
}
</script>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import './shopMall.less';

</style>
