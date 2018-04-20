<template>
    <div>
      <ul class="assortment_pigment">
        <li  v-for="(item,index) in dataList" :key="index" @click.stop="selector(index,item.a,item,selectorIndex)" :class="{'selector':active===index}">
            {{item.b}}
        </li>
      </ul>
    </div>
</template>
<script>
    export default {
      props:["dataList","active","selector","selectorIndex"],
        data() {
            return {
            }
        },
        methods: {

        },
        created() {
        },
      watch:{

      }
    }
</script>
<style scoped lang="less">
  /*选择手机颜色 start*/
  .assortment_pigment{
    overflow: hidden;
    padding-left:.5rem;
    margin-bottom:.4rem;
    /*transform:translateX(-1.5rem);*/
    >li{
      border:1px solid #c7c7cc;
      width:21%;
      color:#000;
      font-size:26/50rem;
      font-family:PingFangSC-Light;
      margin-top:.5rem;
      border-radius:100/50rem;
      float:left;
      font-weight: normal;
      margin-left:18/50rem;
      text-align: center;
      line-height: 60/50rem;
    }
    >.selector{
      background:#ea5413;
      color:#fff;
      border:1px solid #ea5413
    }
  }
  /*选择手机颜色 end*/
</style>


