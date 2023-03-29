

<template>
    <div>
        <div class="container my-5 py-5">
            <div v-if="spinner">
                <spinnerComponent/>
            </div>
            <div v-else>

                <div class="" v-if="work.attributes">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <div class="mb-1">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><nuxt-link to="/" class="colorgrey finter f11">Home</nuxt-link></li>
                                        <li class="breadcrumb-item"><nuxt-link to="/work"  class="colorgrey finter f11">Work</nuxt-link></li>
                                        <li class="breadcrumb-item" v-if="work.attributes.work_category.data && work.attributes.work_category.data.attributes.name != 'PROJECT'" ><nuxt-link  class="colorgrey finter f11" :to="{name:'work-category-id', params:{id:work.attributes.work_category.data.id}}">{{work.attributes.work_category.data.attributes.name}}</nuxt-link></li>
                                        <li class="breadcrumb-item active " aria-current="page"><nuxt-link to="#" class="colorgrey finter f11">{{ work.attributes.title }}</nuxt-link></li>
                                    </ol>
                                </nav>
                            </div>
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
                                <img v-if="work.attributes.image.data" :src="baseUrl + work.attributes.image.data.attributes.url" class="img-fluid d-block mx-auto mb-5 bd16">
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
        </div>
                <div class="container-fluid mt-5 px-4 px-md-0">
                    <VueSlickCarousel v-if="workSlider.length"  v-bind="settings" class="mb-5">
                        <div v-for="w in workSlider" class="workslider">
                            
                            <nuxt-link :to="{name:'work-detail-id', params:{id:w.id}}">
                                <div v-if="w.attributes.type == 'video'">
                                    <div v-if="w.attributes.youtube_id">
                                        <img :src="'https://img.youtube.com/vi/'+w.attributes.youtube_id+'/mqdefault.jpg'" :class="{'imgslide bd16': 1}">
                                    </div>

                                </div>
                                <div v-else>
                                    <img :src="baseUrl+w.attributes.image.data.attributes.url" class="imgslide bd16">
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
                spinner: true,
                work: {},
                apiUrl: 'works/' + this.$route.params.id,
                httpMethod: 'GET',
                baseUrl: this.$imageurl,
                workSlider: [],
                settings: {
                    dots: false,             //dots
                    infinite: true,         //loop
                    pauseOnHover: false,    //don't stop when hoverd
                    centerMode:true,        //show the slides of both side 
                    centerPadding:"20%", 
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                centerMode:false,        //show the slides of both side 
                                // centerPadding:"20%", 
                            }
                        },
                    ]   
                }
            }
        },
        methods: {
            
            async getData() {
                this.spinner = true
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
                this.spinner = false
                }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style>
.slider img{
    width:100%;
}
.slider .slick-arrow{
    z-index:2!important;
}
.slider .slick-next{
    right:0!important;
}
.slider .slick-prev{
    left:0!important;
}

@media only screen and (min-width: 768px) {
    .slick-slide{
        padding-right: 1vw!important;
        padding-left: 1vw!important;
    }
    .slider{
        width:70%;
        margin:0 auto;
    }
}
</style>