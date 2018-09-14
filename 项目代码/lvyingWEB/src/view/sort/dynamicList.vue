<template>
    <div >
    	
    	<div>
	    	<van-tabs color="#00AA88"  v-model="active" sticky>
			  	<van-tab v-for="(item,index) in tabTitle" :key="index" :title="item.name">

            <div v-for="(val,i) in item.lists" :key="i" class="margin_10">
              <van-row>
                <van-col span="10">
                  <div class="img_box">
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
	    					img: '../../../static/images/img/class.png',
		    				title: '审核同业禁止协议',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12345,
		    				price: '500.00'
	    				},
	    				{
	    					img: '../../../static/images/img/class.png',
		    				title: '审核同业禁止协议',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12345,
		    				price: '500.00'
	    				},
	    				{
	    					img: '../../../static/images/img/class.png',
		    				title: '审核同业禁止协议',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12345,
		    				price: '500.00'
	    				},
	    				{
	    					img: '../../../static/images/img/class.png',
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
	    					img: '../../../static/images/img/class.png',
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
	    					img: '../../../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12,
		    				price: '200.00'
	    				},
	    				{
	    					img: '../../../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12,
		    				price: '200.00'
	    				},
	    				{
	    					img: '../../../static/images/img/class.png',
		    				title: '审核同业禁止协议qqq',
		    				info: '知识产权许可使用合同起草知识产权许可使用合同起草',
		    				people: 12,
		    				price: '200.00'
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

    .img_box{
      width: 100%;
      height: 2.4rem;
    }
</style>
