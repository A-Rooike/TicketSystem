<template>
  <div>
    <div class="bigcontnet">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部订单" name="first">
          <div class="all">
              <div class="title">
                <ul>
                  <li style="width:116px">发车时间</li>
                  <li style="width:260px">出发/到达</li>
                  <li style="width:91px">班次类型</li>
                  <li style="width:147px">票价</li>
                  <li style="width:230px">操作</li>
                </ul>
              </div>
              <div class="all_item">
              <ul>
                <li class="de_item" v-for="(item,index) in order" :key="index">
                  <div class="time" style="width:120px">
                    <p>{{dateFormat(item.times)}}</p>
                    <p>{{item.detailtime.slice(0,5)}}</p>
                  </div>
                  <div class="go" style="width:240px">
                    <span class="go_top"><span class="begin">始</span>{{item.originvalue}}汽车站</span>
                    <span class="go_bottom"><span class="arrive">终</span>{{item.arrivevalue}}汽车站</span>
                  </div>
                  <div class="type" style="width:120px">
                    {{item.type}}
                    <div class="fix_class">固定班</div>
                  </div>
                  <div class="price" style="width:120px">￥{{item.price}}</div>
                  <div class="op" style="width:266px">
                    <el-button type="primary" class="gaiqian" @click="endorse(item)"  :disabled="item.overtime">改签</el-button>
                    <el-button type="primary" class="tuipiao" v-if="item.pay==0" @click="topay(item)"  :disabled="item.overtime">支付</el-button>
                    <el-button type="primary" class="tuipiao" v-else @click="refund(item)"  :disabled="item.overtime">退票</el-button>
                  </div>
                </li>
              </ul>
                              
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未支付订单" name="second">
          <div class="all">
              <div class="title">
                <ul>
                  <li style="width:116px">发车时间</li>
                  <li style="width:260px">出发/到达</li>
                  <li style="width:91px">班次类型</li>
                  <li style="width:147px">票价</li>
                  <li style="width:230px">操作</li>
                </ul>
              </div>
              <div class="all_item">
              <ul>
                <li class="de_item" v-for="(item,index) in nopayorder" :key="index">
                  <div class="time" style="width:120px">
                    <p>{{dateFormat(item.times)}}</p>
                    <p>{{item.detailtime.slice(0,5)}}</p>
                  </div>
                  <div class="go" style="width:240px">
                    <span class="go_top"><span class="begin">始</span>{{item.originvalue}}汽车站</span>
                    <span class="go_bottom"><span class="arrive">终</span>{{item.arrivevalue}}汽车站</span>
                  </div>
                  <div class="type" style="width:120px">
                    {{item.type}}
                    <div class="fix_class">固定班</div>
                  </div>
                  <div class="price" style="width:120px">￥{{item.price}}</div>
                  <div class="op" style="width:266px">
                     <el-button type="primary" class="gaiqian" @click="endorse(item)"  :disabled="item.overtime">改签</el-button>
                    <el-button type="primary" class="tuipiao" v-if="item.pay==0" @click="topay(item)"  :disabled="item.overtime">支付</el-button>
                
                  </div>
                </li>
              </ul>
                              
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已支付订单" name="third">
          <div class="all">
              <div class="title">
                <ul>
                  <li style="width:116px">发车时间</li>
                  <li style="width:260px">出发/到达</li>
                  <li style="width:91px">班次类型</li>
                  <li style="width:147px">票价</li>
                  <li style="width:230px">操作</li>
                </ul>
              </div>
              <div class="all_item">
              <ul>
                <li class="de_item" v-for="(item,index) in payedorder" :key="index">
                  <div class="time" style="width:120px">
                    <p>{{dateFormat(item.times)}}</p>
                    <p>{{item.detailtime.slice(0,5)}}</p>
                  </div>
                  <div class="go" style="width:240px">
                    <span class="go_top"><span class="begin">始</span>{{item.originvalue}}汽车站</span>
                    <span class="go_bottom"><span class="arrive">终</span>{{item.arrivevalue}}汽车站</span>
                  </div>
                  <div class="type" style="width:120px">
                    {{item.type}}
                    <div class="fix_class">固定班</div>
                  </div>
                  <div class="price" style="width:120px">￥{{item.price}}</div>
                  <div class="op" style="width:266px">
                     <el-button type="primary" class="gaiqian" @click="endorse(item)"  :disabled="item.overtime">改签</el-button>
                    <el-button type="primary" class="tuipiao" @click="refund(item)"  :disabled="item.overtime">退票</el-button>
                  </div>
                </li>
              </ul>
                              
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CryptoJS from "crypto-js";
import {setCookie,getCookie,delCookie} from '../../../api/cookie'
export default {
  data() {
    return {
        activeName: 'first',
        order:[],
        payedorder:[],
        nopayorder:[],
    }
  },
  methods: {
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
      if(a.times != b.times) return  a.times < b.times?-1:1
      else if(a.detailtime.slice(0,2)!=  b.detailtime.slice(0,2)) return a.detailtime.slice(0,2) < b.detailtime.slice(0,2)?-1:1
      else  if (a.detailtime.slice(3,5)!= b.detailtime.slice(3,5)) return a.detailtime.slice(3,5) < b.detailtime.slice(3,5)?-1:1
    },
     //时间小于当前时间排序
    panduanTime(data){ 
      let now= new Date();
      let _hour = ( 10 > now.getHours() ) ? '0' + now.getHours() : now.getHours();
      let _minute = ( 10 > now.getMinutes() ) ? '0' + now.getMinutes() : now.getMinutes();
      for(let i in data){
        let nowdate = this.dateFormat(now)
        let data_date = this.dateFormat(data[i].times)
        if(nowdate == data_date){
          if(data[i].detailtime.slice(0,2) < _hour || (data[i].detailtime.slice(0,2)==_hour && data[i].detailtime.slice(3,5)<_minute)){
              data[i].overtime=true
          }else{
              data[i].overtime=false
          }
        }else if(nowdate > data_date){
            data[i].overtime=true
        }else{
          data[i].overtime=false
        }
      
      }
      console.log(data,'@');
      return data
    },
   //退票
    refund(item){
       this.$confirm('你确定要退票吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(`http://localhost:8080/refund?refund=${item.id}&carid=${item.carid}`).then(res=>{
            console.log(res);
            if(res.data=='订单删除成功！'){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.getorder()
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    //获取订单信息
    getorder(){
      let originText = this.getphonenumber()
      console.log(originText);
      axios.get(`http://localhost:8080/getorder?phonenumber=${originText}`).then(
      res=>{
        console.log(res);
        this.order = res.data.sort(this.resetData)
        this.order = this.panduanTime(this.order)
        this.payedorder = []
        this.nopayorder = []
        this.order.forEach((ele)=>{
          if(ele.pay == 1){
            this.payedorder.push(ele)
          }else if(ele.pay == 0){
            this.nopayorder.push(ele)
          }
        })
      }
    )
    },
    //获取手机号码
    getphonenumber(){
      let phonenumber = JSON.parse(getCookie('LOG')).PHNB
     
      let bytes = CryptoJS.AES.decrypt(phonenumber,'gly')
      return bytes.toString(CryptoJS.enc.Utf8);//手机号码
    },
    //支付
    topay(item){
      console.log(item);
      item.times = this.dateFormat(item.times )
      window.sessionStorage.setItem('buy',JSON.stringify(item))
      this.$router.push({
        // path:'/tickit/buy',
        name:'buy',
        query:{
          item:JSON.stringify(item)
        }
      })
    },
    //改签
    endorse(item){
      console.log(item);
      let SearchInfo = item
      SearchInfo.type = 'endorse'
      SearchInfo.time = SearchInfo.times
      delete SearchInfo.times
      window.localStorage.setItem('SearchInfo',JSON.stringify(SearchInfo))
      this.$router.push('/tickit/show')
    }


  },
  mounted() {
    this.getorder()
  },
}
</script>

<style lang="less" scoped>
  .bigcontnet{
    width: 100%;
    // height: 500px;
    // border: 1px solid #000;
    padding: 25px 20px;
    box-sizing: border-box;
  }
  ul{
    margin: 0;
    padding: 0;
  }
  .all{
    // padding-top: 25px; 
  }
  .title{
    width: 1000px;
    height: 40px;
    background: rgb(235,242,250);
    margin-bottom: 20px;
    li{
      display: inline-block;
      height: 40px;
      // float: left;
      list-style: none;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: rgba(62, 62, 62, 1);
    }
  }
  .all_item{
     width:910px;
     background: white;
     margin-top: -15px;
     li{
       list-style: none;
       display: flex;
       align-items: center;
       border-bottom: 2px solid rgb(235,242,250);
       margin-bottom: 2px;
       background: rgb(244,244,244);
       div{
         display: inline-block;
         text-align: center;
       }
       .time{
         font-size: 20px;
         font-weight: 600;
         p{
           margin: 0;
         }
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
        .op{
         .el-button{
           width: 100px;
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

</style>