<template>
    <div >
      <div class="alert_cover" ref="isLogin" @click="close" v-if="isLogin.isShow">
        <login-alert class="animated" :class="isLogin.isShow?'fadeIn':'fadeOutDownBig'"  :data="isLogin" :success="success"></login-alert>
      </div>
      <div class="alert_cover" ref="alertInfo" @click="close" v-if="isAlertInfo.isShow">
          <alert-info :data="isAlertInfo"></alert-info>
      </div>
        <div class="box">
          <div class="animated bounce coupon_text_img">
           <p style="animation-delay:1s;" class="animated swing">{{dataObj.discountName?dataObj.discountName:"推荐奖励"}}</p>
          </div>
          <div class="coupon_banner_img">
            <div class="coupon_banner_img_content">
              <h3>{{dataObj.discountFacevalue}}<span class="sub">元</span></h3>
              <div class="content">
                  <p>限{{dataObj.areaName}}使用 <span>满{{dataObj.minimum}}元使用</span></p>
                  <p>期限 : {{dataObj.startTime|moment('YYYY-MM-DD')}}-{{dataObj.endTime|moment('YYYY-MM-DD')}}</p>
              </div>
            </div>
          </div>
          <button class="btn" @click="getCoupon">领取优惠劵</button>
          <footer>
            <p style="line-height: 3em">
          使用说明: 限{{dataObj.areaName}}使用
           </p>
          </footer>
        </div>
    </div>
</template>
<script>
  import loginAlert from "@/components/coupon/components/loginAlert"
  import alertInfo from "@/components/coupon/components/alertInfo"
  import  {getOpenID,getCookie}from "@/js/cookie";

    export default {
    components:{loginAlert,alertInfo},
        data() {
            return {
              isAlertInfo:{
                isShow:false
              },
              dataObj:{},
                isLogin:{
                  isShow:false,
                }
            }
        },
        methods: {
          close(e){
//            if(e.target.className==="alert_cover"){
//              e.target.style.width="0px";
//              e.target.style.height="0px";
//            }
          },
          getCoupon(){
            let token=getCookie();
            if(token){
             this.success(token);
            }else{
              this.isLogin.isShow=true
            }
          },
          success(token){
            let link="/userInfoDiscount/bindingUserInfoFriendDiscount",discountId="";
            if(this.$route.params.id.length>1){
              link="/userInfoDiscount/bindingUserInfoDiscount";
              discountId=this.$route.params.id;
            }
              let url=`${this.$common.apidomain}${link}`;
              this.$http.post(url,{"token":token,"discountId":discountId}).then(res=>{
                let data=res.data;
                if(data.code==="0000"){
                  this.$router.push({path:`/successCoupon/${data.result[0].serviceDiscount.discountFacevalue}`})
                }else if(data.code==="1001"){
                  setTimeout(()=>{
                       this.isLogin.isShow=true
                  },500);
                }else{
                  this.$Toast(data.error);
                  this.$router.push({path:`/successCoupon/0`})
                }
              })
          }
        },
        created() {
          document.title="领取优惠券";
          let link="/discount/findFADiscountState",discountId="";
             if(this.$route.params.id.length>1){
                link="/discount/findoneByDiscountId";
                discountId=this.$route.params.id;
             }
              let url=`${this.$common.apidomain}${link}`;
              this.$http.post(url,{"discountId":discountId,"isBeOverdue":"1"}).then(res=>{
              let data=res.data;
              data.code==="0000"?this.dataObj=data.result:this.$router.push({path:`/successCoupon/0`});
            })

        }
    }
</script>
<style scoped lang="less">
  .box{
      padding-top:10/50rem;
      background:url(../../../static/images/couponback.png) center center no-repeat;
      background-size:100% 100%;
      width:100vw;
      height:100vh+9rem;
    .coupon_text_img{
      background:url(../../../static/images/coupontext.png) center center no-repeat;
      background-size:100% 100%;
      width:574/50rem;
      height:226/50rem;
      margin:0 auto;
      position:relative;
      >p{
        position:absolute;
        font-size: 44/50rem;
        color:#f64601;
        width:100%;
        padding-bottom:.2rem;
        bottom:20/50rem;

        text-align: center;

      }
    }
    >.coupon_banner_img{
      background:url(../../assets/images/banner.png) center center no-repeat;
      background-size:100% 100%;
      width: 609/50rem;
      transform: translateY(-1rem);
      height: 799/50rem;
      margin:0 auto;
      position:relative;
      >.coupon_banner_img_content{
        width:100%;
        height:5rem;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        bottom:3rem;
        /*background:red;*/
        >h3{
          display: inline-block;
          width:100%;
          text-align: center;
          /*position:absolute;*/
          /*left:50%;*/

          /*transform:translateX(-58%);*/
          font-size: 164/50rem;
          color:#fbe954;
          >.sub{
            transform:translateX(0rem);
            font-size:45/50rem;
            display: inline-block;
          }
        }
        >.content{
          position:absolute;
          left:0;
          bottom:-.6rem;
          width:100%;
          height:auto;
          font-family: "MicrosoftYaHei";
          padding-left:3.1rem;
          >p{
            font-size:23/50rem;
            color:#fff;
            position:relative;
            >span{
              position:absolute;
              right:2rem;
              top:-.2rem;
              width:130/50rem;
              height:40/50rem;
              font-size: 18/50rem;
              color:#fff;
              text-align: center;
              border-radius: 4px;
              /*padding:.5rem 1rem;*/
              background:#ffc62b;
            }
          }
        }
      }
    }
    .btn{
      background:url(../../assets/images/btn.png) center center no-repeat;
      background-size:100% 100%;
      width:342/50rem;
      outline: none;
      border:none;
      font-size:42/50rem;
      height: 95/50rem;

      /*line-height: .1rem;*/
      color:#f64601;
      /*font-family: FZY3JW--GB1-0;*/
      margin:0 auto;

      display: block;
    }
    footer{
      >p{
        line-height: .6rem;
        color:#fff;
        font-size: 14/50rem;
        text-align: center;
      }
    }
  }
  .alert_cover{
    overflow: hidden;
    transition:all .3s ease;
    width:100vw;
    height: 100vh+9rem;
    position:absolute;
    left:0;
    right:0;
    z-index: 99;
    background:rgba(0,0,0,.7);
  }
</style>


