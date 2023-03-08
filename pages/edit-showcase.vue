<template>
    <div>
      
      <editShowcase/>
    </div>
  </template>

<script>
import editShowcase from '@/components/showcase/editShowcase.vue'
export default {
  layout:'default',
  name: 'edit-showcase',
  components: {
    editShowcase
  }
}
</script>