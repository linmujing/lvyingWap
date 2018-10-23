<template>

    <div>

        <div v-if="cartList.length">
            <!-- 购物车页面 -->
            <div class="body_bg padding_bottom_30" style="overflow-y:scroll;" :style="{height: windowHeight + 'px'}">

                <!-- 商品种数 -->
                <div class="goods_number padding_0_20 bg_fff flex space_between">
                    <div>共 {{cartList.length}} 门课程</div>
                    <div><span class="color_red" @click="deleteAllItem" >删除选中</span></div>
                 </div>

                <!-- 购物车列表 -->
                <div class="goods_box">
                    <ul class="goods_list">
                        <li class="margin_top_30 bg_fff" v-for="(items,index1) in cartList" :key="index1" >

                            <!-- 单个商品 -->
                            <div  v-if="items.itemType == '1'">
                                <div class="header flex space_between padding_0_20 border_bottom_1px">
                                    <div>
                                        <van-checkbox v-model="items.itemState"   @change="calculatePrice" >{{items.itemTitle}}</van-checkbox>
                                    </div>
                                    <div>
                                        <span class="delete_btn"  @click="deleteAllItem">删除</span>
                                    </div>
                                </div>
                                <ul class="items_list">
                                    <li class="padding_left_20" v-for="(item,index2) in items.items" :key="index2">
                                        <div class="content flex space_between border_bottom_1px" style="position:relative;">
                                            <div class="item table_block">
                                                <span class="td_block"><van-checkbox v-model="item.state" @change="calculatePrice"></van-checkbox></span>
                                                <span class="td_block padding_left_30">
                                                    <i class="img_middle_center img_box border_1">
                                                        <img  :src="item.imgSrc" alt="">
                                                    </i>
                                                </span>
                                                <span class="td_block padding_left_30 ">
                                                    <p  class="" style="word-wrap:break-word;">
                                                        <span style="position:relative;top:-0.6rem;" v-html="item.describe"></span>   
                                                        <span class="font_20" style="position:absolute;top:1.5rem;left:2.6rem;color:red;">￥{{item.price}}</span>
                                                    </p>
                                                </span>
                                            </div>
                                            <div class="item table_block">
                                                <p class="padding_right_20" style="position:absolute;top:1.2rem;right:0">
                                                    <van-stepper v-model="item.num" integer  @change="calculatePrice" />
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="items_total flex flex_end padding_0_20">
                                    <div >小计：￥{{items.itemTotal}}</div>
                                </div>
                            </div>

                            <!-- 组合包商品 -->
                            <div v-else>
                                <div class="header flex space_between padding_0_20 border_bottom_1px">
                                    <div>
                                        <van-checkbox v-model="items.itemState"   @change="calculatePrice" >组合包 {{items.itemTitle}} </van-checkbox>
                                    </div>
                                    <div>
                                        <span class="delete_btn"  @click="deleteCartItemData(items.productCode)">删除</span>
                                    </div>
                                </div>
                                <!-- 平台遍历 -->
                                <div v-for="(item,index2) in items.items" :key="index2">
                                    <div class="padding_left_20 line_height_50">{{item.itemTitle}}</div>
                                    <ul class="items_list">
                                        <li class="padding_left_20" v-for="(child,index3) in item.items" :key="index3">
                                            <div class="content flex space_between border_bottom_1px" style="position:relative;">
                                                <div class="item table_block">
                                                    <span class="td_block" style="width:20px;">&nbsp;</span>
                                                    <span class="td_block padding_left_30">
                                                        <i class="img_middle_center img_box border_1">
                                                            <img  :src="child.imgSrc" alt="">
                                                        </i>
                                                    </span>
                                                    <span class="td_block padding_left_30 ">
                                                        <p  class="" style="word-wrap:break-word;">
                                                            <span style="position:relative;top:-0.6rem;" v-html="child.describe"></span>   
                                                            <span class="font_20" style="position:absolute;top:1.5rem;left:2.6rem;color:red;">￥{{child.price}}</span>
                                                        </p>
                                                    </span>
                                                </div>
                                                <div class="item table_block">
                                                    <p class="padding_right_20" style="position:absolute;top:1.48rem;right:0.5rem">
                                                        ×{{child.num}}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div class="items_total flex flex_end padding_0_20">
                                    <div >小计：￥{{items.itemTotal}}</div>
                                </div>
                            </div>

                        </li>
                    </ul>
                </div>

                <!-- 提交订单 -->
                <div class="submit_cart padding_left_20 flex space_between bg_fff border_top_1px font_30">
                    <div>
                        <van-checkbox v-model="cartDate.listState" @change="setAllCheckboxChange"></van-checkbox>
                    </div>
                    <div class="flex">
                        <span class="submit_total padding_right_20">
                            <p style="padding-top:5px;">实付金额：<span>￥ {{cartDate.listTotal}}</span></p>
                            <input readonly="readonly" value="（若购买享有优惠，相应金额将在订单结算页面扣减）"/>
                        </span>
                        <span class="submit_btn bg_00aa88">去结算</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="img_middle_center"  :style="{ height: windowHeight + 'px' }" v-if="!cartList.length">
            <img  style="height:auto;width:50%;" src="../../../static/images/image/not_goods.png" alt="">
        </div>

        <FooterBar :curIndex = '2'></FooterBar>
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

            //  可用屏幕高度
            windowHeight: document.documentElement.clientHeight - 100,

            /*购物车数据*/
            cartDate:{
                // 全部列表状态
                listState: false,
                // 全部删除状态
                listDeleteState: false,
                // 总价格
                listTotal: 0.00,
            }, 
                        
            //购物车数据列表大列表
            cartList:[] ,
            // 购物车删除多个商品存值
            cartId:'',

            /*购物车列表参数*/
            cartParams:{
                pageNo: 1,
                pageSize: 30,
                dataSize: 0 ,
                ciCode: ''
            }, 

            /*删除提示弹框对象*/
            modelDate:{
                // 删除类型  删除单个 = a  删除选中 = b
                deleteType: 'a',
                // 下标
                index1:0,
            }
        }
        
    },
    methods: {

        // 设置checkbox 全选或取消全选
        setAllCheckboxChange(){

            // 获取全选大列表状态
            let isAll = this.cartDate.listState;

            let n = this.cartList.length;

            for(let i = 0 ; i < n ; i++ ){

                this.cartList[i].itemState = isAll;

                if(this.cartList[i].itemType == '1'){

                    for(let x = 0 ; x < this.cartList[i].items.length; x++ ){

                        this.cartList[i].items[x].state = isAll;

                    }

                }
            }

            // 计算小计与合计
            this.calculatePrice();

        },

        /*购物车数据计算*/    
        // 计算小计与合计
        calculatePrice(){

            //获取商品个数
            let m = this.cartList.length;

            //计算小计
            for(let x = 0 ; x < m ; x++){

                let n = this.cartList[x].items.length;

                if(this.cartList[x].itemType == '1'){

                    //重置小计
                    this.cartList[x].itemTotal = 0;

                    for(let i = 0 ; i < n ; i++){

                        let item = this.cartList[x].items[i];

                        //判断是否选中
                        if(item.state){

                            this.cartList[x].itemTotal += item.num * (item.price * 10000);

                        }

                    }

                    this.cartList[x].itemTotal = (this.cartList[x].itemTotal / 10000).toFixed(2);

                }else{

                    //重置小计
                    this.cartList[x].itemTotal = 0;

                    if(this.cartList[x].itemState){

                        for(let i = 0 ; i < n ; i++){

                            let item = this.cartList[x].items[i];

                            for(let child of item.items){

                                this.cartList[x].itemTotal += child.num * (child.price * 10000);

                            }

                        }

                        this.cartList[x].itemTotal = (this.cartList[x].itemTotal / 10000).toFixed(2);
                    }

                }

            }

            //重置合计
            this.cartDate.listTotal = 0;

            //计算合计
            for(let i = 0 ; i < m ; i++){

                let item = this.cartList[i];

                //判断是否选中
                this.cartDate.listTotal += item.itemTotal *10000;

            }

            this.cartDate.listTotal = (this.cartDate.listTotal / 10000).toFixed(2);

        },

        /*购物车数据删除操作*/
        // 删除所有选中的商品
        deleteAllItem(){

            //获取商品个数
            let m = this.cartList.length;

            //购物车商品编码
            let cartId = '';

            //判断是否有选中
            for(let x = 0 ; x < m ; x++){

                let n = this.cartList[x].items.length;

                //判断是否选中
                if(this.cartList[x].itemType == '2' && this.cartList[x].itemState){

                    cartId =='' ? cartId = this.cartList[x].cartId : cartId +=  ',' + this.cartList[x].cartId ;

                }else{

                    for(let i = 0 ; i < n ; i++){

                        let item = this.cartList[x].items[i];

                        //判断是否选中
                        if(item.state){

                            cartId =='' ? cartId = item.cartId : cartId +=  ',' + item.cartId ;

                        }

                    }

                }

            }

            if(cartId == ''){

                this.$Message.warning('您还没有选择商品！');
                return ;

            }

            this.cartId = cartId;

            this.modelDate.deleteType = 'b';

            this.$dialog.confirm({
                message: '确定清空购物车吗？'
            }).then(() => {

                this.deleteCartItemData(cartId)

            }).catch(() => {
            
            });

        },
        // 弹框确定
        deleteModelOk(){
            
            // a 为删除单个
            if(this.modelDate.deleteType == 'a'){

                //  获取商品下标
                let index1 = this.modelDate.index1; 

                deleteThis(this.cartList[index1].items);

                //  判断小列表是否还有商品,没有就删除
                if(this.cartList[index1].items.length == 0){

                    this.cartList.splice(index1,1);

                }

                //  删除当前选中的商品
                function deleteThis(data){
                   console.log(data)
                    for(let i = 0 ; i < data.length; i++){

                        if(data[i].state){

                            data.splice(i,1);
                            return deleteThis(data);

                        }
                        
                    }
                }

            }else{

                // 获取商品个数
                let m = this.cartList.length;

                // 计算小计
                for(let x = 0 ; x < m ; x++){
    
                    let n = this.cartList[x].items.length;

                    for(let i = 0 ; i < n ; i++){
                        
                        let item = this.cartList[x].items[i];

                        // 判断是否选中
                        if(item.state){

                            // 删除当前商品
                            this.cartList[x].items.splice(i,1);

                            return this.deleteModelOk();
                        } 

                    }

                    // 判断小列表是否还有商品,没有就删除
                    if(this.cartList[x].items.length == 0){

                        this.cartList.splice(x,1);

                        return this.deleteModelOk();

                    }
                    
                }

            }

            // 计算小计与合计
            this.calculatePrice();

        },

        /**数据**/
        // 获取购物车列表
        getCartListData(){

            this.$toast.loading({                 
                mask: true,                
                message: '加载中...'            
            });

            let param = this.$Qs.stringify({ 'pageNo': this.cartParams.pageNo, 'pageSize': this.cartParams.pageSize , 'ciCode': this.cartParams.ciCode }) ;

            this.$api.catGetCartList( param )

            .then( (res) => {
                this.allCount=res.data.content.count;
                console.log(res)

                if(res.data.code == 200){
                  
                    let data = res.data.content.list ;

                    // 购物车商品商户分类
                    let arr = [], merchantArr = [];

                    if (data == null || data.length == 0) { return ;}

                    for(let i = 0 ; i < data.length; i++){

                        // productType 为1时，该商品为单个商品  为2时，商品为组合包
                        if(data[i].productInfo.productType == '1'){

                            // 单个商品
                            let index = merchantArr.indexOf(data[i].merchantInfo.merchantNm) ;

                            if( index == -1  ){

                                merchantArr.push(data[i].merchantInfo.merchantNm);

                                // 压入商户
                                arr.push({
                                    id: '',
                                    itemType: data[i].productInfo.productType ,
                                    itemState: false,
                                    itemTitle: data[i].merchantInfo.merchantNm,
                                    itemTotal: 0.00,
                                    //小列表
                                    items:[]
                                });

                                index = merchantArr.indexOf(data[i].merchantInfo.merchantNm);

                                // 压入商品
                                arr[index].items.push({
                                    cartId: data[i].id,
                                    productCode: data[i].productCode,
                                    state: false,
                                    price: data[i].productInfo.productPrice,
                                    num: 1,//data[i].productInfo.productNum,
                                    productTitle: data[i].productInfo.productTitle,
                                    describe: data[i].productInfo.productDesc,
                                    imgSrc: data[i].productInfo.productProfileUrl
                                })

                            }else{

                                // 压入商品
                                arr[index].items.push({
                                    cartId: data[i].id,
                                    productCode: data[i].productCode,
                                    state: false,
                                    price: data[i].productInfo.productPrice,
                                    num: 1 ,//data[i].productCount,
                                    productTitle: data[i].productInfo.productTitle,
                                    describe: data[i].productInfo.productDesc,
                                    imgSrc: data[i].productInfo.productProfileUrl
                                })

                            }

                        }else{

                            // 组合包商品
                            merchantArr.push(data[i].productCode);

                            // 压入组合包
                            arr.push({
                                id: '',
                                cartId: data[i].id,
                                itemType: data[i].productInfo.productType ,
                                itemState: false,
                                itemTitle: data[i].productInfo.productTitle,
                                itemTotal: 0.00,
                                productCode: data[i].productCode,
                                num: 1,
                                productSubCode: data[i].productInfo.productSubCode,
                                //小列表
                                items:[]
                            });

                        }

                    }

                    // 压入到购物车
                    this.cartList = arr;

                    this.merchantAllArr=merchantArr;

                    // 购物车二次加载 获取组合包的值
                    this.getGroupCartItem()


                }else{

                    this.$toast(res.data.message);

                }

            })
            .catch((error) => {

                console.log('发生错误！', error);

            });


        },

        // 购物车二次加载 获取组合包的值
        getGroupCartItem(){

            // 获取购物车一次加载列表
            let CartList = this.cartList ;

            for(let i = 0; i < CartList.length; i++ ){

                if(CartList[i].itemType == '2'){

                    // 获取组合包商品
                    this.$api.getProductShowCase( this.$Qs.stringify({ 'productCode': CartList[i].productSubCode }) )

                    .then( (res) => {

                        console.log(res)

                        if(res.data.code == 200){

                            let Data = res.data.content ;

                            // 对组合包里的商品进行商户分类
                            let arr2 = [], merchantArr2 = [] ;

                            for(let child of Data){

                                let childIndex = merchantArr2.indexOf(child.merchantCode);

                                if(childIndex == -1){

                                    merchantArr2.push(child.merchantCode);

                                    arr2.push({
                                        id: '',
                                        itemTitle: child.merchantNm,
                                        itemTotal: 0.00,
                                        //小列表
                                        items:[]
                                    })

                                    childIndex = merchantArr2.indexOf(child.merchantCode);

                                    // 压入商品
                                    arr2[childIndex].items.push({
                                        productCode: child.productCode,
                                        price: child.productPrice,
                                        num: 1, //child.productNum,
                                        productTitle: child.productTitle,
                                        describe: child.productDesc,
                                        imgSrc: child.productProfileUrl
                                    })

                                }else{

                                    // 压入商品
                                    arr2[childIndex].items.push({
                                        productCode: child.productCode,
                                        price: child.productPrice,
                                        num: 1,//child.productNum,
                                        productTitle: child.productTitle,
                                        describe: child.productDesc,
                                        imgSrc: child.productProfileUrl
                                    })

                                }

                            }
                            console.log(arr2)

                            CartList[i].items = arr2;

                        }else{

                            this.$toast(res.data.message);

                        }

                    })

                }

            }

           console.log(CartList);

        },

        // 删除购物车商品
        //@param cartId string 购物车商品编号
        deleteCartItemData(cartId){

            this.$toast.loading({                 
                mask: true,                 
                message: '加载中...'             
            });

            let param = this.$Qs.stringify({ 'recordId': cartId }) ;

            this.$api.deleteCart( param )

            .then( (res) => {

                console.log(res)

                

                if(res.data.code == 200){

                    this.$toast(res.data.message);

                    // 获取购物车列表
                    this.getCartListData();

                    this.setAllCheckboxChange();

                }else{

                    this.$toast(res.data.message);

                }

            })
            .catch((error) => {

                
                console.log('发生错误！', error);

            });

            this.modelDate.deleteModelValue = false;

        }
    },
    mounted(){

        // 获取用户cicode
        this.cartParams.ciCode = this.$store.state.userData.cicode ;

        // 获取购物车列表
        this.getCartListData()
    }
}
</script>

<style>
    /* 加减小按钮 */
    .van-stepper__minus, .van-stepper__plus {
        width: 0.42rem;
        height: 0.42rem;
        padding: 0.1rem;
    }
    .van-stepper__input {
        width: 0.48rem;
        height: 0.34rem;
        font-size: 0.26rem;
    }
    .van-stepper__minus {
        border-radius: 2px 0 0 2px;
    }
    /* 弹框样式 */
    .van-dialog__confirm, .van-dialog__confirm:active{
        color: #00aa88;
    }
    .van-button--default{
        color: #A0A0A0;
    }
    .van-dialog__message{
        padding: 0.6rem 0;
        color: #666;
        text-align: center;
    }
    .van-dialog{
        border-radius: 10px;
    }
</style>
<style lang="less" scoped>

    @import '../../style/common.less';

    //  购物车商品数量
    .goods_number{
        height: 1.2rem;
        line-height: 1.2rem;
    }

    //  购物车列表
    .goods_box{
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

    }

    //  提交购物车
    .submit_cart{
        position: fixed;
        z-index: 999;
        bottom: 50px;
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