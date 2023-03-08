<template>
    <button @click="logout" class="btn btn-danger">Logout</button>
  </template>
  
  <script>
  export default {
    methods: {
      async logout() {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/')
      }
    }
  }
  </script>