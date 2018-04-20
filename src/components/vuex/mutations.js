import {setSessionUserInfo,getSessionUserInfo} from "@/js/session"

export let mutations = {
    increment(state, name) {
        state.name = name
    },
    revisePOSITION(state, value) {
        state.revisePosition = value;
    },
    changeComment(state, name) {
        state.masterInfo = name;
    },
    changeOrder(state, name) {
        state.orderDetails = name;
    },
  changeCurrent_option(state,name){
    state.current_option=name;
  },
    yuDatetime(state, date) {
        state.yuDate = date;
    },
    addPosition(state, data) {
        state.previPosition = data;
        let getSaverData = getSessionUserInfo("addServer")||{};
        getSaverData.previPosition=data;
        setSessionUserInfo("addServer",getSaverData)
    },
  changeDiscountFacevalue(state,data){
    state.discountFacevalue=data
  },
    changePath(state, data) {
        state.path = data;
    },
    changePaths(state,data){
      state.paths=data;
    },
  changeIsSuperposition(state,data){
        state.isSuperposition=data;
  },
    changeLoginPath(state,data){
        state.loginPath=data;
         let getSaverData = getSessionUserInfo("addServer")||{};
        getSaverData.loginPath=data;
       	setSessionUserInfo("addServer",getSaverData)
    },
    changeAddServerPath(state,data){
        state.addServerPath=data;
         let getSaverData = getSessionUserInfo("addServer")||{};
       	getSaverData.addServerPath=data;
       	setSessionUserInfo("addServer",getSaverData)
    },
  changeCouponText(state,data){
    state.couponText=data
  },
  changeOrderSelected(state,data){
    state.orderSelected=data;
  },
  changeUserInfoDiscountId(state,data){
    state.userInfoDiscountId=data
  },
  changeWebsiteBusiness(state,data){
    state.websiteBusiness=data
  },
  pushAddressObjData(state,data){   //改变新增地址之前的数据；
    state.addressObjData=data;
  },
  pushEditObjDataRess(state,data){
    state.editObjDataRess=data;
  },
  changeSaverId(state,data){
    state.saverId=data;
  },
  homeEnter(state){
  	state.isHomeEnter=true;
  }
}
