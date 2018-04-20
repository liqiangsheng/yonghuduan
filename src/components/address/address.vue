<template>
  <div id="box">
  <div id="ress_box">
    <div class="address" v-if="(list.length=='0')">
      <img src="../../../static/images/wuposition.png" alt="">
      <p>你还没有添加服务地址哦！</p>
      <router-link tag="div" class="add_ress" to="/add_address/0">添加服务地址</router-link>
    </div>
<!-- del(index,item.id) -->
    <div class="position_box">
        <div v-for="(item,index) in list" class="position_box_item" @click="select(index,item)">
            <b class="select" v-show="isSelector==index||positionSelelector(item.id)"></b>
            <div class="position_box_item_top">
                <p class="name">
                  {{item.linkmanName}}
                </p>
                <p class="tel">
                  {{item.linkmanPhoneNum}}
                </p>
            </div>
            <div class="position_box_item_content">
              {{item.linkmanDetails}}
            </div>
            <div class="position_box_item_bottom">
                <div class="position_box_item_bottom_del" @click.stop="delAlert(index,item.id)">
                  删除
                </div>

                <div class="position_box_item_bottom_revise" @click.stop="modificationAddress(item,index)">
                  修改
                </div>
            </div>
        </div>
    </div>
    <div class="footer" v-show="(list.length>0)" @click="addSaverAddress">
      <router-link class="accounts_btn" to="/add_address/0">添加服务地址</router-link>
    </div>
  </div>

  <mt-actionsheet
  :actions="actions"
  v-model="sheetVisible">
</mt-actionsheet>
  </div>
</template>
<script>
import {setCookie,getCookie} from "../../js/cookie"
import {Toast} from "mint-ui"
import {removerStorage,getLocalStorage,setLocalStorage} from "../../js/session"
import { Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        actions:[
          {
            name:"确认删除",
            method:this.del
          }
        ],
        delParams:{},
        sheetVisible:false,
        isSelector:"-1",
        list:[]
      }
    },
    methods: {
      addSaverAddress(){
         this.$store.commit('pushAddressObjData',this.list)
        this.$store.commit('pushEditObjDataRess',null)
      },
      ad(){
        alert("kk")
      },
      delAlert(index,id){
        this.delParams.index=index;
        this.delParams.id=id;
        this.sheetVisible=true
      },
      positionSelelector(id){
        if(getLocalStorage("OPTION").length>0&&getLocalStorage("OPTION")[0].id===id){
            return true;
          }else{
            return false;
          }
      },
      modificationAddress(item,index){                      //编辑地址
        this.$store.commit('pushEditObjDataRess',{item,index})
        this.$store.commit("revisePOSITION",item);
        this.$router.push({path:"/add_address/1"})
      },
      del() {
        let index=this.delParams.index,id= this.delParams.id,url;
        Indicator.open('正在删除');
        this.list[index].isShow=false;
        url=this.$common.apidomain+"/userSite/deleteUserSite?id="+id;
        this.$http.get(url).then(res=>{
          let data=res.data;
          if(data.code==="0000"){
            Indicator.close();
            if(getLocalStorage("OPTION")===true&&id===getLocalStorage("OPTION")[0].id){
              removerStorage("OPTION");
            }
            if(this.list.length===0){
               removerStorage("OPTION");
            };
            this.getData();
            Toast("删除成功");
          }else{
            this.getData();
            Toast(data.error)
          }
        });
      },
      select(index,item){
        Indicator.open('请稍后');
        removerStorage("OPTION");
        setLocalStorage("OPTION",item);
        this.isSelector=String(index);
        setTimeout(()=>{
          Indicator.close();
          if(this.$store.state.previPosition==="/address"){
            return
          }
          this.$router.push({path:this.$store.state.previPosition});
          this.$store.commit("addPosition","/address");
        },800)
      },
      getData(){
        if(!getCookie()){
          this.$router.push({path:"/login"});
          return;
        }
        var url=this.$common.apidomain+"/userSite/findlistUserSite?token="+getCookie();
        this.$http.get(url).then(res=>{
          var data=res.data;
          if(data.code==="0000"){
            Indicator.close();
            this.list=data.result;
            let currentPath=this.$route.path,
              loginPath=this.$store.state.loginPath,previPosition=this.$store.state.previPosition;
            if((loginPath!==currentPath)&&(loginPath.indexOf("/affirmorder")===-1&&loginPath.indexOf("/affirm_order")===-1)){

                 this.$store.commit("changeLoginPath","/address");
              if(!this.$store.state.editObjDataRess){   //判断用户是编辑还是 新增过来的  如果数据为 null 则是新增；else 是编辑；
                    let len=data.result.length-1,newArrayIds=this.$store.state.addressObjData.map((v,i)=>{
                          return v.id;
                       }),currentArrayIds=this.list.map((v,i)=>{
                          return v.id;
                       });
                for(let i=0;i<currentArrayIds.length;i++){
                       if(currentArrayIds[i]!=newArrayIds[i]){
                            this.select(i,this.list[i]);
                            return;
                      }
                }
              }else{
                  this.select(this.$store.state.editObjDataRess.index,this.list[this.$store.state.editObjDataRess.index])
              }
            }
          }else{
            Toast(data.error);
            this.$router.push({path:"/login"});
          }
        });
      }
    },
    created() {
        this.getData();
    }
  }
