<template>
    <div>
      
      <login/>
    </div>
  </template>

<script>
import login from '@/components/login/login.vue'
export default {
  middleware:  ['notauthenticated'],
  layout:'default',
  name: 'Login',
  components: {
    login
  }
}
</script>