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
                                <nuxt-link to="/work" :class="{'nav-link':1, 'active':$route.path == '/work'}" >
                                    <div class="text-center text-white">
                                        <i class="fa fa-lightbulb f30"></i>
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
                <div class="container">
                    <div class="text-center mb-5">
                        <i class="fab fa-behance me-3 footer_sosmed"></i>
                        <i class="fab fa-linkedin-in me-3 footer_sosmed"></i>
                        <i class="fab fa-instagram footer_sosmed"></i>
                    </div>
                    <div class="text-center mb-1 f17 fpoppins">
                        Made in Jogjakarta
                    </div>
                    <div class="text-center finter f14">
                        © 2022 - {{ new Date().getFullYear() }}
                    </div>
                </div>
                <img src="/assets/img/footerarfan.svg" class="w-100 d-none d-md-block">
            </footer>
        </div>

    </div>
</template>

<script>

export default {
  name: 'Footer'
}
</script>