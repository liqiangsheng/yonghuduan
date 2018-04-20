<template>
  <div id="box" ref="box">
    <div class="title_nav">
      <h3 class="position_title"> 服务地址和时间</h3>
    </div>
    <div class="location_box address"  v-for="(item,index) in positionInfo" :key="index" @click="addPosition">
      <p class="border_image"></p>
      <p class="bottom"></p>
      <i class="border_img_bottom"></i>
      <b class="position_icon"></b>
      <div class="content">
        <p>{{item.linkmanDetails}}
        </p>
      </div>
      <b class="right_arrow"></b>
    </div>
    <!--服务时间 start -->
    <router-link tag="div" to="/serve_date" class="location_box serve_box_date">
      <b class="position_icon tate"></b>
      <div class="content">
        <p>{{date}}</p>
      </div>
      <b class="right_arrow"></b>
    </router-link>
    <!--服务时间 end -->

    <!--优惠券 start-->
    <div class="title_nav">
      <h3 class="position_title"> 下单列表</h3>
    </div>

    <!--add服务-->
    <div class="add_serve first">
      <div class="addserve_tite">
        <p>{{title}}</p>
        <div class="right_add" @click="returnFirst">
          <b></b>
          <p> 添加服务</p>
        </div>
      </div>
    </div>
    <!--故障统计-->
    <div class="add_serve hitch" v-for="(item,index) in dataList" :key="index" v-if="dataList.length>0">
      <div class="addserve_tite">
        <div class="product_right">
          {{item.fullName}}
          <p :style="item.isSecondPayment==='1'?'margin-bottom:.5rem;':''">
            {{item.tagsName.join(",")}}
          </p>
          <p style="margin-bottom:.5rem;" v-if="item.isSecondPayment!=='1'"> 金额 <span class="sum" style="color:#EB5312">￥{{item.price2}}</span></p>
        </div>
        <div class="right_add right_number" style="border-right:1px solid rgba(0,0,0,.1);">
          <div class="numbox">
            <button class="subtract" @click="subtract(index)"  type="button">-</button>
            <input class="number" type="number" v-model="item.size" disabled >
            <button class="addnumber" @click="add(index,item)" type="button" >+</button>
          </div>
        </div>
      </div>
    </div>

    <!--优惠券 start-->
    <div style="border-top:1px solid #ebebeb;" @click="isAlert=true" class="location_box serve_box_date coupon" v-if="selectorCouponList.length>0">
      <b class="position_icon tate"></b>
      <div class="content">
        <p>{{couponText}}  <span v-if="discountFacevalue">省￥{{discountFacevalue}}元</span></p>
      </div>
      <b class="right_arrow"></b>
    </div>
    <!--优惠券 end-->

    <div style="border-top:1px solid #ebebeb;padding-top:0;padding-bottom:0;" class="location_box serve_box_date coupon" >
      <b class="position_icon tate remark"></b>
      <div class="content">
        <span class="tip">备注 :</span>
        <input class="remarks" placeholder="(选填)" type="text" v-model="remark"  @change="rema(remark)"/>
      </div>
    </div>

    <div class="serve_explain">
      <b></b>
      <router-link tag="p" to="/saverInfo" v-if="isShow()" class="explain_text">《服务流程及收费说明》</router-link>
      <router-link tag="p" to="/saverInfo" v-else class="explain_text">《叮叮快修手机维修服务协议》</router-link>
      <p class="describe">支付完成后请点击【完成】按钮，可以关注我们的服务号，以便及时接收服务通知。</p>
    </div>
    <!--付款-->
    <!--<div class="service_totalCredit_amount">已优惠 ￥{{1212}}</div>-->
    <div class="footer" v-if="dataList.length>0">
      <a class="accounts_btn" href="javascript:;" @click="submit">确认付款</a>
      <p class="amount"> {{dataList[0].isSecondPayment==='0'?priceText[1]:priceText[0]}}：<span>￥{{discountFacevalue?pirce():sumpric}}</span></p>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

    <div class="alert" v-if="isAlert" @click="isCanc" id="alert">
      <div  style="position:absolute;bottom:1.6rem;width:100vw;background:#fff;overflow-y: auto">
        <h3>请选择优惠券</h3>
        <ul :style="selectorCouponList.length>4?'height:10rem':'height:auto;'">
          <li v-for="(item,index) in selectorCouponList" @click="selectorCoupon(item,index)" >
            {{item.serviceDiscount.discountName}} &nbsp;&nbsp;&nbsp; <span v-if="item.serviceDiscount.discountFacevalue!=0">省￥{{item.serviceDiscount.discountFacevalue}}元</span>
            <p v-if="item.serviceDiscount.startTime&&item.serviceDiscount.endTime">{{item.serviceDiscount.startTime|moment('YYYY-MM-DD')}}-{{item.serviceDiscount.endTime|moment('YYYY-MM-DD')}}</p>
            <b class="radio" :class="{'selector_coupon':selectorIndex===index}"></b>
            <p v-if="item.serviceDiscount.discountFacevalue==0">使用{{dataList[0].price2Discount*10}}折优惠</p>
          </li>
        </ul>
      </div>
      <div id="footer">
        <div class="accounts_btn" @click="isAlert=false">关闭</div>
      </div>
    </div>
  </div>
