<template>
  <div>
       <div class="c_help">
        <img src="../../../assets/img/tuanzi.jpg" alt="" class="logo" @click="toHome">
        <span class="sawLine"></span>
        <span class="logi">{{name}}</span> 
      </div>
      
  </div>
</template>

<script>
export default {
    props:['name'],
    methods: {
      toHome(){
        this.$router.push({
          path:'/home'
        })
      }
    },
}
</script>

<style lang="less" scoped>

   .c_help{
     margin-left: 150px;
       height: 60px;
      width: 182px; 
      .sawLine {
        border-right: 1px solid #cccc;
        padding: 10px;
        position: relative;
        top: 19px;
      }
      .logo{
        width: 110px;
        height: 60px;
        cursor: pointer;
        // position: relative;
        // top: 5px;
        float: left;
      }
      .logi{
        float: right;
        line-height: 60px;
      }
    }
 
</style>