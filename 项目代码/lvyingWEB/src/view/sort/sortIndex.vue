<template>
    <div >
    	<div style="margin-bottom: 50px">

			<van-row>
				<!--侧边栏-->
			  	<van-col span="7">
				  	<van-badge-group :active-key="activeKey" v-bind:style="{height: fullHeight - 50 + 'px'}" class="all_width scroll">
					  <van-badge v-for="(item,index) in tabData" :key="index" :title="item.catName" @click="onClick(index, item.id)" class="van-ellipsis"/>
					</van-badge-group>
			  	</van-col>
			  	<!--内容-->
			  	<van-col span="17">
				  	<div  v-bind:style="{height: fullHeight - 50 + 'px'}" class="scroll">
					  	<div v-for="(item,index) in tabData[tabIndex].productCatVoList" :key="index">
                <div class="font_16 padding_10 van-ellipsis" @click="toList(tabData[tabIndex].id,tabData[tabIndex].catName)">{{item.catName}}</div>
                <div class="flex_warp">
                  <div v-for="(val, index2) in item.productCatVoList" :key="index2" class="sort">

                    <!--<div class="all_width">-->
                      <!--<img :src="val.img" class="all_width all_height"/>-->
                    <!--</div>-->
                    <div @click="toList(item.id, item.catName)" class="juc_center margin_top_5 van-ellipsis color_999">{{val.catName}}</div>
                  </div>
                </div>
              </div>
            </div>
			  	</van-col>

			</van-row>

    	</div>


    	<FooterBar :curIndex = '1'></FooterBar>

    </div>
</template>
<script>
import FooterBar from '../../components/FooterBar.vue'
export default {
    components : {
        FooterBar
    },
    data() {
      return {
		    activeKey: 0,
		    //页面高度
		    fullHeight: '',
		    //内容显示的index
		    tabIndex: 0,
		    tabData: [{productCatVoList: []}],
        tabId: 0
      }

    },
    mounted(){
    	//获取屏幕高度
    	this.fullHeight = document.documentElement.clientHeight || document.body.clientHeight;
    	this.getSortList()
	  },
	  methods: {
      // 获取分类列表
      getSortList(){
        this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
        this.$api.getProductCatWxInitList( this.$Qs.stringify() )

          .then( (res) => {
            // console.log(res);
            if(res.data.code == 200){
              this.$toast.clear();
              this.tabData = res.data.content
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
    	onClick(index, id) {
	      this.activeKey = index;
	      this.tabIndex = index;
        this.tabId = id;
	    },
	    toList(id, name){
	    	// console.log(id)
        this.$router.push({
          path:'/dynamicList',
          query: {
            id: id,
            typeId: this.tabId,
            name: name
          }
        })

	    }
    }
}
</script>
<style>
	.van-badge{font-size: 0.28rem;}
	.van-badge-group{background-color: #f8f8f8;}
	.van-badge--select{border-color: #00AA88!important;}
</style>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import '../shopMall/shopMall.less';

    .sort{
    	/*width: 21%;*/
    	margin-bottom: 0.2rem;
    	margin-left: 0.2rem;
    }
    .scroll{overflow: scroll;}
</style>
