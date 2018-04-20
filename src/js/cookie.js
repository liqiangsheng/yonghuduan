import VueCookie from "vue-cookie"
export function setCookie(tocken){
  VueCookie.set("tocken",tocken,1);
}
export function getCookie(){
  if(VueCookie.get("tocken")===""||!VueCookie.get("tocken")){
    return false;
  }else{
    return VueCookie.get("tocken");
  }
}
export const KEY = "OPENID";

export function setOpenID(value) {
  var jsonString = localStorage.getItem(KEY);
  jsonString = jsonString || "[]";
  localStorage.setItem(KEY, JSON.stringify([value]));
}
export function getOpenID() {
  var jsonString = localStorage.getItem(KEY);
  jsonString = jsonString || "[]";
  return JSON.parse(jsonString)[0]
}
