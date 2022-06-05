<template>
  <div>
    <div class="Top">
      <div class="left">
        <span class="go">让出行更简单</span>
      </div>
      <div class="right">
        
        <el-button type="primary" icon="el-icon-position"></el-button>
        <el-button type="primary" icon="el-icon-discover" ></el-button>
          <el-button type="primary" icon="el-icon-apple" ></el-button>
      </div> 
    </div>
    <div class="center">
      <div class="c_help">
        <img src="../../assets/img/tuanzi.jpg" alt="" class="logo" @click="toHome">
      </div>
      <el-link :underline="false" class="logo_font">汽车票务购买系统</el-link>
      <div class="c_login">
        <el-link type="primary" :underline="false" @click="toPerson" v-if="islogin">个人中心</el-link>
        <el-link type="primary" :underline="false" @click="toLogin" v-else>登录</el-link>
        <el-divider direction="vertical" ></el-divider>
        <el-link type="warning" :underline="false" @click="toregiste" v-if="!islogin">注册</el-link>
        <el-link type="warning" :underline="false" @click="outlogin" v-if="islogin">退出登录</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {setCookie,getCookie,delCookie} from '../../api/cookie'
export default {
  data() {
    return {
     islogin:'',
    }
  },
  computed:{
  },
  methods: {
    // 点击登录
    toLogin(){
      this.$router.push({
        path:'/login'
      })
    },
    //点击注册
    toregiste(){
      this.$router.push({
        path:'/register'
      })
    },
    toPerson(){
      this.$router.push({
        path:'/personal'
      })
    },
    toHome(){
      this.$router.push('/home')
    },
    outlogin(){
      delCookie('LOG')
      this.islogin = false
      this.$router.replace('/home')
    }
  },
  watch:{
    '$route'(to,from){
      let re = JSON.parse(getCookie("LOG"))
      this.islogin=re.ISLO
    }

  },
  created() {
    
   let re = JSON.parse(getCookie("LOG"))
   console.log(re);
   this.islogin=re.ISLO
  },
}
</script>

<style lang="less" scoped>

  .Top{
    width: 100%;
    height: 37px;
    background: rgb(244,244,244);
    display: flex;
    align-items: center;
    justify-content: space-around;
    .left{
      .go{
        font-size: 12px;
        margin-left: -120px;
      }
    }
    .right{
      margin-right: -120px;
      
      .el-button{
        width: 25px;
        height:25px;
        padding: 4px 0 0 0;

      }

    }
  
  }
  .center{
    display: flex;
    align-items: baseline;
    justify-content: space-around;
    height: 70px;
    .c_help{
      height: 100%;
      .logo{
        width: 150px;
        height: 60px;
        cursor: pointer;
        position: relative;
        top: 5px;
      }
    }
    .logo_font{
      color: black;
      font-size: 20px !important;
      margin-left: -150px;
    }
    .c_login{
      .el-link{
        font-size: 12px !important;
      }
    }
  }
  
  
</style>