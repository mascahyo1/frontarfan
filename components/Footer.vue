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
                            <li class="nav-item">
                                <nuxt-link to="/blog" :class="{'nav-link':1, 'active':$route.path.includes('/blog')}" >
                                    <div class="text-center text-white">
                                        <i class="fa fa-blog f30"></i>
                                    </div>
                                </nuxt-link>
                            </li>
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
            <footer>
                <div class="container bg3F4D7C py-5 bd16">
                    <div class="row">
                        <div class="col-md-6 my-auto">
                            <div class="mb-5">
                                <img src="/assets/img/logo.png" class="img-fluid mb-1">
                                <div class="ps-3 f14 fnunito text-white ">Arfan Amrullah, Graphic & UI/UX Designer - {{ new Date().getFullYear() }}</div>
                            </div>
                        </div>
                        <div class="col-md-6 my-auto">
                            <div class="mb-5">
                                <nuxt-link class="bd16 p34px mx-3 bgFC7899 mb-4 " to="#"><i class="fa-brands f29 fa-behance colorblack"></i></nuxt-link>
                                <nuxt-link class="bd16 p34px mx-3 bg1CD793 mb-4 " to="#"><i class="fa-brands f29 fa-linkedin-in colorblack"></i></nuxt-link>
                                <nuxt-link class="bd16 p34px mx-3 bg376FFE mb-4 " to="#"><i class="fa-brands f29 fa-instagram colorblack"></i></nuxt-link>
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
  name: 'Footer'
}
</script>