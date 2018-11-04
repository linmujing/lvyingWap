<template>

    <div class="body_bg">

        <div style="overflow-y:scroll;" :style="{height: windowHeight + 'px'}" v-show="!addressData.addressPageShow">

            <!-- 地址 -->
            <div class="color_000 bg_fff line_height_60" >
                <div v-if="addressData.addressList.length != 0">
                    <div class="padding_0_20 flex space_between">
                        <div><span  class="color_cart_ccc1">收货人：</span>  <span>{{addressData.addressList[0].name}}</span></div>
                        <div><span  class="color_cart_ccc1">电话号码：</span> <span>{{addressData.addressList[0].phone}}</span></div>
                    </div>
                    <div class="padding_0_20 flex space_between">
                        <div class="color_cart_ccc1" style="width:1.6rem;">收货地址：</div>
                        <div v-for="(lists,index) in addressData.addressList" :key="index" v-if="index == 0"> 
                            <input type="text" readonly="readonly" style="border:0;width:5.5rem;" 
                            v-model="lists.province.label + lists.city.label + lists.county.label  + lists.addressDetail" />
                            
                        </div>
                    </div>
                    <div class="padding_0_20 flex space_between line_height_94 border_top_1px" @click="addressData.addressPageShow = true">
                        <div style="width:2rem;">修改收货地址</div>
                        <div> <img style="width:0.3rem;position:relative;top:0.06rem;" src="../../../static/images/icon/address_add.png" alt=""></div>
                    </div>
                </div>
                
                <div v-else class="padding_0_20 flex space_between line_height_94 border_top_1px" @click="addressData.addressPageShow = true">
                    <div style="width:2rem;">添加收货地址</div>
                    <div> <img style="width:0.3rem;position:relative;top:0.06rem;" src="../../../static/images/icon/address_add.png" alt=""></div>
                </div>
            </div> 

            <!-- 商品列表 -->
            <div  class="margin_top_30" >
                <!-- 普通商品 -->
                <div v-if="!isGroup">
                    <ul class="goods_list">
                        <li class="bg_fff" v-for="(items,index1) in cartDate.cartList" :key="index1" >
                            <div class="header flex space_between padding_0_20 border_bottom_1px line_height_80">
                                <div>{{items.itemTitle}}</div>
                            </div>
                            <ul class="items_list">
                                <li class="padding_left_20" v-for="(item,index2) in items.items" :key="index2">
                                    <div class="content flex space_between border_bottom_1px" style="position:relative;">
                                        <div class="item table_block">
                                            <span class="td_block padding_left_30">
                                                <i class="img_middle_center img_box border_1">
                                                    <img  :src="item.imgSrc" alt=""  >
                                                </i>
                                            </span>
                                            <span class="td_block padding_left_30 ">
                                                <p  class="" style="word-wrap:break-word;">
                                                    <span style="position:relative;top:-0.6rem;" v-html="item.describe"> </span>   
                                                    <span  style="position:absolute;top:1.5rem;left:2.2rem;color:red;">￥{{item.price}}</span>
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
                            <div class="items_total flex flex_end padding_0_20 line_height_94 color_cart_ccc2">
                                <div >小计：￥{{items.itemTotal}}</div>
                            </div>
                        </li>
                    </ul> 
                </div>

                <!-- 组合包商品 -->
                <div  v-if="isGroup" >
                    <ul class="goods_list" v-for="(lists,index) in cartDate.cartList" :key="index">
                        <li class="padding_0_20 border_bottom_1px line_height_80 bg_fff">组合包</li>
                        <li class="bg_fff" v-for="(items,index1) in lists.items" :key="index1" >
                            <div class="header flex space_between padding_0_20 border_bottom_1px line_height_80 color_cart_ccc1">
                                <div>{{items.itemTitle}}</div>
                            </div>
                            <ul class="items_list">
                                <li class="padding_left_20" v-for="(item,index2) in items.items" :key="index2">
                                    <div class="content flex space_between border_bottom_1px" style="position:relative;">
                                        <div class="item table_block">
                                            <span class="td_block padding_left_30">
                                                <i class="img_middle_center img_box border_1">
                                                    <img  :src="item.imgSrc" :data-productCode="item.productCode"  >
                                                </i>
                                            </span>
                                            <span class="td_block padding_left_30 ">
                                                <p  class="" style="word-wrap:break-word;">
                                                    <span style="position:relative;top:-0.6rem;" v-html="item.describe"> </span>   
                                                    <span  style="position:absolute;top:1.5rem;left:2.2rem;color:red;">￥{{item.price}}</span>
                                                </p>
                                            </span>
                                        </div>
                                        <div class="item table_block">
                                            <p class="color_cart_ccc1" style="position:absolute;top:1.52rem;right:0.2rem">
                                            X {{item.num}}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="items_total flex flex_end padding_0_20 line_height_94 color_cart_ccc2">
                                <div >小计：￥{{items.itemTotal}}</div>
                            </div>
                        </li>
                    </ul> 
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
                <span class="submit_btn bg_00aa88" @click="submitOrderClick">确认订单</span>
            </div>
        </div>

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

