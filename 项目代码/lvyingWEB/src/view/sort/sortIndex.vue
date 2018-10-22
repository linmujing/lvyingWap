<template>
    <div >
    	<div style="margin-bottom: 50px">

			<van-row>
				<!--侧边栏-->
			  	<van-col span="7">
				  	<van-badge-group :active-key="activeKey" v-bind:style="{height: fullHeight - 50 + 'px'}" class="all_width scroll">
					  <van-badge v-for="(item,index) in navTitle" :key="index" :title="item.name" @click="onClick" class="van-ellipsis"/>
					</van-badge-group>
			  	</van-col>
			  	<!--内容-->
			  	<van-col span="17">
				  	<div  v-bind:style="{height: fullHeight - 50 + 'px'}" class="scroll">
					  	<div v-for="(item,index) in tabData[tabIndex].lists" :key="index">
							<div @click="toList(1)" class="font_16 padding_10 van-ellipsis">{{item.title}}</div>
							<div class="flex_warp">
								<div v-for="(val, index2) in item.items" :key="index2" @click="toList(2)" class="sort">

									<div class="all_width">
										<img :src="val.img" class="all_width all_height"/>
									</div>
									<div class="juc_center margin_top_5 van-ellipsis color_999">{{val.arr}}</div>
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
		    tabData: [
		    	{
					name: "行业动态管控",
					lists:[
						{
							title: "行业（企业）",
							items:[
								{
									img: "../static/images/img/class.png",
									arr:'入职1'
								},
								{
									img: "../static/images/img/class.png",
									arr:'入职2'
								},
								{
									img: "../static/images/img/class.png",
									arr:'入职3'
								},
								{
									img: "../static/images/img/class.png",
									arr:'入职4'
								},
								{
									img: "../static/images/img/class.png",
									arr:'入职4'
								}
							]
						},
						{
							title: "行业（企业）2",
							items:[
								{
									img: "../static/images/img/class.png",
									arr:'入职'
								}
							]
						},
						{
							title: "行业（企业）3",
							items:[
								{
									img: "../static/images/img/class.png",
									arr:'入职1'
								},
								{
									img: "../static/images/img/class.png",
									arr:'入职2'
								}
							]
						},
						{
							title: "行业（企业）2",
							items:[
								{
									img: "../static/images/img/class.png",
									arr:'入职'
								}
							]
						}
					]
				},
				{
					name: "法律动态管控",
					lists:[
						{
							title: "法律（企业）",
							items:[
								{
									img: "../static/images/img/class.png",
									arr:'入职'
								}
							]
						}
					]
				},
				{
					name: "视频课程",
					lists:[
						{
							title: "视频课程1",
							items:[
								{
									img: "../static/images/img/class.png",
									arr:'入职'
								},
				                {
									img: "../static/images/img/class.png",
									arr:'入职'
								}
							]
						}
					]
				},
				{
					name: "音频课程",
					lists:[
						{
							title: "音频课程1",
							items:[
								{
									img: "../static/images/img/class.png",
									arr:'入职'
								},
				                {
									img: "../static/images/img/class.png",
									arr:'入职'
								}
							]
						}
					]
				},
				{
					name: "律瀛商城",
					lists:[
						{
							title: "律瀛商城1",
							items:[
								{
									img: "../static/images/img/class.png",
									arr:'入职'
								},
				                {
									img: "../static/images/img/class.png",
									arr:'入职'
								}
							]
						}
					]
				}
			],
        navTitle: [
          {name: '行业动态管控', id: 1},
          {name: '法律动态管控', id: 2},
          {name: '视频课程', id: 3},
          {name: '音频课程', id: 4},
          {name: '律瀛商城', id: 5}
        ],
      }

    },
    mounted(){
    	//获取屏幕高度
    	this.fullHeight = document.documentElement.clientHeight || document.body.clientHeight;
	  },
	  methods: {
    	onClick(key) {
    		console.log(key)
	      this.activeKey = key;
	      this.tabIndex = key;
	    },
	    toList(id){
	    	console.log(id)
        var tabIndex = this.tabIndex;
        if(tabIndex == 0 || tabIndex == 1){
          this.$router.push({
            path:'/dynamicList',
            query: {
              id: id,
              name: '劳动企业' + id
            }
          })
        }else if(tabIndex == 2 || tabIndex == 3){
          this.$router.push({
            path:'/videoList',
            query: {
              id: id,
              name: '视频' + id
            }
          })
        }else if(tabIndex == 4){
          this.$router.push({
            path:'/lvyingMallList',
            query: {
              id: id,
              name: '律瀛商城' + id
            }
          })
        }

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
    	width: 21%;
    	margin-bottom: 0.2rem;
    	margin-left: 0.16rem;
    }
    .scroll{overflow: scroll;}
</style>
