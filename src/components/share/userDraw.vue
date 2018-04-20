<template>
	<div class="box" ref="box">
    <div id="box2">
      <div class="icon_box">
        <i class="log_icon"></i>
        <i class="log_icon right_icon"></i>
      </div>
     <div v-if="!successAlert.isShow" class="banner_box">
     		<h3>新用户奖励</h3>
     		<input placeholder="请输入手机号码" class="tel_input" type="text" v-model="tel" />
     		<input placeholder="请输入验证码" class="tel_input tel_input2" type="text" v-model="test"/>
       <button @click="sendCode" class="tel_input tel_input2 getCode" :class="{'active_code':isSendTo}">{{sendText}}</button>
    		<div class="button" @click="getDraw(tel,isAlert)">领取积分</div>
    		<div class="content">
    			<h3>
					活动说明
				</h3>
				<p>
					即日起用通过邀请奖励页面邀请好友成为叮叮快修注册用户，每邀请一位好友成功注册，
					您将获得叮叮快修积分奖励100分，邀请越多，奖励越多。
				</p>
				<p>
					受邀好友成功注册同时也能获取积分奖励（1000分）；
				</p>
				<p>受邀用户必须为叮叮快修首次注册用户；</p>
				<p>
					如果发现任何违规套取奖励行为，视情节严重程度进行判罚：不予发放奖励、封停推荐有奖功能、冻结所有通过推荐有奖渠道获得的奖励、
					依法追究法律责任；
				</p>
				<h3>
					积分使用说明
				</h3>
				<p>积分仅限于用户叮叮快修下单抵扣现金使用，
				100积分抵用1元</p>
				<p>积分不可用于转增、兑现、交换商品等；</p>
				<p>积分使用使用有效期为一年，期限年满一年将自动清除；</p>
    		</div>
     </div>
      <!--linequjifen-->
     <!--领取成功之后的-->
     <div v-if="successAlert.isShow" class="success_box">
          <div  class="animated flip success_img" ref="success_img">
            <div class="text">
              <div class="integral_text">
                <div class="left_text fl">
                  <p>新用户
                    <br />
                    注册奖励
                  </p>
                </div>
                <div class="right_text fr">
                  <p>1000<span>分</span> </p>
                </div>
              </div>
              <h2 style="animation-delay:1s;" class="animated bounceIn">恭喜您！</h2>
              <p style="animation-delay:1.5s;" class="animated bounceInUp">{{RecommendContent.presentee}}积分成功收入囊中！</p>
            </div>
          </div>
       <router-link tag="button" to="/home" class="order_submit">立即下单</router-link>
     	<!--<div class="share_button" >分享给好友</div>-->
     	<p class="footer_text">关注“叮叮快修”公众号，进入个人中心查看积分</p>
     </div>

     <!--领取成功之后的-->
     </div>
   <div class="alert" v-if="isAlert.isShow">
    	<div class="animated swing error_alert" >
    		<div class="del_icon" @click="isAlert.isShow=false"></div>
    		<h3>抱歉</h3>
    		<p>只有新用户才能领取积分红包哟！</p>
    	</div>
    </div>
    </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import {setCookie,getCookie} from "@/js/cookie"
  import {getOpenID,setOpenID} from "@/js/cookie"
  import {getSession,getSessionUserInfo} from "@/js/session"
  let key="phoneNum=",href=window.location.href,phoneNum=href.substring(href.indexOf(key)+key.length);
    export default {
        data() {
            return {
            	tel:"",
              test:"",
              sendText:"获取验证码",
              RecommendContent:{},
              isSendTo:false,
              successAlert:{
            	  isShow:false
              },
            	isAlert:{
            		isShow:false
            	}
            }
        },
        watch:{
        	"isAlert.isShow":function(v,b){
        		if(!v){
        			this.$refs.box.style.height="auto"
        		}else{
        			this.$refs.box.style.height="100vh";
              this.$refs.box.style.overflow="hidden"
        		}
        	}
        },
        methods: {
          sendCode(){
            let pic,count=60;
            if(this.isSendTo)return;
            if(!this.tel.trim())return this.$Toast("请输入手机号");
            if(this.tel.trim().length!==11||this.tel.trim().length>=11&&!(/^1[34578]\d{9}$/.test(this.tel))){
              this.$Toast("手机号格式不正确");
              return;
            }
              let url=`${this.$common.apidomain}/authCodeInfo/getValidationCode?phoneNum=${this.tel}`;
              this.$http.get(url).then(res=>{
                if(res.data.code==="0000"){
                  this.$Toast(res.data.result)
                  this.isSendTo=true;
                  clearInterval(pic);
                  pic=setInterval(()=>{
                    count--;
                    this.sendText=count+"秒后重新发送";
                    if(count===0){
                      clearInterval(pic);
                      this.isSendTo=false;
                      this.sendText="获取验证码"
                    }
                  },1000)
                }else{
                  this.$Toast(res.data.error);
                }
              });
          },
          //领取积分 start
        	getDraw(tel,isShow){
            var cityId= getSession()[0].id;
            if(!tel){
              this.$Toast("请输入手机号码");
            }
            if(!this.test){
              this.$Toast("短信验证码错误");
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
                let _this=this,paths=this.$store.state.loginPath;
                if(data.code==="0000"){
                  let state=data.result.isNew;
                  if(state===true||state==="true"){
                    this.successAlert.isShow=true;
                  }else{
                    isShow.isShow=true;
                  }
                }else{
                  this.test="";
                  this.$Toast(data.error);
                }
              })
            }
        	}
          //领取积分 end
        },
        mounted(){
          document.title="领取积分";
          if(this.isAlert.isShow){
            this.$refs.box.style.height="100vh";
            this.$refs.box.style.overflow="hidden";
          }
        },
        created() {
          let url=`${this.$common.apidomain}/discount/getRecommendContent`;
          this.$http.get(url).then(r=>{
            let data=r.data;
            if(data.code==="0000"){
              this.RecommendContent=data.result;
              if(this.RecommendContent.available=="0"){
                    this.$Toast("该活动已结束");
                     this.$router.push({path:"/"});
              }
            }else{
              this.$Toast(data.error);
            }
          })
        }
    }
