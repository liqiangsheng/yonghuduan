export var _this;
import {Toast} from "mint-ui"
export function thFn(v){
  _this=v;
}
export let selectorFun={
  selectorType1(index,id,key){
    _this.i0=index;
    _this.childrenType1='';
    _this.childrenType2='';
    _this.childrenType3='';
    _this.i1="-1";
    _this.childrenType4='';
    _this.childrenType5='';
    _this.getOpen(id);
    if(key.d&&key.d!=""){
      _this.getData(id);
      _this.jsObjData=key;
      _this.isKongtiao=true;
      return;
    }
    if( key==undefined || key.d || key.beans==""){
      _this.isKongtiao=false;
      Toast("暂未开通该服务")
      _this.highAltitude=''
      return
    }
    if(key.d&&key.d!=""){
      console.log(key)
    }
    _this.faterKey=key;
    _this.childrenType1=key.beans;
    _this.title.push(key.c)
  },
     selectorType(index,id,key){
     this.i0=index;
     this.i1="-1";
     this.isKongtiao=false;
     this.isChildrenType(1);
     this.isNodes(id,key,1);
     this.getOpen(id);
   },

};
