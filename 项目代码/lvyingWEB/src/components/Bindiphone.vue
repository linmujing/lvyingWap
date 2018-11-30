<template>

    <div class="loginBox font_28" :style="{top: bindStateModel ? '0' : '-100%'}" >
        <div class="login" :style="{ 'height': passwordShow ? '7rem' : '4.8rem'}">

            <div class="title">绑定手机号</div>

            <van-cell-group>
                <van-field
                    v-model="userPhone"
                    required
                    clearable
                    label="手机号"
                    placeholder="请输入用户名"
                />
                <van-field
                    v-model="password"
                    center
                    clearable
                    required
                    label="密码"
                    placeholder="请输入密码"
                    v-if="passwordShow"
                />
                <van-field
                    v-model="password"
                    center
                    clearable
                    required
                    label="确认密码"
                    placeholder="请再次输入密码"
                    v-if="passwordShow"
                />
                <van-field
                    v-model="sms"
                    center
                    clearable
                    required
                    label="短信验证码"
                    placeholder="请输入验证码"
                >
                    <van-button slot="button" size="small" :type=" isSend ? '' : 'primary'" :disabled="isSend"  @click="sendSms"> {{isSendText}} </van-button>
                </van-field>
            </van-cell-group>
            <div style="color:red;font-size:0.2rem;line-height:0.3rem;padding:0.2rem;" v-if="passwordShow"> 您还没有用该手机号注册，请设置登录密码，用手机号和密码可在电脑上登录</div>

            <div style="text-align:center;padding-top:0.5rem;" >
                <van-button type="primary" round style="width:1.4rem;height:0.6rem;line-height:0.5rem;border-radius:0.3rem;" @click="bingPhone"  >确定</van-button>
            </div>
        
        </div>
        <span class="close" @click="closeBind">×</span>
    </div>

</template>
<script>

export default {
    components : {

    },
    data() {
        return {
            userPhone:'',
            password: '',
            password2: '',
            sms:'',

            // 是否已注册 假如未注册，则需要输入密码，反之
            passwordShow: true,

            // 弹框状态 false 关闭 true 打开
            bindStateModel: false,
            
            //验证码按钮
            isSend: false,
            isSendText: '获取验证码'
        }
        
    },
    mounted(){
        this.bindStateModel =  this.$store.state.personCenter.bindState == 1  ? false : true ;
    },
    methods: {
        // 发送短信
        bingPhone(){

            let reg1 = new RegExp(/^1(3|4|5|7|8)\d{9}$/);

            // 正则验证手机号
            if( !reg1.test(this.userPhone) ){

                this.$toast('请填写正确的手机号!');
                return;

            }
            

            if( this.sms == '' ){

                this.$toast('请输入验证码!');
                return;

            }

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let params = { 'ciPhone': this.userPhone, 'smsCode':this.sms , 'unionId': this.$store.state.userData.unionId } ;

            // 假如需要输入密码，则需要做个密码验证
            if(this.passwordShow){

                if( this.password != this.password2 ){

                    this.$toast('请输入正确的密码!');
                    return;

                }

                if( this.password == '' ){

                    this.$toast('请输入密码!');
                    return;

                }

                params.passWord = this.password
            }

            // 判断手机号是否已被注册
            this.$api.bindingCustomerInfo( this.$Qs.stringify(params) )

            .then( (res) => {

                console.log(res)
                this.$toast.clear()

                if(res.data.code == 200){

                    this.$toast('绑定成功!');

                    this.$store.commit('personCenter/BindState', 1);
                    
                    return;

                }

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });
        },
        // 发送验证码
        sendSms(){

            let reg = new RegExp(/^1(3|4|5|7|8)\d{9}$/);

            // 正则验证手机号
            if( !reg.test(this.userPhone) ){

                this.$toast('请填写正确的手机号!');
                return;

            }

            // 判断手机号是否已被注册
            this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone': this.userPhone }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 500){

                  this.passwordShow = true;

                }else if (res.data.code == 200){

                    this.passwordShow = false;
                  
                }

            })
                    
            this.$api.sendSms( this.$Qs.stringify({ 'phoneNo': this.userPhone, 'type': '1' }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.$toast('发送成功!');

                    this.sendTimeOut();

                }

            })
        },
        // 发送短信计时器
        sendTimeOut(){

            let timer = 60;

            let t = null;

            this.isSend = true;

            t = setInterval(()=>{

                if(timer > 0){

                    timer-- ;
                    this.isSendText = timer + 'S';
                
                }else{

                    this.isSendText = '重新获取';
                    this.isSend = false;
                    clearInterval(t);
                    return ;

                }

            },1000) 

        },

        // 关闭绑定框
        closeBind(){
            this.$store.commit('personCenter/BindState', 1)
        }

    },		
    computed: {
        // 关闭绑定框
        getBindState() {
            return this.$store.state.personCenter.bindState ;
        },
    },
    watch: {
        // 监听弹框变化
        getBindState:function (val){
            this.bindStateModel =  val == 1  ? false : true ;
        },
    }
}
</script>

<style>
 
</style>
<style lang="less" scoped>

    @import '../style/common.less';

    .loginBox{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.5);
        transition: 0.5s;

        .login{
            position: absolute;
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
        }
        .close{
            position: absolute;
            font-size: 1rem;
            bottom:10%;
            left: 0;
            width:100%;
            text-align: center;
            color:#fff;
        }
    }


</style>