<template>
    <div class="">
      <div class="body">

        <headerComponent/>
        <main class="main">
          <!-- <div class="fwa-spinner" v-if="isLoading">
            <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div> -->
            <nuxt />
        </main>
      </div>
        <Footer/>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'

  import headerComponent from '@/components/headerComponent.vue'
  import Footer from '@/components/Footer.vue'
  export default {
    name: 'DefaultLayout',
    components: {
      headerComponent,
      Footer
    },
    mounted() {
    }, 
  computed: {
    
    ...mapGetters('auth', ['isLoading'])
  }
  }
  </script>
  
  <style>
  /* Add any custom styles for your layout here */
  </style>
  