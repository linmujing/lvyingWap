<template>

    <div class="body_bg">

        <!-- 订单选项卡 -->
        <div class="order_type">
            <van-tabs  @click="changeType" v-model="orderData.orderTypeIndex"  sticky>
                <van-tab v-for="(item, index) in orderData.orderType" :key="index" :title="item.text"  >
                </van-tab>
            </van-tabs>
        </div>

        <!-- 订单列表 -->
        <div class="order_list" style="overflow-y:scroll;" :style="{height: windowHeight + 'px'}">
            <ul>
                <li class="bg_fff margin_bottom_30" v-for="(items, index) in orderData.orderList" :key="index">
                    <div class="flex space_between line_height_80 padding_0_20 border_bottom_1px">
                        <span>订单号：{{items.orderId}}</span>
                        <span class="color_cart_ccc2 font_20" > {{items.startTime}} </span>
                    </div>
                    <div class="lists" v-for="(item, index2) in items.items" :key="index2">
                        <div class="content flex space_between border_bottom_1px margin_left_20" style="position:relative;">
                            <div class="item table_block" style="height:2.2rem;">
                                <span class="td_block">
                                    <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;">
                                        <img  :src="item.imgSrc" alt="">
                                    </i>
                                </span>
                                <span class="td_block padding_left_30">
                                    <p  class="" style="word-wrap:break-word;">
                                        <span style="position:relative;top:-0.6rem;"> {{item.title}} </span>   
                                        <span class="font_20" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{item.price}}</span>
                                    </p>
                                </span>
                            </div>
                            <div class="item table_block" style="height:2.2rem;">
                                <p class="color_cart_ccc1 font_20" style="position:absolute;top:1.27rem;right:0.2rem">
                                x {{item.number}}
                                </p>
                            </div>
                        </div>

                    </div>   
                    <div class="items_total flex flex_end margin_left_20 padding_right_20 line_height_100 border_bottom_1px">
                        <div >实付：￥ {{items.itemstotal}}</div>
                    </div>
                    <div class="items_total flex space_between padding_0_20 line_height_100">
                        <div class="color_cart_ccc2">{{items.payStateText}}</div>
                        <div >
                            <van-button size="small">取消订单</van-button>
                            <van-button size="small"  type="primary" >去支付</van-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>


    </div>

</template>
<script>

export default {
    components : {

    },
    data() {
        return {

            //  可用屏幕高度
            windowHeight: document.documentElement.clientHeight - 44,

            /* 订单数据对象 */
            orderData:{
                // 订单类型下标
                orderTypeIndex: 0,
                // 订单类型
                orderType:[
                    { text: '全部', value: ''},
                    { text: '待付款', value: ''},
                    { text: '已付款', value: ''},
                    { text: '待发货', value: ''},
                    { text: '待收货', value: ''},
                    { text: '待评价', value: ''},
                    { text: '退款中', value: ''},
                    { text: '已评价', value: ''},
                    { text: '已关闭', value: ''},
                    { text: '已成功', value: ''},
                ],
                // 订单数据
                orderList:[
                    {
                        payState: '',
                        payStateText: '待付款',
                        operation: '去支付',
                        routerUrl:'personCenter/checkLogistics',
                        startTime: '2018-08-51 16:00:00',
                        orderId: '2018080511600',
                        itemstotal: '100.00',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                            imgSrc:'../../../static/images/image/book_01.png'
                        },
                        {
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                            imgSrc:'../../../static/images/image/book_01.png'
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '已关闭',
                        operation: '重新购买',
                        routerUrl:'personCenter/checkLogistics',
                        startTime: '2018-08-51 16:00:00',
                        orderId: '2018080511600',
                        itemstotal: '100.00',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                            imgSrc:'../../../static/images/image/book_01.png'
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '待评价',
                        operation: '去评价',
                        routerUrl:'personCenter/goComment',
                        startTime: '2018-08-51 16:00:00',
                        orderId: '2018080511600',
                        itemstotal: '100.00',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                            imgSrc:'../../../static/images/image/book_01.png'
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '待发货',
                        operation: '退款',
                        routerUrl:'personCenter/refundMoney',
                        startTime: '2018-08-51 16:00:00',
                        orderId: '2018080511600',
                        itemstotal: '100.00',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                            imgSrc:'../../../static/images/image/book_01.png'
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '已付款',
                        operation: '待发货',
                        startTime: '2018-08-51 16:00:00',
                        orderId: '2018080511600',
                        itemstotal: '100.00',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                            imgSrc:'../../../static/images/image/book_01.png'
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '待发货',
                        operation: '待收货',
                        startTime: '2018-08-51 16:00:00',
                        orderId: '2018080511600', 
                        itemstotal: '100.00',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                            imgSrc:'../../../static/images/image/book_01.png'
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '已成功',
                        operation: '去支付',
                        startTime: '2018-08-51 16:00:00',
                        orderId: '2018080511600',
                        itemstotal: '100.00',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                            imgSrc:'../../../static/images/image/book_01.png'
                        }],
                    }
                ],
                // 分页
                pageData:{
                    total: 7,
                    pageSize: 5,
                    current: 1
                }

            },

            /* 订单操作弹框对象 */
            orderModelData: {
                // 弹框开关
                modelValue: false,
                // 触发的弹框状态  0：取消订单 ， 1：删除订单
                modelState: 0,
                // 弹框参数
                modelList:[
                    { title: '确定取消该订单吗？'},
                    { title: '确定删除该订单吗？'}
                ]

            }

            
        }
        
    },
    methods: {

        /**切换订单类型**/ 
        // params index 订单类型下标
        changeType(index){

            console.log(index)

        }
   

    }
}
</script>

<style>
    /* 头部切换栏颜色 */
    .van-tabs__line{
        background-color: #00AA88;
    }
    .van-tab--active {
        color: #00AA88;
    }
    /* 按钮样式 */
    .van-button{
        border-radius: 0.4rem;
        height: 0.5rem;
        line-height: 1;
        margin-left:0.2rem;
    }
    .van-button--default {
        color: #00AA88;
        background-color: #fff;
        border: 1px solid #00AA88;
    }
</style>
<style lang="less" scoped>

    @import '../../style/common.less';

    .order_type{
        
    }
</style>