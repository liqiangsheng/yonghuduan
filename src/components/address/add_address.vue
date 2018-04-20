<template>
  <div>
    <div id="box">
      <div class="input_box">
        <div class="content">
          <div class="contacts">联系人</div>
          <input class="user_name" type="text" placeholder="请输入联系人" v-model="name" @blur="testName(name)" @focus="clearPositio('1')">
        </div>
        <div class="content">
          <div class="contacts">手机号</div>
          <input class="user_name" @blur="telTest(tel)" placeholder="请输入联系人手机号" type="tel" v-model="tel" @focus="clearPositio('1')">
        </div>
        <div class="content"  @click="select">
          <div class="contacts " style="letter-spacing:0">地&nbsp;&nbsp;&nbsp;&nbsp;址</div>
          <!--<p class="user_name">{{position}}</p>-->
          <div class="user_name">
            {{iframe_address}}
          </div>
          <span class="address_placehoder" v-if="!iframe_address">点击查找小区/大厦/学校等</span>
          <div class="select1">
            &nbsp;<b></b>
          </div>
        </div>
        <div class="content replenish">
           <textarea @focus="clearPositio('1')" class="user_name" @change="importText" v-model="text" @keyup="testText(text)"  placeholder="请补充地址信息，如5号楼4单元26号"></textarea>
        </div>
      </div>
      <div class="footer" v-show="!isSelectOption&&!isSelectStreet" @click="meory(isStreet,text,position)">
        <div class='accounts_btn'>
          保存
        </div>
      </div>
    </div>

    <!--lee s-->
      <div class="iframe_box"  id="iframe_box" v-if="iframe_show"  @click="iframe_show_close">
        <div class="iframe_back" @click.stop="iframe_show_close"></div>
        <iframe src="../../../static/addres.html" frameborder="0" id="iframe1" @click="iframe_show_open"></iframe>
      </div>
    <!--lee e-->

  </div>
</template>
<script>

