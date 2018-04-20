<template>
    <div id="box" ref="box" >
       <div class="location_box address"  v-for="(item,index) in positionInfo" @click="addPosition">
         <!--<p class="border_image"></p>-->
         <p class="bottom"></p>
         <i class="border_img_bottom"></i>
         <b class="position_icon"></b>
          <div class="content">
              <p id="address_linkmanDetails" :class="{'selectorColor':positionClassSelector}">{{item.linkmanDetails}}</p>
          </div>
         <b class="right_arrow"></b>
       </div>
<!--服务时间 start -->
      <router-link tag="div" to="/serve_date" class="location_box serve_box_date">
          <b class="position_icon tate"></b>
          <div class="content">
          <p id="date_linkmanDetails" :class="{'selectorColor':dateClassSelector}">{{dateClassSelector?'预约时间 :':''}}&nbsp;{{date}}</p>
          </div>
          <b class="right_arrow"></b>
      </router-link>
<!--服务时间 end -->

  <div class="add_serve hitch" v-for="(item,index) in dataList" :key="index" v-if="dataList.length>0" :style="index===0?'border:none':''">
        <div class="addserve_tite">
          <div class="product_right" style="min-height:3rem;">
            <span class="product_fullName" style="font-weight: normal">
                {{item.fullName}}
            </span>
            <p v-if="item.tagsName" :style="item.isSecondPayment==='1'?'margin-bottom:.5rem;':''">
              {{item.tagsName.join(",")}}
            </p >
            <p style="margin-bottom:.5rem;" v-if="item.isSecondPayment!=='1'"> <span class="sum" style="color:#EB5312">￥{{item.price2DiscountFee}}</span>
              <span class="sum" style="color:#9B9B9B;font-size:0.6rem;margin-left: 0.2rem;text-decoration:line-through;" v-if="item.price2DiscountFee<item.price2">￥{{item.price2}}</span></p>
          </div>
          <div class="right_add right_number" :style="item.fullName.length>=20?'transform:translateY(75%)':''">
            <div class="numbox">
              <button class="subtract" @click="add(index,item)" type="button"></button>
              <!--<input class="number" type="number" v-model="item.size" disabled >-->
              <span>
                 {{item.size}}
              </span>
              <button class="addnumber"  @click="subtract(index)" type="button" ></button>
            </div>
          </div>
        </div>
      </div>
      <div class="add_saver">
          <div class="add_saver_button"  @click="returnFirst">添加服务</div>
      </div>


  <!--优惠券start-->
        <div  @click="isAlert=true" class="location_box serve_box_date coupon" v-if="isSecondPaymentText&&isServiceDiscount">
          <div class="content" > 
            优惠券
            <p>
              <span :style="!discountFacevalue?'color:#888;':''">
               {{couponText}}
            </span>  <span v-if="discountFacevalue">省￥{{discountFacevalue}}元</span></p>
          </div>
          <b class="right_arrow"></b>
        </div>
<!--优惠券 end-->

<!--备注-->
      <div style="padding-top:0;padding-bottom:0;" class="location_box serve_box_date coupon" id="remarks">
        <div class="content">
          <span class="tip">备注</span>
            <input class="remarks" placeholder="选填" type="text" v-model="remark"  @change="rema(remark)"/>
        </div>
      </div>
  <!--备注  end-->

      <!--价格费用列表 start-->
          <div class="cost_container">
              <div class="cost_content">
                <div class="cost_content_item" v-if="originalSum">
                  <p class="cost_name">
                    总金额
                  </p>
                  <p class="cost_sum">
                    ￥{{originalSum.toFixed(2)}}
                  </p>
                </div>
                <div class="cost_content_item" v-if="discountFacevalue">
                  <p class="cost_name">
                    优惠券
                  </p>
                  <p class="cost_sum">
                    ￥{{discountFacevalue.toFixed(2)}}
                  </p>
                </div> <div class="cost_content_item" v-if="price2DiscountFavorableFee">
                  <p class="cost_name">
                    折扣
                  </p>
                  <p class="cost_sum">
                    ￥{{price2DiscountFavorableFee.toFixed(2)}}
                  </p>
                </div>
                <div class="cost_content_item should">
                      <p class="cost_name">
                        应付款
                      </p>
                      <p class="cost_sum">
                        ￥{{discountFacevalue?pirce():sumpric}}
                      </p>
                </div>
              </div>
          </div>
      <!--价格费用列表 end-->
