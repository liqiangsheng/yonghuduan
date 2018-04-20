<template>
        <div class="container_item" :class="className" style="padding-bottom:.08rem;" v-if="!isShow.isShow" :style="!!className?'padding-top:.8rem':'padding-top:.92rem'" >
          <h3 class="assortment_title">{{title}}</h3>
          <ul class="assortment_box" >
            <li style="font-weight: normal" :style="!isPhone?'width:46.5%':''" v-for="(item,index) in dataList" :key="index" @click="selector(index,item.a,item,selectIndex,$event)" :class="{'selector':active==index}">
              {{item.b}}
            </li>
          </ul>
    </div>
</template>
<script>
    export default {
      props:[
        "className",
        "isShow",
        "title",
        "dataList",
        "selector",
        "active",
        "isPhone",
        "selectIndex"
      ],
        data() {
            return {}
        },
        methods: {},
        created() {
        }
    }
</script>
<style scoped lang="less">
  .container_item{
    width:100%;
    text-align: center;
    
    >.assortment_title{
      font-family:PingFangSC-Light;
      font-size:40/50rem;
      color:#888888;
      letter-spacing:0px;
      font-weight: normal;
      line-height: 2rem;
    }
    >.assortment_box{
      overflow: hidden;
      padding:0 .3rem;
      padding-bottom:.5rem;
      >li{
        border:1px solid #c7c7cc;
        width:30%;
        color:#000;
        font-size:32/50rem;
        margin-top:.5rem;
        border-radius:100/50rem;
        float:left;
        margin-left:18/50rem;
        height:96/50rem;
        line-height: 96/50rem;
      }
      >.selector{
        background:#ea5413;
        color:#fff;
        border:1px solid #ea5413;
      }
    }
  }
  .second{
    >.assortment_box{
      >li{
        width:46%;
      }
    }
  }
</style>


