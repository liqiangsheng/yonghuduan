<template>
    <div id="box" ref="box" :style="isAlert1||isAlert?'height:100vh;overflow: hidden;':'height:auto'">
      <div id="tetailed_box">
      <div class="title">
        {{data.orderState}}
        <div v-if="ordrerState(data.order.state)&&surplusMinute>0">
          <p class="surplus_tate" v-if="data.order.state=='01'">
            剩余{{surplusMinute}}分钟自动关闭
          </p>
          <p class="surplus_tate" v-else v-show="master(data.order.state)"> 维修师傅：{{data.order.master}} 工号：{{data.order.masterId}}</p>
        </div>
      </div>
      <!--师傅位置-->
      <!--师傅位置end-->
      <div class="info saver_title_list">
          <div class="saver_type">
            <div class="saver_title">
              服务类别：
            </div>
            <p class="text">{{title}}</p>
          </div>
        <div class="saver_type">
            <div class="saver_title">
              服务时间：
            </div>
            <p class="text">{{data.order.appointmentDatetime | moment('YYYY-MM-DD HH:mm:ss')}}</p>
          </div>
        <div class="saver_type">
            <div class="saver_title">
              服务地址：
            </div>
            <p class="text">{{data.order.linkmanDetails}}</p>
          </div>
        <div class="saver_type">
          <div class="saver_title">
            联系人：
          </div>
          <p class="text">{{data.order.linkmanName}}</p>
        </div>
        <div class="saver_type">
            <div class="saver_title">
              联系电话：
            </div>
            <p class="text">{{data.order.linkmanPhoneNum}}</p>
          </div>
        <div class="saver_type">
          <div class="saver_title">
            备注信息：
          </div>
          <p class="text">{{data.coreMainOrderExceptionRecord?data.coreMainOrderExceptionRecord.remark:""}}</p>
        </div>
      </div>
      <div v-if="data.coreMainOrderEvaluate" class="info" style="margin-top: 0.5rem;display: flex;justify-content:space-around;align-items: center" @click="todetail">
        <div>
          <b v-for="(item,index) in 5" :key="index" class="b" :class="{tiny_spot:index+1<=data.coreMainOrderEvaluate.level}"></b>
        </div>
        <div class="box_pl">
          <p style="font-size:0.56rem;color:#9B9B9B;">查看评价</p>
          <b class="right_arrow"></b>
        </div>
      </div>

      <!--已完成-->
      <div class="keep_container">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" v-for="(item,index) in data.services">
            <p class="cause_top">
              <span class="cause_type">{{item.serviceFullName}}</span>
            </p>
            <p class="cause">
              <span class="cause_name" v-text="item.serviceTags" v-if="item.serviceTags!='null'">
              </span>
              <span class="sum" style="font-size:0.6rem">
                <span v-if="data.order.state==='11'"
                	 class="getSum"
                	 style="font-size:.56rem;display: block;color:#000;transform:translateY(-100%);">￥{{(item.price2Original + data.order.price1)|floating}}</span>
                <span style="display: block;color:#000;transform:translateY(-100%);"
                 v-else v-show="item.isSecondPayment==='0'||data.order.state==='11'">￥{{item.isSecondPayment==='0'?item.price2Sale:item.price2Sale}}</span>
                <del style="display: block" v-if="item.isSecondPayment==='0'||data.order.state==='11'"> ￥{{item.price2Original}}</del>
                x{{item.serviceSize}}
              </span>
            </p>
          </li>
        </ul>
        <div class="defray_content">
          <div class="defray_right open_price">
            <p v-if="data.order.price1">
              <del v-if="isDelLine(data.order.state,data.order.price1)">检测费</del>
              <span style="float:none;" v-else>检测费</span>
              <del style="float:right;" class="defray_price" v-if="isDelLine(data.order.state,data.order.price1)">￥ {{data.order.price1}}</del>
              <span  class="defray_price" v-else>￥ {{data.order.price1}}</span>
            </p>

<!--配件费列表 start-->
            <p v-for="(item,index) in partsList" v-if="item.is" :class="item.className">
              {{item.name}}
              <span class="defray_price" >￥{{item.value | floating}}</span>
            </p>
