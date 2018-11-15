<template>
    <div class="body_bg">
    	<div>
        <!--轮播-->
        <div>
          <van-swipe :autoplay="4000">
            <van-swipe-item v-for="(item,index) in banner" :key="index">
              <img :src="item.src" class="all_width"/>
            </van-swipe-item>
          </van-swipe>
        </div>

        <!--搜索-->
			  	<div class="bg_fff">
			  		<van-row>
					  <van-col span="20">
					  	<div class="search_box">
			  				<input v-model="searchval" type="text" placeholder="视频/音频/合同"/>
			  				<button @click="onSearch">
			  					<van-icon name="search" color="#fff" size="16px"/>
			  				</button>
			  			</div>
					  </van-col>
					  <van-col span="4">
					  	<div class="scan">
					  		<img src="../../../static/images/icon/sao.png" width="30"/>
					  	</div>
					  </van-col>
					</van-row>
			  	</div>
			  	<!--视频课程-->
			  	<div>
            <div class="div_line"></div>
			  		<div class="padding_10 bg_fff">
			  			<van-row>
						  <van-col span="18">
						  	<span class="title">视频课程</span>
						  </van-col>
						  <van-col span="6">
						  	<div class="more" @click="moreList(3,'视频课程')">
                  <span>查看更多》</span>
						  	</div>
						  </van-col>
						</van-row>
			  		</div>
			  		<div v-for="item in videoArr" class="padding_10 bg_fff">
			  			<van-row>
						  <van-col span="10">
						  	<div @click="toDetail(item.productCode,3)">
						  		<img :src="item.productProfileUrl" class="all_width height_110px"/>
						  	</div>
						  </van-col>
						  <van-col span="14">
						  	<div class="class_box">
						  		<div class="title van-ellipsis">{{item.productTitle}}</div>
						  		<div class="van-ellipsis margin_top_5 color_666">{{item.productKeyWord}}</div>
						  		<div class="margin_top_10">
						  			<van-row>
							  			<van-col span="12">
							  				<span class="color_title font_16">￥{{item.productPrice}}</span>
							  			</van-col>
							  			<van-col span="12">
							  				<div class="more"><span>{{item.lookCount}}人看过</span></div>
							  			</van-col>
							  		</van-row>
						  		</div>
						  		<div class="margin_top_10">
                    <van-row>
                      <van-col span="6">
                        <div class="flex_warp van-ellipsis" @click="toDetail(item.productCode,3)">
                          <van-icon name="password-view" style="font-size: 0.3rem;margin-right: 0.05rem"/>
                          <span class="font_12 color_666">试看</span>
                        </div>
                      </van-col>
                      <van-col span="16" offset="2">
                        <div class="juc_around">
                          <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                            <van-icon name="cart" size="16px" color="#fff" />
                          </button>
                          <button class="btn_title van-ellipsis"  @click="goBuy(item.productCode)">立即购买</button>
                        </div>
                      </van-col>
                    </van-row>
						  		</div>
						  	</div>
						  </van-col>
						</van-row>
			  		</div>
			  	</div>
          <!--音频课程-->
          <div>
            <div class="div_line"></div>
            <div class="padding_10 bg_fff">
              <van-row>
                <van-col span="18">
                  <span class="title">音频课程</span>
                </van-col>
                <van-col span="6">
                  <div class="more" @click="moreList(4,'音频课程')">
                    <span>查看更多》</span>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div v-for="item in musicArr" class="padding_10 bg_fff">
              <van-row>
                <van-col span="10">
                  <div @click="toDetail(item.productCode,4)">
                    <img :src="item.productProfileUrl" class="all_width height_110px"/>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="class_box">
                    <div class="title van-ellipsis">{{item.productTitle}}</div>
                    <div class="van-ellipsis margin_top_5 color_666">{{item.productKeyWord}}</div>
                    <div class="margin_top_10">
                      <van-row>
                        <van-col span="12">
                          <span class="color_title font_16">￥{{item.productPrice}}</span>
                        </van-col>
                        <van-col span="12">
                          <div class="more"><span>{{item.lookCount}}人看过</span></div>
                        </van-col>
                      </van-row>
                    </div>
                    <div class="margin_top_10">
                      <van-row>
                        <van-col span="6">
                          <div class="flex_warp van-ellipsis" @click="toDetail(item.productCode,4)">
                            <img src="../../../static/images/icon/headset.png" width="18" height="16"/>
                            <span class="font_12 color_666">试听</span>
                          </div>
                        </van-col>
                        <van-col span="16" offset="2">
                          <div class="juc_around">
                            <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                              <van-icon name="cart" size="16px" color="#fff" />
                            </button>
                            <button class="btn_title van-ellipsis" @click="goBuy(item.productCode)">立即购买</button>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
			  	<!--广告-->
          <div v-show="bgUrl">
            <img :src="bgUrl" class="all_width height_110px"/>
          </div>
          <!--行业动态-->
          <div>
            <div class="padding_10 bg_fff">
              <van-row>
                <van-col span="18">
                  <span class="title">行业动态管控</span>
                </van-col>
                <van-col span="6">
                  <div class="more" @click="moreList(1, '行业动态管控')">
                    <span>查看更多》</span>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div v-for="item in careerArr" class="padding_10 bg_fff">
              <van-row>
                <van-col span="10">
                  <div @click="toDetail(item.productCode,1)">
                    <img :src="item.productProfileUrl" class="all_width height_110px"/>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="class_box">
                    <div class="title van-ellipsis">{{item.productTitle}}</div>
                    <div class="van-ellipsis margin_top_5 color_666">{{item.productKeyWord}}</div>
                    <div class="margin_top_10">
                      <van-row>
                        <van-col span="12">
                          <span class="color_title font_16">￥{{item.productPrice}}</span>
                        </van-col>
                        <van-col span="12">
                          <div class="more"><span>{{item.lookCount}}人看过</span></div>
                        </van-col>
                      </van-row>
                    </div>
                    <div class="margin_top_10">
                      <div class="juc_center_between">
                        <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                          <van-icon name="cart" size="16px" color="#fff" />
                        </button>
                        <button class="btn_title"  @click="goBuy(item.productCode)">立即购买</button>
                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
          <!--法律动态-->
          <div>
            <div class="div_line"></div>
            <div class="padding_10 bg_fff">
              <van-row>
                <van-col span="18">
                  <span class="title">法律动态管控</span>
                </van-col>
                <van-col span="6">
                  <div class="more" @click="moreList(2, '法律动态管控')">
                    <span>查看更多》</span>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div v-for="item in logicArr" class="padding_10 bg_fff">
              <van-row>
                <van-col span="10">
                  <div @click="toDetail(item.productCode,2)">
                    <img :src="item.productProfileUrl" class="all_width height_110px"/>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="class_box">
                    <div class="title van-ellipsis">{{item.productTitle}}</div>
                    <div class="van-ellipsis margin_top_5 color_666">{{item.productKeyWord}}</div>
                    <div class="margin_top_10">
                      <van-row>
                        <van-col span="12">
                          <span class="color_title font_16">￥{{item.productPrice}}</span>
                        </van-col>
                        <van-col span="12">
                          <div class="more"><span>{{item.lookCount}}人看过</span></div>
                        </van-col>
                      </van-row>
                    </div>
                    <div class="margin_top_10">
                      <div class="juc_center_between">
                        <button class="btn_warning width_40px align_center juc_center" @click="addProductCart(item.productCode)">
                          <van-icon name="cart" size="16px" color="#fff" />
                        </button>
                        <button class="btn_title" @click="goBuy(item.productCode)">立即购买</button>
                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
          <!--广告-->
          <div >
            <img src="../../../static/images/img/ad-02.png" class="all_width"/>
          </div>
          <!--律瀛商城-->
          <div>
            <div class="padding_10 bg_fff">
              <van-row>
                <van-col span="18">
                  <span class="title">律瀛商城</span>
                </van-col>
                <van-col span="6">
                  <div class="more" @click="moreList(5, '律瀛商城')">
                    <span>查看更多》</span>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class="juc_wrap_between bg_fff padding_20">
              <div v-for="item in lvyingArr" class="width_45 border_999 margin_bottom_20 padding_10 box_sizing">
                <div @click="toDetail(item.productCode,5)">
                  <img :src="item.productProfileUrl" class="all_width height_110px"/>
                </div>
                <div class="van-ellipsis margin_top_5 title">{{item.productTitle}}</div>
                <div class="van-ellipsis margin_top_5 color_666">{{item.productKeyWord}}</div>
                <div class="juc_between align_center margin_top_10">
                  <span class="color_title font_16 van-ellipsis">￥{{item.productPrice}}</span>
                  <button class="btn_title van-ellipsis"  @click="goBuy(item.productCode)">立即购买</button>
                </div>
              </div>
            </div>
          </div>

    	</div>

    </div>
