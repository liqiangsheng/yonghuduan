<template>
    <div id="box">
      <div class="comment_container">
        <div class="img_box">
          <img src="../../../static/images/userImg.png" alt="">
        </div>
        <p class="user_name">{{masterInfo.master}}</p>
        <p class="job_id">工号：{{masterInfo.masterId}}</p>
        <div class="comment_star">
          <b v-for="(item,index) in 5" @click="isTiny(index)" :class="{tiny_spot:tinyIndex>=index}"></b>
        </div>
       <div class="describe">{{explaintext}}</div>
        <p class="explain"  v-show="isDescribeText">您的评价将帮助我们提升服务质量</p>
        <!--不满问题-->
        <div class="bottom_status" v-show="isComment">
          <button v-show="activeSelector" class="serve_cause" v-for="(item,index) in button" :key="item.mes" :class="{selector:item.status}" @click="isSelector(index)">{{item.mes}}</button>
        </div>
        <!--写评论内容-->
        <div class="comment_text" v-show="isComment">
          <textarea placeholder="还有哪些你想吐槽的？" v-model="commentText"></textarea>
          <button class="submit" :class="{isDisabled:submitStatus}" @click="submitContent">匿名提交</button>
        </div>
        <!--提交后的显示-->
        <div class="bottom_status" :class="{successBtn:successMsg.length < 3}" v-show="successDisplay">
          <button v-show="activeSelector" class="serve_cause" v-for="(item,index) in successMsg" :key="item.mes"  @click="isSelector(index)">{{item.mes}}</button>
        </div>
        <div class="completed" v-show="isCompleted">
          <p v-html="commentContent"></p>
        </div>
      </div>
    </div>
</template>
<script>

  import { Toast } from 'mint-ui';
//  import common from "@/js/baseHttp"
  import {getCookie} from "@/js/cookie"
  import { getSessionQrcodeId} from "@/js/session";

    export default {
        data() {
            return {
              successDisplay:false,//成功后显示不满的原因
              successMsg:[],      //提交成功之后的数据列表
              activeSelector:true,//初始化服务的原因，提交后将选中的显示
              isCompleted:false,//显示提交成功后的文本域
              submitStatus:true, //提交按钮的状态
              isDescribeText:true, //描述文字
              commentText:"", //评论的文本内容
              commentContent:"",//提交后的内容
              tinyIndex:"-1",
              level:"",
              masterInfo:getSessionQrcodeId("masterInfo"),//师傅信息
              isComment:false,   //显示隐藏文本和按钮及选项
              explaintext:"请对师傅进行评价",
              textList:["非常不满意，特别失望","不满意，有点失望","一般，普普通通","比较满意，仍可改善","比较满意，仍可改善"],
              button:[],
              buttons:{
                0:[{mes:"迟到",status:false},
                  {mes:"没有耐心",status:false},
                  {mes:"服务态度差",status:false},
                  {mes:"业务不专业",status:false},
                  {mes:"乱收费",status:false},
                  {mes:"脏乱费",status:false},
                  ],
               1:[
                 {mes:"迟到",status:false},
                 {mes:"没有耐心",status:false},
                 {mes:"服务态度差",status:false},
                 {mes:"业务不专业",status:false},
                 {mes:"乱收费",status:false},
                 {mes:"脏乱费",status:false},
                ],
                2:[
                  {mes:"迟到",status:false},
                  {mes:"没有耐心",status:false},
                  {mes:"服务态度差",status:false},
                  {mes:"业务不专业",status:false},
                  {mes:"乱收费",status:false},
                  {mes:"脏乱费",status:false},
                ],
                3:[
                  {mes:"准时",status:false},
                  {mes:"态度可以",status:false},
                  {mes:"业务专业",status:false}
                ],
                4:[
                  {mes:"神准时",status:false},
                  {mes:"手艺很棒",status:false},
                  {mes:"态度很好",status:false},
                  {mes:"形象很赞",status:false},
                  {mes:"收费透明",status:false},
                  {mes:"细致认真",status:false}
                ]
              }
            }
        },
        methods: {
          isSelector(index){
            let button=this.button;
            button[index].status=!button[index].status;
            this.submitStatus= !button[index].status;
            for(var i=0; i<button.length;i++){
              if(button[i].status){
                this.submitStatus = false;
                break;
              }
            }
          },
          isTiny(index){
            this.level=index+1;
            this.submitStatus = false;
            this.button=this.buttons[index];
            this.isDescribeText=false;
            if(this.successDisplay){
              return;
            }
            this.tinyIndex=index;
            this.isComment=true;
            var textList=this.textList;
            this.explaintext=textList[index];
//   改版评论  start
           if(index>=3){
             this.button=this.buttons[index];
             this.isDescribeText=false;
             if(this.successDisplay){
               return;
             }
             this.tinyIndex=index;
             this.isComment=true;
             var textList=this.textList;
             this.explaintext=textList[index];
           }else{
             this.button=this.buttons[index];
             this.isDescribeText=false;
             if(this.successDisplay){
               return;
             }
             this.tinyIndex=index;
             this.isComment=false;
             var textList=this.textList;
             this.explaintext=textList[index];
             this.$router.push({path:"/comment1",query: {leave:index+1}});
           }

 //   改版评论  end
          },
          submitContent(){
            if(!this.submitStatus){
              let i,evaluateLabels=[];
                for(i=0;i<this.button.length;i++){
                  if(this.button[i].status){
                    this.successMsg.push(this.button[i]);
                  }
                }
              this.button.forEach((e,i)=>{
                if(e.status){
                    evaluateLabels.push(e.mes)
                }
              });
              evaluateLabels = evaluateLabels.join(",");
              let params={"mainOrderId": this.masterInfo.id, "level":this.level , "levelLabel":this.textList[this.level-1],
              "evaluateLabels": evaluateLabels, "content":this.commentText ,"token": getCookie()};
             let url=common.apidomain+"/mainorderevaluate/savemainorderevaluate";
             this.$http.post(url,params).then(res=>{
                let data=res.data;
               if(data.code==="0000"){
                  this.commentContent=this.commentText;
                  this.isCompleted=true;
                  this.isComment=false;
                  this.successDisplay=true;
                  if(!this.commentText){
                    this.isCompleted=false;
                  }
                  Toast('提交成功');
                  if(this.masterInfo.path){
                    this.$router.push({path:this.masterInfo.path})
                  }else{
                    let inOf=window.location.href;
                    this.$historyPath(inOf)
                  }

                }else{
                  Toast(data.error);
                }
              })
            }
          return;
          }
        },
        created() {
          if(!this.masterInfo){
            Toast("未找到师傅信息");
            this.$router.back(-1);
          }

        }
    }
