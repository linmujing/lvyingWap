<template>

    <div class="" >
      
         <!-- 地址列表 -->
         <div class="address_box">
             <div class="address_list">

                 <div class="items flex space_between margin_left_20 padding_right_20 border_bottom_1px" style="padding:0.2rem">
                     <div class="items_left flex">
                         <div class="" style="line-height: 1.8rem; padding: 0 0.4rem 0 0.2rem; ">
                            <van-checkbox v-model="checked"></van-checkbox>
                         </div>
                         <div class="">
                             <div class="color_666 line_height_60 font_30" > <span class="padding_right_30">大兄弟</span>   15678524552</div>
                             <div class="color_666 line_height_40">湖南省长沙市芙蓉区芙蓉大道建设八一路口32号湖南省长沙市芙蓉区芙蓉大道建设八一路口32号</div>
                         </div>
                     </div>
                     <div class="items_right padding_right_20">
                         <div style="padding-top:0.3rem;">
                             <van-icon name="delete" color="#ccc" size="0.36rem" />
                         </div>
                         <div style="padding-top:0.6rem;">
                             <van-icon name="edit" color="#00aa88"  size="0.36rem" />
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         <!-- 编辑地址   -->
         <!-- <div>
             <van-address-edit
                :area-list="areaList"
                show-postal
                show-set-default
                show-search-result
                :search-result="searchResult"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
                />
         </div> -->
    </div>

</template>
<script>

export default {

    props:['pState'],

    data() {
        return {
            checked:'',

            areaList,
            searchResult: []

        }
        
    },
    methods: {

        onSave() {
            
        },
        onDelete() {
        
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [{
                name: '黄龙万科中心',
                address: '杭州市西湖区'
                }];
            } else {
                this.searchResult = [];
            }
        }

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

</style>
<style lang="less" scoped>

    @import '../style/common.less';

    // 地址列表
    .address_list{
        .items{
            height: 2.2rem;

            .items_left{
                width: 80%;
            }
            .items_right{
                width: 20%;
                text-align: right;
            }
        }
    }






</style>