
import {getLocalStorage,removerStorage} from "@/js/session"
import {setCookie,getCookie,getOpenID} from "@/js/cookie"
 import { Indicator } from 'mint-ui';
export function isPosition(_this,common){
	if(getLocalStorage("OPTION").length>0){
	        if(getCookie()){
              let url=common.apidomain+"/userSite/findlistUserSite?token="+getCookie();
                _this.$http.get(url).then(res=>{
                  let data=res.data,list,flag=false;
                  if(data.code==="0000"){
                    Indicator.close();
                    list=data.result;
                    list.forEach(v=>{
                      if(v.id === getLocalStorage("OPTION")[0].id){
                              flag=true;
                      }
                    });
                    if(!flag){
                      removerStorage("OPTION");
                      _this.positionInfo=[{"linkmanDetails":"请选择服务地址"}]
                    }
                  }
                });
            }else{
              removerStorage("OPTION");
              _this.positionInfo=[{"linkmanDetails":"请选择服务地址"}]
          }
          }
}
