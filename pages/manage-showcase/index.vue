<template>
    <div>
      
      <manageShowcase/>
    </div>
  </template>

<script>
import manageShowcase from '@/components/showcase/manage-showcase.vue'
export default {
  
  middleware: ['authenticated'],
  layout:'default',
  components: {
    manageShowcase
  }
}
</script>