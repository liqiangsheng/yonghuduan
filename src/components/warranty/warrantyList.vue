<template>
  <div id="box">
   <mt-navbar v-model="selected">
		  <mt-tab-item id="1"><span style="font-size:.64rem">有效质保卡</span></mt-tab-item>
		  <mt-tab-item id="2"><span style="font-size:.64rem">失效质保卡</span></mt-tab-item>
</mt-navbar>
<!-- tab-container -->
<mt-tab-container v-model="selected" :swipeable="bool">
  <mt-tab-container-item id="1">
    <!--待付款-->
   	<div class="keep_container" v-show="invalid.coreMainOrderServiceCards.length">
   		<ul>
		    <li v-for="(item,index) in invalid.coreMainOrderServiceCards" :key="index" >
          <div class="top">
              <div class="left">
                  <div class="div1"><span class="dingding1"></span></div>
                  <div class="div2"><p class="dingding2">叮叮服务保障卡</p></div>
              </div>
              <div class="right">
                  <div class="content">
                    <p>工单号: {{item.mainOrderId}}</p>
                    <p>期限: {{item.serviceTimeComplete|moment('YYYY.MM.DD')}} - {{item.warrantyDatetime|moment('YYYY.MM.DD')}}</p>
                    <p class="zzz">{{item.serviceFullName}}</p>
                  </div>
                <div class="content">
                  <span class="shouhou" @click="tel" v-if="item.list?!item.list.length:true">申请售后</span>
                </div>
              </div>
          </div>
          <div class="bottom" v-if="item.list?item.list.length:false">
            <div class="bottomOne" v-for="ite in item.list" >
              <p>返修单号：{{ite.childOrderId}}</p>
              <p>服务时间：{{ite.appointmentDatetime|moment('YYYY.MM.DD')}}</p>
              <p> 师傅姓名：{{ite.masterName}}</p>
              <p>师傅工号：{{ite.masterId}}</p>
              <span class="contact" @click="tel">联系客服</span>
              <span class="tip">{{ite.state|BackOrderStatus}}</span>
              <!--<span class="contact" v-if="ite.state==12||ite.state==17||ite.state==18" @click="comment(ite)">评价</span>-->
            </div>
          </div>
		    </li>
		</ul>
      <p v-show="loading" class="page-infinite-loading loading-list">
        <mt-spinner  type="fading-circle"></mt-spinner>
        加载中...
      </p>
   	</div>
    <div class="alert" v-show="!invalid.coreMainOrderServiceCards.length">
      <img src="../../assets/images/wuzhibaoka.png" alt="">
      <p>你现在没有质保卡哦！</p>
    </div>
  </mt-tab-container-item>

  <mt-tab-container-item id="2">
    <div class="keep_container2" v-show="effective.coreMainOrderServiceCards.length">
      <ul>
        <li v-for="(item,index) in effective.coreMainOrderServiceCards" :key="index">
          <div class="top">
            <div class="left">
              <div class="div1"><span class="dingding1"></span></div>
              <div class="div2"><p class="dingding2">叮叮服务保障卡</p></div>
            </div>
            <div class="right">
              <div class="content">
                <p>工单号: {{item.mainOrderId}}</p>
                <p>期限: {{item.serviceTimeComplete|moment('YYYY.MM.DD')}} - {{item.warrantyDatetime|moment('YYYY.MM.DD')}}</p>
                <p>{{item.serviceFullName}}</p>
              </div>
              <span class="shouhou">申请售后</span>
            </div>
          </div>
          <div class="bottom" v-if="false">
            <div class="bottomOne" v-for="ite in item.list" >
              <p>返修单号：{{ite.childOrderId}}</p>
              <p>服务时间：{{ite.appointmentDatetime|moment('YYYY.MM.DD')}}</p>
              <p> 师傅姓名：{{ite.masterName}}</p>
              <p>师傅工号：{{ite.masterId}}</p>
            </div>
          </div>
        </li>
      </ul>
      <p v-show="loading1" class="page-infinite-loading loading-list">
        <mt-spinner  type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
    <div class="alert" v-show="!effective.coreMainOrderServiceCards.length">
      <img src="../../assets/images/wuzhibaoka.png" alt="">
      <p>你现在没有失效质保卡哦！</p>
    </div>
  </mt-tab-container-item>

</mt-tab-container>
  </div>
</template>
<script>
 import {setCookie,getCookie} from "@/js/cookie"
 import {getLocalStorage,setSessionQrcodeId,getSessionQrcodeId,removerStorage} from "@/js/session"
