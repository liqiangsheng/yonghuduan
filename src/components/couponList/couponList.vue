<template>
  <div id="box">
  <!--seach 手动添加卷码 start-->
<!---->
    <search-coupon  :data="exchangeText" :callBackFun="exchange"></search-coupon>

  <!--seach 手动添加卷码 end-->

   	<div class="keep_container margin_top" v-if="!isAlert">
   		<ul>
		    <router-link tag="li" to="/" v-for="(item,index) in dataList" :key="index" :class="{'background_image':item.serviceDiscount.discountState===3}">
						<div class="left">
								<div class="price">￥<span>{{item.serviceDiscount.discountFacevalue}}</span></div>
								<div class="text_content">
                  <p>{{item.serviceDiscount.discountName}}满{{item.serviceDiscount.minimum}}使用</p>
										<p>限期：{{item.serviceDiscount.startTime| moment('YYYY-MM-DD')}}-{{item.serviceDiscount.endTime | moment('YYYY-MM-DD')}}</p>
										<p>范围：{{item.serviceDiscount.areaName}}</p>
								</div>
						</div>
						<div class="right">
              {{item.serviceDiscount.discountState===3?'已过期':'立即使用'}}
						</div>
		    </router-link>
		  </ul>
   	</div>
    <div class="alert margin_top" v-if="isAlert">
      <img src="../../assets/images/wuyouhuij.png" alt="">
      <p>你现在没有可用优惠券哦！</p>
    </div>
  </div>
</template>
<script>
 import {setCookie,getCookie} from "@/js/cookie"
 import {setLocalStorage,removerStorage} from "@/js/session"
 const accomplish = resolve =>require(["./accomplish"],resolve);
 const cancel = resolve =>require(["./cancel"],resolve);
 import {Toast} from "mint-ui";
 import { Indicator } from 'mint-ui';
 import {AFFIRM} from "@/components/savertype/js/isStatus"
 import searchCoupon from "@/components/couponList/searchCoupon"
//已过期暂未解决；

