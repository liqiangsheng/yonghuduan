
export var _this;
import moment from "moment"
export function ths(_th){
  _this=_th;
}
//显示剩余时间 start
export function orderStatus(input){
  if (input === '07' || input === '05' || input === '01') {
    return true;
  } else {
    return false
  }
}
//显示剩余时间 end
//显示取消订单 start
export function cancel(input,serviceBeginTime) {
  if ((input === "03" || input === "04" || input === "05") && !serviceBeginTime) {   //通过状态判断显示取消按钮；
    return true;
  } else {
    return false;
  }
}
//显示取消订单 end

//显示确认付款 start
export function affirm(input){
  if(input==="17" ||input==="10"||input==='09'|| input==='12'||input==='16'|| input === "03" || input === "04" || input === "05" ||input==="18"||input==="06"){
    return false;
  }else{
    return true;
  }
}
export function AFFIRM(input){
  if(input==='01'){
    return true
  }else{
    return false
  }
}
//显示确认付款 end
//显示底部按钮 start
export function Footer(input){
  if(input==='08'||input==='13'||input==="10" || input==='15' || input==='14'){
    return false;
  }
  if(input==="06"){
    return true;
  }
  if(input!=='16' && input!=='02' &&input!=='07'){
    return true;
  }else{
    return false;
  }
}
//显示底部按钮 end

export function isMaster(input){
  if(input!=='16'&&input!=='16'&&input!=='11'){
      return false;
  }else{
    return true;
  }
}
export function commonFilter(input,order){
  if(input==='06')return false;
  if((order.coreMainOrderEvaluate===undefined)&&input==='12'||input==='18'||input==='09'||input==="17"){
    return true;
  }else{
    return false;
  }
}

export function isDelLineFilter(state,price1){
  if(state==='09'||state==='11'||state==='12'||state==='17'||state==='18'||state==="14"||state==="13"||state==="16"){
    this.comePirce=price1!==""||price1!==undefined?price1:0;
    return true;
  }
  return false;
}
export function orderCountdown(){
  let timeCreater = this.data.order.createTime,
    ti = (new Date().getTime() - timeCreater);
  this.surplusMinute = Math.abs(moment(ti).format("mm") - 30);
  let pic = setInterval(function () {
    ti = ((new Date().getTime() - timeCreater));
    this.surplusMinute = Math.abs(moment(ti).format("mm") - 30);
  },60000);
}
