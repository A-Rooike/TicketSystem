<template>
  <div class="content">
    <!-- search -->
      <div class="main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
          <el-form-item label="出发城市" prop="originvalue">
            <input v-model="ruleForm.originvalue" placeholder="请输入内容" @click="showCity" @input="changeCity" class="cityinput" :disabled="endorse.disable"/>
          </el-form-item>
          <el-form-item label="到达城市" prop="arrivevalue">
            <input v-model="ruleForm.arrivevalue" placeholder="请输入内容" @click="showCity1" @input="changeCity1" class="cityinput"
            :disabled="endorse.disable" />
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
            <el-button type="primary"  @click="submitForm('ruleForm')" class="btn">查询</el-button>
          </el-form-item>
        </el-form>
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
      <!-- show -->
      <div class="center">
        <div class="mian">
          <div class="place">
            <span class="title_font t">{{originvalue}}</span><div class="to_img"></div> <span class="title_font">{{arrivevalue}}</span>
          </div>
          <div class="title">
            <ul>
              <li style="width:130px">发车时间</li>
              <li style="width:300px">出发/到达</li>
              <li style="width:160px">班次类型</li>
              <li style="width:130px">票价</li>
              <li style="width:130px">余票</li>
              <li style="width:130px">操作</li>
            </ul>
          </div>
          <div class="detail" v-if="!loading">
            <ul>
              <li class="de_item" v-for="item in Tickets" :key='item.id'>
                <div class="time" style="width:130px">{{item.detailtime.slice(0,5)}}</div>
                <div class="go" style="width:300px">
                  <span class="go_top"><span class="begin">始</span>{{item.originvalue}}汽车站</span>
                  <span class="go_bottom"><span class="arrive">终</span>{{item.arrivevalue}}汽车站</span>
                </div>
                <div class="type" style="width:160px">
                  {{item.type}}
                  <div class="fix_class">固定班</div>
                </div>
                <div class="price" style="width:130px">￥{{item.price}}</div>
                <div class="reNumber" style="width:130px"><span class="renum">余</span>{{item.ticket}}</div>
                <div class="op" style="width:130px" v-if="!endorse.disable">
                  <el-button type="primary" v-if="item.ticket!=0" @click="toreser(item)" :disabled='item.overtime' >预定</el-button>
                  <el-button  type="info" disabled v-else>无票</el-button>
                </div>
                <div class="op" style="width:130px" v-if="endorse.disable">
                  <el-button type="primary" v-if="item.ticket!=0" @click="toendorse(item)" :disabled='item.overtime' >改签</el-button>
                  <el-button  type="info" disabled v-else>无票</el-button>
                </div>
              </li>
            </ul>
            <el-empty description="暂无车票信息" v-if="Tickets.length==0"></el-empty>
          </div>
          <div class="loading" v-if='loading' v-loading="loading" element-loading-text="拼命加载中"></div>
        </div>
        <div class="attent">
          <Attention type=1 />
        </div>
      </div>
      <div class="bottom"></div>
  </div>
  
</template>

<script>
import axios from 'axios'
import Attention from '../Attention'
// import {setCookie,getCookie,delCookie} from '../../api/cookie'
export default {
  components:{
    Attention
  },
  data() {
    return {
      loading:true,
      Tickets:[],
      showcity:false,
      showcity1:false,
      originvalue:'',
      arrivevalue:'',
      citys:[],
      options: [],
      endorse:{
        disable:false,
      },
      ruleForm:{
        time:'',
        originvalue:'',
        arrivevalue:''
      },
      rules:{
        time:[{  required: true, message: '请选择日期', trigger: 'change' }],
        arrivevalue:[{ required: true, message: '请选择到达城市', trigger: 'blur' }],
        originvalue:[{ required: true, message: '请选择出发城市', trigger: 'blur' }],
      },
      pickerOptions0: {
        disabledDate(time) {
          let curDate =  (new Date()).getTime() ;
          let fifteen = 15 * 24 * 3600 *1000;
          let fifteenDay = curDate + fifteen;
          return time.getTime() < Date.now()-8.64e7 || time.getTime() > fifteenDay ;
        }
      },  
    }
  },
  methods: {
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
    //数据按时间排序
    resetData(a,b){
      if(a.detailtime.slice(0,2)!=  b.detailtime.slice(0,2)) return a.detailtime.slice(0,2) < b.detailtime.slice(0,2)?-1:1
      else  if (a.detailtime.slice(3,5)!= b.detailtime.slice(3,5)) return a.detailtime.slice(3,5) < b.detailtime.slice(3,5)?-1:1
    },
    //时间小于当前时间排序
    panduanTime(data){ 
      let now= new Date();
      let _hour = ( 10 > now.getHours() ) ? '0' + now.getHours() : now.getHours();
      let _minute = ( 10 > now.getMinutes() ) ? '0' + now.getMinutes() : now.getMinutes();
      for(let i in data){
        if(data[i].detailtime.slice(0,2) < _hour || (data[i].detailtime.slice(0,2)==_hour && data[i].detailtime.slice(3,5)<_minute)){
          data[i].overtime=true
        }else{
          data[i].overtime=false
        }
      }
      return data
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

            let originvalue = this.ruleForm.originvalue;
            let arrivevalue = this.ruleForm.arrivevalue;
            //设置标题
            this.originvalue = originvalue
            this.arrivevalue = arrivevalue
            let time = this.dateFormat(this.ruleForm.time)
            this.loading=true
            axios.get(`http://localhost:8080/cars?originvalue=${originvalue}&arrivevalue=${arrivevalue}&time=${time}`).then(
              res=>{
                this.loading=false
                res.data.sort(this.resetData)
                this.Tickets= this.panduanTime(res.data);
              },
              err=>{}
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    //点击城市
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
    },
    //点击预定
    toreser(item){
      window.sessionStorage.setItem('buy',JSON.stringify(item))
      this.$router.push({
        // path:'/tickit/buy',
        name:'buy',
        query:{
          item:JSON.stringify(item)
        }
      })
    },
    //点击改签
    toendorse(item){
      this.$confirm('你确定要改签到该车次吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(item);
          console.log(this.endorse);
          this.endorse.time = this.dateFormat(this.endorse.time)
          item.times = this.dateFormat(item.times)
          axios({
            method:'get',
            params:{
              item:JSON.stringify(item),
              endorse:JSON.stringify(this.endorse)
            },
            url:'http://localhost:8080/endorse'
          }).then(
            res=>{
              if(res.data =='修改完成'){
                this.$message({
                    message: '改签成功！',
                    type: 'success'
                });
              }
            }
          )

        }).catch(() => {
        });
      
    }
  },
  mounted() {
    const app = require('../../../assets/MrLiang_citys.json')
    this.citys=app.provinces;

    let SearchInfo =JSON.parse(window.localStorage.getItem('SearchInfo'))
    console.log(SearchInfo);
    //改签
    if(SearchInfo.type == 'endorse'){
      this.endorse=SearchInfo
      this.endorse.disable = true
    }
    this.ruleForm.originvalue = SearchInfo.originvalue
    this.ruleForm.arrivevalue = SearchInfo.arrivevalue
    this.ruleForm.time = SearchInfo.time

    this.originvalue = SearchInfo.originvalue;
    this.arrivevalue = SearchInfo.arrivevalue;
    this.time = SearchInfo.time;
    let originvalue = this.originvalue;
    let arrivevalue = this.arrivevalue;
    let time = this.dateFormat(this.time)

   
     axios.get(`http://localhost:8080/cars?originvalue=${originvalue}&arrivevalue=${arrivevalue}&time=${time}`).then(
      res=>{
        this.loading=false
        res.data.sort(this.resetData)
        this.Tickets= this.panduanTime(res.data);
       
      },
      err=>{}
    )
  

  },
}
</script>

