<template>

  <div id="box" ref="box" style="background: #FFFFFF">
     <ul id="tabList">
          <li v-for="(item,index) in tabLists" @click="tabActive(index)" :class="{tabActive1:tabIndex==index}" v-if="index !=1 || isShow1">{{item}}</li>
     </ul>
    <keep-alive>
    <Repair v-if="tabIndex==0" @data="data" :numberJian="numberJian" :isEmpty="isEmpty" :choice="choice"></Repair>
    </keep-alive>

    <Cost v-if="tabIndex==1"  v-show="isShow1"></Cost>
    <Service v-if="tabIndex==2" ></Service>
    <div id="tabFoot">
      <div id="tabFoot_detail"  v-show="isShow">
          <div id="shown" @click="showno">
           </div>
           <div id="detail">
              <div id="detail_top">
                  <span>已选项目</span>
                  <span @click="emptyClick">清空服务项</span>
              </div>
              <ul id="detail_list">
                 <li v-for="(cartItem,cartIndex) in carts">
                    <p>{{cartItem.fullName}}</p>
                    <div id="detail_box">
                       <img src="../../../static/images/jian.png"  id="detail_jian" @click="reduce(cartItem,cartIndex)" />
                       <b>{{cartItem.size}}</b>
                       <img src="../../../static/images/jia.png" id="detail_jia"@click="add(cartItem,cartIndex)" />
                    </div>
                 </li>

              </ul>
           </div>
      </div>
      <div id="tabFoot_left" @click="showActive">
        <p>{{countPrice>0?'应付款':'检测费'}}
          <span>￥{{addNum}}</span>
        </p>
        <b v-if="countPrice>0">{{(maxNum?maxNum:0)+(yuanjia?yuanjia:0)}}<span></span></b>

          <ul>
            <li>已选</li>
            <li class="classLi" :class="{'styleActive':styleCssA}">{{choiceOne}}</li>
            <li class="classLi1">项</li>
          	<li><img :src="showImg"  id="Images"/></li>
          </ul>

      </div>

      <div id="tabFoot_right">
         <p @click="appointment">立即预约</p>
      </div>
    </div>
  </div>
</template>

