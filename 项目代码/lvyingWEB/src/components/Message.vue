<template>
	<div class="failState">
	</div>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		methods:{

		},
		mounted(){

        },
		computed: {
			// 加入购物车成功
			addCartSuccess() {

				return this.$store.state.cart.successState  ;

            },
            // 加入购物车失败
			addCartFail() {

				return this.$store.state.cart.failState ;

			}
		},
		watch: {
			// 加入购物车成功
			addCartSuccess:function (val){

                this.$toast.success('添加成功！');

            },
            // 加入购物车失败
			addCartFail:function (val){

                this.$toast.fail('已添加！');
                
            }
		}
	}
</script>