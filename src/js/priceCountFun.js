export function priceCount(_this){
  let price=0;
  if(_this.dataPriceList.length!==0){
    let dataList=_this.dataPriceList[0].serviceInfo;
    if(dataList.isSecondPayment==="0"){  //一次付款；       1二次付款   0一次付款
      _this.pirText=_this.priceText[1];
      // price+=(dataList.price1-0)+(dataList.price2-0)*dataList.price2Discount
      price+=(dataList.price1-0)+dataList.price2DiscountFee
    }else if(dataList.isSecondPayment==="1"){
      price=dataList.price1;
      _this.pirText=_this.priceText[0];
    }
    if(JSON.stringify(price).indexOf(".")!==-1){
      let s=JSON.stringify(price).indexOf(".")+3;
      _this.sum=JSON.stringify(price).substring(0,s)
    }else{
      _this.sum=price
    }
  }
}
