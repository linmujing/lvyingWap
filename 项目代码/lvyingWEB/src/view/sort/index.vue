<template>
    <div >
    
    	<router-view></router-view>
      <Message></Message>
    </div>
</template>
<script>
  import Message from '../../components/Message.vue'
export default {
  components : {
    Message
  },
    data() {
        return {
		   
        }
        
    },
	methods: {
    	
    }
}
</script>
