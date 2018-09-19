<template>

    <div class="body_bg font_28" >
        <!-- 退货退款 -->
        <div class="order_list" >

            <!-- 订单商品 -->
            <div class="goods_list bg_fff"> 
                <div v-for= "(item, index2) in orderData" :key="index2">
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

            <!-- 退款 信息 -->
            <div class="logistics bg_fff">
                <div class="padding_left_20 margin_top_30 line_height_80 border_bottom_1px">
                   退款原因
                </div>
                <div class="logistics_item flex border_bottom_1px line_height_100 margin_left_20">
                    <van-radio-group v-model="refundData.Reason" class="flex">
                        <van-radio name="1">多拍/拍错/不想要</van-radio>
                        <van-radio name="2">缺货</van-radio>
                    </van-radio-group>
                </div>
                <div class="logistics_item flex border_bottom_1px line_height_100 margin_left_20" style="height:0.94rem;">
                    <span>退款金额</span>
                    <div> ￥{{refundData.Money}} </div>  
                </div>
                <div class="logistics_item flex border_bottom_1px line_height_100" style="height:0.94rem;">
                    <span>退款说明</span>
                    <div > <input type="text" placeholder="选填" style="border:0;line-height:0.88rem;"></div>
                </div>
                <div style="text-align: center;padding-top:1rem;">
                    <van-button size="large"  type="primary" style="width:5rem;" @click="submitComment">提交</van-button>
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

            /*退款说明*/
            refundData:{
                // 退款原因
                Reason: '',
                // 退款金额
                Money: 0.00,
                // 退款说明
                Explain: '',
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

        // 提交评论
        submitComment(){

            this.$dialog.confirm({
                message: '评价成功',
                confirmButtonText: '查看评价',
                cancelButtonText: '返回'
            }).then(() => {

                

            }).catch(() => {
            
            });

        }

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
        line-height: 0.90rem;
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