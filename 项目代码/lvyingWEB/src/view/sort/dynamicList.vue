<template>
    <div >

    	<div>
	    	<van-tabs color="#00AA88" @click="clickTab" v-model="active" sticky>
			  	<van-tab v-for="(item,index) in tabTitle" :key="index" :title="item.catName">

            <div v-if="lists.length > 0">
              <div v-if="typeId == 1 || typeId == 2">
                <div v-for="(val,i) in lists" :key="i" class="margin_10">
                  <van-row>
                    <van-col span="10">
                      <div @click="toDetail(val.productCode)" class="img_box">
                        <img :src="val.productProfileUrl" class="all_width all_height"/>
                      </div>
                    </van-col>
                    <van-col span="14">
                      <div class="class_box">
                        <div class="title van-ellipsis">{{val.productTitle}}</div>
                        <div class="van-ellipsis margin_top_5 color_666">{{val.productKeyWord}}</div>
                        <div class="margin_top_10">
                          <van-row>
                            <van-col span="12">
                              <span class="color_title font_16">¥{{val.productPrice}}</span>
                            </van-col>
                            <van-col span="12">
                              <div class="more"><span>{{val.lookCount}}人看过</span></div>
                            </van-col>
                          </van-row>
                        </div>
                        <div class="margin_top_10">
                          <div class="juc_center_between">
                            <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(val.productCode)">
                              <van-icon name="cart" size="16px" color="#fff" />
                            </button>
                            <button class="btn_title" @click="goBuy(val.productCode)">立即购买</button>
                          </div>
                        </div>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </div>
              <div v-else-if="typeId == 3 || typeId == 4">
                <div class="padding_10 juc_wrap_between">
                  <div v-for="(val,i) in lists" :key="i" class="list_box">
                    <div @click="toDetail(val.productCode)" class="text_center">
                      <img :src="val.productProfileUrl" class="img_box">
                    </div>
                    <div class="margin_top_5 font_16 van-ellipsis">{{val.productTitle}}</div>
                    <div class="margin_top_5 juc_center_between">
                      <div class="width_50 color_666 van-ellipsis">{{val.productKeyWord}}</div>
                      <div class="width_50 color_999 van-ellipsis font_12">{{val.lookCount}}人看过</div>
                    </div>
                    <div class="margin_top_5 juc_center_between">
                      <span class="color_title font_16">¥{{val.productPrice}}</span>
                      <button class="btn_title van-ellipsis" @click="goBuy(val.productCode)">立即购买</button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="padding_10 juc_wrap_between">
                  <div v-for="(val,i) in lists" :key="i" class="width_48 border_999 margin_bottom_20 padding_5 box_sizing">
                    <div @click="toDetail(val.productCode)">
                      <img :src="val.productProfileUrl" class="all_width height_180px">
                    </div>
                    <div class="van-ellipsis margin_top_5 title">{{val.productTitle}}</div>
                    <div class="van-ellipsis margin_top_5 color_666">{{val.productKeyWord}}</div>
                    <div class="juc_between align_center margin_top_10">
                      <span class="color_title font_16 van-ellipsis">¥{{val.productPrice}}</span>
                      <button class="btn_title van-ellipsis" @click="goBuy(val.productCode)">立即购买</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text_center padding_10" @click="clickMore">{{more}}</div>
            </div>

            <div v-else class="padding_20 text_center">暂无数据~</div>

				</van-tab>
			</van-tabs>
    	</div>

    </div>
</template>
<script>
export default {
    data() {
        return {
        	active: 0,
		      tabTitle: [
            {'catName': '全部', 'id': this.$route.query.id}
          ],
          lists: [],
          id: this.$route.query.id,
          pageSize: 6,
          count: 0,
          more: '点击加载更多~',
          typeId: this.$route.query.typeId,
        }

    },
    mounted(){
      //设置页面的title
      document.title = this.$route.query.name;
      console.log(this.$route.query.id)
      this.getTabTitle(this.id)

	},
	methods: {
    // 获取tab
    getTabTitle(id){
      // 获取产品分类列表
      this.$api.getProductCatList( this.$Qs.stringify({'parentId': id}) )

        .then( (res) => {

          if(res.data.code == 200){
            var arr = []
            arr = res.data.content
            arr.unshift(this.tabTitle[0])
            this.tabTitle = arr
            this.getProductList(6, id)
          }else{
            this.$toast.fail(res.data.message);
          }

        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 获取商品列表
    getProductList(pageSize,id){
      this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
      this.$api.getProductList( this.$Qs.stringify({'pageNo': 1, 'pageSize': pageSize, 'productCat': id, 'orderByStr': 10}) )

        .then( (res) => {
          // console.log(res);
          if(res.data.code == 200){
            this.$toast.clear();
            this.lists = res.data.content.list
            this.count = res.data.content.count
          }else {
            this.$toast.clear();
            this.$toast.fail(res.data.message);
          }
        })
        .catch((error) => {
          this.$toast.clear();
          console.log('发生错误！', error);
        });
    },
    // 切换tab
    clickTab(index, title){
      var arr = this.tabTitle
      for (var i = 0; i < arr.length; i++) {
        if(arr[i].catName === title){
          this.id = arr[i].id
          this.getProductList(6, arr[i].id)
        }
      }
    },
    toDetail(code){
      this.$router.push({
         path:'/falvDetail',
         query: {
           typeId: this.typeId,
           productCode: code
         }
      })
    },
    // 加载更多
    clickMore(){
      var pageSize = this.pageSize
      this.pageSize += 6
      if(pageSize >= this.count){
        this.$toast('没有更多了');
        this.more = '没有更多了~'
      }else {
        this.getProductList(this.pageSize, this.id)
      }
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

  },
}
</script>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import '../shopMall/shopMall.less';

    .img_box{
      width: 100%;
      height: 2.4rem;
    }
  .list_box{
    width: 3.4rem;
    margin-bottom: 0.4rem;
  }
  .width_48{width: 48%}
  .height_180px{height: 3.6rem}
</style>
