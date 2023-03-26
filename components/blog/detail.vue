<template>
    <div class="container my-5 py-5">
        <div v-if="spinner" >
            <spinnerComponent/>
        </div>
        <div v-else>

            <div v-if="blog.attributes">
            
                <div class="text-center mb-1 f14 finter colorgrey">
                    {{ $datearfan(blog.attributes.createdAt) }}  by {{ blog.attributes.author }}
                </div>
                <div class="text-center mb-5 fw600 f53 fpoppins ">
                    {{ blog.attributes.title }}
                </div>
                <img v-if="blog.attributes.image.data" :src="baseUrl + blog.attributes.image.data.attributes.url" class="img-fluid d-block mx-auto mb-5 bd16">
                <div class="f14 finter colorsecondary">
                    {{ blog.attributes.description }}
                </div>
            </div>
        </div>

        
    </div>
</template>


<script>
import { onMounted } from 'vue'
export default {
    // layout:'default',
    // name: 'Blog',
    // components: {
        
    // }
    data() {
        return {
            blog: {},
            spinner:true,
            baseUrl: this.$imageurl,
        }
    },
    methods: {
        async getBlog() {
            this.spinner = true;
            await this.$axios.$get(`blogs/${this.$route.params.id}`, {params:{"populate":'*'}}).then((response) => {
                this.blog = response.data;
                console.log(response.data)
            }).catch((error) => {
                console.log(error);
            });
            this.spinner = false;
        }
    },
    mounted() {
        this.getBlog();
    }
}
</script>