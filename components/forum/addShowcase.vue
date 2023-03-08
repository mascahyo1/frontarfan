<template>
  <div class="container my-5">
    <h1 class="text-center text-primary">Add Showcase</h1>
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <div class="alert alert-danger" v-for="ed in errorDetail">
      {{ ed.message }}
    </div>
    <div class="alert alert-success" v-if="success">
      Data added successfully
    </div>
    <form @submit.prevent="addShowcaseRequest">
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="kill" placeholder="Enter your kill" v-model="form.kill" >
    <label class='text-primary' for="kill">kill</label>
  </div>
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="death" placeholder="Enter your death" v-model="form.death" >
    <label class='text-primary' for="death">death</label>
  </div>
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="assist" placeholder="Enter your assist" v-model="form.assist" >
    <label class='text-primary' for="assist">assist</label>
  </div>
  <div class="form-floating mb-3">
    <input type="match_id" class="form-control" id="match_id" placeholder="Enter your match_id" v-model="form.match_id" >
    <label class='text-primary' for="match_id">match id </label>
  </div>
  <div class="form-floating mb-3">
    <input type="match_id" class="form-control" id="hero" placeholder="Enter your hero" v-model="form.hero" >
    <label class='text-primary' for="hero">Hero </label>
  </div>
  <div class="form-floating mb-3">
    <textarea class="form-control" id="description" rows="5" style="min-height: 200px;"  v-model="form.description"></textarea>
    <label class='text-primary' for="description">description</label>
  </div>
  <div class="mb-3">

    <label for="image">Select an image:</label>
    <input type="file" id="image" @change="onImageSelected" class=" mb-3">
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="Selected image" class="img-fluid mb-3 d-block mx-auto">
    </div>
  </div>
  <button type="submit" value="submit" class="btn btn-primary rounded-pill px-4 py-2" style="background-color: #007bff; border-color: #007bff;">Add</button>
  <nuxt-link to="/manage-showcase" class="btn btn-outline-primary rounded-pill px-4 py-2 ms-2">Back</nuxt-link>
</form>


  </div>
</template>

<script>
export default {
    name: 'addShowcase',
  data() {
    return {
      errorDetail: [],
      selectedImage: null,
      imageUrl: null,
      success: false,
      error: false,
      form: {
        match_id: '',
        kill: '',
        death: '',
        assist: '',
        description: '',
        hero: '',
        image:''
      }
    }
  },
  methods: {
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
    async addShowcaseRequest(e) {
        const formData = new FormData();
        formData.append('files', this.selectedImage)
        try {
          let res = await this.$axios.post("/upload", formData)
          this.form.image = (res.data[0].id)
        const response = await this.$axios.$request({
          url: '/showcases',
          method: 'POST',
          // headers: {'Authorization': 'Bearer ' + this.$publictoken, 'Content-Type': 'application/json'},
          data: {data: {
            match_id: this.form.match_id,
            kill: this.form.kill,
            death: this.form.death,
            assist: this.form.assist,
            description: this.form.description,
            hero: this.form.hero,
            image: this.form.image
          }},
        })
        this.success = true
        this.form = {
          match_id: '',
          kill: '',
          death: '',
          assist: '',
          description: '',
          hero: '',
          image: '',
        }
        this.error = false
        this.errorDetail = []
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error.message
        // console.log(error.response.data.error)
        console.log(error.response.data.error.details)
        if(error.response.data.error.details) {
          this.errorDetail = error.response.data.error.details.errors
          console.log(this.errorDetail)
        }
        this.success = false
        // console.log(error.response.data.error.details.errors)
      }
    }
  }
}
</script>

