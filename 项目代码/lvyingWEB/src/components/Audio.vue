<template>
    <!-- 音频播放器 -->
    <div class="container">
        <div class="audio_box">
            <div class="audio_img">
              <img :src="imgUrl">
            </div>
            <div style="padding-right:0.3rem;">
              <van-slider v-model="audioControl.timeProgress" @change="getTimeChange" />
            </div>
            <div class="aduio_control flex">
              <div class="item1">
                <!-- 开关 -->
                <span class="audio_control_icon"
                    @click="pausePlay"
                    v-show="!audioControl.audioOff">
                    <span class="vjs-icon-pause"></span>
                </span>
                <span class="audio_control_icon"
                    @click="startPlay"
                    v-show="audioControl.audioOff">
                    <span class="vjs-icon-play"></span>
                </span>
              </div>
              <div class="item4">
                <span style="color:#fff;">{{audioControl.timeDivider}}</span> / {{audioControl.timeDuration}}
              </div>
              <div class="item1">
                <span class="audio_control_icon" @click="audioControl.volume == 0 ?  audioControl.volume = 50 : audioControl.volume = 0">
                    <span class="vjs-icon-volume-mute"  v-show="audioControl.volume == 0"></span>
                    <span class="vjs-icon-volume-high"  v-show="audioControl.volume != 0"></span>
                </span>
              </div>
              <div class="item1">
                <div class="slider_box">
                    <van-slider v-model="audioControl.volume" @change="getVolumeChange" />
                </div>

              </div>
            </div>

            <div style="display:none;">
                <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
                <audio ref="audio" class="dn"
                    :src="url"
                    :preload="audio.preload"
                    @play="onPlay"
                    @error="onError"
                    @waiting="onWaiting"
                    @pause="onPause"
                    @timeupdate="onTimeupdate"
                    @loadedmetadata="onLoadedmetadata"
                >
                  数据源格式错误！
                </audio>

            </div>
        </div>
    </div>

</template>

<script>

