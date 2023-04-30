

<template>
    <div>
        <div class="container my-5 py-5">
            <div v-if="spinner">
                <spinnerComponent/>
            </div>
            <div v-else>

                <div class="" v-if="work.attributes">
                    <div class="row">
                        <div class="col-md-12 mb-3" v-scroll-observer="$animateCardFadeLeft">
                            <div class="mb-1">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><nuxt-link to="/" class="text-white finter f11">Home</nuxt-link></li>
                                        <li class="breadcrumb-item"><nuxt-link to="/work"  class="text-white finter f11">Work</nuxt-link></li>
                                        <!-- <li class="breadcrumb-item" v-if="work.attributes.work_category.data && work.attributes.work_category.data.attributes.name != 'PROJECT'" ><nuxt-link  class="text-white finter f11" :to="{name:'work-category-id', params:{id:work.attributes.work_category.data.id}}">{{work.attributes.work_category.data.attributes.name}}</nuxt-link></li> -->
                                        <li class="breadcrumb-item active " aria-current="page"><nuxt-link to="#" class="text-white finter f11">{{ work.attributes.title }}</nuxt-link></li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="f40 ffreehouse text-white fw700 mb-4 text-white">
                                {{ work.attributes.title }}
                            </div>
                            <div class="f20 fnunito  mb-4 text-white">
                                {{ work.attributes.description }}
                            </div>
                        </div>
                        <div class="col-md-12 mb-3" v-scroll-observer="$animateCardFadeRight">
                            <div v-if="work.attributes.youtube_id" class="mb-5">
                                <iframe  class="d-block mx-auto bd16" width="100%" height="500px" allow="fullscreen;" :src="'https://www.youtube.com/embed/'+work.attributes.youtube_id+'?autoplay=0&cc_load_policy=1&mute=0&loop=1&playlist='+work.attributes.youtube_id+'&controls=1&showinfo=0'"></iframe>
                            </div>
                            <div class="row mb-3"  v-if="work.attributes.image.data" >
                                <div v-scroll-observer="$animateCard"  v-for="(w,index) in work.attributes.image.data" :class="{
                                    'my-auto':1,
                                    'col-md-12' :index % 3 == 0,
                                    'col-md-8' :index % 3 == 1,
                                    'col-md-4' :index % 3 == 2,
                                    }">
                                    <div class="mb-3">
                                        <img :src="baseUrl + w.attributes.url" class="img-fluid d-block mx-auto mb-5 bd16">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="my-5 py-5">
                        <div class="bgFED83C p-3 bd16">
                            <div v-if="work.attributes.work_category.data" class="ffreehouse f64 colorblack mb-3">{{ work.attributes.work_category.data.attributes.name }}</div>
                            <div class="row mb-3" v-if="work.attributes.tools.data">
                                <div class="col-auto mb-3" v-for="t in work.attributes.tools.data">
                                    <div class="bg2B41A1 bd32px text-white px-32px py-16px ffreehouse f20">
                                        {{ t.attributes.name }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="work.attributes.work_category.data" class="mb-3 fnunito f20 color180830">
                                <!-- {{ work.attributes.work_category.data }} -->
                                <div v-if="work.attributes.work_category.data" class="color180830 fnunito f20">
                                    {{ work.attributes.work_category.data.attributes.description }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
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