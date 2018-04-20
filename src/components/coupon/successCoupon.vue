<template>
  <div>
    <div class="box" v-if="$route.params.state!=='0'">
      <div class="animated flipInX coupon_banner_img">
          <div class="coupon_container">
            <p style="animation-delay:.4s;" class="animated rotateIn">领取<span>{{$route.params.state}}</span>元 </p>
            <p style="animation-delay:.6s;" class="animated bounceInUp">优惠券一张</p>
          </div>
      </div>
      <router-link tag="button" to="/" class="btn" >立即下单</router-link>
    </div>
    <div v-else>
      <img src="../../assets/images/error.png" alt="">
      <div class="container">
        <p>抱歉，优惠券已被领取完！</p>
        <router-link class="link" to="/">更多福利进店看看>></router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isLogin:{
          isShow:false,
        }
      }
    },
    methods: {
      close(e){
        if(e.target.className==="alert_cover"){
          e.target.style.width="0px";
          e.target.style.height="0px";
        }
      },

    },
    created() {

    }
  }
</script>
<style scoped lang="less">
  img{
    width:430/50rem;
    display: block;
    margin:0 auto;
    margin-top:2rem;
  }
  .box{
    padding-top:10/50rem;
    background:url(../../assets/images/cussebackground.png) center center no-repeat;
    background-size:100% 100%;
    width:100vw;
    height:100vh;
    >.coupon_banner_img{
      background:url(../../assets/images/success.png) center center no-repeat;
      background-size:100% 100%;
      width: 719/50rem;
      transform: translateY(2rem);
      height: 868/50rem;
      margin:0 auto;
      position:relative;
      >.coupon_container{
        position:absolute;
        top:6.5rem;
        width:100%;
        left:50%;
        text-align: center;
        transform:translateX(-50%);
        >p{
          line-height: 1.5em;
          color:#f71828;
        }
        >p:first-of-type{
          font-size: 65/50rem;
          >span{
            font-size:2rem;
          }
        }
        >p:last-of-type{
          font-size:1rem;
        }
      }

    }
    .btn{
      background:url(../../assets/images/btn.png) center center no-repeat;
      background-size:100% 100%;
      width:342/50rem;
      outline: none;
      border:none;
      font-size:42/50rem;
      height: 95/50rem;
      color:#f64601;
      margin:0 auto;
      left:50%;
      transform:translateX(-50%);
      position:absolute;
      bottom:1.5rem;
    }
  }
  .container{
    margin-top:1rem;
    text-align: center;
    >p{
      font-family: PingFangSC-Regular;
      font-size: 38/50rem;
      color: #4E1416;
      letter-spacing: 0;
      line-height: 2em;
    }
    >.link{
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      color: #FE9106;
      letter-spacing: 0;
      line-height: 2.5em;
      display: block;
    }
  }
</style>