export default {
  props:{
    audioParams: {
      type: Object
    },
    imgUrl: {
      type: String
    }
  },
    data() {
        return {

        //   url: this.theUrl || 'https://wdd.js.org/element-audio/static/falling-star.mp3',
        //   url: require('../assets/music/a1.wav'),http://lvyingjiaoyu-prod.oss-cn-zhangjiakou.aliyuncs.com/ticymce/audio/2018/11/7/7cf35b610388dcc623e4330e63844ea5.mp3
          url:'',
          audio: {
            preload: 'auto'
          },

          // 音频控制器参数
          audioControl: {
              // 控制器开关
              isShow: false,
              // 时间进度
              timeProgress: 0,
              // 总时间秒数
              timesecond: 0,
              // 当前播放时间
              timeDivider: '00:00',
              // 总时间
              timeDuration: '00:00',
              // 音量
              volume: 50,
              // 音频开关
              audioOff: true,
              // 全屏
              fullScreen: false,
              // 记录当前播放音频的位置
              audioIndex1: 0,
              audioIndex2: 0,

          },
          // 标题
          audioTitle: '',
          showList: false,

        };
    },

    methods: {

        /** 音频函数 **/
        // 当音频暂停
        onPause (res) {
          // console.log(res)
        },
        // 当发生错误, 就出现loading状态
        onError () {
          // this.$toast('数据源格式错误！');
          this.audio.waiting = true
        },
        // 当音频开始等待
        onWaiting (res) {

            // console.log(res)

        },
        // 当音频开始播放
        onPlay (res) {

            // console.log(res)

        },
        // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
        onTimeupdate(res) {

            // console.log(this.audioParams.voiceUrl)
            // console.log(res.target.currentSrc)

            // 获取时间进度
            this.audioControl.timeProgress = (res.target.currentTime / res.target.duration).toFixed(2) * 100  ;

            // 获取当前时间
            this.audioControl.timeDivider = this.changeTimeBox(res.target.currentTime);

            // 监听试听时间
            // var timer = this.audioParams.voiceTime
            // if(timer !== '' && this.audioParams.voiceStatus == 1){
            //     timer = parseFloat(this.audioParams.voiceTime) * 60  // 试看时间，以秒为单位
            //     if(this.changeTimeBox(res.target.currentTime) > this.changeTimeBox(timer)){
            //     this.$refs.audio.currentTime = 0   // 设置当前时间 清零
            //     this.pausePlay()    // 暂停播放
            //     this.$toast('请您购买后再继续收听！');
            //     return false;
            //     }
            // }

        },
        // 当加载语音流元数据完成后，会触发该事件的回调函数
        // 语音元数据主要是语音的长度之类的数据
        onLoadedmetadata(res) {

            // console.log('loadedmetadata')
            // console.log(res)

            // 获取总时长
            this.audioControl.timesecond = parseInt(res.target.duration) ;
            this.audioControl.timeDuration = this.changeTimeBox(res.target.duration);


        },

        /** 音频控制器函数 **/
        // 开始播放
        startPlay() {

          if(!this.url){
            this.$toast("当前没有播放源！")
          }

          this.player.play()
          this.audioControl.audioOff = false

        },

        // 暂停
        pausePlay() {

            if(!this.url){
              this.$toast("当前没有播放源！")
            }

            this.player.pause()
            this.audioControl.audioOff = true

        },
        // 上一曲
        previousClick(){

        },
        // 下一曲
        nextClick(){

        },
        // 时间进度
        getTimeChange(e){

            // 暂停
            this.pausePlay();

            this.audioControl.timeProgress = e;

            let current =  parseInt(e / 100  * this.audioControl.timesecond);

            this.$refs.audio.currentTime = current;

            setTimeout( ()=>{ this.startPlay(); }, 1000) ;

        },
        // 音量改变
        getVolumeChange(index) {

            this.$refs.audio.volume = index / 100

            this.volume = index

        },

        /**获取音频数据 */
        getAudioParam(){

           this.$toast.loading({ mask: true, message: '加载中...' , duration: 1000});

            let Obj = this.$store.state.personCenter.audioIndex ;
            console.log(Obj.sectionName)

            this.url = Obj.voiceUrl ;
            this.audioTitle = Obj.sectionName ;

            this.pausePlay();
            this.$refs.audio.currentTime = 0;

            setTimeout( ()=>{ this.startPlay(); }, 1000) ;

        },

        /** 辅助函数 **/
        // 秒转化器
        //@param timer 大列表下标
        changeTimeBox(timer){

            function p(s){ return s < 10 ? '0' + s : s } ;
            function ps(s){ return s == 0 ? '' : s + ':'} ;

            var h = timer > 3600 ? parseInt(timer/3600) : 0;

            var m = (timer- h*3600) > 60 ? parseInt((timer- h*3600)/60) : 0;

            var s = parseInt(timer - h*3600 - m*60);

            var now =  ps(h) + p(m) + ":" + p(s);

            return now;

        }

    },
    computed: {
        // 监听音频开关
        player() {
            return this.$refs.audio;
        },
        // 监听音频下标修改
        listenVideo() {  return this.$store.state.personCenter.audioIndex  }
    },
    watch: {
        // 监听音频下标修改
        listenVideo:function (val){ this.getAudioParam()  }
    },
    mounted(){


    },
};
</script>
<style  >
    .vjs-custom-skin > .audio-js .vjs-control-bar{
        color: #ccc;
        border-top: 2px solid #585858;
        display: none;
    }
    .van-slider__bar{
      background:#00AA88;
    }
    .van-slider__button{
      height: 6px;
      width: 14px;
      border-radius: 3px;
    }

</style>
<style scoped lang='less'>

    @import '../style/common.less';

    .audio_box{

      .audio_img{
        background: #ccc;
        width: 100%;
        height: 3rem;
        border:1px solid #ccc;
        img{
          width: 90%;
          height:100%;
        }
      }

      .aduio_control{
        height: 0.8rem;
        line-height: 0.8rem;
        color:#706F6F;
        font-size: 0.2rem;
        background:#333;
        text-align: center;

        .item1{
          width: 1rem;
        }
        .item2{
          width: 2rem;
        }
        .item4{
          width: 4rem;
          text-align: left;
        }
      }
    }

    .audio_control_icon{
        cursor: pointer;
        font-size: 0.4rem;
        color:#ccc;

    }
    .slider_box{
      position: relative;
      top:0.4rem;
    }

</style>