<style lang="less" scoped>
  ul{
    padding: 0;
  }
  .place{
    width: 1000px;
    height: 50px;
    background: white;
    // margin-top: 15px;
    .t{
      margin-left: 20px;
    }
    .title_font{
      font-size: 18px;
      color: rgb(51, 51, 51);
      position: relative;
      top: -15px;
    }
    .to_img{
      width: 100px;
      height: 45px;
      background: url('../../../assets/img/personal_to.png') no-repeat center center;
      display: inline-block;
    }
  }
  .title{
    width: 1000px;
    height: 40px;
    background: rgb(235,242,250);
    margin-top: -15px;
    li{
      display: inline-block;
      list-style: none;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: rgba(62, 62, 62, 1);
    }
  }
  .detail{
     width: 1000px;
     background: white;
     margin-top: -15px;
     li{
       list-style: none;
       display: flex;
       align-items: center;
       border-bottom: 2px solid rgb(235,242,250);
       margin-bottom: 2px;
       div{
         display: inline-block;
         text-align: center;
       }
       .time{
         font-size: 20px;
         font-weight: 600;
       }
       .go{
         .go_top{
           display: block;
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
         }
         .go_bottom{
           display: block;
           .arrive{
              background-color: #f28c8c;
             color: #fff;
             padding: 0 2px;
             font-size: 12px;
             height: 18px;
             line-height: 18px;
             border-radius: 4px;
             margin-right: 5px;
           }
         }
       }
       .type{
         font-size: 14px;
         text-align: center;
        .fix_class{
          display: block;
          color: #F48831;
          border: 1px solid #F48831;
          border-radius: 4px;
          // padding: 2px 6px;
          font-size: 12px;
          width: 40px;
          margin: 0 auto;
          margin-top: 7px;
        }
       }
       .price{
         font-size:14px;
         color:#FF4200;
       }
       .reNumber{
         font-size: 14px;
         font-weight: normal;
         .renum{
            background-color: #73d6c5;
            font-size: 12px;
            border-radius: 4px;
            padding: 0 2px;
            color: #fff;
            height: 18px;
            line-height: 18px;
            font-style: initial;  
            margin-right: 5px;
         }
       }
     }
     li:last-child{
      border-bottom: none;
     }
     .de_item{
       width: 100%;
       height: 78px;
     }
    
  }
  .loading{
    width: 1000px;
    height: 300px;
    background: white;
  }
  .el-empty{
    height: 280px !important;
  }
  // 搜索城市
  .gocity{
    width: 320px;
    height: 300px;
    position: absolute;
    top: 181px;
    left: 166px;
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
    top: 181px;
    left: 495px;
    overflow-y: scroll;
    z-index: 15;
    background: #fff;
    padding: 10px 5px 0 10px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
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
  // 
  .main{
    width: 1400px;
    height: 76px;
    background: white;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  .el-form-item{
    margin-top: 23px;
  }
  .btn{
    margin-left: 20px;
    width: 150px;
  }

  .content{
    width: 100%;
    background: rgb(245,245,245);
    // height: 600px;
    padding-top: 15px;
    box-sizing: border-box;
    .search{
      margin: 0 auto;
    }
    .center{
      width: 1400px;
      margin: 0 auto;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      .mian{
        width: 1000px;
        // float: left;
        display: inline-block;
      }
      .attent{
        width: 380px;
        height: 500px;
        background: white;
        // float: right;
        // margin-top: 15px;
        display: inline-block;
      }
    }
  }
  .bottom{
    background: rgb(245,245,245);
    width: 100%;
    height: 100px;
  }
</style>