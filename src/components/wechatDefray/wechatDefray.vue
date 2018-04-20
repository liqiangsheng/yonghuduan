<template>
    <div id="box">
    </div>
</template>
<script>
    import {isWeixin} from "@/js/isWeixin";
    import {getPaymentParams} from "@/components/savertype/js/payment";
    import {getOpenID} from "@/js/cookie"
    import { Indicator } from 'mint-ui';
    import {UrlSearch} from "@/js/pathBack"
    let Request=new UrlSearch(); //实例化
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
      mounted(){
        Indicator.open('正在请求支付请稍后');
            setTimeout(()=>{
              if(isWeixin()){
                Indicator.close();
                let openID=getOpenID();
            		
                getPaymentParams(Request,this,openID);
              }
            },1000)

      },
        created() {

        }
    }
</script>
<style scoped lang="less">

</style>


