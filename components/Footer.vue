<template>
    <div>
        <div class="fixed-bottom d-block d-md-none">
            <div class="bg_footer_mobile">
                <div class="container-fluid">
                    <nav class="navbar navbar-expand ">

                        <ul class="navbar-nav justify-content-between w-100">
                            <li class="nav-item">
                                <nuxt-link to="/" :class="{'nav-link':1, 'active':$route.path == '/'}" >
                                    <div class="text-center text-white">
                                        <i class="fa fa-home f30"></i>
                                    </div>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/work" :class="{'nav-link':1, 'active':$route.path.includes('/work')}" >
                                    <div class="text-center text-white">
                                        <i class="fa fa-lightbulb f30"></i>
                                    </div>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/project" :class="{'nav-link':1, 'active':$route.path.includes('/project')}" >
                                    <div class="text-center text-white">
                                        <i class="fa-solid fa-comments-dollar f30"></i>
                                    </div>
                                </nuxt-link>
                            </li>
                            <!-- <li class="nav-item">
                                <nuxt-link to="/blog" :class="{'nav-link':1, 'active':$route.path.includes('/blog')}" >
                                    <div class="text-center text-white">
                                        <i class="fa fa-blog f30"></i>
                                    </div>
                                </nuxt-link>
                            </li> -->
                            <li class="nav-item">
                                <nuxt-link to="/contact" :class="{'nav-link':1, 'active':$route.path == '/contact'}" >
                                    <div class="text-center text-white">
                                        <i class="fa fa-message f30"></i>
                                    </div>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/about" :class="{'nav-link':1, 'active':$route.path == '/about'}" >
                                    <div class="text-center text-white">
                                        <i class="fa fa-user f30"></i>
                                    </div>
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="footer">
            <footer class="pb-5">
                <div class="container bg3F4D7C py-5 bd16 mb-5">
                    <div class="row">
                        <div class="col-md-6 my-auto" v-scroll-observer="$animateCardFadeLeft">
                            <div class="mb-5">
                                <img src="/assets/img/logo.png" class="img-fluid mb-1">
                                <div class="ps-3 f14 fnunito text-white ">Arfan Amrullah, Graphic & UI/UX Designer - {{ new Date().getFullYear() }}</div>
                            </div>
                        </div>
                        <div class="col-md-6 my-auto" v-scroll-observer="$animateCardFadeRight">
                            <div class="" v-if="contact">
                                <a class="bd16 p34px mx-3 bgFC7899 d-inline-block mb-4 " :href="$addHttpsPrefix(contact.attributes.behance)" target="blank"><i class="fa-brands fi29 fa-behance colorblack"></i></a>
                                <a class="bd16 p34px mx-3 bg1CD793 d-inline-block mb-4 " :href="$addHttpsPrefix(contact.attributes.linkedin)" target="blank"><i class="fa-brands fi29 fa-linkedin-in colorblack"></i></a>
                                <a class="bd16 p34px mx-3 bg376FFE d-inline-block mb-4 " :href="$addHttpsPrefix(contact.attributes.instagram)" target="blank"><i class="fa-brands fi29 fa-instagram colorblack"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    </div>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return {
      contact: null,
        loading: true
    }
  },
  methods: {
    //
    
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
  },
}
</script>