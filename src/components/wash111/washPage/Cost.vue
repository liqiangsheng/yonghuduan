<template>
   <div id="cost">
      <div id="cost1" >
       <div class="costBox">
            <ul id="cost_list" ref="dom">
              <li v-for="(item,index) in costList"
              @click="cost_listClick(item.beans,index)"
              :class="{cost_listActive:cost_listIndex==index}">{{item.b}}</li>
          </ul>
       </div>

       <ul class="costBox1">
          <li v-for="(item1,index1) in costTable"
           @click="costBoxClick(item1,index1)"
           :class="{liAction:cost_listIndex1 == index1}">{{item1.b}}</li>
       </ul>
       <div id="cost_box">
          <p>家具安装维修</p>
          <p>服务费及配件价格表</p>
          <p>具体以师傅检修后确认维修金额</p>
          <p>如多个维修项目，服务费只收取最高的一项</p>
       </div>
       <ul id="ulList">
         <li>
            <p style="text-align: center">维修内容</p>
            <p>配件价格</p>
            <p>服务费</p>
          </li>
            <div  v-for="(item2,index2) in moneyOne">
                 <p v-for="(item,index) in item2.serviceMountings=item2.serviceMountings.length>0?item2.serviceMountings:Mounting">
                     <span>{{item.name?item.name:"其他"}}</span>
                     <span>{{item.price?item.price:0}}</span>
                     <span>{{item2.serviceInfo.price2}}</span>
                 </p>
            </div>



       </ul>
      </div>
   </div>
</template>
<script>
import {setCookie,getCookie} from "@/js/cookie"
//import common from "@/js/baseHttp"
import {getSession,setSession,removerStorage,getLocalStorage,setLocalStorage} from "@/js/session"
export default {
  data(){
      return{
        Mounting :[{name:"其他",price:"0"}],
         costList:[], //费用说明列表
         cost_listIndex:0, //选中的初始化下标第一级
         cost_listIndex1:0, //选中的初始化下标第二级
         costTable:[] ,//table里面的服务小点
         moneyOne:[],  //服务费
      }
  },
  mounted(){

  },
  updata(){
      console.log(this.costList)
  },
  created(){
      //获取数据
      let url=this.$common.apidomain+'/articleinfo/findlabelbusinessbyflabel?id='+this.$route.params.id;
      this.$http.get(url).then(res=>{
          this.costList = res.data.result.beans;
          this.cost_listClick(res.data.result.beans[0].beans,0);
           console.log(res.data.result.beans)
        if(res.data.result.beans.length <= 4){
             this.$refs.dom.style.width = "100%";
        }else if(res.data.result.beans.length > 4 &&res.data.result.beans.length <=7){
          this.$refs.dom.style.width = "150%";
         }else if(res.data.result.beans.length > 8 &&res.data.result.beans.length <=10){
           this.$refs.dom.style.width = "200%";
        }else if(res.data.result.beans.length > 11 &&res.data.result.beans.length <=13){
          this.$refs.dom.style.width = "250%";
        }
      })
  },
  methods:{
    cost_listClick(item,index){//第一级
      this.cost_listIndex = index;
      this.costTable =item;
      this.costBoxClick(this.costTable[0],0)
    },
    costBoxClick(item1,index1){ //第二级
       this.cost_listIndex1 = index1;
       let areaId=getSession()[0].id,
        url2= `${this.$common.apidomain}/articleinfo/findlistserviceinfo?labelId=${item1.a}&areaId=${areaId}&token=${getCookie()?getCookie():''}`;
        this.$http.get(url2).then(res=>{
          if(!res.data.result){
            return  this.$Toast("服务已售罄。");
          }else{
            this.moneyOne=[];
            this.moneyOne.push(res.data.result[0]);
          }


        })

    }
  }
}
</script>
<style scoped lang="less">
  body {overflow-x: hidden}
 #cost{
   width: 750/50rem;
   position: absolute;
   background: #FFFFFF;
   left: 0;
   right: 0;
   top:163/50rem;
   bottom: 126/50rem;
   overflow: auto;
    #cost1{
      width:100%;
      min-height: 105vh;
      background: #FFFFFF;
      overflow-x: hidden;
      overflow-y: auto;
      .costBox{
        width: 100%;
        box-shadow: 2/50rem 0/50rem 8/50rem 6/50rem rgba(221,221,221,0.50);
        overflow-x: auto;
        ul{
          width: 1100/50rem;
          height: 100/50rem;
          background:#FFFFFF;
          display: flex;

          li{
            height: 100/50rem;
            flex: 1;
            font-family:PingFangSC-Light;
            font-size:32/50rem;
            color:#000000;
            letter-spacing:0/50rem;
            text-align:center;
            line-height: 100/50rem;
            background:#ffffff;
          }
          .cost_listActive{
            color:#ea5413;
            border-bottom: 4/50rem solid #ea5413;
          }
        }
      }
      .costBox1{
        width: 680/50rem;
        margin: 35/50rem;
        overflow: hidden;

        li{
          overflow: hidden;
          font-family:PingFangSC-Light;
          font-size:26/50rem;
          color:#000000;
          letter-spacing:0/50rem;
          text-align:center;
          height: 60/50rem;
          padding: 0 42/50rem;
          border: 1/50rem solid #c7c7cc;
          border-radius: 100/50rem;
          float: left;
          margin: 10/50rem;
          line-height: 60/50rem;
        }
        .liAction{
          background:#ea5413;
          border-radius:100/50rem;
          color: #ffffff;
        }
      }

      #cost_box{
        width: 750/50rem;
        text-align: center;
        p{
          font-family:PingFangSC-Medium;
          font-size:36/50rem;
          color:#000000;
          letter-spacing:0/50rem;
          height: 50/50rem;
          line-height: 1rem;
        }
        p:nth-child(3),p:nth-child(4){
          font-family:PingFangSC-Light;
          font-size:26/50rem;
          color:#4a4a4a;
          letter-spacing:0/50rem;
        }
      }
      #ulList{
        width: 665/50rem;
        margin: 42/50rem;
        border: 1/50rem solid #c7c7cc;
        overflow: hidden;
        border-bottom: 0;
        border-top:0;
        li{
          width:100%;
          background: #FFFFFF;
                p{
                  float: left;
                  font-size: 24/50rem;
                  height: 60/50rem;
                  line-height: 60/50rem;
                  text-align: center;
                  border: 1/50rem solid #c7c7cc;
                  border-left:0;
                }
                p:nth-child(1){
                  width: 60%;
                  text-align: left;
                }
                p:nth-child(2), p:nth-child(3){
                  width: 20%;
                  line-height:30/50rem;
                  padding-top: 18/50rem;
                }
               p:nth-child(3){
                 border-right: 0;
               }
         }
        div{
          width: 100%;
          p{
            width:100%;
            font-size: 24/50rem;
            height: 60/50rem;
            line-height: 60/50rem;
            text-align: center;
            span{
              display: block;
              float: left;
              height: 100%;
              border: 1/50rem solid #c7c7cc;
              border-top:0;
              border-left:0 ;
            }
            span:nth-child(1){
              width:60%;
              text-align: left;
              text-indent: 24/50rem;
            }
            span:nth-child(2), span:nth-child(3){
              width: 20%;
              line-height:30/50rem;
              padding-top: 18/50rem;
            }
            span:nth-child(3){
              border-right: 0;
            }
          }
          p:nth-child(2n+3){
            background:#F3F3F3;
          }
        }

      }
    }




 }
</style>
