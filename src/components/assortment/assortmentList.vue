<template>
  <div id="box" ref="box" :class="{'animated_box':!retractAssortment.isShow}" :style="!retractAssortment.isShow&&isPhone?'margin-bottom:0':''" style=" min-height: 100vh;">
    <!--展开收起 start-->
      <div @click="openAssortment" class="container_item retract_item" v-if="retractAssortment.isShow||isShowInit">
        <p :class="isRevolve?'animated_arrowhead':'animated_arrowhead2'">{{retractAssortment.name}}</p>
      </div>
    <!--展开收起 start-->
<!--手机分类模块 start-->
  <!-- 1级分类 -->
    <assortment-item
      :title="titleH"
      :active="i0"
      :isShow="retractAssortment"
      :dataList="householddata"
      :selector="selectortype"
      :isPhone="isPhone"
      v-if="isPhone"

    >

    </assortment-item>
    <!-- 2级分类 -->
    <assortment-item
      :className="'second'"
      :title="title[0]"
      v-if="isPhone&&!!childrenType1"
      :active="i1"
      :isShow="retractAssortment"
      :dataList="childrenType1"
      :selectIndex="1"
      :selector="selectorTypeFun"
    >
    </assortment-item>
    <div class="container_item third"
    	
    	style="padding-top:.5rem"
         :class="isPhone&&!!childrenType2&&retractAssortment.isShow?'openBox':'retract'"
         v-if="isPhone&&!!childrenType2&&retractAssortment.isShow">
        <h3 class="assortment_title">{{title[1]}}</h3>
        <ul class="assortment_box" ref="assortment_box">
            <li v-for="(item,index) in childrenType2"
                :key="index" ref="icon_assortment" @click.stop="selectorTypeFun(index,item.a,item,2)" :class="{'selector_third':i2===index}" :style="item.isClass?'border-radius:2rem':''">
              <span style="font-weight: normal">
                {{item.b}}
              </span>
              <ul class="assortment_children" v-if="!!childrenType3&&i2===index"
                  :class="{'animated_item':!!childrenType3&&i2===index}">
                <li v-for="(item,index) in childrenType3" :key="index"
                    :class="{'selector_':i3==index}"
                    @click.stop="selectorTypeFun(index,item.a,item,3)">
                   <b></b>
                   <span class="assortment_children_item" style="font-weight: normal">{{item.b}}</span>
                  <!--颜色 start-->
                      <pigment-item v-if="!!childrenType4&&i3===index" :dataList="childrenType4" :selectorIndex="4" :selector="selectorTypeFun" :active="i4"></pigment-item>
                  <!--颜色 start-->
                </li>
              </ul>
            </li>
        </ul>
    </div>
<!--手机分类模块 end-->

<!--家电分类模块 start-->
  <assortment-item
  	style="padding-top:2.8rem;"
    :title="titleH"
    :active="i0"
    :isShow="retractAssortment"
    :dataList="householddata"
    :selector="selectortype"
    v-if="!isPhone"
  >
  </assortment-item>

  <!-- 2级分类 -->
  <div class="container_item third "  v-if="!isPhone&&!!childrenType1&&retractAssortment.isShow" :class="{'openBox':retractAssortment.isShow}" style="padding-top:.5rem">
    <h3 class="assortment_title" >{{title[0]}}</h3>
    <ul class="assortment_box">
      <li v-for="(item,index) in childrenType1" :key="index" @click.stop="selectorTypeFun(index,item.a,item,1)" class="househol_d"  :class="{'selector_third animated_item':i1===index}" :style="item.isClass&&!(isKongtiao&&flagIstarges&&i1===index&&childrenType1)?'border-radius:2rem':''">
        {{item.b}}
        <tags v-if="isKongtiao&&flagIstarges&&i1===index&&childrenType1" :tagsList="tagsList"></tags>
        <ul  class="assortment_children"
             v-if="!!childrenType2&&i1===index">
          <li v-for="(item,index) in childrenType2"
              :key="index" :class="{'selector_':i2==index}"
              @click.stop="selectorTypeFun(index,item.a,item,2)">
            <b></b>
            <span class="assortment_children_item">{{item.b}}</span>
            <!--颜色 start-->
              <pigment-item
                v-if="!!childrenType3&&i2===index"
                :dataList="childrenType3"
                :selectorIndex="3"
                :selector="selectorTypeFun"
                :active="i3">
              </pigment-item>
            <!--颜色 start-->
          </li>
        </ul>
      </li>
    </ul>
  </div>
    <!--<transition name="fade">-->
      <div class="container_item third tags_box" v-if="isKongtiao&&flagIstarges&&!childrenType1" style="padding-top:.5rem">
            <h3 class="assortment_title">具体故障</h3>
            <div class="tags_box_item">
              <h3>故障选择</h3>
              <!--<i class="icon_assortment" style="transform:translateY(-50%) rotate(180deg);"></i>-->
              <tags :tagsList="tagsList"></tags>
            </div>
      </div>
    <!--</transition>-->