</script>
<style scoped lang="less">
  .comment_container{
    padding-top: 80/50rem;
   > .img_box{
     margin:0 auto;
     width:120/50rem;
     height:120/50rem;
     border-radius: 50%;
      >img{
        display: block;
        width:100%;
        height:100%;
      }
    }
    >.user_name{
      font-family: PingFangSC-Regular;
      font-size: 36/50rem;
      color: #4A4A4A;
    }
    >.job_id,.describe,.explain,.user_name{
      text-align: center;
      font-family: PingFangSC-Regular;
      margin-top:10/50rem;
    }
    >.explain{
      font-size: 28/50rem;
      color: #9B9B9B;
    }
    >.describe{
      font-size: 28/50rem;
      color: #EB5312;
    }
    >.job_id{
      font-size: 32/50rem;
      color: #9B9B9B;
    }
    >.comment_star{
      width:470/50rem;
      height:70/50rem;
      display: flex;
      margin:35/50rem auto;
      >b{
        display: inline-block;
        height:100%;
        margin-left:0.4rem;
        background:url(../../../static/images/star2.png) center center no-repeat;
        background-size:100% 100%;
        width:72/50rem;
      }
      >.tiny_spot{
        background:url(../../../static/images/star1.png) center center no-repeat;
        background-size:100% 100%;
      }
    }
    >.bottom_status{
      width:100%;

      >.serve_cause{
        outline: none;
        background:transparent;
        margin-left:.6rem;
        width:212/50rem;
        margin-top:.6rem;
        height:60/50rem;
        text-align: center;
        border-radius: 30/50rem;
        font-size:28/50rem;
        line-height: .5rem;
        /*text-align: center;*/
      }
      >.successBtn{
        /*margin:0 auto;*/
      }
      .selector{
        border: 1px solid #EB5312;
        color: #EB5312;
      }
    }
    >.successBtn{
      text-align:center;
    }
    .comment_text{
      width:100%;
      padding:.5rem;
      >textarea{
        width:100%;
        height:250/50rem;
        font-size: 24/50rem;
      }
      >.submit{
        width:100%;
        background: #EB5312;
        border-radius: 8/50rem;
        height:88/50rem;
        border:none;
        margin-top:1rem;
        font-family: PingFangSC-Regular;
        font-size: 32/50rem;
        color: #FFFFFF;
      }
      >.isDisabled{
        background: #F3F3F3;
        color:#9B9B9B;
      }
    }
    .completed{
      font-family: PingFangSC-Regular;
      width:100%;
      color: #4A4A4A;
      padding:1.2rem 1rem;
      >p{
        border-radius: 8/50rem;
        font-size: 24/50rem;
        background:#F3F3F3;
        padding:.2rem .5rem;
      }
    }
  }
#box{
  background:#fff;
  margin-bottom:0;
  height:100vh;
  font-family: PingFangSC-Regular;
}
</style>


