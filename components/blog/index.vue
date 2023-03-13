<template>
    <div>
        <div class="container my-5 pt-5">
            <div class="row mb-5">
                <div class="col-12 mb-5"  v-for="(b,index) in blog">

                        <div class="row">
                            <div :class="{'col-md-6 my-auto order-1':1, 'order-md-2': index%2 == 1}" >
                                <div class="mb-3">
                                <img v-if="b.attributes.image.data" :src="baseUrl + b.attributes.image.data.attributes.url" class="img-fluid">
                                </div>
                            </div>
                            <div :class="{'col-md-6 my-auto order-2':1, 'order-md-1': index%2 == 1 }">
                                <div class="mb-3 f11 finter colorgrey">
                                    <div class="mb-1">
                                        {{ $datearfan(b.attributes.createdAt) }} by {{ b.attributes.author }}
                                    </div class="mb-3">
                                    <div class="text-truncate f34 fpoppins fw700">
                                        {{ b.attributes.title }}
                                    </div>
                                    <div class="description_blog finter f14 colorsecondary finter mb-5">
                                        {{ b.attributes.description }}
                                    </div>
                                    <div>
                                        <nuxt-link :to="{name:'blog-id', params:{id:b.id}}" class="btn fpoppins f17 colorsecondary50">
                                            Read More <i class="fa fa-angle-right"></i>
                                        </nuxt-link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div>
            <div class="text-center" v-if="total > start">
                <button @click="getBlog()" class="btn text-center">Load More</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout:'default',
    name: 'Blog',
    components: {
    },
    data() {
        return {
            blog: [],
            baseUrl: this.$imageurl,
            start: 0,
            paginationLimit: 5,
            total: 5
        }
    },
    mounted() {
        this.getBlog();
    },
    methods: {
        getBlog() {
            this.$axios.get('blogs', {params:{"populate":'*', 'pagination[limit]': 5, 'pagination[start]': this.start}})
                .then((response) => {
                    this.blog = this.blog.concat(response.data.data);
                    this.start = this.start + this.paginationLimit;
                    this.total = response.data.meta.pagination.total;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }

}
</script>