</template>
<script>

  import {setSessionUserInfo,getSessionUserInfo,getSession,setSession,getLocalStorage,setLocalStorage,removerStorage,setSize} from "@/js/session"
  import {setCookie,getCookie,getOpenID} from "@/js/cookie"
  import {isWeixin,onBridgeReady} from "../../js/isWeixin"
  import {isPosition} from "@/js/isPosition"
  import {Toast}  from "mint-ui"
  import {formalDefray} from "@/components/savertype/js/payment"
  import { Indicator } from 'mint-ui';
  import {UrlSearch} from "@/js/pathBack"
  let Request=new UrlSearch(); //实例化
  var indexPath=window.location.href.indexOf("#/")+2,urlHref=window.location.href.substring(0,indexPath);
  //  changeCouponText
  export default {
    data() {
      return {
        remark:"",
        isAlert:false,
        couponText:this.$store.state.couponText,
        discountFacevalue:this.$store.state.discountFacevalue,
        selectorIndex:-1,
        actions:[
          {
            name:"确认删除",
            method:this.delproduct
          }
        ],
        selectorCouponList :[],
        value:"",
        userInfoDiscountId:this.$store.state.userInfoDiscountId,
        sheetVisible:false,
        priceText:this.$store.state.priceText,
        dataList:[],
        date:"请选择服务时间",
        cDate:"",
        title:"",
        isSuperposition:this.$store.state.isSuperposition,
        size:[],
        positionInfo:[{linkmanDetails:"请选择服务地址"}], //服务地址
        newId:"",
        sumpric:"",
        productIndex:-1,
      }
    },
    watch:{
      "isAlert":function(i,o){
        if(i){
          this.$nextTick(function(){
            this.$refs.box.style.height="100vh";
            this.$refs.box.style.overflow="hidden";
          })
        }else{
          this.$refs.box.style.height="auto";
        }
      }
    },
    methods: {
      rema(txt){
        this.$store.state.ramk=txt;
      },
      pirce(){
        let sum=this.sumpric-this.discountFacevalue;
        return (Math.round(sum*10)/10)<0?0:Math.round(sum*10)/10;
      },
      isCanc(event){
        if(event.target.id==="alert"){
          this.isAlert=false;
        }
      },
      selectorCoupon(item,index){
        this.selectorIndex=index;
        this.$store.commit("changeDiscountFacevalue",item.serviceDiscount.discountFacevalue);
        this.$store.commit("changeCouponText",item.serviceDiscount.discountName);
        this.discountFacevalue=item.serviceDiscount.discountFacevalue;
        this.couponText=item.serviceDiscount.discountName;
        if(item.userInfoDiscount){
          this.$store.commit("changeIsSuperposition",item.serviceDiscount.isSuperposition);
          this.$store.commit("changeUserInfoDiscountId",item.userInfoDiscount.id);
          this.userInfoDiscountId=item.userInfoDiscount.id;
          this.isSuperposition=item.serviceDiscount.isSuperposition
        }else{
          this.$store.commit("changeUserInfoDiscountId","");
          this.$store.commit("changeIsSuperposition",1);
          this.isSuperposition=1;
          this.userInfoDiscountId="";
        }
        this.sumpir();
        this.isAlert=false;
      },
      //添加服务地址 start
      addPosition(){
        this.$store.commit("addPosition",this.$route.path);
        this.$router.push({path:"/address"})
      },
      //添加服务地址 end
      returnFirst(){
        this.$store.commit("changePaths","n");
        this.$router.push({path:this.$store.state.addServerPath})
      },
      delproduct(){
        let index=this.productIndex;
        this.dataList.splice(index, 1);
        removerStorage("fullName");
        this.dataList.forEach(v=>{
          setLocalStorage("fullName",v);
        });
        this.dataList=getLocalStorage("fullName");
        this.sumpir();
      },
      //减减
      subtract(index){
        if(this.dataList[index].size<=1){
          this.productIndex=index;
          this.sheetVisible=true;
          return;
        }
        let sizeO=this.dataList[index];
        sizeO.size--;
        this.$set(this.dataList,index,sizeO);
        setSize("fullName",this.dataList);
        this.sumpir();
      },
      //加加
      add(index,item){
        let sizeO=this.dataList[index];
        if(this.dataList[index].size>20 || item.isSecondPayment==='1'){
          return;
        }
        sizeO.size++;
        this.$set(this.dataList,index,sizeO);
        setSize("fullName",this.dataList);
        this.sumpir();
      },
      submit(){
        if(this.date==="请选择服务时间"){
          Toast("请选择服务时间");
          setTimeout(()=>{
            this.$router.push({path:"/serve_date"});
          },1200);
          return;
        }
//            Indicator.open('请稍后');
        var sendId=[];
        this.dataList.forEach((e,i)=>{
          let obj={};
          obj.id=e.id;
          obj.size=JSON.stringify(e.size);
          obj.serviceTags=e.tagsName.join(",");
          sendId.push(obj);
        });
        var positionID=this.positionInfo[0].id;
        var token=getCookie();
        if(!positionID){
          Toast("请选择服务地址");
          setTimeout(()=>{
            this.addPosition();
          },1200);
          return;
        }
        if(token){
          var params={
            token:token,
            appointmentDatetime: this.cDate,
            serviceRemark:'服务说明测试', //提交提交订单
            serviceIdsJson:JSON.stringify(sendId),
            serviceAreaId:positionID,
            userInfoDiscountId:this.userInfoDiscountId,
            orderRemark:this.remark
          };
          let url= common.apidomain+"/order/submit";
          this.$http.post(url,params).then(res=>{
            let data=res.data;
            Indicator.close();
            if(data.code==="0000"){
              let url1=common.apidomain+"/fapayjournalaccount/payorder",
                orderID=data.result.orderid,param,
                str= returnCitySN["cip"]+','+returnCitySN["cname"];
              if(getOpenID()===undefined){
                window.location.href=this.$common.pathDomain;
              }
              if(!isWeixin()) {
                return false;
              }
              if(window.location.href.indexOf(common.pathDomain)===-1){
                let userInfoDiscountId="";
                removerStorage("fullName");
                window.location.href=`${common.pathDomain}/#/wechatDefray?orderID=${orderID}&urlPath=${urlHref}&token=${token}&userInfoDiscountId=${userInfoDiscountId}`;
              }else{
                Indicator.open('正在请求支付请稍后');
                param={
                  openId:getOpenID(),
                  orderId:orderID,
                  payType:"1",
                  token:token,
                  userIp:str.split(",")[0],
                  paymentChannel:"1"
                };     //调支付接口
                formalDefray({param:param,str:str,url1:url1},this);
              }
            }else{
              Toast(data.error);
            }
          });
        }else{
          Toast("未登录");
          this.$store.commit("changeLoginPath",this.$route.path);
        }
      },
      getData(){
        this.$store.commit("changeAddServerPath",`wash/${getLocalStorage("fullName")[0].id.substring(0,3)}`);
        let fullName=getLocalStorage("fullName"),
          titles=getLocalStorage("title"),OPTION=getLocalStorage("OPTION");
        if(!fullName.length){
          this.$router.push({path:"/"})
        }
//判断用户地址 是否存在 start   /userInfoDiscount/findlistDiscountByServiceId
        isPosition(this,common);
//判断用户地址 是否存在 end
        this.$store.commit("changePaths","o");
        let yuDate=this.$store.state.yuDate,neDate;  //传给后台的预约时间；
        this.cDate=yuDate;
        if(yuDate==''){
          this.date='请选择服务时间';
        }else{
          neDate=yuDate;
          this.date=neDate;
        }
        //title标题
        let title= Array.from(new Set(titles)),
          dataIfo=fullName,arr;
        this.title=title[0];
        this.dataList=dataIfo;
        arr = this.dataList;
        if(this.dataList.length<=0)return;
        if(this.dataList[0].isSecondPayment==='0'){
          let hash = {};
          arr = arr.reduce(function(item, next) {
            hash[next.id] ? '' : hash[next.id] = true && item.push(next);
            return item
          }, []);
          this.dataList=arr;
          this.sumpir();
          let optionList=OPTION;
          if(optionList!=""){
            this.positionInfo=optionList;
          }
        }else{
          let optionList=OPTION;
          this.sumpir();
          if(optionList!=""){
            this.positionInfo=optionList;
          }
        }
        let newArray=[];
        fullName.forEach(v=>{
          newArray.push(v.id)
        });
        if(this.dataList[0].isSecondPayment==="0"){
          if(getCookie()){
            let url=`${this.$common.apidomain}/userInfoDiscount/findlistDiscountByServiceId`,
              params={"ids":newArray.join(","),"token":getCookie()};
            this.$http.post(url,params).then(res=>{
              let data=res.data;
              this.selectorCouponList.push({serviceDiscount:{"discountName":"不使用优惠券","startTime":0,"endTime":0,"discountFacevalue":0}});
              data.code==="0000"?this.selectorCouponList=this.selectorCouponList.concat(data.result):this.selectorCouponList.length=0;
            });
          }
        }
      },
      sumpir(){
        let price=0,newArrPier=[],originalSum=0,price2DiscountFavorableFee=0,
            computeOriginalSum=e=>originalSum+=(e.price2-0)*(e.size-0);     //计算总服务费
        if(this.dataList.length===0)return this.sumpric=0;
        this.dataList.forEach((e,i)=>{
          if(e.isSecondPayment==="0"){  //一次付款；       1二次付款   0一次付款
            if(this.isSuperposition===1){
              price+=e.price2DiscountFee*(e.size-0);
              price2DiscountFavorableFee+=e.price2DiscountFavorableFee*(e.size-0);
              computeOriginalSum(e)
            }else{
              price+=(e.price2-0)*(e.size-0);
              computeOriginalSum(e)
            }
          }else if(e.isSecondPayment==="1"){
            newArrPier.push(e.price1);
          }
        });
        if(this.dataList[0].isSecondPayment==='0'){
          price+=this.dataList[0].price1;
        }
        if(this.dataList[0].isSecondPayment==="1"){
          Array.max = function( array ){
            return Math.max.apply( Math, array);
          };
          price=Array.max(newArrPier);
        }
        if(JSON.stringify(price).indexOf(".")!==-1){
          let s=JSON.stringify(price).indexOf(".")+3;
          this.sumpric=JSON.stringify(price).substring(0,s);  //价格
          this.sumpric=this.sumpric<0?0:this.sumpric
        }else{
          this.sumpric=price
        }
      },
      isShow(){
        if (getLocalStorage("title")[0]==="手机品牌"){return false}else{return true}
      }
    },
    created() {
      this.$store.commit("changeLoginPath",this.$route.path);
      this.remark=this.$store.state.ramk;
      this.$store.commit("changeLoginPath",this.$route.path);
      if(getSessionUserInfo("websiteType") === Request.qrcodeId && !getLocalStorage("fullName").length){
        this.$router.push({path:"/"});
      }
      this.$store.commit("changeWebsiteBusiness",this.$route.path);
      if(getSessionUserInfo("websiteType")===Request.qrcodeId){
        this.getData();
      }else{
//  003001009003001001
        let url=`${this.$common.apidomain}/conversion/getServiceInfo?qrcodeId=${Request.qrcodeId}&relevanceKey=${this.$common.getRequest.relevanceKey}`;
        this.$http.get(url).then(res=>{
          let data=res.data;
          if(data.code==="0000"){
            setSessionUserInfo("websiteType",Request.qrcodeId);
            removerStorage("fullName");
            data.result.forEach(v=>{
              setLocalStorage("fullName",v);
            });
            removerStorage("title");
            setLocalStorage("title",this.$commonJs.filterTitle(getLocalStorage("fullName")[0].id.substring(0,3)));
            this.getData();
          }else{
            this.$Toast(data.error);
          }
        });
      }
    }
  }
