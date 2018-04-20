export var _this;
export function Fn(v){
  _this=v;
}
export function isWeixin(){
	var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    return true
                }else{
              			return false
                }
}

//测试版本 支付


