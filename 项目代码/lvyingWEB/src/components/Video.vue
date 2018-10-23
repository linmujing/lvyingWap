<template>
  <div>
    <video id="myvideo" :src="videoSrc" :poster="imgSrc" :autoplay="playStatus" controls="controls" height="260" width="100%">
      您的浏览器不支持 video 标签。
    </video>
  </div>
</template>

<script>
export default {

	props:['videoSrc', 'imgSrc'],

  data () {
    return {
      playStatus: false
    }
  },
  mounted(){

  },
  methods: {


  }
}
</script>
