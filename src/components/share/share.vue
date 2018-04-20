<template>
	<div class="box" ref="box">
    <div id="box2">
      <div class="icon_box">
        <i class="log_icon"></i>
        <i class="log_icon right_icon"></i>
      </div>
      <div class="banner_img">
        <div @click="isActivity" class="activity"></div>
        <i class="title_img">
          <img  :src='RecommendContent.discountqrcode' alt="">
         <span>长按可保存二维码</span>
        </i>
      </div>
      <span class="title_text">邀请好友得积分红包</span>
      <h3>邀请越多 奖励越多</h3>
      <p class="text">每邀请一位好友注册叮叮快修<br />
	      你将获得{{RecommendContent.presenter||0}}，好友同时也能获取{{RecommendContent.presentee||0}}奖励<br />
	      积分可当现金抵用哦~
      </p>
      <div class="button_box">
      	<div class="button" @click="request">
      		立即邀请
      	</div>
      </div>
      	<AataaLaist></AataaLaist>
     </div>
    <div class="alert" v-if="isAlertTimaut" @click="isAlert.isShow=!isAlert.isShow">
    	<alert-info class="animated"
                  :class="isAlert.isShow?'flipInY':'fadeOutDown'"
                  :data="isAlert"
      ></alert-info>
    </div>
    <div class="alert"  @click="isAlertArrowhead" v-if="arrowhead">
      <b class="animated bounceIn arrowhead"></b>
      <p class="animated wobble clickText">点击：分享邀请好友</p>
    </div>
    </div>
</template>
<script>
  import alertInfo from "./alert_info";
  import AataaLaist from "./adataLaist";
  import bannerInfo from "./banner";
	import {wxConfig} from "@/components/share/js/wxShare";
  import  {getOpenID,getCookie}from "@/js/cookie";
  import {getSessionUserInfo} from "@/js/session"
  import { Indicator } from 'mint-ui';
  export default {
    	components:{
    		alertInfo,
        AataaLaist,
    		bannerInfo
    	},
        data() {
            return {
              RecommendContent:{},
              arrowhead:false,
              flag:false,
              isAlertTimaut:false,
              code:false,
            	isAlert:{
            		isShow:false
            	}
            }
        },
        watch:{
        	"isAlert.isShow":function(d,v){
        		if(!d){
        			this.$refs.box.style.height="auto";
              setTimeout(()=>{this.isAlertTimaut=false},700)
        		}else{
              this.$refs.box.style.height="100vh";
              this.$refs.box.style.overflow="hidden"
            }
        	}
        },
        methods: {
          fullScreen(e){
            let target=e.target;
            if(target.requestFullscreen) {
              target.requestFullscreen();
            } else if(target.mozRequestFullScreen) {
              target.mozRequestFullScreen();
            } else if(target.msRequestFullscreen){
              target.msRequestFullscreen();
            } else if(target.oRequestFullscreen){
              target.oRequestFullscreen();
            }else if(target.webkitRequestFullScreen){
              target.webkitRequestFullScreen();
            }

          },
          isActivity(){
              this.isAlert.isShow=true;
              this.isAlertTimaut=true;
          },
          request(){
            if(this.RecommendContent.available==="0"){
              this.$Toast("活动已结束");
              setTimeout(()=>{
                this.$router.push({path:"/"})
              },800)
            }else{
              if(this.flag&&this.code==="0000"){
                this.arrowhead=true;
                this.$refs.box.style.height="100vh";
                this.$refs.box.style.overflow="hidden"
              }
            }
          },
          isAlertArrowhead(){
            this.arrowhead=false;
            this.$refs.box.style.height="auto"
          },
          getData(){
            Indicator.close();
            if(!getSessionUserInfo("userInfo")){
              this.$store.commit("changeLoginPath",this.$route.path);
              setTimeout(()=>{
                this.$router.push({path:"/login"});
              },1000);
            }else{
              let url=`${this.$common.apidomain}/userInfo/accessSharingSign`,path="userDraw";
              if(this.RecommendContent.discount === '1'){
                path="coupon/1"
              }
              this.$http.post(url,{"url":`${this.$getCurrentUrl()}${path}`}).then(res=>{
                let data=res.data,
                    config={url:this.$getCurrentUrl(),isDiscount:path};
                if(data.code==="0000"){
                  this.code=data.code;
                  for(let k in data.result){
                    config[k]=data.result[k]
                  }
                  config.timestamp=JSON.stringify(data.result.timestamp);
                  wxConfig(config,this);
                }else{
                  this.$Toast(data.error);
                }
              });
//分享   start
            this.flag=true;
//分享   end
            }
          }
        },
        mounted(){
          if(this.isAlert.isShow){
            this.$refs.box.style.height="100vh";
            this.$refs.box.style.overflow="hidden"
          }
        },
        created() {
          Indicator.open('加载中');
          let url=`${this.$common.apidomain}/discount/getRecommendContent?phoneNum=${getSessionUserInfo("userInfo").phoneNum}`;
            this.$http.get(url).then(r=>{
              let data=r.data;
              if(data.code==="0000"){
                this.RecommendContent=data.result;

                this.getData();
              }else{
                Indicator.close();
                this.$Toast(data.error);
              }
            });
        }
    }
