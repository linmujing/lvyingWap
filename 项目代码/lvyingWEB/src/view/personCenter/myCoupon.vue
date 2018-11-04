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
        <div class="coupon_list" style="overflow-y:scroll;" :style="{height: windowHeight + 'px'}" v-if="couponData.couponList.length != 0">
            <van-list v-model="pageData.loading" :finished="pageData.finished" @load="onLoad" >
                <ul>
                    <li class="coupon_items body_bg flex"  v-for="(item, index) in couponData.couponList" :key="index">
                        <div class="bg_00aa88 item_left text_center table_block" :style="{ background: item.color }" >
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
            </van-list>    
        </div>

        <div style="padding-top:3rem; text-align:center; color:#999;" v-if="couponData.couponList.length == 0">
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
                    { text:'全部', value:'' },
                    { text:'可使用', value:'1' },
                    { text:'已使用', value:'2' },
                    { text:'已过期', value:'0' },
                ],
                // 优惠券列表
                couponList:[] 

            },

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

        /**切换优惠券类型**/ 
        // params index 优惠券类型下标
        changeType(index){

            this.pageData.current = 1;
            this.couponData.couponList = [];

            // 获取订单列表
            this.getCouponData();

        },

        // 加载更多
        onLoad() {

            // 异步更新数据
            setTimeout(() => {

                // 获取我的优惠券
                this.getCouponData();

            }, 1000);

        },

        /*优惠券数据*/
        // 获取优惠券列表
        getCouponData(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let param = {
                'pageNo': this.pageData.current,
                'pageSize': this.pageData.pageSize,
                'ciCode':this.$store.state.userData.cicode,
                'couponStatus': this.couponData.couponType[this.couponData.couponTypeIndex].value,
                'couponForm': ''
                } ;

            this.$api.getCouponList( this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let  data = res.data.content.list ;
                    this.pageData.total = res.data.content.count;
                    this.pageData.current++;

                    for(let item of data){

                        let color = '', stateImg = '';

                        // couponStatus (string, optional): 优惠券状态 0-未使用 1-已使用 2-已过期 3-使用中 
                        switch(item.couponStatus){
                            case 0: color = '#0a8'; stateImg = ''; break;
                            case 1: color = '#f09105'; stateImg = '../../../static/images/image/coupon-icon_01.png';; break;
                            case 2: color = '#f8cca4'; stateImg = '../../../static/images/image/coupon-icon_02.png';; break;
                            case 3: color = '#ccc'; stateImg = '../../../static/images/image/coupon-icon_01.png';; break;
                        }

                        this.couponData.couponList.push({
                            price:  item.couponInfo.couponValuePrice,
                            content: item.couponInfo.couponTitle,
                            time: this.dateFormat(item.couponInfo.couponStartTime) +'-'+ this.dateFormat(item.couponInfo.couponEndTime),
                            stateImg: stateImg,
                            color: color,
                            platform:''
                        })
                    }

                    // 加载状态结束
                    this.pageData.loading = false;

                    // 数据全部加载完成
                    if ( this.couponData.couponList.length >= this.pageData.total ) {

                        this.pageData.finished = true;
                        this.$toast('没有更多了！');

                    }
                }else{

                    this.$toast(res.data.message);

                }

                this.$toast.clear();

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });
        },

        //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
        dateFormat (time) {
          var date=new Date(time);
          var year=date.getFullYear();
          var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
          var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
          // 拼接
          return year+"/"+month+"/"+day;
        },

    },
    mounted(){

        // 获取我的优惠券
        this.getCouponData();
        
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