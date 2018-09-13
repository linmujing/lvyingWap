<template>
  <div id="app">
    
    <router-view/>
    
  </div>
</template>


<script>


export default {
  name: 'App'
}
</script>

<style>
#app {
  font-size: 0.26rem;
  color: #333;
}
.van-radio .van-icon-checked{
  color:#00aa88;
}
.van-checkbox__icon--checked .van-icon {
    border-color: #00aa88;
    background-color: #00aa88;
}
.van-button--primary {
    background-color: #00aa88;
    border: 1px solid #00aa88;
}
</style>
