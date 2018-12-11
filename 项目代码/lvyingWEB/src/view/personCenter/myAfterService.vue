<template>

    <div class="body_bg">

        <!-- 换货选项卡 -->
        <div class="order_type">
            <van-tabs  @click="changeType" v-model="orderData.orderTypeIndex"  sticky>
                <van-tab v-for="(item, index) in orderData.orderType" :key="index" :title="item.text"  >
                </van-tab>
            </van-tabs>
        </div>

        <!-- 换货列表 -->
        <div class="order_list" style="overflow-y:scroll;" :style="{height: windowHeight + 'px'}" v-if="orderList.length != 0">
            <van-list v-model="pageData.loading" :finished="pageData.finished" @load="onLoad" >
                <ul>
                    <li class="bg_fff margin_bottom_30" v-for="(items, index) in orderList" :key="index">
                        <div class="flex space_between line_height_80 padding_0_20 border_bottom_1px">
                            <span>订单号：{{items.orderId}}</span>
                            <span class="color_cart_ccc2 font_20" > {{items.createDate}} </span>
                        </div>
                        <div class="lists">
                            <div class="content flex space_between border_bottom_1px margin_left_20" style="position:relative;">
                                <div class="item table_block" style="height:2.2rem;">
                                    <span class="td_block">
                                        <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;">
                                            <img style="display:inline-block;width: 1.6rem;height: 1.6rem;" 
                                            @click="$router.push({ path: '/falvDetail', query: { productCode: items.productCode }})"
                                            :src="items.productWxProfileUrl" :data-productCode="items.productCode" alt="">
                                        </i>
                                    </span>
                                    <span class="td_block padding_left_30">
                                        <p  class="" style="word-wrap:break-word;">
                                            <span style="position:relative;top:-0.5rem;"> {{items.productTitle}} </span>   
                                            <!-- <span class="font_20" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{items.productOrgPrice}}</span> -->
                                        </p>
                                    </span>
                                </div>
                                <div class="item table_block" style="height:2.2rem;">
                                    <!-- <p class="color_cart_ccc1 font_20" style="position:absolute;top:1.27rem;right:0.2rem">X 1</p> -->
                                </div>
                            </div>

                        </div>   
                        <div class="items_total flex space_between padding_0_20 line_height_100">
                            <div class="color_cart_ccc2">{{items.isExchange == 1 ? '申请中' : '换货成功'}}</div>
                            <div >
                                <!-- <van-button size="small"  type="primary" >查看</van-button> -->
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list >
        </div>

        <!-- 暂无换货信息 -->
        <div class="bg_fff" style="padding-top:3rem; text-align:center; color:#999;" v-if="orderList.length == 0">
            <img style="width:2.5rem;" src="../../../static/images/image/not_have.png" alt="">
            <p>暂无换货信息</p>
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

            /* 换货数据对象 */
            orderData:{
                // 换货类型下标
                orderTypeIndex: 0,
                // 防止多次重复点击
                orderTypeIndex2: 0,
                // 换货类型
                orderType:[
                    { text: '申请换货', value: '0'},
                    { text: '换货成功', value: '1'},
                ],
               
            },

            // 换货数据
            orderList:[],

            // 分页
            pageData:{
                total: 0,
                pageSize: 10,
                current: 1,
                loading: false,
                finished: false
            },
            
        }
        
    },
    methods: {

        /**切换换货类型**/ 
        // params index 换货类型下标
        changeType(index){

            if(index == this.orderData.orderTypeIndex2){return}

            this.orderData.orderTypeIndex2 = index;
            this.pageData.current = 1;
            this.orderList = [];

            this.getOrderProductList();

        },
        // 获取换货列表
        getOrderProductList(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let param = this.$Qs.stringify({
                'pageNo': this.pageData.current, 
                'pageSize': this.pageData.pageSize, 
                'ciCode': this.$store.state.userData.cicode , 
                'isExchange': this.orderData.orderTypeIndex+1
                }) 
            
            this.$api.getOrderProductList( param )

            .then( (res) => {

                console.log(res);
                if(res.data.code == 200){

                    let  data = res.data.content.list ;
                    this.pageData.total = res.data.content.count;
                    this.pageData.current++;

                    for(let item of data){
                        this.orderList.push({
                            orderId: item.orderCode ,
                            createDate: item.createDate,
                            isExchange : item.isExchange ,
                            productWxProfileUrl: item.productInfo.productProfileUrl, //item.productInfo.productWxProfileUrl,
                            productCode: item.productInfo.productCode,
                            productTitle: item.productInfo.productTitle,
                            productOrgPrice: item.productInfo.productOrgPrice,
                        })
                    }

                    // 加载状态结束
                    this.pageData.loading = false;

                    // 数据全部加载完成
                    if ( this.orderList.length >= this.pageData.total ) {

                        this.pageData.finished = true;
                        if(this.pageData.current == 2){
                            this.$toast('没有更多了！');
                        }


                    }

                }else {

                    this.$toast(res.data.message);

                }

                this.$toast.clear();

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });

        },
        // 加载更多
        onLoad() {

            // 异步更新数据
            setTimeout(() => {

                // 获取我的换货
                this.getOrderProductList();

            }, 1000);

        },
   

    },
    mounted(){
        this.getOrderProductList();
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