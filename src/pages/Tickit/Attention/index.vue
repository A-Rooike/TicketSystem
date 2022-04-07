<template>
  <div>
    <p class="title" v-if="type==1">常见问题</p>
    <p class="title" v-else>重要提示</p>
    <div class="item" v-for="(item,index) in queston" :key=index>
      <div class="question" @click="show(item.id)"><span class="ask">问</span>{{item.question}}</div>
      <div class="answer" v-show="item.click"><span class="da">答</span>{{item.answer}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queston:'',
    }
  },

  methods: {
    show(id){
      if(this.type==1){
        this.queston.forEach(element => {
        if(element.id==id ){
          element.click =  !element.click 
        }
        });
      }else if(this.type == 2){
        this.queston.forEach(element => {
        if(element.id==id ){
          element.click =  !element.click 
        }else{
           element.click =  false 
        }
      });
      }
      
    }
  },
  props:['type'],
  mounted() {
    if(this.type ==1){
      this.queston=[
        {question:'车票预售期是几天？',answer:'每条线路的预售天数是不同的，一般预售期是5天左右。',click:false,id:1},
        {question:'每人最多能买几张车票？',answer:'每个订单最多可购买单个车次的5张车票。',click:false,id:2},
        {question:'能否买到当日车票？',answer:'可购买发车前两小时的所有车票。',click:false,id:3},
        {question:'如何代人买票？',answer:'选择好车次后，填写对应的乘车人信息即可代为购票。',click:false,id:4},
        {question:'为什么同一线路票价不同？',answer:'票价一般受车型和实际运行线路所影响，一般来说，越高级的车型价格越高，走高速的班次比不走高速的班次价格高一些。',click:false,id:5},
      ]
    }else if(this.type ==2){
      this.queston=[
        {question:'携带儿童相关注意事项',answer:'1、成人及身高超过1.5米的儿童须购买全价票，供给座位。2、身高1.2米至1.5米的儿童购买半价儿童票，供给座位。儿童票可凭验证码到始发车站综合窗口、车站自动取票机、红旗超市等代理网点取票。3、身高1.2米以下儿童属免票儿童。可通过购买“成人票”并在“是否携带1.2米以下儿童”选项中选择“是”，进行购买。一张“成人票”最多可以携带一名免票儿童，免票儿童无座位。一名成人携带免票儿童超出一名时，应为超出的儿童购买儿童半票，儿童半票供给座位。',click:false,id:1},
        {question:'携带物品宠物相关注意事项',answer:'1、每一张全票可免费携带10千克，每一张儿童票可免费5千克；体积不能超过0.05立方米，长度不能超过1.8米，并以能放置本人座位下或车内行李架上为限。超过规定时，其超过部分按行包收费；占用座位时，按实际占用座位数购票收费。2、携带宠物乘车，需使用专用宠物笼携带宠物，乘车时宠物必须放置于行李车厢，不得带入乘坐区域，且如果在运输途中造成的宠物意外伤害或者死亡，需乘客自行承担。我们建议您携带宠物的相关免疫证明，并提前致电车站进行咨询。各个车站执行情况略有不同，请以车站实际执行为准。',click:false,id:2},
        {question:'取票和改签相关注意事项',answer:'1、始发站为成都市区内，可凭身份证或取票验证码到各大代理网点取票。2、凭身份证或取票验证码，前往各大车站自动取票机上取票。3、凭身份证或取票验证码，前往各大车站售票大厅综合窗口取票。为避免误车，非节假日建议在发车前1小时取票，并提前30分钟到始发站乘车；法定节假日及法定节假日节前一天，建议在发车前2小时取票，并提前1小时到始发站乘车。4、汽车票暂时是不支持改签功能的，如果您想改班/换票的话还请退票后再购买。',click:false,id:3},
        {question:'出行保障与服务费相关说明',answer:'1、为保障各位旅客的出行安全，本网站为您提供的交通意外保险服务，请自愿购买。2、本售票渠道由我公司投资建设，采用自负盈亏的市场化机制运行，为了持续为旅客提供便捷服务，需要向使用购票服务的旅客收取一定的服务费。取票后可到车站综合窗口或服务台领取发票。由于您已经使用了本项服务，因此您如果退票时，服务费是不退还的。',click:false,id:4},
      ]
    }
  },
}
</script>

<style lang="less" scoped>
  .title{
    font-size: 18px;
    background: #fff;
    padding: 16px 0 5px 10px;
    margin: 0 5px 0 5px;
    border-bottom: 1px solid #ccc;
  }
  .item{
    .question{
      width: 100%;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      font-size: 14px;
      color: #FF7403;
      border-bottom: 1px dashed #ccc;
      cursor: pointer;
      .ask{
        background: rgb(254,188,125);
        width: 20px;
        height: 20px;
        display: inline-block;
        line-height: 20px;
        text-align: center;
        margin-right: 15px;
        margin-left: 10px;
      }
    }
    .answer{
      background: #f3f6fa;
      color: #666666;
      .da{
        background: rgb(75,205,224);
        width: 20px;
        height: 20px;
        display: inline-block;
        line-height: 20px;
        text-align: center;
        margin-right: 15px;
        margin-left: 10px;
        color: white;
        font-size: 14px;
      }
    }
  }
</style>