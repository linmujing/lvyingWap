<template>
    <div >
    	
    	<div>
	    	<van-tabs color="#00AA88"  v-model="active" sticky>
			  	<van-tab v-for="(item,index) in tabTitle" :key="index" :title="item.name">
				  	
				  	<div class="padding_10 juc_wrap_between">
				  		<div v-for="(val,i) in item.lists" :key="i" class="list_box">
				  			<div @click="toDetail(i)" class="text_center">
                  <img :src="val.img" class="img_box">
                </div>
                <div class="margin_top_5 font_16 van-ellipsis">{{val.title}}</div>
                <div class="margin_top_5 juc_center_between">
                  <div class="width_50 color_666 van-ellipsis">{{val.info}}</div>
                  <div class="width_50 color_999 van-ellipsis font_12">{{val.people}}人看过</div>
                </div>
                <div class="margin_top_5 juc_center_between">
                  <span class="color_title font_16">￥500.00</span>
                  <button class="btn_title van-ellipsis">立即购买</button>
                </div>
				  		</div>
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
		    				info: '法院大讲堂',
		    				people: 12345,
		    				price: 500.00
	    				},
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议',
		    				info: '法院大讲堂',
		    				people: 12345,
		    				price: 500.00
	    				},
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议',
		    				info: '法院大讲堂',
		    				people: 12345,
		    				price: 500.00
	    				},
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议',
		    				info: '法院大讲堂',
		    				people: 12345,
		    				price: 500.00
	    				}
	    			]
	    		},
	    		{
	    			name: '在职',
	    			lists: [
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议21',
		    				info: '法院大讲堂',
		    				people: 23235,
		    				price: 100.00
	    				}
	    			]
	    		},
	    		{
	    			name: '入职',
	    			lists: [
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '法院大讲堂',
		    				people: 12,
		    				price: 200.00
	    				},
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '法院大讲堂',
		    				people: 12,
		    				price: 200.00
	    				},
	    				{
	    					img: '../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '法院大讲堂',
		    				people: 12,
		    				price: 200.00
	    				}
	    			]
	    		}
	    	]
        }
        
    },
    mounted(){
    	//设置页面的title
		document.title = this.$route.query.name;
		console.log(this.$route.query.id)
//		console.log(this.$route.params.name)
	},
	methods: {
    	toDetail(i){
    		this.$router.push({
	            path:'/videoDetail',
	            query: {
	              id: i
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
    .list_box{
      width: 3.4rem;
      margin-bottom: 0.4rem;
    }
    .img_box{
      width: 100%;
      height: 2.2rem;
    }
</style>
