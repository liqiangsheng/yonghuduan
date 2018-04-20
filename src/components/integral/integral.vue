<template>
  <div id="box">
    <div class="picture_back">
      <p>积分明细</p>
      <div class="current_sum">
        <p>当前积分</p>
        <p>{{totalCommission}}</p>
      </div>
    </div>
      <ul>
        <li v-for="(item,index) in dataList" :key="index">
          <p class="left">{{item.type | type}}</p>
          <div class="right">
            <span>{{item.createTime|moment('YYYY-MM-DD')}}</span>
            <p>{{item.gainCount<0?"":"+"}}{{item.gainCount}}</p>
          </div>
        </li>
      </ul>
    <p v-show="loading" class="page-infinite-loading loading-list">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>
<script>
  import {MessageBox} from "mint-ui"
  import {getCookie} from "@/js/cookie"
  import { InfiniteScroll } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  export default{
    data(){
      return{
        totalCommission:0,
        dataList:[],
        list:[],
        pages:{
          pageNo:1,
          pageSize:10,
        },
        loading:false,
      }
    },
    methods:{
      loadMore() {
//        this.loading=true;
//        this.pages.pageNo++;
//        this.getDataList(true)
      },
      tel(){
        window.location.href = "tel:4009991891";
      },
      getDataList(){
          let url2=`${this.$common.apidomain}/userUserFriendsShareRecord/findPage`,
              params={params:{
                "token":getCookie(),
                "pageNo":this.pages.pageNo,
                "pageSize":this.pages.pageSize
              }};
            this.$http.get(url2,params).then(res=>{
              let data=res.data;
              Indicator.close();
              this.pages.pageNo=data.result.pageNo;
              this.pages.pageSize=data.result.pageSize;
              this.pages.pageTotal=data.result.pageTotal;
              this.pages.total=data.result.total;
              this.dataList= this.dataList.concat(data.result.userCumulativeFractionRecords);
              this.loading = false;
            })
      }
    },
    created() {
      Indicator.open('加载中');
      let _this=this;
      window.onscroll=function(){
        if(window.innerHeight + document.documentElement.scrollTop === document.body.scrollHeight){
          if(_this.pages.pageNo<_this.pages.pageTotal){
            _this.pages.pageNo++;
            _this.loading=true;
            _this.getDataList()
          }

        }
      };
      if(getCookie()){
        let url= `${this.$common.apidomain}/userUserFriendsShareRecord/findOne?token=${getCookie()}`;
        this.$http.get(url).then(res=>{
          let data=res.data;
          data.code==="0000"?this.totalCommission=data.result.totalCommission:this.$Toast(data.error);
        });
        this.getDataList();
      }else{
        Indicator.close();
        this.$store.commit("changeLoginPath",this.$route.path);
        setTimeout(()=>{
          this.$router.push({path:"/login"});
        },1000)
      }
    }
  }
</script>
<style lang="less">
  .loading-list{
    padding-bottom:.5rem;
    background:#fff;
    text-align: center;
    >span{
      overflow: hidden;
      >.mint-spinner-fading-circle{
       display: inline-block;
        vertical-align: middle;
        /*transform:transformY(100%);*/
      }
    }
  }
</style>
<style scoped lang="less">
  .page-infinite-loading{
    margin:0 auto;
  }
  .picture_back{
    width:100%;
    height:267/50rem;
    background:url(../../../static/images/bg1.png)center no-repeat;
    background-size:100% 100%;
    position:relative;
  >p{
    font-family: PingFangSC-Regular;
    font-size: 24/50rem;
    color: #FFFFFF;
    float:right;
    margin:.4rem;
  }
    >.current_sum{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      >p{
        font-family: PingFangSC-Medium;
        font-size: 42/50rem;
        color: #FFFFFF;
        text-align: center;
      }
      >p:first-of-type{
        font-size: 32/50rem;
      }
    }
  }
  ul{
    >li{
      padding:20/50rem;
    overflow: hidden;
      background:#fff;
      .left{
        line-height: 4em;
        float:left;
      }
      .right{
        padding-top:.3rem;
        text-align: center;
        float:right;
        >p{
          font-family: PingFangSC-Regular;
          font-size: 32/50rem;
          color: #4A4A4A;
        }
        >span{
          font-family: PingFangSC-Regular;
          font-size: 28/50rem;
          color: #9B9B9B;
        }
        >p{
          line-height: 2em;
          font-family: PingFangSC-Medium;
          font-size: 32/50rem;
          color: #4A4A4A;
        }
      }
    }
  }

</style>