<script>

   import {getCookie} from "@/js/cookie"
   import {Indicator} from "mint-ui"
     import Repair from "./washPage/Repair.vue"
     import Cost from "./washPage/Cost.vue"
     import Service from "./washPage/Service.vue"
     import {getSession,setSession,removerStorage,getLocalStorage,setLocalStorage} from "@/js/session"

  export default{

    data(){
          return{
            tabLists:["维修类型","费用说明","服务流程"] ,
            tabIndex : 0,
            tabIndex1 : 0,
            isShow1:false, //头部显示一个还是3个2个
            choice:0,  //选的服务项目数量
            isShow:false,
            showImg:"./static/images/bottom.png",//旋转度数图片
            catsPice:[],//找最高的价格
            carts:[], //商品详情数组
            numberJian : 0, //
            isEmpty:false,  //是否清空
            styleCssA:false,  //
            maxNum:0, //最大数字
            countPrice: 0, //求和
            zongjia:0,  //总价
            yuanjia:0,  //原价

        }
    },
    components:{
       Repair : Repair,
       Cost : Cost,
       Service : Service

    },
    computed:{
      addNum(){ //计算总价
                if(this.carts.length <= 0){
                  this.maxNum = 0;
                  this.countPrice = 0;
                }
                return  this.zongjia =( this.maxNum?this.maxNum:0+this.countPrice?this.countPrice:0).toFixed(2);


      },
      choiceOne(){ //计算选的项目数量
        return this.choice =  this.carts.length;
      }
    },

    watch:{
    	choice:function(newchoice,oldchoice){  //监听项目数量改变实现动画
    		if(newchoice){
    			 this.styleCssA = true;
    			 var a = 1;
    			 var temp=setInterval(()=>{
    			 	a--;
    			 	 if(a ==0){
    			 	 	this.styleCssA = false;
    			 	 	clearInterval(temp)
    			 	 }
    			 },1000)
    		}
    	}
    },
    methods:{
          tabActive(index){  //切换选中选中类型
            this.tabIndex=index;
            this.tabIndex1=index;
          },
          data(msg,bool,indexOne){  //子组件传来的数据，父组件接受
              if(bool == true){
                    this.styleCssA =msg.styleCss;
                    this.carts.push(msg.serviceInfo);
                    if(msg.serviceInfo.isSecondPayment == "1"){
                        this.catsPice.push(msg.serviceInfo.price1);
                      this.maxNnmber();
                    }else if(msg.serviceInfo.isSecondPayment == "0"){
                          this.countPrice +=msg.serviceInfo.price2DiscountFee*1;
                           this.yuanjia +=msg.serviceInfo.price2*1;
                    }
              }else if(bool == false){
                    this.carts.forEach((v,i)=>{
                      if(msg.serviceInfo.id===v.id){
                        this.carts.splice(i,1); //删除选中的服务
                         if(msg.serviceInfo.isSecondPayment == "1"){
                           this.catsPice.splice(i,1); //删除选中的选择项
                           this.maxNnmber();
                              }else if(msg.serviceInfo.isSecondPayment == "0"){
                                    this.countPrice -=v.price2DiscountFee*1;
                                     this.yuanjia -=msg.serviceInfo.price2*1;
                              }
                          }
                  })
            }

         },
         showActive(){ //选中的详情页面

            if(this.carts.length <= 0){
              return this.$Toast("你还没购买服务，请先购买服务")
            }else{
              this.isEmpty = false;
              this.isShow = !this.isShow;
              if(this.isShow == true){
                this.showImg = "./static/images/buttomTop.png";
              }else{
                this.showImg = "./static/images/bottom.png";
              }
            }

         },
           reduce(item,index){       //--
              item.size--;
             if(item.isSecondPayment == "1"){
               this.maxNnmber();
             }else if(item.isSecondPayment == "0"){
               this.countPrice  -=item.price2DiscountFee*1;
               this.yuanjia -=item.price2*1;
               if( this.countPrice <= 0){
                 this.countPrice =0;
                 this.yuanjia = 0;
               }
             }
             if(item.size == 0){
                 this.maxNum = 0;
                 this.carts.splice(index,1);
                 this.choice = this.choice-1;
                  this.carts = this.carts.filter(function(item1){
             return  item1 != item
           })
                 this.numberJian = item;
                 this.maxNnmber();

             }
             this.noCarts()
           },
           add(item,index){//++

               if(item.isSecondPayment == "1"){
                 this.$Toast("此服务只能选一次");
                 this.maxNnmber();
                 item.size =1;

              }else if(item.isSecondPayment == "0"){
                 item.size++;
                 this.countPrice  +=  item.price2DiscountFee*1  ;
                 this.yuanjia -=item.price2*1;
              }
           },

         appointment(){ //立即预约
            if(this.carts.length <= 0){
                  this.$Toast("还没购买服务");
                  setTimeout(()=>{
                    location.reload();
                  },500)
            }else{
               removerStorage("fullName");
              //有购买保存到setLocalStorage
              this.$store.commit("changeAddServerPath",this.$route.path);
              if(getLocalStorage("fullName")!=""&&getLocalStorage("fullName")[0].farterId!==this.$route.params.id){
                removerStorage("fullName");   //如果发现一级分类的id和存储的id 不一致，就清除；
                removerStorage("server");
              }
              if(this.$store.state.paths==="o"){  //o为其他路口进来  //n为添加服务进来
                  removerStorage("fullName");
                  this.$store.commit("changeUserInfoDiscountId","");
                  this.$store.commit("changeIsSuperposition",1);
                  this.$store.commit("changeDiscountFacevalue",0);
                  this.$store.commit("changeCouponText","请选择优惠券");
              }
              this.$store.commit("changePaths","o");
              this.carts.forEach((v,i)=>{
                    this.carts[i].tagsName=[];
                    this.carts[i].farterId=this.$route.params.id;   //保留分类的一级id
                    setLocalStorage("fullName",v)
              });
//      重新计算折扣后价格； 新版本  start
                  let token=getCookie(),areaId=getSession()[0].id,tagsNameArr=[],
                      changLoginPathMessage=`/affirmorder?labelId=${this.carts[0].labelId}&tagsNameArr=${tagsNameArr}&farterId=${this.$route.params.id}`;
                      this.$store.commit("changeLoginPath",changLoginPathMessage);
                      this.$router.push({path:"/affirmorder"});
                      window.location.href=`${this.$common.pathDomain}/#/affirmorder`
              if(!token){
                this.$store.commit("changeLoginPath",changLoginPathMessage);
                setTimeout(()=>{
                  this.$router.push({path:"/login"});
                },500)
              }
            }
         },
         emptyClick(){ //清空服务项
              this.carts.splice(0,this.carts.length);
              this.isShow = false;
              this.isEmpty = true;
              this.noCarts()
         },
         showno(){ //选择清单消失
         	 this.isShow = false;
         	 this.showImg = "./static/images/bottom.png";
         },
        noCarts(){ //没有购买服务服务清单消失
            if(this.carts.length <= 0){
               this.showno()
            }
         },
         maxNnmber(){ //选择最大数一口价的
               this.maxNum = this.catsPice[0];
               for(let i=0;i<this.catsPice.length;i++){
                 if(this.maxNum <this.catsPice[i]){
                   this.maxNum = this.catsPice[i];
                 }
               }
         }

    },
    mounted(){
    },
    created(){

      if(this.$store.state.paths === "o"){
            removerStorage("fullName");
      }else if(this.$store.state.paths === "n"){
           this.carts = getLocalStorage("fullName");
            this.carts.forEach((v,i)=>{

               if(v.isSecondPayment == "1"){
                 this.catsPice.push(v.price1);
                  this.maxNnmber();
               }else if(v.isSecondPayment == "0"){
                 this.countPrice +=v.price2DiscountFee*v.size;
                 this.yuanjia +=v.price2*v.size;
               }
            })
      }
      //看头部是三个tab还是两个
     if(this.$route.params.id === "001" || this.$route.params.id === "009"){
        this.isShow1 = false;
     }else{
          this.isShow1 = true;
     }

    }
}
</script>

