export function changeDate(_this){
	var day1,yue,ri,s1,day2,s2,day3,s3,day4,s4,day5,s5,
    day6,s6,
    day7,s7,
    day8,s8,
    str="",i=0;
    day1 =new Date();
          _this.current=day1;
           yue=day1.getMonth()+1;
           ri=day1.getDate();
           day1=new Date();
          day1.setTime(day1.getTime());
           s1=day1.getFullYear()+"-"
           + (day1.getMonth()+1>9?day1.getMonth()+1:0+""+(day1.getMonth()+1)) +
            "/" + (day1.getDate()>9?day1.getDate():0+""+(day1.getDate()) )
            day2=new Date();

          day2.setTime(day2.getTime()+24*60*60*1000);
         s2=day2.getFullYear()+"-"
           + (day2.getMonth()+1>9?day2.getMonth()+1:0+""+(day2.getMonth()+1)) +
            "/" + (day2.getDate()>9?day2.getDate():0+""+(day2.getDate()) )
           day3=new Date();

          day3.setTime(day3.getTime()+48*60*60*1000);
         s3=day3.getFullYear()+"-"
           + (day3.getMonth()+1>9?day3.getMonth()+1:0+""+(day3.getMonth()+1)) +
            "/" + (day3.getDate()>9?day3.getDate():0+""+(day3.getDate()) )

           day4=new Date();

          day4.setTime(day4.getTime()+72*60*60*1000);
         s4=day4.getFullYear()+"-"
           + (day4.getMonth()+1>9?day4.getMonth()+1:0+""+(day4.getMonth()+1)) +
            "/" + (day4.getDate()>9?day4.getDate():0+""+(day4.getDate()) )

           day5=new Date();

          day5.setTime(day5.getTime()+96*60*60*1000);
     	 s5=day5.getFullYear()+"-"
           + ((day5.getMonth()+1)>9?(day5.getMonth()+1):0+""+(day5.getMonth()+1))+
            "/" + (day5.getDate()>9?day5.getDate():0+""+(day5.getDate()) )

          day6=new Date();
          day6.setTime(day6.getTime()+120*60*60*1000)
          s6=day6.getFullYear()+"-"+((day6.getMonth()+1)>9?(day6.getMonth()+1):0+""+(day6.getMonth()+1))+"/"+ (day6.getDate()>9?day6.getDate():0+""+(day6.getDate()) )


          day7=new Date();
          day7.setTime(day7.getTime()+144*60*60*1000);
          s7=day7.getFullYear()+"-"+((day7.getMonth()+1)>9?(day7.getMonth()+1):0+""+(day7.getMonth()+1))+"/"+ (day7.getDate()>9?day7.getDate():0+""+(day7.getDate()) )

              _this.timeList[0].time=s1.substring(5);
              _this.timeList[1].time=s2.substring(5);
              
              _this.timeList[2].name=getDat(day3.getDay());
              _this.timeList[2].time=s3.substring(5);

              _this.timeList[3].name=getDat(day4.getDay());
              _this.timeList[3].time=s4.substring(5);

              _this.timeList[4].name=getDat(day5.getDay());
              _this.timeList[4].time=s5.substring(5);

              _this.timeList[5].name=getDat(day6.getDay());
              _this.timeList[5].time=s6.substring(5);

              _this.timeList[6].name=getDat(day7.getDay());
              _this.timeList[6].time=s7.substring(5);

  function getDat(week){

            if (week == 0) {
                      str = "周日";
              } else if (week == 1) {
                      str = "周一";
              } else if (week == 2) {
                      str = "周二";
              } else if (week == 3) {
                      str = "周三";
              } else if (week == 4) {
                      str = "周四";
              } else if (week == 5) {
                      str = "周五";
              } else if (week == 6) {
                      str = "周六";
              }
              return str;
          }

            _this.date.push(s1);
            _this.date.push(s2);
            _this.date.push(s3);
            _this.date.push(s4);
            _this.date.push(s5);
            _this.date.push(s6);
            _this.date.push(s7);
             for(i=0;i<21;i++){
              _this.isErr.push(true);
            }
}
export let dateList=[
                "09:00~10:00",
                "10:00~11:00",
                "11:00~12:00",
                "12:00~13:00",
                "13:00~14:00",
                "14:00~15:00",
                "15:00~16:00",
                "16:00~17:00",
                "17:00~18:00",
                "18:00~19:00",
                "19:00~20:00",
              ];
export function computePrice(_this){
  let price=0,newArrPier=[];
  if(_this.dataList.length===0)return _this.sumpric=0;
  _this.dataList.forEach((e,i)=>{

    if(e.isSecondPayment==="0"){  //一次付款；       1二次付款   0一次付款
      price+=(e.price2-0)*e.price2Discount*(e.size-0)
    }else if(e.isSecondPayment==="1"){
      newArrPier.push(e.price1);
    }
  });
  if(_this.dataList[0].isSecondPayment==='0'){
    price+=_this.dataList[0].price1;
  }
  if(_this.dataList[0].isSecondPayment==="1"){
    Array.max = function( array ){
      return Math.max.apply( Math, array);
    };
    price=Array.max(newArrPier);
  }
  if(JSON.stringify(price).indexOf(".")!==-1){
    let s=JSON.stringify(price).indexOf(".")+3;
    _this.sumpric=JSON.stringify(price).substring(0,s)  //价格
  }else{
    _this.sumpric=price
  }
}
