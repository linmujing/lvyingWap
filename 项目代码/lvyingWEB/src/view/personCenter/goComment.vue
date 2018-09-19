<template>

    <div class="body_bg font_28" >
        <!-- 去评价 -->
        <div class="order_list" >

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

            <!-- 评价信息 -->
            <div class="logistics bg_fff">
                <div class="padding_left_20 margin_top_30 line_height_80 border_bottom_1px">
                   店铺评分
                </div>
                <div class="logistics_item padding_0_20 padding_top_30">
                    <div class="upload_box border_1" >
                        <textarea  style="width:100%;height: 2.85rem; border:0;" name="" id="" ></textarea>
                        <i class="upload" style="background: url(../../../static/images/icon/img_up.png) no-repeat center center ;">
                            <van-uploader :after-read="onRead">
                            </van-uploader>
                        </i>
                    </div>
                </div>
                <div class="logistics_item flex padding_top_20">
                    <span>描述相符</span>
                    <div style="position:relative;top:0.08rem;"> <van-rate v-model="orderData.gradeValue1" /> </div>
                </div>
                <div class="logistics_item flex">
                    <span>帮助程度</span>
                    <div style="position:relative;top:0.08rem;"> <van-rate v-model="orderData.gradeValue2" /></div>
                </div>
                <div style="text-align: center;padding-top:1rem;">
                    <van-button size="large"  type="primary" style="width:5rem;" @click="submitComment">发布</van-button>
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

            // 我的评论
            orderData:
                {
                    orderId: '12456524455',
                    // 评价
                    commentRemark:'',
                    // 评分
                    gradeValue1:0,
                    gradeValue2:0,
                    items:[
                        {
                            title: '这是商品的标题这是商品的标题这是商品的标题',
                            price: '100.00',
                            imgSrc: './static/images/image/book_01.png',
                        }
                    ]
                },


        }
        
    },
    methods: {

        onRead(file) {

            console.log(file)

        },

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

    /* 弹框样式 */
    .van-dialog__confirm, .van-dialog__confirm:active{
        color: #00aa88;
    }

    .van-dialog__message{
        padding: 1rem 0;
        color: #666;
        text-align: center;
    }
    .van-dialog{
        border-radius: 10px;
    }
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
    
    .logistics{

        // 图片上传
        .upload_box{
            line-height: 0.6rem;
            width:100%;
            padding: 0 0.2rem 0.5rem 0.2rem ; 
            position:relative;

            .upload{
                position: absolute;
                bottom:0.1rem;
                left:0.1rem;
                width:0.6rem;
                height:0.5rem;
                background: url(../static/images/icon/img_up.png) no-repeat center center ;
                background-size: cover; 
            }
        }

    }




</style>