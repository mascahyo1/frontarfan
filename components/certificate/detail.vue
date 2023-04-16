<template>
    <div class="container my-5 py-5">
        <div v-if="spinner">
            <spinnerComponent/>
        </div>
        <div v-else>

            <div v-if="certificate.attributes"  v-scroll-observer="$animateCard">
            
                <div class="text-center mb-5 fw600 f53 fpoppins text-white ">
                    {{ certificate.attributes.name }}
                </div>
                <img v-if="certificate.attributes.image.data" :src="baseUrl + certificate.attributes.image.data.attributes.url" class="bd16 img-fluid d-block mx-auto mb-5">
                <div class="f14 finter text-white">
                    {{ certificate.attributes.description }}
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { onMounted } from 'vue'
export default {
    // layout:'default',
    // name: 'certificate',
    // components: {
        
    // }
    data() {
        return {
            spinner: false,
            certificate: {},
            baseUrl: this.$imageurl,
        }
    },
    methods: {
        async getcertificate() {
            this.spinner = true;
            await this.$axios.$get(`certifications/${this.$route.params.id}`, {params:{"populate":'*'}}).then((response) => {
                this.certificate = response.data;
                console.log(response.data)
            }).catch((error) => {
                console.log(error);
            });
            this.spinner = false;
        }
    },
    mounted() {
        this.getcertificate();
    }
}
</script>