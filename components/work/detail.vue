<template>
    <div>
        <div class="container my-5 py-5">
            <div class="" v-if="work.attributes">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="f34 fpoppins fw700 mb-4 fdarkprimary">
                            {{ work.attributes.title }}
                        </div>
                        <div class="f14 finter  mb-4 colorsecondary">
                            {{ work.attributes.description }}
                        </div>
                    </div>
                    <div class="col-md-8 mb-3">
                        <div v-if="work.attributes.type == 'video'">
                            <div v-if="work.attributes.youtube_id">
                                <iframe  class="" width="100%" height="300px" allow="fullscreen;" :src="'https://www.youtube.com/embed/'+work.attributes.youtube_id+'?autoplay=0&cc_load_policy=1&mute=0&loop=1&playlist='+work.attributes.youtube_id+'&controls=1&showinfo=0'"></iframe>
                            </div>
                        </div>
                        <div v-else>
                            <img v-if="work.attributes.image.data" :src="baseUrl + work.attributes.image.data.attributes.url" class="img-fluid d-block mx-auto mb-5">
                        </div>
                        <div class="row">
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <span class="fpoppins fw700 fdarkprimary  f21">Tools</span>
                                    <ul class="nobullet mt-3">
                                        <li class="colorsecondary finter f14" v-for="t in work.attributes.tools.data">
                                            {{t.attributes.name}}
                                        </li>   
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <div class="fpoppins fw700 fdarkprimary f21 mb-3">Client</div>
                                    <div class="colorsecondary finter f14">{{ work.attributes.client }}</div>
                                </div>
                                
                            </div>
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <div class="fpoppins fw700 fdarkprimary mb-3 f21">Timeframe</div>
                                    <div class="colorsecondary finter f14">{{ $montharfan(work.attributes.start) }} - {{ $montharfan(work.attributes.finish) }}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid mt-5 px-5">

            <VueSlickCarousel v-if="workSlider.length"  v-bind="settings" class="mb-5">
                <div v-for="w in workSlider">
                    
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
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'

  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
    export default {
        components: { VueSlickCarousel },
        data() {
            return {
                work: {},
                apiUrl: 'works/' + this.$route.params.id,
                httpMethod: 'GET',
                baseUrl: this.$imageurl,
                workSlider: [],
                settings: {
                    
                    "dots": false,
                    "arrows": true,
                    "infinite": false,
                    "speed": 500,
                    "slidesToShow": 3,
                    "slidesToScroll": 3,
                    responsive: [
                        {
                            breakpoint: 1300,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            
            async getData() {
                
                try {
                    await this.$axios.$request({
                        url: this.apiUrl,
                        method: this.httpMethod,
                        // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
                        params:{"populate":'*', 'pagination[limit]': this.paginationLimit, 'pagination[start]': this.start}
                    }).then((response) => {
                        this.work = response.data
                    })
                    await this.$axios.$request({
                        url: 'works',
                        method: this.httpMethod,
                        // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
                        params:{"populate":'*', 'pagination[limit]': 6, 'pagination[start]': 0, 'filters[$and][0][id][$ne]': this.$route.params.id}
                    }).then((response) => {
                        this.workSlider = response.data
                    })
                   
                } catch (error) {
                    
                    this.error = error
                    console.log(error)
                    }
                }
        },
        mounted() {
            this.getData()
        }
    }
</script>