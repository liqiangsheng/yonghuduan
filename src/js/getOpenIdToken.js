
  import {isWeixin} from "./isWeixin"
  import {setSessionUserInfo,setIsOpenId,getIsOpenId,getSessionUserInfo} from "./session"
  import {getOpenID,setOpenID} from "./cookie"
  import {setCookie,getCookie} from "./cookie"
  import {Toast} from 'mint-ui';

  let Request=new UrlSearch(); //实例化
  common.getRequest=Request;
  export function getToken(_this){
  let url=`${common.apidomain}/authCodeInfo/confirmIsLogin`,params,
      openUrl=`${common.apidomain}/authCodeInfo/gettoken?openid=${getOpenID()}`;
  _this.$http.get(openUrl).then(res=>{
    let data=res.data;
    setCookie("");
    setSessionUserInfo("userInfo",data.result);
    if(data.code==="0000"){
//验证 token start
      params={"openId":getOpenID(),"token":data.result.token};
      _this.$http.post(url,params).then(r=>{
        let data=r.data;
        if(data.code==='0000'){
          setSessionUserInfo("userInfo",data.result);
          setCookie(data.result.token);
        }
      })
//验证 token end
    }
  })
}
export function getOpenIdToken(_this){
//       setCookie("34B876AA10A4497196D954BDED6184BB")    //正式
//       setCookie("C5F12842D074462DB2CB121750766A3A")
//      setCookie("4E6B1510B1564F90B36D08A2C2FA29D3")
//   		setOpenID("")
    setOpenID("oxyN902bo4VF-o77hDaNJKbiB-i8");      //我的测试环境 openid;
  if(isWeixin()&&(getOpenID()===""||getOpenID()===undefined||!getOpenID())){       //判断是否为微信浏览器 并且openid为空
	            if(!_this.GetQueryString("code")){                                   //判断code 是否为空
	               setIsOpenId("isOpenKey",true);
	               let hrefPath=window.location.href,
                     url=UrlEncode(hrefPath);
                  window.location.href =`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${common.appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
                  return;
	            }
           if(_this.GetQueryString("code")&&getIsOpenId("isOpenKey")){
              let state=_this.GetQueryString("state"),code=_this.GetQueryString("code"),
               url=common.apidomain+"/authCodeInfo/getopenidbycode?code="+code+"&state="+state;
               _this.$http.get(url).then(res=>{
                let data=res.data;
                if(data.code==="0000"){
                    setOpenID(data.result);
                     getToken(_this);
                }else{
                  Toast(data.error);
                }
              });
            }
            return;
            }
            if(isWeixin()&&getOpenID()){
              //通过openID 拿到token   start
                  getToken(_this);
              //通过openID 拿到token   end
            }
      }
//获取url 地址参数 start
  export function UrlSearch(){
    let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
      num=arr[i].indexOf("=");
      if(num>0){
        name=arr[i].substring(0,num);
        value=arr[i].substr(num+1);
        this[name]=value;
      }
    }
  }
  //获取url 地址参数 end

//url 转码  start
      function str2asc(strstr){
        return ("0"+strstr.charCodeAt(0).toString(16)).slice(-2);
      }
      function UrlEncode(str){
        var ret="";
        var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
        var tt= "";
        for(var i=0;i<str.length;i++){
          var chr = str.charAt(i);
          var c=str2asc(chr);
          tt += chr+":"+c+"n";
          if(parseInt("0x"+c) > 0x7f){
            ret+="%"+c.slice(0,2)+"%"+c.slice(-2);
          }else{
            if(chr==" ")
              ret+="+";
            else if(strSpecial.indexOf(chr)!=-1)
              ret+="%"+c.toString(16);
            else
              ret+=chr;
          }
        }
        return ret;
      }
  //url 转码  end

