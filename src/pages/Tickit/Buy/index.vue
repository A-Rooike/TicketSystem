<template>
  <div class="all">
    <div class="mian">
      <div class="top">
        <el-steps :active="active">
          <el-step title="步骤 1" description="填写车票订单信息"></el-step>
          <el-step title="步骤 2" description="确认并支付订单"></el-step>
          <el-step title="步骤 3" description="完成订单"></el-step>
        </el-steps>
      </div>
      <div class="active1" v-if="active==1">
        <div class="center_left">
        <div class="left_top">
          <div class="top_title">车票信息</div>
          <div class="top_bottom">
            <div class="b_time alldiv">
              <div class="date_time">{{dateFormat(item.times)}}</div>
              <div class="detail_time">{{item.detailtime.slice(0,5)}}</div>
            </div>
            <div class="b_city alldiv">
              <span class="begin">始</span>
              <span class="city">{{item.originvalue}}</span>
              <span class="icon"></span>
              <span class="city">{{item.arrivevalue}}</span>
              <span class="arrive">终</span>
            </div>
            <div class="b_type alldiv">
              <span>固定班</span>
              <span>{{item.type}}</span>
            </div>
          </div>
        </div>
        <div class="letf_center">
          <div class="center_title">乘车人信息</div>
          <div class="padding"></div>
          <div class="info" v-for="(item,index) in ruleForm.userinfo" :key=index>
            <span class="info_id">{{item.id}}</span>
            <el-form :model="item" :rules="rules" :ref="'ruleForm'+item.id" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="item.name" class="input"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码" prop="idnumber" class="ml">
                <el-input v-model="item.idnumber" class="input"></el-input>
              </el-form-item>
              <el-form-item>
                <el-link type="danger" class="del" @click="delPerson(item.id)">删除</el-link>
              </el-form-item>
            </el-form>
          </div>
          <div class="add_person">
            <el-button type="primary" class="btn_add" @click="addPerson">添加乘车人</el-button>
            <span class="add_font">一张订单最多可以购买5张车票</span>
          </div>
        </div>
        <div class="letf_bottom">
          <div class="bottom_title">取票人信息
            <span class="title_font">先取票后乘车，建议提前1小时（节假日高峰建议提前2小时）到出发站取票</span>
          </div>
          <div class="bottom_phone">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone" class="phoneinput" ></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="success" class="submit" @click="submit(0)">提交订单</el-button>
              </el-form-item>
            </el-form>
           
          </div>
        </div>
        <div class="submit"></div>
        </div>
        <div class="center_right">
          <Attention type=2 />
        </div>
      </div>
      <div class="active2" v-if="active==2">
        <div class="act_title">{{item.originvalue}}车站 — {{item.arrivevalue}}车站 
          <div class="price">
            应付金额
            <span class="monsy">￥{{item.price}}</span>
          </div>
        </div>
        <div class="detai">
          <div class="bianhao">订单编号: {{dingdan || item.id}}</div>
          <div class="gotime">出发时间: {{item.times}} {{item.detailtime.slice(0,5)}}</div>
        </div>
        <el-button type="success" class="subdingdan" @click="pay">支付订单</el-button>
      </div>
      <div class="active3" v-if="active==3">
        <el-empty description="订单提交成功！请前往个人中心查看订单详情" :image="imgurl"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import  Attention  from '../Attention';
