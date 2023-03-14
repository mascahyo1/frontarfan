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
                        
                        <img v-if="work.attributes.image.data" :src="baseUrl + work.attributes.image.data.attributes.url" class="img-fluid d-block mx-auto mb-5">
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
</template>

<script>
    export default {
        data() {
            return {
                work: {},
                apiUrl: 'works/' + this.$route.params.id,
                httpMethod: 'GET',
                baseUrl: this.$imageurl,
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
                        this.work = response.data
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