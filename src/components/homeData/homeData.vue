<template>
    <div id="box" style="border:none;margin-bottom:.4rem;">
      <div>
        <a :href="item.url" class="home_left" v-for="(item,index) in homeDataList.promotionA">
            <p>{{item.name}}</p>
          <span>{{item.remark}}</span>
          <img :src="item.image" alt="">
        </a>
      <div class="home_right">
        <a class="home_bottom"  :href="item.url"  v-for="(item,index) in homeDataList.promotionB">
            <div class="home_right_top_left">
              <p>{{item.name}}</p>
              <span>{{item.remark}}</span>
            </div>
          <div class="home_right_top_right">
              <i class="phone_icon" :style="{backgroundImage:'url('+item.image+')'}"></i>
          </div>
        </a>
          <div class="home_top">
              <a  :href="item.url"  v-for="(item,index) in homeDataList.promotionC">
                <p>{{item.name}}</p>
                <span>{{item.remark}}</span>
                <i :style="{backgroundImage:'url('+item.image+')'}"></i>
              </a>
            <a  :href="item.url" v-for="(item,index) in homeDataList.promotionD">
              <p>{{item.name}}</p>
              <span>{{item.remark}}</span>
              <i :style="{backgroundImage:'url('+item.image+')'}"></i>
            </a>
          </div>
      </div>
      </div>
    </div>
</template>
<script>
    export default {
      props:["homeDataList"],
        data() {
            return {}
        },
        methods: {},
        created() {
        }
    }
</script>
<style scoped lang="less">
#box{
  padding:0 30/50rem;
  padding:20/50rem;
  div,p,ul,li,span{
    font-family: PingFangSC-Regular;
  }
  >div{
    overflow: hidden;
    border:1px solid  #F2F2F2;
  width:100%;
  background:#FFF;
  >.home_left{
    width:316/50rem;
    display:block;
    float:left;
    height:100%;
    border-right:1px solid #F2F2F2;
    >p{
      text-align: center;
      font-size: 28/50rem;
      line-height: 70/50rem;
      color: #4A4A4A;
    }
    >span{
      font-size: 20/50rem;
      color: #9B9B9B;
      display: block;
      text-align: center;
    }
    >img{
      display: block;
      width: 172/50rem;
      margin:0 auto;
      height: 179/50rem;

    }
   padding-bottom:20/50rem;
  }
  >.home_right{

    float:left;
    /*flex:1;*/
    display: block;
    width:388/50rem;
    /*height:100%;*/
  >.home_top{
    /*display: flex;*/
    width:100%;

    overflow: hidden;
    /*<!--height:120/50rem;-->*/
      >a{
      /*flex:1;*/
        padding-top:.3rem;
        width: 50%;
        float:left;
       display: block;
      color: #5C5C5C;
        height: 100%;
      text-align: center;
      >p{
        font-size: 28/50rem;
        line-height: .8rem;
      }
      >span{
        font-size: 20/50rem;
        color: #9C9C9C;
      }
      >i{
        display: block;
        background:url(../../assets/images/yaoqinghaoyou.png)center center no-repeat;
        background-size: 100% 100%;
        width:41/50rem;
        height:43/50rem;
        margin:0 auto;
        margin-bottom:.2rem;
      }
    }
    >a:last-of-type{
      border-left:1px solid #F2F2F2;
      >i{
        width:49/50rem;
        height:44/50rem;
        background:url(../../assets/images/yohui.png)center center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
    >.home_bottom{
      width:100%;
      overflow: hidden;
      display: inline-block;
      /*display: flex;*/
      border-bottom:1px solid  #F2F2F2;
      padding-bottom:30/50rem;
      >.home_right_top_left{
          /*flex:2;*/
        width:280/50rem;
        /*transform:translateY(-.4rem);*/
        display: inline-block;
        >p{
          text-align: center;
          font-size: 28/50rem;
          line-height: 70/50rem;
          color: #4A4A4A;
        }
        >span{
          font-size: 20/50rem;
          color: #9B9B9B;
          display: block;
          text-align: center;
        }
      }
      >.home_right_top_right{
        /*flex:1;*/
        display: block;
        float:right;
        width:auto;
        margin-right:.5rem;
        >.phone_icon{
          display: block;
          background:url(../../assets/images/phone_icon.png)center center no-repeat;
          background-size: 100% 100%;
          width:44/50rem;
          height:79/50rem;
          margin:auto;
          margin-top:44/50rem;
        }
      }
    }
  }
}
}
</style>


