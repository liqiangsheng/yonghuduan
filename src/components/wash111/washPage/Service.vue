<template>
  <div id="service">
      <div v-html="pppppp" ref="html" class="imgActive">

     </div>


  </div>
</template>
<script>
export default {
  data(){
      return{
        pppppp : ''
      }
  },
  created(){
    console.log(this.$store.state.saverId)

      if(!this.$store.state.saverId){ //默认
        if(this.$route.params.id === "004" ){
            this.$store.state.saverId = "004001"
        }else if(this.$route.params.id === "008"){

          this.$store.state.saverId = "008001"

        }else if(this.$route.params.id === "001"){

          this.$store.state.saverId = "001001"

        }else if(this.$route.params.id === "009"){

          this.$store.state.saverId = "009001"

        }else if(this.$route.params.id === "007"){

          this.$store.state.saverId = "007001"

        }else if(this.$route.params.id === "006"){

          this.$store.state.saverId = "006001"

        }
    }

    let urL=this.$common.apidomain+"/articleinfo/findinfobyflabel?id="+this.$store.state.saverId;
      this.$http.get(urL).then(res=>{
        if(res.data.code==="0000"){
        this.pppppp = res.data.result.content;
        }else{
          this.$Toast(res.data.error);
        }
      })
  }
}
</script>
<style>
  .imgActive{
    width:100%;
  }
  .imgActive p{
    width:100%;
  }
  .imgActive p img{
    width: 100%;
  }
</style>
  <style scoped lang="less">
 #service{
   width: 750/50rem;
   position: absolute;
   left: 0;
   right: 0;
   top:163/50rem;
   background: #FFFFFF;
   bottom: 126/50rem;
   oerflow: hidden;
   }
 div{
   width: 100%;
   overflow-y: auto;
 }
</style>
