<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-md pt-0">
                <div class="container pt-5">
                    
        
                    <nuxt-link class="navbar-brand  m-0 mx-auto d-block d-md-none" to="/" ><img src="/assets/img/logo.png" class="img-fluid d-block mx-auto"></nuxt-link>
                    <div class="collapse navbar-collapse" id="mynavbar">
                    <ul class="ms-auto">

                    </ul>
                    <ul class="navbar-nav ">
                        <li class="nav-item px-0 ps-xl-0 pe-xl-5 pe-lg-3 ps-lg-0 pe-md-2 ps-md-0">
                            <nuxt-link :class="{'nav-link f14 finter ':1, 'active':$route.path == '/'}" to="/">Home</nuxt-link>
                        </li>
                        <li class="nav-item px-0 px-xl-5 px-lg-3 px-md-2">
                            <nuxt-link :class="{'nav-link f14 finter ':1, 'active':$route.path.includes('/work')}" to="/work">Services</nuxt-link>
                        </li>
                        <!-- <li class="nav-item px-0 px-xl-5 px-lg-3 px-md-2">
                            <nuxt-link :class="{'nav-link f14 finter ':1, 'active':$route.path.includes('/project')}" to="/project">Work</nuxt-link>
                        </li> -->
                    </ul>
                    <nuxt-link class="navbar-brand   d-none d-md-block" to="/" ><img src="/assets/img/logo.png" class="img-fluid "></nuxt-link>
                    <ul class=" navbar-nav ">
                        <li class="nav-item px-0 px-xl-5 px-lg-3 px-md-2">
                            <nuxt-link :class="{'nav-link f14 finter ':1, 'active':$route.path.includes('/project')}" to="/project">Work</nuxt-link>
                        </li>
                        <!-- <li class="nav-item px-0 px-xl-5 px-lg-3 px-md-2">
                            <nuxt-link :class="{'nav-link f14 finter ':1, 'active':$route.path.includes('/blog')}" to="/blog">Blog</nuxt-link>
                        </li> -->
                        <!-- <li class="nav-item px-0 px-xl-5 px-lg-3 px-md-2">
                            <nuxt-link :class="{'nav-link f14 finter ':1, 'active':$route.path.includes('/about')}" to="/about">About</nuxt-link>
                        </li> -->
                        <li class="nav-item px-0 pe-xl-0 ps-xl-5 ps-lg-3 pe-lg-0 ps-md-2 pe-md-0">
                            <nuxt-link :class="{'nav-link f14 finter ':1, 'active':$route.path.includes('/contact')}" to="/contact">Contact</nuxt-link>
                        </li>
                    </ul>
                    <ul class="me-auto">

                    </ul>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>

export default {
  name: 'headerComponent',
  computed: {
    // ...mapGetters('auth', ['isLoggedIn', 'isUser', 'isToken'])

  },
  mounted() {
  }
}
</script>