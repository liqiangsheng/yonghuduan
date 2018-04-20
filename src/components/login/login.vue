<template>
  <div id="box" ref="box" style="padding-top:0;">

      <mt-header title="登录">
        <router-link to="/home" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
        <div class="login">
          <div class="tel">
            <p>手机号</p>
            <input type="tel" class="telNumber" placeholder="请输入手机号" v-model="tel" @keyup="telTest(tel)">
          </div>
          <div class="tel test_and_verify">
             <p>验证码</p>
                <input  type="tel" class="telNumber test" placeholder="请输入验证码"  v-model="test">
                <span @click="send" :class="{send_to:isSendTo}">{{point}}</span>
        </div>
      </div>
        <button class="submit" @click="submit" :class="{active:(tel.length==11)&&test!=''}">确定</button>
        <p class="state"> 点击确定表示您已同意叮叮快修<router-link to="/userProtocol" tag="span">《用户协议》</router-link></p>
</div>
</template>
<script>
 import { Indicator } from 'mint-ui';
 import {setCookie,getCookie,getOpenID,setOpenID} from "@/js/cookie"
 import {getSession,setSessionUserInfo,getSessionUserInfo} from "@/js/session"
 export default {
  data () {
    return {
    	 height:window.innerHeight,
       test:"",
       tel:"",
       tonken:"",
       isSendTo:false,
       point:"获取验证码"
    }
  },
  methods:{
    telTest(val){
      if(val.length>=11&&!(/^1[34578]\d{9}$/.test(this.tel))){
        this.$Toast("手机号格式不正确");
      }
    },
    send(){
      if(this.isSendTo){
        return;
      }
      if(this.tel.length!==11){
        this.$Toast("手机号格式不正确");
        return;
      }
      if(this.tel.length>=11&&!(/^1[34578]\d{9}$/.test(this.tel))){
        this.$Toast("手机号格式不正确");
        return false
      }else{
             let url=`${this.$common.apidomain}/authCodeInfo/getValidationCode?phoneNum=${this.tel}`;
             this.$http.get(url).then(res=>{
                this.$Toast(res.data.result)
             });
            this.isSendTo=true;
            let count=60,
            pic=setInterval(()=>{
                count--;
                this.point=count+"秒后重新发送";
                if(count===0){
                  clearInterval(pic);
                  this.isSendTo=false;
                  this.point="获取验证码"
              }
          },1000)
      }
    },
    submit(){
       let cityId= getSession()[0].id;
      if(!this.test){
        this.$Toast("短信验证码错误");
      }else{
       let Request= this.$common.getRequest;
          let url =`${this.$common.apidomain}/authCodeInfo/confirmLogin`;
          let param={
            "phoneNum":this.tel,"authCode":this.test,
            "cityId":cityId,
            "openId":getOpenID(),
            "relevanceType":Request.relevanceType,
            "relevanceKey":Request.relevanceKey
            };
            this.$http.post(url,param).then(res=>{
              let data=res.data;
              let _this=this,paths=this.$store.state.loginPath;
              if(data.code==="0000"){
                setSessionUserInfo("userInfo",data.result);
                this.tonken=data.result.token;
                this.$Toast({
                  message: '登录成功',
                  iconClass: 'mintui mintui-success'
                });
                setCookie(this.tonken);
                setTimeout(()=>{
                     _this.$router.push({path:paths})
                },1000)
              }else{
                  this.test="";
                  this.$Toast(data.error);
              }
            })
      }
    }
  },
   mounted(){

   },
    created(){
      if(getSession().length<=0){
        this.$commonJs.getPosition.call(this);
      }
     if(getCookie()&&getSessionUserInfo("userInfo")){
       this.$router.push({path:"/"})
     }
      Indicator.close();
      Indicator.close();
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #box{
    height:100vh;
    margin:0;
    padding-top:0;
    .mint-header{
      background:#000;
      .mint-header-title{
        font-size:36/50rem;
      }
    }
  }
.login{
    // margin-top:30%;
    >.tel{
     display: flex;
     padding:.4rem 32/50rem;
     border-bottom: 1px solid rgba(0,0,0,0.1);
     >p{
      width:2.5rem;
      height:70/50rem;
      font-size: 28/50rem;
      line-height: 70/50rem;
     }
     >.telNumber{
      border:none;
      flex:1;
      padding:0;
      height:70/50rem;
      margin-bottom: 0;
     }
      .test{
        width:320/50rem;
      }
     >span{
      line-height: 70/50rem;
      width:3rem;
      text-align: right;
      color:#EB5312;
      font-size: 26/50rem;
     }
     >.send_to{
       color:#ccc;
       width:5rem;
       margin-left:.8rem;
     }
    }
}
.submit{
  width:686/50rem;
  height:88/50rem;
  border:none;
  background: #C8C8CB;
  border-radius: 8px;
  margin:0 auto;
  display: block;
  color:#fff;
  font-size: 28/50rem;
  margin-top:2rem;
}
.active{
   background: #EB5312;
}
#box{
  width:100%;
    padding-top:2rem;
  background:#fff;
}
.state{
  text-align: center;
  font-size: 24/50rem;
  line-height: 2rem;
  >span{
    color:#EB5312;
  }

}
</style>
