<template>
  <div id="box">
  <!-- 一级分类 -->
      <div class="container" ref="mycontainer">
        <h3 class="classify_title">{{titleH}}</h3>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"
                    @click="selectortype(index,item.a,item)"
                    v-for="(item,index) in householddata"
                    :key="index">
                  <a href="javascript:;" :class="{'selector':i0==index}">{{item.b}}</a>
                </li>
            </ul>
      </div>
    <transition name="fade">
         <div class="container" ref="mycontainer" v-show="childrenType1!=''">
          <h3 class="classify_title">{{title[0]}}</h3>
              <ul class="mui-table-view">
                  <li class="mui-table-view-cell"
                      @click="selectortype1(index,item.a,item)"
                      v-for="(item,index) in childrenType1"
                      :key="index">
                    <a href="javascript:;" :class="{selector:i1==index}">{{item.b}}</a>
                  </li>
              </ul>
        </div>
    </transition>
    <transition name="fade">
 <div class="container" ref="mycontainer" v-show="childrenType2!=''">
        <h3 class="classify_title">{{title[1]}}</h3>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"
                    @click="selectortype2(index,item.a,item)"
                    v-for="(item,index) in childrenType2"
                    :key="index">
                  <a href="javascript:;" :class="{'selector':i2==index}">{{item.b}}</a>
                </li>
            </ul>
      </div>
    </transition>
    <transition name="fade">
 <div class="container" ref="mycontainer" v-show="childrenType3!=''">
        <h3 class="classify_title">{{title[2]}}</h3>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"
                    @click="selectortype3(index,item.a,item)"
                    v-for="(item,index) in childrenType3"
                    :key="index">
                  <a href="javascript:;" :class="{'selector':i3==index}">{{item.b}}</a>
                </li>
            </ul>
      </div>
    </transition>
    <transition name="fade">
 <div class="container" ref="mycontainer" v-show="childrenType4!=''">
        <h3 class="classify_title">{{title[3]}}</h3>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"
                    @click="selectortype4(index,item.a,item)"
                    v-for="(item,index) in childrenType4"
                    :key="index">
                  <a href="javascript:;" :class="{'selector':i4==index}">{{item.b}}</a>
                </li>
            </ul>
      </div>    </transition>    <transition name="fade">
      <div class="container" ref="mycontainer" v-show="childrenType5!=''">
        <h3 class="classify_title">{{title[4]}}</h3>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"
                    @click="selectortype5(index,item.a,item)"
                    v-for="(item,index) in childrenType5"
                    :key="index">
                  <a href="javascript:;" :class="{'selector':i5==index}">{{item.b}}</a>
                </li>
            </ul>
      </div></transition>    <transition name="fade">
      <div class="container" ref="mycontainer" v-show="childrenType6!=''">
        <h3 class="classify_title">{{title[5]}}</h3>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"
                    @click="selectortype6(index,item.a,item)"
                    v-for="(item,index) in childrenType6"
                    :key="index">
                  <a href="javascript:;" :class="{'selector':i6==index}">{{item.b}}</a>
                </li>
            </ul>
      </div></transition>
    <transition name="fade">
      <div class="container" ref="mycontainer" v-show="childrenType7!=''">
        <h3 class="classify_title">{{title[6]}}</h3>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"
                    @click="selectortype7(index,item.a,item)"
                    v-for="(item,index) in childrenType7"
                    :key="index">
                  <a href="javascript:;" :class="{'selector':i7==index}">{{item.b}}</a>
                </li>
            </ul>
      </div>
    </transition>
  <!--
    需求：点击一级分类的某一个选项的时候，下面会接着显示二级分类，样式和结构都是一样的，一直循环下去，
    一直到json数据里面有d并且不为空的时候，就是最后的子节点，再显示高空费和价格配件表
   -->
<!--显示tags-->
   <!--  <transition name="fade" >
      <tags v-if="false" :tagsList="tagsList"></tags>
    </transition> -->
