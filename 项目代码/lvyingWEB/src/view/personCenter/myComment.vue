<template>

    <div >

        <div class="comment_list" v-if="commentData.length != 0">
            <div class="items" v-for="(items, index) in commentData" :key="index">
                <div class="flex padding_0_20 padding_top_20">
                    <div class="head_img  padding_right_20">
                        <span :style="{ backgroundImage: 'url('+ items.headimg +')' } "></span>
                    </div>
                    <div class="padding_top_30">
                        <div class="color_cart_ccc2">{{items.text}}</div>
                        <span class="color_cart_ccc1 font_20">{{items.time}}</span>
                    </div>
                </div>
                <div class="padding_0_20 line_height_50 padding_bottom_20">
                    {{items.commentText}}
                </div>
                <div v-for= "(item, index2) in items.items" :key="index2">
                    <div class="content flex space_between border_bottom_1px padding_left_20" style="position:relative;background:rgb(250,250,250)">
                        <div class="item table_block" style="height:2.2rem;">
                            <span class="td_block">
                                <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;">
                                    <img  :src="item.imgSrc" alt="">
                                </i>
                            </span>
                            <span class="td_block padding_left_30">
                                <p  class="" style="word-wrap:break-word;">
                                    <span style="position:relative;top:-0.5rem;">{{item.title}}</span>   
                                    <span class="font_20" style="position:absolute;top:1.5rem;left:2.1rem;color:red;">￥  {{item.price}}</span>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div style="padding-top:3rem; text-align:center; color:#999;" v-if="commentData.length == 0">
            <img style="width:2.5rem;" src="../../../static/images/image/not_have.png" alt="">
            <p>暂无评价</p>
        </div>
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
            commentData: [
                {
                    text: '小熊猫',
                    time: '2013-08-24 12:00:00',
                    headimg: '../../../static/images/image/my_head.png',
                    commentText: '这是很多文字的评价，这是很多文字的评价，这是很多文字的评价，这是很多文字的评价，这是很多文字的评价，',
                    items:[
                        {
                            title: '这是商品的标题这是商品的标题这是商品的标题',
                            price: '100.00',
                            imgSrc: '../../../static/images/image/book_01.png',
                        }
                    ]
                },{
                    text: '小熊猫',
                    time: '2013-08-24 12:00:00',
                    headimg: '../../../static/images/image/my_head.png',
                    commentText: '这是很多文字的评价，这是很多文字的评价，这是很多文字的评价，这是很多文字的评价，这是很多文字的评价，',
                    items:[
                        {
                            title: '这是商品的标题这是商品的标题这是商品的标题',
                            price: '100.00',
                            imgSrc: '../../../static/images/image/book_01.png',
                        }
                    ]
                },
            ]

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
            width: 1.26rem;
            height: 1.26rem;
            border-radius: 50%;
            overflow: hidden;
            background-size: cover; 
        }
    }



</style>