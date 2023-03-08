<template>
    <div>
        <div class="container mt-5">
	<div class="row justify-content-center">
		<div class="col-md-6">
			<div class="card login-card">
				<div class="card-header">Register</div>
				<div class="card-body">
                    <div class="alert alert-danger" v-if="errorMessage">
                        {{ errorMessage  }}
                    </div>
                    <div class="alert alert-danger" v-for="e in errordetail">
                        {{ e .message }}
                    </div>
					<form @submit.prevent="login">
						<div class="mb-3">
							<label for="name" class="form-label">Name</label>
							<input type="name"  v-model="name" class="form-control" id="name" name="name" required>
						</div>
						<div class="mb-3">
							<label for="username" class="form-label">Username</label>
							<input type="username"  v-model="username" class="form-control" id="username" name="username" required>
						</div>
						<div class="mb-3">
							<label for="email" class="form-label">Email</label>
							<input type="email"  v-model="email" class="form-control" id="email" name="email" required>
						</div>
						<div class="mb-3">
							<label for="password" class="form-label">Password</label>
							<input type="password"  v-model="password" class="form-control" id="password" name="password" required>
						</div>
						<div class="d-flex justify-content-between align-items-center mb-3">
							<a href="#">Forgot password?</a>
							<button type="submit" class="btn btn-primary">Register</button>
						</div>
						<hr class="my-4">
						<p class="text-center">or login with:</p>
						<div class="d-grid gap-2">
							<a href="#" class="btn btn-outline-primary">
								<i class="fab fa-facebook"></i> Login with Facebook
							</a>
							<a href="#" class="btn btn-outline-danger">
								<i class="fab fa-google"></i> Login with Google
							</a>
						</div>
						<hr class="my-4">
						<p class="text-center">Already have an Account? <nuxt-link to="/login">Login</nuxt-link></p>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

    </div>
</template>

<script>

export default {
    name: 'Register',
    components: {

    },
    data() {
        return {
            name: '',
            username: '',
            email: '',
            password: '',
            errorMessage: '',
            errordetail:''
        }
    },
    methods: {
        async login() {
            try {
                const response = await this.$axios.post( this.$baseurl + '/auth/local/register', {
                email: this.email,
                name: this.name,
                username: this.username,
                password: this.password
                })
                // Handle the response from the server
                this.$router.push('/')
                localStorage.setItem('auth', JSON.stringify(response.data))
            } catch (error) {
                if(error.response.data.error.details.length) {
                    this.errordetail = error.response.data.error.details.errors
                } else {
                    this.errorMessage = error.response.data.error.message
                }
            }
        }
    }

  }
</script>
