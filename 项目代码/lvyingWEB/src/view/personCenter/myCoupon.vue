<template>

    <div class="">

        <!-- 优惠券选项卡 -->
        <div class="coupon_type">
            <van-tabs  @click="changeType" v-model="couponData.couponTypeIndex"  sticky>
                <van-tab v-for="(item, index) in couponData.couponType" :key="index" :title="item.text"  >
                </van-tab>
            </van-tabs>
        </div>

        <!-- 优惠券列表 -->
        <div class="coupon_list" style="overflow-y:scroll;" :style="{height: windowHeight + 'px'}" v-if="couponData.couponlist.length != 0">
            <ul>
                <li class="coupon_items body_bg flex"  v-for="(item, index) in couponData.couponlist" :key="index">
                    <div class="bg_00aa88 item_left text_center table_block" :style="{ background: item.state != 1 ? '#999' : ''}" >
                        <i class="line"></i>
                        <div class="td_block text_space_1">
                            <span class="font_40">￥{{item.price}} </span><br/>
                            <span class="font_28">{{item.content}}</span>
                        </div>
                    </div>
                    <div class="item_right table_block padding_0_20">
                        <div class="td_block">
                            <div class="line_height_50">有效时间： {{item.time}} </div>
                            <div class="font_20">                    
                                <span>使用说明：</span>请在券面所示有效期内使用，逾期失效用券应满足券面所示使用范围、满减金额。
                            </div>
                        </div>
                        <i class="sign" :style="{ backgroundImage: 'url('+ item.stateImg +')'}" v-if="item.state != 1"></i>
                    </div>
                </li>
            </ul>
        </div>

        <div style="padding-top:3rem; text-align:center; color:#999;" v-if="couponData.couponlist.length == 0">
            <img style="width:2.5rem;" src="../../../static/images/image/not_have.png" alt="">
            <p>暂无优惠券</p>
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

            /* 优惠券数据对象 */
            couponData:{
                // 优惠券类型下标
                couponTypeIndex: 0,
                // 优惠券类型
                couponType:[
                    { text: '全部', value: ''},
                    { text: '可使用', value: ''},
                    { text: '已使用', value: ''},
                    { text: '已到期', value: ''},
                ],
                // 优惠券列表
                couponlist:[
                    {
                        price: '3',
                        content: '满100减3',
                        time: '2018.08.01-2018.08.31',
                        state:'1',
                        stateImg:'',
                        platform:''
                    },{
                        price: '5',
                        content: '满200减5',
                        time: '2018.08.01-2018.08.31',
                        state:'2',
                        stateImg:'../../../static/images/image/coupon-icon_01.png',
                        platform:''
                    },{
                        price: '20',
                        content: '满1000减20',
                        time: '2018.08.01-2018.08.31',
                        state:'3',
                        stateImg:'../../../static/images/image/coupon-icon_02.png',
                        platform:''
                    },{
                        price: '3',
                        content: '满100减3',
                        time: '2018.08.01-2018.08.31',
                        state:'1',
                        stateImg:'',
                        platform:''
                    },
                ] 

            },

            
        }
        
    },
    methods: {

        /**切换优惠券类型**/ 
        // params index 优惠券类型下标
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
</style>
<style lang="less" scoped>

    @import '../../style/common.less';

    .coupon_items{
        height: 1.8rem;
        margin: 0.3rem 3% 0 3% ;

        >div{
            min-height: 1.8rem;
        }
        .item_left{
            width: 30%;
            position: relative;
            color: #fff;

            .line{
                position: absolute;
                top:0;
                right:0;
                border-right:2px dotted #f5f5f5;
                height: 100%;
            }
        }
        .item_right{
            width: 80%;
            position: relative;

            .sign{
                position: absolute;
                right:0;
                top:0;
                width:0.78rem;
                height: 0.78rem;
                border-radius: 50%;
                background-size: cover;
                z-index: 99; 
            }
        }
    }
</style>