</script>
<style scoped lang="less">
.alert{
  /*color:#fd6255;*/
      width:100vw;
    	position:absolute;
    	top:0;
    	left:0;
    	height:100vh;
    	overflow: hidden;
    	background:rgba(0,0,0,.5);
    }
    .error_alert{
    	width:600/50rem;
    	height:371/50rem;
    	background:url(../../../static/images/error_alert.png)center center no-repeat;
    	margin:0 auto;
    	background-size:100% 100%;
    	margin-top:250/50rem;
    	overflow: hidden;
    	>.del_icon{
			width:51/50rem;
			height:51/50rem;
			background:url(../../../static/images/del5.png) center no-repeat;
			background-size:100% 100%;
			position:absolute;
			right:0;
			top:1.5rem;
		}
    	>h3{
    		margin-top:3.2rem;
    		color:#4e1416;
    		font-size:54/50rem;
    		text-align: center;
    	}
    	>p{
    		margin-top:.5rem;
    		font-size:38/50rem;
    		color:#4e1416;
    		text-align: center;
    		font-size:38/50rem;
    	}
    }
.box{
	height:auto;
}
    #box2{
      background:url("../../../static/images/bakcBox.png")center center no-repeat;
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
      >.banner_box{
      		transform:translateY(-2.1rem);
      		width:750/50rem;
      		height:1669/50rem;
      	 	background:url("../../../static/images/linequjifen.png")center center no-repeat;
          	background-size:100% 100%;
          	>h3{
          		position:absolute;
          		left:50%;
          		transform:translateX(-50%);
          		top:5.6rem;
          		color:#fff;
          		font-family: STYuanti-SC-Bold;
          		font-size:30/50rem;
          	}
          	>.tel_input{
          		width:528/50rem;
          		position:absolute;
          		left:50%;
          		outline: none;
          		font-family: STYuanti-SC-Bold;
          		border:none;
          		font-size: 30/50rem;
          		border-radius: .2rem;
          		height:80/50rem;
          		top:9.34rem;
          		color:#808080;
          		background:#fff;
          		transform:translateX(-50%);
          	}
        >.tel_input2{
          top:11.34rem;
          width:6rem;
          left:5.2rem;
          background:#fff;
        }
        >.getCode{
          width:4.2rem;
          padding:0;
          left:10.68rem;
          color:#fd6255;
          font-size:24/50rem;
          text-align: center;
          background:#fff;
        }
        >.active_code{
          background:#ccc;
          color: #858585;
        }
        /*>.getCode-active{*/
          /**/
        /*}*/
          	>.tel_input::placeholder{
          		font-size: 30/50rem;
          	}
          	>.button{
          		width:280/50rem;
          		transform:translateX(-50%);
          		height:80/50rem;
          		background:url(../../../static/images/submitBtn.png)center no-repeat;
          		text-align: center;
          		line-height: 80/50rem;
          		position:absolute;
          		left:50%;
          		font-family: STYuanti-SC-Bold;
          		font-size: 36/50rem;
          		color:#fff;
              border-radius: 5px;
          		top:13.4rem;
          	}
          	>.content{
          		width:588/50rem;
          		background:#c43238;
          		height:873/50rem;
          		position:absolute;
          		top:15.5rem;
          		left:50%;
          		transform:translateX(-50%);
          		border-radius: .7rem;
          		padding:40/50rem 30/50rem 0 20/50rem;
					>h3{
						font-size:34/50rem;
						color:#fff;
						}
						>h3:last-of-type{
							margin-top: 1.2rem;
							margin-bottom:.4rem;
						}
						>p{
							margin: .2rem 0;
							color:#fff;
							line-height: 1.6em;
							font-size:24/50rem;
							font-family:PingFangSC-Regular ;
						}
          	}
      }
      >.success_box{
      	width:100%;
        height:100vh;
      	>.success_img{
      		background:url(../../../static/images/hongbao.png)center no-repeat;
      		margin:0 auto;
      		background-size:100% 100%;
      		width:716/50rem;
      		height:602/50rem;
      		position:relative;
      		top:-1rem;
      		>.text{
      			position:absolute;
      			top:65%;
      			font-family:PingFangSC-Regular ;
      			color:#fff;
      			left:50%;
      			text-align: center;
      			transform:translateX(-50%);
      			>h2{
      				/*font-weight:normal ;*/
      				font-size:1rem;
      			};
      			>p{
      				color:#fff;
      				font-size:28/50rem;
      			};
      			.integral_text{
      				position:absolute;
      				left:2.3rem;
      				top:-3.4rem;
      			>.right_text{
                padding-left:.8rem;
                margin-top:.5rem;
                transform:translate(.3rem,-.8rem);
      					>p{
                  transform:rotate(-31deg);
      						font-size:33/50rem;
      						font-weight: bold;
      						color:#d18f2a;
      						vertical-align: middle;

      						>span{

      							font-weight: normal;
      							font-size:22/50rem;
      						}
      					}

      				}
      				>.left_text{
                  >p{
                    transform:translateY(.5rem);
                    font-size:20/50rem;
                    color:#d18f2a;
                  }

      				}
      			}
      		}
      	}
      	>.order_submit{
      		margin:0 auto;
      		display: block;
      		width:600/50rem;
      		padding:0;
      		outline: none;
      		font-family:PingFangSC-Regular ;
      		border:none;
      		font-size:36/50rem;
      		color:#fefefe;
      		background:url(../../../static/images/xiadanorder.png)center no-repeat;
      		background-size:100% 100%;
      		height:90/50rem;
      		line-height: 80/50rem;
      	}
      	>.share_button{
      		width:320/50rem;
      		height:90/50rem;
      		line-height:90/50rem ;
      		text-align: center;
      		border:2px solid #fe9105;
      		border-radius: 45/50rem;
      		font-size:36/50rem;
      		color:#fe9105;
      		font-family: STYuanti-SC-Bold;
      		margin:0 auto;
      		margin-top:307/50rem;
      	}
      	>.footer_text{
      		text-align: center;
      		line-height: 5rem;
      		color:#f5b9b9;
      		font-size:24/50rem;
      	}
      }
   }

    .fl{
    	float:left;
    }
    .fr{
    	float:right;
    }
&.fade-enter-active, &.fade-leave-active{
  transition: all 1s ease
}

&.fade-enter, &.fade-leave-active{
  transform:translateX(100px);
}
  .left_text{
    transform:rotate(-31deg);
    margin-left:-.9rem;
  }

</style>


