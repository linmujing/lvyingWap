<template>

    <div class="body_bg font_28" >
        <!-- 去评价 -->
        <div class="order_list" >

            <!-- 订单商品 -->
            <div class="goods_list bg_fff"> 
                <div  >
                    <div class="content flex space_between border_bottom_1px margin_left_20 padding_right_20" style="position:relative;">
                        <div class="item table_block" style="height:2.2rem;">
                            <span class="td_block">
                                <i class="img_middle_center border_1" style="display:inline-block;width: 1.6rem;height: 1.6rem;">
                                    <img  :src="product.imgSrc" alt="">
                                </i>
                            </span>
                            <span class="td_block padding_left_30">
                                <p  class="" style="word-wrap:break-word;">
                                    <span style="position:relative;top:-0.5rem;">{{product.name}}</span>   
                                    <span class="font_20" style="position:absolute;top:1.5rem;left:1.9rem;color:red;">￥  {{product.price}}</span>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 评价信息 -->
            <div class="logistics bg_fff">
                <div class="padding_left_20 margin_top_30 line_height_80 border_bottom_1px">
                   店铺评分
                </div>
                <div class="logistics_item padding_0_20 padding_top_30">
                    <div class="upload_box border_1" >
                        <textarea  style="width:100%;height: 2.85rem; border:0;" name="" id="" ></textarea>
                        <i class="upload flex" style="width:100%;" >

                            <span v-for="(item, index) in uploadList" :key="index" style="display:inline-block;width:0.8rem;height:0.8rem;padding:0;margin-right:0.1rem;position:relative;">
                                <img :src="item" alt="" style="width:0.8rem;height:0.8rem;vertical-align:middle;border-radius:2px;">
                                <i @click="deleteImg(item)"
                                     style="position:absolute;right:0;top:0;background:red;color:#fff;width:0.3rem;height:0.3rem;text-align:center;line-height:0.28rem;border-radius:3px;"
                                    >×</i>
                            </span>
                            
                            <van-uploader :after-read="onRead" accept="jpg/jpeg/png"  >
                                <span style="display:inline-block; width:0.8rem;height:0.8rem;vertical-align:middle;padding:0;text-align:center;border:1px solid #ccc;border-radius:2px;">
                                    <van-icon name="photograph"/>
                                </span>
                                
                            </van-uploader>
                        </i>
                    </div>
                </div>
                <div class="logistics_item flex padding_top_20">
                    <span>描述相符</span>
                    <div style="position:relative;top:0.08rem;"> <van-rate v-model="commentData.gradeValue1" /> </div>
                </div>
                <div class="logistics_item flex">
                    <span>帮助程度</span>
                    <div style="position:relative;top:0.08rem;"> <van-rate v-model="commentData.gradeValue2" /></div>
                </div>
                <div style="text-align: center;padding-top:1rem;">
                    <van-button size="large"  type="primary" style="width:5rem;" @click=" goCommentData">发布</van-button>
                </div>
            </div>
        </div>

    </div>

</template>
<script>

// 获取上传文件接口地址 正式环境
// const BASE_URL = 'http://www.luyingjiaoyu.com/law-web-api/system/file/upload'

// 获取上传文件接口地址 测试环境
const BASE_URL = 'http://114.115.133.96:8899/law-web-api/system/file/upload'

