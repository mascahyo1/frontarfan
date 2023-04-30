<template>
    <div>
        <div class="container my-5 py-5">
            <div v-if="loading">
                <spinnerComponent/>
            </div>
            <div v-else>
                <img v-if="contact.attributes.image_contact.data" :src="this.imageurl + contact.attributes.image_contact.data.attributes.url " class="img-fluid mb-5 d-block mx-auto" v-scroll-observer="$animateCardFadeDown">
                <div class="mb-5 ffreehouse f48 color70A6DD f30-sm" v-scroll-observer="$animateCard">
                    PROFESSIONALLY
                </div>
                <div class="row mb-5">
                    <div class="col-md-6 text-white f32 ffreehouse mb-3" v-scroll-observer="$animateCardFadeLeft">
                        Specialising
                        in digital services,
                        I like designing
                        products that
                        contributes positively
                        to society.
                    </div>
                    <div class="col-md-6 mb-3 fnunito f20 text-white mb-3" v-scroll-observer="$animateCardFadeRight">
                        I am a multi-disciplinary designer from Indonesia, and I spend most of my time designing for entrepreneurs.
                        <br><br>
                        In the last 6 years, I’ve been exploring the nuances of digital product design—design consulting, business design, service design, and UX. Moving forward, I would like to apply my knowledge to various industries that design hasn’t influenced enough yet.
                        <br><br>
                        I believe that all designers make impact with their work. No matter how small the project, everything carries even a bit of karma. I make a conscious choice to work on ethical ventures whenever possible.
                    </div>
                </div>
                <div class="row mb-5" v-if="contact.attributes.gallery.data">
                    <div class="col-md-4 mb-3" v-for="g in contact.attributes.gallery.data">
                        <img :src=" imageurl + g.attributes.url " class="w-100 mb-4 d-block mx-auto rounded-3" v-scroll-observer="$animateCardFadeLeft">
                        <!-- <nuxt-link class="btn btn_contact w-100 text-white" to="/contact">@arvanofsky</nuxt-link> -->
                    </div>
                </div>
                
                <div class="mb-5 ffreehouse f48 f30-sm color70A6DD" v-scroll-observer="$animateCard">
                    PERSONALLY
                </div>
                
                <div class="row mb-5">
                    <div class="col-md-6 mb-3"  v-scroll-observer="$animateCardFadeLeft">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card border-0 p-0 bd16 bg1CD793 mb-3">
                                    <div class="card-body p-0">
                                        <div class="p-3">
                                            <div class="color2B41A1 ffreehouse f36 mb-5">
                                                i love hiking,
                                                nature amaze me
                                            </div>
                                            <div class="mb-5 colorblack fnunito f14">
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes
                                            </div>
                                        </div>
                                        <img src="/assets/img/mountain 1.png" class="img-fluid bd16"> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12" >

                                <div class="card border-0 p-0 bd16 bgFC7899 mb-3" >
                                    <div class="card-body p-0">
                                        <div class="p-3">
                                            <div class="color180830 ffreehouse f36 mb-5">
                                                learn new things
                                                is best experience
                                            </div>
                                            <div class="mb-5 colorblack fnunito f14">
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes
                                            </div>
                                        </div>
                                        <img src="/assets/img/wrench 1.png" class="img-fluid bd16 d-block ms-auto"> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6" v-scroll-observer="$animateCardFadeRight">
                        <div class="card border-0 p-0 bd16 bg2B41A1 mb-3">
                            <div class="card-body p-0">
                                <div class="p-3">
                                    <div class="f36 ffreehouse text-white mb-5">
                                        i’m sucker for movies
                                    </div>
                                    <div class="fnunito f14 text-white mb-5">
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC,This book is a treatise on the theory of ethics
                                    </div>
                                </div>
                                <img src="/assets/img/bale 1.png" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ffreehouse f64 f30-sm text-white fullCapital text-center" id="#contactme" v-scroll-observer="$animateCard">
                    let’s collaborate!
                </div>
                <div class="text-white text-center fnunito f20 mb-5">
                    I’m here to help you turn your brief into something brilliant. Just drop me a line
                </div>
                <div class="row mb-5 justify-content-center">
                    <div class="col-md-4 btn mb-5" v-scroll-observer="$animateCard">
                        <a  class=" d-block w300-sm mx-auto f20-md bd32px py16 px33 color312345 bgwhite ffreehouse f40 fullCapital" >
                            Instagram
                        </a>
                    </div>
                    
                    <div class="col-md-4 btn mb-5" v-scroll-observer="$animateCard">
                        <a target='_blank' :href="$addHttpsPrefix(contact.attributes.linkedin)"  class=" d-block w300-sm mx-auto f20-md bd32px py16 px33 color312345 bgwhite ffreehouse f40 fullCapital" >
                            Linkedin
                        </a>
                    </div>
                    
                    <div class="col-md-4 btn mb-5" v-scroll-observer="$animateCard">
                        <a target='_blank' :href="$addHttpsPrefix(contact.attributes.medium)" class=" d-block w300-sm mx-auto f20-md bd32px py16 px33 color312345 bgwhite ffreehouse f40 fullCapital" >
                            Medium
                        </a>
                    </div>
                    
                    <div class="col-md-4 btn mb-5" v-scroll-observer="$animateCard">
                        <a target='_blank' :href="'mailto:' +(contact.attributes.email)" class=" d-block w300-sm mx-auto f20-md bd32px py16 px33 color312345 bgwhite ffreehouse f40 fullCapital" >
                            email
                        </a>
                    </div>
                    
                    <div class="col-md-4 btn mb-5" v-scroll-observer="$animateCard">
                        <a  target='_blank' :href="$addHttpsPrefix(contact.attributes.behance)" class=" d-block w300-sm mx-auto f20-md bd32px py16 px33 color312345 bgwhite ffreehouse f40 fullCapital" >
                            behance
                        </a>
                    </div>
                    
                    <div class="col-md-4 btn mb-5" v-scroll-observer="$animateCard">
                        <a  target='_blank' :href="'https://wa.me/'+(contact.attributes.whatsapp)" class=" d-block w300-sm mx-auto f20-md bd32px py16 px33 color312345 bgwhite ffreehouse f40 fullCapital" >
                            whatsapp
                        </a>
                    </div>
                </div>
                <div class="mb-5 text-center" v-scroll-observer="$animateCard">
                    <a download="download" target="_blank" :href="imageurl+contact.attributes.cv.data.attributes.url" class="colorblack ffreehouse f24 bd16 bgFED83C px33 py13">DOWNLOAD</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 export default {
    name:'contact',
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