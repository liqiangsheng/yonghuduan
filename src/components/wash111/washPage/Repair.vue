<template>
<!-- /** 家具维修 维修类型 -->
  <div id="repair">
      <div id="repair_left">
             <ul id="repair_list">
                <li v-for="(item,index) in repair_left_list" @click="repair_listActive1(index,item.beans,item.a,item)">
                    <span :class="{repair_listActive1:repair_list_index1 == index}"></span>
                    <b :class="{repair_listActive:repair_list_index == index}">{{item.b}}</b>
                    <i :class="{repair_listActive2:(item.num > 0 )&&(item.selector) }"></i>
                </li>
             </ul>
      </div>
      <div id="repaire_right">
            <ul id="repaire_right_list" >
                <li v-for="(item,index2) in repair_right_list1"
                          :key="index2"
                    @dblclick="dbClick=repair_listActive3(item,index2)"
                @click="danClick=repair_listActive2(item,index2)"
                :class="{repair_rightActive1:item.selector}">
                    {{item.b}}
                </li>
             </ul>
      </div>
  </div>
</template>
<script>
import {getSession,setSession,removerStorage,getLocalStorage,setLocalStorage} from "@/js/session"
import {setCookie,getCookie} from "@/js/cookie"
export default {
  props:["numberJian","isEmpty","choice"],
  data(){
      return{
         danClick:false,
        dbClick:false,
          repair_left_list:[],//维修主页面左边的列表
          repair_list_index: 0,//维修主页面左边的列表里面b的active
          repair_list_index1: 0,//维修主页面左边的列表里面span的active
          repair_right_list1:[],//维修主页面右边的列表（对应左边）
          repair_right_index:0, //右边的列表下标
          repair_rightStyle:0,
          repair_right_arrey:[], //保存去详情页面的数据
          repair_right_Show:false,
          repair_list_index2:0, // 控制小圆点是否亮
          carts:[],
      }
  },
  watch:{//监听到0的数据。修改背景框
      "numberJian":function(oldData,newData){
        this.repair_left_list.forEach((item,index)=>{
             item.beans.forEach((item1,index1)=>{
               if(oldData.labelId === item1.a){
                 item1.selector = false;
//                 this.$set(this.repair_right_list1[index1],"selector",false);
               }
             })
        })
      },
      "isEmpty":function(newBoolean,oldBoolean){
              this.repair_left_list.forEach((item,index)=>{
                item.beans.forEach((item1,index1)=>{
                  if(newBoolean == true){
                    item1.selector = false;
                  }
                })
              })

      },
    "choice":function(newchoice,oldchoice){
        if(newchoice == 0){
          this.repair_left_list[this.repair_list_index1].num = -1;
        }
    },

  },
  mounted(){

  },
  updated(){
  },
  created(){
    //获取数据

    let url=this.$common.apidomain+'/articleinfo/findlabelbusinessbyflabel?id='+this.$route.params.id;
      this.$http.get(url).then(res=>{

      this.repair_left_list = res.data.result.beans;
      document.title=res.data.result.b
      this.repair_left_list.forEach((v,i)=>{
      this.repair_left_list[i].selector=false;//给对象加个selector。
      this.repair_left_list[i].num=0;//给对象加个num。
// 购物车点击点击了添加服务
        this.repair_left_list.forEach((item,index)=>{
          item.beans.forEach((item1,index1)=>{
            this.carts.forEach((vItem,Iindex)=>{

              if(vItem.labelId == item1.a){
                    this.$set(item.beans[index1],"selector",true)
              }
            })
          })
        })

      })

      let id=!!this.$route.query.id?this.$route.query.id:this.repair_listActive1(0,res.data.result.beans[0].beans)//初始化显示\
      const promise=data=>{
          return new Promise((resolve,reject)=>{
            resolve(data);
          })
      };
      const exp=res=>{
        return !res.beans||res.a.length===id.length?false:res.beans;
      };
      const forData=(res,subIndex,callback,isFirst=true)=>{
          if(id.length<=3)return;
          for(let i=0;i<res.length;i++){
            if(res[i].a.indexOf(id.substring(0,subIndex))!==-1){
              isFirst?this[callback](i,res[i].beans):this[callback](res[i],i);
              return exp(res[i])
            }
          }
      };
      if(id){
        promise(res.data.result.beans).then(res=>{
          if(res)return forData(res,6,"repair_listActive1");
        }).then(res=>{
          if(res)return forData(res,9,"repair_listActive2",false);
        })
      }
    });
    console.log(this.$store.state.paths)
    if(this.$store.state.paths === "o"){
      removerStorage("fullName");
    }else if(this.$store.state.paths === "n"){
      this.carts = getLocalStorage("fullName");
    }

  },
  methods:{
    repair_listActive3(item,index2){
      this.dbClick = true;
      this.danClick = false;
//      this.$Toast("双击")
      return this.$set(this.repair_right_list1[index2],"selector",false);
    },

    //点击左侧的li列表
    repair_listActive1(index,beans,id,item){
       this.repair_list_index =index;
       this.repair_list_index1 =index;
       this.repair_right_list1=beans;
       /*-----*/
       this.repair_left_list[index].selector=true
       /*-----*/
       this.$store.commit("changeSaverId",id)
    },
    repair_listActive2(i,index){
      this.dbClick = false;
      this.danClick = true;
      //跟新对象内的数组数据

       this.$set(this.repair_right_list1[index],"selector",!this.repair_right_list1[index].selector);
     /*---------*/

       this.repair_left_list[this.repair_list_index1].num = 0
       for(let i=0;i<this.repair_right_list1.length;i++){

          if(this.repair_right_list1[i].selector){
           this.repair_left_list[this.repair_list_index1].num++
          }
        }

      /*---------*/
      //获取价格的服务费请求数据
        let areaId=getSession()[0].id,
        url2= `${this.$common.apidomain}/articleinfo/findlistserviceinfo?labelId=${i.a}&areaId=${areaId}&token=${getCookie()?getCookie():''}`;
        this.$http.get(url2).then(res=>{
          if(!res.data.result){
            i.selector = false;
            this.repair_left_list[this.repair_list_index1].num -= 1;
            this.$Toast("服务已售罄。");
            return
          }else{
                this.obj1 = res.data.result.map((i,index1)=>{
                  if(this.repair_right_list1[index].selector == true){
                    i.serviceInfo.size = 1;

                  }else{
                    i.serviceInfo.size = 0;
                  }
                  return i
                })
            console.log(this.obj1)
              //去除背景框详情里面的商品小于0
                if(this.repair_right_list1[index].selector == true){
                  this. repair_right_arrey.push(this.obj1[0])
                }else if(this.repair_right_list1[index].selector == false){
                  this. repair_right_arrey.splice(index,1)
                }
                this.$emit("data",this.obj1[0],this.repair_right_list1[index].selector,index)

            }
        })

    }
  }
}
</script>
<style scoped lang="less">
 #repair{
   width: 100%;
   position: absolute;
   left: 0;
   right: 0;
   top:163/50rem;
   bottom: 126/50rem;
   background: #FFFFFF;
 }
 #repair_left{
   width: 215/50rem;
   height: 100%;
   float: left;
 }
 #repair_list{
   width: 100%;
   height: 100%;
   li{
     width: 100%;
     height: 42/50rem;
     margin-bottom: 70/50rem;
     position: relative;
     span{
       display: inline-block;
       width: 8/50rem;
       height: 30/50rem;
       background:#c7c7cc;
       position: absolute;
       left: 20/50rem;
       top:6/50rem;
     }
     b{
      display: inline-block;
      width:180/50rem;
      height: 42/50rem;
      font-family:PingFangSC-Medium;
      font-size:30/50rem;
      color:#000000;
      letter-spacing:0px;
      text-align:left;
      position: absolute;
      left: 35/50rem;
      font-weight: 100;
     }
     i{
       display: block;
       position: absolute;
       right: -10/50rem;
       top: 0;
       transform:translateY(5/50rem);
       width: 10/50rem;
       height: 10/50rem;
       border-radius: 100%;
       background: #ffffff;
       display: none;
     }
     div{
        background:#ea5413;
        width:40/50rem;
        height:40/50rem;
        border-radius:50%;
        position: absolute;
        top: -5/50rem;
        right:-30/50rem;
        line-height: 40/50rem;
        text-align: center;
        color: #ffffff;
        font-size: 8/50rem;
        /* display: none;*/

     }
     .repair_listActive{
      color: #ea5413;
    }
     .repair_listActive1{
      background: #ea5413;
    }
    .repair_listActive2{
       background: #ffffff;
       display: block;
    }
    .repair_rightActive2{
      display: block;
    }
   }
   li:nth-child(1){
   	margin-top:70/50rem ;
   }
 }
  #repaire_right{
   width: 535/50rem;
   height: 100%;
   float: right;
   #repaire_right_list{
     width: 100%;
     height: 100%;
     overflow: auto;
     -webkit-overflow-scrolling: touch;
     li{
      border:3/50rem solid #c7c7cc;
      border-radius:86/50rem;
      width:447/50rem;
       font-size: 30/50rem;
      height:85/50rem;
      margin:17/50rem 0 0 51/50rem;
      line-height: 85/50rem;
      text-align: center;
      box-sizing:border-box;
    }
    .repair_rightActive1{
      border: 3/50rem solid #ea5413;
    }
   }
 }


</style>