</script>
<style lang="less">
  #box{
    >#ress_box{
      .address{
        width:100vw;
        margin:0 auto;
        text-align: center;
        margin-top:250/50rem;
        >img{
          width:380/50rem;
          height:380/50rem;
          margin:0 auto;
          display: block;
        }
        >.add_ress{
          width:280/50rem;
          height:88/50rem;
          background: #EB5312;
          border-radius: 8px;
          font-family: PingFangSC-Regular;
          font-size: 32/50rem;
          margin:0 auto;
          margin-top:.8rem;
          text-align:center;
          color: #FFF;
          line-height:88/50rem;
          letter-spacing: 0;
        }
        >p{
          font-family: PingFangSC-Regular;
          font-size: 28/50rem;
          color: #4A4A4A;
          margin-top:28/50rem;
        }
      }
      >.position_box{
        >.position_box_item{
          margin-bottom:10/50rem;
          background:#fff;
          position:relative;
          >.select{
            position:absolute;
            left:0;
            top:0;
            background:url(../../assets/images/sect.png) center center no-repeat;
            background-size:100% 100%;
            width:61/50rem;
            height:61/50rem;
          }
          >.position_box_item_top{
            overflow: hidden;
            padding:0 46/50rem;
            padding-top:.5rem;
            >.name, >.tel{
              font-family:PingFangSC-Regular;
              font-size:32/50rem;
              color:#000;
              line-height: 2em;
              float:left;
            }
            >.tel{
              float:right;
            }
          }
          >.position_box_item_content{
            margin:0 46/50rem;
            padding-right:42/50rem;
            font-family:PingFangSC-Regular;
            font-size:30/50rem;
            line-height: 1.5em;
            color:#000;
            border-bottom:1px solid #b0b0b0;
            /*margin:0 .4rem;*/
            padding-bottom:.7rem;
          }
          >.position_box_item_bottom{
            overflow: hidden;
            padding:.5rem 0;
            .position_box_item_bottom_revise, .position_box_item_bottom_del{
              font-family:PingFangSC-Regular;
              font-size:28/50rem;
              color:#888;
              float:right;
              text-align: center;
              line-height:56/50rem ;
              height:56/50rem;
              margin-right:.3rem;
              &:after{
                content:"";
                float:left;
                margin-right:.2rem;
                vertical-align: middle;
                transform:translateY(40%);
                background:url(../../assets/images/deit_address.png) center center no-repeat;
                background-size:100% 100%;
                width:27/50rem;
                height:31/50rem;
              }
            }
            >.position_box_item_bottom_del{
                margin-right:.9rem;
              &:after{
                background:url(../../assets/images/delete_address.png) center center no-repeat;
                background-size:100% 100%;
                width:29/50rem;
              }
            }
          }
        }





        >.mint-cell-swipe{
            height:160/50rem;
            position: relative;
            padding:0 30/50rem;
            width:100%;
            >.mint-cell-wrapper{
                overflow: visible;
                position:relative;
                height:100%;
                background:none;
                padding-left:0;
                border-bottom:1px solid rgba(0,0,0,0.1);
                >.mint-cell-value{
                  >.select{
                    position:absolute;
                    left:-.6rem;
                    top:0;
                    background:url(../../../static/images/sect.png) center center no-repeat;
                    background-size:100% 100%;
                    width:40/50rem;
                    height:40/50rem;
                  }
                  >.revise_position{
                      height: 44/50rem;
                      width:45/50rem;
                      position: absolute;
                      right: 0;
                      top:50%;
                      transform: translateY(-50%);
                      background:url(../../../static/images/bianji.png) center center no-repeat;
                      background-size: 100% 100%;
                    }
                   >.user_info{
                    height:160/50rem;
                    position: absolute;
                    font-size:28/50rem;
                    color:#4A4A4A;
                    padding-top:30/50rem;
                    top:0;
                    font-family: PingFangSC-Regular;
                    width:90%;
                    left:0;
                    >.usuer_name{
                      position: absolute;
                      left:0;
                      top:0;
                    }
                    >.tel{
                      padding-top:30/50rem;
                      position: absolute;
                      right:0;
                      padding-right:0;
                      top:0;
                    }
                    >.location{
                      position: absolute;
                      bottom:.5rem;
                      left:0;
                      padding-right:0;
                      height:48/50rem;
                      text-overflow: ellipsis;
                      font-size: 24/50rem;
                      color: #9B9B9B;
                      letter-spacing: 0;
                    }
                  }
                }
              }
              >.mint-cell-right{
                 background:#eef3f4;
                >.mint-cell-swipe-buttongroup{
                  >.mint-cell-swipe-button {
                        width:130/50rem;
                        // padding-top:1rem;
                        text-align: center;
                        font-family: PingFangSC-Light;
                        font-size: 22/50rem;
                        color: #EB5312;
                        letter-spacing: 0;
                        padding:0 10/50rem;
                        background:url(../../../static/images/del.png) center .5rem no-repeat !important;
                        background-size:60/50rem 60/50rem  !important;
                        line-height: 4.5rem;
                      }
                }
              }
          }
          >.mint-cell-swipe:last-of-type{
              >.mint-cell-wrapper{
                border-bottom: none;
              }
            }
          >.mint-cell:last-child{
            background:#fff;
          }
      }
      >.footer {
          width: 100%;
          position: fixed;
          bottom: 45/50rem;
          left: 0;
          height: 98/50rem;
          line-height: 98/50rem;
          background: transparent;
          font-family: PingFangSC-Medium;
          color: #EB5312;
          letter-spacing: 0;
          padding:0 26/50rem;
          > .accounts_btn {
            height: 100%;
            display: inline-block;
            background: transparent;
            background-image:linear-gradient(-63deg, #ef6a1c 0%, #ea5413 99%);
            border-radius:2rem;
            width:100%;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: 32/50rem;
            color: #FFFFFF;
            letter-spacing: 0;
          }
        }
      margin-bottom:3rem;
    }
  }
</style>
