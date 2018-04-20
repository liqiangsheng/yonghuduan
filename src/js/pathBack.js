export function historyPath(inOf){
          let locatio=inOf.substring(0,inOf.indexOf("#")+1)+"/order";
                  	if(inOf.indexOf("#")!==-1){
                  	  window.location.href=locatio
                    }else{
                  	 window.location.href="https://wechat.dingdingkuaixiu.com/#/order"
                  	}
}
export function getCurrentUrl(){
     let indexPath=window.location.href.indexOf("#/")+2;
     return window.location.href.substring(0,indexPath);
}
export function UrlSearch(){
  let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
  str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
  let arr=str.split("&"); //各个参数放到数组里
  for(let i=0;i < arr.length;i++){
    num=arr[i].indexOf("=");
    if(num>0){
      name=arr[i].substring(0,num);
      value=arr[i].substr(num+1);
      this[name]=value;
    }
  }
}
