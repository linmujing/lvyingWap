<template>

    <div class="" >
      
        
         <!-- 地址列表 -->
         <div class="address_box" v-show="addressData.pageState">
             <div class="address_list" style="margin-bottom: 50px;">

                 <div class="items padding_left_20 border_bottom_1px" v-for="(items,index) in addressList" :key="index">
                     <div class="items_top" style="position:relative;padding: 0.2rem 0;" :style="{paddingRight: addressState == 1 ? '10%' : '0'}">
                        <div class="color_666 line_height_60 font_30 flex space_between margin_right_20" > 
                            <span > {{ items.name }} </span>
                            <span> {{ items.phone }} </span>
                        </div>
                        <div class="color_999 line_height_40 margin_top_20 margin_right_20"> 
                            <input type="text" readonly="readonly" style="border:0;width:6rem;background:rgba(0,0,0,0)"
                                v-model="items.province.label + items.city.label + items.county.label + items.addressDetail">
                        </div>
                        <!-- 选择地址 -->
                        <div class="choose_icon" v-show="addressState == 1" @click="chooseAddressItem(index)">
                            <van-icon name="arrow" style="color:#00aa88;" />
                        </div>

                     </div>
                     <div class="items_bottom flex space_between border_top_1px padding_right_20 font_20" style="height: 1rem;" >
                         <div style="padding-top:0.28rem;position:relative;">
                             <!-- 单选遮罩 -->
                             <div style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:98;" 
                                :style="{ display: items.default ? 'block' :'none'  }"></div>
                             <!-- <van-checkbox  v-model="items.default" @change="listenCheckbox(index)" 
                                :style="{color: items.default ? '#00aa88' : '#ccc'}">设置默认地址</van-checkbox> -->
                         </div>
                         <div class="img_middle" style="padding-top:0.25rem;">
                            <span @click="deleteAddress(index)"  class="margin_right_30" >
                                <van-icon name="delete" color="#ccc" size="0.3rem" /> <i style="color:#ccc;">删除</i>
                            </span>
                            <span @click="aditAddressItem(index)"> 
                                <van-icon name="edit" color="#00aa88"  size="0.3rem" /> <i style="color:#00aa88;">编辑</i> 
                            </span>
                         </div>
                     </div>
                 </div>
             </div>

             <!-- 没有地址 -->
             <div v-if="addressList == 0" style="color:#ccc;text-align:center;">
                 没有任何地址，请添加地址
             </div>

            <!-- 新增收货地址 -->
             <div class="address_add" @click="openAddressModel" >新建收货地址</div>

         </div>


        <!-- 编辑地址   -->
        <div v-show="!addressData.pageState">
            <van-cell-group>
            <van-field
                v-model="addressModelData.name"
                label="收件人"
                placeholder="请输入收件人姓名"
                @click-icon="$toast('question')"
            />

            <van-field
                v-model="addressModelData.phone"
                label="电话号码"
                placeholder="请输入电话号码"
            />

           <van-field
                v-model="addressModelDetail"
                label="地址"
                placeholder="请选择地址"
                is-link
                readonly
                @click="addressModelValue = true"
            />

            <van-field
                v-model="addressModelData.addressDetail"
                label="详细地址"
                placeholder="请输入详细地址"
            />
            </van-cell-group>
            <div class="address_save" @click="addAddressItem" style="width:42%;left:53%;" >保存</div>
            <div class="address_close" @click="addressData.pageState = true" style="background:#ccc;width:42%;">关闭</div>
        </div>

        <!-- 地址选择 -->
        <div class="area_popup" @click="addressModelValue = false"  v-show="addressModelValue">
            <van-popup v-model="addressModelValue" position="bottom" :overlay="false">
                <van-area 
                    :area-list="areaList"
                    @cancel="addressModelValue = false"
                    @confirm="onConfirm"
                 />
            </van-popup>
        </div>

    </div>

</template>
<script>

// 引入地址数据
import areaList from '../../static/js/area/area.js'

