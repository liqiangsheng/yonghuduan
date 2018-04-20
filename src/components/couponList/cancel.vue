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
              已过期
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
//  import common from "../../js/baseHttp"
  import {getCookie} from "../../js/cookie"
  import {setLocalStorage,removerStorage} from "@/js/session"
  import { Indicator } from 'mint-ui';
    export default {
      props:["isAlert"],
        data() {
            return {
              dataList:[],
            }
        },
        methods: {

        },
        created() {
          let token=getCookie();
          this.dataList=[];
          this.isAlert.isShow3=false;
          if(!this.dataList.length){
            this.isAlert.isShow3=true;
          }
          if(token){
            let url=`${common.apidomain}/userInfoDiscount/findUserInfoDiscount`;
            this.$http.post(url,{"token":token,"state":"2"}).then(res=>{
              let data=res.data;
              if(res.data.code==="0000"){
                this.dataList=data.result;
                Indicator.close();
                this.isShow=true;
                this.isAlert.isShow3=false;
                if(this.dataList.length===0){
                  this.isAlert.isShow3=true;
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

  .defray{
    /*color:#C8C8CB !important;*/
  }
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
</style>


