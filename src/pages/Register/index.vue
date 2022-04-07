<template>
  <div>
    <div class="main">
      <div class="center">
        <div class="top">
            <h4 class="title">用户注册</h4>
            <div class="t_login">已有已经注册好的账号，<span @click="toLogin">直接登录</span></div>
        </div>
        <div class="from">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号码" prop="phoneNUmber">
              <el-input v-model="ruleForm.phoneNUmber"  suffix-icon="el-icon-phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder='请输入6-16位密码，建议数字和字母组合'></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder='请再次输入您的密码'></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verifyCode">
              <el-input class="verify_css" placeholder="请输入4位验证码" v-model="ruleForm.verifyCode"></el-input>
              <!--关键 ↓-->
              <div id="v_container"></div>
            </el-form-item>
            <el-form-item class="xieyi">
              <el-checkbox v-model="checked"></el-checkbox><span>我已阅读并同意</span><span class="show_tip">《注册须知服务条款》《用户隐私条款》</span>和<span class="show_tip">《软件服务协议》</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleForm)" class="submit">立即注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { GVerify } from '../../api/verifyCode';

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
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      checked:'',
      ruleForm:{
        phoneNUmber:'',
        pass:'',
        checkPass:'',
        verifyCode:''
      },
      rules:{
        phoneNUmber: [{required: true, validator: checkphone, trigger: 'blur'}],
        pass: [{ validator: validatePass, trigger: 'blur' },{min:6,max:16,message:'密码格式错误，请重新输入！'}],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
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
    //跳转到登录
    toLogin(){
      this.$router.push({path:'/login'})
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
        axios.get(`http://localhost:8080/adduserInfo?phonenumber=${ruleForm.phoneNUmber}&password=${ruleForm.pass}`).then(
          res=>{
            console.log(res);
            if(res.data=='注册成功！'){
             this.$message({
              showClose: true,
              message: '注册成功！快前往登录吧!',
              type: 'success'
            });
            }else if(res.data='该用户已注册！'){
               this.$message({
                showClose: true,
                message: '注册失败！该用户已注册',
                type: 'error'
              });
            }
          },
          error=>{}
        )
      }   
    },
  },
  mounted () {
    this.verifyCode = new GVerify('v_container')
  }
}
</script>

<style lang="less" scoped>

.main{
  width: 100%;
  height: 800px;
  background: rgb(245,245,245);
  
  .center{
    width: 80%;
    height: 100%;
    background: white;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    .top{
      margin-top: 50px;
 
      .title{
        font-size: 22px;
        font-weight: normal;
         margin-left: 60px;
      }
      .t_login{
        font-size: 14px;
        margin-bottom: 15px;
        margin-left: 10px;
        span{
          color: rgb(25,137,250);
          cursor: pointer;
        }
      }
    }
    .from{
      width: 50%;

      margin-left: 150px;
      .el-input{
        width: 320px;
      }
      .verify_css{
        float: left;
        width: 150px;
      }
      #v_container{
        float: right;
        margin-right: 185px;
      }
      .xieyi{
        margin-left: -75px;
        .show_tip{
        color: rgb(25,137,250);
      }
      .el-checkbox{
        margin-right: 5px;
      }
      }
      .submit{
        width: 320px;
      }
    }
  }
}

</style>