<!--家电分类模块 end-->

  <!--
    需求：点击一级分类的某一个选项的时候，下面会接着显示二级分类，样式和结构都是一样的，一直循环下去，
    一直到json数据里面有d并且不为空的时候，就是最后的子节点，再显示高空费和价格配件表
   -->

    <!--高空费-->
    <div class="container" v-if="!!highAltitude">
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
            <li class="fittings_list heightKong" v-for="(item,index) in highAltitude">
              <div class="center altitude">
                {{item.floorStart}}~{{item.floorEnd}}
              </div>
              <div class="right altitude">
                  {{item.price}}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  <!-- 服务介绍 start-->
            <div ref="saverBox" style="animation-duration:.6s;margin-left:0;margin-right:0;padding:0;" class="container" v-if="!!dataInfo.content&&retractAssortment.isShow">
              <div class="server_describe" v-html="dataInfo.content" id="server_describe">
              </div>
            </div>
  <!-- 服务介绍 end-->
    <div class="container" v-show="isKongtiao" v-if="$route.params.id!='001'&&dataPriceList&&dataPriceList.length>0&&dataPriceList[0].serviceMountings.length!==0&&retractAssortment.isShow">
      <h3 class="classify_title price_title">配件价格表</h3>
      <!--<p class="describe">一口价：含一般配件，特殊配件需另外加收配件费</p>-->
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
            <li class="fittings_list">
              <div class="left medium">
                <div>
                  {{item.serviceInfo.name}} <br>
                  <del>({{item.serviceInfo.price2}}元)</del>
                  <p>(折扣价/{{item.serviceInfo.price2DiscountFee}}元)</p>
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
  <div class="footer" v-if="(isKongtiao||isAdd)&&sum">
    <div class="footer_pier">
      <span>
          	￥{{sum}}
      </span>
      <del v-if="(isKongtiao||isAdd)&&sum&&dataPriceList[0].serviceInfo.isSecondPayment!=='1'&&sum<price2Original" class="pristine_price">￥{{price2Original}}</del><br>
      <span class="pier">
          {{pirText}}
      </span>
    </div>
    <a class="accounts_btn" href="javascript:;" @click="add(tagsList)">下一步</a>
  </div>
    <div class="footer lose" v-if="!((isKongtiao||isAdd)&&sum)&&retractAssortment.isShow">
    <div class="footer_pier">
      <span>
          ￥0
      </span><del v-if="(isKongtiao||isAdd)&&sum&&dataPriceList[0].serviceInfo.isSecondPayment!=='1'" class="pristine_price">￥0</del><br>
    </div>
    <a class="accounts_btn" href="javascript:;">下一步</a>
  </div>
