<template>
    <div>
        <div class="box">
          <p class="del" @click="close"></p>
          <div class="container">
            <p>抱歉，优惠券已被领取完！</p>
            <router-link class="link" to="/">更多福利进店看看>></router-link>
          </div>
        </div>
    </div>
</template>
<script>
    export default {
      props:["data"],
        data() {
            return {

            }
        },
        methods: {
          close(){
            this.data.isShow=false;
          },
        },
        created() {

        }
    }
</script>
<style scoped lang="less">
  .box{
    transition:all .3s ease;
    flex-wrap:wrap;
    width:640/50rem;
    position:absolute;
    top:50%;
    display: flex;
    background:#ffff;
    border-radius:15px;
    left:50%;
    padding:45/50rem 38/50rem;
    transform: translate(-50%,-50%);
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
  .container{
    margin:1rem 0;
    text-align: center;
    width:100%;
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


