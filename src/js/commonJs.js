import {setSession,getSession} from "@/js/session"
export default {
  getPosition(){
    let current=remote_ip_info['city']+"市";
    if(getSession()[0]){
        current=getSession()[0].name;
    }
    let positionUrl=`${this.$common.apidomain}/areainfo/findOneForName?name=${current}`;
    this.$http.get(positionUrl).then(res=>{
      let data2=res.data.result;
      if(!data2){
        this.$http.get(this.$common.apidomain+"/areainfo/findOneForName?name=深圳市").then(res=>{
          let data=res.data.result;
          setSession(data);
          this.current_option = getSession()[0];
          this.$store.commit("changeCurrent_option",getSession()[0]);
        });
      }else{
        setSession(data2);
        this.current_option =  getSession()[0];
        this.$store.commit("changeCurrent_option",getSession()[0])
      }
    });
  },
  filterTitle(state){
    if(state==="001"){
        return "家电清洗"
    }else if(state==="002"){
      return "家电维修"
    }else if(state==="003"){
      return "手机维修"
    }else if(state==="004"){
      return "家居维修"
    }else if(state==="005"){
      return "开锁修锁"
    }else if(state==="006"){
      return "管道疏通"
    }else if(state==="007"){
      return "灯具线路"
    }else if(state==="008"){
      return "卫浴洁具"
    }else if(state==="009"){
      return "安装服务"
    }
  },
   isIosSystem () {
	    let u = navigator.userAgent, app = navigator.appVersion,
	    	  isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    		return !!isIOS?true:false;
    
			}
};