<!--显示tags   end-->


  <div class="container" v-show="isKongtiao" v-if="$route.params.id!='001'&&dataPriceList&&dataPriceList.length>0">
    <h3 class="classify_title price_title">配件价格表</h3>
    <p class="describe">一口价：含一般配件，特殊配件需另外加收配件费</p>
  <ul class="mui-table-view content_view kongtiao">
      <li class="small_box">
        <div class="title">
          <p>维修等级</p>
          <p>配件</p>
          <p>单价</p>
        </div>
      </li>
    <li class="small_box" v-for="(item,index) in dataPriceList" :key="index">
          <ul>
            <li class="fittings_list" >
              <div class="left medium">
                <div>
                  {{item.serviceInfo.name}} <br>
                  <del>({{item.serviceInfo.price2}}元)</del>
                  <p>(折扣价/{{item.serviceInfo.price2*item.serviceInfo.price2Discount}}元)</p>
                </div>
              </div>
              <table border="0" class="medium_table">
                <tr v-for="(item,index) in item.serviceMountings" :key="index">
                  <td>{{item.name}}</td>
                  <td>{{item.price}}元</td>
                </tr>
              </table>
            </li>
          </ul>
      </li>
    </ul>
  </div>
    <!--高空费-->
    <div class="container" v-if="highAltitude">
      <h3 class="classify_title price_title">高空费</h3>
      <ul class="mui-table-view content_view">
        <li class="small_box">
          <div class="title">
            <p>楼层段</p>
            <p>价格</p>
          </div>
        </li>
        <li class="small_box">
          <ul>
            <li class="fittings_list heightKong" v-for="item in highAltitude">
              <div class="center altitude">
                {{item.floorStart}}~{{item.floorEnd}}
                <!--<p>微动开关</p>-->
              </div>
              <div class="right altitude">
                  {{item.price}}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  <!-- 服务介绍 -->
    <transition name="fad">
            <div class="container" v-if="dataInfo">
              <!--<h3 class="classify_title price_title">配件价格表</h3>-->
              <div class="box">
                <img :src="dataInfo.imageUrl" alt="">
              </div>
              <div class="server_describe" v-html="dataInfo.content">
                   <!--  <p class="serve_scope">服务范围：<span>深圳</span></p>
                    <h4 class="flow_path"> 维修流程：</h4>
                    <span>
                      这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，这里是文字介绍，
                    </span> -->

              </div>
            </div>
    </transition>
  <div class="footer" v-if="isKongtiao" v-show="false">

    ￥{{sum}}

    <a class="accounts_btn" href="javascript:;" @click="add(tagsList)">加入服务</a>
  </div>
