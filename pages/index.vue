<template>
  <div>
    <home/>
  </div>
</template>

<script>
import home from '@/components/home/home.vue'
export default {
  layout:'default',
  name: 'IndexPage',
  components: {
    home,
  }
}
</script>