export default {

    props:['pState'],

    data() {
        return {

            //  页面状态 0: 地址页面  1：地址选择页面  都可以增删改地址
            addressState: 0,

            /*收货地址数据*/
            addressData:{

                //  删除下标
                deleteModelIndex: 0,
                // 列表页面(true) 或 新增页面(false)
                pageState: true,
                // 收货地址新增或者编辑
                addOrAdit:true

            },
            // 收货地址数据列表
            addressList:[],

            /*编辑地址数据*/
            // 编辑时地址下标
            aditAddressIndex: 0,
            // 收货地址弹框绑定值
            addressModelData:{
                name: '' ,
                phone: '',
                province: { value: '120000', label: '天津市'},
                city: { value: '120100', label: '天津市'},
                county: { value: '120101', label: '和平区'},
                addressDetail: '',
                default: '', 
            },


            /*选择地址弹框数据*/
            // 选择地址 值
            addressModelDetail :'',
            // 地址弹框控制
            addressModelValue : false,
            // 地址列表
            areaList: areaList,

            // 用户信息
            userData: {
                ciCode: this.$store.state.userData.cicode
            },

        }
        
    },
    methods: {

        /*地址列表操作*/
        //  删除地址提示
        deleteAddress(index){

            this.addressData.deleteModelIndex = index ;

            this.$dialog.confirm({
                message: '确定删除该地址吗？'
            }).then(() => {

                // 删除当前地址
                this.deleteAddressData()

            }).catch(() => {
            
            });

        },
        // 选择地址到页面
        chooseAddressItem(index){

            // 将选中的值传递给父组件
            this.$emit('hidebox', this.addressList[index]);

        },

        /**地址编辑和新增**/
        //  新增地址
        addAddressItem(){
            
            // 收货地址弹框绑定值
            let modelData =  this.addressModelData;

            if( modelData.county.label == "" ){ this.$toast('地址填写不完整！'); return ;  };
            if( modelData.name == "" ){ this.$toast('收件人名不能为空'); return ;     }
            if( modelData.phone == "" ){ this.$toast('电话号码不能为空'); return ;     }
            if( modelData.addressDetail == "" ){ this.$toast('地址详情不能为空！'); return ;     }

            this.addAddressData();

            // 关闭地址新增
            this.addressData.pageState = true;

        },
        //  新增打开地址
        openAddressModel(){

            // 清空相关值
            this.addressModelData = {
                name: '' ,
                phone: '',
                province: { value: '', label: ''},
                city: { value: '', label: ''},
                county: { value: '', label: ''},
                addressDetail: '',
                default: '', 
            };

            this.addressModelDetail = "";

            // 打开地址新增
            this.addressData.pageState = false;
        },
        //  编辑打开地址
        aditAddressItem(index){

            // 设置编辑地址
            this.addressData.addOrAdit = false;

            this.aditAddressIndex = index;
    
            let item = this.addressList[index];

            this.addressModelData = {
                name: item.name ,
                phone: item.phone,
                province: item.province,
                city: item.city,
                county: item.county,
                addressDetail: item.addressDetail,
                addressCode: item.addressCode,
                default: item.default , 
            };

            //  地址设置
            this.addressModelDetail = item.province.label +" "+ item.city.label +" "+ item.county.label  ;

            // 打开地址新增
            this.addressData.pageState = false;

        },

        /**地址弹框功能**/
        // 确定
        onConfirm(e){
            // console.log(e)
            // 地址取值
            let arr = e;
            this.addressModelData.province.value = arr[0].code || '';
            this.addressModelData.province.label = arr[0].name || '';
            this.addressModelData.city.value = arr[1].code || '';
            this.addressModelData.city.label = arr[1].name || '';
            this.addressModelData.county.value = arr[2].code || '';
            this.addressModelData.county.label = arr[2].name || '';
            
            let item = this.addressModelData ;
            this.addressModelDetail = item.province.label +" "+ item.city.label +" "+ item.county.label  ;

            // 关闭地址弹框
            this.addressModelValue = false ;

        },

        /**地址数据**/
        // 获取地址列表
        getAddressData(){

            let param = this.$Qs.stringify({ 'pageNo': 1, 'pageSize': 10 ,'ciCode': this.userData.ciCode }) ;
        
            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            this.$api.getAddressList( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content.list , arr = [];

                    for(let i = 0 ; i < data.length; i++){

                        arr.push({
                            addressCode: data[i].addressCode,
                            name:  data[i].addressPersonName,
                            phone:  data[i].addressPhone,
                            province: { value:  data[i].province , label:data[i].province } ,
                            city: { value:  data[i].city , label: data[i].city },
                            county:  { value:  data[i].zone , label: data[i].zone },
                            addressDetail:  data[i].address,
                            isDefalut:  data[i].isDefalut,
                        })

                    }

                    this.addressList = arr;

                    // 全局监听用户地址列表变化
                    this.$store.commit('personCenter/setAddressState', data.length > 0 ? 1 : 0);

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
        // 新增地址
        addAddressData(){

            // 获取弹框数据
            let data = this.addressModelData;
            console.log(data)
            let param = { 
                "ciCode": this.userData.ciCode,
                "addressPersonName":data.name,
                "addressPhone": data.phone,
                "province": data.province.label,
                "zone": data.county.label,
                "city": data.city.label,
                "address": data.addressDetail,
                };

            // 判断是保存还是新增地址
            this.addressData.addOrAdit ? '' : param.addressCode = data.addressCode ;

            console.log(param)

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            this.$api.saveAddress( this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)
                this.$toast.clear();

                if(res.data.code == 200){

                    // 获取用户地址列表
                    this.getAddressData();

                    this.$toast(res.data.message)

                    this.addressModelValue = false;

                    this.addressData.addOrAdit = true;

                }else{

                    this.$toast(res.data.message);

                }  

            })
            .catch((error) => {

                console.log('发生错误！', error);

            });

        },
        // 删除地址
        deleteAddressData(){

            let param = this.$Qs.stringify({ "addressCode":  this.addressList[this.addressData.deleteModelIndex].addressCode }) ;

            this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});

            this.$api.deleteAddress( param )

            .then( (res) => {

                console.log(res)
                this.$toast.clear();

                if(res.data.code == 200){

                    // 获取用户地址列表
                    this.getAddressData();

                    this.$toast('删除成功！')

                }else{

                    this.$toast(res.data.message);

                }

            })
            .catch((error) => {

                console.log('发生错误！', error);

            });

            this.addressData.deleteModel.Value = false ;
        },

        /**辅助函数**/
        // 地区编码获取
        // @param value string 地址名
        // return i string 地址编码
        getAddressCode(value){

            let code = '';
            let area = this.areaList;

            for(let key in area){

                for(let i in arr[key]){

                    if(arr[key][i] == value){

                        return i

                    }

                }
            }
        }

    },
    mounted(){

        // 页面判断
        this.addressState = this.pState;

        // 获取用户地址列表
        this.getAddressData();

    }
}
</script>

<style>
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

    @import '../style/common.less';


    .img_middle{
        *{
            vertical-align: middle;
        }
    }

    // 地址新增按钮样式
    .address_add,.address_close,.address_save{
        position: fixed;
        bottom:20px;
        width: 90%;
        left:5%;
        height: 40px;
        line-height: 40px;
        font-size:  16px;
        text-align: center;
        color: #fff;
        background: #00aa88;
        z-index:99;
        border-radius: 4px;
    }

    // 地址选择弹框样式
    .area_popup{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.2);
        z-index:100;
    }

    // 地址选择
    .choose_icon{
        position:absolute;
        right:0;
        top:0;
        height:100%;
        width:10%;
        text-align:center;
        line-height:1.7rem;
    }
    .choose_icon:hover{
        background: #f5f5f5;
    }


</style>