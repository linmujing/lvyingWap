<template>
  <div id="container_id" ref="container_id" class="container" >

    <!-- 视频容器  -->
    <div class="player">
      <video-player class="video-player vjs-custom-skin"
                    id="videoPlayer"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @ready="playerReadied"
                    @statechanged="playerStateChanged($event)"
                    @error="onError($event)"

      >
        数据源格式错误！
      </video-player>
    </div>

  </div>
</template>

<script>

import { videoPlayer } from "vue-video-player";

export default {
    props:['imgUrl'],
    data() {
        return {

            // 视频参数
            playerOptions: {
                //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                // 视频资源 {type: '' , src: 'http://www.w3cschool.cc/try/demo_source/mov_bbb.mp4'}
                sources: [{type: 'video/mp4' , src: 'http://www.w3cschool.cc/try/demo_source/mov_bbb.mp4'}],
                poster: '', //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: "此视频暂无法播放，请稍后再试" ,//允许覆盖Video.js无法播放媒体源时显示的默认信息。

                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },

            // 初次加载防止播放
            curIndex: 0,
        };
    },
    components: {
        videoPlayer
    },
    methods: {


        // 视频播放 *
        onPlayerPlay(player) {

            // 没有播放源提示
            if( this.playerOptions.sources.length == 0 ){

                this.$Message.warning('对不起，当前没有播放源！');

                return false;

            }

            this.player.play();

        },
        // 视频暂停 *
        onPlayerPause(player) {

          this.player.pause();

        },
        // 播放前获取总时间 *
        onPlayerLoadeddata(player) {

            // console.log('player Loadeddata!', player)

        },
        // 同步获取视频时间参数 *
        onPlayerTimeupdate(player) {

         
        },
        // 初始设置 *
        playerReadied(player) {
           
        },

        // 播放错误
        onError(e){
          // this.$Message.warning('对不起，当前没有播放源');
        },
        onPlayerEnded(player) {
            // console.log('player ended!', player)
        },
        // 等待中
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
            //console.log(player)
        },
        // 播放中
        onPlayerPlaying(player) {
            // console.log('player Playing!', player)
            //console.log(player)
        },
        onPlayerCanplay(player) {
            // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
            // console.log('player Canplaythrough!', player)

        },
        //  or listen state event
        playerStateChanged(player) {
        //change

        },

        // 获取视频固定参数
        getVideoParam(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 1000});

            let Obj = this.$store.state.personCenter.videoIndex ;
            console.log(Obj)
            
            let obj = {                   
                'type': "video/mp4",
                'src': Obj.videoUrl
            };

            this.playerOptions.sources = [];
            this.playerOptions.sources.push(obj);

            this.onPlayerPause();
            
            // 防止初次加载播放
            if(this.$store.state.personCenter.videoState == 0 ){ return }
            setTimeout( ()=>{ this.onPlayerPlay(); }, 1000) ;

        },

    },
    computed: {
        // 监听视频开关
        player() {
            return this.$refs.videoPlayer.player;
        },
        // 监听视频播放源变化
        listenVideo() {  return this.$store.state.personCenter.videoIndex  }
    },
    watch: {
        // 监听视频播放源变化
        listenVideo:function (val){ this.getVideoParam();  }
    },
    mounted(){


    },
};
</script>
<style  >
    .vjs-custom-skin > .video-js .vjs-control-bar{
        color: #ccc;
        border-top: 2px solid #585858;
    }
    .vjs-custom-skin > .video-js .vjs-big-play-button {
        font-size: 2em;
        line-height: 1.9em !important;
    }
    .video-js .vjs-big-play-button{
    /*
    播放按钮换成圆形
    */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
    outline: none;
    }
</style>
<style scoped lang='less'>
  .container{

  }
</style>