</script>
<style scoped lang="less">
  .tip{
    font-size: 28/50rem;
  }
  .remarks{
    width:80%;
    border:0;
    vertical-align:middle ;
    margin:0;
    outline-style: none;
    border:none;
    margin-left: 0.2rem;
    padding: 0;
    box-sizing: border-box;
    /*padding-top:0.8rem;*/
    font-size: 24/50rem;
  }
  .remarks::-webkit-input-placeholder{
    font-size: 20/50rem;
    /*line-height: 20px;*/
    /*padding-top:0.4rem;*/
  }
  .title_nav {
    padding:20/50rem;
    .position_title {
      font-family: PingFangSC-Regular;
      font-size: 28/50rem;
      color: #7C7C7C;
      font-weight: normal;
      padding-left:20/50rem;
      border-left:8/50rem solid #EA5514;
      line-height:40/50rem;
    }

  }
  .serve_explain{
    padding:.2rem .8rem;
    margin-bottom:200px;
    >b{
      float:left;
      background:url(../../../static/images/selector3.png) center center no-repeat;
      background-size: 100% 100%;
      width:30/50rem;
      height:30/50rem;
      vertical-align:middle;
    }
    >.explain_text{
      font-family: PingFangSC-Regular;
      font-size: 24/50rem;
      color: #EB5312;
      line-height: .6rem;
      letter-spacing: 0;
    }
    >.describe{
      color:#C8C8CB;
      font-size: 22/50rem;
      line-height: 2em;
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
      /*width:100%;*/
      /*height:2px;*/
      /*position:absolute;*/
      /*top:0;*/
      /*left:0;*/
      /*background:url(../../../static/images/dizhi.png);*/
    }

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
    >.position_icon{
      left:.8rem;
      /*<!--width:30/50rem;-->*/
      /*height:1rem;*/
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
      display: flex;
      align-items: center;
      >p{
        font-family: PingFangSC-Regular;
        font-size: 28/50rem;
        color: #4A4A4A;
        letter-spacing: 0;

      }
    }
    .tate{
      background:url(../../assets/images/tiem.png) center center no-repeat;
      background-size: 100% 100%;
      width:40/50rem;
      height:38/50rem;
    }
    .tate.remark{
      background:url(../../assets/images/remark.png) center center no-repeat;
      background-size: 100% 100%;
      width:40/50rem;
      height:38/50rem;
    }
    >.bottom{
      width:100%;
      height:1px;
      position:absolute;
      bottom:0;
      left:0;
      background: rgba(0,0,0,.1);
    }
  }
  .serve_box_date{
    margin-top:0;
  }
  .add_serve{
    margin-top:3%;
    width:100%;
    border-top:1px solid rgba(0,0,0,0.1);
    padding-right:.8rem;
    overflow: hidden;
    background:#fff;
    .sum{
      font-size: 28/50rem;
    }
    >.addserve_tite{

      >p{
        padding:30/50rem;
        float:left;
        color: #9B9B9B;
      }
      >.right_add{
        float: right;
        position:relative;
        padding-left:.5rem;
        overflow: hidden;
        height:88/50rem;
        padding-top:.7rem;
        >b{
          float: left;
          width:32/50rem;
          margin-right:.2rem;
          height:32/50rem;
          background:url(../../../static/images/add.png) center center no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        >p{
          float:left;
          font-family: PingFangSC-Regular;
          font-size: 28/50rem;
          color: #9B9B9B;
          letter-spacing: 0;
          line-height: .6rem;
          text-align: right;
        }
        .numbox{
          height:68/50rem;
          display: flex;
          width:196/50rem;
          padding:0;
          border:1px solid rgba(0,0,0,0.1);
          margin:0;
          border-radius:6px;
        }
        .addnumber{

        }
        .addnumber,.number,.subtract{
          padding:0;
          color: #EB5312;
          float:right;
          border-radius: 0;
          border:none;
          margin:0;
          height:100%;
          flex:1 !important;

        }
        .number{
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 28/50rem;
          color: #4A4A4A;
          letter-spacing: 0;
          border:1px solid rgba(0,0,0,0.1);
          border-top:none;
          border-bottom:none;
        }
      }
      >.right_number{
        padding-top:0rem;
        height:auto;
        margin-top:.5rem;
        margin-bottom:1rem;
        transform:translateY(50%);
        float:none;
        /*padding:0;*/
      }
      >.product_right{
        float:left;
        padding:.5rem;
        width:70%;
        padding-bottom:.3rem;
        font-family: PingFangSC-Regular;
        font-size: 28/50rem;
        color: #4A4A4A;
        letter-spacing: 0;
        >p{
          font-size: 22/50rem;
          color: #9b9b9b;
          padding-top:.3rem;
          letter-spacing: 0;
        }
      }
    }

  }
  .first{
    border:none;
    margin-top:0;
  }
  .hitch{
    margin:0;
  }

  .footer{
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
      font-weight: normal;
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      color: #4A4A4A;
      letter-spacing: 0;
      >span{
        color: #EB5312;
      }
    }
  }
  .coupon{
    margin-top:.5rem;
    >.tate{
      background:url(../../assets/images/xuanzeyouhuij.png) center center no-repeat;
      background-size: 100% 100%;
    }
  }
  .address{
    /*padding-top:1rem;*/
    margin-top:0;
    /*padding-bottom:1rem;*/
  }
  .alert{
    background:rgba(0,0,0,0.5);
    width:100%;
    position:absolute;
    left:0;
    top:0;
    padding-bottom:289/50rem;
    z-index: 99;
    height: 100vh;
  }
  #alert{

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
      height:100%;
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
  .service_totalCredit_amount{
    position:fixed;
    left:32/50rem;
    bottom:.5rem;
    z-index: 999;
    font-family: PingFangSC-Regular;
    font-size:24/50rem;
    color:#4A4A4A;
    font-weight: normal;
  }
</style>

