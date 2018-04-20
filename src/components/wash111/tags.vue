<template>
    <div id="box">
      <div class="container">
        <h3 class="classify_title">故障选择</h3>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell"
              @click="selectorCause(index,item)"
              v-for="(item,index) in tagsList"
              :key="index">
            <a href="javascript:;" :class="{'selector':item.selector}">{{item.name}}</a>
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
  #box{
    margin-bottom:0;
  }
  .container{
    background: #fff;

    padding:10px;
    padding-top: 0;
    margin:0 4%;
    margin-top:2%;
    .mui-table-view{
      overflow: hidden;
      &::after{
        width:0;
        height:0;
      }
      &::before{
        width:0;
        height:0;
      }
      >.mui-table-view-cell{
        width:50%;
        border:none;
        float:left;
        padding:5px;
        padding-left:0;
        >a{
          display: block;
          margin:8/50rem;
          font-size: 28/50rem;
          background: #FBFBFB;
          color: #4A4A4A;
          border-radius: 5px;
          text-align: center;
          margin-left:0;
        }
        >.selector{
          background:rgba(235,83,18,1);
          color:#fff;
        }
        &::after{
          width:0;
          background-color:none;
        }
      }
    }
    .price_title{
      text-align: center;
      border:none;
      padding-top:.9rem;
    }
    >.describe{
      height:1rem;
      width:100%;
      line-height: 1rem;
      font-family:PingFangSC-Regular;
      font-size: 22/50rem;
      margin-bottom: .3rem;
      color: #EB5312;
    }
  }
  .classify_title{
        border-bottom:1px solid rgba(235,83,18,1);
        padding:20/50rem 0px;
        font-family: PingFangSC-Regular;
        font-size: 28/50rem;
        font-weight: normal;
        color: #4A4A4A;
        letter-spacing: 0;
      }
</style>


