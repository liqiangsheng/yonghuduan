<template>
    <div id="box">
      <div class="container">
        <!--<h3 class="classify_title">故障选择</h3>-->
        <ul class="tags_box">
          <li class="tags_item"
              v-for="(item,index) in tagsList"
              @click.stop="selectorCause(index,item)"
              :class="{'selector':item.selector}"
              :key="index"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
    export default {
      props:["tagsList"],
        data() {
            return {}
        },
        methods: {
          selectorCause(index,item){
            item.selector=!item.selector
          },
        },
        created() {

        }
    }
</script>
<style scoped lang="less">
  @import "../../assets/style/rem.less";
  #box{
    margin-bottom:0;
    .selector{
      background:#ea5413;
      color:#fff;
      border:1px solid #ea5413;
    }
  }
  .container{
      >.tags_box{
        overflow: hidden;
        margin-bottom:1rem;
        >.tags_item{
          width:29%;
          border:1px solid #c7c7cc;
          border-radius:100px;
          .px_rem(line-height,58);
          float:left;
          font-family:PingFangSC-Light;
          .px_rem(font-size,26);
          color:#000;
          margin-left:3.2%;
          margin-top:.6rem;
          letter-spacing:0px;
          text-align:center;
        }
      }
  }
</style>


