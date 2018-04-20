<template>
    <div id="box">
      <h3 class="title">选择预约日期</h3>
      <div class="nav_list">
          <ul ref="ul">
            <li class="daily time" :class="{daily_selector:isSelector==index}"  @click="selector(index)" v-if="item.isw"
            v-for="(item,index) in timeList" :key="index">
              <p>{{item.time}}</p>
              <span>{{item.name}}</span>
            </li>
          </ul>
      </div>
      <h3 class="title">选择预约时间</h3>
      <div class="nav_list time_list" id="time_list">
        <ul>
          <li class="daily" v-for="(item,index) in timeList2" :key="index" @click="selectHour(index,isErr[index])"
              :class="{'selector_hour':isSelectorHour==index,'ccc':isShowList[index]===true}">
              {{item}}
          </li>
        </ul>
      </div>
      <p class="display_none_bar"></p>
      <button @click="submitBtn" class="submit" :class="{sub:isSelectorHour!=-1&&isSelector!=-1}">确 &nbsp;认</button>
    </div>
</template>
<script>
      import {changeDate,dateList} from "@/components/order/js/date_js"
      import {getLocalStorage} from "@/js/session"
    export default {
        data() {
            return {
              isSelector:"-1",
              state:true,
              timeList:[
                {name:"今天",time:"",isw:true},
                {name:"明天",time:"",isw:true},
                {name:"周五",time:"",isw:true},
                {name:"周六",time:"",isw:true},
                {name:"周日",time:"",isw:true},
                {name:"周日",time:"",isw:true},
                {name:"周日",time:"",isw:true}
              ],
              selectorTime:'',
              date:[],
              current:"",
              isErr:[],
              timeList2:dateList,
              lastCurrentTime:'',
              isSelectorHour:"-1",
              isShowList:[]
            }
        },
        methods: {
          selector(index){
          		this.isShowList=[];
            for(var i=0;i<dateList.length;i++){
              this.isShowList[i]=false;
            }
           if(index==0){
              for(let i=0;i<this.timeList2.length;i++){
                if((this.timeList2[i].replace(/\:/, ""))-0<(this.current.getHours()+""+this.current.getMinutes())-0) {
                    this.isErr[i]=false
                }
              }
           }else{
            this.isErr=[];
             for(let i=0;i<this.timeList2.length;i++){
              this.isErr.push(true);
            }
           }
           if(index===0&&this.state){
           	let timeList=this.timeList2;
           	for(var i=0;i<timeList.length;i++){
           		let h=timeList[i].substring(0,2),
           		    m=timeList[i].substring(3),
           		    sum=h-0,
           		    currH=this.current.getHours();
           		    if(sum-1<=currH){
           		    	this.isShowList[i]=true
           		    }
           	}
           }
            this.isSelector=index;
            this.selectorTime=this.date[index];
            this.isSelectorHour="-1";
          },
          selectHour(index,isErr){
            if(this.isShowList[index]){
            	return;
            }
            if(this.isSelector==-1){
              this.$Toast("请选择日期");
              return false;
            }
            this.isSelectorHour=index;
             // this.selectorTime=''
            this.lastCurrentTime = this.selectorTime+" "+this.timeList2[index]+":00";
          },
          submitBtn(){
              if(this.isSelectorHour!=-1&&this.isSelecto!=-1){
               this.lastCurrentTime =  this.lastCurrentTime.replace(/\//, "-");
//               let url=common.apidomain+"/order/getorders?type=1&token="+getCookie();
                this.$store.commit("yuDatetime",this.lastCurrentTime.substring(0,this.lastCurrentTime.indexOf("~"))+":00");
                this.$router.back(-1);
              }else{
                return false;
              }
          }
        },
        created() {
          let fullName=getLocalStorage("fullName"),y,i,index=0;
          for(y=0;y<fullName.length;y++){
            if(fullName[y].labelId.substring(0,6).indexOf("003001")===-1){
                  this.state=false;
                  this.timeList[0].isw=false;
                  index=1;
                  this.$nextTick(function(){
                    this.$refs.ul.style.width=1250/50+"rem";
                  });
                  break;
              }
          }
          let sta=false;
          for(i=0;i<dateList.length;i++){
     			  this.isShowList[i]=false;
     		  }
          changeDate(this);
          this.selector(index);
          for(let i=0;i<this.isErr.length;i++){
            if(this.isErr[i]){
              sta=this.isErr[i];
              break;
            }
          }
         if(!sta) {
           this.timeList[0].isw=false;
           this.$nextTick(function(){
             this.$refs.ul.style.width=900/50+"rem";
           });
           this.selector(1);
         }
        }
    }
</script>
<style scoped lang="less">
.submit{
  width:92.8%;
  height:98/50rem;
  background:#ccc;
  position:absolute;
  bottom:.5rem;
  left:0;
  border-radius:2rem;
  font-family:PingFangSC-Semibold;
  color:#fff;
  font-size: 34/50rem;
 margin-left:.5rem;

}
#box{
  background:#fff;
  height:100vh;
}
.sub{
  background:url(../../assets/images/datebutton.png) center center no-repeat;
  background-size:100% 100%;
  border:none;
  border-radius:2rem;
}
.title{
  text-align: center;
  /*line-height: 2rem;*/
  font-family:PingFangSC-Light;
  font-weight: normal;
  font-size:40/50rem;
  color:#888;
  padding-top:56/50rem;

  letter-spacing:0px;
  padding-bottom:15/50rem;
}
.title:first-of-type{
  /*padding-top:.8rem;*/
}
.title:last-of-type{
    /*line-height: 2.5rem;*/
  padding-top:27/50rem;
}
  #position{
    position:relative;
  }
  .nav_list{
      background:#fff;
      padding:.7rem 16/50rem;
      width:100%;
      overflow: auto;
      padding-bottom:1rem;
      >ul{
        overflow: hidden;
        width:1450/50rem;
        /*width:910/50rem;*/
        >.daily{
          font-family: PingFangSC-Medium;
          font-size: 24/50rem;
          color: #4A4A4A;
          text-align:center;
          float:left;
          width:4rem;
          margin-left:.3rem;
          background: #fff;
          border-radius:18/50rem;
          border: 2/50rem solid #ECECEC;
          height:2rem;
          padding:.1rem 0;
          padding-bottom:.2rem;
          >p{
            font-size: 28/50rem;
            line-height: .5rem;
            margin-top:.25rem;
            font-family:PingFangSC-Light;
            color:#000000;
          }
          >span{
            font-family:PingFangSC-Light;
            font-size:26/50rem;
            color:#4a4a4a;
            display: block;
            margin-top:.1rem;
          }
        }
        >.daily:nth-of-type(4n){
          margin-right:0;
        }
        >.daily_selector{
          border:2/50rem solid #ea5413;
          >p , >span{
           color:#000;
          }
        }
        >.time.daily_selector{
          border:4/50rem solid #ea5413;
          >p , >span{
           color:#000;
          }
        }
        >.daily:first-of-type{
          margin:0;
        }
        >.time{
          width:3.52rem;
        }
      }
    ul::-webkit-scrollbar{
      display: none;
    }
  }
  .display_none_bar{
    width:100%;
    height:.9rem;
    background:#fff;
    position:absolute;
    top:5rem;
    /*display: none;*/
    left:0;
    z-index:222;
  }
  #time_list{
    /*<!--padding-left:32/50rem;-->*/
    padding-top:0;
    background:transparent;
    position:absolute;
    z-index: 333;
    left:0;
    padding-left:.5rem;
    padding-right:.2rem;
    top:8.2rem;
    >ul{
      width:100%;
      >.daily{
        margin-bottom:18/50rem;
        padding:0;
        width:222/50rem;
        height:100/50rem;
        margin-right:16/50rem;
        margin-left:0;
        line-height: 100/50rem;
        font-family:PingFangSC-Light;
        font-size:28/50rem;
        color:#000000;
        letter-spacing:0px;
        text-align:center;
      }
      >.selector_hour{
        border:2px solid #ea5413;
        color:#000;
      }
      >.daily:first-of-type{
        /*<!--margin-right:20/50rem;-->*/
      }
      >.err{
          background:#ccc;
       }
       .ccc{
       	background:#ccc;
       }
    }
  }

</style>
<style>

</style>

