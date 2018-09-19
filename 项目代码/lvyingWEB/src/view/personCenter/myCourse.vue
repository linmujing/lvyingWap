<template>

    <div class="">

        <!-- 课程列表 -->
        <div class="course_list flex_warp" v-if="courseData.length != 0">

            <div class="items" v-for="(items, index ) in courseData" :key="index">
                <div class="img_box"> 
                    <img :src="items.imgsrc" alt="">
                    <i v-if="items.type != 1" :style="{ backgroundImage: 'url('+ items.typeImg + ')'}"></i>
                </div>
                <div class="line_height_60 text_ellipsis">{{items.title}} </div>
                <div class="flex space_between">
                    <span class="line_height_50 font_20 color_cart_ccc2 ">{{items.auther}}</span>
                    <van-button size="small"  type="primary" >查看详情</van-button>
                </div>
            </div>

        </div>

        <!-- 暂无课程 -->
        <div style="padding-top:3rem; text-align:center; color:#999;" v-if="courseData.length == 0">
            <img style="width:2.5rem;" src="../../../static/images/image/not_have.png" alt="">
            <p>暂无课程</p>
        </div>

    </div>

</template>
<script>

export default {
    components : {

    },
    data() {
        return {

            // 课程数据
            courseData: [
                {
                    type: 1,
                    typeImg: '',
                    title: '我是标题很长',
                    imgsrc:'./static/images/img/class.png',
                    auther: '来源',
                    id:''
                },
                {
                    type: 2,
                    typeImg: './static/images/icon/play_01.png',
                    title: '我是标题很长',
                    imgsrc:'./static/images/img/class.png',
                    auther: '来源',
                    id:''
                },
                                {
                    type: 3,
                    typeImg: './static/images/icon/play_02.png',
                    title: '我是标题很长',
                    imgsrc:'./static/images/img/class.png',
                    auther: '来源',
                    id:''
                },
                {
                    type: 1,
                    typeImg: '',
                    title: '我是标题很长',
                    imgsrc:'./static/images/img/class.png',
                    auther: '来源',
                    id:''
                },
                {
                    type: 2,
                    typeImg: './static/images/icon/play_01.png',
                    title: '我是标题很长',
                    imgsrc:'./static/images/img/class.png',
                    auther: '来源',
                    id:''
                },
                                {
                    type: 3,
                    typeImg: './static/images/icon/play_02.png',
                    title: '我是标题很长',
                    imgsrc:'./static/images/img/class.png',
                    auther: '来源',
                    id:''
                }
            ]
            
        }
        
    },
    methods: {


   

    }
}
</script>

<style>
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

    .course_list{
        
        .items{
            width: 44vw;
            height: 50vw;
            margin-left: 4vw;
            margin-top: 4vw;

            .img_box{
                height: 2.5rem;
                overflow: hidden;
                position: relative;

                img{
                    width: 100%;
                }
                i{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ccc;
                    top: 0;
                    right:0;
                    left:0;
                    bottom:0;
                    margin:auto;
                    background-color: rgba(0,0,0,0.2);
                    background-image: url(../../../static/images/icon/play_01.png);
                    background-repeat: no-repeat;
                    background-position: center;
                }
            }
        }
    }
</style>