<template>
  <div id="box" v-show="lo">
    <router-link tag="div" class="nav_position" to="/appliance" >
      <p class="position_text">
        {{getPosition().name}}<b class="size"></b>
      </p>
    </router-link>
    <!-- 1.0 轮播图：mint-ui中的 swipe组件实现 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(item,index) in bannerList" :key="item.image" v-if="item.image">
        <a class="banner_box" :href="item.url">
          <img :src="item.image"></a>
      </mt-swipe-item>
    </mt-swipe>
    <!--菜单列表 start-->
        <div class="menu_list" ref="menu_box">
          <div class="mui-content">
              <ul class="menu_box">
                <router-link tag="li" v-for="(item,index) in menuListData" :key="index" :to="item.path">
                  <i class="menu_item_icon" :class="item.className"></i>
                  <span>{{item.name}}</span>
                </router-link>
              </ul>
          </div>
        </div>
    <!--菜单列表 end-->
    <!--热门服务 start-->
           <home-saver :dataListSaver="salePageBottom" v-if="!!salePageBottom&&!!salePageBottom.length"></home-saver>
    <!--热门服务 end-->

    <!--活动专享 start-->
    <activity-exclusive :homeDataList="homeDataList" v-if="homeDataList&&homeDataList.promotionA.length&&homeDataList.promotionB.length&&homeDataList.promotionC.length"></activity-exclusive>
   <!--活动专享 end-->

<!--申明start-->
    <div class="declare_container">
          <h3></h3>
            <ul class="declare_container_item">
              <li v-for="(item,index) in declareData" :key="index">
                <i class="declare_container_item_icon" :class="'declare_container_item_icon'+item.className"></i>
                <p>
                  {{item.name}}
                </p>
              </li>
            </ul>
    </div>
  </div>
</template>
<script>
  import {autoiscroll} from "../../static/js/autoiscroll";
  import {setCookie,getCookie,getOpenID} from "@/js/cookie"
  import {setSession,getSession,setSessionUserInfo} from "@/js/session"
  import homeData from "@/components/homeData/homeData"
  import { Indicator } from 'mint-ui';
  import homeSaver from "./homeSaverList/homeSaver"
  import activityExclusive from "./activityExclusive/activityExclusive"
  export default {
    components:{
      activityExclusive,
      homeData,
      homeSaver
    },
    data () {
      return {
        homeDataList:"",
        declareData:[
          {
            name:"上门服务",
            className:""
          }, {
            name:"费用透明",
            className:"order_001"
          }, {
            name:"品质配件",
            className:"order_003"
          }, {
            name:"快速响应",
            className:"order_002"
          },
        ],
        menuListData:[
          {
            name:"手机维修",
            className:"tel",
            path:"/wash/003"
          }, {
            name:"家电维修",
            className:"household",
            path:"/wash/002"
          }, {
            name:"家居维修",
            className:"furniture",
            path:"/wash1/004"
          }, {
            name:"卫浴洁具",
            className:"bathroom",
            path:"/wash1/008"
          },
          {
            name:"家电清洗",
            className:"purge",
            path:"/wash1/001"
          },
          {
            name:"安装服务",
            className:"install",
            path:"/wash1/009"
          },
          {
            name:"灯具线路",
            className:"lanterns",
            path:"/wash1/007"
          },
          {
            name:"管道疏通",
            className:"pipeline",
            path:"/wash1/006"
          },
        ],
        bannerList:[],
        noticeInfo:[],
        data:"",
        salePageBottom:[],
        lo:false,
        articleList:[]
      }
    },
    methods:{
      getPosition(){
        return this.$store.state.current_option
      },
      isHmeData(homeDataList){
        if((homeDataList.promotionA&&homeDataList.promotionB&&homeDataList.promotionC&&homeDataList.promotionD)&&homeDataList.promotionA.length&&homeDataList.promotionB.length&&homeDataList.promotionC.length&&homeDataList.promotionD.length) {
          return true;
        }
        return false
      }
    },
    created() {
      setSessionUserInfo("orderState","1");
      setSessionUserInfo("addServer",{isHomeEnter:true})
      Indicator.open('加载中');
      let url=this.$common.apidomain+'/homedata';
      this.$http.get(url).then(res=>{
        if(res.data.code==="0000"){
              Indicator.close();
              this.lo=true;
              let data=res.data.result;
              this.homeDataList=data;
              this.bannerList=data.slideShow; //轮播图
              this.noticeInfo=data.commonMessages;//公告栏
              this.articleList=data.articleInfo;
              this.salePageBottom=data.salePageBottom;
        }else{
            this.$Toast(res.data.error);
        }
      });
//    //定位城市；
    },
   mounted(){
		
   },
  }