export default {
    components : {

    },
    data() {
        return {

            // 我的评论
            commentData:
            {
                // 评价
                commentRemark:'',
                comnentImg:'',
                // 评分
                gradeValue1:5,
                gradeValue2:5,
                items:[             
                    {
                        title: this.$route.query.productName,
                        imgSrc: this.$route.query.productProfileUrl,
                    }
                ]
            },

            // 图片上传列表
            uploadList: [],

            // 产品信息
            product:{}
            


        }
        
    },
    methods: {     

        // 图片读取
        onRead(file) {

            if(file.file.size > 1073741824){
                this.$toast("图片不能大于10MB!");
                return;
            }

            let arr = file.file.name.split('.');
            arr = (arr[arr.length-1]).toLowerCase();

            if( arr != 'jpg'&& arr != 'png' && arr != 'gif' && arr != 'jpeg'){
                this.$toast("图片格式只能为jpg、png、gif！");
                return;
            }

            if(this.uploadList.length == 3){
                this.$toast("最多只能上传三张图片！");
                return;
            }

            let param = new FormData(); //创建form对象
            param.append('file',file.file,);//通过append向form对象添加数据

            console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进
            
            // 配置很重要
            let config = {
                headers:{'Content-Type':'multipart/form-data', 'Accept': '*/*'}
            };  

            //添加请求头
            this.$axios.post( BASE_URL, param, config)
            .then( res =>{
                if(res.data.code == 200){
                    this.uploadList.push(res.data.content)
                }
            })      

        },
        // 图片删除
        // @param img string 图片
        deleteImg(img){
            this.uploadList.splice(this.uploadList.indexOf(img), 1);
        },

        // 提交评论
        submitComment(){

            this.$dialog.confirm({
                message: '评价成功',
                cancelButtonText: '返回'
            }).then(() => {
                this.$router.go(-1);
            }).catch(() => {
                this.$router.go(-1)
            });

        },

        // 提交评论
        goCommentData(){

            let urlStr = '';

            for(let item of this.uploadList){ urlStr += urlStr == '' ? item.url : ',' + item.url }

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
              
            let param = this.$Qs.stringify({ 
                'ciCode': this.$store.state.userData.cicode , 
                'productCode': this.$route.query.productCode, 
                'orderCode': this.$route.query.orderCode,
                'commentPicUrl': urlStr,
                'commentDesc': this.commentData.commentRemark,
                'helpConsist': this.commentData.gradeValue1,
                'desConsist': this.commentData.gradeValue2,
                }) ;

            this.$api.addComment( param )

            .then( (res) => {

                console.log(res)

                this.$toast.clear();

                if(res.data.code == 200){

                    this.submitComment();
                   
                }else{

                    this.$toast(res.data.message);

                }

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });  
        },

        // 获取产品详情
        getProduct(){

            let param = {'productCode': this.$route.query.productCode}

            this.$api.getProductInfo(  this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content , arr = [];

                    this.product = {
                        productCode: data.productCode,
                        price: data.productPrice,
                        name: data.productName,
                        describe: data.productDesc,
                        imgSrc: data.productProfileUrl
                    }
                    
                    this.$toast.clear();

                }else{

                    this.$toast.clear()
                    this.$toast(res.data.message);  
                    
                }

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });
        }
    },
    mounted(){

        this.getProduct();

    }
}
</script>

<style>
     /* 按钮样式 */
    .van-button{
        border-radius: 0.4rem;
        height: 0.8rem;
        line-height: 1;
        margin-left:0.2rem;
    }
    .van-button--default {
        color: #00AA88;
        background-color: #fff;
        border: 1px solid #00AA88;
    }

    /* 弹框样式 */
    .van-dialog__confirm, .van-dialog__confirm:active{
        color: #00aa88;
    }

    .van-dialog__message{
        padding: 1rem 0;
        color: #666;
        text-align: center;
    }
    .van-dialog{
        border-radius: 10px;
    }
</style>
<style lang="less" scoped>

    @import '../../style/common.less';


    .logistics_item{
        line-height: 0.66rem;
        color: rgb(102,102,102);

        span{
            width: 1.2rem;
            text-align: right;
            padding-right: 0.14rem;
            padding-left: 0.2rem;
            text-align: justify;
            
        }
        >div{
            width: 5.9rem;
        }
    }
    
    .logistics{

        // 图片上传
        .upload_box{
            line-height: 0.6rem;
            width:100%;
            padding: 0 0.2rem 0.5rem 0.2rem ; 
            position:relative;

            .upload{
                position: absolute;
                bottom:0.1rem;
                left:0.2rem;
                width: 100%;
                line-height: 0.8rem;
                background-size: cover; 
                background-position: center center ;
                background-repeat: no-repeat;
            }
        }

    }




</style>