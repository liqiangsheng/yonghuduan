<template>
    <div >
        <div class="box" ref="box" >
          <p class="del" @click="close"></p>
          <input placeholder="请输入手机号码"  @keyup="telTest(tel)"  v-model="tel" type="text">
          <input  class="test_code" v-model="test"  placeholder="请输入验证码" type="text">
          <button class="send_test_code" ref="color" @click="send">{{testCodeText}}</button>
          <button @click="submit(tel,isAlert)">确定</button>
        </div>
    </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import {setCookie,getCookie,getOpenID,setOpenID} from "@/js/cookie"
  import {getSession,getSessionUserInfo,setSessionUserInfo} from "@/js/session"
  let key="phoneNum=",href=window.location.href,phoneNum=href.substring(href.indexOf(key)+key.length);
    export default {
      props:["data","success"],
        data() {
            return {
              tel:"",
              isColor:false,
              isAlert:{
                isShow:false
              },
              test:"",
              isSendTo:false,
              testCodeText:"获取验证码",
            }
        },
      watch:{

      },
        methods: {
          close(){
            this.data.isShow=false;
          },
          send(){

          this.isColor=true;
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
              var url=`${this.$common.apidomain}/authCodeInfo/getValidationCode?phoneNum=${this.tel}`;
              this.$http.get(url).then(res=>{
                let data=res.data;
                if(data.code==="0000"){
                  this.$nextTick(function(){
                    this.$refs.color.style.color="#e44b01";
                  })

                  this.$Toast(res.data.result);
                  this.isSendTo=true;
                  var count=60;
                  var pic=setInterval(()=>{
                    count--;
                    this.testCodeText=count+"秒后重新发送";
                    if(count===0){
                      clearInterval(pic);
                      this.isSendTo=false;
                      this.testCodeText="获取验证码"
                      this.isColor=false;
                      this.$nextTick(function(){
                        this.$refs.color.style.color="#fff";
                      })
                    }
                  },1000)
                }else{
                  this.$Toast(data.error);
                }
              });
            }
          },
          telTest(val){
            if(val.length>=11&&!(/^1[34578]\d{9}$/.test(this.tel))){
              this.$Toast("手机号格式不正确");
            }
          },
          submit(){
            let cityId=getSession()[0].id;
            if(!this.test){
              Toast("短信验证码错误");
            }else{
              let url =`${this.$common.apidomain}/authCodeInfo/confirmLogin`;
              let param={
                "phoneNum":this.tel,"authCode":this.test,
                "cityId":cityId,"openId":getOpenID(),
                "relevanceType":"2",
                "relevanceKey":phoneNum
              };
              this.$http.post(url,param).then(res=>{
                let data=res.data;
                if(data.code==="0000"){
                    this.success(data.result.token);
                  setCookie(data.result.token);
                    setSessionUserInfo("userInfo",data.result);
                }else{
                  this.test="";
                  this.$Toast(data.error);
                }
              })
            }
          }
        },
        created() {
          this.$commonJs.getPosition.call(this);
        }
    }
</script>
<style scoped lang="less">
  input,button{
    border:none;
    outline: none;
  }
.box{
  transition:all .3s ease;
  flex-wrap:wrap;
  width:640/50rem;
  position:absolute;
  top:50%;
  display: flex;
  background:#FEC52B;
  border-radius:15px;
  left:50%;
  padding:45/50rem 38/50rem;
  transform: translate(-50%,-50%);
  >input{
      height:88/50rem;
      border:none;
      width:100%;
      border-radius:8px;

  }
  >.test_code{
    /*width:45%;*/
    margin-right:.5rem;
    font-size:32/50rem;
    flex:2;
  }
  >.send_test_code{
      flex:1;
      border:none;
      background: #E0E0E0;
      border-radius: 10/50rem;
    > .color{
      color:#e44b01;
    }
  }
  >button{
    width: 100%;
    border: 1px solid #FFFFFF;
    border-radius: 44/50rem;
    height:88/50rem;
    color:#fff;
    background:transparent;
    font-family:PingFangSC-Regular;
    font-size:32/50rem;
    box-sizing: border-box;
  }
}
  .del{
    width: 1rem;
    height: 1rem;
    position:absolute;
    right:-.3rem;
    top:-.6rem;
    background:url(../../../../static/images/del5.png) center center no-repeat;
    background-size:100% 100%;
  }

</style>

<style>
 .mint-toast, .mint-toast-text{
   z-index:99909;
 }
</style>
