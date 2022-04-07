<template>
  <div>
    <Header/>
    <!-- <Show  class="show"/> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import Show from './Show'
import Buy from './Buy'
export default {
  components:{
    Show,Buy
  }
}
</script>

<style lang="less" scoped>

</style>