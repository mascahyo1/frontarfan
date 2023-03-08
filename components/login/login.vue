<template>
    <div>
        <div class="container mt-5">
	<div class="row justify-content-center">
		<div class="col-md-6">
			<div class="card login-card">
				<div class="card-header">Login</div>
				<div class="card-body">
                    <div class="alert alert-danger" v-if="errorMessage">
                        {{ errorMessage  }}
                    </div>
					<form @submit.prevent="login">
						<div class="mb-3">
							<label for="email" class="form-label">Email</label>
							<input type="email"  v-model="identifier" class="form-control" id="email" name="email" required>
						</div>
						<div class="mb-3">
							<label for="password" class="form-label">Password</label>
							<input type="password"  v-model="password" class="form-control" id="password" name="password" required>
						</div>
						<div class="d-flex justify-content-between align-items-center mb-3">
							<a href="#">Forgot password?</a>
							<button type="submit" class="btn btn-primary">Login</button>
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
						<p class="text-center">Don't have an account? <nuxt-link to="/register">Register</nuxt-link></p>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

    </div>
</template>

<script>
import { createStore }  from 'vuex';


export default {
    name: 'login',
    components: {

    },
    data() {
        return {
            identifier: '',
        password: '',
        errorMessage: ''
        }
    },
    methods: {
        async login() {
            // try {
            //     const response = await this.$axios.post( this.$baseurl + '/auth/local', {
            //     identifier: this.identifier,
            //     password: this.password
            //     })
            //     createStore({
            //         state: {
            //             user: JSON.stringify(response.data),
            //         },
            //     })
            //     // Handle the response from the server
            //     localStorage.setItem('auth', JSON.stringify(response.data))
            //     this.$router.push('/')
            // } catch (error) {
            //     // Handle errors
            //     this.errorMessage = error.response.data.error.message
            //     console.error(error)
            // }
            let response = await this.$store.dispatch('auth/login', {
                identifier: this.identifier,
                password: this.password
            })
            if(response.status == 200) {
                this.$router.push('/')
            } else {
                console.log(response)
                this.errorMessage = response.response.data.error.message
            }

        }
    }

  }
</script>
