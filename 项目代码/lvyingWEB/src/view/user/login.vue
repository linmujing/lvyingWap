<template>

    <div class="font_28" style="padding:2rem 0" >
      
        <van-cell-group>
        <van-field
            v-model="username"
            required
            clearable
            label="用户名"
            icon="question"
            placeholder="请输入用户名"
            @click-icon="$toast('question')"
        />

        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        </van-cell-group>
        <div style="padding-top:2rem;text-align:center;">
            <van-button type="primary" style="width:2rem;" @click="loginFn">登录</van-button>
        </div>
    </div>

</template>
<script>

export default {
    components : {

    },
    data() {
        return {
            username:'15874025525',
            password:'123456'
        }
        
    },
    methods: {

       // 登录
        //@param ciPhone 电话号码
        //@param passWord 密码
        //@param smsCode 手机验证码
        loginFn(){


            if(this.username == ""){

                this.$toast('电话号码不能为空!');
                return;

            }

            if(this.password == ""){

               this.$toast('密码不能为空!');
                return;

            }

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let param = this.$Qs.stringify({ 'ciPhone': this.username, 'passWord': this.password })  ;

            this.$api.login( param )

            .then( (res) => {

                console.log(res)

                this.$toast.clear();

                if(res.data.code == 200){

                    this.$toast(res.data.message);

                    // 存储用户信息
                    this.$store.commit('userData/saveUserData', res.data.content);

                    // console.log(this.$store.state.userData.UserData)
                    // this.$router.push({ name: '', params: {id: id}})

                    //跳转函数*************************************************
                    this.$router.push({ name: 'shopMallIdex'})

                }else{

                    this.$toast(res.data.message);

                }

            })
            .catch((error) => {

                console.log('发生错误！', error);

            });
        },

    }
}
</script>

<style>
 
</style>
<style lang="less" scoped>

    @import '../../style/common.less';




</style>