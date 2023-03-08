<template>
    <div>
        <div class="container my-5">
                <newsCard :data="responseData" />
                <pagination :data="paginationData" />
        </div>
    </div>
</template>

<script>
    import newsCard from './newsCard.vue';
    import pagination from '../pagination.vue';
    export default {
        name: 'news',
        components: {
            newsCard,
            pagination
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
                limitPagination: 6,
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
                this.meta = response.meta
                this.paginationTotal = this.meta.pagination.total

                this.paginationData = {
                    'url': 'news',
                    'start': this.$route.query.page ? this.$route.query.page : 1,
                    'limitPagination': this.limitPagination,
                    'total': this.paginationTotal
                }
            } catch (error) {
                this.error = error
                console.log(error)
                }
            }
        },
        
        watch: {
            '$route.query.page': function (val) {
                this.getData()
            }
        },
        mounted() {
            this.getData()
        }

    }
</script>