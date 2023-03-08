<template>
    <div>
        <section class="showcase mb-3" id="showcase">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#6c757d" fill-opacity="1" d="M0,96L48,117.3C96,139,192,181,288,170.7C384,160,480,96,576,101.3C672,107,768,181,864,181.3C960,181,1056,107,1152,69.3C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            <div class="bg-secondary text-white">
                <div class="container">

                    <h1 class="text-center text-white">Showcase</h1>
                    <div class="text-center mb-3">
                        Share your best or funny screenshot in here and let everyone see and know your best moment too
                    </div>
                    <showcaseCard :data="responseData" />
                    <div class="text-center">
                      <nuxt-link to="/showcase" class="btn btn-primary rounded-pill px-4 py-2">More</nuxt-link>
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#6c757d" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,240C384,256,480,256,576,240C672,224,768,192,864,160C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    
        </section>
    </div>
</template>

<script>

import showcaseCard from './showcase/showcaseCard.vue'
export default {
  components() {
    return {
      showcaseCard
    }
  },
  name: 'Showcase',
  data() {
    return {
      apiUrl: this.$baseurl + '/showcases',
      httpMethod: 'GET',
      responseData: null,
      error: null
    }
  },
  async created() {
    try {
      const response = await this.$axios.$request({
        url: this.apiUrl,
        method: this.httpMethod,
        // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
        params:{'pagination[limit]': 8, "populate": '*'}
      })
      this.responseData = response.data
    } catch (error) {
      this.error = error
    }
  }

}
</script>