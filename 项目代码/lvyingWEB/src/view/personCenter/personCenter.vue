<template>

    <div class="body_bg">

        <!-- 个人中心头部 -->
        <div class="person_center_header flex padding_0_20 bg_fff"  >
            <div class="head_img table_block padding_right_20">
                <p class="td_block">
                    <span :style="{backgroundImage: 'url('+imgHeadUrl+')'}"></span>
                </p>
            </div>
            <div class="username table_block">
                <p class="td_block">
                   微信号 <span class="color_cart_ccc1">{{wxName}}</span>
                </p>
            </div>
        </div>

        <!-- 个人中心列表 -->
        <ul class="person_center_list bg_fff margin_top_30">
            <li class="flex space_between margin_left_20 border_bottom_1px" v-for="(items,index) in personNavData" :key="index" @click="changeNav(index)">
                <div class="item_img"><img :src="items.imgSrc" alt=""><span> {{items.text}} </span></div>
                <div class="padding_right_20"><van-icon name="arrow" /></div>
            </li>
        </ul>

        <!-- 底部导航栏 -->
        <FooterBar :curIndex = '3'></FooterBar>

    </div>

</template>
<script>
import FooterBar from '../../components/FooterBar.vue'
export default {
    components : {
    	FooterBar
    },
    data() {
        return {

            // 个人中心列表
            personNavData: [
                {
                    text: '我的课程',
                    imgSrc: './static/images/icon/person_icon_1.png',
                    url: 'myCourse'
                },{
                    text: '我的订单',
                    imgSrc: './static/images/icon/person_icon_2.png',
                    url: 'myOrder'
                },{
                    text: '我的优惠券',
                    imgSrc: './static/images/icon/person_icon_3.png',
                    url: 'myCoupon'
                },{
                    text: '我的评价',
                    imgSrc: './static/images/icon/person_icon_4.png',
                    url: 'myComment'
                },{
                    text: '我的售后',
                    imgSrc: './static/images/icon/person_icon_5.png',
                    url: 'myAfterService'
                },{
                    text: '我的地址',
                    imgSrc: './static/images/icon/person_icon_5.png',
                    url: 'myAddress'
                },
            ],
            imgHeadUrl:'',
            wxName: '',

        }
        
    },
    methods: {

        /*个人中心导航栏切换*/
        changeNav(index){

            this.personNavData.navIndex = index;

            // 跳转
            let Url = this.personNavData[index].url;

            //this.$router.push({ path: Url, query: {id: '11'}})
            this.$router.push({ name: Url, params: {id: '11'}})

        }
   

    },
    mounted(){
    
        this.wxName = this.$store.state.userData.ciphone;

        // 头像
        let headImg = this.$store.state.userData.ciProfileUrl;
        this.imgHeadUrl =  headImg ? headImg : './static/images/image/my_head.png';


    }
}
</script>

<style>
 
</style>
<style lang="less" scoped>

    @import '../../style/common.less';

    .person_center_header{
        >div{
             height:1.9rem;
        }
        .head_img{
            width: 1.26rem;

            span{
                display: inline-block;
                width: 1.26rem;
                height: 1.26rem;
                border-radius: 50%;
                overflow: hidden;
                background-size: cover; 
            }
        }

    }

    .person_center_list{
        li{
            height: 0.9rem;
            line-height: 0.9rem;

            .item_img{
                img{
                    width: 0.3rem;
                    margin-right: 0.2rem;
                    position: relative;
                    top: 0.05rem;
                }
            }
        }
    }

</style>