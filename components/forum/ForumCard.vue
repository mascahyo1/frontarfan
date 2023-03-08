<template>
    <div>
        <div class="row justify-content-center">

            <div v-for="r in data" class="col-md-3 mb-3">
                <nuxt-link :to="{name:'showcase-id', params:{id:r.id}}">

                    <div class="card shadow-lg border-0 rounded-3">
                    <div v-if="r.attributes.image.data">
                        <img :src="baseUrl + r.attributes.image.data.attributes.url" class="card-img-top rounded-3">
                    </div>
                        <div class="card-body  text-dark rounded-3">
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