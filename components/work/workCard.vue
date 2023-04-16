<template>
    <div>
        <div class="row justify-content-center">

            <div v-for="(r,index) in data" class="col-md-4 mb-5" v-scroll-observer="$animateCard">
                
                <nuxt-link :to="{name:'work-detail-id', params:{id:r.id}}">

                  <div v-if="r.attributes.type == 'video'">
                      <div v-if="r.attributes.youtube_id">
                          <img :src="'https://img.youtube.com/vi/'+r.attributes.youtube_id+'/mqdefault.jpg'" :class="{'d-block mx-auto rounded-3 img-fluid bd16 imggrid': 1,'mt64': index % 3 != 1}">
                      </div>

                  </div>
                  <div v-else>
                    <div v-if="r.attributes.image.data">
                        <img :src="baseUrl + r.attributes.image.data.attributes.url" :class="{'d-block mx-auto rounded-3 img-fluid bd16 imggrid': 1,'mt64': index % 3 != 1 }">
                    </div>
                  </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.props)
  },
  name:'showcaseCard',
  data() {
    return {

        baseUrl: this.$imageurl,
    }
  },
  props: {
    data: []
  }
}
</script>