</div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import {setCookie,getCookie} from "../../js/cookie"
//  import common from "../../js/baseHttp"
  import {Toast} from "mint-ui"
  import { Indicator } from 'mint-ui';
  import {getSession,setSession,removerStorage,getLocalStorage,setLocalStorage} from "../../js/session"
  import tags from "./tags";
  import {thFn,selectorFun} from "./js/selector"
  export default{
    components:{
      tags
        },
        data(){
            return{
              secondId:"",
              serveCityId:"",
                tagsList:[],
                i0:"-1",
                i1:"-1",
                i2:"-1",
                i3:"-1",
                i4:"-1",
                i5:"-1",
                i6:"-1",
                title:[],
              highAltitude:'',//高空费；
              isHeight:false,
                  //选中的一级分类
              childrenStyleTitle:"",
              styleTypeList:'',
              childrenType1:'',
              childrenType2:'',
              childrenType3:'',
              childrenType4:'',
              childrenType5:'',
              childrenType6:'',
              childrenType7:'',
              childrenType8:'',
              childrenType9:'',
              dataInfo:"",
              sum:0,
              isKongtiao:"",
              // ind:"-1",
              titleH:"", //一级分类标题
              isPriceList:false,//空调价格表
              querstion:"-1", //问题类型显示
              introduce:false,//服务及价格显示隐藏
              householddata:[],  //一及分类数据列表
              dataPriceList:[],
              jsObjData:'', //结算后最后一个对象
              faterKey:'',
              sendId:''
                   }
        },
        methods:{
          selectortype(index,id,key){
            selectorFun.selectorType(index,id,key);
          },
          selectortype1(index,id,key){
                  this.i1=index;
                  this.childrenType2='';
                  this.childrenType3='';
                  this.i2="-1";
                  this.childrenType4='';
                  this.childrenType5='';
                  this.childrenType6='';
                  this.childrenType7='';
                  this.childrenType8='';
                  if(key.d&&key.d!=""){

                      this.getData(id);

                    if(!this.dataPriceList||this.dataPriceList.length===0){
                      this.isKongtiao=false;
                    }else{
                       this.isKongtiao=true;
                    }
                    this.jsObjData=key;
                    return;
                  }
                  if( key==undefined || key=="" || key.d || key.beans==""){
                    this.isKongtiao=false;
                    Toast("暂未开通该服务");
                    this.highAltitude=''
                    return;
                  }
                  this.childrenType2=key.beans
                  this.title.push(key.c)
          },
          selectortype2(index,id,key){
                  this.i2=index;

                  this.childrenType3='';
                   this.i3="-1",
                  this.childrenType4='';
                  this.childrenType5='';
                  this.childrenType6='';
                  this.childrenType7='';
                  this.childrenType3='';
                  if(key.d&&key.d!=""){

                    this.getData(id);
                    if(!this.dataPriceList||this.dataPriceList.length===0){
                      this.isKongtiao=false;
                    }else{
                       this.isKongtiao=true;
                    }
                    this.jsObjData=key;

                    return;
                  }
                   if( key==undefined || key=="" || key.d || key.beans==""){
                     this.isKongtiao=false;
                     this.highAltitude=''
                   Toast("暂未开通该服务")
                    return
                  }
                  this.childrenType3=key.beans;
                  this.title.push(key.c);
          },
          selectortype3(index,id,key){
                  this.i3=index;
                  this.i4="-1";
                  this.childrenType4='';
                  this.childrenType5='';
                  this.childrenType6='';
                  this.childrenType7='';

                  if(key.d&&key.d!=""){

                     this.getData(id);
                    if(!this.dataPriceList){
                      this.isKongtiao=false;
                    }else{
                       this.isKongtiao=true;
                    }
                    this.jsObjData=key;

                    return;
                  }
                  if( key==undefined || key=="" || key.d || key.beans==""){
                    this.isKongtiao=false;
                    this.highAltitude=''
                      return Toast("暂未开通该服务");
                  }
                  this.childrenType4=key.beans;
                  this.title.push(key.c);
          },
          selectortype4(index,id,key){
                  this.i4=index;
                  this.childrenType2='';
                  this.i5="-1";
                  this.childrenType5='';
                  this.childrenType6='';
                  this.childrenType7='';
                if(key.d&&key.d!=""){
                  this.getData(id);
                    if(!this.dataPriceList||this.dataPriceList.length===0){
                      this.isKongtiao=false;
                    }else{
                       this.isKongtiao=true;
                    }
                  this.jsObjData=key;

                  return;
                }
               if( key==undefined || key=="" || key.d || key.beans==""){
                 this.isKongtiao=false;
                      return  Toast("暂未开通该服务");
               }
                  this.childrenType5=key.beans;
                  this.title.push(key.c)
          },
          selectortype5(index,id,key){
                   this.i5=index;
                   this.i6="-1";
                   this.childrenType6='';
                   this.childrenType7='';
                  if(key.d&&key.d!=""){
                     this.getData(id);
                    if(!this.dataPriceList){
                      this.isKongtiao=false;
                    }else{
                       this.isKongtiao=true;
                    }
                    this.jsObjData=key;

                    return;
                  }
                  if( key==undefined || key=="" || key.d || key.beans==""){
                    this.isKongtiao=false;
                    this.highAltitude=''
                      return Toast("暂未开通该服务");
                    }
                  this.getData(id);
                  this.childrenType6=key.beans;
                  this.title.push(key.c)
          },
          selectortype6(index,id,key){
                   this.i6=index;
                   this.i7="-1";
                   this.childrenType7='';
                    this.childrenType8='';
                    if(key.d&&key.d!=""){
                      this.getData(id);

                      if(!this.dataPriceList){
                        this.isKongtiao=false;
                      }else{
                         this.isKongtiao=true;
                      }
                      this.jsObjData=key;

                      return;
                    }
                  if( key==undefined || key=="" || key.d || key.beans==""){
                    this.highAltitude=''
                    this.isKongtiao=false;
                    return Toast("暂未开通该服务");

                  }
                  this.childrenType7=key.beans;
                  this.title.push(key.c)
          },

          selectortype7(index,id,key){
                  this.i7=index;
                  this.i8="-1";
                  this.childrenType9='';
                  if(key.d&&key.d!=""){
                      this.getData(id);
                    this.jsObjData=key;
                      this.isKongtiao=true;
                      return;
                  }
                  if( key==undefined || key=="" || key.beans==""){
                    this.isKongtiao=false;
                    this.highAltitude=''
                      return Toast("暂未开通该服务");
                  }
                  this.childrenType8=key.beans;
                  this.title.push(key.c)
          },
          add(d){
            this.$store.commit("changeAddServerPath",this.$route.path)
            let flag=false,i;
              for(i=0;i<d.length;i++){
                if(d[i].selector){
                  flag=true;
                  break;
                }
              }
              if(!flag){
                return Toast("请选择原因")
              }

            if(!getCookie()){

               this.$store.commit("changeLoginPath","/affirmorder")
              this.$router.push({path:"/login"});
              return;
            }

            var faterId=this.dataPriceList[0].serviceInfo;
            if(!this.sendId){

              return;
            }
          if(getLocalStorage("fullName")!=""){
            if(getLocalStorage("fullName")[0].farterId!==this.$route.params.id){
              removerStorage("fullName");  //如果发现一级分类的id和存储的id 不一致，就清除；
              removerStorage("server");
            }
          }
            removerStorage("title");
            setLocalStorage("title",this.titleH);
            this.dataPriceList[0].serviceInfo.farterId=this.$route.params.id;  //一级分类id
            this.dataPriceList.forEach((e,i)=>{     //设置size个数
              e.serviceInfo.size=1;
            });
//            for(var y=0;y<getLocalStorage("fullName").length;y++){
//              if(getLocalStorage("fullName")[y].id==this.dataPriceList[0].serviceInfo.id){
//                      //如果一样就让size++；
//                 }
//                }
            if(this.$store.state.paths==="o"){
              removerStorage("fullName");
            }
            this.$store.commit("changePaths","o");
            let tagsNameArr=[];
            this.tagsList.forEach(v=>{
              if(v.selector){
                tagsNameArr.push(v.name)
              }
            });
            faterId.tagsName=tagsNameArr;
            setLocalStorage("fullName",faterId);  //设置选中的服务
            let token=getCookie();

            if(token){
               this.$router.push({path:'/affirmorder'})  //结算路由跳转
            }else{

              this.$store.commit("changeLoginPath","/affirmorder")
              this.$router.push({path:"/login"});
            }
          },

          isTrue(){
            if(this.isKongtiao){

            }
          },
          sortNumber (a,b) {
               return a - b
           },
  getData(id,cityId){
              // if(!id || !cityId){
              //     return;
              // }
            // Indicator.open('加载中');
            this.sendId=id;
            var url = common.apidomain+"/articleinfo/findlistserviceinfo?labelId="+id+"&areaId="+this.serveCityId;
            this.$http.get(url).then(res=>{
              Indicator.close();

              let data=res.data.result;

              this.dataPriceList=data;
              if(!this.dataPriceList){
                this.isKongtiao=false;
                return Toast("该服务已下架")
              }
              this.tagsList=[];
              let tas=data[0].serviceInfo.tags.split(",");
              tas.forEach((v)=>{
                let obj={};
                obj.name=v;
                obj.selector=false;
                this.tagsList.push(obj);
              });
              if(!data){
                return;
              }
//              价格计算 start
                var price=0;
                if(this.dataPriceList.length!==0){
                  var newArrPier=[],dataList=this.dataPriceList[0].serviceInfo;
                  if(dataList.isSecondPayment==="0"){  //一次付款；       1二次付款   0一次付款
                    price+=(dataList.price1-0)+(dataList.price2-0)*dataList.price2Discount
                  }else if(dataList.isSecondPayment==="1"){
                      price=dataList.price1;
                  }
                  this.sum=price
                }
          });
    //价格
      },
          getOpen(id){
            Indicator.open('加载中');
            let urL=common.apidomain+"/articleinfo/findinfobyflabel?id="+id;
            this.$http.get(urL).then(res=>{
              let data=res.data.result;
              this.dataInfo=data;
              Indicator.close();
            });
          },

          GetQueryString(){
                  let href=window.location.href,indexof
                this.secondId=href.substring(href.indexOf("id")+3,href.indexOf("&"));
                indexof=href.substring(href.indexOf("serveCityId")+3);
                this.serveCityId=indexof.substring(indexof.indexOf("=")+1)
          }
        },
        watch: {
              "isKongtiao":"isTrue"
        },
        created() {
          thFn(this);
          this.GetQueryString();
          //数据请求
//          debugger
          Indicator.open('加载中');
          // let id="002";
          let url=common.apidomain+'/articleinfo/findlabelbusinessbyflabel?id='+this.secondId;
          this.$http.get(url).then(res=>{
            let data=res.data.result;
            document.title=data.b;
            Indicator.close();
            this.$store.commit('increment',data.b);   //头部导航Title
            this.titleH=data.c;  //1级类标题
            this.householddata=data.beans;//一级分类
             this.fn1=function(id){
              for(var i=0;i<this.householddata.length;i++){
                      return;
              }
             }
          });
        }
    }
