<template>
    <div>
        <div class="container my-5 py-5">
            
            <div v-if="spinner" class="mb-5">
                <spinnerComponent/>
            </div>
            <div v-else>

                <div v-if="responseData.attributes">
                    <div class="row justify-content-center mb-5">
                        <div class="col-auto my-auto">
                            <div class="mb-3">
                                <div class="">
                                    <img v-if="responseData.attributes.image.data" :src="baseUrl + responseData.attributes.image.data.attributes.url" class="container_img_about img-fluid d-block mx-auto">
                                </div>
                            </div>
                        </div>
                        <div class="col-auto my-auto">
                            <div class="mb-3 f53 fpoppins fw600">
                                Hi, my name is <span class="fred">Arfan</span>
                            </div>
                        </div>
                    </div>
                    <div class="f14 finter fsecondary200 mb-5">
                        {{ responseData.attributes.description }}
                    </div>
                    <div class="text-center mb-5">
                        <a :href="baseUrl+responseData.attributes.cv.data.attributes.url" download target="_blank" class="btn text-white bgred" v-if="responseData.attributes.cv.data">
                            Download my resume
                            <i class="fas fa-file-alt"></i>
                        </a>
                    </div>
                    <div class="mb-5 text-center fw700 f27 fpoppins">
                        Work Experience
                    </div>
                    <VueSlickCarousel v-if="workData.length"  v-bind="settings" class="mb-5">
                        <div v-for="w in workData">
                            
                            <nuxt-link :to="{name:'work-detail-id', params:{id:w.id}}">
                                
                                <div v-if="w.attributes.type == 'video'">
                                    <div v-if="w.attributes.youtube_id">
                                        <img :src="'https://img.youtube.com/vi/'+w.attributes.youtube_id+'/mqdefault.jpg'" :class="{'d-block mx-auto rounded-3 img-fluid': 1}">
                                    </div>

                                </div>
                                <div v-else>
                                    <img :src="baseUrl+w.attributes.image.data.attributes.url" class="img-fluid d-block mx-auto">
                                </div>
                            </nuxt-link>
                        </div>
                    </VueSlickCarousel>
                    <div class="mb-5 text-center fw700 f27 fpoppins">
                        Certifications
                        {{ cetificate }}
                    </div>
                    <div class="row mb-5 justify-content-center">
                        <div class="col-md-4 mb-5" v-if="certificateData.length" v-for="(c,index) in certificateData">
                            <nuxt-link :to="{name:'certificate-id', params:{id:c.id}}">
                                <div>
                                    <img v-if="c.attributes.image.data" :src="baseUrl+c.attributes.image.data.attributes.url" :class="{'img-fluid d-block mx-auto':1,'mt64': index % 3 != 1}">
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'

  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

    export default {
        components: { VueSlickCarousel },

        data() {
            return {
                spinner: true,
                baseUrl: this.$imageurl,
                responseData: {},
                workData: [],
                certificateData: [],
                settings: {
                    
                    "dots": false,
                    "arrows": true,
                    "dotsClass": "slick-dots custom-dot-class",
                    "edgeFriction": 0.35,
                    "infinite": false,
                    "speed": 500,
                    "slidesToShow": 3,
                    "slidesToScroll": 1
                }
            }
        },
        mounted() {
            this.getAbout()
        },
        methods: {
            async getAbout() {
                this.spinner = true
                await this.$axios.get('about',{params:{
                  'populate': '*',  
                }})
                .then((response) => {
                    this.responseData = response.data.data
                })
                
                await this.$axios.get('works',{params:{
                  'populate': '*',  
                }})
                .then((response) => {
                    this.workData = response.data.data
                })
                await this.$axios.get('certifications',{params:{
                  'populate': '*',  
                  'pagination[limit]': 1000
                }})
                .then((response) => {
                    this.certificateData = response.data.data
                })
                this.spinner = false
            }
        }
    }
</script>