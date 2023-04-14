<template>
    <div class="container my-5 py-5">

        <div v-if="spinner">
            <spinnerComponent/>
        </div>
        <div v-else>
            <div class="ffreehouse f48 mb-5">
                <span class="text-white">SERVICES </span>
                <span class="color376FFE">I OFFER</span>
            </div>
            <div class="row align-items-stretch">

                <div class="col-md-4 mb100px" v-for="(r,index) in responseData">
                    <div :class="{'card bd16':1, 'bg1CD793':index % 3 == 0,  'bg376FFE':index % 3 == 1,  'bgFC7899':index % 3 == 2}">
                        <div :class="{'card-body bd16': 1, 'bg1CD793':index % 3 == 0,  'bg376FFE':index % 3 == 1,  'bgFC7899':index % 3 == 2}">
                            <div class="text-white text-center f40 ffreehouse">{{ r.attributes.name }}</div>
                            <div class="text-center color180830 f35 ffreehouse mb-5">DESIGN</div>
                            <p class="color180830 f14 fw700 mb-5">{{ r.attributes.description }}</p>
                            <nuxt-link class="centerdetailservicesbtn bgFED83C bd100 pd19px position-absolute" :to="{name:'work-category-id', params:{id:r.id}}"><i class="fas fa-arrow-right fi40 colorblack"></i></nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'servicesComponent',
        data() {
            return {
                spinner:true,
            }
        },
        methods: {
            async getData() {
                this.spinner = true
                try {
                    await this.$axios.$request({
                        url: 'work-categories',
                        method: 'get',
                        params: {
                            
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