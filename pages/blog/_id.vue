<template>
    <div>
        <detail/>
    </div>    
</template>

<script>
    import detail from '@/components/blog/detail.vue';
    export default {
        layout:'default',
        name: 'Blog',
        components: {
            detail
        }
    }
</script>