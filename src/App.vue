<template>
  <div>
    <!-- 1.0 利用mint-ui中的header组件实现整个系统的头部 -->
   <!--  <mt-header  class="title" fixed :title="title" v-if="isWix">
    </mt-header> -->
    <!-- 2.0 利用vue-router的 <router-view>进行占位 -->
    <!--<transition name="fade">-->
      <router-view></router-view>
    <!--</transition>-->

    <!-- 3.0 利用mui中的tabbar组件实现系统的底部 -->
     <nav class="footer_nav" v-show="isShow">
      <router-link class="route_link" to="/home">
        <span class="icon home"></span>
        <span class="text">首页</span>
      </router-link>
      <router-link to="/order" class="route_link">
        <span class="icon order">
        </span>
        <span class="text">订单</span>
      </router-link>
      <router-link class="route_link" to="/mine">
        <span class="icon mine"></span>
        <span class="text">我的</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
  import {isWeixin,Fn} from "./js/isWeixin"
  import {getOpenIdToken} from "./js/getOpenIdToken"
  import {getLocalStorage,setLocalStorage,getSession,setIsOpenId,setSession,getIsOpenId,removerStorage} from "./js/session"
  import {getOpenID,setOpenID} from "./js/cookie"
//  import common from "@/js/baseHttp"
  import {setCookie,getCookie} from "./js/cookie"
  import {title} from "./js/document_title"
  import {Toast} from 'mint-ui';
//   let image=document.getElementById("loadingImg");
//       image.style.display="none";
    export default{
        data(){
            return{
              isShow:true,
              isWix:true,
              title:"叮叮快修"
            }
        },
        methods:{
          GetQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
          },
          fetchDate(){
              if(this.$store.state.name!=""){
                    this.title=this.$store.state.name;
              }
            let path=this.$route.path;
              var titleRouter=path.substring(1,3);
                title(titleRouter);
            if(path==="/home" || path==="/order" || path==="/mine"){
              this.isShow=true;
              return;
            }
              this.isShow=false;
          },
        },
        mounted(){
//          console.log($);

//          const url= `https://api.weixin.qq.com/sns/userinfo?access_token=${getCookie()}&openid=${getOpenID()}&lang=zh_CN`
//          console.log(url);

//          console.log(this.$http.jsonp);
//            this.$http.get(url).then(res=>{
//              console.log(res);
//            })
        },
        created() {
          const request=this.$route.query;
          if(!!request.relevanceKey&&!!request.relevanceType){
            this.$common.getRequest.relevanceKey=request.relevanceKey;
            this.$common.getRequest.relevanceType=request.relevanceType
          }
          Fn(this);
//          console.log(isWeixin());
//调用监听路由方法           start
          this.fetchDate();
//调用监听路由方法           end
//  setOpenID("oxyN902bo4VF-o77hDaNJKbiB-i8");
//  setCookie("3F82ED82B5A74CD79F88C345B867BA6B");
// return;

        getOpenIdToken(this);
        this.$commonJs.getPosition.call(this);
        },
        watch: {
          // 如果路由有变化，会再次执行该方法
          "$route": "fetchDate",
          "$route.path":function(v,g){
            if(g==="/staymoney"){
              history.go(0)
            }
          }
        }
    }

</script>
<style scoped lang="less">
.footer_nav{
  width:100%;
  height:98/50rem;
  position:fixed;
  bottom:0;
  border-top:1px solid #E6E6E6;
  left:0;
     >.route_link{
      width:33.3%;
      display: inline-block;
      background:#fff;
      height: 100%;
      float:left;
      position:relative;
      >.text{
        font-family: PingFangSC-Regular;
        font-size: 22/50rem;
        color: #9B9B9B;
        position:absolute;
        left:50%;
        bottom:0.08rem;
        transform:translateX(-50%);
      }
      >.icon{
        display: block;
        transform:translateY(30%);
        margin:0 auto;
        height:40/50rem;
        width:40/50rem;
      }
      >.order{
          background:url(./assets/images/dingdan2.png) center center no-repeat;
          background-size: 100% 100%;
      }
       >.mine{
          background:url(./assets/images/wode1.png) center center no-repeat;
          background-size: 100% 100%;
      }
      >.home{
          background:url(./assets/images/home.png) center center no-repeat;
          background-size: 100% 100%;
      }
    }
    >.router-link-active{
      >.text{
        color:#EB5312;
        }
       >.order{
          background:url(./assets/images/dingdan1.png) center center no-repeat;
          background-size: 100% 100%;
      }
       >.mine{
          background:url(./assets/images/wo.png) center center no-repeat;
          background-size: 100% 100%;
      }
      >.home{
          background:url(./assets/images/home2.png) center center no-repeat;
          background-size: 100% 100%;
      }
    }
}
input{
  margin-top:500px;
  width:200px;
  height:30px;
}
  .title{
    background:#000;
    height:88/50rem;
  }
  .mui-tab-item {
      >.mine{
          height:40/50rem;
          width:40/50rem;
          background:url(../static/images/wode1.png) center center no-repeat;
          background-size: 100% 100%;
          display: inline-block;
      }
    }
     .mui-bar-tab{
      height:98/50rem;
     }
/*&.fade-enter-active, &.fade-leave-active{*/
  /*transform:translatedX(100px);*/
/*transition: all 1s ease;*/

/*}*/
/*&.fade-enter, &.fade-leave-active{*/
  /*transform:translatedX(0px);*/
/*}*/

</style>


