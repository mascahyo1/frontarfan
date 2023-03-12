<template>
    <div>
      <AboutHomeVue />
      <workHome />
    </div>
  </template>
  
  <script>
import AboutHomeVue from '../AboutHome.vue'
import workHome from '../work/workHome.vue';
  export default {
    name: 'home',
    components: {
      AboutHomeVue,
      workHome
    }
  }
  </script>
  