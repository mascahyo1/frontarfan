<template>
    <div>
      
      <login/>
    </div>
  </template>

<script>
import login from '@/components/register/register.vue'
export default {
  middleware:  ['notauthenticated'],
  layout:'default',
  name: 'Register',
  components: {
    login
  }
}
</script>