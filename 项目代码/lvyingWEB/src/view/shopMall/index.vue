<template>
    <div>
    	<div style="margin-bottom: 60px">
	    	<van-tabs color="#00AA88" @click="changeNav"  v-model="active" sticky>
			  	<van-tab v-for="(item,index) in tabTitle" :key="index" :title="item.title">

				  	<router-view></router-view>

				</van-tab>
			</van-tabs>
    	</div>


    	<FooterBar :curIndex = '0'></FooterBar>
			<Message></Message>
			<Bindiphone></Bindiphone>	

    </div>
</template>
<script>
import FooterBar from '../../components/FooterBar.vue'
import Message from '../../components/Message.vue'
import Bindiphone from '../../components/Bindiphone.vue'
export default {
    components : {
		FooterBar,
		Message,
		Bindiphone
    },
    data() {
        return {
        	active: 0,
        	tabTitle: [
        		{title: '推荐', path: 'shopMallIdex'},
        		{title: '行业动态管控', path: 'industryDynamic'},
        		{title: '法律动态管控', path: 'lawDynamic'},
        		{title: '视频课程', path: 'videoCourse'},
        		{title: '音频课程', path: 'audioCourse'}
        	],
        	images: [
		      '../static/images/img/banner.png',
		      '../static/images/img/banner.png'
		    ],

        }

    },
    methods: {
    	//tab栏切换
    	changeNav(index, title){
    		this.active = index;
    		// 跳转
            let Url = this.tabTitle[index].path;
            console.log(index)
            this.$router.push({
              name:Url,
              params: {
                id: index
              }
            })
    	}
    }
}
</script>
<style type="text/css">
	/*轮播的点*/
	.van-swipe__indicators{display: none;}
	/*搜索*/
	.van-search .van-cell{border-radius: 15px; border: 1px solid #D8D8D8;border-right:transparent}
</style>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import './shopMall.less';
</style>
