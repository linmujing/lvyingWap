<template>
    <div class="body_bg">
    	
    	<div>
			  <img src="../../../static/images/img/class.png" class="all_width" />
		  </div>
      <div class="bg_fff padding_10 title">法律动态管控三级视频</div>
    	
    	<div class="bg_fff margin_top_20">
        <div class="padding_10 van-hairline--bottom">
          <div class="title border">1.法律动态管控三级视频</div>
        </div>
        <div>
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(item,index) in data" :key="index" :title="(index+1)+'. '+item.title" :name="index">

              <div v-for="(val,i) in item.arr" :key="i">
                <div class="body_bg padding_10 margin_bottom_10 juc_center_between">
                  <div class="flex">
                    <div class="margin_right_10">{{(index+1)}}.{{(i+1)}} </div>
                    <div>{{val.title}}</div>
                  </div>
                  <button class="btn_warning van-ellipsis">开始播放</button>
                </div>
              </div>

            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
		
    </div>
</template>
<script>
export default {
    data() {
        return {
          activeName: '1',
          data: [
            {
              title: '签订前',
              arr: [
                {
                  title: '概述1'
                },
                {
                  title: '概述2'
                }
              ]
            },
            {
              title: '签订后',
              arr: [
                {
                  title: '合同'
                },
                {
                  title: '合同2'
                }
              ]
            }
          ]
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
  .border{border-left: 0.05rem solid #00AA88;padding-left: 0.2rem}
</style>