<!--服务协议 start-->
      <div class="serve_explain">
        <b></b>
        <router-link tag="p" to="/saverInfo" v-if="isShow()" class="explain_text">《服务流程及收费说明》</router-link>
        <router-link tag="p" to="/saverInfo" v-else class="explain_text">《叮叮快修手机维修服务协议》</router-link>
        <p class="describe">支付完成后请点击【完成】按钮，可以关注我们的服务号，以便及时接收服务通知。</p>
      </div>
 <!--服务协议 end-->
      <!--付款-->
      <!--<div class="service_totalCredit_amount">已优惠 ￥{{1212}}</div>-->
      <div class="footer submit_button" v-if="dataList.length>0">
        <a class="accounts_btn" href="javascript:;" @click="submit">支 付</a>
        <p class="amount" 
        	style="font-family:PingFangSC-Medium;color:#4a4a4a;font-size:0.48rem; font-weight:normal">
            <span 
            	style=" font-weight:normal; font-family:PingFangSC-Semibold;
			      font-size:0.76rem;
			      color:#ea5413;">
              ￥{{discountFacevalue?pirce():sumpric}}
            </span>
           
               {{isSecondPaymentText?priceText[1]:priceText[0]}}
        </p>
          <!--sumpric 是一口价-->
      </div>
 <mt-actionsheet
  :actions="actions"
  v-model="sheetVisible">
</mt-actionsheet>

<!--优惠券列表  弹框 start-->

      <div class="alert" v-if="isAlert" @click="isCanc" id="alert" style="background:#F1F1F1">
   
        <search-coupon :data="exchangeText" :callBackFun="exchange"></search-coupon>
        <div
        	style="width:100vw;background:#fff;overflow-y: auto;max-height:73%;"
          	id="alert_coupon_container"
        >
          <h3 v-if="selectorCouponList.length>0">请选择优惠券</h3>
            <ul :style="selectorCouponList.length>4?'height:10rem':'height:auto;'">
              <li v-for="(item,index) in selectorCouponList" :key="index" @click="selectorCoupon(item,index)" >
                {{item.serviceDiscount.discountName}} &nbsp;&nbsp;&nbsp;
                <span v-if="item.serviceDiscount.discountFacevalue!=0" class="alert_price">省￥{{item.serviceDiscount.discountFacevalue}}元</span>
                <p v-if="item.serviceDiscount.startTime&&item.serviceDiscount.endTime">{{item.serviceDiscount.startTime|moment('YYYY/MM/DD')}} - {{item.serviceDiscount.endTime|moment('YYYY/MM/DD')}}</p>
                <b class="radio" :class="{'selector_coupon':selectorIndex===index}"></b>
                <p v-if="item.serviceDiscount.discountFacevalue==0">使用{{dataList[0].price2Discount*10}}折优惠</p>
              </li>
            </ul>
        </div>
        <div id="footer">
          <div class="accounts_btn" @click="isAlert=false">关闭</div>
        </div>
      </div>
<!--优惠券 弹框 end-->
    </div>
