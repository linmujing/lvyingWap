<template>

    <div class="loginBox font_28" style="padding:2rem 0" >
        <div class="login">
            <div class="title">绑定手机号</div>
            <span class="close" @click="closeBind">×</span>
            <van-cell-group>
                <van-field
                    v-model="username"
                    required
                    clearable
                    label="手机号"
                    placeholder="请输入用户名"
                />

                <van-field
                    v-model="password"
                    type="password"
                    clearable
                    label="密码"
                    placeholder="请输入密码"
                    required
                />

            </van-cell-group>
            <div style="padding-top:1rem;text-align:center;">
                <van-button type="primary" style="width:2rem;height:0.8rem;" @click="loginFn">确定</van-button>
            </div>
        
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
            password:'12345678'
        }
        
    },
    methods: {

        login(){
            // 判断手机号是否已被注册
            this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone': username }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 500){

                    this.$Message.error('该帐号还没有注册!');
                    return;

                }else if (res.data.code == 200){

                    if(isPassWord){

                        this.loginFn(this.formRight.name, this.formRight.pwd, '');

                    }else{

                        this.loginFn(this.formRightCode.phone, '', this.formRightCode.code);

                    }
                }

            })
            .catch((error) => {

                console.log('发生错误！', error);

            });

        },

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

        // 关闭绑定框
        closeBind(){
            this.$store.commit('personCenter/FirstInto', 1)
        }

    }
}
</script>

<style>
 
</style>
<style lang="less" scoped>

    @import '../../style/common.less';

    .loginBox{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.5);

        .login{
            position: fixed;
            height: 6rem;
            width:80%;
            background:#fff;
            padding: 0.1rem;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin: auto;
            border-radius: 4px;

            .title{
                height: 1rem;
                line-height: 1rem;
                text-align: center;
            }
            .close{
                position: fixed;
                font-size: 1rem;
                bottom:10%;
                left: 0;
                width:100%;
                text-align: center;
                color:#fff;
            }
        }
    }


</style>