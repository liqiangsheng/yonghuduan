<template>
  <div id="box">
    <textarea autofocus placeholder="请在此处您输入对我们的宝贵意见。" v-model="text">
    </textarea>
    <div class="input_tel">
        <input v-model="tel" type="text" placeholder="请输入您的联系方式">
    </div>
    <div class="footer">
      <div class="accounts_btn"  @click="submit">保存</div>
    </div>
  </div>
</template>
<script>
  import {Toast} from "mint-ui"
  import {setCookie,getCookie} from "@/js/cookie"
    export default{
        data(){
            return{
              text:"",
              tel:"",
              isFocus:false
            }
        },
        methods:{
          submit(){
            let token=getCookie();
            if(!token){return Toast("未能有效登陆")}
            if(this.text.trim()){
            	const phoneNum = this.tel; //手机号码；
            	if(phoneNum===undefined||phoneNum===""){
            		return this.$Toast("请填写联系方式")
            	}else if(!(/^1[34578]\d{9}$/.test(phoneNum))){
            		return this.$Toast("手机号格式不正确")
            	}
              let url=common.apidomain+"/feedback/savefeedback";
              this.$http.post(url,{"content":this.text,"token":token,"phoneNum":phoneNum}).then(res=>{
                let data=res.data.result;
                if(data){
                   Toast(data);
                   setTimeout(()=>{ this.$router.back(-1)},1500)
                }
              })
            }else{
              Toast("内容不能为空");
            }
          }
        },
        created() {
        }
    }
</script>
<style scoped lang="less">
 textarea{
  width:100%;
   height:260/50rem;
   border:none;
   overflow: auto;
   margin-top:20/50rem;
   background: #FFFFFF;
   font-family: NotoSansHans-Regular;
   font-size: 28/52rem;
 }
 .footer {
   margin: 0 auto;
   width: 100%;
   position:absolute;
   bottom:33/50rem;

   height: 98/50rem;
   line-height: 98/50rem;
   font-family: PingFangSC-Medium;
   color: #EB5312;
   padding:0 23/50rem;
   letter-spacing: 0;
   > .accounts_btn {
     height: 100%;
     display: inline-block;
     width:100%;
     background-image:linear-gradient(-63deg, #ef6a1c 0%, #ea5413 99%);
     border-radius:2rem;
     text-align: center;
     font-family: PingFangSC-Regular;
     font-size: 32/50rem;
     color: #FFFFFF;
     letter-spacing: 0;
   }
 }
  .input_tel{
   >input{
     border:none;
     height:88/50rem;
   }
  }
 ::-webkit-input-placeholder {
   font-size:28/50rem;
 }
 :-moz-placeholder {
   font-size:28/50rem;
 }
 ::-moz-placeholder {
   font-size:28/50rem;
 }
 :-ms-input-placeholder {
   font-size:28/50rem;
 }
</style>


