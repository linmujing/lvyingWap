<template>
    <div>

    	<div class="video_position">
        <!--<img src="../../../static/images/img/class.png" class="all_width" />-->
        <div v-if="typeId == 3">
          <Video ref="myVideo" :imgUrl="dataDetail.productProfileUrl"></Video>
        </div>
        <div v-else-if="typeId == 4">
          <Audio ref="myAudio" :imgUrl="dataDetail.productProfileUrl"></Audio>
        </div>
      </div>

    	<div class="padding_10" style="margin-top: 3.8rem">
        <!--<p class="title">第一张&nbsp;&nbsp;入职管理</p>-->
        <div v-for="(item,index) in productSection" :key="index">
          <div class="margin_top_10 padding_10 body_bg juc_center_between">
              <div class="color_666 flex">
                <!--<div class="width_20px">{{index + 1}}</div>-->
                <div class="font_12 van-ellipsis">{{item.sectionName}}</div>
              </div>

              <div v-if="typeId == 3" class="align_center">
                <!--<span class="color_999 font_12 margin_right_10">{{item.videoTime}}</span>-->
                <div v-if="parseInt(item.videoStatus) === 0">
                  <div @click="pushVideo(item, index)">
                    <button v-if="current === index" class="btn_warning width_90px">
                      <span style="width: 0.04rem;height: 0.1rem;background: #fff;display: inline-block;"></span>
                      <span style="width: 0.04rem;height: 0.2rem;background: #fff;display: inline-block;"></span>
                      <span style="width: 0.04rem;height: 0.3rem;background: #fff;display: inline-block;"></span>
                    </button>
                    <button v-else class="btn_warning width_90px">开始播放</button>
                  </div>
                </div>
                <div v-else-if="item.videoStatus == ''"></div>
              </div>
              <div v-else-if="typeId == 4" class="align_center">
                <!--<span class="color_999 font_12 margin_right_10">{{item.videoTime}}</span>-->
                <div v-if="parseInt(item.voiceStatus) === 0">
                  <div @click="pushAudio(item, index)">
                    <button v-if="current === index" class="btn_warning width_90px">
                      <span style="width: 0.04rem;height: 0.1rem;background: #fff;display: inline-block;"></span>
                      <span style="width: 0.04rem;height: 0.2rem;background: #fff;display: inline-block;"></span>
                      <span style="width: 0.04rem;height: 0.3rem;background: #fff;display: inline-block;"></span>
                    </button>
                    <button v-else class="btn_warning width_90px">开始播放</button>
                  </div>
                </div>
                <div v-else-if="item.videoStatus == ''"></div>
              </div>

            </div>
        </div>
      </div>

    </div>
</template>
<script>
import Video from '../../components/Video.vue'
import Audio from '../../components/Audio.vue'
export default {
  components : {
    Video,
    Audio
  },
  data() {
      return {
        productCode: this.$route.query.productCode,
        typeId: this.$route.query.typeId,
        dataDetail: {},
        // 商品属性
        productProperty: '',
        // 课程数据
        productSection: [],
        proSection: '',
        videoData: {
          playStatus: false,
          videoSrc: ''
        },
        audioData: {
          audioSrc: ''
        },
        // 动态管控课程
        sectionNav: [],
        sectionList: [],
        sectionSize: 6,
        sectionCont: 0,
        sectionIndex: 0,
        classCur: 0,
        current: this.$route.query.index
      }

  },
  mounted(){
    this.getProductInfo()
	},
	methods: {
    // 查看产品详情
    getProductInfo(){
      this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
      this.$api.getProductInfo( this.$Qs.stringify({'productCode': this.productCode, 'ciCode': this.$store.state.userData.cicode}) )

        .then( (res) => {
          // console.log(res);
          if(res.data.code == 200){
            this.$toast.clear();
            var result = res.data.content
            this.dataDetail = result
            // 商品属性
            this.productProperty = result.productProperty
            // 动态管控列表
            this.sectionNav = result.productSectionIndexList
            if(result.productSectionIndexList.length > 0){
              this.sectionIndex = result.productSectionIndexList[0].sectionIndex
            }
            // 动态管控课程目录
            this.sectionList = result.productSectionList

            // 课程目录
            var productSection = eval(result.productSection)
            this.proSection = result.productSection
            this.productSection = productSection
            console.log(productSection)
            this.clickPlay(productSection)
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
    // 点击播放
    clickPlay(productSection){
      // 设置视频自动播放
      if(this.typeId == 3){
        this.pushVideo(productSection[this.current], this.current)
      }
      // 设置音频自动播放
      if(this.typeId == 4){
        this.pushAudio(productSection[this.current], this.current)
      }
    },
    // 压入视频
    // @params {}  obj 视频资源对象
    pushVideo(obj, index){
      this.current = index
      // 视频播放源修改
      this.$store.commit('personCenter/setVideoIndex', obj);
      this.$store.commit('personCenter/setVideoState', 1)

      this.$refs.myVideo.onPlayerPlay()

    },
    // 压入音频
    // @params {}  obj 视频资源对象
    pushAudio(obj, index){
      this.current = index
      // 视频播放源修改
      this.$store.commit('personCenter/setAudioIndex', obj);
      this.$refs.myAudio.startPlay()
    }

  }
}
</script>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import '../shopMall/shopMall.less';

	.width_20px{width: 0.4rem;}
	.width_70px{width: 1.4rem;}
	.width_90px{width: 1.8rem;}
	.margin_right_10{margin-right: 0.2rem;}
  .video_position,.audio_position,.btn_position{
    position: fixed;
    top:0;
    left:0;
    width:100%;
  }
</style>
