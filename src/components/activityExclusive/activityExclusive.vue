<template>
    <div id="activity_container">
        <h3 style="line-height: 3rem">专享活动</h3>
        <div class="activity_center" v-if="homeDataList">

            <div  class="activity_left" :style="{backgroundImage:'url('+homeDataList.promotionA[0].image+')'}">
              <a :href="homeDataList.promotionA[0].url">
              <h3>{{homeDataList.promotionA[0].name}}</h3>
              <p>{{homeDataList.promotionA[0].remark}}</p>    </a>
            </div>

              <div class="activity_right">
                <a :href="homeDataList.promotionB[0].url">
                  <div class="activity_top"  :style="{backgroundImage:'url('+homeDataList.promotionB[0].image+')'}">
                        <h3>{{homeDataList.promotionB[0].name}}</h3>
                        <p>{{homeDataList.promotionB[0].remark}}</p>
                  </div>
                </a>
              <a :href="homeDataList.promotionC[0].url">
                <div class="activity_bottom" :style="{backgroundImage:'url('+homeDataList.promotionC[0].image+')'}">
                      <h3>{{homeDataList.promotionC[0].name}}</h3>
                      <p>{{homeDataList.promotionC[0].remark}}</p>
                </div>
              </a>
              </div>
        </div>
    </div>
</template>
<script>
    export default {
      props:["homeDataList"],
        data() {
            return {

            }
        },
        methods: {

        },
        created() {
        }
    }
</script>
<style scoped lang="less">
      #activity_container{
        background:#fff;
        font-family:PingFangSC-Medium;
        width:100%;
        >h3{
          line-height: 4em;
          font-size:40/50rem;
          color:#000;
          letter-spacing:0px;
          text-align:center;
        }
        >.activity_center{
          overflow: hidden;
            >div{
              text-align: center;
              float:left;
          }
          >.activity_left{
            /*background:url(../../assets/images/activity1.png) center center no-repeat;*/
            background-size: 100% 100%;
            >a{
              overflow: hidden;
              display: block;
              width:100%;
              height: 100%;
            >h3{
              font-size:32/50rem;
              color:#4a4a4a;
              letter-spacing:0px;
              line-height:2em;
              text-align:center;
              margin-top:55/50rem;
            }
            >p{
              font-size:28/50rem;
              line-height: 1em;
              color:#9e9e9e;
            }
              >img{
                display: block;
                width: 223/50rem;
                height:205/50rem;
                margin:0 auto;
                margin-top:1rem;
              }
            }
            width:286/50rem;
            height:461/50rem;
            margin-left:.3rem;
          }
          >.activity_right{
            width:421/50rem;
            margin-left:.29rem;
            >a{
              overflow: hidden;
              display: block;
              width:100%;
              height: 100%;
            >.activity_top, >.activity_bottom{
              width:100%;
              height:224/50rem;
              /*background:url(../../assets/images/goddess.png) center center no-repeat;*/
              background-size: 100% 100%;
              padding-left:3rem;
              padding-top:1.5rem;

              >h3{
                font-family:PingFangSC-Semibold;
                font-size:32/50rem;
                color:#4a4a4a;
                margin-bottom:.2rem;
                letter-spacing:0px;
                text-align:center;
              }
              >p{
                font-size:28/50rem;
                color:#888888;
              }
              }
            }
            >a >.activity_bottom{
              margin-top:.3rem;
              background-size:100% 100%;
            }
          }
        }
      }
</style>


