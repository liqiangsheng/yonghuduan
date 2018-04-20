<template>
    <div id="box">
      <router-link tag="div" class="container" v-for="(item,index) in dataList" :key="index" :to="item.path">
        <p> {{item.sum}}  </p>
        <p class="name">{{item.name}}</p>
      </router-link>
    </div>
</template>
<script>

    export default {
      props:["dataList"],
        data() {
            return {}
        },
        methods: {

        },
        created() {

        }
    }
</script>
<style scoped lang="less">
  p,span{
    font-family:PingFang-SC-Medium ;
  }
#box{
  background:#fff;
  width:100%;
  display: flex;
  padding-top:38/50rem;
  padding-bottom:34/50rem;
  .container{
    padding-top:10/50rem;
    text-align: center;
    flex:1;
    >p{
      font-size: 30/50rem;
      color: #EB5312;
      line-height: 1.35em;
      >span{
        font-size: 20/50rem;
      }
    }
    >.name{
      font-size:26/50rem;
      color:#888;
    }
  }
  >.container:active{
    background: #F8F8F8;
  }
}
</style>


