<template>
    <div>
    	
    	<div>
			<img src="../../../static/images/img/class.png" class="all_width" />
		</div>
    	
    	<div class="padding_10">
			<p class="title">第一张&nbsp;&nbsp;入职管理</p>
			<div v-for="(item,index) in 4" :key="index">
				<div class="margin_top_10 padding_10 body_bg juc_center_between">
    				<div class="color_666 flex">
    					<div class="width_20px">{{index + 1}}</div>
    					<div class="font_12 van-ellipsis">入职申请管理{{index + 1}}</div>
    				</div>
    				<div class="align_center">
    					<span class="color_999 font_12 margin_right_10">00:20:22</span>
    					<div v-if="index === 0" class="width_70px">
    						<button class="btn_warning">试听</button>
    					</div>
              <div v-else class="width_70px">
                <button class="btn_title van-ellipsis line_height_20">立即购买</button>
              </div>
    				</div>
    			</div>
			</div>
		</div>
		
    </div>
</template>
<script>
export default {
    data() {
        return {
        	
        }
        
    },
    mounted(){
		
	},
	methods: {
		
    	
    }
}
</script>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import '../shopMall/shopMall.less';

	.width_20px{width: 0.4rem;}
	.width_70px{width: 1.4rem;}
	.margin_right_10{margin-right: 0.2rem;}
</style>
