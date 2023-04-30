<template>
    <div>
        <div class="container my-5 py-5">
            <div class="text-center mb-1 f17 fpoppins text-white text-white">
                My Work
            </div>
            <div class="f42 fpoppins text-white fw600 text-center mb-5">
                <span class="text-white">Ongoing</span> 
                <span class="fred">Project</span>
            </div>
            <div class="row mb-5">
                <div class="col-12 mb-5" >
                    <div class="row" v-for="r in responseData" v-scroll-observer="$animateCard">
                        <div class="col-md-6 mb-3">
                            <div class="mb-3 text-white fw700 f34 fpoppins">
                                {{ r.attributes.title }}
                            </div>
                            <div class="text-white f14 finter mb-3">
                                {{ r.attributes.description }}
                            </div>
                            
                        </div>

                        <div class="col-md-6 mb-3">
                            <div v-if="r.attributes.type == 'video'">
                                <iframe :src="'https://www.youtube.com/embed/'+r.attributes.youtube_id+'?autoplay=0&cc_load_policy=1&mute=0&loop=1&playlist='+r.attributes.youtube_id+'&controls=1&showinfo=0'" width="100%" height="300px" allow="fullscreen;"></iframe>
                            </div>
                            <div v-else>
                                <img  v-if="r.attributes.image.data" :src="baseUrl + r.attributes.image.data[0].attributes.url" class="img-fluid d-block mx-auto bd16 mb-5">
                            </div>
                            <div class="row">
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <span class="fpoppins text-white fw700 text-white  f21">Tools</span>
                                    <ul class="nobullet mt-3">
                                        <li class="text-white finter f14" v-for="t in r.attributes.tools.data">
                                            {{t.attributes.name}}
                                        </li>   
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <div class="fpoppins text-white fw700 text-white f21 mb-3">Client</div>
                                    <div class="text-white finter f14">{{ r.attributes.client }}</div>
                                </div>
                                
                            </div>
                            <div class="col-md-4 mb-3 ">
                                <div class="mb-3">
                                    <div class="fpoppins text-white fw700 text-white mb-3 f21">Timeframe</div>
                                    <div class="text-white finter f14">{{ $montharfan(r.attributes.start) }} - {{ $montharfan(r.attributes.finish) }}</div>
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
                <button @click="getProject()" :class="{'btn text-center text-white':1, 'disabled':spinner == 1}" >Load More</button>
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