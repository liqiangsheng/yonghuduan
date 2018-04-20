<template>
      <section class="search_box">
        <input type="text" class="search_input" placeholder="请输入折扣码" v-model="data.value"/>
        <button class="search_exchange" @click="callBackFun">兑换</button>
      </section>
</template>
<script>
    export default {
      props:["data","callBackFun"],
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>
<style scoped lang="less">
  .search_box{
    background:#fff;
    width:100%;
    display: flex;
    height:168/50rem;
    align-content:center;
    position:fixed;
    top:0;
    z-index: 999;
    -webkit-align-items:center;
    >.search_input{
      margin:0;
      flex:1;
      height: 80/50rem;
      padding:0;
      margin-left:34/50rem;
      padding-left:1em;
      font-size:32/50rem;
      color:#000;
      border-radius: 2rem;
      border:.02rem solid #888888;
    }
    >.search_exchange{
      outline: none;
      font-size:32/50rem;
      font-family:PingFangSC-Light;
      color:rgba(255,255,255,1);
      border:none;
      width:166/50rem;
      /*<!--line-height:80/50rem;-->*/
      background:rgba(234,84,19,1);
      height:80/50rem;
      margin:0 38/50rem 0 22/50rem;
      border-radius: 2rem;
    }
  }
</style>


