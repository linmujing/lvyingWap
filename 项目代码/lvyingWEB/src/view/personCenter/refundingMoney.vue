<template>

    <div class="body_bg font_28" >

        <!-- 退货退款中 -->
        <div class="order_list" >

            <!-- 退款 信息 -->
            <div class="logistics bg_fff" v-if="pageState == 'a'">
                <div class="padding_left_20 line_height_80">
                   <span>退款成功</span>
                </div>

                 <div class="padding_0_20 line_height_80 flex space_between" v-if="pageState == 'b'">
                   <span>退款处理中</span><span class="color_00aa88">商家正在处理中</span>
                </div>
            </div>

            <div class="margin_top_30 bg_fff">
                <div class="logistics_item flex line_height_80" >
                    <span>退款金额</span>
                    <div> ￥{{refundData.Money}} </div>  
                </div>
                <div class="logistics_item flex line_height_80" >
                    <span>退款微信</span>
                    <div> 124562</div>  
                </div>
            </div>

            <!-- 订单商品 -->
            <div class="goods_list bg_fff"> 
                <div v-for= "(item, index2) in orderData" :key="index2">
                    <div class="content flex space_between border_bottom_1px" style="position:relative;">
                        <div class="item table_block border_top_1px padding_0_20" style="height:2.2rem;">
                            <span class="td_block">
                                <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;">
                                    <img  :src="item.imgSrc" alt="">
                                </i>
                            </span>
                            <span class="td_block padding_left_30">
                                <p  class="" style="word-wrap:break-word;">
                                    <span style="position:relative;top:-0.5rem;">{{item.title}}</span>   
                                    <span class="font_20" style="position:absolute;top:1.5rem;left:2.1rem;color:red;">￥  {{item.price}}</span>
                                </p>
                            </span>
                        </div>
                    </div>
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
            
            // 退款处理中
            pageState: "a",

            /*退款说明*/
            refundData:{
                // 退款金额
                Money: 0.00,
                
            },

            // 订单信息
            orderData:
               [
                {
                    title: '这是商品的标题这是商品的标题这是商品的标题',
                    price: '100.00',
                    imgSrc: './static/images/image/book_01.png',
                }
            ]

        }
        
    },
    methods: {



    }
}
</script>

<style>
     /* 按钮样式 */
    .van-button{
        border-radius: 0.4rem;
        height: 0.8rem;
        line-height: 1;
        margin-left:0.2rem;
    }
    .van-button--default {
        color: #00AA88;
        background-color: #fff;
        border: 1px solid #00AA88;
    }

    .van-radio__input {
        top: -0.2rem;
    }
    .van-radio__label{
        padding-right:20px;
    }
</style>
<style lang="less" scoped>

    @import '../../style/common.less';


    .logistics_item{
        line-height: 0.8rem;
        color: rgb(102,102,102);

        span{
            width: 1.2rem;
            text-align: right;
            padding-right: 0.14rem;
            padding-left: 0.2rem;
            
        }
        >div{
            width: 5.9rem;
        }
    }
    




</style>