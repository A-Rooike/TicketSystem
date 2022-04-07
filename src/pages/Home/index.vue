<template>
  <div>
    <Header/>
    <SearchCity/>
  </div>
</template>

<script>
import Header from '../../components/Header'
import SearchCity from './SearchCity/index.vue'
export default {
  name:'Home',
  components:{
    Header,SearchCity
  }
}
</script>

<style>

</style>  