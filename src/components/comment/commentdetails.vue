<template>
    <div id="box">
      <div class="comment_container" v-if="data.coreMainOrderEvaluate.level>=4">
        <div class="img_box">
          <img src="../../../static/images/userImg.png" alt="">
        </div>
        <p class="user_name"></p>
        <p class="job_id">工号：{{data.coreMainOrderEvaluate.masterId}}</p>
        <div class="comment_star">
          <b v-for="(item,index) in 5" :class="{tiny_spot:index+1<=data.coreMainOrderEvaluate.level}"></b>
        </div>
       <div class="describe"></div>
        <!--不满问题-->
        <div class="bottom_status">
          <button class="serve_cause" v-for="(item,index) in list" :key="index">{{item}}</button>
        </div>
        <!--写评论内容-->
        <div class="comment_text" >
          <div>{{data.coreMainOrderEvaluate.content}}</div>
        </div>
        <!--提交后的显示-->
      </div>
      <div class="comment_container" v-else>
        <div class="img_box">
          <img src="../../../static/images/userImg.png" alt="">
        </div>
        <p class="user_name"></p>
        <p class="job_id">工号：{{data.coreMainOrderEvaluate.masterId}}</p>
        <div class="comment_star">
          <span>服务态度</span>
          <div class="start">
            <b v-for="(item,index) in 5" :class="{tiny_spot:index+1<=data.coreMainOrderEvaluate.serviceAttitude}"></b>
          </div>
        </div>
        <div class="comment_star">
          <span>准时到达</span>
          <div class="start">
            <b v-for="(item,index) in 5" :class="{tiny_spot:index+1<=data.coreMainOrderEvaluate.arriveTime}"></b>
          </div>
        </div>
        <div class="comment_star">
          <span>技术能力</span>
          <div class="start">
            <b v-for="(item,index) in 5" :class="{tiny_spot:index+1<=data.coreMainOrderEvaluate.technicalCompetence}"></b>
          </div>
        </div>
        <div class="describe"></div>
        <!--不满问题-->
        <div class="bottom_status" v-if="list.length>=1">
          <button class="serve_cause" v-for="(item,index) in list" :key="index">{{item}}</button>
        </div>
        <!--写评论内容-->
        <div class="comment_text" >
          <div>{{data.coreMainOrderEvaluate.content}}</div>
        </div>
        <!--提交后的显示-->
      </div>
    </div>
</template>
<script>

  import {Toast } from 'mint-ui';
//  import common from "@/js/baseHttp"
  import {getCookie} from "@/js/cookie"
  import {ths,orderStatus,cancel,commonFilter,affirm,Footer,isMaster} from "../savertype/js/isStatus"
  import {getLocalStorage,setSessionQrcodeId,getSessionQrcodeId} from "@/js/session"

    export default {
        data() {
            return {
            list:[],
            data:"",
            }
        },
        methods: {

        },
        created() {
          let k,xiaItem,startDate,type,newDate,shenYu;
          ths(this);
          this.data=this.$store.state.orderDetails;
          //2017-12-28 lee 判断是否有并且是否为空就显示优惠卷
//          if(this.data.order.userInfoDiscountId && this.data.order.userInfoDiscountId!=""){
//            this.coupon_show=false;
//          }else{
//            this.coupon_show=true;
//          }
//          //2017-12-28 lee 判断是待服务和服务中就不显示优惠卷
//          if((this.data.orderState && this.data.orderState=="待服务") || (this.data.orderState && this.data.orderState=="服务中")){
//            this.coupon_show=false;
//          }else{
//            this.coupon_show=true;
//          }
          //lee end
          this.data=getLocalStorage("orderDetails")[0];
          this.serviceBeginTime=this.data.order.serviceBeginTime;
          for( k in this.classTitle){
            if(this.data.order.fLabelBusiness===k){
              this.title=this.classTitle[k];
              break;
            }
          }
          xiaItem=this.data.order.createTime;
          startDate= this.data.order.serviceBeginTime;
          if(startDate){
            this.startDate=startDate;
          }else{
            this.startDate=xiaItem;
          }
          type=this.$route.params.type;
          newDate=new Date()-0;
          shenYu=30*60-(newDate-xiaItem)/60;
          //待付尾款计算方式 start
          if(this.data.order.state==='11'){
            let MaxSumArr=[];
            this.data.services.forEach(v => {
              this.summation += v.price2Original * v.serviceSize;
              MaxSumArr.push(v.price4);
              this.partsPriceSum+=v.price3
            });
            this.heightPirceSum =  Math.max.apply(null, MaxSumArr);
            if(this.data.services[0].isSecondPayment==='1'){
              this.data.services.forEach(v=>{
                this.heightPirce+=v.price2Original+v.price3+v.price4
              })
            }
            //待付尾款计算方式 end
            if(this.data.services[0].isSecondPayment==="1"||true){
              let newArray=[];
              this.data.services.forEach(v=>{
                newArray.push(v.serviceId)
              });


              let url=`${this.$common.apidomain}/userInfoDiscount/findlistDiscountByServiceId`,
                params={"ids":newArray.join(","),"token":getCookie()};
              this.$http.post(url,params).then(res=>{
                let data=res.data;

//               console.log(111,data);

                this.selectorCouponList.push({serviceDiscount:{"discountName":"不使用优惠券","startTime":0,"endTime":0,"discountFacevalue":0}})
                data.code==="0000"?this.selectorCouponList=this.selectorCouponList.concat(data.result):this.selectorCouponList.length=0;
                if(this.data.order.discountId){
                  let discountData=this.data.order,
                    url=`${this.$common.apidomain}/discount/findoneByDiscountId`,
                    params={"discountId":discountData.discountId};
                  this.$http.post(url,params).then(res=>{
                    let data=res.data;
                    if(data.code==="0000"){
                      this.couponText=data.result.discountName;
                      this.userInfoDiscountId=discountData.userInfoDiscountId;
                    }
                  })
                }
              });
            }
          }else{
            if(this.data.services[0].isSecondPayment==='0') {
              this.data.services.forEach(v => {
                this.summation += v.price2Original * v.serviceSize;
              })
            }
          }
          console.log(this.data,"datra11111");
          let str=this.data.coreMainOrderEvaluate.evaluateLabels;
          let arr=str.split(",");
          if(str!=""){
            this.list=arr;
          }

//          console.log(this.list);

        }
    }
