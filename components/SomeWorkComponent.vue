<template>
    <div class="container my-5 py-5">

        <div v-if="spinner">
            <spinnerComponent/>
        </div>
        <div v-else>
            <div class="ffreehouse f48 mb-5">
                <span class="text-white">SOME </span>
                <span class="color1CD793">WORK</span>
            </div>
            <div class="row">
                <div class="col-md-12" v-for="r in responseData" v-scroll-observer="$animateCard">
                    <div class="row">
                        <div class="col-md-6 my-auto">
                            <div class="mb-5">
                                <div v-if="r.attributes.type == 'video'">
                                    <div v-if="r.attributes.youtube_id">
                                        <img :src="'https://img.youtube.com/vi/'+r.attributes.youtube_id+'/mqdefault.jpg'" :class="{'imgslide bd16': 1}">
                                    </div>

                                </div>
                                <div v-else>
                                    <img v-if="r.attributes.image"  :src="baseUrl+r.attributes.image.data.attributes.url" class="imgslide bd16">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 my-auto">
                            <div class="mb-5">
                                <div class="mb-4 text-white f40 ffreehouse">
                                    {{ r.attributes.title }}
                                </div>
                                <div class="mb-4 text-white f14 fnunito">
                                    {{ r.attributes.description }}
                                </div>
                                <div class="mb-4">
                                    <nuxt-link class="btn colorblack bgFED83C ffreehouse f24 py-13px px-30px" :to="{name:'work-detail-id', params:{id:r.id}}">LEARN MORE</nuxt-link>
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
    export  default {
        data() {
            return {
                spinner:true,
                baseUrl: this.$imageurl,
            }
        },
        methods: {
            async getData() {
                this.spinner = true
                try {
                    await this.$axios.$request({
                        url: 'works',
                        method: 'get',
                        params: {
                            'pagination[limit]': 4,
                            'populate': '*'
                        }
                    }).then((response) => {
                        this.responseData = response.data
                    })
                } catch (error) {
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