</script>
<style scoped lang="less">
  .declare_container{
      background:#fff;
      padding:78/50rem 0;
      padding-bottom:2.06rem;
      width:100%;
      >h3{
        height:43/50rem;
        width:470/50rem;
        margin:0 auto;
        margin-bottom:1rem;
        background:url(../assets/images/spanspirse.png) center center no-repeat;
        background-size:100% 100%;
      }
    >.declare_container_item{
      overflow: hidden;
      position:relative;
      float:left;
      left:50%;
      transform:translateX(-50%);
      width:auto;
      margin:0 auto;
      >li{
        text-align: center;
        float:left;
        position: relative;
        /*width:25%;*/
        width:auto;
        line-height: 32/50rem;
        padding-left:66/50rem;
        overflow: hidden;
        font-family:PingFangSC-Regular;
        font-size:22/50rem;
        color:#4a4a4a;
        >.declare_container_item_icon{
          position:absolute;
          left:2/50rem;
          top:0;
          height: 34/50rem;
          width: 27/50rem;
          vertical-align: middle;
          background:url(../assets/images/order_004.png) center center no-repeat;
          background-size:100% 100%;
        }
        >.declare_container_item_iconorder_001{
          left:33/50rem;
          background:url(../assets/images/order_001.png) center center no-repeat;
          background-size:100% 100%;
          width:24/50rem;
          height:31/50rem;
        }
        >.declare_container_item_iconorder_003{
          left:33/50rem;
          background:url(../assets/images/order_003.png) center center no-repeat;
          background-size:100% 100%;
          width:25/50rem;
          height:32/50rem;
        }
        >.declare_container_item_iconorder_002{
          left:33/50rem;
          background:url(../assets/images/order_002.png) center center no-repeat;
          background-size:100% 100%;
          width: 30/50rem;
          height:30/50rem;
        }
        >p{
          float:right;
          font-size: 22/50rem;
          color:#4a4a4a;
          /*margin-right:.5rem;*/
        }
      }
      >li:first-of-type{
       padding-left:36/50rem;
      }
      >li:last-of-type{
        padding-left:70/50rem;
      }
    }
  }
  /*菜单样式*/
  .menu_list{
      >.mui-content{
        background:#fff;
        >.menu_box{
          overflow: hidden;
          padding-bottom:13/50rem;
          >li{
            float:left;
            width:25%;
            text-align: center;
            margin-top:46/50rem;
            >.menu_item_icon{
              width:120/50rem;
              background:url(../assets/images/mobile_phone.png) center center no-repeat;
              background-size:100% 100%;
              height:110/50rem;
              display: block;
              margin:0 auto;
            }
            >.menu_item_icon.household{
              background:url(../assets/images/household.png) center center no-repeat;
              background-size:100% 100%;
            }
            >.menu_item_icon.furniture{
              background:url(../assets/images/furniture.png) center center no-repeat;
              background-size:100% 100%;
            }
            >.menu_item_icon.bathroom{
              background:url(../assets/images/bathroom.png) center center no-repeat;
              background-size:100% 100%;
            }  >.menu_item_icon.purge{
              background:url(../assets/images/purge.png) center center no-repeat;
              background-size:100% 100%;
            } >.menu_item_icon.lanterns{
              background:url(../assets/images/lanterns.png) center center no-repeat;
              background-size:100% 100%;
            } >.menu_item_icon.install{
              background:url(../assets/images/install.png) center center no-repeat;
              background-size:100% 100%;
            }>.menu_item_icon.pipeline{
              background:url(../assets/images/pipeline.png) center center no-repeat;
              background-size:100% 100%;
            }
            >span{
              font-family:PingFangSC-Light;
              font-size:24/50rem;
              color:#000;
              letter-spacing:0px;
            }
          }
        }
      }
  }
  /*菜单样式end*/
  .nav_position{
    position:absolute;
    right:5%;
    top:10px;
    z-index: 999;
    >.position_text{
      font-family: PingFangSC-Regular;
      color:rgba(235,83,18,1);
      font-size: 0.5rem;
    }
    .size{
      width:.5rem;
      height:.5rem;
      background:url(../../static/images/bottom201.png)center center no-repeat;
      background-size:100% 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .size{
      font-size:28/50rem;
    }
  }
  #box{
    position:relative;
    margin-bottom:1.96rem;
  }

  .mint-swipe{
    height: 326/50rem;
  }
  .mint-swipe-item img{
    width: 100%;
    height:100%;
  }
  .mint-swipe-item{
    width: 100%;
    height: 100%;
  }
  //菜单列表
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right:0px;
    border-bottom:0px;
  }
  .mui-grid-view.mui-grid-9{
    border-top:0px;
    border-left:0px;
  }
  .mui-icon-home:before,
  .mui-icon-email:before,
  .mui-icon-chatbubble:before,
  .mui-icon-location:before,
  .mui-icon-search:before,
  .mui-icon-phone:before{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-repeat: round;
  }

  .mui-icon-home:before{
    /*background-image: url(../assets/images/qingxi.png);*/
  }
  .mui-icon-email:before{
    background-image: url(../assets/images/jiadianweixiu.png);
  }
  .mui-icon-chatbubble:before{
    background-image: url(../assets/images/shoujiweixiu.png);
  }
  .mui-icon-location:before{
    background-image: url(../assets/images/jiaju.png);
  }
  .mui-icon-search:before{
    background-image: url(../../static/images/kaisuo.png);
  }
  .mui-icon-phone:before{
    /*background-image: url(../../static/images/guandao.png);*/
  }
  .computer:before{
    /*background-image: url(../../static/images/diannao.png);*/
  }
  .bathroom:before{
    background-image: url(../assets/images/bathroom.png);
  }

  .mui-table-view.mui-grid-view{
    .mui-table-view-cell{
      /*padding:0;*/
      .mui-media-body{
        margin-top:0px;
      }
    }
  }
  .announcement{
    height:30px;
    width:100%;
    line-height: 30px;
    position:relative;
    background:#fff;
    >.notice{
      height:100%;
      margin-left:36px;
      font-size: 24/50rem;
      position:relative;
      overflow: hidden;
      >ul{
        position:absolute;
        left:0;
        top:0;
        padding:0;
        transition:top .3s ease;
        margin:0;
        li{
          list-style: none;
          >a{
            display: block;
            color:rgba(155,155,155,1);
          }
        }
      }
    }
    >.icon{
      position:absolute;
      left:16px;
      top:20%;
      width:15px;
      background:url(../../static/images/give.png)center center no-repeat;
      background-size:100% 100%;
      height:15px;

    }
  }
  .goods_container{
    margin-bottom:98/50rem;
    >.mui-table-view{
      &::before{
        display: none;
      }
      &::after{
        display: none;
      }

      >.goods_list{
        border-top:1px solid #f2f2f2;
        &::after{
          display: none;
        }
        height:200/50rem;
        /*max-height: 162px;*/
        >a{

          height:200/50rem;
          >.mui-pull-left{
            width:210/50rem;
            height:100%;
            max-width:none;
          }
          >.anorop{

          }
        }
        .mui-media-body{
          font-size: 28/50rem;
          position:relative;
          height:100%;
          >p{
            font-size: 24/50rem;
            color:rgba(155,155,155,1);
            width:100%;
          }
          >.mui-ellipsis{

            width:100%;
          }
          >.activity{
            position:absolute;
            left:0;
            bottom:0;
            color:rgba(235,83,18,1);
          }
        }
      }
    }
    .mui-table-view-cell > a:not(.mui-btn){
      white-space:normal;
      line-height: 36/50rem;
    }
  }
  .banner_box{
    display: block;
    height:100%;
    >img{
      display: block;
    }
  }
  #barcaver{
    width:100%;
    height:18px;
    background:#fff;
    /*z-index: 99;*/
    position:absolute;
    left:0;
    bottom:0;
  }
  .right_Icon{
    display: block;
    float:right;
    width:10px;
    height:15px;
    position:absolute;
    right:10px;
    top:50%;
    background:url(../../static/images/right.png)center center no-repeat;
    background-size:100% 100%;
  }

</style>
<style lang="less">
  .mint-swipe-indicators{
    .mint-swipe-indicator{
      background:#fff !important;

    }
    .is-active{
      background:#EB5312 !important;
    }
  }


</style>
