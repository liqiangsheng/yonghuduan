export function autoiscroll(obj) {
    var sum = 0;
    var li = obj.ul.getElementsByTagName("li");
        for (var i = 0; i < li.length; i++) {
            sum += li[i].offsetHeight;
    }
        obj.ul.style.height = sum + "px";
        var startY, moverY, ulY, currentY,step=0,step=0;
    setInterval(function(){
        step--;
        obj.ul.style.top=step*30+"px";
        obj.ul.style.transition="top .3s ease"
        if(Math.abs(step)==li.length){
            step=1;
            obj.ul.style.transition="none";
            obj.ul.style.top="0px";
        }
    },5000);
}