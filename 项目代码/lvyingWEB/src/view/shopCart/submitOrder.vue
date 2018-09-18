<template>

    <div class="body_bg">

        <div style="overflow-y:scroll;" :style="{height: windowHeight + 'px'}" v-show="!addressData.addressPageShow">

            <!-- 购买信息 -->
            <div class="color_000 bg_fff line_height_60" v-if="pageState == 'a'">
                <div class="padding_0_20">购买账号： 微信登录账号</div>
                <div class="padding_0_20">手机号： 1341234569874</div>
                <div class="border_top_1px padding_0_20 line_height_94" >购买后不支持退款、转让，请确认后再提交订单。</div>
            </div>

            <!-- 地址 -->
            <div class="color_000 bg_fff line_height_60" v-if="pageState == 'b'">
                <div v-if="addressData.addressList.length != 0">
                    <div class="padding_0_20 flex space_between">
                        <div>收货人：{{addressData.addressList[0].name}}</div>
                        <div>电话号码：{{addressData.addressList[0].phone}}</div>
                    </div>
                    <div class="padding_0_20 flex space_between">
                        <div style="width:1.6rem;">收货地址：</div>
                        <div> 
                            {{ addressData.addressList[0].province.label +" "+ addressData.addressList[0].city.label }} 
                            {{ addressData.addressList[0].county.label +" "+ addressData.addressList[0].addressDetail }}
                            {{ addressData.addressList[0].postCode }}
                        </div>
                    </div>
                    <div class="padding_0_20 flex space_between line_height_94 border_top_1px" @click="addressData.addressPageShow = true">
                        <div style="width:1.6rem;">修改收货地址</div>
                        <div> <img style="width:0.3rem;position:relative;top:0.06rem;" src="../../../static/images/icon/address_add.png" alt=""></div>
                    </div>
                </div>
                
                <div v-else class="padding_0_20 flex space_between line_height_94 border_top_1px" @click="addressData.addressPageShow = true">
                    <div style="width:1.6rem;">添加收货地址</div>
                    <div> <img style="width:0.3rem;position:relative;top:0.06rem;" src="../../../static/images/icon/address_add.png" alt=""></div>
                </div>
            </div> 

            <!-- 商品列表 -->
            <div>
                <ul class="goods_list">
                    <li class="margin_top_30 bg_fff" v-for="(items,index1) in cartDate.cartList" :key="index1" >
                        <div class="header flex space_between padding_0_20 border_bottom_1px line_height_80">
                            <div>{{items.itemTitle}}</div>
                        </div>
                        <ul class="items_list">
                            <li class="padding_left_20" v-for="(item,index2) in items.items" :key="index2">
                                <div class="content flex space_between border_bottom_1px" style="position:relative;">
                                    <div class="item table_block">
                                        <span class="td_block padding_left_30">
                                            <i class="img_middle_center img_box border_1">
                                                <img  :src="item.imgSrc" alt="">
                                            </i>
                                        </span>
                                        <span class="td_block padding_left_30 ">
                                            <p  class="" style="word-wrap:break-word;">
                                                <span style="position:relative;top:-0.6rem;">{{item.describe}}</span>   
                                                <span class="font_20" style="position:absolute;top:1.5rem;left:2.2rem;color:red;">￥{{item.price}}</span>
                                            </p>
                                        </span>
                                    </div>
                                    <div class="item table_block">
                                        <p class="color_cart_ccc1 font_20" style="position:absolute;top:1.27rem;right:0.2rem">
                                        x {{item.num}}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="items_total flex space_between margin_left_20 padding_right_20  line_height_94 border_bottom_1px color_cart_ccc2">
                            <div >减免</div>
                            <div >0.00</div>
                        </div>
                        <div class="items_total flex space_between margin_left_20 padding_right_20  line_height_94 border_bottom_1px color_cart_ccc2">
                            <div >优惠券</div>
                            <div class="color_00aa88" @click="showList = true">去选择</div>
                        </div>
                        <div class="items_total flex flex_end padding_0_20 line_height_94 color_cart_ccc2">
                            <div >小计：￥{{items.itemTotal}}</div>
                        </div>
                    </li>
                </ul> 

                <!-- 配送方式 -->
                <div class="items_total flex space_between padding_0_20 bg_fff line_height_94 color_cart_ccc2" style="margin:0.3rem 0;" v-if="pageState == 'b'">
                    <div >配送方式</div>
                    <div >快递免邮</div>
                </div>

            </div>
        </div>

        <!-- 提交订单 -->
        <div class="submit_cart padding_left_20 flex space_between bg_fff border_top_1px font_30" v-show="!addressData.addressPageShow">
            <div>
                <span class="submit_total padding_right_20 color_cart_ccc2">
                     实付金额：<span class="color_00aa88">￥ {{cartDate.listTotal}}</span>
                </span>
            </div>
            <div >
                <span class="submit_btn bg_00aa88" @click="changePage">提交订单</span>
            </div>
        </div>

        <!-- 优惠券列表 -->
        <van-popup v-model="showList" position="bottom">
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
                @exchange="onExchange"
            />
        </van-popup>

        <!-- 地址列表选择 -->
        <div v-show="addressData.addressPageShow" style="padding-top:0.94rem;">
            <div class="flex space_between line_height_94 bg_fff" style="position:fixed;top:0;width:100%;z-index:100;">
                <div class="padding_0_20">选择地址</div>
                <div class="padding_0_20 color_00aa88" @click="addressData.addressPageShow = false">关闭</div>
            </div>
            <Address :pState="1" @hidebox="listenAddressChoose" ></Address>
        </div>
    </div>