</script>

<style scoped lang="less">
.alert{
    width:560/50rem;
    height:500/50rem;
    background:#fff;
    position:fixed;
    top:50%;
    left:50%;
    border-radius: 4px;
    transform:translate(-50%,-50%);
    >.alert_box{
      >p{
        width:100%;
        text-align: right;
        float:right;
      }
      div{
        input{
          width:60%;
          float:right;
          padding:0;
          height:60/50rem;
          margin:0;
        }
      }
    }
  }

.container{
  background: #fff;

  padding:10px;
  padding-top: 0;
  margin:0 4%;
  margin-top:2%;
  .mui-table-view{
    display: flex;
    flex-wrap:wrap;
    &::after{
      width:0;
      height:0;
    }
    &::before{
      width:0;
      heihgt:0;
    }
    >.mui-table-view-cell{
      width:50%;
      border:none;
      padding:5px;
      padding-left:0;
      >a{
        display: block;
        margin:8/50rem;
        font-size: 28/50rem;
        color: #FFFFFF;

        background: #FBFBFB;
        color: #4A4A4A;
        border-radius: 5px;
        text-align: center;
        margin-left:0;
      }
      >.selector{
        background:rgba(235,83,18,1);
      }
      &::after{
        width:0;
        background-color:none;
      }
    }
  }
  >.price_title{
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
  border-bottom:1px solid #F4AA89;
  padding:20/50rem 0px;
  font-family: PingFangSC-Regular;
  font-size: 28/50rem;
  font-weight: normal;
  color: #4A4A4A;
  letter-spacing: 0;
}
.content_view{
  border:1px solid #E0E6ED;
}
 .mui-table-view{

  >.small_box{
  display: flex;
  width:100%;
    >ul{
      width:100%;
      font-family: PingFangSC-Regular;
      font-size: 28/50rem;
      color: #4A4A4A;
      letter-spacing: 0;
      .fittings_list{
        display: flex;
        /*border-bottom:1px solid #E0E6ED;*/
        >div{
          flex:1;
          border-right:1px solid #E0E6ED;
          border-bottom:1px solid #E0E6ED;
        }
        >.right{
          border-right:none;
        }
        >.center,.right{
          >p{
            color: #4A4A4A;
            font-family: PingFangSC-Regular;
            font-size: 28/50rem;
            height:60/50rem;
            line-height:60/50rem;
            text-align: center;
            background: #FBFBFB;
          }
          >p:last-of-type{
            background:#fff;
          }
        }
        >.left{
          padding-top:.5rem;
          text-align: center;
          background:#fff;
        }
        .medium{
          padding-top:0;
          display: flex;
          justify-content:center;
          align-items:Center;


          >div{
            /*position:relative;*/
            /*top:50%;*/
            /*-webkit-transform:translateY(-50%);*/
            /*left:0;*/
            >p{
              font-family: PingFangSC-Regular;
              font-size: 22/50rem;
              color: #EB5312;
              letter-spacing: 0;
            }
            del{
              font-size: 22/50rem;
            }
          }

        }
        .medium_table{
          width:8.5rem;
          >tr{
            border-bottom:1px solid #E0E6ED;
            td{
              width:50%;
              text-align: center;
              line-height: 60/50rem;
              border-right:1px solid #E0E6ED;
            }
            >td:nth-of-type(even){
              border-right:none;
            }
          }
          >tr:nth-of-type(odd){
            background: #FBFBFB;

          }
          >tr:last-of-type{
            border:none;
          }
        }
      }

      .fittings_list:last-of-type{
        border:none;
        >div{
          border-bottom:none;
        }
      }


    }
    /////////////////
  >.small_left{
    width:84/50rem;
    height:100%;
    font-size:22/50rem;
    text-align:center;
    background:#FEADB3;
    padding-top:.5rem;
    line-height: .6rem;
 }
  >.small_repair{
    border-radius: .3rem 0 0 0 ;
  }
  >.center_repair{
   background: #D8E8E7;
  }
  >.big_repair{
    background: #FFF5B5;
  }
 >.small_right{
      flex:0;
    >.fittings_name,.cost{
      float:left;
      font-family: PingFangSC-Regular;
      font-size: 28/50rem;
      color: #4A4A4A;
      letter-spacing: 0;
      height:60/50rem;
      width:50%;
      background:#FBFBFB;
      line-height:60/50rem;
      text-align: center;
    }
    >.name,.cost_price{
        background:#fff;

    }
 }
    >.title{
      height:60/50rem;
      line-height:60/50rem;
      background: #D8D8D8;
      width:100%;
      display: flex;
      font-family: PingFangSC-Regular;
      letter-spacing: 0;
      >p{
        flex:1;
        font-size: 28/50rem;
        color: #4a4a4a;
        text-align:center;
      }
    }
}
}
// 服务介绍
.box{
  width:100%;
  height:360/50rem;
  >img{
    display: block;
    width:100%;
    hieght:100%;
  }
  // background-image: linear-gradient(90deg, #6256C8 0%, #AC7EE9 100%);

}
.container{
  >.server_describe{
    padding-left:.4rem;
    > .serve_scope{
    padding:.4rem 0;
    font-family: PingFangSC-Regular;
    color: #4A4A4A;
    letter-spacing: 0;
  > span{
    color: #EB5312;;
  }
 }
 >span{
  font-family: PingFangSC-Regular;
  font-size: 24/50rem;
  color: #9B9B9B;
  letter-spacing: 0;
  line-height: 30/50rem;
 }
 >.flow_path{
    font-weight: normal;
    font-family: PingFangSC-Regular;
    font-size: 28/50rem;
    color: #4A4A4A;
    letter-spacing: 0;
 }
  }

}
 // 底部结算
 .footer{
  width:100%;
   position:fixed;
   bottom:0;
   left:0;
  height:98/50rem;
  text-align: right;
  line-height: 98/50rem;
  background: #FFFFFF;
  font-family: PingFangSC-Medium;
  font-size: 32/50rem;
  color: #EB5312;
  font-weight: 600;
  letter-spacing: 0;
  >.accounts_btn{
    height:100%;
    margin-left:.6rem;
    display: inline-block;
    background: #EB5312;
    width:200/50rem;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 32/50rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }
 }
#box{
  margin-bottom:200/50rem;;
  .altitude{
    border:none;
  }
  .selector{
    color:#fff;
  }
  .kongtiao{
    .fittings_list{
        border-bottom:1px solid rgba(0,0,0,.1);
      }
      .fittings_list:last-of-type{
        // border-bottom:none;
      }
      border-bottom:none;
  }
  .heightKong:nth-of-type(even){
    /*>.altitude{*/
      background:rgba(0,0,0,0.1);
  }
  .heightKong{
    .altitude{
      text-align: center;
    }
  }
}

  *&.fade-enter-active, &.fade-leave-active{
  transition: all .1s ease
  }

  &.fade-enter, &.fade-leave-active{
   transform:translateX(100px);
  }
</style>


