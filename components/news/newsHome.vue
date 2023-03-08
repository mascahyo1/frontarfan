<template>
    <div>
        <div class="container my-5">
                <newsCard :data="responseData" />
                <div class="text-center">
                    <nuxt-link to="/news" class="btn btn-primary mt-3 mb-3 rounded-pill px-4 py-2">More</nuxt-link>
                </div>
        </div>
    </div>
</template>

<script>
    import newsCard from './newsCard.vue';
    export default {
        name: 'newsHome',
        components: {
            newsCard
        },
        data() {
            return {
                apiUrl: 'posts',
                httpMethod: 'GET',
                responseData: null,
                error: null,
                pageList:[],
                next:2,
                meta: '',
                paginationData:{},
                paginationTotal: 0,
                limitPagination: 3,
            }
        },
        methods: {

            async getData() {

            try {
                const response = await this.$axios.$request({
                    url: this.apiUrl,
                    method: this.httpMethod,
                    // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
                    params:{
                    "populate": '*', 
                    'sort[0]': 'id:desc',
                    'pagination[limit]': this.limitPagination, 
                    'pagination[start]': ( this.$route.query.page ? this.$route.query.page : 1 ) * this.limitPagination - this.limitPagination,
                    // 'filters[$and][0][user_id][username][$eq]': this.$store.getters['auth/isUser'].username
                    }
                })
                this.responseData = response.data
               
            } catch (error) {
                this.error = error
                console.log(error)
                }
            }
        },
        
        mounted() {
            this.getData()
        }

    }
</script>