</template>
<script>

  import {getSession,setSession,setSessionUserInfo,getSessionUserInfo,getLocalStorage,setLocalStorage,removerStorage,setSize} from "@/js/session"
  import {setCookie,getCookie,getOpenID} from "@/js/cookie"
  import {isWeixin} from "@/js/isWeixin"
  import {isPosition} from "@/js/isPosition"
  import {Toast}  from "mint-ui"
  import {formalDefray,checkIsFromMiniProgram,onBridgeReady} from "@/components/savertype/js/payment"
  import { Indicator } from 'mint-ui';
  import searchCoupon from "@/components/couponList/searchCoupon"
  var indexPath=window.location.href.indexOf("#/")+2,urlHref=window.location.href.substring(0,indexPath);
  const addServerPathFun=addServerPath=>{return addServerPath==="/home"?getSessionUserInfo("addServer").addServerPath:addServerPath};
  export default {
        components:{
          searchCoupon
        },
        data() {
            return {
              originalSum:0,
              isServiceDiscount:true,
              selectorColor:{color:"#000"},
              price2DiscountFavorableFee:0,
              positionClassSelector:false,
              isAlertSearch:true,
              dateClassSelector:false,
              costDataList:[
                {
                  name:"总金额",
                  sum:"1212"
                },{
                  name:"折扣",
                  sum:"1212"
                },{
                  name:"优惠券",
                  sum:this.discountFacevalue
                },
              ],
              remark:"",
              isAlert:false,
              isSecondPaymentText:false,
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
              exchangeText:{
                value:""
              },
              isSuperposition:this.$store.state.isSuperposition,
              size:[],
              positionInfo:[{linkmanDetails:"请选择服务地址"}], //服务地址
              newId:"",
              sumpric:0,
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
          },
          "positionInfo":function (i,o){
            if(i[0].id)this.positionClassSelector=true;
          },
          "date":function(i,o){
            if(i.substring(0,3)-0)this.dateClassSelector=true;
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
                  this.getUserInfoDiscount(); //获取优惠券列表
                  this.$Toast({
                    message: '兑换成功',
                    iconClass: 'mintui mintui-success'
                  });
                  this.exchangeText.value=""
                }else if(data.code==='3037'){
                  this.exchangeText.value="";
                  this.$Toast(data.error);
                }else{
                  this.$Toast(data.error);
                }
              })
            }
          },
