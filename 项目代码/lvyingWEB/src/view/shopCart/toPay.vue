<template>

    <div class="body_bg">

    </div>

</template>
<script>


export default {

    data() {
        return {


 
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

        /*订单提交*/   
        submitOrderClick(){   

                this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

                var pageUrl = window.location.href
                .replace(/[/]/g, "%2f")
                .replace(/[:]/g, "%3a")
                .replace(/[#]/g, "%23")
                .replace(/[&]/g, "%26")
                .replace(/[=]/g, "%3d");

                var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.$store.state.userData.appId
                +"&redirect_uri="+pageUrl+"&response_type=code&scope=snsapi_base&state=park#wechat_redirect" ;

                window.location.href = url;
            
        }, 
        // 微信支付
        wxPayRequest(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let param = this.$Qs.stringify({ 
                'orderCode': window.sessionStorage.getItem("orderCode") , 
                'ciCode': this.$store.state.userData.cicode , 
                'truePayMoney':  window.sessionStorage.getItem("listTotal") , 
                'code': this.GetQueryString('code')
                }) ;
           
            this.$api.JSAPIPay( param )

            .then( (res) => {

                console.log(res)
                let data = res.data.content;

                if(res.data.code == 200){
                    
                    function onBridgeReady(){

                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId":this.$store.state.userData.appId,     //公众号名称，由商户传入     
                                "timeStamp": data.timestamp,         //时间戳，自1970年以来的秒数     
                                "nonceStr": data.nonce_str, //随机串     
                                "package": 'prepay_id='+ data.prepay_id,     
                                "signType":"MD5",         //微信签名方式：     
                                "paySign": data.sign //微信签名 
                            },
                            function(res){     
                                if(res.err_msg == "get_brand_wcpay_request:ok" ) {

                                    window.sessionStorage.removeItem("orderCode")
                                    window.sessionStorage.removeItem("listTotal")

                                    this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
                                    // 支付成功后定时查询订单状态
                                    setInterval(this.getOrderState, 3000);

                                }else{
                                    alert(res.err_msg)
                                }     
                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                            }
                        )

                        this.$toast.clear();
                    } 
                    console.log("调起支付")
                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    }else{
                        onBridgeReady();
                    }

                }else{

                    this.$toast(res.data.message);

                }

            })



        },

        // 查询订单状态
        getOrderState(){

            this.$api.getOrderInfo( this.$Qs.stringify({ 'orderCode': this.$route.params.orderCode })  )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    if(res.data.content.orderStatus != '0'){

                        this.$toast.clear();
                        
                        // 订单类型状态更改
                        this.$store.commit('personCenter/setOrderType', parseFloat(res.data.content.orderStatus) + 1);

                        this.$router.push({ path: '/myOrder'})

                    }

                }else{

                    this.$Message.warning(res.data.message);

                }

            })

        },

    },
    mounted(){

        if(this.GetQueryString('code')){
            // 去结算页面
            this.wxPayRequest();
        }else{
            // 获取code
            this.submitOrderClick()
        }
        
    }
    
}
</script>

<style>


</style>
<style lang="less" scoped>

    @import '../../style/common.less';

 
</style>