</script>

<style scoped lang="less">
  .comment_container{
    padding-top: 80/50rem;
   > .img_box{
     margin:0 auto;
     width:120/50rem;
     height:120/50rem;
     border-radius: 50%;
      >img{
        display: block;
        width:100%;
        height:100%;
      }
    }
    >.user_name{
      font-family: PingFangSC-Regular;
      font-size: 36/50rem;
      color: #4A4A4A;
    }
    >.job_id,.describe,.explain,.user_name{
      text-align: center;
      font-family: PingFangSC-Regular;
      margin-top:10/50rem;
    }
    >.explain{
      font-size: 28/50rem;
      color: #9B9B9B;
    }
    >.describe{
      font-size: 28/50rem;
      color: #EB5312;
    }
    >.job_id{
      font-size: 32/50rem;
      color: #9B9B9B;
    }
    >.comment_star{
      width:470/50rem;
      height:70/50rem;
      display: flex;
      margin:35/50rem auto;
      >b{
        display: inline-block;
        height:100%;
        margin-left:0.4rem;
        background:url(../../../static/images/star2.png) center center no-repeat;
        background-size:100% 100%;
        width:72/50rem;
      }
      > span {
        color: #4A4A4A;
        font-size: 28/50rem;
        line-height: 1.1rem;
        /*margin-left: 2.5rem;*/
      }
      >.start{
        >b{
          display: inline-block;
          height:1rem;
          margin-left:0.4rem;
          background:url(../../../static/images/star2.png) center center no-repeat;
          background-size:100% 100%;
          width:1rem;
        }
        >.tiny_spot{
          background:url(../../../static/images/star1.png) center center no-repeat;
          background-size:100% 100%;
        }
      }
      >.tiny_spot{
        background:url(../../../static/images/star1.png) center center no-repeat;
        background-size:100% 100%;
      }
    }
    >.bottom_status{
      width:100%;
      text-align: center;
      >.serve_cause{
        outline: none;
        background:transparent;
        margin-left:.6rem;
        width:212/50rem;
        margin-top:.6rem;
        height:60/50rem;
        text-align: center;
        border-radius: 30/50rem;
        font-size:28/50rem;
        line-height: .5rem;
        /*text-align: center;*/
      }
      >.successBtn{
        /*margin:0 auto;*/
      }
      .selector{
        border: 1px solid #EB5312;
        color: #EB5312;
      }
    }
    >.successBtn{
      text-align:center;
    }
    .comment_text{
      width:100%;
      padding:.5rem;
      >div{
        word-wrap:break-word;
        width:100%;
        height:250/50rem;
        border:none;
        font-size: 24/50rem;
      }
      >.submit{
        width:100%;
        background: #EB5312;
        border-radius: 8/50rem;
        height:88/50rem;
        border:none;
        margin-top:1rem;
        font-family: PingFangSC-Regular;
        font-size: 32/50rem;
        color: #FFFFFF;
      }
      >.isDisabled{
        background: #F3F3F3;
        color:#9B9B9B;
      }
    }
    .completed{
      font-family: PingFangSC-Regular;
      width:100%;
      color: #4A4A4A;
      padding:1.2rem 1rem;
      >p{
        border-radius: 8/50rem;
        font-size: 24/50rem;
        background:#F3F3F3;
        padding:.2rem .5rem;
      }
    }
  }
#box{
  background:#fff;
  margin-bottom:0;
  height:100vh;
  font-family: PingFangSC-Regular;
}
</style>


