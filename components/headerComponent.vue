<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-xl bg-dark navbar-dark">
                <div class="container">
                    <nuxt-link class="navbar-brand" to="/#" >IDOL</nuxt-link>
        
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="mynavbar">
                        <ul class="ms-auto navbar-nav">
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/#about_us">Home</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/#about_us">About Us</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/#dota2">Dota 2</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/#12v12">12 vs 12</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/news">News</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/showcase">Showcase</nuxt-link>
                            </li>
                            <li class="nav-item" v-if="isUser">
                                
                                <nuxt-link to="/manage-showcase" class="nav-link" >Manage Showcase</nuxt-link>
                            </li>
                            <li class="nav-item">
                                
                                <nuxt-link to="/profile" class="nav-link" v-if="isUser">Profile</nuxt-link>
                                <nuxt-link to="/login" class="nav-link" v-else>Login</nuxt-link>
                            </li>
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