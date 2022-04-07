<template>
  <div>
    <el-row row:gutter="24" class="All">
      <el-col :span="14">
        <div class="left">
          <img src="../../assets/img/tuanzi.jpg" alt="" class="pic">
        </div>
      </el-col>
      <el-col :span="10" >
        <div class="right">
          <div class="r_from">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="" prop="phoneNUmber">
                <el-input v-model="ruleForm.phoneNUmber"  suffix-icon="el-icon-phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
               <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password suffix-icon='el-icon-lock'></el-input>
              </el-form-item>
              <el-form-item label="" prop="verifyCode">
               <el-input class="verify_css" placeholder="请输入4位验证码" v-model="ruleForm.verifyCode"></el-input>
                <!--关键 ↓-->
                <div id="v_container"></div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="login">立即登录</el-button>
              </el-form-item>
              <el-form-item>
                <div class="F_font">登录代表您同意我们的 <el-link type="primary" :underline="false">《用户隐私协议》</el-link>和<el-link type="primary" :underline="false">《软件服务协议》</el-link> </div>
              </el-form-item>
              <el-form-item>
                <el-link type="primary" :underline="false" class="registered" @click="toRegistere">立即注册</el-link>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GVerify } from '../../api/verifyCode';
import axios from 'axios'
import CryptoJS from "crypto-js";//加密
import {setCookie,getCookie,delCookie} from '../../api/cookie'
export default {
  data() {
     var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      console.log(value);
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!this.isCellPhone(value)) { // 引入methods中封装的检查手机格式的方法
        callback(new Error('请输入正确的手机号!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm:{
        phoneNUmber:'',
        password:'',
        verifyCode:''
      },
      rules:{
         phoneNUmber: [{required: true, validator: checkphone, trigger: 'blur'}],
         password:[{required:true,trigger:'blur'},  { min: 6,max: 15, message: '长度至少大于6个字符', trigger: 'blur' }],
         verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      verifyCode: null
    }
  },
  methods: {
    // 检查手机号码
    isCellPhone (val) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
        return false
      } else {
        return true
      }
    },
    // 点击登录
    submitForm (formName) {
      var that = this
    
      // 获取验证码
      var verifyCode = this.ruleForm.verifyCode
      var verifyFlag = this.verifyCode.validate(verifyCode)
      if (!verifyFlag) {
       this.$message({
          showClose: true,
          message: '验证码输入错误！',
          type: 'error'
        });
        return;
      }else{
        let ruleForm = this.ruleForm
        axios.get(`http://localhost:8080/login?phonenumber=${ruleForm.phoneNUmber}&password=${ruleForm.password}`).then(
          res=>{
            if(res.data=='登录成功！'){
              let ciperText = CryptoJS.AES.encrypt('15779665622','gly').toString();
              let p=JSON.stringify({PHNB:ciperText,ISLO:true})
              async function set(){
                await setCookie('LOG',p,10)
                that.$router.replace({
                  path:'/home'
                })
              }
              set()
            }
            if(res.data=='用户名或者密码错误！'){
              this.$message.error('用户名或者密码错误！');
            }
          },
          err=>{}
        )
      } 
    },
    // 去注册页面
    toRegistere(){
      this.$router.push({
        path:'/register'
      })
    }
  },
  mounted () {
    this.verifyCode = new GVerify('v_container')
  }
}
</script>

<style lang="less" scoped>
  .All{
    background: rgb(246,246,246);
    // height: 600px;
  }
  .left{
    // background: skyblue;
    // height:600px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .pic{
      width: 400px;
      height: 300px;
    }
  }
  .right{
    // background: red;
    // height:650px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
    .r_from{
      width: 400px;
      height: 370px;
      border: 1px solid rgb(220,223,230);
      border-radius: 4px;
      background: white;
      box-sizing: border-box;
      padding-top:50px ;
      padding-right: 25px;
      .el-form {
        margin-left: -55px;
        .login{
        width: 330px;
        }
        .F_font{
          font-size: 12px !important;
          margin-top: -15px;
          .el-link{
            font-size: 12px;
          }
        }
        .registered{
          float: right;
          margin-right:30px ;
          margin-top: -25px;
        }
        .verify_css{
          float: left;
          width: 150px;
        }
        #v_container{
          float: right;
          height:40px;
        }
      }
      
    }
  }
</style>