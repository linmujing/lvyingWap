<template>

    <div >
        <!-- 我的评论 -->
        <van-list v-model="pageData.loading" :finished="pageData.finished" @load="onLoad" >
            <div class="comment_list" v-if="commentData.length != 0">
                <div class="items" v-for="(items, index) in commentData" :key="index">
                    <div class="flex padding_0_20 padding_top_20">
                        <div class="head_img  padding_right_20">
                            <span :style="{ backgroundImage: 'url('+ userHeadUrl +')' } "></span>
                        </div>
                        <div class="padding_top_10">
                            <div class="color_cart_ccc2">{{ userName }}</div>
                            <span class="color_cart_ccc1 font_20">{{ items.createDate }}</span>
                        </div>
                    </div>
                    <div class="padding_0_20 line_height_40 padding_20" >
                        {{items.commentDesc}}
                    </div>
                    <div class="table_block padding_20" style="1.5rem" v-if="items.commentPicUrl != ''">
                        <span class="td_block">
                            <i class="img_middle_center border_1" style="display:inline-block;width: 0.8rem;height: 0.8rem;" >
                                <img  :src="items.commentPicUrl" alt="" @click="clickImg(items.commentPicUrl)">
                            </i>
                        </span>
                    </div>
                    <div >
                        <div class="content flex space_between border_bottom_1px padding_left_20" style="position:relative;background:rgb(250,250,250)">
                            <div class="item table_block" style="height:2.2rem;">
                                <span class="td_block">
                                    <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;" >
                                        <img  @click="$router.push({ path: '/falvDetail', query: { productCode: items.productCode }})"
                                        :src="items.productWxProfileUrl" :data-productcode="items.productCode" alt="">
                                    </i>
                                </span>
                                <span class="td_block padding_left_30">
                                    <p  class="" style="word-wrap:break-word;">
                                        <span style="position:relative;top:-0.5rem;">{{items.productTitle }}</span>   
                                        <span class="font_20" style="position:absolute;top:1.5rem;left:2.1rem;color:red;">￥  {{items.productPrice }}</span>
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-list >

        <div style="padding-top:3rem; text-align:center; color:#999;" v-if="not_have">
            <img style="width:2.5rem;" src="../../../static/images/image/not_have.png" alt="">
            <p>暂无评价</p>
        </div>
    </div>

</template>
<script>
import FooterBar from '../../components/FooterBar.vue'
import { ImagePreview } from 'vant';
export default {
    components : {
    	FooterBar
    },
    data() {
        return {

            // 我的评论
            commentData: [],
            // 分页
            pageData:{
                total: 0,
                pageSize: 5,
                current: 1,
                loading: false,
                finished: false
            },
            // 没有评论
            not_have: false,
            userName: this.$store.state.userData.ciname ,
            userHeadUrl: this.$store.state.userData.ciProfileUrl 

        }
        
    },
    methods: {

        // 获取评论列表
        getProductCommentList(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let param = this.$Qs.stringify({
                'pageNo': this.pageData.current, 
                'pageSize': this.pageData.pageSize, 
                'ciCode': this.$store.state.userData.cicode , 
                'productScore': '', 
                'searchKey': ''
            })

            // 获取产品分类列表
            this.$api.getProductCommentList( param )
            .then( (res) => {
                console.log(res);
                if(res.data.code == 200){

                    let  data = res.data.content.list ;
                    this.pageData.total = res.data.content.count;
                    this.pageData.current++;

                    for(let item of data){
                        this.commentData.push({
                            createDate: item.createDate,
                            commentDesc: item.commentDesc,
                            commentPicUrl: item.commentPicUrl,
                            productWxProfileUrl: item.productInfo.productProfileUrl,
                            productCode: item.productInfo.productCode,
                            productTitle: item.productInfo.productTitle,
                            productPrice: (item.productPrice).toFixed(2),
                        })
                    }

                    // 加载状态结束
                    this.pageData.loading = false;

                    // 数据全部加载完成
                    if ( this.commentData.length >= this.pageData.total ) {

                        this.pageData.finished = true;
                        if(this.pageData.current == 2){
                            this.$toast('没有更多了！');
                        }

                    }

                    this.not_have = this.commentData.length == 0 ? true : false;

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
                // 获取我的评论
                this.getProductCommentList();
            }, 1000);

        },
        // 查看图片
        // @param imgUrl string 图片地址
        clickImg(imgUrl){
            ImagePreview([imgUrl]);
        }
    },
    mounted(){

        // 头像
        let headImg = this.$store.state.userData.ciProfileUrl;
        this.userHeadUrl =  headImg != null && headImg != undefined && headImg != 'null'? headImg : './static/images/image/my_head.png';

    }
}
</script>

<style>
 
</style>
<style lang="less" scoped>

    @import '../../style/common.less';


    .head_img{
        span{
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            overflow: hidden;
            background-size: cover; 
        }
    }



</style>