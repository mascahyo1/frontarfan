<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-md pt-0">
                <div class="container">
                    
        
                    <nuxt-link class="navbar-brand bg-danger m-0 d-block d-md-none" to="/#" ><img src="/assets/img/logo.png" class="img-fluid "></nuxt-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="mynavbar">
                    <ul class="ms-auto">

                    </ul>
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <nuxt-link class="nav-link f14 finter px-0 px-md-5" to="/">Home</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link f14 finter px-0 px-md-5" to="/work">Work</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link f14 finter px-0 px-md-5" to="/#dota2">Project</nuxt-link>
                        </li>
                    </ul>
                    <nuxt-link class="navbar-brand   d-none d-md-block" to="/#" ><img src="/assets/img/logo.png" class="img-fluid "></nuxt-link>
                    <ul class=" navbar-nav ">
                        <li class="nav-item">
                            <nuxt-link class="nav-link f14 finter px-0 px-md-5" to="/blog">Blog</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link f14 finter px-0 px-md-5" to="/#about_us">About</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link f14 finter px-0 px-md-5" to="/contact">Contact</nuxt-link>
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
import { mapGetters  } from 'vuex';

export default {
  name: 'headerComponent',
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'isUser', 'isToken'])

  },
  mounted() {
  }
}
</script>