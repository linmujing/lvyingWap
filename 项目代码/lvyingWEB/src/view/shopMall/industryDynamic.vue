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
                  <div class="more" @click="moreList">
                    <span>查看更多》</span>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div v-for="item in hotArr" class="margin_10">
              <van-row>
                <van-col span="10">
                  <div @click="toDetail(item.productCode)">
                    <img :src="item.productProfileUrl" class="all_width height_110px"/>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="class_box">
                    <div class="title van-ellipsis" @click="toDetail(item.productCode)">{{item.productTitle}}</div>
                    <div class="van-ellipsis margin_top_5 color_666">{{item.productKeyWord}}</div>
                    <div class="margin_top_10">
                      <van-row>
                        <van-col span="12">
                          <span class="color_title font_16">￥{{item.productPrice}}</span>
                        </van-col>
                        <van-col span="12">
                          <div class="more"><span>{{item.lookCount}}人看过</span></div>
                        </van-col>
                      </van-row>
                    </div>
                    <div class="margin_top_10">
                      <div class="juc_center_between">
                        <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                          <van-icon name="cart" size="16px" color="#fff" />
                        </button>
                        <button class="btn_title"  @click='goBuy(item.productCode)'>立即购买</button>
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
                  <div class="more" @click="moreList">
                    <span>查看更多》</span>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div v-for="item in laborArr" class="margin_10">
              <van-row>
                <van-col span="10">
                  <div @click="toDetail(item.productCode)">
                    <img :src="item.productProfileUrl" class="all_width height_110px"/>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="class_box">
                    <div class="title van-ellipsis" @click="toDetail(item.productCode)">{{item.productTitle}}</div>
                    <div class="van-ellipsis margin_top_5 color_666">{{item.productKeyWord}}</div>
                    <div class="margin_top_10">
                      <van-row>
                        <van-col span="12">
                          <span class="color_title font_16">￥{{item.productPrice}}</span>
                        </van-col>
                        <van-col span="12">
                          <div class="more"><span>{{item.lookCount}}人看过</span></div>
                        </van-col>
                      </van-row>
                    </div>
                    <div class="margin_top_10">
                      <div class="juc_center_between">
                        <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                          <van-icon name="cart" size="16px" color="#fff" />
                        </button>
                        <button class="btn_title" @click='goBuy(item.productCode)'>立即购买</button>
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
          typeName: '行业动态管控',
          hotArr:[],
          laborArr:[],
          banner: [],
          value: 0,
        }

    },
    mounted(){
      this.getCaseProduct(2)
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
        this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
        this.$api.getProductShowCaseList(this.$Qs.stringify({appType:1, pageLocat: pageLocat})).then((res)=>{
          if(res.data.code == 200){
            this.$toast.clear();
            let {content}=res.data;
            // 保存轮播数据
            if(!res.data.content[2].caseUrl == '' || !res.data.content[2].caseUrl == null || !res.data.content[2].caseUrl  == undefined){
              this.banner =  eval(res.data.content[2].caseUrl)
            }
            for(let item of content){
              if(item.caseName=="劳动推荐"){
                this.getProductShowCase(item.productCode, item.productSortBy, 1)
              }else if(item.caseName=="热门推荐"){
                this.getProductShowCase(item.productCode, item.productSortBy, 2)
              }
            }
          }else{
            this.$toast.clear();
            this.$toast.fail(res.data.message);

          }
        })
          .catch((error) => {
            this.$toast.clear();
            console.log('发生错误！', error);
          });
      },
      //获取推荐商品
      getProductShowCase(productCode, productSortBy, type){
        this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
        var params = this.$Qs.stringify({'productCode': productCode, 'productSortBy': productSortBy})
        this.$api.getProductShowCase( params )

          .then( (res) => {

            if(res.data.code == 200){
              this.$toast.clear();
              switch (type) {
                case 1:
                  this.laborArr = res.data.content
                  break
                case 2:
                  this.hotArr = res.data.content
                  break
              }

            }else{
              this.$toast.clear();
              this.$toast.fail(res.data.message);

            }
          })
          .catch((error) => {
            this.$toast.clear();
            console.log('发生错误！', error);
          });
      },
      // 查看更多
      moreList(){
        this.$router.push({
          path:'/dynamicList',
          query: {
            id: 1,
            typeId: 1,
            name: this.typeName
          }
        })
      },
      // 跳转到详情
      toDetail(code){
        this.$router.push({
          path:'/falvDetail',
          query: {
            typeId: 1,
            productCode: code
          }
        })
      },

      /** 数据 **/
      // 添加商品到购物车 MT
      addProductCart(code){
        if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
          this.$toast('您还没有登录，请登录后再尝试！');
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
          this.$toast('您还没有登录，请登录后再尝试！');
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
    @import './shopMall.less';


</style>
