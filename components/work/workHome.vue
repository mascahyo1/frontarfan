<template>
    <div>
        <div class="container my-5 py-5">
            <div class="workhomecontainer">
                <div v-if="spinner">
                    
                        <spinnerComponent/>
                </div>
                <div v-else>
                    <workCard :data="responseData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import workCard from './workCard.vue';
    export default {
        // name: 'newsHome',
        components: {
            workCard
        },
        data() {
            return {
                spinner:true,
                apiUrl: 'works',
                httpMethod: 'GET',
                responseData: null,
                error: null,
                pageList:[],
                next:2,
                meta: '',
                paginationData:{},
                paginationTotal: 0,
                limitPagination: 9,
            }
        },
        methods: {

            async getData() {
            this.spinner = true
            try {
                let response = await this.$axios.$request({
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
            this.spinner = false
            }
        },
        
        mounted() {
            this.getData()
        }

    }
</script>