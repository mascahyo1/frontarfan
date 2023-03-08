<template>
    <div>
      
      <addShowcase/>
    </div>
  </template>

<script>
import addShowcase from '@/components/showcase/addShowcase.vue'
export default {
  layout:'default',
  middleware: ['authenticated'],
  components: {
    addShowcase
  }
}
</script>