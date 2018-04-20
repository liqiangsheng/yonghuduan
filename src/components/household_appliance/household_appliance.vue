<template>
  <div id="box">
    <div class="current_position"  >当前位置：{{currentposition.name}}</div>
    <mt-index-list id="position_text">
      <mt-index-section v-for="(tem,index) in dataList" :index="tem.initial" :key="index">
          <li class="list" v-for="(item,index) in tem.name" :key="item.name"
          @click="selectorPosition(item.name,item)" v-text="item.name"></li>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>

  import {setSession,getSession} from "../../js/session"
//  import common from "../../../static/js/baseHttp"
    export default{
        data(){
            return{
              currentposition:getSession()[0],
              dataList:[]
          }
        },
        methods:{
          selectorPosition(name,key){
              this.currentposition=name;
              setSession(key);
             this.$router.push({path:"/home"})
          }
        },
        computed: {

          },
        created() {
            var url=common.apidomain+'/areainfo/findHtmlCityListareaInfo';
            this.$http.get(url).then(res=>{
              let data=res.data.result.dataList;
              data.forEach((v,i)=>{
                data[i].initial=v.initial.toUpperCase();
              });
              this.dataList=data;
            });
        }
    }
</script>
<style lang="less">
  #box{
    .current_position{
      width:100%;
      height:80/50rem;
      line-height:80/50rem;
      font-family: PingFangSC-Medium;
      font-size: 25/50rem;
      color: #EB5312;
      padding-left:15/50rem;
    }
    >#position_text{
      .list{
        font-family: PingFangSC-Regular;
        font-size: 25/50rem;
        color: #4A4A4A;
        border-bottom:1px solid rgba(0,0,0,0.1);
        padding:.6rem 0;
        margin-left:20/50rem;
      }
      .list:last-of-type{
        border:none;
      }
      >.mint-indexlist-nav{
        border:none;
        >.mint-indexlist-navlist{
          line-height: 1em;
          >.mint-indexlist-navitem{
            font-family: PingFangSC-Medium;
            font-size: 25/50rem;
            padding-top:0;
            padding-bottom:0;
            color:#9b9b9b;
            .mint-indexsection-index{
              padding:5/50rem 20/50rem;
            }
          }
        }
      }
      // bar
      >.mint-indexlist-content{
        margin:0 !important;
        >.mint-indexsection{
          background:#fff;
          >.mint-indexsection-index{
            padding-top:.1rem;
            padding-bottom:.1rem;
          }
        }
      }
    }
  }

</style>
