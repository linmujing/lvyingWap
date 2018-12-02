<template>

    <div class="body_bg">
        <!-- 商品列表 -->
        <div style="margin-bottom:50px;padding-bottom:0.01rem;">
            <ul class="goods_list">
                <li class="bg_fff" v-for="(items,index1) in cartDate.cartList" :key="index1" >
                    <div class="header flex space_between padding_0_20 border_bottom_1px line_height_80">
                        <div>{{items.itemTitle}}</div>
                    </div>
                    <ul class="items_list">
                        <li class="padding_left_20" v-for="(item,index2) in items.items" :key="index2">
                            <div class="content flex space_between border_bottom_1px" style="position:relative;">
                                <div class="item table_block">
                                    <span class="td_block padding_left_30">
                                        <i class="img_middle_center img_box border_1">
                                            <img  :src="item.imgSrc" alt=""  @click="$router.push({ path: '/falvDetail', query: { productCode: item.productCode }})">
                                        </i>
                                    </span>
                                    <span class="td_block padding_left_30 ">
                                        <p  class="" style="word-wrap:break-word;">
                                            <span style="position:relative;top:-0.6rem;" v-html="item.productTitle"> </span>   
                                            <span  style="position:absolute;top:1.5rem;left:2.2rem;color:red;">￥{{item.price}}</span>
                                        </p>
                                    </span>
                                </div>
                                <div class="item table_block">
                                    <p class="color_cart_ccc1" style="position:absolute;top:1.52rem;right:0.2rem">
                                    X {{item.num}}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="items_total flex flex_end padding_0_20 line_height_94 color_cart_ccc2">
                        <div >小计：￥{{items.itemTotal}}</div>
                    </div>
                </li>
            </ul> 

            <div class="items_total flex space_between padding_0_20  line_height_94 border_top_1px color_cart_ccc2 bg_fff">
                <div >减免</div>
                <div >{{ (parseFloat(cartDate.allTotal) - parseFloat(cartDate.listTotal) ).toFixed(2) }}</div>
            </div>
            <div class="items_total flex space_between padding_0_20  line_height_94 border_top_1px color_cart_ccc2 bg_fff" style="margin-bottom:0.3rem ;">
                <div >优惠券</div>
                <div class="color_00aa88" @click=" coupons.length > 0 ? showList = true : ''">{{couponName}}</div>
            </div>
            <!-- 配送方式 -->
            <div class="items_total flex space_between padding_0_20 bg_fff line_height_94 color_cart_ccc2 bg_fff" style="margin-bottom:0.3rem ;"  v-if="hasStore">
                <div >配送方式</div>
                <div >快递免邮</div>
            </div>


        </div>

        <!-- 提交订单 -->
        <div class="submit_cart padding_left_20 flex space_between bg_fff border_top_1px font_30" >
            <div>
                <span class="submit_total padding_right_20 color_cart_ccc2">
                        实付金额：<span class="color_00aa88">￥ {{cartDate.listTotal}}</span>
                </span>
            </div>
            <div >
                <span class="submit_btn bg_00aa88" @click="submitOrderClick">去支付</span>
            </div>
        </div>

        <!-- 优惠券列表 -->
        <van-popup v-model="showList" position="bottom" v-if="coupons.length > 0">
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                @change="onChange"
                @exchange="onExchange"
                :show-exchange-bar="false"
            />
        </van-popup>

    </div>

</template>
<script>


