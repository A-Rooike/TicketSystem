<template>
  <div>
    <div class="bigcontent">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldpass">
          <el-input v-model="ruleForm.oldpass"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" placeholder='请输入6-16位密码，建议数字和字母组合'></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"  placeholder='请再次输入您的密码'></el-input>
        </el-form-item>
        <el-form-item >
        <el-button type="primary" class="submit" @click="submit('ruleForm')">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CryptoJS from "crypto-js";
import {setCookie,getCookie,delCookie} from '../../../api/cookie'
export default {
  data() {
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
      ruleForm:{
        oldpass:'',
        pass:"",
        checkPass:""
      },
      rules:{
        oldpass: { required: true, message: '请输入原密码', trigger: 'blur' },
        pass: [{ validator: validatePass, trigger: 'blur' },{min:6,max:16,message:'密码格式错误，请重新输入！'}],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      }
    }
  },
  methods: {
    submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let phonenumber = JSON.parse(getCookie('LOG')).PHNB
            let bytes = CryptoJS.AES.decrypt(phonenumber,'gly')
            let originText = bytes.toString(CryptoJS.enc.Utf8);//手机号码
            console.log(originText);
            // console.log(phonenumber);
             axios.get(`http://localhost:8080/changePass?phonenumber=${originText}&password=${this.ruleForm.oldpass}&newpassword=${this.ruleForm.checkPass}`).then(
               res=>{
                 if(res.data=='原密码错误！'){
                   this.$message.error('原密码错误！');
                 }else if(res.data == '密码修改成功！'){
                    this.$message({
                      message: '密码修改成功！',
                      type: 'success'
                    });
                 }
               }
             )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  },
}
</script>

<style lang="less" scoped>
.bigcontent{
  width: 500px;
  height: 300px;
  // border: 1px solid #000;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
  .submit{
    width: 200px;
  }
}
</style>