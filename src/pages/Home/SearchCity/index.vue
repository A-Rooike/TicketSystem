<template>
  <div class="main">
    <!--背景图 -->
    <div class="carousel">
      <el-carousel indicator-position="outside" height="400px">
        <el-carousel-item v-for="item in 3" :key="item">
          <img :src="require(`../../../assets/img/P${item}.png`)" alt="" class="pic">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="go">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="出发城市" prop="originvalue">
          <input v-model="ruleForm.originvalue" placeholder="请输入内容" @click="showCity" @input="changeCity" class="cityinput"/>
        </el-form-item>
        <el-form-item label="到达城市" prop="arrivevalue">
          <input v-model="ruleForm.arrivevalue" placeholder="请输入内容" @click="showCity1" @input="changeCity1" class="cityinput"/>
        </el-form-item>
        <el-form-item label="出发日期" prop="time">
          <el-date-picker
          v-model="ruleForm.time"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submitForm('ruleForm')">立即搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gocity" v-show="showcity">
        <div class="city_item" v-for="(item,index) in citys" :key=index>
          <div class="centertitle">{{item.provinceName}}</div>
          <ul>
            <li v-for="(item2,index) in item.citys" :key=index @click="chosecity($event)">{{item2.citysName}}</li>
          </ul>
        </div>
    </div>
    <div class="gocity1" v-show="showcity1">
        <div class="city_item" v-for="(item,index) in citys" :key=index>
          <div class="centertitle">{{item.provinceName}}</div>
          <ul>
            <li v-for="(item2,index) in item.citys" :key=index @click="chosecity1($event)">{{item2.citysName}}</li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import {setCookie,getCookie,delCookie} from '../../api/cookie'
export default {
  data(){
    return{
        citys:[],
        showcity:false,
        showcity1:false,
        options: [],
        list: [],//城市列表
        loading: false,
        ruleForm:{
          time:'',
          originvalue:'',
          arrivevalue:''
        },
        rules:{
          time:[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
          arrivevalue:[{ required: true, message: '请选择到达城市', trigger: 'blur' }],
          originvalue:[{ required: true, message: '请选择出发城市', trigger: 'blur' }],
        },
        pickerOptions0: {
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let fifteen = 15 * 24 * 3600 *1000;
            let fifteenDay = curDate + fifteen;
            return time.getTime() < Date.now()-8.64e7 || time.getTime() > fifteenDay ;
          }
        },  
    }
  },
  methods:{
    remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 100);
        } else {
          this.options = [];
        }
    },
    //时间转化
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
    //立即搜索
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            //将搜索数据存入缓存
            let SearchInfo = {}
            SearchInfo.time=this.ruleForm.time
            SearchInfo.originvalue=this.ruleForm.originvalue
            SearchInfo.arrivevalue=this.ruleForm.arrivevalue

            window.localStorage.setItem('SearchInfo',JSON.stringify(SearchInfo))
            this.$router.push({
              path:'/tickit'
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      // //时间转化
      // console.log(this.dateFormat(this.time));
      // console.log(new Date(this.dateFormat(this.time)));
      // this.time = new Date(this.dateFormat(this.time))

    },
    //点击搜索
    showCity(){
      this.showcity=true
      this.showcity1=false
    },
    showCity1(){
      this.showcity1=true
      this.showcity=false
    },
    changeCity(){
      this.showcity=false
    },
    changeCity1(){
      this.showcity1=false
    },
    //选择城市
    chosecity(e){
      this.ruleForm.originvalue=e.target.innerText;
      this.showcity=false
    },
    chosecity1(e){
      this.ruleForm.arrivevalue=e.target.innerText;
      this.showcity1=false
    }
  },
  mounted(event){
    const app = require('../../../assets/MrLiang_citys.json')
    console.log(app);
    this.citys=app.provinces;
  } 
}
</script>

<style lang="less" scoped>
  .main{
    position: relative;
  }
  .go{
    border: 1px solid #000;
    border-radius: 5px;
    width: 420px;
    height: 300px;
    position: absolute;
    top: 47px;
    left: 150px;
    z-index: 10;
    background: white;
  }
  .cityinput{
    width: 220px;
    height: 40px;    
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .cityinput:focus{
    border-color: #409EFF;
    outline: 0;
  }
  .demo-ruleForm{
    margin-top: 20px;
  }
  .el-button{
    width: 220px !important;
  }
  .pic{
    width: 100%;
    height: 100%;
  }
  .gocity{
    width: 320px;
    height: 300px;
    position: absolute;
    top: 109px;
    left: 251px;
    overflow-y: scroll;
    z-index: 15;
    background: #fff;
    padding: 10px 5px 0 10px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
  }
  .gocity1{
    width: 320px;
    height: 300px;
    position: absolute;
    top: 171px;
    left: 251px;
    overflow-y: scroll;
    z-index: 15;
    background: #fff;
    padding: 10px 5px 0 10px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
  }
  .city_item{
    float: left;
    width: 100%;
    ul{
      float: right;
      padding: 0;
      margin: 0;
      width: 75%;
       li{
        list-style: none;
        font-size: 12px;
        line-height: 20px;
        float: left;
        margin-right: 10px;
        color: #547790;
        margin-bottom: 5px;
        cursor: pointer;
      }
    }
    .centertitle{
      float: left;
      width: 60px;
      font-size: 13px;
      height: 100%;
    }
  }
  
 
  
</style>