</div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import {setCookie,getCookie} from "@/js/cookie"
//  import common from "@/js/baseHttp"
  import {Toast} from "mint-ui"
  import { Indicator } from 'mint-ui';
  import {getSession,setSession,setSessionUserInfo,removerStorage,getLocalStorage,setLocalStorage} from "@/js/session"
  import {priceCount} from "@/js/priceCountFun"
  import tags from "./tags"
  import {thFn,selectorFun} from "./js/selector"
  import assortmentItem from "./components/assortmentItem"
  import pigmentItem from "./components/pigmentItem"
  export default{
        components:{
          tags,
          pigmentItem,
          assortmentItem
        },
        data(){
            return{
              isPhone:this.$route.params.id==="003",
              retractAssortment:{ //is 展开 收起；
                isShow:false
              },
              pirText:"",
              isShowInit:false,
              amount:"",
              price2Original:"",
              priceText:this.$store.state.priceText,
              tagsList:[],
              isAdd:false,
              flagIstarges:false,
              i0:"-1",
              title:[],
              highAltitude:'',//高空费；
              isHeight:false,
                  //选中的一级分类
              styleTypeList:'',
              childrenType1:'',
              isRevolve:false,
              childrenType2:'',
              isIconArray:[],
              childrenType3:'',
              childrenType4:'',
              i1:"-1",
              i2:"-1",
              i3:"-1",
              i4:"-1",
              childrenType5:'',
              dataInfo:"",
              sum:0,
              isKongtiao:"",
              // ind:"-1",
              titleH:"",            //一级分类标题
              isPriceList:false,    //空调价格表
              querstion:"-1",       //问题类型显示
              introduce:false,      //服务及价格显示隐藏
              householddata:[],     //一及分类数据列表
              dataPriceList:[],
              jsObjData:'',         //结算后最后一个对象
              faterKey:'',
              sendId:''
            }
        },
        methods:{
          isChildrenType(index){
            for(let i=index;i<20;i++){
              this.$data["childrenType" +i]="";
            }
          },
          selectortype(index,id,key){
            selectorFun.selectorType.call(this,index,id,key);
            this.flagIstarges=false;
            if(this.isRevolve&&!this.isPhone) this.isRevolve=!this.isRevolve;
            this.retractAssortment["name"]=key.b;
            !this.isPhone?this.retractAssortment["isShow"]=true:this.retractAssortment["name"] = key.b;
            this.isIconArray=[];
            if(key.beans){
              key.beans.forEach((v,i)=>{
                !v.beans?this.$set(v,"isClass",true):this.$set(v,"isClass",false);
              })
            }
          },
//   展开 收起 start
          openAssortment(){
            this.i3="-1";
            this.i2="-1";
            this.i4="-1";
//            控制 头部 nav 收起 展开的 动效；
            this.isRevolve=!this.isRevolve;
            this.isKongtiao=!this.isKongtiao;
//            收起展开；
            this.isShowInit=!this.isShowInit;
            //   收起展开2；
            this.retractAssortment["isShow"]=!this.retractAssortment["isShow"];
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          },

   //   展开 收起 end
          /*
          * index 索引
          * id    item.a
          * key   下一级对象
          * y      执行的第几级分类；
          * */

          selectorTypeFun(index,id,key,y){
            //判断箭头是否收起；
            console.log(index);
            if(this.isRevolve) this.isRevolve=!this.isRevolve;
            const removeIsIconArray=()=>{
              this.isIconArray.forEach((v,i)=>{
                this.$set(this.isIconArray,i,false)
              });
                this.$set(this.isIconArray,index,true)
            };
            //判断是不是手机分类 并且是不是第三级分类
            if(this.isPhone&&y===1){    //第3级分类
              //让第四级分类置顶  并且收起
              document.body.scrollTop = document.documentElement.scrollTop = 0;
              //设置第三级分类收起后的标题
              this.retractAssortment["name"]=key.b;
              this.retractAssortment["isShow"]=!this.retractAssortment["isShow"];

//              this.isRevolve=!this.isRevolve;

            //  每次初始化数组  该数组存储的是布尔值 作为第四级分类箭头的动画 表达式
              this.isIconArray=[];
              //在点击第三级分类的时候，循环出第四级分类的beans 的length 根据beans长度 push isIconArray 数组初始化布尔值
              key.beans.forEach((v,i)=>{
                this.isIconArray.push(false);
                //当每次循环的时候； 判断第四级分类是否是末级 ； 如果是末级 则不显示箭头 和改变边框
                if(!v.beans){
                  this.$nextTick(()=>{
                    //设置true 代表不显示箭头 边框也不改变
                    this.$set(v,"isClass",true)
                  })
                }else{
                  this.$set(v,"isClass",false)
                }
              });
            }else if(this.isPhone&&y===2){   //第4级分类
//                this.retractAssortment["isShow"]=true;   //收起
//               点击每一项的时候 把所有的 箭头向上  isIconArray  每项设置  false
                removeIsIconArray();
//                把当前选择的那一项设置true 箭头向下 展开
            }else if(!this.isPhone&&y===1){       //家电分类 第三级分类
                removeIsIconArray();
            }
//            i1、i2、i3、...对应的是选中的每一个item 设置selector style 的
            this.$data["i" + y]=index;
            //每次点击上一级分类的时候 传递 当前的 是第几级分类 把当前之后的所有  i1、i2、i3、...都等于-1初始化；
            for(let i=y+1;i<20;i++){
              this.$data["i"+i]="-1"
                }
//               flagIstarges是判断tars 标签的；
            this.flagIstarges=false;
            this.isKongtiao=false;
            //此方法是当点击 上一级分类的时候 初始化 它之后所有分类的数据；
            this.isChildrenType(y+1);
//           判断是否是 末子级节点
            this.isNodes(id,key,y+1);

//            判断是不是该分类只有一个分类 如果只有一个 就直接展开 ；
            if(!!key.beans&&key.beans.length===1&&y<2)this.selectorTypeFun(0,key.beans[0].a,key.beans[0],2);
          },
 /*
 * 点击分类 事件结束 end
 *
 *
 *
 * */
//     下一步  加入服务 start
          add(d){
            this.$store.commit("changeAddServerPath",this.$route.path);
            if(this.flagIstarges){
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
            }
            if(!this.sendId)return;
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
            if(this.$store.state.paths==="o"){
              removerStorage("fullName");
              this.$store.commit("changeUserInfoDiscountId","");
              this.$store.commit("changeIsSuperposition",1);
              this.$store.commit("changeDiscountFacevalue",0);
              this.$store.commit("changeCouponText","请选择优惠券");
            }
            this.$store.commit("changePaths","o");
            let tagsNameArr=[];
            this.tagsList.forEach(v=>{
              if(v.selector){
                tagsNameArr.push(v.name)
              }
            });
            let token=getCookie();
//      重新计算折扣后价格； 新版本  start
             let areaId=getSession()[0].id,
                  changLoginPathMessage=`/affirmorder?labelId=${this.sendId}&tagsNameArr=${tagsNameArr}&farterId=${this.$route.params.id}`;
                  Indicator.open({spinnerType: 'fading-circle'});
                   this.$store.commit("changeLoginPath",changLoginPathMessage);
             if(token){
                 this.$http.get(`${this.$common.apidomain}/order/joinService?areaId=${areaId}&labelId=${this.sendId}&token=${token}`).then(res=>{
                     let data=res.data;
                     Indicator.close();
                     if(data.code==="0000"){
                       let faterId=data.result[0].serviceInfo;
                       faterId.tagsName=tagsNameArr;
                       faterId.size=1;
                       faterId.farterId=this.$route.params.id;  //一级分类id
                       setLocalStorage("fullName",faterId);    //设置选中的服务
                       this.$store.state.websiteBusiness?this.$router.push({path:this.$store.state.websiteBusiness}):this.$router.push({path:'/affirmorder'});
                     }else{
                       this.$Toast(data.error);
                     }
                 });
             }else{
               Indicator.close();
               this.$store.commit("changeLoginPath",changLoginPathMessage);
               setTimeout(()=>{
                 this.$router.push({path:"/login"});
               },500)
             }
          },
//     下一步  加入服务 end
//          获取价格数据 start
      getData(id){
            this.sendId=id;
            let areaId=getSession()[0].id,
                url = `${common.apidomain}/articleinfo/findlistserviceinfo?labelId=${id}&areaId=${areaId}&token=${getCookie()?getCookie():''}`;
            this.$http.get(url).then(res=>{
            Indicator.close();
            let data=res.data.result;
            if(res.data.code==="0000"&&data){
                this.dataPriceList=data;
              this.price2Original=data[0].serviceInfo.price2;
            }else{
                this.isKongtiao=false;
                this.sum=0;
                return Toast("该服务已售罄");
              }
            let priceStr=(data[0].serviceInfo.price2-data[0].serviceInfo.price2DiscountFee).toString();
            if(priceStr.indexOf(".")!==-1){
                this.amount=priceStr.substring(0,priceStr.indexOf(".")+3);
              }else{
                this.amount=priceStr;
              }
              if(!priceStr){this.amount=0}
              this.tagsList=[];
            if(data[0].serviceInfo.tags){
              let tas=data[0].serviceInfo.tags.split(",");
              tas.forEach((v)=>{
                let obj={};
                obj.name=v;
                obj.selector=false;
                this.tagsList.push(obj);
              });
            }
              this.flagIstarges=false;
              this.tagsList.forEach(v=>{
                if(v.name){
                  this.flagIstarges=true;
                }
              });
              if(!data)return;
//              价格计算 start
              priceCount(this);
              });
          //价格
        //          获取价格数据 end
      },
//   服务介绍  start
            getOpen(id){
              Indicator.open('加载中');
              let urL=common.apidomain+"/articleinfo/findinfobyflabel?id="+id;
              this.$http.get(urL).then(res=>{
                Indicator.close();
                let data=res.data.result;
                if(res.data.code==="0000"&&data){
                  this.dataInfo=data;
                }else{
                  this.dataInfo="";
                }
              });
            },
//    服务介绍  end
          isNodes(id,key,index){
//            如果是末子级 就获取数据 获取价格数据；
            if(key.d&&key.d!=""){
              this.getData(id);
              this.isKongtiao=true;
              this.jsObjData=key;
              this.isAddFun(key);
              return;
            }
            if( key==undefined || key=="" || key.d || key.beans==""){
              this.isKongtiao=false;
              return  Toast("暂未开通该服务");
            }
            this.$data["childrenType"+index]=key.beans;
            this.title.push(key.c)
          },
          isAddFun(key){
            this.isAdd=false;
            if(key.d==='0')this.isAdd=true;
          },
        },
        created() {
          for(let i=1;i<30;i++){
            this.$data["i"+i]="-1";
          }

//        判断是否含有城市，没有就重新获取 获取城市区域
          if(getSession().length<=0){
            this.$commonJs.getPosition.call(this);
          }
          thFn(this);
          //数据请求
          Indicator.open('加载中');
// 分类数据 start
          let id=this.$route.params.id;
          let url=common.apidomain+'/articleinfo/findlabelbusinessbyflabel?id='+id;
          this.$http.get(url).then(res=>{
            const data=res.data;
            if(data.code==="0000"){
                let data=res.data.result;
                document.title=data.b;
                Indicator.close();
                this.$store.commit('increment',data.b);   //头部导航Title
                this.titleH=data.c;  //1级类标题
                this.householddata=data.beans;//一级分类
    //            按照id 分类展开 分类列表 start ；
                let id=this.$route.query.id;
                    if(!this.$route.query.id&&this.$route.params.id==="003")id=`${this.$route.params.id}001`;
                 const promise =data=>{
                   return new Promise( (resolve, reject) =>{
                       resolve(data) // pending ——> resolved 参数将传递给对应的回调方法
                   });
                 };
                const exp =(res)=>{
                  return !res.beans||res.a.length===id.length?false:res.beans;
                };
                const forData=(res,subIndex,selectorIndex=null)=>{
                    if(id.length<=3)return;                       //判断id 的length 是否小于等于3  如果小于等于3 则停止执行；
                    for(let i=0;i<res.length;i++){
                      if(res[i].a.indexOf(id.substring(0,subIndex))!==-1){
//                        let selectorFun=`selectortype${selectorIndex}`;
                        !!selectorIndex? this["selectorTypeFun"](i,res[i].a,res[i],selectorIndex):this.selectortype(i,res[i].a,res[i]);
                        return exp(res[i])
                      }
                    }
                };
                if(id){
                       promise(data.beans).then(res=>{
                      if(res)return forData(res,6)
                    }).then(res=>{
                      if(res)return forData(res,9,1)
                    }).then(res=>{
                      if(res)return forData(res,12,2)
                    }).then(res=>{
                      if(res)return forData(res,15,3)
                    }).then(res=>{
                      if(res)return forData(res,18,4)
                    }).then(res=>{
                      if(res) return forData(res,21,5)
                    }).then(res=>{
                      if(res)return forData(res,24,6)
                    }).then(res=>{
                      if(res)return forData(res,27,7)
                    })
                }
            }else{
              this.$Toast(data.error);
            }
            // 分类数据 end
//按照id 分类展开 分类列表 end
          });
//          setTimeout(()=>{

//            console.log(document.body.scrollHeight)
//          },1000)

//          this.

        },
    watch:{

    }
    }