import CryptoJS from "crypto-js";
import {setCookie,getCookie,delCookie} from '../../../api/cookie'
export default {
  components:{
    Attention
  },
  name:'buy',
  data() {
    return {
      imgurl:require(`@/assets/img/sucess.png`),
      item:[],
      active:1,
      ruleForm:{
        phone:'',
        userinfo:[
          {id:1,name:'',idnumber:''}
        ]
      },
      rules:{
        name:{ required: true, message: '请输入乘客姓名', trigger: 'blur' },
        idnumber:{ required: true, validator: this.checkIdNum, trigger: 'blur'  },
        phone:{ required: true, validator: this.isCellPhone, trigger: 'blur'}
      },
      dingdan:''
    }
  },
  methods: {
    //检查身份证号码
    checkIdNum(rule, value, callback) {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!value) {
        return callback(new Error('证件号码不能为空'))
      } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'))
      } else {
        callback()
    }
    },
    // 检查手机号码
    isCellPhone (rule, value, callback) {
      if (!value) {
         return callback(new Error('手机号码不能为空'))
      } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        return callback(new Error('手机号码不正确'))
      } else {
        callback()
      }
    },
    dateFormat(dateData) {
      var date = new Date(dateData)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      const time = y + '-' + m + '-' + d
      return time
    },
    //添加人员
    addPerson(){
      if(this.ruleForm.userinfo.length==5){
        this.$message({
          type:'warning',
          message:'最多添加5个乘车人！',
          showClose: true
        })
      }else{
         let p ={}
        p.id=this.ruleForm.userinfo.length+1;
        p.name=''
        p.idnumber=''
        let temp=this.ruleForm.userinfo
        temp.push(p)
        temp.forEach((ele,index)=>{
          ele.id=index+1
        })
        this.ruleForm.userinfo = temp
      }
     
    },
    //删除人员
    delPerson(id){
      let temp = this.ruleForm.userinfo
      if(temp.length==1){
        this.$message({
          showClose: true,
          message: '请确保至少有一个乘客！',
          type: 'warning'
        })
      }else{
        temp.forEach((ele,index)=>{
          if(ele.id==id){
            temp.splice(index, 1);
          }
        })
        temp.forEach((ele,index)=>{
          ele.id=index+1;
        })
      }
    },
    // 提交订单
    submit(flag){
      //判断信息是否完整
      const length = this.ruleForm.userinfo.length
      console.log(this.$refs,'@');
      for(let i =0 ;i<length ;i++){
        let rulefrom = 'ruleForm' + (i+1)
        console.log(rulefrom);
        this.$refs[rulefrom][0].validate((valid) => {
          if (valid) {
            flag++;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            flag++;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      //信息完整
      if(length+1 == flag){
        // let originvalue = this.item.originvalue
        // let arrivevalue = this.item.arrivevalue
        // let time = 
        // let detailtime = this.item.detailtime
        // let phonenumber = this.ruleForm.phone
        let carinfo = this.item
        carinfo.times=this.dateFormat(this.item.times)
        carinfo.phonenumber = this.ruleForm.phone
        carinfo=JSON.stringify(carinfo)
        let userinfo = JSON.stringify(this.ruleForm.userinfo)
        axios.get('http://localhost:8080/order',{
          params:{
            carinfo,userinfo
          }
        }).then(
          res=>{
            console.log(res);
            if(res.data=='rejected!'){
              this.$message({
                 message: '该手机号已经存在相同的订单！请前往个人中心查看',
                type: 'warning'
              })
            }else{
              this.dingdan = res.data
              this.active = 2;
            } 
          },
          err=>{}
        )
        // this.active=2
      }
   
  
    },
    //获取个人中心的手机号码
    getphonenumber(){
      let phonenumber = JSON.parse(getCookie('LOG')).PHNB
      let bytes = CryptoJS.AES.decrypt(phonenumber,'gly')
      return bytes.toString(CryptoJS.enc.Utf8);//手机号码
    },
    //支付订单
    pay(){
      let carinfo = this.item
      carinfo.times=this.dateFormat(this.item.times)
      carinfo.phonenumber = this.ruleForm.phone || this.getphonenumber()
      carinfo.dingdan = this.dingdan || this.item.id
      carinfo=JSON.stringify(carinfo)
      console.log(carinfo);
       axios.get(`http://localhost:8080/pay?carinfo=${carinfo}`).then(
         res=>{
           console.log(res);
           if(res.data == '支付完成！'){
             this.$message({
                message: '订单支付完成！',
                type: 'success'
             })
             this.active=3
           }
         },
         err=>{}
       )
    }
  },
  created() {
    console.log(this.$route);
    let info = JSON.parse(window.sessionStorage.getItem('buy'))
    console.log(info);
    if(info.pay=='0'){
      this.item =JSON.parse(this.$route.query.item)
      this.active=2
    }else{
       this.active=1
       this.item =JSON.parse(this.$route.query.item)
    }
    
  },
}
</script>

<style lang="less" scoped>
  .all{
    padding-top: 20px;
    background: rgb(245,245,245);
    width: 100%;
    height: 800px;
    .mian{
      width: 1400px;
      background: rgb(245,245,245);
      margin: 0 auto;
      height: 100%;
      .top{
        width: 100%;
        height: 100px;
        background: white;
        padding: 20px 150px 0 150px;
        box-sizing: border-box;
      }
      .center_left{
        margin-top: 30px;
        width:1000px;
        background: rgb(245,245,245);
        float: left;
        .left_top{
          font-size: 18px;
          color: #333;
          background: white;
          height: 150px;
          padding: 30px 20px 0 20px;
          .top_title{
            height: 50px;
            border-bottom: 1px solid rgb(238,238,238);
          }
          .top_bottom{
            width: 100%;
            height: 100px;
            padding-top:12px ;
            padding-bottom: 15px;
            box-sizing: border-box;
            text-align: center;
          .alldiv{
            float: left;
            height: 100%;
            // text-align: center;
            border-right: 1px solid rgb(238,238,238);
            box-sizing: border-box;
          }
          .b_time{         
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #333;
            .date_time{
              font-size:14px;
            }
            .detail_time{
              font-size: 20px;
              font-weight: bolder;
            }
          }
          .b_city{
            width: 60%;
            .begin{
                background-color: #73d6c5;
                color: #fff;
                padding: 0 2px;
                font-size: 12px;
                height: 18px;
                line-height: 18px;
                border-radius: 4px;
                margin-right: 5px;
            }
            .icon{
              display: inline-block;
              width: 100px;
              height: 45px;
              background: url('../../../assets/img/personal_to.png') no-repeat center center;
              position: relative;
              top: 14px;
            }
            .arrive{
              background-color: #f28c8c;
              color: #fff;
              padding: 0 2px;
              font-size: 12px;
              height: 18px;
              line-height: 18px;
              border-radius: 4px;
              margin-left: 5px;    
            }
            .city{
              font-size: 20px;
              line-height: 30px;
            }
          }
          .b_type{
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
             color: #333;
             font-size: 14px;
          }
         }
        }
        .letf_center{
          margin-top: 5px;
          background: white;
          // height: 300px;
          padding: 30px 20px 40px 20px;
          .center_title{
            font-size: 18px;
            color: #333;
            height: 50px;
            border-bottom: 1px solid rgb(238,238,238);
          }
          .padding{
            height: 20px;
          }
          .info{
            padding: 0px 0 0px 0;
            width: 100%;
            .info_id{
              float: left;
              width: 20px;
              height: 20px;
              background-color: #bfd8f8;
              line-height: 20px;
              text-align: center;
              color: #fff;
              border-radius: 50%;
              font-size: 12px;
              margin-top: 10px;
            }
            .el-form-item{
              float: left;
              .del{
                margin-right: 135px;
              }
            }
            .ml{
              margin-left: 50px;
            }
          }
          .add_person{
            width: 100%;
            .btn_add{
              width: 200px;
            }
            .add_font{
              color: #9b9b9b;
              font-size: 14px;
              margin-left: 50px;
            }
          }
        }
        .letf_bottom{
          margin-top: 25px;
          background: #fff;
          width: 100%;
          // height: 500px;
          padding: 30px 20px 0 20px;
          box-sizing: border-box;
          .bottom_title{
            font-size: 18px;
            color: #333;
            height: 50px;
            border-bottom: 1px solid rgb(238,238,238);
            .title_font{
              margin-left: 20px;
              height: 26px;
              line-height: 26px;
              color: #018db2;
              border-radius: 26px;
              padding: 0 10px 0 29px;
              font-size: 14px;
              // background: #edf8ff;
              background: #edf8ff url(../../../assets/img/main_ico_prompt.png) no-repeat 8px center;
            }
          }
          .bottom_phone{
            padding: 20px 0 5px 0;
            .el-form-item{
              display: inline-block;
            .phoneinput{
              width: 200px;
            }
            .submit{
              width: 200px;
              margin-left: 300px;
            } 
          }
          }
          
        }
      }
      .center_right{
        float: right;
        width: 380px;
        height: 500px;
        background: white;
        margin-top: 30px;
      }
      .active2{
        margin-top: 20px;
        width: 100%;
        height: 230px;
        background: #fff;
        padding: 30px 20px 0 20px;
        box-sizing: border-box;
        .act_title{
          height: 50px;
          border-bottom: 1px solid rgb(238,238,238);
          font-size: 18px;
          color: #333;
          .price{
            float: right;
            font-size: 14px;
            color: #3e3e3e;
            font-weight: bold;
            position: relative;
            top: -10px;
            .monsy{
                  width: 93px;
                  height: 21px;
                  font-size: 28px;
                  font-family: MicrosoftYaHei-Bold;
                  color: rgba(255,116,3,1);
                  line-height: 40px;
                  font-weight: bold;                 
                  margin-right: 150px;
            }
          }
        }
        .detai{
          padding: 20px 0 0 0;
          font-size: 14px;
          color: #3e3e3e;
          .bianhao{
            margin-bottom: 15px;
          }
        }
        .subdingdan{
          // 
          margin-top: 20px;
          width: 200px;
          margin-left: 600px;
        }
      }
      .active3{
        width: 100%;
        background: #fff;
        height: 400px;
        margin-top: 30px;
      }
    }
  }
</style>