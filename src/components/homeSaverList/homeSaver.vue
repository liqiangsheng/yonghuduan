<template>
    <div class="saver_container">
        <h3>热门服务</h3>
      <div class="saver_list">
        <ul class="saver_item" ref="saver">
          <router-link tag="li" :to="subServiceId(item.serviceId)" v-for="(item,index) in dataList" :key="index" :style="{'backgroundImage':'url('+item.image+')'}">
            <!--<b class="saver_icon">-->
            <!--:style="{'backgroundImage':'url('+item.image+')'}"-->
            <!--限时-->
            <!--</b>-->
                 <p>
                   {{item.name}}
                 </p>
                  <p>
                  {{item.subHead}}
                 </p>
                  <p>
                ¥{{item.serviceSalePrice}}
                <del>
                  ¥{{item.servicePrice}}
                </del>
              </p>
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
    export default {
      props:["dataListSaver"],
        data() {
            return {
                dataList:[]
            }
        },
        methods: {
          subServiceId(id){
            const index_of=id.substring(0,3);
            if(index_of==="004")return `/wash1/${index_of}?id=${id}`;
            return `/wash/${index_of}?id=${id}`
          }
        },
        created() {
          this.dataList=this.dataListSaver;
          this.$nextTick(()=>{
             setTimeout(()=>{
               let currentWidth = this.$refs.saver.children[0].offsetWidth,
                  element= this.$refs.saver,
                 getStyle=(obj,attr)=>{
                    if(obj.currentStyle){
                        return obj.currentStyle[attr]
                    }else{
                        return document.defaultView.getComputedStyle(obj,null)[attr];
                    }
                 },
                  getCurrentMargin = getStyle(this.$refs.saver.children[0],"marginLeft").substring(0,getStyle(this.$refs.saver.children[0],"marginLeft").length-2)-0;
                  element.style.width=`${(currentWidth+getCurrentMargin*1.6)*this.dataList.length}px`;
             },1500);
          })
        }
    }
</script>
<style scoped lang="less">
.saver_container{
  background:#fff;
  width:100%;
  >h3{
    text-align: center;
    line-height: 4em;
    font-family:PingFangSC-Medium;
    font-size:40/50rem;
    color:#000;
  }
  >.saver_list{
    overflow: auto;
    >.saver_item{
      overflow: hidden;
      width:200rem;
      margin-bottom:1px;
      >li{
        background-size:100% 100%;
        position: relative;
        width:310/50rem;
        text-align: center;
        border:1/50rem solid #c9c9c9;
        padding-bottom:.56rem;
        border-radius:18/50rem;
        float: left;
        letter-spacing:0px;
        margin-left:17/50rem;
        >p{
          font-family:PingFangSC-Light;
          line-height: 1.6em;
        }
        >p:first-of-type{
          font-size:30/50rem;
          color:#000;
          margin-top:.8rem;
        }
        >p:nth-of-type(2){
          font-size:26/50rem;
          color:#000;
        }
        >p:last-of-type{
          font-size:26/50rem;

          color:#000;
          font-weight: bold;
          >del{
            font-weight:normal;
            font-size:24/50rem;
            color:#9b9b9b;
          }
        }
        >.saver_icon{
          font-weight: normal;
          text-align: right;
          line-height: 59/50rem;
          padding-right:.2rem;
          position:absolute;
          font-family:PingFangSC-Light;
          font-size:22/50rem;
          color:#ffffff;
          right:-1px;
          top:-1px;
          width:80/50rem;
          height:80/50rem;
        }
      }
    }
  }
}
</style>


