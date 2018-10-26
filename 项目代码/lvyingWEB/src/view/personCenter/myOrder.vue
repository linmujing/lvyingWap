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
            <van-list v-model="orderData.pageData.loading" :finished="orderData.pageData.finished" @load="onLoad" >
                <ul>
                    <li class="bg_fff margin_bottom_30" v-for="(items, index) in orderData.orderList" :key="index">
                        <div class="flex space_between line_height_80 padding_0_20 border_bottom_1px">
                            <span>订单号：{{items.orderCode}}</span>
                            <span class="color_cart_ccc2 font_20" > {{items.orderTime}} </span>
                        </div>
                        <div class="line_height_80 padding_0_20 border_bottom_1px" v-if="items.isCombination != 0">
                            <span>组合包</span>
                        </div>
                        <div class="lists" v-for="(item, index2) in items.orderItem" :key="index2">
                            <!-- 普通商品 -->
                            <div class="flex space_between padding_0_20 line_height_60 font_24 border_bottom_1px" >
                                <span>子订单号：{{ item.itemCode }}</span>
                                <span class="color_cart_ccc2 font_20" > {{item.itemName}} </span>
                            </div>
                            <div v-for="(child, index3) in item.childItem" :key="index3">
                                <div class="content flex space_between border_bottom_1px margin_left_20" style="position:relative;">
                                    <div class="item table_block" style="height:2.2rem;">
                                        <span class="td_block">
                                            <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;">
                                                <img style="width: 1.6rem; height: 1.6rem;" :src="child.productProfileUrl" :data-productCode="child.productCode" alt="">
                                            </i>
                                        </span>
                                        <span class="td_block padding_left_30">
                                            <p  class="" style="word-wrap:break-word;">
                                                <span style="position:relative;top:-0.6rem;"> {{child.name}} </span>   
                                                <span class="font_22" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{child.price}}</span>
                                            </p>
                                        </span>
                                    </div>
                                    <div class="item table_block" style="height:2.2rem;">
                                        <p class="color_cart_ccc1 font_26" style="position:absolute;top:1.52rem;right:0.3rem">
                                            X {{child.num}}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>   
                        <div class="items_total flex flex_end margin_left_20 padding_right_20 line_height_100 border_bottom_1px">
                            <div >实付：￥ {{items.orderPayAmount}}</div>
                        </div>
                        <div class="items_total flex space_between padding_0_20 line_height_100">
                            <div class="color_cart_ccc2">
                                {{ orderData.orderType[parseFloat(items.orderStatus) + 1].text }} 
                            </div>

                            <!-- 待支付状态 -->
                            <div v-if="items.orderStatus == 0">
                                <van-button size="small" @click="orderModel(items.orderCode)">取消订单</van-button>
                                <van-button size="small" @click="jumpPage(items.orderCode, items.orderStatus)" type="primary" >去支付</van-button>
                            </div>
                            <!-- 待支付状态 -->
                            <div v-if="items.orderStatus == '4' || items.orderStatus == '5'">
                                <van-button size="small" @click="orderModel(items.orderCode)">删除订单</van-button>
                                <van-button size="small" @click="jumpPage(items.orderCode, items.orderStatus)" type="primary" >重新购买</van-button>
                            </div>

                        </div>
                    </li>
                </ul>
            </van-list>
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
                    { text: '待付款', value: 0},
                    { text: '已付款', value: 1},
                    { text: '已发货', value: 2},
                    { text: '交易成功', value: 3},
                    { text: '交易取消', value: 4},
                    { text: '交易关闭', value: 5},
                    { text: '订单异常', value: 6},
                    { text: '其他', value: 7},
                ],
                // 订单数据
                orderList:[],
 
                // 分页
                pageData:{
                    total: 8,
                    pageSize: 10,
                    current: 1,
                    loading: false,
                    finished: false
                },

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

            this.orderData.orderTypeIndex = index;
            this.orderData.pageData.current = 1
            // 获取订单列表
            this.getOrderList();

        },

        // 加载更多
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                // 获取订单列表
                this.getOrderList();
            }, 1000);
        },

        // 订单弹框
        orderModel(code){
            this.$dialog.confirm({
                message: '确定该商品吗？'
            }).then(() => {

                // 取消订单或者删除订单
                this.orderModelData.modelState == 0 ? this.cancelOrderItem(code) : this.deleteOrderItem(code);

            }).catch(() => {
            
            });
        },

        /* 页面跳转 */
        // @param code string 获取当前点击的订单单号
        // @param state string 获取当前点击的订单状态
        jumpPage(code, state){

            // 路由
            let Url = '';
            let param = {};
            var codestr = this.returnCode(code);

            switch(state){
                // 去支付
                case '0':  
                    Url = '/confirmOrder'; 
                    param = {orderCode: code}; 
                    break;              
                case '4':  
                    Url = '/submitOrder'; 
                    param = {productCode:  codestr}; 
                    break;
                case '5':  
                    Url = '/submitOrder'; 
                    param = {productCode:  codestr}; 
                    break;
            }

             this.$router.push({ path: Url, query: param })

        },

        // 重新购买 获取返回订单商品编码
        // @param code string 获取当前点击的订单单号
        returnCode(code){

            let codeStr = '';

            for(let lists of this.orderData.orderList ){

                if(code == lists.orderCode){

                    for(let items of lists.orderItem){

                        for(let childs of items.childItem){

                            codeStr = codeStr == '' ? childs.productCode + '-1'  : ',' + childs.productCode + '-1' ;

                        }
                        
                    }
                }

            }

            return codeStr;
        },

        // 查看物流
        // @param orderCode string 获取当前点击的订单子单号
        // @param trackNo string 获取当前点击的子订单运单单号
        // @param productProfileUrl string 商品图片
        // @param productPirce string 商品价格
        // @param productNun string 商品个数
        checkLogistics(orderCode, trackNo, productProfileUrl, productPirce, productNun){
            this.$router.push({ path: '/personCenter/checkLogistics', query: {orderCode, trackNo, productProfileUrl, productCount, productNun} })
        },

        // 去评论
        // @param orderCode string 获取当前点击的订单子单号
        // @param productCode string 获取当前点击的商品编号
        // @param productProfileUrl string 获取当前点击的商品图片
        // @param productName string 获取当前点击的商品名字
        goComment(orderCode, productCode, productProfileUrl, productName){
            this.$router.push({ path: '/personCenter/goComment', query: {orderCode, productCode, productProfileUrl, productName} })
        },

        /** 数据获取 **/
        // 获取订单列表
        getOrderList(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
              
            let param = this.$Qs.stringify({ 
                'pageNo': this.orderData.pageData.current, 
                'pageSize': this.orderData.pageData.pageSize,
                'ciCode': this.$store.state.userData.cicode ,
                'orderStatus': this.orderData.orderType[this.orderData.orderTypeIndex].value,
                'searchKey': this.orderData.orderSearchValue,
                }) ;

            this.$api.getOrderList( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                   let data = res.data.content.list , arr = [], merchantArr = [];

                   this.orderData.pageData.total = res.data.content.count;
                   this.orderData.pageData.current++;

                   for(let i = 0 ; i < data.length; i++){

                        let orderItem = [];
                        let lists = data[i];
                        
                        // isCombination (string, optional): 是否是组合包 0- 不是 1-是 
                        // isShow (string, optional): 前端显示 0-显示 1-不显示 ,
                        arr.push({
                            orderTime: lists.createDate,
                            orderCode: lists.orderCode,
                            isCombination: lists.isCombination,
                            orderAmount: lists.orderAmount,
                            orderPayAmount: lists.orderPayAmount ,
                            orderStatus: lists.orderStatus,
                            orderCommetStatus: lists.orderCommetStatus ,
                            isShow: lists.isShow,
                            orderItem:[]
                        })

                        // 子订单
                        for( let x = 0 ; x < lists.orderMerchantList.length; x++){

                            let childItem = [];
                            let items = lists.orderMerchantList[x];

                            orderItem.push({
                                itemTime: items.createDate,
                                itemCode: items.orderMerchantCode,
                                itemAmount: items.orderAmount,
                                itemName: items.orderProductList[0].merchantInfo.merchantNm,
                                itemTrackNo: items.trackNo,
                                childItem:[]
                            })

                            // 子订单商品
                            for( let z = 0 ; z < items.orderProductList.length; z++){

                                let child = items.orderProductList[z];
                                // commetStatus (string, optional): 订单评价 1-已评价 2-未评价 
                                // isExchange (string, optional): 换货状态 0-不需要换货 1-申请换货 2-同意换货 ,
                                // orderSource (string, optional): 订单来源 1-PC商城 2-公众号 3-小程序 ,
                                childItem.push({
                                    title: child.productInfo.productTitle,
                                    name: child.productName,
                                    desc: child.descConsist,
                                    productCode: child.productCode,
                                    price: child.productPrice,
                                    num: child.productCount,
                                    productProperty: child.productProperty,
                                    commetStatus: child.commetStatus ,
                                    isExchange: child.isExchange,
                                    productProfileUrl: child.productInfo.productProfileUrl,
                                    total: (parseFloat(child.productPrice * 10000) * child.productCount)/10000
                                })

                            }

                            orderItem[x].childItem = childItem;

                        }

                        arr[i].orderItem = orderItem;
                   }

                   this.orderData.orderList = arr;

                }else{

                    this.$toast(res.data.message);

                }

                // 加载状态结束
                this.orderData.pageData.loading = false;

                // 数据全部加载完成
                if ( this.orderData.orderList.length >= this.orderData.pageData.total ) {

                    this.orderData.pageData.finished = true;
                    this.$toast('没有更多了！');

                }

                this.$toast.clear();

            })
            .catch((error) => {

                this.$toast.clear();;
                console.log('发生错误！', error);

            });
        },
        // 删除订单
        // @param orderCode string 订单编号
        deleteOrderItem(orderCode){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
              
            let param = this.$Qs.stringify({ 'orderCode': orderCode }) ;

            this.$api.hideOrder( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.$toast(res.data.message);
                    this.getOrderList();
                   
                }else{

                    this.$toast(res.data.message);

                }

                this.$toast.clear();

            })
            .catch((error) => {

                this.$toast.clear();;
                console.log('发生错误！', error);

            });
        },
        // 取消订单
        // @param orderCode string 订单编号
        cancelOrderItem(orderCode){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
              
            let param = this.$Qs.stringify({ 'orderCode': orderCode }) ;

            this.$api.cancleOrder( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.$toast(res.data.message);
                    this.getOrderList();
                   
                }else{

                    this.$toast(res.data.message);

                }

                this.$toast.clear();

            })
            .catch((error) => {

                this.$toast.clear();;
                console.log('发生错误！', error);

            });
        },
        // 换货
        // @param orderCode string 获取当前点击的订单单号
        // @param productCode string 获取当前点击的商品编号
        productChange(orderCode, productCode){
            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
              
            let param = this.$Qs.stringify({ 
                'ciCode': this.$store.state.userData.cicode , 
                'productCode': productCode, 
                'orderCode': orderCode
                }) ;

            this.$api.orderProductExchange( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    // 获取订单列表
                    this.getOrderList();
                   
                }else{

                    this.$toast(res.data.message);

                }

                this.$toast.clear();

            })
            .catch((error) => {

                this.$toast.clear();;
                console.log('发生错误！', error);

            });  
        },  
   

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
        line-height: 0.2rem;
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

    
</style>