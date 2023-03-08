<template>
    <div>
        <h1 class="mb-3 text-center text-primary">News</h1>
        <div class="row justify-content-center">
            <div class="col-md-4 mb-3" v-for="d in data">
                <nuxt-link :to="{name:'news-id', params:{id:d.id}}">
                    <div class="card border-0" >
                        <img v-if="d.attributes.image.data" :src="baseUrl+d.attributes.image.data.attributes.url " class="card-img-top">
                        <div class="card-body">
                            <div class="card-title text-primary">
                                {{ d.attributes.title }}
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        
        data() {
            return {

                baseUrl: this.$imageurl,
            }
        },
        props: {
            data: []
        }
    }
</script>