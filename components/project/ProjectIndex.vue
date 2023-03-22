<template>
    <div>
        <div class="container my-5 py-5">
            <div class="text-center mb-1 f17 fpoppins colorsecondary50">
                My Work
            </div>
            <div class="f42 fpoppins fw600 text-center mb-5">
                <span class="colorsecondary50">Ongoing</span> 
                <span class="fred">Project</span>
            </div>
            <div class="row mb-5">
                <div class="col-12 mb-5">
                    <div class="row" v-for="r in responseData">
                        <div class="col-md-6 mb-3">
                            <div class="mb-3 colorsecondary50 fw700 f34 fpoppins">
                                {{ r.attributes.title }}
                            </div>
                            <div class="colorsecondary f14 finter mb-3">
                                {{ r.attributes.description }}
                            </div>
                            
                        </div>

                        <div class="col-md-6 mb-3">
                            <img  v-if="r.attributes.image.data" :src="baseUrl + r.attributes.image.data.attributes.url" class="img-fluid d-block mx-auto mb-5">
                            <div class="row">
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <span class="fpoppins fw700 fdarkprimary  f21">Tools</span>
                                    <ul class="nobullet mt-3">
                                        <li class="colorsecondary finter f14" v-for="t in r.attributes.tools.data">
                                            {{t.attributes.name}}
                                        </li>   
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <div class="fpoppins fw700 fdarkprimary f21 mb-3">Client</div>
                                    <div class="colorsecondary finter f14">{{ r.attributes.client }}</div>
                                </div>
                                
                            </div>
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <div class="fpoppins fw700 fdarkprimary mb-3 f21">Timeframe</div>
                                    <div class="colorsecondary finter f14">{{ $montharfan(r.attributes.start) }} - {{ $montharfan(r.attributes.finish) }}</div>
                                </div>
                                
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="spinner" class="mb-5">
                <spinnerComponent/>
            </div>
            <div class="text-center" v-if="total > start">
                <button @click="getProject()" class="btn text-center">Load More</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.getProject()
        },
        data() {
            return {
                spinner: true,
                baseUrl: this.$imageurl,
                paginationLimit: 5,
                start: 0,
                total: 5,
                responseData: []
            }
        },
        methods: {
            async getProject() {
                this.spinner = true;
                await this.$axios.get('works',{params:{
                    "populate": '*', 
                    'sort[0]': 'id:desc',
                    'pagination[limit]': this.limitPagination, 
                    'pagination[start]': this.start,
                    'filters[$and][0][work_category][name][$eq]:': 'PROJECT'
                    }})
                    .then((response) => {
                        console.log(response.data.meta.pagination.total)
                        this.responseData = this.responseData.concat(response.data.data)
                        this.start = this.start + this.paginationLimit;
                        this.total = response.data.meta.pagination.total;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                this.spinner = false;
            }
        },
    }
</script>