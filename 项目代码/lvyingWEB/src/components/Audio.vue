<template>
  <div>
    <div style="position: relative">
      <img :src="imgSrc" class="all_width" height="260"/>
      <div class="audio_box">
        <audio id="audio" :src="audioSrc" controls="controls" class="audio">
          您的浏览器不支持 audio 标签。
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {

	props:['audioSrc', 'imgSrc'],

  data () {
    return {

    }
  },
  mounted(){

  },
  methods: {
	  // 播放
    onPlayer: function(){

      var audio = document.querySelector('#audio');
      audio.play()

    },
    // 暂停
    onPlayer: function(){

      var audio = document.querySelector('#audio');
      audio.pause()

    },

  }
}
</script>
<style>
  .audio_box{
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .audio{
    width: 7.5rem;
    background: #333333;
  }
</style>
