export const KEY = "data";
export function setSession(value) {
    var jsonString = sessionStorage.getItem(KEY);
    jsonString = jsonString || "[]";
    sessionStorage.setItem(KEY, JSON.stringify([value]));
}
export function setSessionUserInfo(key,value){
  let jsonString = sessionStorage.getItem(key) || "{}";
  sessionStorage.setItem(key, JSON.stringify(value));
}
export function commonSetSession(key,value){
  let jsonString = sessionStorage.getItem(key) || "{}";
  sessionStorage.setItem(key, JSON.stringify(value));
}
export function getSessionUserInfo(key){
  let jsonString = sessionStorage.getItem(key) || false;
  return JSON.parse(jsonString);
}
export function setIsOpenId(key,value){
  let jsonString = sessionStorage.getItem(key);
  jsonString = jsonString || "[]";
  sessionStorage.setItem(key, JSON.stringify(value));
}
export function getIsOpenId(key){
  let jsonString = sessionStorage.getItem(key);
  jsonString = jsonString || false;
  return JSON.parse(jsonString)
}
export function getSession(key=KEY) {
  var jsonString = sessionStorage.getItem(key);
    jsonString = jsonString || "[]";
    return JSON.parse(jsonString)
}
export function setLocalStorage(key, value) {
    var jsonString = localStorage.getItem(key);
    jsonString = jsonString || "[]";
    var arr = JSON.parse(jsonString);
    arr.push(value);
    localStorage.setItem(key, JSON.stringify(arr));
}
export function getLocalStorage(key) {
    var jsonString = localStorage.getItem(key);
    jsonString = jsonString || "[]";
    return JSON.parse(jsonString)
}
export function removerStorage(key) {
    localStorage.removeItem(key,"[]")
}
export function setSize(key,value){
  localStorage.setItem(key, JSON.stringify(value));
}

export function setSessionQrcodeId(key,value){
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionQrcodeId(key){
  let jsonString=sessionStorage.getItem(key)|| "[]";
  return JSON.parse(jsonString)
}

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

