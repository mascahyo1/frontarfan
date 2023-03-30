<template>
    <div>
        <div class="container my-5 py-5">
            <div v-if="spinner">
                <spinnerComponent/>
            </div>
            <div v-else>
                <div v-if="activeCategory == -1">
                    <div class="text-center mb-1 f17 fpoppins colorsecondary50">
                        MY WORK
                    </div>
                    <div class="text-center mb-5 f42 fw600 fpoppins">
                        <span class="fdarkprimary">Featured</span> 
                        <span class="fred">Project</span>
                    </div>
                </div>
                <div v-else>
                    <div class="row justify-content-center mb-5">
                        <div class="col-auto  my-auto">
                            <div class="mb-3">
                                <img v-if="imgUrl" :src="baseUrl+imgUrl" class="img-fluid d-block mx-auto img_cat_work">
                            </div>
                        </div>
                        <div class="col-md-9 my-auto">
                            <div class="mb-3 finter f11 colorsecondary mb-1">
                                <div>
                                Projects in
                                </div>
                                <div class="f34 fw700 fdarkprimary mb-1">
                                    {{ CategoryName }}
                                </div>
                                <div class="colorsecondary f14 finter">
                                    {{ CategoryDesc }}

                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="mb-5 ">
                    
                    <VueSlickCarousel v-if="workCategory.length"  v-bind="settings" class="mb-5 nav nav-tabs" ref="mySlick">
                        <div>
                            <li class="nav-item border-0">
                                <nuxt-link :class="{'nav-link border-0 text-center fdarkprimary fpoppins f17':1, 'active':activeCategory == '-1' }" :to="{name:'work'}">All</nuxt-link>
                            </li>
                        </div>
                        <div v-for="(w,index) in workCategory">
                            <li class="nav-item border-0">
                                <nuxt-link :class="{'nav-link border-0 text-center fdarkprimary fpoppins f17':1, 'active':activeCategory == w.id }" :to="{name:'work-category-id', params:{id:w.id}}">  {{ w.attributes.name }}</nuxt-link>
                            </li>
                        </div>
                    </VueSlickCarousel>
                </div>
                <div class="mb-5">
                    
                    <workCard2 :data="responseData" />
                </div>



                <div class="text-center" v-if="total > start">
                    <button @click="getData()" class="btn text-center">Load More</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import workCard2 from './workCard2.vue';
import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'

  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
    layout:'default',
    name: 'Work',
    components: {
        workCard2,
        VueSlickCarousel
    },
    data() {
            return {
                spinner:true,
                baseUrl: this.$imageurl,
                apiUrl: 'works',
                httpMethod: 'GET',
                imgUrl: '',
                responseData: [],
                workCategory:[],
                CategoryName: '',
                CategoryDesc: '',
                activeCategory: this.$route.params.id != null ? this.$route.params.id : -1,
                start: 0,
                paginationLimit: 9,
                total: 9,

                settings: {
                    
                    "dots": false,
                    "arrows": true,
                    "infinite": false,
                    "speed": 500,
                    // variableWidth: true,
                    // variableHeight: true,
                    mobileFirst: true,
                            slidesToShow: 6,
                            slidesToScroll: 6,

                    responsive: [
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 5,
                                slidesToScroll: 5,
                            },
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            },
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                        // You can unslick at a given breakpoint now by adding:
                        // settings: "unslick"
                        // instead of a settings object
                    ]

                }
            }
        },
        methods: {

            async getData() {
                this.spinner = true
            // try {
                await this.$axios.$request({
                        url: 'work-categories',
                        method: this.httpMethod,
                        // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
                        params:{"populate":'*', 'pagination[limit]': 1000, 'pagination[start]': 0, 'filters[$and][0][name][$ne]:': 'PROJECT'}
                    }).then((response) => {
                        this.workCategory = response.data
                    })
                let category = await this.$route.params.id != null ? this.$route.params.id : -1
                    if(category != -1) {
                        for(let i=0; i<this.workCategory.length; i++) {
                            if(this.workCategory[i].id == category) {
                                category = i
                                break
                            }
                        }

                        this.CategoryName = this.workCategory[category].attributes.name
                        this.CategoryDesc = this.workCategory[category].attributes.description
                        if(this.workCategory[category].attributes.image.data)
                        this.imgUrl = this.workCategory[category].attributes.image.data.attributes.url
                    }
                    
                let params={"populate":'*', 'pagination[limit]': this.paginationLimit, 'pagination[start]': this.start}
                if(this.activeCategory != '-1') {
                    params = {"populate":'*', 'pagination[limit]': this.paginationLimit, 'pagination[start]': this.start, 'filters[$and][0][work_category][name][$eq]:': this.CategoryName}
                }
                await this.$axios.$request({
                    url: this.apiUrl,
                    method: this.httpMethod,
                    // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
                    params:params
                }).then((response) => {
                    this.responseData = this.responseData.concat(response.data)
                    this.start = this.start + this.paginationLimit;
                    this.total = response.meta.pagination.total;
                })


                        // VueSlickCarousel.slickGoTo(category)

                    
                this.spinner = false
               
            // } catch (error) {
                
            //     this.error = error
            //     console.log(error)
            //     }
            // }
            },
            
            changeCategory(category) {
                    this.responseData = []
                    this.start = 0
                    this.activeCategory = category
                    if(category != -1) {
                        this.CategoryName = this.workCategory[category].attributes.name
                        this.CategoryDesc = this.workCategory[category].attributes.description
                        if(this.workCategory[category].attributes.image.data)
                        this.imgUrl = this.workCategory[category].attributes.image.data.attributes.url
                        
                    }
                    this.getData()
                }
    },
        
        async mounted() {
                    this.responseData = []
                    this.start = 0
            await this.getData()
            let category = this.$route.params.id != null ? this.$route.params.id : -1
            
                    if(category != -1) {
                        for(let i=0; i<this.workCategory.length; i++) {
                            if(this.workCategory[i].id == category) {
                                category = i
                                break
                            }
                        }
                        this.$refs.mySlick.goTo(category+1);
                    }
            // this.getData()
        }
}
</script>