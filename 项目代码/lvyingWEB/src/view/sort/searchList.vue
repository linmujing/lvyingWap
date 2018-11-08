<template>
    <div >

      <div class="search">
        <div class="search_box">
          <input v-model="searchval" type="text" placeholder="视频/音频/合同"/>
          <button @click="onSearch">
            <van-icon name="search" color="#fff" size="16px"/>
          </button>
        </div>
      </div>

    	<div class="list_box">

        <div v-for="(val,i) in lists" :key="i" class="margin_10">
          <van-row>
            <van-col span="10">
              <div @click="toDetail(val.productCode)" class="img_box">
                <img :src="val.productProfileUrl" class="all_width height_110px"/>
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
                      <div class="more"><span>{{val.saleCount}}人看过</span></div>
                    </van-col>
                  </van-row>
                </div>
                <div class="margin_top_10">
                  <div class="juc_center_between">
                    <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                      <van-icon name="cart" size="16px" color="#fff" />
                    </button>
                    <button class="btn_title" @click="goBuy(item.productCode)">立即购买</button>
                  </div>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>

        <div v-if="lists.length>=total" class="text_center padding_10">没有更多了~</div>
        <div v-else class="text_center padding_10" @click="seeMore">点击查看更多</div>

    	</div>

    </div>
</template>
<script>
export default {
  data() {
      return {
        lists: [],
        searchval: '',
        total: 0,
        pageSize: 2,
        page: 1
      }

  },
  mounted(){
    console.log(this.$route.query.searchVal)
    this.searchval = this.$route.query.searchVal
    this.getProductList(1)
	},
	methods: {
    // 搜索
    onSearch(){
      console.log(this.searchval)
      this.getProductList(1)
    },
    // 获取商品列表
    getProductList(page){
      this.$api.getProductList( this.$Qs.stringify({'pageNo': page, 'pageSize': this.pageSize, 'searchKey': this.searchval}) )

        .then( (res) => {
          console.log(page)
          if(res.data.code == 200){
            var result = res.data.content
            var list = []
            if(page == 1){
              list = result.list
            }else {
              list = this.lists
              for (var i=0;i<result.list.length;i++) {
                list.push(result.list[i])
              }
            }
            this.total = result.count
            this.lists = list
            console.log(this.lists)
          }else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 跳转到详情
    toDetail(code){
      this.$router.push({
        path:'/falvDetail',
        query: {
          productCode: code
        }
      })
    },
    // 点击查看更多
    seeMore(){
      console.log(1111)
      this.page += 1
      this.getProductList(this.page)
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

  .width_48{width: 48%}
  /*搜索框*/
  .search{
    width: 100%;
    position: fixed;
    top: 0;
    background: #fff;
  }
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
  .list_box{
    margin-top: 60px;
  }
</style>