</script>
<style scoped lang="less">
.box{
	height:auto;
}
.arrowhead{
  position:absolute;
  top:20px;
  right:1rem;
  width: 233/50rem;
  height: 351/50rem;
  background:url("../../../static/images/topjiantou.png")center center no-repeat;
  background-size:100% 100%;
}
.clickText{
  color:#fff;
  font-size:1rem;
  position:absolute;
  /*left:50%;*/
  width:100%;
  text-align: center;
  top:38%;
  /*transform:translate(-50%,-100%);*/
}
    #box2{
      background:url("../../assets/images/haoyoutuijback.png")center center no-repeat;
      background-size:100% 100%;
      width:100vw;
      >.icon_box{
        width:100%;
        overflow: hidden;
        >.log_icon{
          display: block;
          float:left;
          background:url("../../../static/images/logo.png")center center no-repeat;
          background-size:100% 100%;
          width:160/50rem;
          height:34/50rem;
          margin-left:12/50rem;
          margin-top:27/50rem;
        }
        >.right_icon{
          float:right;
          margin-top:0;
          margin-right:30/50rem;
          width:89/50rem;
          height:105/50rem;
          background:url("../../../static/images/shuoming.png")center center no-repeat;
          background-size:100% 100%;
        }
      }
    >.banner_img{
      margin:0 auto;
      position:relative;
      width:100%;
      top:-2rem;
      height:11rem;
      /*background:url("../../../static/images/diadian.png")center center no-repeat;*/
      /*background-size:100% 100%;*/
      >.title_img{
        >img{
          width:240/50rem;
          position:absolute;
          left:51%;
          transform:translateX(-50%);
          margin-top:.5rem;
          z-index: 99999999;
          height:240/50rem;
        }
        >span{
          position:absolute;
          bottom:2.5rem;
          font-size:22/50rem ;
          color:#be2c2b;
          transform:translateX(-50%);
          left:50%;
        }
        background:url(../../assets/images/yaoqinghaoyou1.png)center center no-repeat;
        background-size:100% 100%;
        width:629/50rem;
        height:555/50rem;
        position:absolute;
        top:90/50rem;
        text-align: center;
        transform:translateX(-50%);
        left:50%;
        font-size: 42/50rem;
        font-family: JY4;
        font-style:normal;
       color:#ffed74;
        line-height: 5.8rem;
        >span{
         text-align: right;
        }

      }
    }
      >h3{
        /*margin-top:2/50rem;*/
		text-align:center;
		font-size:36/50rem;
		color:#fff;
		font-family: "微软雅黑";
      }
      >.text{
      	text-align: center;
      	font-size:28/50rem;
      	color:#ffcece;
      	font-family: PingFangSC-Regular;
      	margin-top:30/50rem;
      }
      >.button_box{
      	margin-top:1rem;
      	>.button{
      		color:#fff;
      		font-family: AdobeHeitiStd-Regular;
      		width:628/50rem;
      		height:105/50rem;
      		margin:0 auto;
      		font-size:40/50rem;
      		text-align:center;
      		line-height: 105/50rem;
      		background:url(../../../static/images/lijiyaoqing.png)center center no-repeat;
      		background-size:100% 100%;
      	}
      }
      .list{
      	.list_box{
      		width:628/50rem;
      		height:859/50rem;
      		background:url(../../../static/images/mianban.png)center center no-repeat;
      		background-size:100% 100%;
      		margin:0 auto;
      		>.list_title{
      			text-align: center;
      			padding-top: 4.8rem;
      			font-family: JY4;
      			font-size: 28/50rem;
      			color:#ad0000;
      			font-style: normal;
      		}
      	}
      }
      >.title_text{
        font-size: 40/50rem;
        width:auto;
        color:#ffed74;
        display: block;
        top:12.4rem;
        left:50%;
        transform:translate(-50%,-1rem);
        position:absolute;
      }
    }
    #box3{
    .lsit_img{
    	/*background:url(../../../static/images/haoyoutuij.png)center right no-repeat;
    	background-size:100% 100%;
      	width:100%;
      	height:50vh;*/
      }
    }
    .alert{
    	width:100vw;
    	position:absolute;
    	top:0;
    	left:0;
    	height:100vh;
    	background:rgba(0,0,0,.7);
    }

    .container{
    	width:100%;
    	display: flex;
    	padding-top:1.2rem;
  		text-align: center;
  		>div{
  			color:#feebef;
  			font-size:30/50rem;

  		}
    	>.title_right{
    		flex:1;
    		height:auto;
    	}
    	>.title_left{
    		flex:1;
    	}
    }
    .data_list{
    	padding-left:1rem;
    	>ul{
    		width:100%;
    		>li{
    			width:100%;
    			display: flex;
    			text-align: left;
    			>.left_box,.right_box{
    				padding-left:1rem;
    				flex:1;
    				margin-bottom:.3rem;
    				>span{
    					font-family: AdobeHeitiStd-Regular;
    					font-size:24/50rem;
    					color:#a3a3a3;
    				};
    			}
    			>.left_box{
    				>p{
    					font-size:30/50rem;
    					color:#6a624f;
    					line-height: .6rem;

    				}
    			}
    			>.right_box{
    				>p{
    					font-size:28/50rem;
    					color:#fd6255;
    					line-height:.6rem;
    				}
    			}
    		}
    	}
    }
    .footer_text{
    	font-family: AdobeHeitiStd-Regular;
    	font-size:24/50rem;
    	color:#fff;
    	transform:translateY(-1.7rem);
    	padding:0 2.5rem;
    }
  .activity{
    position:absolute;
    right:.7rem;
    top:.2rem;
    width:1.6rem;
    height:2rem;
  }
</style>


