<template>

    <div class="mycourse">

        <van-list v-model="pageData.loading" :finished="pageData.finished" @load="onLoad" >
            <div>
                <!-- 课程列表 -->
                <div class="course_list" v-if="courseData.length != 0" style="display: flex;flex-wrap: wrap;">

                    <div class="items" v-for="(items, index ) in courseData" :key="index">
                        <div class="img_box"> 
                            <img :src="items.imgSrc"  v-lazy="items.imgSrc" @click="$router.push({ path: '/falvDetail', query: { productCode: items.productCode }})">
                            <!-- <i v-if="items.type != 1" :style="{ backgroundImage: 'url('+ items.typeImg + ')'}"></i> -->
                        </div>
                        <div class="line_height_60 text_ellipsis">{{items.title}} </div>
                        <div class="flex space_between">
                            <span class="line_height_50 font_20 color_cart_ccc2 ">{{items.source}}</span>
                            <van-button size="small"  type="primary" >查看详情</van-button>
                        </div>
                    </div>

                </div>
            </div>
        </van-list>

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
            courseData: [],
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

        // 获取我的课程
        getMyCourse(){

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let pageNo = this.pageData.current;
            let pageSize = this.pageData.pageSize;
            let ciCode = this.$store.state.userData.cicode;
            let param = this.$Qs.stringify({pageNo,pageSize,ciCode})

            this.$api.getmyCourseList(param).then((res)=>{

                console.log(res);

                if(res.data.code == 200){

                    let  data = res.data.content.list, arr= [];
                    this.pageData.total = res.data.content.count;
                    this.pageData.current++;

                    for(let item of data){
                        this.courseData.push({
                            title: item.productName,
                            type: '0',
                            productCode: item.productCode,
                            source: item.merchantNm,
                            imgSrc: item.productProfileUrl,
                        })
                    }

                    // 加载状态结束
                    this.pageData.loading = false;

                    // 数据全部加载完成
                    if ( this.courseData.length >= this.pageData.total ) {

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
                this.$toast('加载失败,请刷新重试!');
                console.log('发生错误！', error);
            });

        },
        // 加载更多
        onLoad() {

            // 异步更新数据
            setTimeout(() => {

                // 获取我的课程
                this.getMyCourse();

            }, 1000);

        },


    },
    mounted(){


    }
}
</script>

<style>
    /* 按钮样式 */
    .mycourse .van-button{
        border-radius: 0.4rem;
        height: 0.5rem;
        line-height: 1;
        margin-left:0.2rem;
    }
    .mycourse .van-button--default {
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
                    height: 2.5rem;
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