<template>
    <div >

      <div>
        <div class="search_box">
          <input v-model="searchval" type="text" placeholder="视频/音频/合同"/>
          <button @click="onSearch">
            <van-icon name="search" color="#fff" size="16px"/>
          </button>
        </div>
      </div>

    	<div class="margin_top_20">

        <div v-for="(val,i) in lists" :key="i" class="margin_10">
          <van-row>
            <van-col span="10">
              <div @click="toDetail" class="img_box">
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
                      <div class="more"><span>{{val.saleCount}}人看过</span></div>
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
  data() {
      return {
        lists: [
          {
            img: '../static/images/img/class.png',
            title: '审核同业禁止协议',
            info: '知识产权许可使用合同起草知识产权许可使用合同起草',
            people: 12345,
            price: '500.00'
          },
          {
            img: '../static/images/img/class.png',
            title: '审核同业禁止协议',
            info: '知识产权许可使用合同起草知识产权许可使用合同起草',
            people: 12345,
            price: '500.00'
          },
          {
            img: '../static/images/img/class.png',
            title: '审核同业禁止协议',
            info: '知识产权许可使用合同起草知识产权许可使用合同起草',
            people: 12345,
            price: '500.00'
          },
          {
            img: '../static/images/img/class.png',
            title: '审核同业禁止协议',
            info: '知识产权许可使用合同起草知识产权许可使用合同起草',
            people: 12345,
            price: '500.00'
          }
        ],
        searchval: ''
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
      this.$api.getProductList( this.$Qs.stringify({'pageNo': page, 'pageSize': 10, 'searchKey': this.searchval}) )

        .then( (res) => {
          console.log(res);
          if(res.data.code == 200){
            this.lists = res.data.content.list
            // this.total = res.data.content.count

          }else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    toDetail(i){
      this.$router.push({
        path:'/bookDetail',
        // query: {
        //   id: i
        // }
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
</style>
