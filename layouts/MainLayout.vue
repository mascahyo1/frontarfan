<template>
    <div class="main-layout">
        <headerComponent/>
      <main>
        
        <nuxt />
      </main>
        <Footer/>
  
    </div>
  </template>

<script>
import headerComponent from '@/components/headerComponent.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'MainLayout',
  components: {
    headerComponent,
    Footer
  }
}
</script>