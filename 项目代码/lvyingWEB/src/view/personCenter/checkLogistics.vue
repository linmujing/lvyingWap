<template>

    <div class="body_bg font_28" >
        <!-- 查看物流 -->
        <div class="order_list" >

            <!-- 订单商品 -->
            <div class="goods_list bg_fff"> 
                <div >
                    <div class="content flex space_between border_bottom_1px margin_left_20 padding_right_20" style="position:relative;">
                        <div class="item table_block" style="height:2.2rem;">
                            <span class="td_block">
                                <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;">
                                    <img  :src="product.imgSrc" alt="">
                                </i>
                            </span>
                            <span class="td_block padding_left_30">
                                <p  class="" style="word-wrap:break-word;">
                                    <span style="position:relative;top:-0.5rem;">{{product.name}}</span>   
                                    <span class="font_20" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{product.price}}</span>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 物流信息 -->
            <div class="logistics bg_fff">
                <div class="padding_left_20 margin_top_30 line_height_80 border_bottom_1px">
                    物流信息
                </div>
                <div class="logistics_item flex">
                    <span>订单单号:</span>
                    <div> {{logisticsData.orderCode}} </div>
                </div>
                <div class="logistics_item flex">
                    <span>发货日期:</span>
                    <div> {{logisticsData.date}} </div>
                </div>
                <div class="logistics_item flex">
                    <span>物流单号:</span>
                    <div> {{logisticsData.orderId}} </div>
                </div>
                <div class="logistics_item flex">
                    <span>发货地址:</span>
                    <div> {{logisticsData.deliveryAddress}} </div>
                </div>
                  <div class="logistics_item flex">
                    <span>收货人:</span>
                    <div> {{logisticsData.person}} </div>
                </div>
                <div class="logistics_item flex">
                    <span>收货地址:</span>
                    <div> {{logisticsData.collectAddress}} </div>
                </div>
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

            //物流信息
            logisticsData: {},
            
            // 产品信息
            product:{}
        }
        
    },
    methods: {

        // 查看物流
        checkLogistics(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
              
            let param = this.$Qs.stringify({ 
                'orderCode': this.$route.query.orderCode,
                'orderMerchantCode': this.$route.query.orderMerchantCode,
                'trackNo': this.$route.query.trackNo,
                }) ;

            this.$api.getOrderTrack( param )

            .then( (res) => {

                console.log(res)

                this.$toast.clear();

                if(res.data.code == 200){

                    // orderId  单号
                    // deliveryAddress 发货地址
                    // person 收货人
                    // collectAddress 收货地址   
                    this.logisticsData = {
                        orderCode: this.$route.query.orderCode,
                        orderId: res.data.content.trackNo ,
                        deliveryAddress: res.data.content.sendAddressId ,
                        person: res.data.content.signName ,
                        collectAddress: res.data.content.signAddressId ,
                        date: res.data.content.createDate 
                    }
                   
                }else{

                    this.$toast(res.data.message);

                }

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });  
        },
        // 获取产品详情
        getProduct(){
            let param = {'productCode': this.$route.query.productCode}

            this.$api.getProductInfo(  this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content , arr = [];

                    this.product = {
                        productCode: data.productCode,
                        price: data.productPrice,
                        name: data.productTitle,
                        describe: data.productDesc,
                        imgSrc: data.productProfileUrl
                    }
                    
                    this.$toast.clear();

                }else{

                    this.$toast.clear()
                    this.$toast(res.data.message);  
                    
                }
                

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });
        }

    },
    mounted(){

        this.checkLogistics();

        this.getProduct();

    }
}
</script>

<style>
 
</style>
<style lang="less" scoped>

    @import '../../style/common.less';

    .logistics_item{
        line-height: 0.66rem;
        color: rgb(102,102,102);

        span{
            width: 1.2rem;
            text-align: right;
            padding-right: 0.14rem;
            padding-left: 0.2rem;
            text-align: justify;
            
        }
        >div{
            width: 5.9rem;
        }
    }


</style>