<!--配件费列表 start-->

            <p class="line"></p>
            <p class="preferential_price" style="color:#9B9B9B"  v-show="data.serviceDiscount">
              {{data.serviceDiscount?data.serviceDiscount.discountName:""}}
              <span class="defray_price" style="color:#9B9B9B">-￥{{data.order.discountPrice?data.order.discountPrice:""}}</span>
            </p>
            <p class="preferential_price"  v-show="data.serviceTotalCreditAmount&&isTotal(data.order.state,data.services[0].isSecondPayment)">
              优惠金额
              <span class="defray_price" >-￥{{data.serviceTotalCreditAmount}}</span>
            </p>
            <p class="preferential_price"  v-if="data.order.cashbackAmount">
              已返现
              <span class="defray_price" >-￥{{data.order.cashbackAmount }}</span>
            </p>
            <p class="preferential_price"  v-if="data.serviceTotalPay!=0&&data.serviceTotalPay!==undefined">
              已付款
              <span class="defray_price should"><b v-if="data.order.state=='11'">-</b>￥{{data.serviceTotalPay}}</span>
            </p>
            <p class="preferential_price"  v-if="data.serviceTotalRefund">
              已退款
              <span class="defray_price">￥{{data.serviceTotalRefund}}</span>
            </p>
            <p class="preferential_price " v-if="data.serviceTotalWaitPay&&data.order.state!='12'">
            应付款
              <span class="defray_price should">￥{{data.serviceTotalWaitPay.toFixed(2)}}</span>
            </p>
          </div>
          <!--优惠券 start  -->

          <!--优惠券 end  -->
        </div>
        <div @click="isAlert1Fun" class="location_box serve_box_date coupon" v-if="selectorCouponList.length>0">
        <!--<div @click="isAlert1Fun" class="location_box serve_box_date coupon" v-if="coupon_show">-->
          <b class="position_icon tate"></b>
          <div class="content">
            <p>{{couponText}}  &nbsp;&nbsp;&nbsp; <span v-if="discountFacevalue">省￥{{discountFacevalue}}元</span></p>
          </div>
          <b style=""></b>
        </div>
      </div>
      <div class="identifier">
        <p>订单编号：{{data.order.id}}</p>
        <p> 下单时间：{{data.order.createTime | moment('YYYY-MM-DD HH:mm:ss')}} </p>
      </div>
      <!--结算和评价-->
         <div class="footer staymoney" v-if="isFooter(data.order.state)">
           <a class="accounts_btn"
           	  @click="comment(data.order)"
           	  href="javascript:;"
           	  v-if="isCommon(data.order.state,data)&&!data.coreMainOrderEvaluate">去评价</a>
              <a class="accounts_btn"
              	 href="javascript:;"
              	 @click="defray(data.order.id)"
              	 v-if="affirmOrder(data.order.state)">确认付款</a>
              <a class="accounts_btn cancel"
              	 href="javascript:;"
                 @click="cancel"
                 v-if="isCancel(data.order.state,data.order.serviceBeginTime)">取消订单</a>
           <a href="javascript:;"
              class="accounts_btn"
              v-if="data.order.state==='06'"
              @click="submitMaster(data.order.id)">
             师傅已抵达
           </a>
        <p class="amount"
           v-if="data.order.state!=='06'&&data.order.state!=='18'&&data.order.state!='12'&&data.order.state!=='03'&&data.order.state!=='04'&&data.order.state!=='05'&&data.order.state!=='09'&&data.order.state!=='17'">
          <span class="price_text"
          	    v-if="data.order.state==='11'">{{priceText[1]}}
        </span>
        <span class="price_text" v-else>
            {{data.services[0].isSecondPayment==='0'?priceText[1]:priceText[0]}}
        </span>
        <span>￥{{data.serviceTotalWaitPay.toFixed(2)}}</span>
        </p>
      </div>
      </div>
      <div class="alert"  v-if="isAlert1" @click="isCancCoupon" id="alert1">
        <div style="position:absolute;bottom:1.6rem;width:100vw;background:#fff;overflow-y: auto;">
          <h3>请选择优惠券</h3>
          <ul :style="selectorCouponList.length>4?'height:10rem':'height:auto;'">
            <li v-for="(item,index) in selectorCouponList" @click="selectorCoupon(item,index)" >
              {{item.serviceDiscount.discountName}} &nbsp;&nbsp;&nbsp;
              <span v-if="item.serviceDiscount.discountFacevalue!=0">省￥{{item.serviceDiscount.discountFacevalue}}元</span>
              <p v-if="item.serviceDiscount.startTime&&item.serviceDiscount.endTime">{{item.serviceDiscount.startTime|moment('YYYY-MM-DD')}}-{{item.serviceDiscount.endTime|moment('YYYY-MM-DD')}}</p>
              <b class="radio" :class="{'selector_coupon':selectorIndex===index}"></b>
              <p v-if="item.serviceDiscount.discountFacevalue==0">使用{{data.services[0].price2Discount*10}}折优惠</p>
            </li>
          </ul>
        </div>
        <div id="footer">
          <div class="accounts_btn" @click="isAlert1=false">关闭</div>
        </div>
      </div>
     <transition name="fad">
          <div class="alert" v-if="isAlert" @click="isCanc" id="alert">
              <div style="position:absolute;bottom:0;width:100vw;background:#fff">
                <mt-radio
                  align="right"
                  title="取消原因"
                  v-model="value"
                  :options="options">
                </mt-radio>
                <textarea v-model="textValue" id="" cols="30" rows="10" v-if="value==='0'" class="text_area"></textarea>
                <div class="footer">
                  <div class="accounts_btn" @click="submit">确认取消</div>
                </div>
              </div>
          </div>
       </transition>
    </div>
