<template>
  <div class="container my-5">
      
    <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="updateProfileSuccess">
      <strong>Success!</strong> Profile Updated.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="updateProfileError">
        <strong>Failed</strong> {{updateProfileError}}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="alert alert-danger alert-dismissible fade show" role="alert" v-for="ue in updateProfileErrorDetail">
        <strong>Failed</strong> {{ue.message}}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    <h1>Update Profile</h1>
      
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <div v-if="imageUrl">
          <img :src="imageUrl" alt="Selected image" class="img-fluid mb-3 d-block mx-auto">
        </div>
        <input type="file" class="form-control mb-3" id="image" @change="onImageSelected">
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="form.name" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="form.email" required>
      </div>
      <div class="mb-3">
        <label for="steam_id" class="form-label">steam id</label>
        <input type="steam_id" class="form-control" id="steam_id" v-model="form.steam_id" required>
      </div>
      <!-- <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="form.password" required>
      </div> -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <hr>
    <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="changePasswordSuccess">
  <strong>Success!</strong> Password Changed.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="changePasswordError">
<strong>Failed</strong> {{changePasswordErrorDetail}}.
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
    <h1>Change Password</h1>
    <form @submit.prevent="ChangePassword">
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="changePassword.password" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <hr>
    <logoutbtn/>
  </div>
</template>

<script>
import logoutbtn from '../components/logoutbtn.vue'
export default {
  middleware: ['authenticated'],
  name: 'Profile',
  layout: 'default',
  components: {
      logoutbtn
  },
  mounted() {
      this.getProfile()
  },
  data() {
  return {
    updateProfile: 0,
    
    selectedImage: null,
    imageUrl: null,
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
    updateProfileErrorDetail: [],
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
              url: this.$baseurl + '/users/me?populate=*',
              method: "GET",
              headers: {'Authorization': 'Bearer ' + this.$store.state.auth.token, 'Content-Type': 'application/json'},
          })
          console.log(response)
          this.form.name = response.name
          this.form.email = response.email
          this.form.steam_id = response.steam_id
          this.imageUrl = this.$imageurl + response.image.url
          // form.name = this.response.data.name
      } catch (error) {
          console.log(error)
      }
  },
  
  onImageSelected(event) {
    this.selectedImage = event.target.files[0]
    this.previewImage()
  },
  previewImage() {
    const reader = new FileReader()
    reader.readAsDataURL(this.selectedImage)
    reader.onload = () => {
      this.imageUrl = reader.result
    }
  },
  async submitForm() {
    try {
      // Make an API request to update the user's profile
      if(this.selectedImage) {
        const formData = new FormData();
        formData.append('files', this.selectedImage)
        let res = await this.$axios.post("/upload", formData)
        this.form.image = (res.data[0].id)
      }
      const response = await this.$axios.$request({
              url: this.$baseurl + '/users/' + this.$store.getters['auth/isUser'].user.id,
              method: "PUT",
              headers: {'Authorization': 'Bearer ' + this.$store.state.auth.token, 'Content-Type': 'application/json'},
              data: this.form
      })
      this.updateProfileSuccess = true
      this.updateProfileError = false
      this.updateProfileErrorDetail = []
    } catch (error) {
      this.updateProfileSuccess = false
      this.updateProfileError = true
      if(error.response.data != null) {

        this.updateProfileError = error.response.data.error.message
        if(error.response.data.error.details) {
          this.updateProfileErrorDetail = error.response.data.error.errors
        }
      }
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
