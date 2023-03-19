<template>
    <div>
        <div class="container my-5 py-5">
            <div class="text-center mb-1 f17 fpoppins colorsecondary50">
                MY WORK
            </div>
            <div class="text-center mb-5 f42 fw600 fpoppins">
                <span class="fdarkprimary">Featured</span> 
                <span class="fred">Project</span>
            </div>
            <div class="mb-5">
                
                <VueSlickCarousel v-if="workCategory.length"  v-bind="settings" class="mb-5 nav nav-tabs">
                    <div>
                        <li class="nav-item">
                            <a :class="{'nav-link':1, 'active':activeCategory == 'all' }" @click="changeCategory('all')">All</a>
                        </li>
                    </div>
                    <div v-for="(w,index) in workCategory">
                        <li class="nav-item">
                            <a :class="{'nav-link':1, 'active':activeCategory == w.attributes.name }" @click="changeCategory(w.attributes.name)"> {{ w.attributes.name }}</a>
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
                apiUrl: 'works',
                httpMethod: 'GET',
                responseData: [],
                workCategory:[],
                activeCategory:'all',
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
                if(this.activeCategory != 'all') {
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
                }
    },
        
        mounted() {
            this.getData()
        }
}
</script>