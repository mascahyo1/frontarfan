<template>
    <div>
    <div class="container my-5">
        <h1 class="text-center text-primary mb-3"> Showcase Detail </h1>
        <div v-if="data.attributes">
            <div v-if="data.attributes.image.data">
                <img :src="baseUrl + data.attributes.image.data.attributes.url" alt="img" class="img-fluid mb-3">
            </div>
            <p class="mb-3">K/D/A: {{ data.attributes.kill != null ? data.attributes.kill : '-' }} / {{ data.attributes.death != null ? data.attributes.death : '-' }} / {{ data.attributes.assist != null ? data.attributes.assist : '-' }}</p>
            <p class="mb-3"> <span class="">Match ID</span>: {{ data.attributes.match_id }} </p>
            <p class="mb-3"> 
              <span class="">Player</span>: 
              {{ data.attributes.user_id.data != null ? data.attributes.user_id.data.attributes.name : '-' }} 
            </p>
            <p class="mb-3"> <span class="">Hero</span>: {{ data.attributes.hero }} </p>
            <div class="mb-3"> {{ data.attributes.description }} </div>
        </div>
        <comment />
    </div>

    </div>
</template>

<script>
import comment from '../../components/showcase/comment.vue'
export default {
  layout:'default',
  components: {
    comment
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
        baseUrl: this.$imageurl,
        data: ''
    }    
  },
  methods: {
    async getData() {
        await this.$axios.get('showcases/'+this.$route.params.id + '?populate=*')
        .then((response) => {
            this.data = response.data.data
            console.log(this.data.attributes.kill)
        })
        .catch((error) => {
            console.log(error)
        })
    }
  },
}
</script>