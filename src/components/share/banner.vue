<template>
	<div>
      <div class="banner_img">
        <i class="title_img">
          <span>&nbsp;&nbsp;&nbsp;领积分 </span>&nbsp;得积分红包
        </i>
      </div>
      <h3>邀请越多 奖励越多</h3>
      <p class="text">每邀请一位好友注册叮叮快修<br />
	      你将获得100积分，好友同时也能获取积分奖励<br />
	      积分可当现金抵用哦~
      </p>
      <div class="button_box">
      	<div class="button">
      		立即邀请
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


            }
        },
        watch:{
        	"isAlert.isShow":function(d,v){
        		if(!d){
        			this.$refs.box.style.height="auto"
        		}
        	}
        },
        methods: {},
        mounted(){
        	if(this.isAlert){

			}
        },
        created() {

        }
    }
</script>
<style scoped lang="less">
    .banner_img{
      margin:0 auto;
      position:relative;
      width:100%;
      top:-2rem;
      height:720/50rem;
      background:url("../../../static/images/diadian.png")center center no-repeat;
      background-size:100% 100%;
      >.title_img{
        background:url(../../../static/images/yaoqinghaoyou.png)center center no-repeat;
        background-size:100% 100%;
        width:629/50rem;
        height:209/50rem;
        position:absolute;
        bottom:-.9rem;
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
      h3{
        /*margin-top:2/50rem;*/
		text-align:center;
		font-size:36/50rem;
		color:#fff;
		font-family: "微软雅黑";
      }
      .text{
      	text-align: center;
      	font-size:28/50rem;
      	color:#ffcece;
      	font-family: PingFangSC-Regular;
      	margin-top:30/50rem;
      }
      .button_box{
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
</style>


