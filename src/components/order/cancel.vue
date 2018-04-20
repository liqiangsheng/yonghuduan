<template>
    <div>
      <div class="keep_container" v-for="(item,index) in dataList" :key="index" @click="sendDetailed(item,index)">
        <h4 class="order_number">交易订单号  {{item.order.id}} <span class="status">{{item.orderState}}</span></h4>
        <ul class="mui-table-view" >
          <li class="mui-table-view-cell"   v-for="(item1,index) in item.services"  @click="sendDetailed(item,index)" >
            <p class="cause_top">
              <span class="cause_type">{{item1.serviceFullName}}</span>
              <!--<span class="mui-badge" v-show="false">￥{{item1.price1}}</span>-->
            </p>
            <p class="cause">
              <span class="cause_name">
                  {{item1.serviceTags}}
              </span>
              <span class="sum">
              x{{item1.serviceSize}}
              </span>
            </p>
          </li>
        </ul>
        <div class="defray_content">
          <div class="defray_right open_price">
            <p>
              共 {{item.serviceTotalSize}} 件
              <!-- 合计 -->
              <span class="defray_price">￥{{(item.serviceTotalWaitPay+item.serviceTotalPay)|floating}} </span>
              <br>
              <!--<span class="defray_describe defray" v-if="true">已付款&nbsp;&nbsp;&nbsp;</span>{{item.serviceTotalPay}}<br>-->
              <!--<span class="defray_describe defray" v-if="true">已退款&nbsp;&nbsp;&nbsp;</span>{{item.serviceTotalRefund}}-->
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {setLocalStorage,removerStorage,setSessionUserInfo} from "@/js/session"
  import { Indicator } from 'mint-ui';
    export default {
      props:["isAlert"],
        data() {
            return {
              dataList:'',
            }
        },
        methods: {
          sendDetailed(item,index){
            removerStorage("orderDetails");
            setLocalStorage("orderDetails",item);
            setSessionUserInfo("orderState","3");
            this.$store.commit("changeOrder",item);
            this.$router.push({path:"/staymoney"});
          },
        },
        created() {
           setTimeout(()=>{
              let token=this.$_getCookie();
          let url=this.$common.apidomain+"/order/getorders?type=3&token="+token;
          this.$http.get(url).then(res=>{
            let data=res.data.result;
            this.dataList=data;
            this.isAlert.isShow3=false;
            if(this.dataList.length===0){
              this.isAlert.isShow3=true;
            }
          })
           },500)

        }
    }
</script>
<style scoped lang="less">
  .alert{
    width:100vw;
    height:85vh;
    text-align: center;

    >img{
      transform:translateY(50%);
      width:380/50rem;
      height: 380/50rem;
    }
    >.accounts{
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      color: #FFFFFF;
      letter-spacing: 0;
      transform:translateY(5.2rem);
      background: #EB5312;
      margin:0 auto;
      border-radius: 4px;
      width:280/50rem;
      line-height: 88/50rem;
      height: 88/50rem;
    }
    >p{
      font-family: PingFangSC-Regular;
      font-size: 28/50rem;
      color: #4A4A4A;
      transform:translateY(4.5rem);
    }
  }

  a{
    color:#000;
  }
  #box{
    font-family: PingFangSC-Regular;
    margin-bottom:1.96rem;
    .mint-tab-item{
      font-family: PingFangSC-Regular;
      font-size: 32/50rem;
      padding-top:.7rem;
      letter-spacing: 0;
    }
    >.mint-navbar{
      height:100/50rem;
    }
  }
  .mint-navbar {
    .mint-tab-item.is-selected{
      border-bottom: 3px solid #EB5312;
      color:#EB5312;
    }
  }
  .mint-tab-item-label{
    font-family: PingFangSC-Regular;
    font-size: 32/50rem;
    letter-spacing: 0;
  }
  .keep_container{
    background:#fff;
    margin-top:.5rem;
    >.order_number{
      font-family: PingFangSC-Regular;
      font-size:26/50rem;
      color: #9B9B9B;
      height:70/50rem;
      padding:0 32/50rem;
      line-height:70/50rem;
      font-weight: normal;
      letter-spacing: 0;
      >.status{
        color: #EB5312;
        float:right;
      }
    }
    .cause_top{
      /*margin-bottom:2%;*/
      color: #4A4A4A;
      /*padding-right:2rem;*/
      letter-spacing: 0;
      width:11.9rem;
      margin-top:46/50rem;
      display: inline-block;
      .mui-badge,.cause_type{
        background:none;
        font-family: PingFangSC-Regular;
        font-size: 34/50rem;
        /*line-height: 1.2em;*/
      }
      > .mui-badge{
        float:right;
        transform:translateX(2rem);
        padding-right:0;
      }
    }
    .mui-table-view-cell{
      font-family: PingFangSC-Regular;
      font-size: 28/50rem;
      color: #4A4A4A;
      border-bottom:1px solid rgba(230,230,230,0.50);
      padding:5/50rem 34/50rem;
      letter-spacing: 0;
      /*height:500px;*/
      padding-top:10/50rem;
      /*<!--max-height:160/50rem;-->*/
      /*<!--height:160/50rem;-->*/
      /*padding-bottom:1rem;*/
      >.cause{
        letter-spacing: 0;
        overflow: hidden;
        height:auto;
        line-height: 2.2em;
        >.cause_name{
          float:left;
          max-width:12rem;
          padding-top:.3rem;
          margin-bottom:.6rem;
          line-height: 1.5em;
        }
        >.sum{
          float:right;
        }
        >.cause_name,.sum{
          color: #C8C8CB;
          font-size: 30/50rem;
          font-family: PingFangSC-Regular;

          letter-spacing: 0;
        }
      }
    }
  }
  .mui-table-view-cell:after{
    background:none;
  }
  .mui-table-view{
    /*padding-bottom:1rem;*/
    height:auto;
  }
  .mui-table-view-cell:last-of-type{
    border-bottom:none;
  }

  /*支付*/
  .defray_content{
    width:100%;
    overflow: hidden;
    padding:14/50rem;
    padding-right:.6rem;
    >.defray_right{
      float:right;
      overflow: hidden;
      position:relative;
      width:12rem;
      line-height: 41/50rem;
      >p{
        font-size:32/50rem;
        color:#9B9B9B;
        text-align: right;
        >.defray_price{
          font-size: 34/50rem;
          color: #000;
          letter-spacing: 0;
        }
        >.defray_describe{
          color:#000;
        }

        >.final{
          font-size: 28/50rem;
          color: #EB5312;
          letter-spacing: 0;
        }
      }

      >.defray_bottom{
        background: #EB5312;
        border: 1px solid #EB5312;
        position:absolute;
        right:0;
        bottom:.1rem;
        font-size: 24/50rem;
        color: #FFFFFF;
        letter-spacing: 0;
        border-radius: 28/50rem;
        width:150/50rem;
        text-align: center;
        margin-left:1.2rem;
        float: right;
        line-height: 55/50rem;
        height:56/50rem;
      }
    }
    >.defray_right_Btn{height:120/50rem}
    .open_price{
      height:auto;
    }
  }
  .defray{
    color:#C8C8CB !important;
  }
</style>


