<template>
  <div class="container my-5">
    <h1 class="text-center text-primary">Showcase</h1>
  </div>
</template>

<script>
import logoutbtn from '../logoutbtn.vue'
export default {
    name: 'editShowcase',
    components: {
        logoutbtn
    },
    mounted() {
        this.getProfile()
    },
    data() {
    return {
      updateProfile: 0,
      form: {
        name: '',
        email: '',
        steam_id: '',
      },
      changePasswordSuccess: false,
      changePasswordError: false,
      changePasswordErrorDetail: '',
      updateProfileSuccess: false,
      updateProfileError: false,
      updateProfileErrorDetail: '',
      changePassword: {
        password: '',
      },
      success: false,
      error: '',
    }
  },
  methods: {
    async getProfile() {
        try {
            const response = await this.$axios.$request({
                url: this.$baseurl + '/users/me',
                method: "GET",
                // headers: {'Authorization': 'Bearer ' + this.$store.state.auth.token, 'Content-Type': 'application/json'},
            })
            console.log(response)
            this.form.name = response.name
            this.form.email = response.email
            this.form.steam_id = response.steam_id
            // form.name = this.response.data.name
        } catch (error) {
            console.log(error)
        }
    },
    async submitForm() {
      try {
        // Make an API request to update the user's profile
        const response = await this.$axios.$request({
                url: this.$baseurl + '/users/' + this.$store.state.auth.user.user.id,
                method: "PUT",
                headers: {'Authorization': 'Bearer ' + this.$store.state.auth.token, 'Content-Type': 'application/json'},
                data: this.form
        })
        this.updateProfileSuccess = true
        this.updateProfileError = false
      } catch (error) {
        this.updateProfileSuccess = false
        this.updateProfileError = true
        this.updateProfileErrorDetail = error.response.data.error.message
      }
    },
    async ChangePassword() {
      try {
        // Make an API request to update the user's profile
        const response = await this.$axios.$request({
                url: this.$baseurl + '/users/' + this.$store.state.auth.user.user.id,
                method: "PUT",
                headers: {'Authorization': 'Bearer ' + this.$store.state.auth.token, 'Content-Type': 'application/json'},
                data: this.changePassword
        })
        this.changePasswordSuccess = true
        this.changePasswordError = false
      } catch (error) {
        this.changePasswordSuccess = false
        this.changePasswordError = true
        this.changePasswordErrorDetail = error.response.data.error.message
      }
    },
  },


  }
</script>