</template>
<script>
export default {
    components : {

    },
    data() {
        return {
          videoArr:[],
          musicArr:[],
          careerArr:[],
          logicArr:[],
          lvyingArr:[],
          banner: [],
          bgUrl: '',
          value: 0,
          searchval: ''
        }

    },
    mounted(){
      this.getNavTitle()
      this.getCaseProduct()
    },
    methods: {
      // 搜索
    	onSearch(){
    	  console.log(this.searchval)
        this.$router.push({
          path:'/searchList',
          query: {
            searchVal: this.searchval
          }
        })
    	},
      //获取橱窗对象
      getCaseProduct(){
        this.$toast.loading({ mask: true, message: '加载中...' , duration: 0});
        this.$api.getProductShowCaseList(this.$Qs.stringify({appType:2, pageLocat: 1})).then((res)=>{
          console.log(res)
          if(res.data.code == 200){

            this.$toast.clear();
            let {content}=res.data;
            // 保存轮播数据
            if(!res.data.content[6].caseUrl == '' || !res.data.content[6].caseUrl == null || !res.data.content[6].caseUrl == undefined){
              this.banner = eval(res.data.content[6].caseUrl)
            }
            if(!res.data.content[3].caseUrl == '' || !res.data.content[3].caseUrl == null || !res.data.content[3].caseUrl == undefined){
              var bgUrl = eval(res.data.content[3].caseUrl)
              this.bgUrl = bgUrl[0].src
            }
            sessionStorage.setItem("Banner", JSON.stringify(eval(res.data.content[6].caseUrl)));
            for(let item of content){
              if(item.caseName=="视频推荐"){
                this.getProductShowCase(item.productCode, item.productSortBy, 1)
              }else if(item.caseName=="音频推荐"){
                this.getProductShowCase(item.productCode, item.productSortBy, 2)
              }else if(item.caseName=="行业动态管控"){
                this.getProductShowCase(item.productCode, item.productSortBy, 3)
              }else if(item.caseName=="法律动态管控"){
                this.getProductShowCase(item.productCode, item.productSortBy, 4)
              }else if(item.caseName=="律赢商城" || item.caseName=="律瀛商城"){
                this.getProductShowCase(item.productCode, item.productSortBy, 5)
              }
            }
          }else{
            this.$toast.clear();
            this.$toast.fail(res.data.message);
          }
        })
          .catch((error) => {
            this.$toast.clear();
            console.log('发生错误！', error);
          });
      },
      //获取推荐商品
      getProductShowCase(productCode, productSortBy, type){
        var params = this.$Qs.stringify({'productCode': productCode, 'productSortBy': productSortBy})
        this.$api.getProductShowCase( params )

          .then( (res) => {

            if(res.data.code == 200){

              switch (type) {
                case 1:
                  this.videoArr = res.data.content
                  break
                case 2:
                  this.musicArr = res.data.content
                  break
                case 3:
                  this.careerArr = res.data.content
                  break
                case 4:
                  this.logicArr = res.data.content
                  break
                case 5:
                  this.lvyingArr = res.data.content
                  break
              }

            }else{

              this.$toast.fail(res.data.message);

            }
          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // 获取导航标题
      getNavTitle(){
        this.$api.getProductCatList( this.$Qs.stringify({'parentId': '0'}) )

          .then( (res) => {

            if(res.data.code == 200){
              this.navDataModel = res.data.content
              // 导航标题信息
              sessionStorage.setItem("NavTitle", JSON.stringify(res.data.content));

            }else{

              this.$toast.fail(res.data.message);

            }
          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // 查看更多
      moreList(id,name){
        this.$router.push({
          path:'/dynamicList',
          query: {
            id: id,
            typeId: id,
            name: name
          }
        })
      },
      // 跳转到详情
      toDetail(code,id){
        this.$router.push({
          path:'/falvDetail',
          query: {
            typeId: id,
            productCode: code
          }
        })
      },

      /** 数据 **/
      // 添加商品到购物车 MT
      addProductCart(code){
        if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
          this.$toast('您还没有登录，请登录后再尝试！');
          return ;
        }
        let param = {
          ciCode:this.$store.state.userData.cicode,
          productCode: code,
          productCount:1
        }
        // 存储商品信息
        this.$store.commit('cart/addToCart', param);
        this.$store.dispatch('cart/addCartTo', param);
      },
      // 立即购买
      goBuy(code){
        if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
          this.$toast('您还没有登录，请登录后再尝试！');
          return ;
        }
        // 页面跳转
        this.$router.push({
          path:'/submitOrder',
          query: {
            productCode: code
          }
        })
      }
    }
}
</script>
<style scoped lang='less'>
 	/*引入共用less文件*/
    @import './shopMall.less';

   	/*搜索框*/
	.search_box{
		margin: 0.2rem;
		padding: 0.05rem;
		border: 1px solid #D8D8D8;
		border-radius: 0.4rem;
		position: relative;
		input{
			border: none;
			width: 80%;
			padding: 0.12rem;
			border-radius: 0.4rem;
		}
		button{
			position: absolute;
			top: 0;
			right: 0;
			border: 1px solid #00AA88;
			border-radius: 0 0.4rem 0.4rem 0;
			width: 15%;
			height: 100%;
			background: #00AA88;
		}
	}
	/*扫一扫*/
	.scan{
		margin: 0.25rem 0.2rem 0.2rem 0.2rem;
		text-align: right;
	}
</style>
