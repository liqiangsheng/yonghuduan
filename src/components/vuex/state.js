import {getSessionUserInfo} from "@/js/session"
export let state = {
    ramk:'',
    name: "",
    isHomeEnter:false,
    yuDate: "",
    previPosition:!!getSessionUserInfo("addServer").previPosition?getSessionUserInfo("addServer").previPosition:"/address",
    seaverType: "",
    masterInfo: "",
    couponText:"请选择优惠券",
    loginPath:!!getSessionUserInfo("addServer").loginPath?getSessionUserInfo("addServer").loginPath:"/",
    isSuperposition:1,
    discountFacevalue:0,
    userInfoDiscountId:"",
    orderDetails: {},
    current_option:{name:"深圳"},
    revisePosition: "",
    saverId:null,
    path: "/home",
    websiteBusiness:false,
    addServerPath:"/home",
    cancelOption: [
      {
        label: '不要这个服务了',
        value: '不要这个服务了'
      },
      {
        label: '信息填写错误，重新预约',
        value: '信息填写错误，重新预约'
      },
      {
        label: '临时有事时间无法安排',
        value: '临时有事时间无法安排'
      },
      {
        label: '师傅无法准时上门',
        value: '师傅无法准时上门'
      },
      {
        label: '师傅缺少工具或配件无法维修',
        value: '师傅缺少工具或配件无法维修'
      },
      {
        label: '产品标价不合理',
        value: '产品标价不合理'
      },
      {
        label: '其他',
        value: '0'
      }
    ],
    priceText:[
      "检测费",
      "应付款"
    ],
    paths:"o",
    classTitle:{
      "001":"家电清洗",
      "002":"家电维修",
      "003":"手机维修",
      "004":"家居维修",
      "005":"开锁修锁",
      "006":"管道疏通",
      "007":"灯具线路",
      "008":"卫浴洁具",
      "009":"安装服务"
    },
    addressObjData:[],
    editObjDataRess:null,
}
