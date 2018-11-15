<template>

    <div class="body_bg">

        <div class="video_position">
            <Video></Video>
        </div>

        <div class="audio_position">
            <Audio></Audio>
        </div>

        <div class="btn_position">
             <!-- 视频实例 -->
            <van-button size="small"  v-for="(item,index) in videoSource" :key="index"  @click="pushVideo(item)">视频播放源</van-button>
            <!-- 音频实例 -->
            <van-button size="small"  v-for="(items) in audioSource" :key="items.voiceUrl" @click="pushAudio(items)">音频播放源</van-button>
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


            // 视频资源
            videoSource: [
                {'type': 'video/mp4' , 'videoUrl': 'http://www.w3cschool.cc/try/demo_source/mov_bbb.mp4'},
                {'type': 'video/mp4' , 'videoUrl': 'http://www.w3cschool.cc/try/demo_source/mov_bbb.mp4'}
            ],

            // 音频资源
            audioSource:[
                { 'voiceUrl': 'https://wdd.js.org/element-audio/static/falling-star.mp3' },
                { 'voiceUrl': 'http://lvyingjiaoyu-prod.oss-cn-zhangjiakou.aliyuncs.com/ticymce/audio/2018/11/7/7cf35b610388dcc623e4330e63844ea5.mp3' }
            ]

        }
        
    },
    methods: {

        /*个人中心导航栏切换*/
        changeNav(index){

            this.personNavData.navIndex = index;

            // 跳转
            let Url = this.personNavData[index].url;

            //this.$router.push({ path: Url, query: {id: '11'}})
            this.$router.push({ name: Url, params: {id: '11'}})

        },

        // 压入视频
        // @params {}  obj 视频资源对象
        pushVideo(obj){

          // 视频播放源修改
          this.$store.commit('personCenter/setVideoIndex', obj);
          this.$store.commit('personCenter/setVideoState', 1)

        },
  
          // 压入视频
        // @params {}  obj 视频资源对象
        pushAudio(obj){

          // 视频播放源修改
          this.$store.commit('personCenter/setAudioIndex', obj);

        }
   

    },

}
</script>

<style lang="less" scoped>

    .video_position,.audio_position,.btn_position{
        position: fixed;
        top:0;
        left:0;
        width:100%;
    }
    .audio_position{
        top:50%; 
    }
    .btn_position{
        top:90%; 
    }
</style>