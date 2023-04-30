<template>
    <div>
        <div class="container my-5 py-5" >
            <img src="/assets/img/aboutimg.png" class="img-fluid d-block mx-auto mb-5" v-scroll-observer="$animateCardFadeDown">
            <div class="row justify-content-center">
                <div class="col-md-8 my-auto" v-scroll-observer="$animateCardFadeLeft">
                    <div class="row justify-content-center mb-3">
                        <div class="col-md-3 p-0 z-index-2 position-relative my-auto">
                            <img v-if="contact && contact.attributes && contact.attributes.image_home.data" :src="imageurl + contact.attributes.image_home.data.attributes.url" class="img-fluid d-block mx-auto">
                        </div>
                        <div class="col-md-8 p-0 my-auto">
                            <div class="card card-body f14 fnunito text-white bg312345 my-auto hmin121 ml-75 z-index-1">
                                <div class="ps-0 ps-md-5">
                                    Hi there, I'm a graphic and UI/UX designer with a passion for creating beautiful and effective designs. With over 10 years of experience working with clients in various industries, I specialize in engaging user interfaces, creating eye-catching logos and stunning illustrations
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 my-auto text-center my-auto" v-scroll-observer="$animateCardFadeRight">
                    <nuxt-link class="btn btncontact mb-3" to="/contact#contactme">
                        <div class="f32 fblack fw400 ffreehouse">
                            CONTACT ME 

                        </div>
                        <div class="f64 fblack fw400 ffreehouse">
                            NOW
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>    
</template>


<script>
export default {
    data() {
        return {
            imageurl: this.$imageurl,
            contact: '',
            loading: true
        }
    },
    methods: {
        getContact() {
            this.loading = true
            this.$axios.get('about', {params: {populate:'*'}})
            .then((res) => {
                this.contact = res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.loading = false
            })
        }
    },
    mounted() {
        this.getContact()
    }
}
</script>