</template>
<script>
  import {timeDate} from "../../js/datetime"
  import { MessageBox } from 'mint-ui';
  import moment from "moment"
  import {getPaymentParams,formalDefray,checkIsFromMiniProgram} from "@/components/savertype/js/payment"
  import {getCookie,getOpenID} from "@/js/cookie"
  import {getSession} from "@/js/session"
  import {getLocalStorage,setSessionQrcodeId,getSessionQrcodeId} from "@/js/session"
  import {isWeixin} from "@/js/isWeixin"
  import { Indicator } from 'mint-ui';
  import {ths,orderStatus,cancel,commonFilter,isDelLineFilter,affirm,Footer,isMaster,orderCountdown} from "./js/isStatus"
  var indexPath=window.location.href.indexOf("#/")+2,urlHref=window.location.href.substring(0,indexPath);
  export default {
    /*
    * 苹果-iPhone7-声音问题-麦克风/话筒
    *
    */
        data() {
              return {
//  配件费列表 start
              partsList:[],
// 配件费列表 end
              selectorCouponList :[],
              couponText:"请选择优惠券",
              partsPriceSum:0,
              heightPirceSum:0,
              priceText:this.$store.state.priceText,
              isAlert:false,
              isAlert1:false,
              value:"",
              comePirce:0,
              discountFacevalue:0,
              size:0,
              heightPirce:0,
              summation:0,
              serviceBeginTime:"",
              selectorIndex:"",
              textValue:"",
              options : this.$store.state.cancelOption,
              classTitle:this.$store.state.classTitle,
              data:"",
              surplusMinute:"",
              userInfoDiscountId:"",
              title:"",
              isSuperposition:"",
              startDate:"",                 //服务开始时间
              createdDate:"",               //服务创建时间
              isShow:false,                 //显示隐藏wweikuan
              accomplish:false,
//              coupon_show:false,//2017-12-28 lee 优惠卷是否显示_
            }
        },
          watch:{
            "isAlert1":function(i,o){
              if(i){
                this.$nextTick(function(){
                  this.$refs.box.style.height="100vh";
                  this.$refs.box.style.overflow="hidden";
                })
              }else{
                this.$refs.box.style.height="auto";
              }
            },
    },
      mounted() {
        orderCountdown.call(this);    // 30分钟倒计时
 /**
 * 配件价格数据 start
 * */
        this.partsList= [
              {
                name:"服务费",
                is:(this.partsPriceSum||true)&&this.data.order.price2Original&&this.data.order.state!=='02'&&this.isSaver(this.data.order.state,this.data.services[0].isSecondPayment),
                value:this.data.order.price2Original+this.comePirce
              },
              {
                name:"高空费",
                is:(this.heightPirceSum||true)&&this.data.order.price4,
                value:this.data.order.price4
              }, {
                name:"配件费",
                is:(this.heightPirceSum||true)&&this.data.order.price3,
                value:this.data.order.price3
            },{
                name:"合计",
                className:"price_sum",
                is:this.isTotal(this.data.order.state,this.data.services[0].isSecondPayment),
                value:this.data.order.originalTotal
            },
        ];
      },
        methods: {
          isSaver(state,isSecondPayment){
            let status=parseInt(state);
            if(isSecondPayment==="1"&&status>10){
              return true;
            }
            return false;
          },
          isTotal(state,isSecondPayment){
            let status=parseInt(state);
            if(isSecondPayment==="1"&&status<=10){
              return false;
            }
            return true;
          },
          todetail(){
            this.$router.push({path:"/commentdetail"});
          },
          isAlert1Fun(){
              this.isAlert1=!this.isAlert1;
          },
          selectorCoupon(item,index){
            this.selectorIndex=index;
            let discountFacevalue=item.serviceDiscount.discountFacevalue;
            this.couponText=item.serviceDiscount.discountName;
            if(item.userInfoDiscount&&item.serviceDiscount.isSuperposition==1){  //判断是否叠加
              this.data=getLocalStorage("orderDetails")[0];
              this.data.serviceTotalWaitPay-=discountFacevalue;
              this.data.serviceTotalCreditAmount+=discountFacevalue;
              this.serviceTotalWaitPay=Math.round(this.data.serviceTotalWaitPay*10)/10;
              this.userInfoDiscountId=item.userInfoDiscount.id;
            }else if(item.userInfoDiscount&&item.serviceDiscount.isSuperposition==0){
              this.data=getLocalStorage("orderDetails")[0];
              this.userInfoDiscountId=item.userInfoDiscount.id;
              this.data.serviceTotalCreditAmount=discountFacevalue;
              this.data.serviceTotalWaitPay=(this.data.serviceTotalWaitPay+this.data.serviceTotalCreditAmount)-discountFacevalue
            }else{
              this.userInfoDiscountId="";
              this.data=getLocalStorage("orderDetails")[0];
            }
            this.isAlert1=false;
            this.discountFacevalue=discountFacevalue
          },
          isCancCoupon(event){
              if(event.target.id==="alert1"){
                this.isAlert1=false;
              }
          },
//师傅已抵达
          submitMaster(id){
            let url=`${this.$common.apidomain}/order/arrive`,params={"orderId":id,"token":getCookie()};
            this.$http.post(url,params).then(res=>{
              let data=res.data
             if(data.code==="0000"){
                this.$Toast("提交成功");
                setTimeout(()=>{
                  this.$router.push({path:"/order"})
                },800);
             }else{
               this.$Toast(data.error);
             }
            })
          },
          isCanc(event){
             if(event.target.id==="alert"){
              this.isAlert=false;
             }
          },
          submit(){
            let value,_this=this,url=this.$common.apidomain+"/order/cancel",params;
            if(this.value==='0'){
            value=this.textValue
            }else{
              value=this.value
            }
            if(!value){
              this.$Toast("请选择原因");
              return;
            }
               this.isAlert=false;
                params={"orderId":_this.data.order.id,"token":getCookie()}
                //  params={"orderId":_this.data.order.id,"token":getCookie(),"cancelContent":value};
                // return;
                _this.$http.post(url,params).then(res=>{
                  let data=res.data;
                  if(data.code==="0000"){
                    this.$Toast("取消成功");
                        let inOf=window.location.href;
                        setTimeout(()=>{
                        	this.$historyPath(inOf)
                        },500);
                  }else{
                    this.$Toast(data.error);
                  }
                })
          },
          comment(masterInfo){
//            this.$store.commit("changeComment",masterInfo);
            setSessionQrcodeId("masterInfo",masterInfo);
          this.$router.push({path:"/comment"});
          },

          cancel(){
            this.isAlert=true;
          },
          defray(orderID){   //订单支付；
            if(!getOpenID()){
              window.location.href=this.$common.pathDomain
            }
            if(!isWeixin()) {
              return false;
            }
            let token=getCookie();
 // 小程序支付 start
              if(checkIsFromMiniProgram())return checkIsFromMiniProgram({orderId:orderID,token:token});
 // 小程序支付 end
//判断是不是正式环境 如果不是就跳到正式环境进行支付
            if(window.location.href.indexOf(this.$common.pathDomain)===-1){
              window.location.href=`${this.$common.pathDomain}/#/wechatDefray?orderID=${orderID}&urlPath=${urlHref}&token=${token}&userInfoDiscountId=${this.userInfoDiscountId}`;
            }else {
              let  param = {
                      openId: getOpenID(),
                      orderId: orderID,
                      payType: "1",
                      userInfoDiscountId:this.userInfoDiscountId,
                      token: getCookie(),
                      paymentChannel:"1"
                  };
              //调支付接口
              formalDefray({param:param},this);
            }
          },
 //显示剩余时间 start
          ordrerState(input){
            return orderStatus(input);
          },
 //显示剩余时间 end

//显示按钮 start
       //是否显示确认付款按钮 start
          affirmOrder(input){
            return affirm(input)
          },
      //是否显示确认付款按钮 end

      //显示底部 start
          isFooter(input){
            return Footer(input);
          },
      //显示底部 end
      //显示评论 start
        isCommon(input,order){
          return commonFilter(input,order);
        },
      //显示评论 end
      //显示取消 start
          isCancel(input,serviceBeginTime){
            return cancel(input,serviceBeginTime);
          },
      //显示取消 end
      //is上门费  start
          isDelLine(state,price1){
            return isDelLineFilter.call(this,state,price1)
          },
      //is上门费  end
      //master info start
          master(input){
            return isMaster(input);
          }
      //master info end
//显示按钮 end
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
        },

    }
