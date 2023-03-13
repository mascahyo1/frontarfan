<template>
    <div>

        <index/>
    </div>
</template>

<script>
    import index from '@/components/blog/index.vue';
    export default {
        layout:'default',
        name: 'Blog',
        components: {
            index
        }
    }
</script>