export default {
  components:{
    accomplish,
    cancel,
    searchCoupon
  },
  data () {
    return {
      bool:true,
      j:true,
      isAlert:true,
      exchangeText:{
        value:""
      },
      value:"",
      isShow:true,
    	selected:"1",
      dataList:[],
      lodow:false,
//      sendHttpData:"",
    }
  },
  methods:{
    isAffirm(input){
     return AFFIRM(input);
    },
    sendDetailed(item,index){
      removerStorage("orderDetails");
      setLocalStorage("orderDetails",item);
      this.$store.commit("changeOrder",item);
      this.$router.push({path:"/staymoney"});
    },
// 兑换优惠券 start
    exchange(){
      let value=this.exchangeText.value,currentText,
          url=`${this.$common.apidomain}/userInfoDiscount/bindingVoucherCodeUserInfoDiscount`;
      if(!value){
        this.$Toast("请输入折扣码");
      }else{
        currentText=value.replace(/\s+/g, "");
        this.$http.post(url,{"token":getCookie(),"discountDetailedId":currentText}).then(res=>{
          const data=res.data;
          if(data.code==="0000"){
            this.dataList=[];
            this.getData("0",()=>{
              this.getData("2");
              this.$Toast({
                message: '兑换成功',
                iconClass: 'mintui mintui-success'
              });
            });
            this.exchangeText.value=""
          }else{
            this.$Toast(data.error);
          }
        })
      }
    },
// 兑换优惠券 end
    getData(state,callBack=null){
//  	return;
      this.isAlert=false;
      if(!this.dataList.length){
        this.isAlert=true;
      }
      let token=getCookie();
      if(token){
          let url=`${common.apidomain}/userInfoDiscount/findUserInfoDiscount`;
          this.$http.post(url,{"token":token,"state":state}).then(res=>{
            let data=res.data;
            if(data.code==="0000"){
              this.dataList=this.dataList.concat(data.result);
              Indicator.close();
              this.isShow=true;
              this.isAlert=false;
              if(!!callBack)callBack('2');
              if(this.dataList.length===0)this.isAlert=true;
            }else if(data.code!=="3049"){
              Toast(res.data.error);
            }
            Indicator.close();
          });
        }else{
          Indicator.close();
          this.$store.commit("changeLoginPath",this.$route.path);
          setTimeout(()=>{
            this.$router.push({path:"/login"});
          },1000)
        }
    }
  },
  watch:{

  },
   mounted(){
     document.title="优惠券";

    },
    created(){
//     this.$Toast("折扣码无效，请重试");
     if(window.location.href.indexOf(common.pathDomain)!==-1){
       this.getData("0",()=>{
         this.getData("2");
       });
     }else{
       setTimeout(()=>{
         this.getData("0",()=>{
           this.getData("2");
         });
       },1000)
     }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .alert{
    width:100vw;
    height:85vh;
    text-align: center;

    >img{
      transform:translateY(50%);
      width:380/50rem;
      height: 380/50rem;
    }
    >.accounts{
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      color: #FFFFFF;
      letter-spacing: 0;
      transform:translateY(5.2rem);
      background: #EB5312;
      margin:0 auto;
      border-radius: 4px;
      width:280/50rem;
      line-height: 88/50rem;
      height: 88/50rem;
    }
    >p{
      font-family: PingFangSC-Regular;
      font-size: 28/50rem;
      color: #4A4A4A;
      transform:translateY(4.5rem);
    }
  }

a{
	color:#000;
}
#box{
  font-family: PingFangSC-Regular;
  height:100vh;
  overflow: hidden;
}


.keep_container{
	margin-top:.5rem;
  background:#fff;
  height: 100%;
  padding-top:40/50rem;
  overflow: auto;
  >ul{
  	padding:0 20/50rem;
    padding-bottom:4.5rem;
    >li{
    	margin:20/50rem 0;
      background:url(../../assets/images/youhuiback.png)center center no-repeat;
      background-size:100% 100%;
      width:100%;
   		display: flex;
   		>.left{
   			flex:5;
   			padding-left:43/50rem;
   			>.price{
   				font-family: PingFangSC-Regular;
					font-size: 28/50rem;
					color: #FFFFFF;
					margin-top:40/50rem;
					letter-spacing: 0;
					>span{
						font-size:90/50rem;
					}
   			}
   			>.text_content{
   				margin-top:.2rem;
   				>p:first-of-type{
   					font-size:24/50rem;
   				}
   				>p{
   					color:#fff;
   					line-height:.7rem;
   					font-family: PingFangSC-Regular;
						font-size: 22/50rem;
						color: #FFFFFF;
						letter-spacing: 0;
   				}
   			}
   		}
   		>.right{
   				flex:2;
	   			font-family: PingFangSC-Regular;
					font-size: 32/50rem;
					color: #FFFFFF;
					line-height: 4.6rem;
					letter-spacing: 0;
   		}
    }
    >.background_image{
      background:url(../../assets/images/wang.png)center center no-repeat;
      background-size:100% 100%;
    }
  }
}
  /*支付*/
.defray_content{
  width:100%;
  overflow: hidden;
  padding:14/50rem;
  padding-right:.6rem;
  >.defray_right{
    float:right;
   overflow: hidden;
    position:relative;
    width:12rem;
    >p{
      font-size:22/50rem;
      color:#9B9B9B;
      text-align: right;
      >.defray_price{
        font-size: 28/50rem;
        color: #000;
        letter-spacing: 0;
      }
      >.defray_describe{
        color:#000;
      }

      >.final{
        font-size: 28/50rem;
        color: #EB5312;
        letter-spacing: 0;
      }
    }

   >.defray_bottom{
      background: #EB5312;
      border: 1px solid #EB5312;
     position:absolute;
     right:0;
     bottom:.1rem;
     font-size: 24/50rem;
     color: #FFFFFF;
     letter-spacing: 0;
      border-radius: 28/50rem;
      width:150/50rem;
      text-align: center;
      margin-left:1.2rem;
      float: right;
      line-height: 55/50rem;
      height:56/50rem;
    }
  }
  >.defray_right_Btn{height:120/50rem}
.open_price{
  height:auto;
}
}
.margin_top{
	   margin-top:168/50rem;
}

</style>
