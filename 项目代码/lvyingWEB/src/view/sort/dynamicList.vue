<template>
    <div >

    	<div>
	    	<van-tabs color="#00AA88" @click="clickTab" v-model="active" sticky>
			  	<van-tab v-for="(item,index) in tabTitle" :key="index" :title="item.catName">

            <div v-for="(val,i) in lists" :key="i" class="margin_10">
              <van-row>
                <van-col span="10">
                  <div @click="toDetail" class="img_box">
                    <img :src="val.img" class="all_width all_height"/>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="class_box">
                    <div class="title van-ellipsis">{{val.title}}</div>
                    <div class="van-ellipsis margin_top_5 color_666">{{val.info}}</div>
                    <div class="margin_top_10">
                      <van-row>
                        <van-col span="12">
                          <span class="color_title font_16">¥{{val.price}}</span>
                        </van-col>
                        <van-col span="12">
                          <div class="more"><span>{{val.people}}人看过</span></div>
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
	    		{
	    			name: '全部',
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
	    			]
	    		},
	    		{
	    			name: '在职',
	    			lists: [
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议21',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 23235,
		    				price: '100.00'
	    				}
	    			]
	    		},
	    		{
	    			name: '入职',
	    			lists: [
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12,
		    				price: '200.00'
	    				},
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12,
		    				price: '200.00'
	    				},
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12,
		    				price: '200.00'
	    				}
	    			]
	    		}
	    	],
          lists: [],
          id: this.$route.query.id
        }

    },
    mounted(){
    	//设置页面的title
		document.title = this.$route.query.name;
		console.log(this.$route.query.id)
//		console.log(this.$route.params.name)
      this.getTabTitle(this.id)

	},
	methods: {
    // 获取tab
    getTabTitle(id){
      // 获取产品分类列表
      this.$api.getProductCatList( this.$Qs.stringify({'parentId': id}) )

        .then( (res) => {

          if(res.data.code == 200){

            this.tabTitle = res.data.content
            this.getProductList(1, id)

          }else{

            this.$toast.fail(res.data.message);

          }

        })
        .catch((error) => {
          console.log('发生错误！', error);
        });
    },
    // 获取商品列表
    getProductList(page,id){
      console.log(1111111)
      this.$api.getProductList( this.$Qs.stringify({'pageNo': page, 'pageSize': 10, 'productCat': id, 'orderByStr': 10}) )

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
    // 切换tab
    clickTab(index, title){
      console.log(title)
      // this.active = index;
      // // 跳转
      // let Url = this.tabTitle[index].path;
      // console.log(index)
      // this.$router.push({
      //   name:Url,
      //   params: {
      //     id: index
      //   }
      // })
    },
    	toDetail(){
    		this.$router.push({
		       path:'/falvDetail',
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

    .img_box{
      width: 100%;
      height: 2.4rem;
    }
</style>
