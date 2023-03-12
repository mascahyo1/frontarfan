<template>
    <div>
        <div class="row justify-content-center">

            <div v-for="(r,index) in data" class="col-md-4 mb-5">
                
                <nuxt-link :to="{name:'work-id', params:{id:r.id}}">

                    <div v-if="r.attributes.image.data">
                        <img :src="baseUrl + r.attributes.image.data.attributes.url" :class="{'d-block mx-auto rounded-3 img-fluid': 1,'mt64': index % 3 != 1 }">
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