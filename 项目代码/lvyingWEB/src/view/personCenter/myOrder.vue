<template>

    <div class="body_bg orderPage">

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
                        <div class="line_height_60 padding_0_20 border_bottom_1px" v-if="items.isCombination != 0">
                            <span>组合包</span>
                        </div>
                         <!-- 普通商品 -->
                        <div class="lists" v-for="(item, index2) in items.orderItem" :key="index2" v-if="item.combinationProduct == undefined">
                            <div class="flex space_between padding_0_20 line_height_60 font_24 border_bottom_1px" >
                                <span>子订单号：{{ item.itemCode }}</span>
                                <span class="color_cart_ccc2 font_20" > {{item.itemName}} </span>
                            </div>
                            <div v-for="(child, index3) in item.childItem" :key="index3">
                                <div class="content flex space_between border_bottom_1px margin_left_20" style="position:relative;">
                                    <div class="item table_block" style="height:2.2rem;">
                                        <span class="td_block">
                                            <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;overflow:hidden;">
                                                <img  @click="$router.push({ path: '/falvDetail', query: { productCode: child.productCode }})"
                                                :src="child.productProfileUrl" alt="">                               
                                            </i>
                                        </span>
                                        <span class="td_block padding_left_30">
                                            <p  class="" style="word-wrap:break-word;">
                                                <span style="position:relative;top:-0.6rem;"> {{child.name}} </span>   
                                                <span class="font_22" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{(child.price).toFixed(2)}}</span>
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
                        <!-- 组合包商品 -->
                        <div class="lists"  v-if="items.orderItem[0].combinationProduct != undefined">
                            <!-- 组合包自己 -->
                            <div >
                                <div class="content flex space_between border_bottom_1px margin_left_20" style="position:relative;">
                                    <div class="item table_block" style="height:2.2rem;">
                                        <span class="td_block">
                                            <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;overflow:hidden;">
                                                <img  @click="$router.push({ path: '/falvDetail', query: { productCode: items.orderItem[0].combinationProduct.productCode }})"
                                                :src="items.orderItem[0].combinationProduct.productProfileUrl" alt="">                               
                                            </i>
                                        </span>
                                        <span class="td_block padding_left_30">
                                            <p  class="" style="word-wrap:break-word;">
                                                <span style="position:relative;top:-0.6rem;"> {{items.orderItem[0].combinationProduct.productTitle}} </span>   
                                                <span class="font_22" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{(items.orderItem[0].combinationProduct.productPrice).toFixed(2)}}</span>
                                            </p>
                                        </span>
                                    </div>
                                    <div class="item table_block" style="height:2.2rem;">
                                        <p class="color_cart_ccc1 font_26" style="position:absolute;top:1.52rem;right:0.3rem">
                                            X 1
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- 组合包子商品 -->
                            <div class="margin_left_20 line_height_60 border_bottom_1px" v-if="items.orderItem[0].combinationShow">组合包详情</div>
                            <div v-for="(item, index2) in items.orderItem" :key="index2" v-if="items.orderItem[0].combinationShow">
                                <div class="flex space_between padding_0_20 line_height_60 font_24 border_bottom_1px" >
                                    <span>子订单号：{{ item.itemCode }}</span>
                                    <span class="color_cart_ccc2 font_20" > {{item.itemName}} </span>
                                </div>
                                <div v-for="(child, index3) in item.childItem" :key="index3">
                                    <div class="content flex space_between border_bottom_1px margin_left_20" style="position:relative;">
                                        <div class="item table_block" style="height:2.2rem;">
                                            <span class="td_block">
                                                <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;overflow:hidden;">
                                                    <img  @click="$router.push({ path: '/falvDetail', query: { productCode: child.productCode }})"
                                                    :src="child.productProfileUrl" alt="">                               
                                                </i>
                                            </span>
                                            <span class="td_block padding_left_30">
                                                <p  class="" style="word-wrap:break-word;">
                                                    <span style="position:relative;top:-0.6rem;"> {{child.name}} </span>   
                                                    <span class="font_22" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{(child.price).toFixed(2)}}</span>
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
                            <div class="border_bottom_1px bg_fff"  style="text-align:center;line-height:0.6rem;font-size:0.2rem;color:#aaa;" @click="items.orderItem[0].combinationShow = !items.orderItem[0].combinationShow">
                                    <span v-show="!items.orderItem[0].combinationShow">展开</span>
                                    <span v-show="items.orderItem[0].combinationShow">收起</span>
                            </div>
                        </div> 

                        <div class="items_total flex flex_end margin_left_20 padding_right_20 line_height_100 border_bottom_1px">
                            <div >实付：￥ {{(items.orderPayAmount).toFixed(2)}}</div>
                        </div>
                        <div class="items_total flex space_between padding_0_20 line_height_100">
                            <div class="color_cart_ccc2">
                                {{ orderData.orderType[parseFloat(items.orderStatus) + 1].text }} 
                            </div>

                            <!-- 去支付 待支付 -->
                            <div v-if="items.orderStatus == 0">
                                <van-button size="small" @click="orderModel(items.orderCode, 0)">取消订单</van-button>
                                <van-button size="small" @click="jumpPage(items.orderCode, items.orderStatus)" type="primary" >去支付</van-button>
                            </div>
                            <!-- 重新购买 交易取消或交易关闭-->
                            <div v-if="items.orderStatus == '4' || items.orderStatus == '5'">
                                <van-button size="small" @click="orderModel(items.orderCode, 1)">删除订单</van-button>
                                <van-button size="small" @click="jumpPage(items.orderCode, items.orderStatus)" type="primary" >重新购买</van-button>
                            </div>

                            <!-- 评价(0)/换货(1)/查看物流(2) -->
                            <div v-if="returnLogisticsShow(index) || returnCommentShow(index)">
                                <!-- 换货 只要是实质商品都有换货-->
                                <van-button size="small" v-if="returnLogisticsShow(index)"  @click="clickThis(1, items.orderCode, index)">查看换货</van-button>

                                <!-- 评价 普通商品交易成功，每个都有评价-->
                                <van-button size="small" v-if="returnCommentShow(index)" @click="clickThis(0, items.orderCode, index)">待评价</van-button>

                                <!-- 物流 只要是实质商品都有物流 (orderCode, trackNo, productProfileUrl, productPirce, productNun)-->
                                <van-button size="small" v-if="returnLogisticsShow(index)" @click="clickThis(2, items.orderCode, index)">查看物流</van-button>
                            </div>

                        </div>
                    </li>
                </ul>
            </van-list>
        </div>

        <!-- 评价，查看物流，换货 盒子 -->
        <van-popup v-model="productShow" position="top" :lockScroll="false">
            <div >
                <div v-for="(child, index3) in productList" :key="index3">
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
                    <div class="flex space_between padding_0_20 line_height_100 border_bottom_1px" v-if="showType == 0">
                        <div class="color_cart_ccc2">待评价</div>
                        <div>
                            <van-button size="small" 
                                @click="goComment(productOrderCode, child.productCode)">去评价</van-button>
                        </div>
                    </div>
                    <div class="flex space_between padding_0_20 line_height_100 border_bottom_1px" v-if="showType == 1">
                        <div class="color_cart_ccc2">
                             {{ orderData.orderType[parseFloat(productOrderState) + 1].text }} 
                        </div>
                        <div>
                            <van-button size="small" v-if="child.isExchange == 0" @click="productChange(productOrderCode, child.productCode)" >换货</van-button>
                            <van-button size="small" v-if="child.isExchange != 0" @click="$toast('请查看售后信息')" >{{child.isExchange == 1 ? '换货申请中' : '换货已同意'}}</van-button>
                        </div>
                    </div>
                    <div class="flex space_between padding_0_20 line_height_100 border_bottom_1px" v-if="showType == 2">
                        <div class="color_cart_ccc2">
                            {{ orderData.orderType[parseFloat(productOrderState) + 1].text }} 
                        </div>
                        <div>
                            <van-button size="small" 
                                @click="checkLogistics(child.orderCode, child.orderMerchantCode, child.itemTrackNo, child.productCode)">查看物流</van-button>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
        <div class="popup_close" 
            v-if="productShow" 
            @click="productShow = false"
        >×</div>
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
                orderTypeIndex:  this.$store.state.personCenter.orderType,
                // 防止多次重复点击
                orderTypeIndex2: this.$store.state.personCenter.orderType,
                // 订单类型
                orderType:[
                    { text: '全部', value: ''},
                    { text: '待付款', value: 0},
                    { text: '已付款', value: 1},
                    { text: '已发货', value: 2},
                    { text: '交易成功', value: 3},
                    { text: '交易取消', value: 4},
                    { text: '交易关闭', value: 5},
                ],
                // 订单数据
                orderList:[],
 
                // 分页
                pageData:{
                    total: 0,
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

            },

            // 展示需要评价(0)/换货(1)/查看物流(2) 的商品列表
            productShow: false,
            productList: [],
            showType: 0,
            productOrderCode: '',
            productOrderState: ''

            
        }
        
    },
    methods: {

        /**切换订单类型**/ 
        // params index 订单类型下标
        changeType(index){

            if(index == this.orderData.orderTypeIndex2){return}

            this.orderData.orderTypeIndex2 = index;

            // 订单类型状态更改
            this.$store.commit('personCenter/setOrderType', index);

            this.orderData.orderList = [];
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
        // @param code string 获取当前点击的订单单号
        // @param type string 点击类型 type=0:取消订单，type=1:删除订单
        orderModel(code, type){

            this.orderModelData.modelState = type;

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

                    this.$Message.warning(res.data.message);

                    this.productShow = false;
                   
                }else{

                    this.$Message.warning(res.data.message);

                }

                this.$toast.clear()

            })
            .catch((error) => {

                this.$toast.clear()
                console.log('发生错误！', error);

            });  
        },  

        /* 物流 */ 
        // 查看物流
        // @param orderCode string 获取当前点击的订单单号
        // @param trackNo string 获取当前点击的子订单运单单号
        // @param productCode string 商品编号
        // @param orderMerchantCode string 订单子订单号
        checkLogistics(orderCode, orderMerchantCode, trackNo, productCode ){
            this.$router.push({ path: '/myOrder/checkLogistics', query: {orderCode, orderMerchantCode, trackNo, productCode} })
        },
        // 查看物流按钮显示 判断1：是否已付款  判断2：是否为实物
        // @param index string 获取当前点击的订单下标
        returnLogisticsShow(index){

            let isShow = false, list = this.orderData.orderList[index];
     
            if(list.orderStatus != '2'){ return isShow;}
            
            console.log(list.orderItem)
            for(let item of list.orderItem){
                for(let child of item.childItem){
                    child.productProperty == '1' ? isShow = true : '';
                }
            }

            return isShow;
        },

        /* 评论 */
        // 去评论
        // @param orderCode string 获取当前点击的订单子单号
        // @param productCode string 获取当前点击的商品编号
        goComment(orderCode, productCode){
            this.$router.push({ path: '/myOrder/goComment', query: {orderCode, productCode} })
        },
        // 评论按钮显示 
        // @param index string 获取当前点击的订单下标
        returnCommentShow(index){

            let isShow = false;

            if(this.orderData.orderList[index].orderStatus != '3' ){ return isShow;}
            
            for(let item of this.orderData.orderList[index].orderItem){
                for(let child of item.childItem){
                    child.commetStatus == '0' ? isShow = true : '';
                }
            }

            return isShow;
        },

        /* 点击操作 评论(0)， 换货(1)， 查看物流(2) */
        // @param showType sting 点击类型
        // @param orderCode string 获取当前点击的订单单号
        // @param index string 获取当前点击的订单下标
        clickThis(showType, orderCode, index){

            this.productOrderCode = orderCode;
            this.productOrderState = this.orderData.orderList[index].orderStatus;
            this.showType = showType;
            this.productList = [];

            switch(showType){
                case 0:
                    // 组合包评论只能针对某一个组合包评论  
                    // isCombination (string, optional): 是否是组合包 0- 不是 1-是 
                    if(this.orderData.orderList[index].orderItem[0].combinationShow == undefined){
                        for(let item of this.orderData.orderList[index].orderItem){
                            for(let child of item.childItem){
                                // if( child.commetStatus == '0' ){
                                    this.productList.push(child);
                                // }
                            }
                        }          
                    }else{
                        // 组合包评价
                        this.goComment(orderCode, this.orderData.orderList[index].orderItem[0].combinationProduct.productCode)
                    }

                    break;
                case 1:
                    for(let item of this.orderData.orderList[index].orderItem){
                        for(let child of item.childItem){
                            if( child.productProperty == '1' ) {
                                this.productList.push(child);
                            }
                        }
                    }
                    break;
                case 2:
                    for(let item of this.orderData.orderList[index].orderItem){
                        for(let child of item.childItem){
                            if( child.productProperty == '1' ) {
                                this.productList.push(child);
                            }
                        }
                    }
                    break;
            }

            this.productList.length > 0 ? this.productShow = true : '';
        },

        /** 数据获取 **/
        // 获取订单列表
        getOrderList(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
              
            let param = { 
                'pageNo': this.orderData.pageData.current, 
                'pageSize': this.orderData.pageData.pageSize,
                'ciCode': this.$store.state.userData.cicode ,
                'searchKey': this.orderData.orderSearchValue,
                } ;

            if(this.orderData.orderType[this.orderData.orderTypeIndex].value != ''){
                param.orderStatus = this.orderData.orderType[this.orderData.orderTypeIndex].value;
            }

            this.$api.getOrderList(  this.$Qs.stringify(param)  )

            .then( (res) => {

                this.$toast.clear();

                console.log(res)

                if(res.data.code == 200){

                   let data = res.data.content.list , arr = [], merchantArr = [];

                   this.orderData.pageData.total = res.data.content.count;
                   this.orderData.pageData.current++;

                   for(let i = 0 ; i < data.length; i++){
                       console.log(i)

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
                            let itemName = items.orderProductList.length > 0 ? items.orderProductList[0].merchantInfo.merchantNm : '';

                            // 判断是否存在组合包商品
                            if(lists.orderMerchantList[0].combinationProduct.productType == '2'){

                                orderItem.push({
                                    itemTime: items.createDate,
                                    itemCode: items.orderMerchantCode,
                                    itemAmount: items.orderAmount,
                                    itemName: itemName,
                                    itemTrackNo: items.trackNo,
                                    combinationProduct: lists.orderMerchantList[0].combinationProduct,
                                    combinationShow: false,
                                    childItem:[]
                                })
                            }else{
                                orderItem.push({
                                    itemTime: items.createDate,
                                    itemCode: items.orderMerchantCode,
                                    itemAmount: items.orderAmount,
                                    itemName: itemName,
                                    itemTrackNo: items.trackNo,
                                    childItem:[]
                                })                             
                            }

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
                                    itemTrackNo: items.trackNo,
                                    orderCode: lists.orderCode,
                                    orderMerchantCode: items.orderMerchantCode,
                                    productProfileUrl: child.productInfo.productProfileUrl,
                                    total: (parseFloat(child.productPrice * 10000) * child.productCount)/10000
                                })

                            }

                            orderItem[x].childItem = childItem;

                        }

                        arr[i].orderItem = orderItem;
                   }
                    
                    let orderList = [] ;
                    for(let item of this.orderData.orderList){orderList.push(item)}

                    orderList = orderList.concat(arr);

                    this.orderData.orderList = orderList;

                }else{

                    this.$toast(res.data.message);

                }

                // 加载状态结束
                this.orderData.pageData.loading = false;
                console.log(this.orderData.orderList.length )
                console.log(this.orderData.pageData.total)

                // 数据全部加载完成
                if ( this.orderData.orderList.length >= this.orderData.pageData.total ) {

                    this.orderData.pageData.finished = true;
                    // 初次加载时不做此提示
                    if (this.orderData.pageData.current != 2){
                        this.$toast('没有更多了！');
                    }

                }else{

                    this.orderData.pageData.finished = false;

                }

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
    .orderPage .van-tabs__line{
        background-color: #00AA88;
    }
    .orderPage .van-tab--active {
        color: #00AA88;
    }
    /* 按钮样式 */
    .orderPage .van-button{
        border-radius: 0.4rem;
        height: 0.5rem;
        line-height: 0.2rem;
        margin-left:0.2rem;
    }
    .orderPage .van-button--default {
        color: #00AA88;
        background-color: #fff;
        border: 1px solid #00AA88;
    }
</style>
<style lang="less" scoped>

    @import '../../style/common.less';
    .popup_close {
        position:fixed;
        bottom:0.7rem;
        left:45%;
        width:0.75rem;
        height:0.75rem;
        line-height:0.7rem;
        text-align:center;
        border-radius:50%;
        background:#00AA88;
        color:#fff;
        font-size:0.7rem;
        z-index: 10000;
    }
    
</style>