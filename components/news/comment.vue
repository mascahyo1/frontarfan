<template>
    <div>
        <h1 class="mb-3 text-center text-primary">Comments</h1>
        <div class="row mb-3">
            <div class="col-md-12 mb-3" v-for="r in responseData">
                <div class="card shadow-lg border-0">
                    <div class="card-body">
                        <div class="card-title">
                            <h5 class="" v-if="r.attributes.user_id.data">{{ r.attributes.user_id.data.attributes.name }}</h5>
                        </div>
                        <p>{{ r.attributes.description }}</p>
                    </div>
                </div>
            </div>
            <pagination :data="paginationData" />

            <div class="mt-3">
                <div class="card border-primary">
                    <div class="card-body">
                        <div class="card-title mb-3">
                            <h5>Post Comment</h5>
                        </div>
                        <div class="alert alert-success" v-if="successPost">
                            Comment Published
                        </div>
                        
                        <form v-if="isUser" @submit.prevent="addComment">
                            <div class="form-floating mb-3">
                                <textarea required class="form-control" style="height:200px" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                <label for="floatingTextarea">Comments</label>
                            </div>
                            <button class="btn btn-primary px-4 py-2 rounded-pill">Submit</button>
                        </form>
                        <div v-else>
                            <h2>Login to Post Comment</h2>
                            <nuxt-link to="/login" class="btn btn-primary rounded-pill px-4 py-2">Login</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import pagination from '../pagination.vue'
    import { mapGetters  } from 'vuex';
    export default {
        components: {
            pagination
        },
        
        computed: {
            ...mapGetters('auth', ['isLoggedIn', 'isUser', 'isToken'])

        },
        data() {
            return {
                paginationData: {},
                responseData: [],
                successPost: false,
                errorPost: false,
                errorDetail: '',
                meta: {},
                limitPagination: 8,
                paginationTotal: 0
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            addComment() {
                this.$axios.post('/post-comments', {
                        data: {
                            'showcase_id': this.$route.params.id,
                            'description': document.getElementById('floatingTextarea').value,
                            'post_id' : {
                                "disconnect": [], 
                                "connect": [
                                    {
                                    "id": this.$route.params.id,
                                    "position": {"end": true}
                                    }
                                ]
                            }
                        }
                    })
                    .then((response) => {
                        this.getData()
                        console.log(response)
                        this.successPost = true
                        this.errorPost  = false
                        this.errorDetail = ''
                    })
                    .catch((error) => {
                        console.log(error)
                        this.successPost = false
                        this.errorPost  = true
                        this.errorDetail = ''
                    })
            },
            getData() {
                this.$axios.$get('/post-comments?populate=*', {
                        params: {
                            'filters[$and][0][post_id][id][$eq]': this.$route.params.id,
                            'sort[0]': 'id:desc'
                        }
                    })
                    .then((response) => {
                        console.log(this)
                        this.responseData = response.data
                        this.meta = response.meta
                        this.paginationTotal = this.meta.pagination.total
                        document.getElementById('floatingTextarea').value = ''
                        this.paginationData = {
                            'url': 'showcase-id',
                            'start': this.$route.query.page ? this.$route.query.page : 1,
                            'limitPagination': this.limitPagination,
                            'total': this.paginationTotal
                        }

                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        
        watch: {
            '$route.query.page': function (val) {
                this.getData()
            }
        },
    }
</script>