// import common from "@/js/baseHttp"
 import {Toast} from "mint-ui";
 import { Indicator } from 'mint-ui';
 import { InfiniteScroll } from 'mint-ui';


export default {
  components:{

  },
  data () {
    return {
      loading:false,
      loading1:false,
      bool:true,
      selected:"1",
      show1:false,
      show2:false,
      pages:{
        pageNo:1,
        pageSize:5,
      },
      effective:{
        coreMainOrderServiceCards:[]
      },//失效质保卡

      pages1:{
        pageNo:1,
        pageSize:5,
      },
      invalid:{
        coreMainOrderServiceCards:[]
      },  //有效质保卡
      qqq:"1"

    }
  },

  methods:{
    tel(){
      window.location.href = "tel:4009991891";
    },
    comment(masterInfo){
      masterInfo.id=masterInfo.childOrderId;
      masterInfo.path=this.$route.path;
      setSessionQrcodeId("masterInfo",masterInfo);
      this.$router.push({path:"/comment"});
    },

    getData(){
      let token=getCookie();
      if(token){
        let url=`${common.apidomain}/order/serviceCard/findPage`;
        let params={params:{
            "token":token,
          }};
        this.$http.get(url,params).then(res=>{
          let data=res.data;

          if(data.code==="0000"){

//            失效质保卡对象
            if(data.result.expiredList.coreMainOrderServiceCards){
              this.effective.coreMainOrderServiceCards=data.result.expiredList.coreMainOrderServiceCards;
            }
//            有效质卡保对象
            if(data.result.notExpiredList.coreMainOrderServiceCards){
              this.invalid.coreMainOrderServiceCards=data.result.notExpiredList.coreMainOrderServiceCards;
            }

            Indicator.close();

          }else{
            Toast(res.data.error);
            Indicator.close();
          }
        })

      }else{
        Indicator.close();
        this.$store.commit("changeLoginPath",this.$route.path);
        setTimeout(()=>{
          this.$router.push({path:"/login"});
        },1000)
      }
    },

//    分页注释
//    getData(){
//      let token=getCookie();
//      if(token){
//        let url=`${common.apidomain}/order/serviceCard/findPage`;
//        let params={params:{
//          "token":"7E972BD6FB674989A6D59A415EEE89A7",
//          "pageNo":this.pages.pageNo,
//          "pageSize":this.pages.pageSize
//        }};
//        this.$http.get(url,params).then(res=>{
//          let data=res.data;
//          if(data.code==="0000"){
////            有效质卡保对象
////            this.effective=data.result.expiredList;
//            this.pages.pageNo=data.result.expiredList.pageNo;
//            this.pages.pageSize=data.result.expiredList.pageSize;
//            this.pages.pageTotal=data.result.expiredList.pageTotal;
//            this.pages.total=data.result.expiredList.total;
//            this.effective.coreMainOrderServiceCards=this.effective.coreMainOrderServiceCards.concat(data.result.expiredList.coreMainOrderServiceCards);
//            this.loading = false;
//
////          if(data.result.expiredList.coreMainOrderServiceCards[0].list.length==0){
////              this.showbutton=true;
////            }else{
////            this.showbutton=false;
////          }
////
////          if(data.result.notExpiredList.coreMainOrderServiceCards[0].list.length==0){
////            this.showbutton1=true;
////          }else{
////            this.showbutton1=false;
////          }
//
//          }else{
//            Toast(res.data.error);
//            Indicator.close();
//          }
//        });
//      }else{
//        Indicator.close();
//        this.$store.commit("changeLoginPath",this.$route.path);
//        setTimeout(()=>{
//          this.$router.push({path:"/login"});
//        },1000)
//      }
//    },

    //分页注释
//    getData1(){
//      let token=getCookie();
//      if(token){
//        let url2=`${common.apidomain}/order/serviceCard/findPage`;
//        let params2={params:{
//          "token":"7E972BD6FB674989A6D59A415EEE89A7",
//          "pageNo":this.pages1.pageNo,
//          "pageSize":this.pages1.pageSize
//        }};
//        this.$http.get(url2,params2).then(res=>{
//          let data=res.data;
//          if(data.code==="0000"){
////            失效质保卡对象
////            this.invalid=data.result.notExpiredList;
//            this.invalid.coreMainOrderServiceCards=this.invalid.coreMainOrderServiceCards.concat(data.result.notExpiredList.coreMainOrderServiceCards);
//            this.pages1.pageNo=data.result.notExpiredList.pageNo;
//            this.pages1.pageSize=data.result.notExpiredList.pageSize;
//            this.pages1.pageTotal=data.result.notExpiredList.pageTotal;
//            this.pages1.total=data.result.notExpiredList.total;
//            this.loading1 = false;
//            Indicator.close();
//
//          }else{
//            Toast(res.data.error);
//            Indicator.close();
//          }
//        })
//      }else{
//        Indicator.close();
//        this.$store.commit("changeLoginPath",this.$route.path);
//        setTimeout(()=>{
//          this.$router.push({path:"/login"});
//        },1000)
//      }
//    },

    //分页注释
//    fang1(){
//      let _this=this;
//      console.log("111");
//      window.onscroll=function(){
//        console.log("333");
//        if(window.innerHeight + document.documentElement.scrollTop === document.body.scrollHeight){
//          console.log("444");
//          if(_this.pages.pageNo<_this.pages.pageTotal){
//            console.log("555");
//            _this.pages.pageNo++;
//            _this.loading=true;
//            _this.getData()
//          }
//        }
//      };
//    },

    //分页注释
//    fang2(){
//      let _this=this;
//      console.log("1111");
//      window.onscroll=function(){
//        console.log("3333");
//        if(window.innerHeight + document.documentElement.scrollTop === document.body.scrollHeight){
//          console.log("4444");
//          if(_this.pages1.pageNo<_this.pages1.pageTotal){
//            console.log("5555");
//            _this.pages1.pageNo++;
//            _this.loading1=true;
//            _this.getData1()
//          }
//        }
//      };
//    },
  },
  watch:{
    //分页注释
//    "selected":function(o,l){
//      console.log(o);
//      if(o=="1"){
//       this.fang1()
//     }else if(o=="2"){
//       this.fang2()
//     }
//    }
  },
   mounted(){
     document.title="质保卡";

    },
    created(){
      //分页注释
//      this.fang1();
      Indicator.open('加载中');
      if(window.location.href.indexOf(common.pathDomain)!==-1){
        //分页注释
//        this.getData();
//        this.getData1();
        this.getData();
      }else{
        setTimeout(()=>{
          //分页注释
//          this.getData();
//          this.getData1()
          this.getData();
        },1000)
      }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page-infinite-loading{
  margin:0 auto;
}

.alert{
    width:100vw;
    height:85vh;
    text-align: center;
    >img{
      transform:translateY(50%);
      width:380/50rem;
      height: 380/50rem;
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
  margin-bottom:1.96rem;
.mint-tab-item{
	font-family: PingFangSC-Regular;
	font-size: 32/50rem;
	padding-top:.7rem;
	letter-spacing: 0;
}
>.mint-navbar{
	height:100/50rem;
}
}
.mint-navbar {
	.mint-tab-item.is-selected{
		border-bottom: 3px solid #EB5312;
		color:#EB5312;
	}
}
.mint-tab-item-label{
	font-family: PingFangSC-Regular;
	font-size: 32/50rem;
	letter-spacing: 0;
}

/*失效的*/
.keep_container2{
    margin-top:.5rem;
    >ul{
      padding:0 20/50rem;
      >li{
        margin:20/50rem 0;
        >.top{
          /*height: 5.1rem;*/
          width:100%;
          display: flex;
          >.left{
            flex:1;
            display: flex;
            flex-direction: column;
            background: #D8D8D8;
            >.div2{
              display: flex;
              flex:1;
              >.dingding2{
                font-family: PingFangSC-Regular;
                margin: auto;
                width: 3.8rem;
                height: 1.8rem;
                text-align: center;
                font-size: 32/50rem;
                color: #fff;
                line-height: 45/50rem;
              }
            }
            >.div1{
              display: flex;
              flex:1;
              >.dingding1{
                margin: auto;
                display: block;
                width: 2rem;
                height: 2rem;
                background: url("../../assets/images/zhibaoka.png") no-repeat;
                background-size: 2rem;
              }
            }
          }
          >.right{
            position: relative;
            flex: 2;
            background:#F3F3F3 url("../../assets/images/shixiao.png") no-repeat;
            background-position: right top;
            background-size: 103/50rem 103/50rem;
            >.content{
              >.shouhou{
                position: absolute;
                bottom:0.6rem;
                right:0.6rem;
                display: block;
                width: 3rem;
                height:56/50rem;
                font-size: 24/50rem;
                color: #CECECE;
                border:1px solid #CECECE;
                text-align: center;
                line-height: 56/50rem;
                border-radius:20/50rem;
              }
            }
            >.content{
              width: 7rem;
              margin-left: 1rem;
              >p{
                color:#CECECE;
                font-size: 24/50rem;
                line-height: 44/50rem;
              }
            }
          }
        }
        >.bottom{
          >.bottomOne{
            width: 100%;
            padding:20/50rem;
            box-sizing: border-box;
            background: #F3F3F3;
            position: relative;
            >p{
              color: #9B9B9B;
              font-size: 24/50rem;
              line-height: 40/50rem;
            }
            >.contact{
              position: absolute;
              bottom:0.4rem;
              right:0.4rem;
              display: block;
              width: 3rem;
              height:56/50rem;
              font-size: 24/50rem;
              color: #EA5312;
              border:1px solid #EA5312;
              text-align: center;
              line-height: 56/50rem;
              border-radius:20/50rem;
            }
            >.tip{
              color:#EA5312;
              font-size: 24/50rem;
              position: absolute;
              top:0.4rem;
              right: 0.4rem;
            }
          }

        }
      }
    }
  }

/*有效的*/
.keep_container{
	margin-top:.5rem;
  >ul{
  	padding:0 20/50rem;
    >li{
    	margin:20/50rem 0;
      width:100%;
      >.top{
        /*height: 5.1rem;*/
        width:100%;
        display: flex;
        >.left{
          flex:1;
          display: flex;
          flex-direction: column;
          background: url("../../assets/images/zhib.png") no-repeat;
          background-size: 100% 100%;
          >.div2{
            display: flex;
            flex:1;
            >.dingding2{
              font-family: PingFangSC-Regular;
              margin: auto;
              width: 3.8rem;
              height: 1.8rem;
              text-align: center;
              font-size: 32/50rem;
              color: #fff;
              line-height: 45/50rem;
            }
          }
          >.div1{
            display: flex;
            flex:1;
            >.dingding1{
              margin: auto;
              display: block;
              width: 2rem;
              height: 2rem;
              background: url("../../assets/images/zhibaoka.png") no-repeat;
              background-size: 2rem;
            }
          }
        }
        >.right{
          position: relative;
          flex: 2;
          background: #fff;
          background:#fff url("../../assets/images/zhibao.png") no-repeat;
          background-position: right top;
          background-size: 74/50rem 77/50rem;
          >.content{
            padding-bottom: 0.4rem;
            >.shouhou{
              /*position: absolute;*/
              margin-left: 5rem;
              bottom:0.4rem;
              right:0.4rem;
              display: block;
              width: 3rem;
              height:56/50rem;
              font-size: 24/50rem;
              color: #EA5312;
              border:1px solid #EA5312;
              text-align: center;
              line-height: 56/50rem;
              border-radius:20/50rem;
            }
          }
          >.content{
            width: 7rem;
            margin-left: 1rem;
            >p{
              color:#FE9E09;
              font-size: 24/50rem;
              line-height: 44/50rem;
            }
            >.zzz{
              /*overflow: hidden;*/
              /*text-overflow:ellipsis;*/
              /*white-space: nowrap;*/
            }
          }
        }
      }
      >.bottom{
        >.bottomOne{
          width: 100%;
          padding:20/50rem;
          box-sizing: border-box;
          background: #fff;
          position: relative;
          >p{
            color: #9B9B9B;
            font-size: 24/50rem;
            line-height: 40/50rem;
          }
          >.contact{
            position: absolute;
            bottom:0.4rem;
            right:0.4rem;
            display: block;
            width: 3rem;
            height:56/50rem;
            font-size: 24/50rem;
            color: #EA5312;
            border:1px solid #EA5312;
            text-align: center;
            line-height: 56/50rem;
            border-radius:20/50rem;
          }
          >.tip{
            color:#EA5312;
            font-size: 24/50rem;
            position: absolute;
            top:0.4rem;
            right: 0.4rem;
          }
        }

      }
    }
  }
}



.mui-table-view-cell:after{
  background:none;
}
.mui-table-view-cell:last-of-type{
  border-bottom:none;
}

  /*支付*/

  /*&.fade-enter-active, &.fade-leave-active{*/
    /*transition: all 2s ease*/
  /*}*/

 /*&.fade-enter, &.fade-leave-active{*/
   /*transform:translateX(100px);*/
  /*}*/


</style>
<style lang="less">
  .loading-list{
    padding-bottom:.5rem;
    background:#fff;
    text-align: center;
    >span{
      overflow: hidden;
      >.mint-spinner-fading-circle{
        display: inline-block;
        vertical-align: middle;
        /*transform:transformY(100%);*/
      }
    }
  }
</style>
