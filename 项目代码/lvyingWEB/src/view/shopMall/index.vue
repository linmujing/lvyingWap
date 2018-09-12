<template>
    <div>
    	
    	<router-view></router-view>
	    
    	<FooterBar></FooterBar>
		
    </div>
</template>
<script>
import FooterBar from '../../components/FooterBar.vue'
export default {
    components : {
        FooterBar
    },
    data() {
        return {
        	
        }
        
    },
    methods: {
    	
    }
}
</script>
