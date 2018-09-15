<template>

    <div class="body_bg font_28" >
        <!-- 查看物流 -->
        <div class="order_list" v-if="orderData.length != 0">

            <!-- 订单商品 -->
            <div class="goods_list bg_fff"> 
                <div v-for= "(item, index2) in orderData.items" :key="index2">
                    <div class="content flex space_between border_bottom_1px margin_left_20 padding_right_20" style="position:relative;">
                        <div class="item table_block" style="height:2.2rem;">
                            <span class="td_block">
                                <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;">
                                    <img  :src="item.imgSrc" alt="">
                                </i>
                            </span>
                            <span class="td_block padding_left_30">
                                <p  class="" style="word-wrap:break-word;">
                                    <span style="position:relative;top:-0.5rem;">{{item.title}}</span>   
                                    <span class="font_20" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{item.price}}</span>
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
                    <span>物流单号:</span>
                    <div> {{orderData.orderId}} </div>
                </div>
                <div class="logistics_item flex">
                    <span>发货地址:</span>
                    <div> {{orderData.deliveryAddress}} </div>
                </div>
                  <div class="logistics_item flex">
                    <span>收货人:</span>
                    <div> {{orderData.person}} </div>
                </div>
                <div class="logistics_item flex">
                    <span>收货地址:</span>
                    <div> {{orderData.collectAddress}} </div>
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
            orderData:
                {
                    orderId: '12456524455',
                    deliveryAddress:'湖南省长沙市芙蓉区芙蓉大道建设八一路口32号湖南省长沙市芙蓉区芙蓉大道建设八一路口32号',
                    person:'666先生',
                    collectAddress:'湖南省长沙市芙蓉区芙蓉大道建设八一路口33号湖南省长沙市芙蓉区芙蓉大道建设八一路口33号',
                    logisticCompany:'圆通',
                    items:[
                        {
                            title: '这是商品的标题这是商品的标题这是商品的标题',
                            price: '100.00',
                            imgSrc: '../../../static/images/image/book_01.png',
                        }
                    ]
                },


        }
        
    },
    methods: {

   

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