<template>
    <div>
        <div class="container my-5">
            <div v-if="news.attributes" class="mb-3">
                <h1 class="text-center text-primary mb-3"> {{ news.attributes.title }}</h1>
                <img v-if="news.attributes.image.data" :src="baseUrl+news.attributes.image.data.attributes.url" alt="img" class="img-fluid mb-3">
                <p> {{ news.attributes.description }} </p>

            </div>
            <comment />
        </div>
    </div>
</template>

<script>    
    import comment from '../../components/news/comment.vue'
    export default {
        layout:'default',
        components: {
            comment
        },
        data() {
            return {
                news: {},
                baseUrl: this.$imageurl,
            }
        },
        methods: {
            getData() {
                this.$axios.get('posts/' + this.$route.params.id + "?populate=*")
                    .then(response => {
                        this.news = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>