import {positionSeesionFun,positionEdit} from "./positionFun"
//  import slider from 'slider'// 引入slider组件
  import {Toast} from "mint-ui"
  import { Indicator } from 'mint-ui';
  import {setCookie,getCookie} from "@/js/cookie"
  import {getSessionUserInfo} from "@/js/session"
  var area=[];//区级数据；
  var province=[]; //省级数据
  var city=[]; //市级数据
  var sheng=[];
  var streetData=[]; //街道
  export default {
    methods: {
      meory(a,b,c){
      	
        if(!(/^1[34578]\d{9}$/.test(this.tel))){
            Toast("手机号格式不正确");
            return
          }else if(!(/^[0-9a-zA-Z\u4e00-\u9fa5_]{1,20}$/.test(this.name))){
            Toast("联系人格式不正确");
            return
          }else if(this.indexId==="0"){     //this.indexId   判断是新增还是修改 0是新增  1是修改
            if(!this.getCurrentPosition.addressComponent||!this.iframe_address){   //getCurrentPosition.addressComponent 高德返回参数   iframe_address  地址名称
              return Toast("请选择地址");
            }
          }else if(this.indexId==="1"){
            if(!this.streetId||!this.iframe_address){
              return Toast("请选择地址");
            }
          } else if(this.text.length>=60){
            Toast("详细地址描述不得多于60个字符");
            return
          }
          if(this.text===undefined||this.text===""){
            Toast("请填写详细地址信息");
            return
          }
        //保存
        Indicator.open('正在保存');
        var token=getCookie(),pams,url;
        if(this.indexId==='1'){//修改地址
          pams={"linkmanName":this.name,"linkmanPhoneNum":this.tel,"linkmanAddress":this.text,
            "linkmanAreaId":this.streetId,
            "id":this.id,
            "linkmanBuilding":this.iframe_address,
            "lon":this.location.lng?this.location.lng:"",
            "lat":this.location.lat?this.location.lat:"",
            "adcode":this.getCurrentPosition?this.getCurrentPosition.addressComponent.adcode:"",
            "towncode":this.isGetTowncode(),
            "citycode":this.getCurrentPosition?this.getCurrentPosition.addressComponent.citycode:"",
            "township":this.getCurrentPosition&&this.getCurrentPosition.addressComponent.township.length?this.getCurrentPosition.addressComponent.township:"",
            "token":token};
          url=this.$common.apidomain+"/userSite/updateUserSite";
        }else{ //添加地址
          pams={"linkmanName":this.name,"linkmanPhoneNum":this.tel,"linkmanAddress":this.text,
//            "linkmanAreaId":this.streetId,
            "citycode":this.getCurrentPosition?this.getCurrentPosition.addressComponent.citycode:"",
           "township":this.getCurrentPosition&&this.getCurrentPosition.addressComponent.township.length?this.getCurrentPosition.addressComponent.township:"",
            "adcode":this.getCurrentPosition.addressComponent.adcode,
            "towncode":typeof this.getCurrentPosition.addressComponent.towncode==="object"?"":this.getCurrentPosition.addressComponent.towncode,
            "lon":this.location.lng,
            "lat":this.location.lat,
            "linkmanBuilding":this.iframe_address,
            "token":token};
          url=this.$common.apidomain+"/userSite/saveUserSite";
        }
        this.$http.post(url,pams).then(res=>{
          if(res.data.code==="0000"){
            Indicator.close();
            Toast({message: '保存成功',
              iconClass: 'mintui mintui-success'});
            setTimeout(()=>{
              this.$store.commit("changeLoginPath",this.$route.path)
              this.$router.push({path:"/address"})
            },1000)
          }
        });
      },
      isGetTowncode(){
        if(this.getCurrentPosition){
           return typeof this.getCurrentPosition.addressComponent.towncode==="object"?"":this.getCurrentPosition.addressComponent.towncode;
        }else{
          return ""
        }
      },
      testText(text){
        if(text.length>=60){
          Toast("详细地址描述不得多于60个字符");
        }
      },
      testName(name){
        if(!(/^[0-9a-zA-Z\u4e00-\u9fa5_]{1,20}$/.test(name))){
          Toast("联系人格式不正确");
          return false
        }else{
          return true
        }
      },
      telTest(val){
       if(!(/^1[34578]\d{9}$/.test(this.tel))){
         Toast("手机号格式不正确");
         return false;
       }else{
         return true;
       }
      },
      getShengId(data){
        if(!data){
          return;
        }
        for(let x =0;x < this.provinceList.length;x++){
          if(data === this.provinceList[x].name){
            return this.provinceList[x].id;
          }
        }
        return "01";
      },
      getCityValues(picker,shengId){
        var url2 = this.$common.apidomain+"/areainfo/findlistareaInfo?id="+shengId;
        this.$http.get(url2).then(res=>{
            this.cityList=res.data.result;
            city = [];
            for(let i=0;i<this.cityList.length;i++){
              city.push(this.cityList[i].name);
            }
            sheng[1] = city[0];
            picker.setSlotValues(1,city);
          if(!this.cityList[0]){
            return;
          }
          this.getAreaValues(picker,this.cityList[0].id);
        });
      },
      getShiId(data){
        if(!data){
          return;
        }
        for(let x=0;x<this.cityList.length;x++){
          if(data == this.cityList[x].name){
            return this.cityList[x].id;
          }
        }
      },
      getStreet(data) {  //得到街道
        if(!data){
          return;
        }
        for(let x=0;x<this.xianList.length;x++){
          if(data === this.xianList[x].name){
            return this.xianList[x].id;
          }
        }
      },
      getAreaValues(picker,shengId){
        var url2 = this.$common.apidomain+"/areainfo/findlistareaInfo?id="+shengId;
        this.$http.get(url2).then(res=>{
          this.xianList=res.data.result;
          area = [];
          for(var i=0;i<this.xianList.length;i++){
            area.push(this.xianList[i].name);
          }
          sheng[2] = area[0];
          picker.setSlotValues(2,area);
        });
      },
      clearPositio(s){ //取消选择；省市区；

        this.isSelectOption=false;
        if(s==='1'){
          this.clearStreet("1");
          return;
        }
          this.shiId="";
          this.position="";
      },
      clearStreet(s){
        if(s==='1'){
          this.isSelectStreet=false;
          return;
        }
          this.isSelectStreet=false;
          this.isStreet="";
      },//取消选择 街道
      //获取省市区 start
      select(){   //深市区选择；

        //lee 注释 2018-1-4 s
        this.iframe_show=true; //lee显示地图
//
      },

      //获取街道数据 start
      selectStreet(){
        this.slotsStreet[0].values= streetData;
        if(this.isSelectOption){
          return;
        }
        this.isSelectStreet=!this.isSelectStreet;
          var url=this.$common.apidomain+"/areainfo/findlistareaInfo?id="+this.shiId;
          this.$http.get(url).then(res=>{
              if(res.data.code!=="0000"){
                Toast("请选择省市区");
                this.isSelectStreet=!this.isSelectStreet;
                return;
              }
            this.streetList=[];
            this.streetList=res.data.result;
            streetData.length=0;//把街道列表清空

            for(let i=0;i<this.streetList.length;i++){
              streetData.push(this.streetList[i].name);
            }

          })
      },
    //获取街道数据 end
    //选择街道点击完成 start
      selectorStreet(){
        this.streetList.forEach((res,i)=>{
          if( res.name==this.isStreet){
            this.streetId=res.id
          }
        });
        this.isSelectStreet= !this.isSelectStreet;
      },
      //选择街道点击完成 end
      importText(){

      },
      change(){
        Indicator.close();
      },

      iframe_show_close(){ //lee 点击返回隐藏iframe
        this.iframe_show=false;
      },
      iframe_show_open(){ //lee 点击一直显示iframe
        this.iframe_show=true;
      },
      iframe_storage_data(){ //lee 监听storage
        let _this=this;
          window.addEventListener("storage", function (data) { //lee监听iframe存的storage   data.key
            if(data.key=="dd_poi"){  //lee点击地图选项后隐藏地图
              _this.iframe_show=false;
            }
          });
      },
      iframe_getItem(){ //lee 取storage的dd_poi对象
        let _this=this,dd_poi=null;//dd_poi=storage存储地址信息
        if(sessionStorage.getItem("dd_poi")){
          dd_poi=JSON.parse(sessionStorage.getItem("dd_poi"));
          return dd_poi
        }
      },
      iframe_backward(callback){ //lee 逆向地理查询
        let _this=this,url=null,url_northSouthLine=null;// url=逆向地理请求地址， url_northSouthLine=南北线
        if(_this.iframe_getItem()){
          url_northSouthLine=_this.iframe_getItem().location.lng+','+_this.iframe_getItem().location.lat; //拿东经和北纬
          url=`https://restapi.amap.com/v3/geocode/regeo?location=${url_northSouthLine}&key=6f7abd3e0d62ca6affa0e32b55138d1a`;
          _this.$http.get(url).then(data=>{
            if(data.data.infocode=='10000'){ //info=ok或者infocode=10000表示请求成功，data.data.regeocode=地理数据集合
              callback(data.data.regeocode); //回调取数据
            }
          });
        }
      },
    },
    watch:{
      "$route":"change",
      iframe_show(newVal,oldVal){  //lee 监听是否点击iframe输出框
            let _this=this;

            if(_this.iframe_getItem()){
              _this.iframe_address=''; //清空
                _this.iframe_address=_this.iframe_getItem().name; //名称给iframe_address到页面显示
            }
            if(!newVal){ //关闭地图弹出框的时候去拿逆向地理位置
              _this.iframe_backward(data=>{

                this.getCurrentPosition=data;
                if(data.addressComponent.citycode!=="0755"){
                    this.iframe_address="";
                    this.$Toast("请选择深圳范围内地区")
                }
              });
            }
      },
    },
    data() {
      return {
        jieliufa:false,
        location:{},
        flag:true,
        getCurrentPosition:"",
        text:"",
        id:"",
        isSelectOption:false,//选择省份城市
        isSelectStreet:false,//选择街道
        tel:"",
        position:"",
        streetId:"", //街道id
        isStreet:"", //选择前的
        street:"", //选择街道后的内容
        name:"",
        shiId:'',  //获取市 id   去获取得到街道
        provinceList:[],
        cityList:[],
        xianList:[],
        addressProvince: '省',
        addressCity: '市',
        addressXian:'区',
        indexId:"",
        slots: [
          {
            flex: 1,
            values: province,
            className: 'slot1',
            textAlign: 'center',
          }, {
            flex: 1,
            values:city,
            className: 'slot3',
            textAlign: 'center',
          }, {
            flex: 1,
            values: area,
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        slotsStreet:[
          {
            flex: 1,
            values: streetData, //街道；
            className: 'slot1',
            textAlign: 'center',
          }
        ],
        iframe_address:'',  //lee 显示地址文字
        iframe_show:false, //lee iframe不显示
      };
    },
    created(){
      let location=getSessionUserInfo("dd_poi").location,locationArray={},k;
          for(k in location){
            if(k==="lat"||k==="lng"){
              locationArray[k]=location[k]
            }
          }
      this.location=locationArray;
      area.length=0;//区级数据；
      province.length=0; //省级数据
      city.length=0; //市级数据
      sheng.length=0;
      streetData.length=0; //街道
      if(this.$route.params.index==='1'){
//        positionSeesionFun(this)
        positionEdit.call(this)
      }else{
        this.indexId="0";
        this.tel = getSessionUserInfo("userInfo").phoneNum||""
      }

      let url=this.$common.apidomain+"/areainfo/findlistareaInfo?id=0";
      this.$http.get(url).then(res=>{
        // province=[];  //清空
        this.provinceList=res.data.result;
        for(let i=0;i<this.provinceList.length;i++){  //把省级name放到数组里面去
          province.push(this.provinceList[i].name);
        }
        province= Array.from(new Set(province));
        if(this.provinceList.length>0){
          let url2 = this.$common.apidomain+"/areainfo/findlistareaInfo?id="+this.provinceList[0].id;
          this.$http.get(url2).then(res=>{
            // city=[];
            this.cityList=res.data.result;
            for(let i=0;i<this.cityList.length;i++){
              city.push(this.cityList[i].name);
            }
            city= Array.from(new Set(city) )
            if(this.cityList.length>0){
              let url3 = this.$common.apidomain+"/areainfo/findlistareaInfo?id="+this.cityList[0].id;
              this.$http.get(url3).then(res=>{
                // area=[];
                this.xianList = res.data.result;
                for(let i=0;i<this.xianList.length;i++){
                  area.push(this.xianList[i].name);
                }
                area= Array.from(new Set(area) )
                sheng.push(province[0]);
                sheng.push(city[0]);
                sheng.push(area[0]);
                this.jieliufa =true;
              });
            }
          });
        }
      });
    },
    mounted(){
        let _this=this;
        this.$nextTick(function () {
          _this.iframe_storage_data();  //lee调用监听iframe的storage
        });
    }
  }
  

</script>
<style scoped lang="less">
  #box{
    margin-bottom:0;
  }
.select_option{
  position:absolute;
  bottom:30px;
  left:50%;
  transform:translateX(-50%);
  width:100%;
  >.success_res{
    width:100%;
    padding:0 32/50rem;
    height:82/50rem;
    background:rgba(0,0,0,0.1);
    >div{
      float:left;
      width:3rem;
      font-weight: 600;
      line-height:82/50rem;
      font-family: PingFangSC-Medium;
      font-size: 32/50rem;
      color: #EB5312;
    }
    >.success{
      float:right;
      text-align: right;
    }
    >.picker{
      padding-left:30px;
      >.picker-items{
        >.slot3{
          // padding-left:40px !important;
        }
      }
    }
  }
}
.address_placehoder{
	position:absolute;
	left:0;
	top:50%;
	text-indent: 6em;
	font-family:PingFangSC-Light;
	font-size:32/50rem;
	color:rgba(136,136,136,1);
	transform:translateY(-50%);
}
.input_box{
  background:#fff;
  overflow: hidden;
  width:100%;
  font-family: PingFangSC-Regular;
  font-size: 32/50rem;
  color: #9B9B9B;
  letter-spacing: -0.77px;
  padding-right:0;
  >.content{
    display: flex;
    height:2rem;
    position:relative;
    border-bottom:1px solid rgba(0,0,0,0.1);
    padding-right:32/50rem;
    >.contacts{
      width:4rem;
      height:100%;
      font-size: 32/50rem;
      text-align: center;
      line-height:2rem;
      letter-spacing:.1rem;
      font-family:PingFangSC-Light;
      color:#000;
    }
    >.user_name{
      line-height: 88/50rem;
      color:#000;
      flex:1;
      padding:0;
      height:100%;
      border:none;
  
      margin:0;
    }
  }

  .mint-cell-value {
    > .mint-field-core {
      border: none;
    }
  }
  >.replenish{
    height:auto;
    >.user_name{
      margin-top:.5rem;
      font-size: 32/50rem;
      color:#000;
      height:auto;
      padding-bottom:2rem;
      padding-left:.7rem;
      line-height: 1rem;
      font-family:PingFangSC-Light;

      letter-spacing: -0.77/50rem;
    }
    border:none;
  }
  .select1{
    position:absolute;
    right:.8rem;
    top:50%;
    color:#c8c8c8;
    transform:translateY(-50%);
    >b{
      display:inline-block;
      background:url(../../../static/images/right.png) center center no-repeat;
      background-size:100% 100%;
      width:16/50rem;
      height:26/50rem;
      vertical-align:middle;
    }
  }
  input{
   color:#4a4a4a;
  }
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 29/50rem;
  left: 0;
  height: 98/50rem;
  line-height: 98/50rem;
  padding:0 26/50rem;
  background:transparent;
  font-family: PingFangSC-Medium;
  color: #EB5312;
  letter-spacing: 0;
  > .accounts_btn {
    height: 100%;
    display: inline-block;
    width:100%;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 32/50rem;
    color: #FFFFFF;
    letter-spacing: 0;
    background:url(../../assets/images/datebutton.png) center center no-repeat;
    background-size:100% 100%;
    border-radius:2rem;
  }
}
.slot1{
  margin-left:30px;
}
#box{
  padding-top:10px;
}
.input_box{
  /*// height:100vh;*/
}
.picker-items{
}

/*lee s*/
  .iframe_box{
    width:100%;
    height:100%;
    position:absolute;
    right:0;
    bottom:0;
    z-index: 999;
    background-color:rgba(34,34,34,.8);
    overflow: hidden;
  }
  .iframe_back{
    position: absolute;
    top: .36rem;
    left: .3rem;
    z-index: 999999;
    width: 1.4rem;
    height: 1.6rem;
  }
  #iframe1{
    position:absolute;
    right:0;
    top: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    /*height:18rem;*/
    /*height: 60%;*/
    /*margin-top: 5rem;*/
    overflow: hidden;
  }
  input::-webkit-input-placeholder{ /*WebKit browsers*/
			font-size:32/50rem;
			font-family:PingFangSC-Light;
			color:rgba(136,136,136,1);
	}

input::-moz-input-placeholder{ /*Mozilla Firefox*/
color:rgba(136,136,136,1);
font-size:32/50rem;
font-family:PingFangSC-Light;
	}

input::-ms-input-placeholder{ /*Internet Explorer*/ 
font-family:PingFangSC-Light;
font-size:32/50rem;
color:rgba(136,136,136,1);
	}
  /*lee e*/
</style>