<style scoped lang="less">
#box{

   background:#ffffff;
   #tabList{
    width: 100%;
    height: 163/50rem;
     display: flex;
    padding: 50/50rem 0 60/50rem;
    background:#ffffff;
    li{
      float: left;
      flex: 1;
      height: 53/50rem;
      font-size: 38/50rem;
      color: #888888;
      text-align: center;
      letter-spacing:0;
       background:#ffffff;
    }
     .tabActive1{
       font-weight: 900;
       color: #000000;

     }
 }
  #tabFoot{
    width:100%;
    height: 126/50rem;
    background:#ffffff;
    box-shadow:2/50rem 0/50rem 8/50rem 6/50rem rgba(221,221,221,0.50);
    position: absolute;
    left: 0;
    bottom: 0;
    #tabFoot_detail{
      position: absolute;
      width: 100%;
      height: 1200/50rem;
      top: -1200/50rem;
      left: 0;
      box-shadow:0/50rem 1/50rem 4/50rem 3/50rem rgba(221,221,221,0.50);
      #shown{
        width: 100%;
        height: 872/50rem;
        background: black;
        opacity: 0.3;
      }
      #detail{
        width: 100%;
        background: #fff;
        height: 328/50rem;
        overflow: auto;
        border-bottom: ;
        #detail_top{
          width: 100%;
          height: 40/50rem;
          margin: 35/50rem 0 57/50rem 0;
          span:nth-child(1){
            float: left;
            margin: 0 35/50rem;
            font-family:PingFangSC-Light;
            font-size:28/50rem;
            color:#bababa;
            letter-spacing:0/50rem;
            text-align:left;
          }
          span:nth-child(2){
            float: right;
            margin: 0 35/50rem;
            font-family:PingFangSC-Light;
            font-size:28/50rem;
            color:#000000;
            letter-spacing:0/50rem;
            text-align:left;
          }
        }
        #detail_list{
           width: 100%;
           height: 218/50rem;
           li{
              margin:0 0 67/50rem 0;
              p{
                display: inline-block;
                width: 500/50rem;
                font-family:PingFangSC-Light;
                font-size:30/50rem;
                color:#000000;
                letter-spacing:0/50rem;
                text-align:left;
                margin-left: 35/50rem;
                line-height: 50/50rem;
                height: 50/50rem;
              }
              #detail_box{
                display: inline-block;
                width: 180/50rem;
                overflow: hidden;
                float: right;
                margin-right: 35/50rem;
                #detail_jian{
                  display: inline-block;
                  width: 48/50rem;
                  height: 48/50rem;
                  border: 0;
                  float: left;
                }
                #detail_jia{
                  float: right;
                  display: inline-block;
                  width: 48/50rem;
                  height: 48/50rem;
                  border: 0;
                }
                b{
                  font-family:PingFangSC-Medium;
                  font-size:30/50rem;
                  color:#4a4a4a;
                  text-align:left;
                  margin-left: 35/50rem
                }
             }

           }

        }
      }
    }
    #tabFoot_left{
      width: 360/50rem;
      height:100%;
      float: left;
      overflow: hidden;
      position: relative;
      p{
        height:40/50rem;
        line-height: 40/50rem;
        font-family:PingFangSC-Semibold;
        font-size:24/50rem;
        color:#000000;
        text-align:left;
        margin-top: 14/50rem;
        padding-left: 10/50rem;
        span{
          font-family:PingFangSC-Semibold;
          font-size:26/50rem;
          color:#ea5413;
          text-align:left;
          position: absolute;
        }

      }
      b{
        display: block;
        height:42/50rem;
        font-size:24/50rem;
        margin-top: 14/50rem;
        font-family:PingFangSC-Medium;
        color:rgba(186,186,186,1);
        line-height:42/50rem;
        position: absolute;
        left:200/50rem;
        top:0;
        span{
          display: inline-block;
          width: 100%;
          height: 1/50rem;
          position: absolute;
          left: 0;
          top: 40%;
          text-align: center;
          background: rgba(186,186,186,1);
        }
      }
      ul{
        width: 100%;
        height: 100%;
        background:#ffffff;
        font-family:PingFangSC-Medium;
        font-size:24/50rem;
        color:#ea5413;
        text-align:left;
        position: relative;
        margin-top: 16/50rem;
        padding-left: 10/50rem;
        li{
        		float: left;
        	}
        li:nth-child(4) {
          position: absolute;
          left: 4.5rem;
          img {
            margin-top: 10/50rem;
            display: inline-block;
            width: 26/50rem;
            height: 17/50rem;
          }
        }

            .classLi{
        	     	background:url(../../../static/images/fangda2.png) no-repeat center ;
		        		width: 42/50rem;
		        		height: 42/50rem;
		        		border-radius:100% ;
		        		margin: 0 5/50rem;
		        		color: #ffffff;
		        		font-size: 24/50rem;
		        		text-align: center;
		        		line-height: 42/50rem;


        	}
        	.classLi1{
        		position: absolute;
            left: 2.25rem;
        		top: 0;
        	}

        	.styleActive{
        		   background:url(../../../static/images/fangda1.png) no-repeat center ;
		        		width: 50/50rem;
		        		height: 50/50rem;
		        		border-radius:100% ;
                margin: 0 5/50rem;
		        		color: #ffffff;
		        		font-size: 24/50rem;
		        		text-align: center;
		        		line-height: 50/50rem;
		        		-webkit-animation: pulsate-bck 0.5s ease-in-out infinite both;
	              animation: pulsate-bck 0.5s ease-in-out infinite both;
        	}


        img{
          display: block;
          position: absolute;
          right: 0.9rem;
          top: 0/50rem;
          width:26/50rem;
          height:36/50rem;
        }
      }

    }
     #tabFoot_right{
      width: 320/50rem;
      height:100%;
      float: right;
       position: relative;
       right: 0.58rem;
      p{
        width: 320/50rem;
        margin: 6% 10% 0 10%;
        border-radius:100/50rem;
        text-align: center;
        line-height:90/50rem;
        color: #FFFFFF;
        font-size: 34/50rem;
        position: absolute;
        height: 1.8rem;
        right: -0.58rem;
        background: url(../../../static/images/jingbian1.png)  no-repeat center;
      }
    }
  }
}

  @-webkit-keyframes pulsate-bck {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes pulsate-bck {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}


</style>


