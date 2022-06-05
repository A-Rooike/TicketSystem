<template>
  <div>
    <Header/>
    <div class="main">
      <div class="center">
        <div class="left">
          <div class="letf_top">用户中心</div>
          <div class="item">我的订单</div>
          <ul>
            <li :class="{active:p1,li_item:true}" @click="toOrder" ref="car">汽车票订单</li>
          </ul>
          <div class="item line">会员中心</div>
          <ul>
            <li :class="{active:!p1,li_item:true}" @click="toChangepossword">修改密码</li>
          </ul>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      p1:true,
    }
  },
  methods: {
    // 点击汽车票订单
    toOrder(){
      this.$router.push('/personal/order')
      if(!this.p1){
        this.p1=!this.p1
      }
    },
    toChangepossword(){
      this.$router.push('/personal/passwd')
      if(this.p1){
        this.p1=!this.p1
      }
    }
  },
}
</script>

<style lang="less" scoped>
  li{
    list-style: none;
  }
  .main{
    background: rgb(244,244,244);
    height: 800px;
    padding-top: 20px;
    .center{
      width: 1200px;
      margin: 0px auto;
     .left{
      float: left;
      width: 270px;
      height: 400px;
      background: #fff;
      padding: 10px 10px 0 10px;
      box-sizing: border-box;
      .letf_top{
        width: 237px;
        height: 41px;
        margin: 0 auto;
        text-align: center;
        line-height: 41px;
        border-radius: 5px;
        background: #DBEEFC;
        color: #0380D7;
        font-size: 18px;
      }
      }
      .right{
        float: right;
        width: 910px;
        // height: 650px;
        background: white;
      }
    }
  }
  .item{
    // background: red;
    height: 40px;
    line-height: 40px;
  }
  .line{
    margin-top: 3px;
    border-top: 2px solid rgb(244,244,244);
  }
  ul{
    padding: 0;
    margin: 0;
  }
  .li_item{
    cursor: pointer;
    padding-left: 15px;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
  }
  .active{
    background: #0091FF;
    color: white;
  }

</style>