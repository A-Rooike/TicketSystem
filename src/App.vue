<template>
  <div>
    <!-- <Home/> -->
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import Home from './pages/Home'
export default {
  name: "App",
  components:{
    Home
  }
}
</script>

<style>
</style>
