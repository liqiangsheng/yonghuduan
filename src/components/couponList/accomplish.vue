<template>
    <div>
      <div class="keep_container">
        <ul>

        <li v-for="(item,index) in dataList">
          <div class="left">
            <div class="price">￥<span>{{item.serviceDiscount.discountFacevalue}}</span></div>
            <div class="text_content">
              <p>{{item.serviceDiscount.discountName}}满{{item.serviceDiscount.minimum}}使用</p>
              <p>限期：{{item.serviceDiscount.startTime| moment('YYYY-MM-DD')}}-{{item.serviceDiscount.endTime | moment('YYYY-MM-DD')}}</p>
              <p>范围：{{item.serviceDiscount.areaName}}</p>
            </div>
          </div>
						<div class="right">
							已使用
			      </div>
		    </li>
        </ul>
      </div>
    </div>
</template>
<script>
//  import common from "@/js/baseHttp"
  import {setLocalStorage,removerStorage} from "@/js/session"
  import {setCookie,getCookie} from "../../js/cookie"
  import { Indicator } from 'mint-ui';
  import {commonFilter} from "@/components/savertype/js/isStatus"
    export default {
        props:["isLodow","isAlert"],
        data() {
            return {
                dataList:[]
            }
        },
        methods: {},
        created() {
          let token=getCookie();
          this.isAlert.isShow2=false;
          if(!this.dataList.length){
            this.isAlert.isShow2=true;
          }
          if(token){
            let url=`${common.apidomain}/userInfoDiscount/findUserInfoDiscount`;
            this.$http.post(url,{"token":token,"state":"1"}).then(res=>{
              let data=res.data;
              if(res.data.code==="0000"){
                this.dataList=data.result;
                Indicator.close();
                this.isShow=true;
                this.isAlert.isShow2=false;
                if(this.dataList.length===0){
                  this.isAlert.isShow2=true;
                }
              }else{
                Toast(res.data.error);
                Indicator.close();
              }
            });
          }else{
            Indicator.close();
            this.$store.commit("changeLoginPath",this.$route.path);
            setTimeout(()=>{
              this.$router.push({path:"/login"});
            },1000)
          }
        }
    }
</script>
<style scoped lang="less">
  .keep_container{
    margin-top:.5rem;
    >ul{
      padding:0 20/50rem;
      >li{
        margin:20/50rem 0;
        background:url(../../assets/images/wang.png)center center no-repeat;
        background-size:100% 100%;
        width:100%;
        display: flex;
        >.left{
          flex:5;
          padding-left:43/50rem;
          >.price{
            font-family: PingFangSC-Regular;
            font-size: 28/50rem;
            color: #FFFFFF;
            margin-top:40/50rem;
            letter-spacing: 0;
            >span{
              font-size:90/50rem;
            }
          }
          >.text_content{
            margin-top:.2rem;
            >p:first-of-type{
              font-size:24/50rem;
            }
            >p{
              color:#fff;
              line-height:.7rem;
              font-family: PingFangSC-Regular;
              font-size: 22/50rem;
              color: #FFFFFF;
              letter-spacing: 0;
            }
          }
        }
        >.right{
          flex:2;
          font-family: PingFangSC-Regular;
          font-size: 32/50rem;
          color: #FFFFFF;
          line-height: 4.6rem;
          letter-spacing: 0;
        }
      }
    }
  }
.keep_container{
  >ul{
    >li{
      background:url(../../assets/images/wang.png)center center no-repeat;
      background-size:100% 100%;
    }
  }
}

</style>


