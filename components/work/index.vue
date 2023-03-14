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
export default {
    layout:'default',
    name: 'Work',
    components: {
        workCard2
    },
    data() {
            return {
                apiUrl: 'works',
                httpMethod: 'GET',
                responseData: [],
                start: 0,
                paginationLimit: 9,
                total: 9
            }
        },
        methods: {

            async getData() {
                
            try {
                const response = await this.$axios.$request({
                    url: this.apiUrl,
                    method: this.httpMethod,
                    // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
                    params:{"populate":'*', 'pagination[limit]': this.paginationLimit, 'pagination[start]': this.start}
                }).then((response) => {
                    this.responseData = this.responseData.concat(response.data)
                    this.start = this.start + this.paginationLimit;
                    this.total = response.meta.pagination.total;
                    console.log(response.data)
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