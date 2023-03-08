<template>
  <div>
      <section class="showcase mb-3" id="showcase">
          <div class="">
              <div class="container my-5">

                  <h1 class="text-center text-primary">Forum</h1>
                  <div class="text-center mb-3">
                    Discuss about anything here and let everyone know your opinion about it too 
                  </div>
                  <ForumCard :data="responseData" />
                  <pagination :data="paginationData" />
              </div>
          </div>
      </section>
  </div>
</template>

<script>
import ForumCard from './ForumCard.vue'
import pagination from '../pagination.vue'
export default {
name: 'Showcase',
component: {
  ForumCard,
  pagination
},
data() {
  return {
    apiUrl: 'forums',
    httpMethod: 'GET',
    responseData: null,
    error: null,
    pageList:[],
    next:2,
    meta: '',
    paginationData:{},
    paginationTotal: 0,
    limitPagination: 8,
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
        'url': 'showcase',
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
async created() {
    this.getData()
  }

}
</script>