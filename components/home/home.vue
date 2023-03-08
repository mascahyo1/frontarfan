<template>
    <div>
      
      <About/>
      <newsHome/>
      <Ourteam/>
      <Rule/>
      <Dota2/>
      <Dota12v12/>
      <Shareperk/>
      <Showcase/>
      <Goodluck/>
    </div>
  </template>
  
  <script>
  import About from '@/components/About.vue'
  import Ourteam from '@/components/Ourteam.vue'
  import Rule from '@/components/Rule.vue'
  import Dota2 from '@/components/Dota2.vue'
  import Dota12v12 from '@/components/Dota12v12.vue'
  import Shareperk from '@/components/Shareperk.vue'
  import Showcase from '@/components/Showcasehome.vue'
  import Goodluck from '@/components/Goodluck.vue'
  import newsHome from '../news/newsHome.vue'
  export default {
    name: 'home',
    components: {
      About,
      newsHome,
      Ourteam,
      Rule,
      Dota2,
      Dota12v12,
      Shareperk,
      Showcase,
      Goodluck
    }
  }
  </script>
  