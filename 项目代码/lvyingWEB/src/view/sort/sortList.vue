<template>
    <div >
    	
    	<div style="margin-bottom: 60px">
	    	<van-tabs color="#00AA88"  v-model="active" sticky>
			  	<van-tab v-for="(item,index) in tabTitle" :key="index" :title="item.name">
				  	
				  	<div class="padding_10 juc_wrap_between">
				  		<div v-for="(val,i) in item.lists" :key="i" class="width_45">
				  			{{val.title}}
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
	    					img: '../../../static/images/img/banner.png',
		    				title: '审核同业禁止协议',
		    				info: '法院大讲堂',
		    				people: 12345,
		    				price: 500.00
	    				},
	    				{
	    					img: '../../../static/images/img/banner.png',
		    				title: '审核同业禁止协议',
		    				info: '法院大讲堂',
		    				people: 12345,
		    				price: 500.00
	    				},
	    				{
	    					img: '../../../static/images/img/banner.png',
		    				title: '审核同业禁止协议',
		    				info: '法院大讲堂',
		    				people: 12345,
		    				price: 500.00
	    				},
	    				{
	    					img: '../../../static/images/img/banner.png',
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
	    					img: '../../../static/images/img/banner.png',
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
	    					img: '../../../static/images/img/banner.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '法院大讲堂',
		    				people: 12,
		    				price: 200.00
	    				},
	    				{
	    					img: '../../../static/images/img/banner.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '法院大讲堂',
		    				people: 12,
		    				price: 200.00
	    				},
	    				{
	    					img: '../../../static/images/img/banner.png',
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
    	
    }
}
</script>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import '../shopMall/shopMall.less'; 
    
</style>