// 兑换优惠券 end
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
             this.$store.commit("changeLoginPath",this.$route.path);
            this.$store.commit("addPosition",this.$route.path);
            this.$router.push({path:"/address"})
          },
          //添加服务地址 end
          returnFirst(){
            this.$store.commit("changePaths","n");
            this.$router.push({path:addServerPathFun(this.$store.state.addServerPath)})
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
                  if(checkIsFromMiniProgram())return checkIsFromMiniProgram({orderId:data.result.orderid,token:token});   //微信小程序
                      let orderID=data.result.orderid,param;
                  if(getOpenID() === undefined||!getOpenID()) window.location.href=this.$common.pathDomain; 
                  if(!isWeixin()) return false;
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
                 };     //调支付接口
                  formalDefray({param:param},this);
                }
               }else{
                 Toast(data.error);
               }
            });
            }else{
              Toast("未登录");
               this.$store.commit("changeLoginPath","/affirmorder");
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
                  computeOriginalSum(e)   //计算总服务费
              }else{

                price+=(e.price2-0)*(e.size-0);

                    computeOriginalSum(e)  //计算总服务费
              }
               }else if(e.isSecondPayment==="1"){
                  newArrPier.push(e.price1);
               }

             });

            let isSecondPayment=false,  //是否含有一次付款；
                    price1Array=[],     //存储二次付款上门费；
                    price1Max=0;
             for(let i=0;i<this.dataList.length;i++){
               if(this.dataList[i].isSecondPayment==="0"){
                 isSecondPayment=true;
               }else{
                 price1Array.push(this.dataList[i].price1);
               }
             }
            this.isSecondPaymentText=isSecondPayment;
            price1Max=Math.max.apply(null, price1Array);
              if(isSecondPayment){   //一次付款计算价格
                price +=price1Array.length?price1Max:0;
                this.originalSum=originalSum;
                this.price2DiscountFavorableFee=price2DiscountFavorableFee //折扣
              }else{
                price=price1Max
              }
             if(JSON.stringify(price).indexOf(".")!==-1){
               let s=JSON.stringify(price).indexOf(".")+3,priceSum=0,price1Array=[];
               this.sumpric=JSON.stringify(price).substring(0,s)  //价格
               this.sumpric=this.sumpric<0?0:this.sumpric
             }else{
               this.sumpric=price;
             }

          },
          isShow(){
            if(getLocalStorage("title")[0]=="手机品牌"){return false}else{return true}
          },

          initGetData(){                           //初始化 数据
            this.remark=this.$store.state.ramk;
            if(!getLocalStorage("fullName").length){
              this.$router.push({path:"/"})
            }
//判断用户地址 是否存在 start
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
            let title= Array.from(new Set(getLocalStorage("title"))),
              dataIfo=getLocalStorage("fullName"),arr;
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
              let optionList=getLocalStorage("OPTION");
              if(optionList!=""){
                this.positionInfo=optionList;
              }
            }else{
              let optionList=getLocalStorage("OPTION");
              this.sumpir();
              if(optionList!=""){
                this.positionInfo=optionList;
              }
            }
            if(this.isSecondPaymentText){
              this.getUserInfoDiscount();                 //获取优惠券列表
            }else{
              this.userInfoDiscountId="";
            }
          },
          getUserInfoDiscount(){
            let newArray=[];
            getLocalStorage("fullName").forEach(v=>{
              newArray.push(v.id)
            });
            let url=`${this.$common.apidomain}/userInfoDiscount/findlistDiscountByServiceId`,
                params={"ids":newArray.join(","),"token":getCookie()};
            this.$http.post(url,params).then(res=>{
              let data=res.data;
              this.selectorCouponList=[];
              if(data.code==="0000"){
              	if(data.result.length!==0){
              		this.selectorCouponList.push({serviceDiscount:{"discountName":"不使用优惠券","startTime":0,"endTime":0,"discountFacevalue":0}});
              		this.selectorCouponList=this.selectorCouponList.concat(data.result)
              	}
              }
          });
          }
        },
        created() {
        
        	if(!getSessionUserInfo("isReload")&&this.$commonJs.isIosSystem()){
        		setSessionUserInfo("isReload",true);
        		getSessionUserInfo("addServer",{isHomeEnter:true})
        		 location.reload()
        	}
//          折扣价格计算暂时隐藏
          if(this.$route.query.labelId){   //判断是否是从登陆页面跳转过来，如果是，则获取url labelId 重新获取价格数据；如果不是，则直接从缓存获取数据；
            let token=getCookie(),
                queryData=this.$route.query,
                areaId=getSession()[0].id,
                url=`${this.$common.apidomain}/order/joinService?areaId=${areaId}&labelId=${queryData.labelId}&token=${token}`
                removerStorage("fullName");
            this.$http.get(url).then(res=>{
                let data=res.data;
                if(data.code==="0000"){
                  let faterId=data.result[0].serviceInfo;
                      faterId.tagsName=queryData["tagsNameArr"].split(",");
                      faterId.size=1;
                      faterId.farterId=queryData.farterId;
                  setLocalStorage("fullName",faterId);  //设置选中的服务
                  this.initGetData();
                }else{
                  this.$Toast(data.error);
                }
             })
          }else{
            this.initGetData();
          }
        }
  }
</script>
<style scoped lang="less">

