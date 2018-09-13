<template>

    <div>

        <div v-if="cartDate.cartList.length">
            <!-- 购物车页面 -->
            <div class="body_bg padding_bottom_30" style="overflow-y:scroll;" :style="{height: windowHeight + 'px'}">

                <!-- 商品种数 -->
                <div class="goods_number padding_0_20 bg_fff flex space_between">
                    <div>共 {{cartDate.cartList.length}} 门课程</div>
                    <div><span class="color_red" @click="deleteAllItem" >清空</span></div>
                 </div>

                <!-- 购物车列表 -->
                <div class="goods_box">
                    <ul class="goods_list">
                        <li class="margin_top_30 bg_fff" v-for="(items,index1) in cartDate.cartList" :key="index1" >
                            <div class="header flex space_between padding_0_20 border_bottom_1px">
                                <div>
                                    <van-checkbox v-model="items.itemState"   @change="checkboxChange(index1)" >{{items.itemTitle}}</van-checkbox>
                                </div>
                                <div>
                                    <span class="delete_btn"  @click="deleteItem(index1)">删除</span>
                                </div>
                            </div>
                            <ul class="items_list">
                                <li class="padding_left_20" v-for="(item,index2) in items.items" :key="index2">
                                    <div class="content flex space_between border_bottom_1px" style="position:relative;">
                                        <div class="item table_block">
                                            <span class="td_block"><van-checkbox v-model="item.state" @change="checkboxChange(index1,index2)"></van-checkbox></span>
                                            <span class="td_block padding_left_30">
                                                <i class="img_middle_center img_box border_1">
                                                    <img  :src="item.imgSrc" alt="">
                                                </i>
                                            </span>
                                            <span class="td_block padding_left_30 ">
                                                <p  class="" style="word-wrap:break-word;">
                                                    <span>{{item.describe}}</span>    <br>
                                                    <span style="display:inline-block;margin-top:0.1rem;">￥{{item.price}}</span>
                                                </p>
                                            </span>
                                        </div>
                                        <div class="item table_block">
                                            <p class="padding_right_20" style="position:absolute;top:1.2rem;right:0">
                                                <van-stepper v-model="item.num" integer  @change="numberChange(index1,index2)" />
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="items_total flex flex_end padding_0_20">
                                <div >小计：￥{{items.itemTotal}}</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- 提交订单 -->
                <div class="submit_cart padding_left_20 flex space_between bg_fff border_top_1px">
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

        <div class="img_middle_center"  :style="{ height: windowHeight + 'px' }" v-if="!cartDate.cartList.length">
            <img  style="height:auto;width:50%;" src="../../../static/images/image/not_goods.png" alt="">
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
            windowHeight: document.documentElement.clientHeight - 100,

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

        /*加减小组件*/
        // @param index1 购物车大列表下标 
        // @param index2 购物车小列表下标
        numberChange(index1,index2){

            // 计算小计与合计
            this.calculatePrice();

        },
     

        /*checkbox监听*/
        // 商品选择 
        // @param index1 购物车大列表下标 
        // @param index2 购物车小列表下标
        checkboxChange(index1,index2){

            // 监听商品是否选中 || 监听商家店里所有商品是否选中
            if( index2 == undefined){
                
                for(let i = 0 ; i < this.cartDate.cartList[index1].items.length; i++ ){

                    this.cartDate.cartList[index1].items[i].state = this.cartDate.cartList[index1].itemState;

                }

            }

            //  // 计算小计与合计
            this.calculatePrice();

        },
        // 设置checkbox 全选或取消全选
        setAllCheckboxChange(){

            //  获取全选大列表状态
            let isAll = this.cartDate.listState;

            let n = this.cartDate.cartList.length;
            
            for(let i = 0 ; i < n ; i++ ){

                this.cartDate.cartList[i].itemState = isAll;

                for(let x = 0 ; x < this.cartDate.cartList[i].items.length; x++ ){

                    this.cartDate.cartList[i].items[x].state = isAll;

                }
            }

            // 计算小计与合计
            this.calculatePrice();

        },

        /*购物车数据计算*/    
        // 计算小计与合计
        calculatePrice(){

            // 获取商品个数
            let m = this.cartDate.cartList.length;

            // 计算小计
            for(let x = 0 ; x < m ; x++){
  
                let n = this.cartDate.cartList[x].items.length;

                // 重置小计
                this.cartDate.cartList[x].itemTotal = 0;

                for(let i = 0 ; i < n ; i++){
                    
                    let item = this.cartDate.cartList[x].items[i];

                    // 判断是否选中
                    if(item.state){

                        this.cartDate.cartList[x].itemTotal += item.num * (item.price * 10000);

                    } 

                }

                this.cartDate.cartList[x].itemTotal = (this.cartDate.cartList[x].itemTotal / 10000).toFixed(2);

            }

            // 重置合计
            this.cartDate.listTotal = 0;
            
            // 计算合计
            for(let i = 0 ; i < m ; i++){
                
                let item = this.cartDate.cartList[i];

                // 判断是否选中

                this.cartDate.listTotal += item.itemTotal *10000;


            }  

            this.cartDate.listTotal = (this.cartDate.listTotal / 10000).toFixed(2);

        },

        /*购物车数据删除操作*/
        // 删除单个商品
        // @param index1 购物车大列表下标 
        deleteItem(index1){
            
            //  先判断是否已选择商品
            let hasGoods = false;

            for(let i = 0 ; i < this.cartDate.cartList[index1].items.length; i++){

                if(this.cartDate.cartList[index1].items[i].state){

                    hasGoods = true;

                }

            } 

            if(!hasGoods){

                this.$toast('请选择商品！');
                return ;

            }

            this.modelDate.index1 = index1;
            this.modelDate.deleteType = 'a';

            this.$dialog.confirm({
                message: '确定删除购物车中所选商品吗？'
            }).then(() => {

                this.deleteModelOk();

            }).catch(() => {
            
            });

        },  
        // 删除所有选中的商品
        deleteAllItem(){

            this.modelDate.deleteType = 'b';

            this.$dialog.confirm({
                message: '确定清空购物车吗？'
            }).then(() => {

                this.cartDate.cartList = [];

            }).catch(() => {
            
            });

        },
        //  弹框确定
        deleteModelOk(){
            
            // a 为删除单个
            if(this.modelDate.deleteType == 'a'){

                //  获取商品下标
                let index1 = this.modelDate.index1; 

                deleteThis(this.cartDate.cartList[index1].items);

                //  判断小列表是否还有商品,没有就删除
                if(this.cartDate.cartList[index1].items.length == 0){

                    this.cartDate.cartList.splice(index1,1);

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
                let m = this.cartDate.cartList.length;

                // 计算小计
                for(let x = 0 ; x < m ; x++){
    
                    let n = this.cartDate.cartList[x].items.length;

                    for(let i = 0 ; i < n ; i++){
                        
                        let item = this.cartDate.cartList[x].items[i];

                        // 判断是否选中
                        if(item.state){

                            // 删除当前商品
                            this.cartDate.cartList[x].items.splice(i,1);

                            return this.deleteModelOk();
                        } 

                    }

                    // 判断小列表是否还有商品,没有就删除
                    if(this.cartDate.cartList[x].items.length == 0){

                        this.cartDate.cartList.splice(x,1);

                        return this.deleteModelOk();

                    }
                    
                }

            }

            // 计算小计与合计
            this.calculatePrice();

        },

        //  //  去结算页面
        //  goBuy(){

        //      //  去结算页面
        //      this.$router.push({ name: 'submitOrder', params: { type: true} })

        //  }
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