</script>

<style scoped lang="less">
  .box_pl{
    position: relative;
    >b{
      top:50%;
      background:url(../../assets/images/position.png) center center no-repeat;
      background-size: 100% 100%;
      transform:translateY(-50%);
      position:absolute;
      width:40/50rem;
      height: 40/50rem;
      vertical-align: middle;
    }
    >.right_arrow{
      right:-1rem;
      height:26/50rem;

      width:16/50rem;
      background:url(../../../static/images/right.png) center center no-repeat;
      background-size: 100% 100%;
    }
  }

  .b.tiny_spot{
    background:url(../../../static/images/star1.png) center center no-repeat;
    background-size:100% 100%;
  }
  .b{
    display: inline-block;
    width: 46/50rem;
    height: 43/50rem;
    margin-left:0.4rem;
    background:url(../../../static/images/star2.png) center center no-repeat;
    background-size:100% 100%;
  }
  #alert1{
    #footer{
      width:100%;
      position:fixed;
      z-index: 9999;
      bottom:0;
      height:88/50rem;
      background: #EB5312;
      box-shadow: inset 0 1px 0 0 rgba(230,230,230,0.50);
      >.accounts_btn{
        width:100%;
        text-align: center;
        line-height: 88/50rem;
        height:4rem;
        font-family: PingFangSC-Regular;
        font-size: 32/50rem;
        color: #FFFFFF;
        letter-spacing: 0;
      }
    }
    >div{
      >h3{
        font-family: PingFangSC-Regular;
        font-size: 34/50rem;
        color: #4A4A4A;
        letter-spacing: 0;
        font-weight: normal;
        line-height: 3em;
        text-align: center;
      }
      >ul{
        >li{
          font-family: PingFangSC-Regular;
          font-size: 28/50rem;
          color: #4A4A4A;
          letter-spacing: 0;
          position:relative;
          padding:.5rem 35/50rem;
          border-top:1px solid #f4f4f4;
          >p{
            font-size: 24/50rem;
            color: #4A4A4A;
          }
          >.radio {
            width: 40/50rem;
            height: 40/50rem;
            border: 1px solid #ccc;
            position: absolute;
            right: 20/50rem;
            border-radius: 50%;
            top: .6rem;
          }
          >.selector_coupon{
            border:.2rem solid #EB5312;
          }
        }
      }
    }
  }
