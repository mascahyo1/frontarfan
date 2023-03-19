<template>
    <div>
        <div class="container my-5 py-5">
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
                    <div class="col-md-3 my-auto">
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
            <div class="mb-5">
                
                <VueSlickCarousel v-if="workCategory.length"  v-bind="settings" class="mb-5 nav nav-tabs">
                    <div>
                        <li class="nav-item">
                            <a :class="{'nav-link':1, 'active':activeCategory == '-1' }" @click="changeCategory('-1')">All</a>
                        </li>
                    </div>
                    <div v-for="(w,index) in workCategory">
                        <li class="nav-item">
                            <a :class="{'nav-link':1, 'active':activeCategory == index }" @click="changeCategory(index)"> {{ w.attributes.name }}</a>
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
                baseUrl: this.$imageurl,
                apiUrl: 'works',
                httpMethod: 'GET',
                imgUrl: '',
                responseData: [],
                workCategory:[],
                CategoryName: '',
                CategoryDesc: '',
                activeCategory:'-1',
                start: 0,
                paginationLimit: 9,
                total: 9,
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
        methods: {

            getData() {
                
            // try {
                let params={"populate":'*', 'pagination[limit]': this.paginationLimit, 'pagination[start]': this.start}
                if(this.activeCategory != '-1') {
                    params = {"populate":'*', 'pagination[limit]': this.paginationLimit, 'pagination[start]': this.start, 'filters[$and][0][work_category][name][$eq]:': this.activeCategory}
                }
                this.$axios.$request({
                        url: 'work-categories',
                        method: this.httpMethod,
                        // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
                        params:{"populate":'*', 'pagination[limit]': 1000, 'pagination[start]': 0, 'filters[$and][0][name][$ne]:': 'PROJECT'}
                    }).then((response) => {
                        this.workCategory = response.data
                    })
                this.$axios.$request({
                    url: this.apiUrl,
                    method: this.httpMethod,
                    // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
                    params:params
                }).then((response) => {
                    this.responseData = this.responseData.concat(response.data)
                    this.start = this.start + this.paginationLimit;
                    this.total = response.meta.pagination.total;
                })


               
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
                    this.getData()
                    if(category != -1) {
                        this.CategoryName = this.workCategory[category].attributes.name
                        this.CategoryDesc = this.workCategory[category].attributes.description
                        if(this.workCategory[category].attributes.image.data)
                        this.imgUrl = this.workCategory[category].attributes.image.data.attributes.url
                        
                    }
                }
    },
        
        mounted() {
            this.getData()
        }
}
</script>