/*//  -费用列表 start->*/
.cost_container{
  width:100%;
  background:#fff;
  /*height:10rem;*/
  margin-top:10/50rem;
  >.cost_content{
    padding-top:1rem;
      >.cost_content_item{
        line-height: 1.5rem;
        overflow: hidden;
        padding:0 44/50rem 0 34/50rem;
        text-align:left;
        >.cost_name{
          float:left;
          font-family:PingFangSC-Light;
          font-size:32/50rem;
          color:#000;
        }
        >.cost_sum{
          font-family:PingFangSC-Light;
          font-size:32/50rem;
          color:#ea5413;
          float:right;
        }
      }
    >.should{
      padding-bottom:1rem;
     
      >.cost_name{
        font-family:PingFangSC-Medium;
        font-weight: bold;
      }
      >.cost_sum{
        font-family:PingFangSC-Medium;
        font-weight: bold;
      }
    }
  }
}
/*//  -费用列表 end->*/


  .add_saver{
      background:#fff;
    padding-bottom:1rem;
    padding-top:.4rem;
    >.add_saver_button{
      border:1px solid #888;
      margin:0 auto;
      border-radius:2rem;
      width:261/50rem;
      color:#888;
      font-size:30/50rem;
      line-height:78/50rem ;
      height:78/50rem;
      text-align: center;
    }
  }
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
    font-size: 10/50rem;
    /*line-height: 20px;*/
    text-align: right;
    /*padding-top:0.4rem;*/
  }

    .serve_explain{
    padding:.2rem .8rem;
    margin-bottom:166/50rem;
    >b{
      float:left;
      background:url(../../../static/images/selector3.png) center center no-repeat;
      background-size: 100% 100%;
      width:30/50rem;
      height:30/50rem;
      margin-top:24/50rem;
      vertical-align:middle;
    }
    >.explain_text{
      font-family: PingFangSC-Regular;
      font-size: 24/50rem;
      color: #EB5312;
      margin-top:24/50rem;
      line-height: .6rem;
      letter-spacing: 0;
    }
    >.describe{
      color:#C8C8CB;
      font-size: 22/50rem;
      line-height: 2em;
      margin-top:.5rem;
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

  >b{
    top:50%;
    background:url(../../assets/images/position_2.png) center center no-repeat;
    background-size: 100% 100%;
    transform:translateY(-50%);
    position:absolute;
    width:30/50rem;
    height: 41/50rem;
    vertical-align: middle;
  }
  >.position_icon{
    left:.8rem;
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
    background:url(../../assets/images/dateposition.png) center center no-repeat;
    background-size: 100% 100%;
    width:32/50rem;
    height:32/50rem;
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
  margin-bottom:.2rem;
  padding-top:.8rem;
  padding-bottom:.8rem;
}
  .add_serve{
    margin-top:3%;
    width:100%;
    border-top:1px solid rgba(0,0,0,0.1);
    padding-right:.8rem;
    overflow: hidden;
    background:#fff;
    .sum{
      font-size: 30/50rem;
      font-family:PingFangSC-Light;
      color:#888888;

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
          background:url(../../assets/images/position_2.png) center center no-repeat;
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
          width:196/50rem;
          text-align: center;
          padding-top:.3rem;
        }

        .addnumber,.number,.subtract{
          padding:0;
          color: #c7c7cc;
          outline: none;
          float:right;
          transform:translateY(-.1rem);
          width:48/50rem;
          line-height: 45/50rem;
          border:none;
          margin:0;
          height:48/50rem;
          /*flex:1 !important;*/
        }
        .addnumber{
          float:left;
          border:none;
          background:url(../../assets/images/12121212.jpg) center center no-repeat;
          background-size:100% 100%;
        }
        .subtract{
          border:none;
          margin-right:.3rem;
          background:url(../../assets/images/Group.png) center center no-repeat;
          background-size:100% 100%;
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
        margin-top:.2rem;
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
          font-size: 26/50rem;
          font-family:PingFangSC-Light;
          padding-top:.3rem;
          color:#888888;
          letter-spacing: 0;
        }
        >.product_fullName{
          font-family:PingFangSC-Semibold;
          font-size:32/50rem;
          line-height: 1.5em;
          font-weight: normal;
        }
      }
    }
  }

  .hitch{
      margin:0;
  }
  /*底部按钮 */
  .footer.submit_button{
      width:100%;
      position:fixed;
      bottom:0;
      left:0;
    box-shadow:2/50rem 0 8/50rem 6/50rem rgba(221,221,221,0.50);
    text-align: right;
      background: #FFFFFF;
      font-family: PingFangSC-Medium;
      font-size: 32/50rem;
      color: #EB5312;
      font-weight: 600;
      letter-spacing: 0;
      padding-top:18/50rem;
      padding-bottom:18/50rem;
      >.accounts_btn{
        color:#fff;
        font-family: PingFangSC-Regular;
        height:90/50rem;
        line-height:90/50rem;
        float:right;
        display: inline-block;
        background:url(../../assets/images/button.png) center center no-repeat;
        background-size:100% 100%;
        border-radius:2rem;
        width:421/50rem;
        text-align: center;
        margin-right:29/50rem;
        font-size: 34/50rem;
        color: #FFFFFF;
        font-weight:normal;
        letter-spacing: 0;
      }
      >.amount{
        margin-left:.5rem;
        float:left;
        text-align: left;
        font-family: PingFangSC-Light;
        font-size: 28/50rem;
        color: #888;
        letter-spacing: 0;
        >span{
          font-size: 35/50rem;
          color: #EB5312;
          display: block;
        }
      }
    }

