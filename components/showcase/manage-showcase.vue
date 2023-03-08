<template>
  <div>
      <section class="showcase mb-3" id="showcase">
          <div class="">
              <div class="container my-5">
                  <h1 class="text-center text-primary">Manage Showcase</h1>
                  <div class="text-center mb-3">
                      Manage Your Showcase
                      <nuxt-link to="/manage-showcase/add" class="btn btn-primary">Add Showcase</nuxt-link>
                  </div>
                  <div class="row justify-content-center mb-3">
                      <div v-for="r in responseData" class="col-md-3 mb-3">
                          <div class="card shadow-lg border-0 rounded-3">
                            <div v-if="r.attributes.image.data">
                              <img :src="baseUrl + r.attributes.image.data.attributes.url" class="card-img-top rounded-3">
                            </div>
                              <div class="card-body  text-dark rounded-3">
                                  <div class="player_name">
                                      Player : {{r.attributes.user_id.data != null ?  r.attributes.user_id.data.attributes.name : '-'}}
                                  </div>
                                  <div class="hero_name">
                                      Hero : {{ r.attributes.hero }}
                                  </div>
                                  <div class="kda">
                                      K/D/A : {{ r.attributes.kill != null ? r.attributes.kill : '-' }}/{{ r.attributes.death != null  ?  r.attributes.death : '-' }}/{{ r.attributes.assist != null ? r.attributes.assist : '-' }}
                                  </div>
                                  <div class="match_id">
                                      Match ID : {{ r.attributes.match_id }}
                                  </div>
                                  <div>
                                    <nuxt-link :to="{name:'manage-showcase-id',params:{id:r.id}}"><i class="fa fa-edit text-success"></i></nuxt-link>
                                    
                                    <!-- <i class="fa fa-trash text-danger" @click="deleteShowcase(r.id)"></i> -->
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <pagination :data="paginationData" />
              </div>
          </div>
      </section>
  </div>
</template>

<script>
import pagination from '../pagination.vue'
export default {
name: 'Showcase',
component: {
  pagination
},
data() {
  return {
    baseUrl: this.$imageurl,
    apiUrl: this.$baseurl + '/showcases',
    httpMethod: 'GET',
    responseData: null,
    error: null,
    start: 0,
    current:1,
    pageList:[],
    paginationData: {},
    next:2,
    meta: '',
    paginationTotal: 0,
    limitPagination: 8,
  }
},
methods: {
  async deleteShowcase(id) {
    let result = confirm("Are you sure you want to delete this file?");
    if(result) {
      
      try {
        const response = await this.$axios.$request({
          url: '/showcases/' + id,
          method: 'DELETE',
        })
        this.getData()
      } catch (error) {
        this.error = error
      }
      }
  },
  async getData() {

    try {
      const response = await this.$axios.$request({
        url: this.apiUrl,
        method: this.httpMethod,
        // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
        params:{
          "populate": '*', 
          'pagination[limit]': this.limitPagination, 
          'pagination[start]': ( this.$route.query.page ? this.$route.query.page : 1 ) * this.limitPagination - this.limitPagination, 
          'sort[0]': 'id:desc',
          "filters[$and][0][user_id][username][$eq]": this.$store.getters['auth/isUser'].user.username
        }
      })
      this.responseData = response.data
      this.meta = response.meta
      this.paginationTotal = this.meta.pagination.total
      this.paginationData = {
        'url': 'manage-showcase',
        'start': this.$route.query.page ? this.$route.query.page : 1,
        'limitPagination': this.limitPagination,
        'total': this.paginationTotal
      }
    } catch (error) {
      this.error = error
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