export default {
    components : {
    	Address
    },
    data() {
        return {

            //  可用屏幕高度
            windowHeight: document.documentElement.clientHeight - 50,

            /*购物车数据*/
            cartDate:{
                // 全部列表状态
                listState: false,
                // 全部删除状态
                listDeleteState: false,
                // 总价格
                listTotal: 0.00,
                // 大列表
                cartList:[],
            },  

            // 是否为组合包
            isGroup: false,

            /*收货地址数据*/
            addressData:{
                // 地址列表隐藏与展示
                addressPageShow: false,

                // 收货地址数据列表
                addressList:[
                {
                    addressCode: '',
                    name: '',
                    phone: '',
                    province: { value: '' , label:'' } ,
                    city: { value: '' , label: '' },
                    county:  { value: '' , label:'' },
                    addressDetail: '',
                    isDefalut:  '',
                }
                ]

            },

            // 用户信息
            userData: {
                ciCode: this.$store.state.userData.cicode,
                phone: this.$store.state.userData.ciphone,
                name: this.$store.state.userData.ciname
            },

        }
        
    },
    methods: {

        // 监听地址选择
        listenAddressChoose(data){

            this.addressData.addressList = [];
            this.addressData.addressList.push(data);

            this.addressData.addressPageShow = false;

        },

        /*订单数据计算*/    
        // 计算小计与合计
        calculatePrice(){

            // 获取商品个数
            let m = this.cartDate.cartList.length;

            if(!this.isGroup){

                // 计算小计
                for(let x = 0 ; x < m ; x++){
    
                    let n = this.cartDate.cartList[x].items.length;

                    // 重置小计
                    this.cartDate.cartList[x].itemTotal = 0;

                    for(let i = 0 ; i < n ; i++){
                        
                        let item = this.cartDate.cartList[x].items[i];

                        this.cartDate.cartList[x].itemTotal += item.num * (item.price * 10000);

                    }

                    this.cartDate.cartList[x].itemTotal = (this.cartDate.cartList[x].itemTotal / 10000).toFixed(2);

                }

                // 重置合计
                this.cartDate.listTotal = 0;
                
                // 计算合计
                for(let i = 0 ; i < m ; i++){
                    
                    let item = this.cartDate.cartList[i];

                    this.cartDate.listTotal += item.itemTotal *10000;

                }  

            }else{

                // 组合包
                for(let lists of this.cartDate.cartList){

                    for(let items of lists.items){

                        for(let item of items.items){
                            
                            items.itemTotal += item.num * (item.price * 10000);
                        }

                        this.cartDate.listTotal += items.itemTotal;
                        items.itemTotal = (items.itemTotal/10000).toFixed(2);

                    }

                }

            }

            this.cartDate.listTotal = (this.cartDate.listTotal / 10000).toFixed(2);

            this.$toast.clear()

        },

        // 监听地址选择
        listenAddressChoose(data){

            this.addressData.addressList = [];
            this.addressData.addressList.push(data);

            this.addressData.addressPageShow = false;

        },

        /*订单提交 生成订单*/   
        submitOrderClick(){   
            
            if(this.addressData.addressList.length == 0){
                
                this.$toast("请先填写好订单地址！");
                return;

            }

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            let param = this.getOrderParam();
            console.log(param)

            this.$api.addOrderInfo(  this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    // 去结算页面
                    this.$router.push({ path: '/confirmOrder', query: { orderCode: res.data.content} })


                }else{

                    this.$toast(res.data.message);  
                    
                }

                this.$toast.clear()

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            }); 
 
        },
        // 获取创建订单参数
        getOrderParam(){

            let productCodeAndCount = '';

            if(!this.isGroup){

                for(let lists of this.cartDate.cartList){

                    for(let items of lists.items){
    
                            productCodeAndCount +=  productCodeAndCount=='' ? items.productCode + '-'+ items.num : ','+  items.productCode + '-'+ items.num;

                    }

                }
            }else{

                productCodeAndCount =  this.cartDate.cartList[0].productCode + '-'+ this.cartDate.cartList[0].num;

            }

            let param = {
                ciCode: this.userData.ciCode,
                ciName: this.userData.name,
                orderSource: 1,
                orderForm: this.$route.query.sourceType != 'cart' ? 1:0,
                productCodeAndCount: productCodeAndCount,
                addressCode: this.addressData.addressList[0].addressCode,
            }

            return param;
            
        },

        /**获取产品提交订单的数据**/
        // 获取产品详情数据
        getProductDetailData(productCode){

            let isCart = productCode.indexOf('-'), cartCode = productCode , cartNun = 1;

            // 如果是从购物车来的数据
            if(isCart != -1){
                
                cartCode = productCode.split('-')[0];
                cartNun = productCode.split('-')[1];

            }

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0})

            let param = {'productCode': cartCode}

            this.$api.getProductInfo(  this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content , arr = [];

                    // 单个商品
                    if(data.productType != '2'){

                        // 压入商户
                        arr.push({
                            id: '',
                            itemType: data.productType ,
                            itemState: false,
                            itemTitle: data.merchantNm,
                            itemCode: data.merchantCode,
                            itemTotal: 0.00,
                            //小列表
                            items:[]
                        });

                        // 压入商品
                        arr[0].items.push({
                            id: data.id,
                            productCode: data.productCode,
                            state: false,
                            price: data.productPrice,
                            num:  cartNun,
                            name: data.productName,
                            describe: data.productDesc,
                            imgSrc: data.productProfileUrl
                        })

                    }else{

                        // 组合包商品
                        // 压入组合包
                        arr.push({
                            id: '',
                            itemType: data.productType ,
                            itemState: false,
                            itemTitle: data.productTitle,
                            itemTotal: 0.00,
                            productCode: data.productCode,
                            num: cartNun,
                            productSubCode: data.productSubCode,
                            //小列表
                            items:[]
                        });

                        // 是否为组合包
                        this.isGroup = true;

                    }
                    console.log(arr)
                    // 压入到商品列表
                    this.cartDate.cartList = arr;

                    // 判断是否为组合包
                    this.isGroup ? this.getGroupCartItem() : this.calculatePrice();   
                    
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
        },
        // 获取多个产品数据
        getProductCartData(productCode){

            let cartString = productCode.split(','), cartCode = [], cartNun = [], codeStr = '';

            for(let item of cartString){

                cartCode.push(item.split('-')[0]);
                cartNun.push(item.split('-')[1]);
                codeStr += codeStr== '' ? item.split('-')[0] : ',' + item.split('-')[0];
            }

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0})
              
            this.$api.getProductShowCase( this.$Qs.stringify({ 'productCode': codeStr }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let Data = res.data.content ;

                    // 对组合包里的商品进行商户分类
                    let arr2 = [], merchantArr2 = [] ;

                    for(let i = 0 ; i < Data.length; i++){

                        let child = Data[i];

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
                                num: cartNun[i], //child.productNum,
                                productTitle: child.productTitle,
                                describe: child.productDesc,
                                imgSrc: child.productProfileUrl
                            })

                        }else{

                            // 压入商品
                            arr2[childIndex].items.push({
                                productCode: child.productCode,
                                price: child.productPrice,
                                num: cartNun[i],//child.productNum,
                                productTitle: child.productTitle,
                                describe: child.productDesc,
                                imgSrc: child.productProfileUrl
                            })

                        }

                    } 
                    // 压入到商品列表
                    this.cartDate.cartList = arr2;    
                    this.calculatePrice();        
                   
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
        // 组合包数据加载
        getGroupCartItem(){

            // 获取商品列表一次加载列表
            let CartList = this.cartDate.cartList ;

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
    
                            CartList[i].items = arr2;
                            console.log(CartList)

                            this.calculatePrice();
                        
                        }else{

                            this.$toast.clear()

                            this.$toast(res.data.message);

                        }

                    })

                }
      
            }    

           this.cartDate.cartList = CartList;

        },      

        /**数据**/
        // 获取地址列表
        getAddressData(){

            let param = this.$Qs.stringify({ 'pageNo': 1, 'pageSize': 10 ,'ciCode': this.userData.ciCode }) ;

            this.$api.getAddressList( param )

            .then( (res) => {

                //console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content.list , arr = [];

                    if(data.length == 0){ this.addressData.addressList = []; return ;}

                    if(this.addressData.addressList[0].addressCode == ""){

                        arr.push({
                            addressCode: data[0].addressCode,
                            name:  data[0].addressPersonName,
                            phone:  data[0].addressPhone,
                            province: { value: data[0].province, label: data[0].province } ,
                            city: { value: data[0].city, label: data[0].city},
                            county:  { value: data[0].zone, label: data[0].zone },
                            addressDetail:  data[0].address,
                            isDefalut:  data[0].isDefalut,
                        })

                    }else{

                        for(let item of data){

                            if(this.addressData.addressList[0].addressCode == item.addressCode){

                                arr.push({
                                    addressCode: item.addressCode,
                                    name:  item.addressPersonName,
                                    phone:  item.addressPhone,
                                    province: { value: item.province, label: item.province } ,
                                    city: { value: item.city , label: item.city },
                                    county:  { value: item.zone , label: item.zone },
                                    addressDetail:  item.address,
                                    isDefalut:  item.isDefalut,
                                })

                            }

                        }

                    }

                    this.addressData.addressList = arr;

                }else{

                    this.$toast(res.data.message);

                }

            })
            .catch((error) => {

                console.log('发生错误！', error);

            });
        },


    },

    computed: {
        // 监听地址增删， 及时更新地址
        listenAddressList() {  return this.$store.state.personCenter.addressState  }
    },
    watch: {
        // 监听地址增删
        listenAddressList:function (val){  this.getAddressData()  }
    },
    mounted(){

        // 获取用户地址列表
        this.getAddressData();

        // 获取页面数据来源 
        if(this.$route.query.productCode.split(',').length == 1){

            this.getProductDetailData(this.$route.query.productCode);

        }else{

            this.getProductCartData(this.$route.query.productCode);

        }
        

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
        border-radius: 0.04rem 0 0 0.04rem;
    }

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