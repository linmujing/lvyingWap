<template>
    <!-- 微信授权页面 -->
  <div>
    授权中...
  </div>
</template>
 
<script>
  
    export default {
    data() {
        return {

            token: '',

        };
    },
    mounted(){

    },
    created() {


        this.$toast.loading({ mask: true, message: '获取微信授权中...' , duration: 0});

        this.token = window.localStorage.getItem("userToken1");

        //判断当前的url有没有token参数,如果不存在那就跳转到微信授权的url
        if(this.token){

            // 直接进入
            this.$router.push({ name: 'shopMallIdex'})

        }else{
            
            // 判断是否为已经获取授权
         
            if(this.GetQueryString('code')){

                this.wxLogin();

            }else{

                var pageUrl = window.location.href
                .replace(/[/]/g, "%2f")
                .replace(/[:]/g, "%3a")
                .replace(/[#]/g, "%23")
                .replace(/[&]/g, "%26")
                .replace(/[=]/g, "%3d");

                var url =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd07de149859354b8&redirect_uri=" +
                pageUrl + //这里放当前页面的地址 snsapi_userinfo
                "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";

                window.location.href = url;
            }

        }

    },
    methods: {
        // 获取地址栏参数
        GetQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)
            return unescape(r[2]);
            return null;
        },

        // 微信登录
        wxLogin(){

            let param = {code: this.GetQueryString('code')}

            this.$api.oaUserInfo( this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)
                this.$toast.clear();

                if(res.data.code == 200){

                    this.$toast(res.data.message);

                    // 存储用户信息
                    this.$store.commit('userData/saveUserData', res.data.content);

                    if(res.data.content.ciPhone != null){
                        this.$store.commit('personCenter/BindState', 1)
                    }

                    //跳转函数*************************************************
                    this.$router.push({ name: 'shopMallIdex'})

                }else{

                    this.$toast(res.data.message);

                }  

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });

        }

    },

    }
</script>