.serve_box_date{
  margin-top:3%;
}
  #box{
    /*师傅位置*/
    >#tetailed_box{
      >.footer{
        width:100%;
        position:fixed;
        bottom:0;
        left:0;
        height:98/50rem;
        text-align: right;
        line-height: 98/50rem;
        background: #FFFFFF;
        font-family: PingFangSC-Medium;
        font-size: 32/50rem;
        color: #EB5312;
        font-weight: 600;
        letter-spacing: 0;
        >.accounts_btn{
          height:100%;
          float:right;
          display: inline-block;
          background: #EB5312;
          width:200/50rem;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 32/50rem;
          color: #FFFFFF;
          letter-spacing: 0;
        }
        >.amount{
          float:right;
          padding-right:.5rem;
          font-family: PingFangSC-Regular;
          font-size: 32/50rem;
          color: #4A4A4A;
          letter-spacing: 0;
          >span{
            color: #EB5312;
          }
          >.price_text{
            font-size: 28/50rem;
            color: #4A4A4A;
            font-weight: normal;
          }
        }
        >.cancel{
          color: #FFFFFF;
          background: #C8C8CB;
        }
      }
      >.serve_position{
        width:100%;
        padding:25/50rem 1.6rem;
        background:#fff;
        margin-bottom:.4rem;
        font-family: PingFangSC-Regular;
        font-size: 24/50rem;
        color: #4A4A4A;
        letter-spacing: 0;
        position:relative;
        >i{
          position:absolute;
          background:red;
        }
        >.position_icon{
          width:30/50rem;
          height:38/50rem;
          left:25/50rem;
          top:50%;
          background:url(../../../static/images/positio.png)center center no-repeat;
          background-size:100% 100%;
          transform:translateY(-50%);
        }
        >.right_icon{
          width:16/50rem;
          height:26/50rem;
          right:25/50rem;
          top:50%;
          background:url(../../../static/images/right1.png)center center no-repeat;
          background-size:100% 100%;
          transform:translateY(-50%);

        }
        >.right_wk{
          background:url(../../../static/images/bottom3.png)center center no-repeat;
          background-size:100% 100%;
          width:26/50rem;
          height:16/50rem;
        }
        >.inventory{
          font-size: 24/50rem;
          color: #EB5312;
          letter-spacing: 0;
          float:right;
        }
      }
      >.title{
        width:100%;
        height:160/50rem;
        /*<!--line-height:160/50rem;-->*/
        padding-left:32/50rem;
        padding-top:47/50rem;
        margin-bottom:.2rem;
        background:url(../../../static/images/bg2.png) center center no-repeat;
        background-size:100% 100%;
        font-family: PingFangSC-Medium;
        font-size: 32/50rem;
        color: #FFFFFF;
        letter-spacing: 0;
        >div{
          >.surplus_tate{
            font-size: 24/50rem;
            color: #FFFFFF;
            letter-spacing: 0;
          }
        }

      }
      >.wk{
        padding-left:.7rem;
        margin-bottom:0;
      }
    }
    .identifier{
      padding:32/50rem;
      padding-top:.2rem;
      margin-bottom:2rem;
      >p{
        font-family: PingFangSC-Regular;
        font-size: 22/50rem;
        color: #9B9B9B;
        letter-spacing: 0;
        line-height: .7rem;
      }
    }
    .info{
      width:100%;
      background:#fff;
      padding:20/50rem 0;
      >.saver_type{
        margin-top:.3rem;
        display: flex;
        font-family: PingFangSC-Regular;
        font-size: 24/50rem;
        color: #9B9B9B;
        letter-spacing: 0;
        >.saver_title{
          width:21%;
          margin-left:32/50rem;
        }
        >.text{
          flex:1;
          color:#4a4a4a;
          font-size: 24/50rem;
        }
      }
    }
    .saver_title_list{
      padding-right:.6rem;
    }

    .keep_container{
      background:#fff;
      margin-top:.5rem;
      >.order_number{
        font-family: PingFangSC-Regular;
        font-size:24/50rem;
        color: #9B9B9B;
        height:60/50rem;
        padding:0 32/50rem;
        line-height:60/50rem;
        font-weight: normal;
        letter-spacing: 0;
        >.status{
          color: #EB5312;
          float:right;
        }
      }
      .cause_top{
        margin-bottom:2%;
        color: #4A4A4A;
        padding-right:2rem;

        letter-spacing: 0;
        .mui-badge,.cause_type{
          background:none;
          font-family: PingFangSC-Regular;
          font-size: 28/50rem;

        }

        > .mui-badge{
          float:right;
          padding-right:0;
        }
      }
      .mui-table-view-cell{
        font-family: PingFangSC-Regular;
        font-size: 28/50rem;
        color: #4A4A4A;
        border-bottom:1px solid rgba(230,230,230,0.50);
        padding:23.2/50rem 34/50rem;
        letter-spacing: 0;
        >.cause{
          letter-spacing: 0;
          /*overflow: hidden;*/
          height:auto;
          >.cause_name{
            float:left;
          }
          >.sum{
            float:right;
            text-align:right;
            font-size: 26/50rem;
            >.getSum{
              display: inline-block;
              transform:translatedY(-100%) ;
            }
          }
          >.cause_name,.sum{
            color: #C8C8CB;
            font-size: 22/50rem;
            font-family: PingFangSC-Regular;
            letter-spacing: 0;
          }
          >.sum{
            font-size: 24/50rem;
          }
        }
      }
    }
    .mui-table-view:before{
      background:none;
    }
    /*底部*/
    .defray_content{
      width:100%;
      overflow: hidden;
      padding:14/50rem;
      padding-right:.6rem;
      padding-left:32/50rem;
      >.defray_right{
        float:right;
        overflow: hidden;
        height:120/50rem;
        position:relative;
        >p{
          font-size:22/50rem;
          color:#9B9B9B;
          >.defray_price{
            font-size: 28/50rem;
            color: #9b9b9b;
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
      .open_price{
        height:auto;
        width:100%;
        /*text-align: left;*/
        >p{
          font-family: PingFangSC-Regular;
          font-size: 20/50rem;
          color: #9B9B9B;
          letter-spacing: 0;
          text-align: left;
          >span{
            float:right;
          }
        }

        >.line{
          height:8/50rem;
          margin-top:10/50rem;
          margin-bottom: 20/50rem;
          background:url(../../../static/images/line2.png) center center no-repeat;
          background-size:100% 100%;
        }
        >.price_sum{
          font-size: 24/50rem;
          color: #000000;
          letter-spacing: 0;
          >.defray_price{
            color: #000000;
            font-size: 24/50rem;
          }
        }
        >.preferential_price{
          font-family: PingFangSC-Regular;
          font-size: 20/50rem;
          color: #4A4A4A;
          letter-spacing: 0;
          >.defray_price{
            color: #000000;
            font-size: 20/50rem;
          }
        }
        >.preferential_price:last-of-type{
          font-size: 28/50rem;
          >.should:last-of-type{
            font-family: PingFangSC-Regular;
            font-size: 28/50rem;
            color: #EB5312;;
            letter-spacing: 0;
          }
        }
      }
    }
    .district_list{
      height:0;
      margin:0;
      width:100%;
      background:#fff;
      padding:.3rem 0;
      overflow: hidden;
      border-top:1px solid rgba(0,0,0,0.1);
    }
    .district_list > li{
      overflow: hidden;
      padding:0px 32/50rem;
      font-family: PingFangSC-Regular;
      font-size: 22/50rem;
      color: #9B9B9B;
      letter-spacing: 0;
      >.price_right{
        float:right;
      }
      >.type_left{
        float:left;
      }
    }
  }
/*alert*/
  .mint-actionsheet{
      text-align:left;
      padding:0 20px;
      background:#fff;
    .mint-actionsheet-listitem{
      padding-left:20px;
    }
  }
  .alert{
    background:rgba(0,0,0,0.5);
    width:100%;
    position:absolute;
    left:0;
    top:0;
    z-index: 999;
    height: 100vh;
  }
  textarea{
    width:686/50rem;
    margin:0;
    height:146/50rem;
    display:block;
    margin:0 auto;
    margin-top:5px;
    margin-bottom:5px;
    background: #D8D8D8;
    border-radius: 8/50rem;
    border:none;
  }
  &.fad-enter-active, &.fad-leave-active{
  transition: all .4s ease
  }
  &.fad-enter, &.fad-leave-active{
   transform:translateY(1000px);
  }
.coupon{
  margin-top:0;
    >.tate{
      background:url(../../assets/images/xuanzeyouhuij.png) center center no-repeat;
      background-size: 100% 100%;
    }
}
.location_box{
  width:100%;
  background:#fff;
  padding:.5rem 1.3rem;
  padding-right:.8rem;
  position:relative;
  border-top: inherit;
  margin-top:.2rem;
 >.border_image{
   width:100%;
   height:2px;
   position:absolute;
   top:0;
   left:0;
   background:url(../../../static/images/dizhi.png);
 }

  >b{
    top:50%;
    background:url(../../../static/images/position.png) center center no-repeat;
    background-size: 100% 100%;
    transform:translateY(-50%);
    position:absolute;
    vertical-align: middle;
  }
  >.position_icon{
    left:.8rem;
    width:30/50rem;
    height:1rem;
  }
  >.right_arrow{
    right:.8rem;
    height:26/50rem;
    width:16/50rem;
    background:url(../../../static/images/right.png) center center no-repeat;
    background-size: 100% 100%;
  }
  >.content{
    width:100%;
    padding:0 .8rem;
    >p{
      font-family: PingFangSC-Regular;
      font-size: 28/50rem;
      color: #4A4A4A;
      letter-spacing: 0;
    }
  }
  .tate{
    width:40/50rem;
    height:38/50rem;
  }
  >.bottom{
    width:100%;
    height:2px;
    position:absolute;
    bottom:0;
    left:0;
    background:url(../../../static/images/dizhi.png);
  }
}
  .footer {
    width: 100%;
    height: 98/50rem;
    line-height: 98/50rem;
    background: #FFFFFF;
    font-family: PingFangSC-Medium;
    color: #EB5312;
    letter-spacing: 0;
    > .accounts_btn {
      height: 100%;
      display: inline-block;
      background: #EB5312;
      width:100%;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
  .text_area{
    /*margin:0 auto;*/
  }
</style>
<style lang="less">
  .mint-msgbox-wrapper
    .quX{
      position:absolute;
      right:0;
      top:0;
      background:url(../../../static/images/conse1.png)center center no-repeat;
      background-size:100% 100%;
      background-origin: content-box;
      font-size: 20px;
      width:50px;
      padding:10px;
      height:50px;
    }
  .queRen{
    background:rgba(0,0,0,.2);
    color:#fff;
    line-height: 31px;
    font-size: 17px;
  }
  .mint-actionsheet-list{

  }
  .mint-actionsheet-listitem{
    font-family: PingFangSC-Regular;
    font-size: 28/50rem;
    color: #4A4A4A;
    letter-spacing: 0;
  }
  .mint-cell:last-of-type{
    .mint-cell-wrapper{
    }
  }
  .mint-radiolist-title{
    text-align:center;
    font-family: PingFangSC-Regular;
    font-size: 32/50rem;
    color: #4A4A4A;
    line-height:3em;
    letter-spacing: 0;

  }
  .mint-radio-label{
    font-family: PingFangSC-Regular;
    font-size: 28/50rem;
    color: #4A4A4A;
    letter-spacing: 0;
  }
  .footer.staymoney {
    width: 100%;
    height: 98/50rem;
    line-height: 98/50rem;
    background: #FFFFFF;
    font-family: PingFangSC-Medium;
    color: #EB5312;
    letter-spacing: 0;
    > .accounts_btn {
      height: 100%;
      display: inline-block;
      background: #EB5312;
      width:100%;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }

</style>