export default {

    data() {
        return {

            //  可用屏幕高度
            windowHeight: document.documentElement.clientHeight - 50,

            /* 购物车数据 */
            cartDate:{
                // 总价格
                listTotal: 0.00,
                // 固定总价
                allTotal: 0.00,
                // 大列表
                cartList:[],
            },  

            // 是否存在需要包邮
            hasStore: false ,

            // 用户信息
            userData: {
                ciCode: this.$store.state.userData.cicode,
                phone: this.$store.state.userData.ciphone,
                name: this.$store.state.userData.ciname
            },

            /*优惠券弹框*/
            showList: false,
            chosenCoupon: -1,
            coupons: [],
            couponName: '去选择',
            couponCode: 0,
 
        }
        
    },
    methods: {

        /*优惠券功能*/
        // 选择
        onChange(index) {

            this.showList = false;
            this.chosenCoupon = index;
            this.couponCode = this.coupons[index].id;

            this.getOrderCouponTotal();

        },
        onExchange(code) {
            console.log(code)
            // this.coupons.push(coupon);
        },

        /*订单数据计算*/    
        // 计算小计与合计
        calculatePrice(){

            // 获取商品个数
            let m = this.cartDate.cartList.length;

            // 计算小计
            for(let x = 0 ; x < m ; x++){

                let n = this.cartDate.cartList[x].items.length;

                // 重置小计
                this.cartDate.cartList[x].itemTotal = 0;

                for(let i = 0 ; i < n ; i++){
                    
                    let item = this.cartDate.cartList[x].items[i];

                    this.cartDate.cartList[x].itemTotal += item.num * (item.price * 10000);

                }

                this.cartDate.cartList[x].itemTotal = (this.cartDate.cartList[x].itemTotal / 10000).toFixed(2);

            }     

            this.$toast.clear()

        },         
        // 监听优惠券改变
        onCouponChange(){

            if(this.Coupon.value != '' || this.Coupon.value != '暂无可用优惠券'){

                this.getOrderCouponTotal();

            }else{

                this.Coupon.value = '暂无可用优惠券'
            }

        },
        /*订单提交*/   
        submitOrderClick(){   

            // 去结算页面
            this.wxPayRequest();
            
        }, 
        // 微信支付
        wxPayRequest(){

            let param = this.$Qs.stringify({ 
                'orderCode': this.$route.query.orderCode , 
                'ciCode': this.userData.cicode , 
                'truePayMoney': this.cartDate.listTotal, 
                'payCommet': ''
                }) ;

            this.$api.appPerPay( param )

            .then( (res) => {

                console.log(res)
                let data = res.data.content;

                if(res.data.code == 1){
                    
                    function onBridgeReady(){

                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId": data.appid,     //公众号名称，由商户传入     
                                "timeStamp": data.timestamp,         //时间戳，自1970年以来的秒数     
                                "nonceStr": data.noncestr, //随机串     
                                "package": data.package,     
                                "signType":"MD5",         //微信签名方式：     
                                "paySign": data.sign //微信签名 
                            },
                            function(res){     
                                if(res.err_msg == "get_brand_wcpay_request:ok" ) {

                                    this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
                                    // 支付成功后定时查询订单状态
                                    setInterval(this.getOrderState, 3000);

                                }else{
                                    alert(res.err_msg)
                                }     
                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                            }
                        )
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

        /**数据**/
        // 获取订单详情商品数据
        // param orderCode string 订单编号
        getOrderProduct(orderCode){  

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let param = this.$Qs.stringify({ 'pageNo': 1, 'pageSize': 20 ,'orderCode': orderCode }) ;

            this.$api.getOrderProductList( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content.list , arr = [], merchantArr = [];

                    for(let i = 0 ; i < data.length; i++){

                        let index = merchantArr.indexOf(data[i].merchantInfo.merchantNm) ;

                        console.log(index)

                        if( index == -1  ){ 

                            merchantArr.push(data[i].merchantInfo.merchantNm);

                            // 压入商户
                            arr.push({
                                id: '',
                                itemState: false,
                                itemTitle: data[i].merchantInfo.merchantNm,
                                itemCode: data[i].merchantInfo.merchantCode,
                                itemTotal: 0.00,
                                //小列表
                                items:[]
                            });

                            index = merchantArr.indexOf(data[i].merchantInfo.merchantNm);

                            // 压入商品
                            arr[index].items.push({
                                cartId: data[i].id,
                                productCode: data[i].productCode,
                                state: false,
                                price: data[i].productPrice,
                                num: data[i].productCount,
                                productTitle: data[i].productInfo.productTitle,
                                describe:data[i].productInfo.productDesc,
                                imgSrc: data[i].productInfo.productProfileUrl
                            })

                        }else{

                            // 压入商品
                            arr[index].items.push({
                                cartId: data[i].id,
                                productCode: data[i].productCode,
                                state: false,
                                price: data[i].productPrice,
                                num: data[i].productCount,
                                productTitle: data[i].productInfo.productTitle,
                                describe:data[i].productInfo.productDesc,
                                imgSrc: data[i].productInfo.productProfileUrl
                            })

                        }

                    }
                    console.log(arr)
                    // 压入到购物车
                    this.cartDate.cartList = arr;

                    // 计算小计与合计
                    this.calculatePrice();

                    // 获取订单详情 获取订单金额
                    this.getOrderDetail();

                    // 获取订单可用优惠券
                    this.getOrderCoupon();

                }else{

                    this.$toast(res.data.message);

                }

                this.$toast.clear();

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });
        },
        // 获取订单金额
        getOrderDetail(){

            this.$api.getOrderInfo( this.$Qs.stringify({'orderCode': this.$route.query.orderCode }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.cartDate.listTotal = (res.data.content.orderPayAmount).toFixed(2);
                    this.cartDate.allTotal = (res.data.content.orderPayAmount).toFixed(2);

                }else{

                    this.$toast(res.data.message);

                }

            })
        },
        // 获取订单可用优惠券
        getOrderCoupon(){

            let param = this.$Qs.stringify({ 'ciCode': this.userData.ciCode, 'orderCode': this.$route.query.orderCode ,'orderAmount': this.cartDate.allTotal }) ;

            this.$api.getOrderCoupon( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content , arr = [];

                    for(let item of data){

                        arr.push({
                            id: item.couponCode,
                            available: 1,
                            discount: 0,
                            denominations: item.couponInfo.couponValuePrice * 100,
                            originCondition: item.couponInfo.couponDoorPrice * 100,
                            reason: '',
                            value: item.couponInfo.couponValuePrice * 100,
                            name: item.couponInfo.couponTitle,
                            startAt: new Date(item.couponInfo.couponStartTime).getTime()/1000,
                            endAt: new Date(item.couponInfo.couponEndTime).getTime()/1000
                        })
                    }

                    this.coupons = arr;

                    arr.length == 0 ? this.couponName = '没有可用优惠券' : '';

                }else{

                    this.$toast(res.data.message);

                }

            })

        },
        // 获取选择优惠券后的价格
        getOrderCouponTotal(){

            let param = this.$Qs.stringify({ 'couponCode': this.couponCode, 'orderCode': this.$route.query.orderCode ,'orderAmount': this.cartDate.listTotal }) ;
            console.log(param)
            this.$api.getOrderCouponAmount( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content ;

                    this.cartDate.listTotal = (res.data.content.orderPayAmount).toFixed(2);

                    this.couponName = this.coupons[this.chosenCoupon].name;

                }

                this.$toast(res.data.message);

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

        // 获取订单详情
        this.getOrderProduct(this.$route.query.orderCode);
        
    }
    
}
</script>

<style>


</style>
<style lang="less" scoped>

    @import '../../style/common.less';

    //  商品列表
    .goods_list{
        .header{
            height: 0.76rem;
            line-height: 0.76rem;
        }
        .delete_btn{
            color: rgb(102,102,102)
        }
        .items_list{
            li,.content,.item{
                height:2.2rem;
            }
            
        }
        .img_box{
            display: inline-block;
            width: 1.6rem;
            height:1.6rem;
            border-radius: 2px;
            img{
                width: 96%;
            }
        }
        .items_total{
            height: 1rem;
            line-height: 1rem;
            color: @color_666;
        }
    }

    //  提交购物车
    .submit_cart{
        position: fixed;
        z-index: 999;
        bottom: 0;
        left:0;
        width:100%;
        height: 50px;
        line-height: 50px;

        .submit_btn{
            display: inline-block;
            width: 2rem;
            height: 50px;
            text-align: center;
            color:#fff;
        }
        .submit_total{
            line-height: 20px;
            text-align: right;

            p,input{
                margin:0;
            }
            input{
                font-size: 0.1rem;
                color: rgb(182,182,182);
                border:0;
                width:4.5rem;
            }
        }
    }

</style>