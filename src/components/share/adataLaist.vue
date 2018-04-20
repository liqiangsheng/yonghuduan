<template>
	<div>
      <div class="list">
                  <div class="list_box">
                    <h4 class="list_title">邀请奖励</h4>
                    <div class="container">
                      <div class="title_left">
                        {{recommendNum}}人<br />成功邀请
                      </div>
                      <div class="title_right">
                        {{totalCommission}}分<br />获得积分
                      </div>
                    </div>
                    <div class="container data_list">
                      <ul>
                        <li v-for="(item,index) in userCumulativeFractionRecords" v-if="userCumulativeFractionRecords.length">
                          <div class="left_box">
                            <p>{{item.recommendUserPhoneNum}}</p>
                            <span>接受了你的邀请</span>
                          </div>
                          <div class="right_box">
                            <p>注册成功</p>
                            <span>刚刚</span>
                          </div>
                        </li>
                        <li class="placeholder" v-if="!userCumulativeFractionRecords.length">
                          你还没有邀请过好友哦，继续加油吧！
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="footer_text">
                      注：只显示6个月的奖励明细
                    </div>
        </div>

    </div>
</template>
<script>
    export default {
    	components:{
    	},
        data() {
            return {
              recommendNum:0,
              totalCommission:0,
              userCumulativeFractionRecords:[]
            }
        },
        watch:{

        },
        methods: {
    	      getData(){
              let url=`${this.$common.apidomain}/userUserFriendsShareRecord/findCumulativeFraction?token=${this.$_getCookie()}`;
              this.$http.get(url).then(r=>{
                let data=r.data;
                if(data.code==="0000"){
                  this.recommendNum=data.result.recommendNum;
                  this.totalCommission=data.result.totalCommission;
                  this.userCumulativeFractionRecords =data.result.userCumulativeFractionRecords;
                }else{
                  this.$Toast(data.error);
                }

              })
            },
          loginPath(){
            this.$store.commit("changeLoginPath",this.$route.path);
            this.$router.push({path:"/login"});
          }
        },
        mounted(){

        },
        created() {
          this.$_getCookie()?this.getData():this.loginPath();
        }
    }
</script>
<style scoped lang="less">

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

    /*#box3{*/
    /*.lsit_img{*/
    	/*!*background:url(../../../static/images/haoyoutuij.png)center right no-repeat;*/
    	/*background-size:100% 100%;*/
      	/*width:100%;*/
      	/*height:50vh;*!*/
      /*}*/
    /*}*/
 /**/

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
        >.placeholder{
          color:#a3a3a3;
          font-size: 28/50rem;
          font-family: STYuanti SC Regular;
          text-align: center;
          padding-left:.5rem;
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
</style>