</script>
<style>
  #server_describe{
    width:100%;
  }
  #server_describe img{
    width: 100%;
  }
</style>
<style scoped lang="less">
  @import "../../assets/style/rem.less";
  .box{
      height:auto;
  }
  #box{
    overflow: hidden;

    background:#fff;
    .container_item{
      width:100%;
      text-align: center;
      padding-top:1.5rem;
      padding-bottom:1rem;
      >.assortment_title{
        font-family:PingFangSC-Light;
        font-size:40/50rem;
        color:#888888;
        letter-spacing:0px;
        font-weight: normal;
        line-height: 2rem;
      }
      >.assortment_box{
        overflow: hidden;
        padding:0 .3rem;
        >li{
          border:1px solid #c7c7cc;
          width:30%;
          color:#000;
          font-size:32/50rem;
          margin-top:.5rem;
          border-radius:100/50rem;
          float:left;
          margin-left:18/50rem;
          height:96/50rem;
          line-height: 96/50rem;
        }
        >.selector{
          background:#ea5413;
          color:#fff;
        }
      }
    }
    .tags_box{
        >.tags_box_item{
            border:2px solid #ea5413;
            margin:0 .5rem;
            border-radius: 10px;
            margin-top:.5rem;
            padding-bottom:.2rem;
            position:relative;
          >.icon_assortment{
            content:"";
            right:1rem;
            /*transform:;*/
            transform-origin: center;
            top:1rem;
            transform:translateY(-50%) rotate(0deg);
            position:absolute;
            background:url(../../assets/images/openButtom.png) center center no-repeat;
            background-size:100% 100%;
            display: block;
            width:25/50rem;
            height: 16/50rem;
          }
          >h3{
            font-family:PingFangSC-Medium;
            font-size:32/50rem;
            color:#000000;
            font-weight: normal;
            line-height: 2em;
            margin-top:.8rem;
          }
        }
    }
    /*收起 item start*/
    >.retract_item{
      padding:0;
      border-bottom:10/50rem solid #eef3f4;
      line-height: 2.2rem;
      padding-left:34/50rem;
      font-family:PingFangSC-Semibold;
      font-size:36/50rem;
      color:#ea5413;
      text-align:left;
      >p{
        position:relative;
        font-family:PingFangSC-Semibold;
        font-size:36/50rem;
        color:#ea5413;
        text-align:left;
       &::after{
         content:"";
         right:1rem;
         top:50%;
         transform:translateY(-50%);
         position:absolute;
         background:url(../../assets/images/openButtom.png) center center no-repeat;
         background-size:100% 100%;
         display: block;
         width:25/50rem;
         height: 16/50rem;
       }
      }
      >.animated_arrowhead{
        &::after{
          animation:Myrevolve2 .5s ease forwards;
          transform-origin:center;
        }
      }
      >.animated_arrowhead2{
          &::after{
            animation:Myrevolve .5s ease forwards;
            transform-origin:center;
          }
      }
    }
    /*收起 item end*/
    >.second{
      >.assortment_box{
        >li{
          width:46%;
        }
      }
    }
    >.third{
      >.assortment_box{
        padding-right:1rem;
        >li{
          width:100%;
          font-family:PingFangSC-Medium;
          font-size:32/50rem;
          color:#000;
          height:auto;
          position:relative;
          >.icon_assortment{
            content:"";
            right:1rem;
            transform-origin: center;
            top:1rem;
            transform:translateY(-50%) rotate(0deg);
            position:absolute;
            background:url(../../assets/images/openButtom.png) center center no-repeat;
            background-size:100% 100%;
            display: block;
            width:25/50rem;
            height: 16/50rem;
          }
          >.assortment_children{
            padding-bottom:.8rem;
            >li{
              text-align: left;
              position:relative;
              >b{
                position:absolute;
                left:.8rem;
                width: 46/50rem;
                height: 46/50rem;
                top:24/50rem;
                background:url(../../assets/images/notselector.png) center center no-repeat;
                background-size:100% 100%;
              }
/*产品价格 start*/
              >.product_price{
                position:absolute;
                right:.8rem;
                top:0;
                >del{
                  font-family:PingFangSC-Light;
                  font-size:30/50rem;
                  color:#bababa;
                  text-align:left;
                }
                >span{
                  ont-family:PingFangSC-Medium;
                  font-size:30/50rem;
                  color:#4a4a4a;
                  text-align:left;
                }
              }
              >.assortment_children_item{
                display: block;
                padding-left:2rem;
                color:#4a4a4a;
                font-family:PingFangSC-Light;
                font-size:30/50rem;
              }
/*产品价格 end*/
            }
            >.selector_{
              >b{
                background:url(../../assets/images/selectorsingle.png) center center no-repeat;
                background-size:100% 100%;
              }
            }
          }
        }
      }
    }
    >.third {
      >.assortment_box{
        >.selector_third{
          overflow: hidden;
          border-radius: 18/50rem;
          border:4/50rem solid #ea5413;
        }
        .animated_item{
          animation: myfirst 1s ease-in-out;
        }
      }
    }
  }
  .rotate_icon{
    transform:translateY(-50%) rotate(180deg);
  }
  .rotate_icon2{
    animation: Myrevolve2 .4s ease forwards;
  }

  .openBox{
    overflow: hidden;
    animation:myBoxOpen 6s ease;
  }
  .ani{    //收起 ；
    animation:myRetract .7s ease-out;
  }

  @keyframes myBoxOpen{
    0% {max-height:0rem}
    100%{max-height:250rem}
  }
  @keyframes myRetract{
    0% {
        transform:translateY(1000px);
    }
    100%{
      transform:translateY(0px);
    }
  }
  @keyframes myfirst
  {
    0% {max-height:98/50rem}
    100%{max-height:50rem}
  }
  @keyframes myBox{
    0%{
      max-height:98/50rem
    }
    100%{
      max-height:150rem
    }
  }
  @keyframes Myrevolve{
    0%{
      transform:rotate(180deg);
    }
    100%{
      transform:rotate(0deg);
    }
  }
  @keyframes Myrevolve2{
    0%{
      transform:rotate(0deg);
    }
    100%{
      transform:rotate(180deg);
    }
  }

  #box.animated_box{
    animation:myBox 2s ease;
    /*height:100vh;*/
  }
  /*#box.vh{*/
    /*background:#FFF;*/
    /*height:100vh;*/
    /*margin-bottom:0;*/
  /*}*/

  .service_totalCredit_amount{
    position:fixed;
    left:32/50rem;
    bottom:.5rem;
    z-index: 999;
    font-family: PingFangSC-Regular;
    font-size:24/50rem;
    color:#9B9B9B;
    font-weight: normal;
  }
  .service_totalCredit_amounttwo{
    position:fixed;
    right:9.6rem;
    z-index: 999;
    font-family: PingFangSC-Regular;
    font-size:26/50rem;
    color:#9B9B9B;
    font-weight: normal;
  }
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
  >img{
    display: block;
    width:100%;
  }
}
.container{
  >.server_describe{
    /*padding-left:.4rem;*/
    text-align: center;
  }
}
 // 底部结算
 .footer{
  width:100%;
  position:fixed;
  bottom:0;
   box-shadow:2/50rem 0 8/50rem 6/50rem rgba(221,221,221,0.50);;
   left:0;
  background: #FFFFFF;
  font-family: PingFangSC-Medium;
  font-size: 32/50rem;
  color: #EB5312;
   padding:18/50rem 30/50rem;
  >.accounts_btn{
    height:100%;
    float:right;
    border-radius:2rem;
    display: inline-block;
    background:url(../../assets/images/button.png) center center no-repeat;
    background-size:100% 100%;
    width:420/50rem;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 34/50rem;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height:90/50rem;
  }
  >.footer_pier{
    float:left;
    >span{
      font-family:PingFangSC-Semibold;
      font-size:38/50rem;
      color:#ea5413;
      text-align:left;
    }
    >.pristine_price{
      font-family:PingFangSC-Medium;
      font-size:30/50rem;
      color:#bababa;
      text-align:left
    }
    >.pier{
      height:auto;
      font-family:PingFangSC-Medium;
      color:#4a4a4a;
      font-size:24/50rem;
      text-align:left;
    }
  }
 }
 .footer.lose{
   >.accounts_btn{
     background:#cfcfcf;
   }
   >.footer_pier{
     margin-top:.5rem;
     >span{
       color:#cfcfcf;
     }

   }
 }
#box{
  .assortment_box{
    /*padding-bottom:.5rem;*/
  }
  margin-bottom:2.5rem;;
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
      border-bottom:none;
  }
  .heightKong:nth-of-type(even){
      background:rgba(0,0,0,0.1);
  }
  .heightKong{
    .altitude{
      text-align: center;
    }
  }
}

</style>


