import { Indicator } from 'mint-ui';
import {removerStorage} from "@/js/session"
// import common from "@/js/baseHttp";
//其他环境支付 start
export function getPaymentParams(obj,_this,getOpenID){
        Indicator.open('正在请求支付请稍后');
        let url1=common.predictDomain+"/fapayjournalaccount/payorder",
          param={openId:getOpenID,orderId:obj.orderID,payType:"1",token:obj.token,userInfoDiscountId:obj.userInfoDiscountId};
          _this.$http.post(url1,param).then(res=>{
          Indicator.close();
          let data = res.data;
          if(data.code==="0000"){
              Indicator.close();
              let re=data.result;
              onBridgeReady(
                 {
                    appid:re.appid,
                    timestamp:JSON.stringify(re.timestamp),
                    nonce_str: re.nonce_str,
                    package:re.package,
                    signType:re.signType,
                    paySign:re.paySign
                 },function(res){
                        let url = decodeURIComponent(obj.urlPath);
                        removerStorage("fullName");
                        if(res.err_msg === "get_brand_wcpay_request:ok") {
                           window.location.href=`${url}order`;
                          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        }else{
                            window.location.href=`${url}order`;
                        }
                  }
                 );
          }else{
            Indicator.close();
            Toast(data.error);
          }
      });
      }
//其他环境支付 end

//正式环境支付 start
export function formalDefray(obj,_this){
  Indicator.open('正在请求支付请稍后');
 const url=`${common.apidomain}/fapayjournalaccount/payorder`;
  _this.$http.post(url,obj.param).then(res => {
    Indicator.close();
    let data = res.data;
    if (data.code === "0000") {
        Indicator.close();
        let re = data.result;
        Indicator.close();
       onBridgeReady(
          {
            appid: re.appid,
            timestamp: JSON.stringify(re.timestamp),
            nonce_str: re.nonce_str,
            package: re.package,
            signType: re.signType,
            paySign: re.paySign
          },function(res){
              removerStorage("fullName");
              if(res.err_msg === "get_brand_wcpay_request:ok") {
                 window.location.href= `${common.pathDomain}/#/order`;
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              }else{
                  window.location.href=`${common.pathDomain}/#/order`;
              }
          }
  )
    } else {
      Indicator.close();
      Toast(data.error);
    }
  })
}
//正式环境支付  end
//判断是否是微信运行在微信小程序上 
  export function checkIsFromMiniProgram (params=null){
    let isMiniProgram=false;
    wx.miniProgram.getEnv(res=>{
     isMiniProgram = res.miniprogram
    })
    if(!!params) wx.miniProgram.navigateTo({url:`/pages/affirmorder/affirmorder?orderId=${params.orderId}&token=${params.token}`});
    return isMiniProgram;
  }
// 微信小程序支付 start

// 微信小程序支付 end

export function onBridgeReady(obj,callback){              
    //启用微信内置函数 发起支付
         WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
          "appId":obj.appid,     //公众号名称，由商户传入
          "timeStamp":obj.timestamp,         //时间戳，自1970年以来的秒数
          "nonceStr":obj.nonce_str, //随机串
          "package":obj.package,
          "signType":obj.signType,         //微信签名方式：
          "paySign":obj.paySign //微信签名
          // "key": obj.key                 //商户krey;
      },callback)
}