.coupon{
  margin-top:.5rem;
    >.tate{
      background:url(../../assets/images/dateposition.png) center center no-repeat;
      background-size: 100% 100%;
    }
}
  .address{
    /*padding-top:1rem;*/
    padding-top:1rem;
    padding-bottom:1rem;
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
      font-size: 40/50rem;
      letter-spacing: 0;
      font-weight: normal;
      line-height: 3em;
      font-family:PingFangSC-Light;
      color:#888888;
      text-align: center;
    }
    >ul{
      >li{
        font-size: 32/50rem;
        letter-spacing: 0;
        position:relative;
         padding:.7rem 35/50rem;
        border-bottom:1/50rem solid #b0b0b0;
          font-family:PingFangSC-Light;
        color:#000000;
        text-align:left;
          >p{
            font-size: 26/50rem;
            line-height: 1.6em;
            font-family:PingFangSC-Light;
            color:#888888;
          }
        >.radio {
          width: 48/50rem;
          height: 48/50rem;
          position: absolute;
          right: 20/50rem;
          /*<!--line-height: 414/50rem;-->*/
          background:url(../../assets/images/notselector.png) center center no-repeat;
          background-size:100% 100%;
          top: .9rem;
        }
        >.selector_coupon{
          background:url(../../assets/images/selectorsingle.png) center center no-repeat;
          background-size:100% 100%;
        }
      }
    }
    .alert_price{
      float:right;
      margin-right:1.2rem;
      font-family:PingFangSC-Light;
      font-size:32/50rem;
      color:#ea5413;
      margin-top:.3rem;
    }
  }
  #alert_coupon_container{
    position:absolute;
    top:3.8rem;
  }
}
  #footer{
    width:100%;
    position:fixed;
    z-index: 9999;
    bottom:0;
    padding:.75rem 0;
    background:#fff;
    /*<!--height:88/50rem;-->*/
    >.accounts_btn{
      text-align: center;
      line-height: 88/50rem;
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      color: #FFFFFF;
      letter-spacing: 0;
      background-image:linear-gradient(-63deg, #ef6a1c 0%, #ea5413 99%);
      border-radius:2rem;
      width:701/50rem;
      height:90/50rem;
      margin:0 auto;
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
    .coupon{
      margin-bottom:0;

      >.content{
        line-height: 2.5rem;

        >p{
          text-align: right;
          width:10.5rem;
          >span{
          }
        }
      }
    }
  #remarks{
    border:none;
    margin-top:0;
    border-top:1px solid rgba(0,0,0,.1);
  }
  #remarks, .coupon{
    padding:0;
    height:auto;
    >.content{
      font-family:PingFangSC-Light;
      font-size:32/50rem;
      color:#000000;
      text-align:left;
      padding:0;
      padding-left:35/50rem;
      >.tip{
          line-height:2.5rem;
          font-family:PingFangSC-Light;
          font-size:32/50rem;
          color:#000000;
      }
      >.remarks{
        font-size:30/50rem;
      }
      >.remarks::-webkit-input-placeholder{
        font-family:PingFangSC-Light;
        font-size:30/50rem;
        color:#888888;
      }
      >.remarks::-moz-placeholder{   /* Mozilla Firefox 19+ */
        font-family:PingFangSC-Light;
        font-size:30/50rem;
        color:#888888;
      }
      >.remarks:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        font-family:PingFangSC-Light;
        font-size:30/50rem;
        color:#888888;
      }
      >.remarks:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        font-family:PingFangSC-Light;
        font-size:30/50rem;
        color:#888888;
      }
      >span{

      }
    }
  }
#address_linkmanDetails, #date_linkmanDetails{
  font-family:PingFangSC-Light;
  font-size:32/50rem;
  color:#888;
}
#address_linkmanDetails.selectorColor, #date_linkmanDetails.selectorColor{
  color:#000;
}

</style>