</template>
<script>
// 地址组件
import Address from '../../components/Address.vue'

    const coupon = {
    available: 1,
    discount: 0,
    denominations: 150,
    originCondition: 0,
    reason: '',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000
    };

export default {
    components : {
    	Address
    },
    data() {
        return {

            //  可用屏幕高度
            windowHeight: document.documentElement.clientHeight - 50,

            // 页面类型
            pageState: 'a',

            /*购物车数据*/
            cartDate:{
                // 全部列表状态
                listState: false,
                // 全部删除状态
                listDeleteState: false,
                // 总价格
                listTotal: 0.00,
                // 大列表
                cartList:[
                    {
                       
                        itemState: false,
                        itemTitle: '机构法院',
                        itemTotal: 0.00,
                        // 小列表
                        items:[
                            {
                                index2: 0,
                                state: false,
                                price: '88.01',
                                num: 1,
                                describe: '多行文字多行文字多行文字多行文字多行文字多行文字',
                                imgSrc: '../../../static/images/image/book_01.png'
                            },
                            {
                                index2: 1,
                                state: false,
                                price: '101.01',
                                num: 1,
                                describe: '多行文字多行文字多行文字',
                                imgSrc: '../../../static/images/image/book_01.png'
                            }
                        ]
                    },
                    {
                       
                        itemState: false,
                        itemTitle: '机构法院',
                        itemTotal: 0.00,
                        // 小列表
                        items:[
                            {
                                index2: 0,
                                state: false,
                                price: '88.01',
                                num: 1,
                                describe: '多行文字多行文字多行文字',
                                imgSrc: '../../../static/images/image/book_01.png'
                            },
                            {
                                index2: 1,
                                state: false,
                                price: '101.01',
                                num: 1,
                                describe: '多行文字多行文字多行文字',
                                imgSrc: '../../../static/images/image/book_01.png'
                            }
                        ]
                    }
                ],
            },  

            /*收货地址数据*/
            addressData:{
                // 地址列表隐藏与展示
                addressPageShow: false,

                // 收货地址数据列表
                addressList:[
                {
                    id: 1,
                    name:'律师之家',
                    phone:'15874252525',
                    province: { value: '1', label: '湖南省'},
                    city: { value: '1', label: '长沙市'},
                    county: { value: '1', label: '芙蓉区'},
                    addressDetail: '芙蓉大道 中心街 23号',
                    postCode: '10010',
                }
                ]

            },

            /*优惠券弹框*/
            showList: false,
            chosenCoupon: -1,
            coupons: [coupon],
            disabledCoupons: [coupon]
        }
        
    },
    methods: {

        /*优惠券功能*/
        // 选择
        onChange(index) {
            this.showList = false;
            this.chosenCoupon = index;
        },
        onExchange(code) {
            this.coupons.push(coupon);
        },

        // 切换页面
        changePage(){
            
            this.pageState == 'a' ? this.pageState = 'b' : this.pageState = 'a';

        },

        // 监听地址选择
        listenAddressChoose(data){

            this.addressData.addressList = [];
            this.addressData.addressList.push(data);

            this.addressData.addressPageShow = false;

        },
    }
}
</script>

<style>


</style>
<style lang="less" scoped>

    @import '../../style/common.less';

    //  商品列表
    .goods_list{
        .header{
            height: 0.76rem;
            line-height: 0.76rem;
        }
        .delete_btn{
            color: rgb(102,102,102)
        }
        .items_list{
            li,.content,.item{
                height:2.2rem;
            }
            
        }
        .img_box{
            display: inline-block;
            width: 1.6rem;
            height:1.6rem;
            border-radius: 2px;
            img{
                width: 96%;
            }
        }
        .items_total{
            height: 1rem;
            line-height: 1rem;
            color: @color_666;
        }
    }

    //  提交购物车
    .submit_cart{
        position: fixed;
        z-index: 999;
        bottom: 0;
        left:0;
        width:100%;
        height: 50px;
        line-height: 50px;

        .submit_btn{
            display: inline-block;
            width: 2rem;
            height: 50px;
            text-align: center;
            color:#fff;
        }
        .submit_total{
            line-height: 20px;
            text-align: right;

            p,input{
                margin:0;
            }
            input{
                font-size: 0.1rem;
                color: rgb(182,182,182);
                border:0;
                width:4.5rem;
            }
        }
    }

</style>