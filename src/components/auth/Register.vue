<template>
    <div id="register">
        <div class="container">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" v-model="email" class="form-control" id="email" name="email" placeholder="name@example.com">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="name" v-model="name" class="form-control" id="name" name="name">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" name="password">
            </div>
            <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirm password</label>
                <input type="password" v-model="confirmPassword" class="form-control" id="confirm-password" name="confirm-password">
            </div>
            <div class="mb-3 row">
                <div class="col-7"><router-link to="/login">Already have an account ?</router-link></div>
                <div class="col d-flex justify-content-end">
                    <button @click="login" type="button" class="btn btn-outline-success">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;
axios.defaults.withCredentials = true;
export default {
    name: 'Register',
    data () {
        return {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        }
    },
    created() {
        document.title = "Register"
    },
    methods: {
        login: function () {
            axios.post('http://backend.test/api/register', {
                email: this.email,
                name: this.name,
                password: this.password,
                confirmPassword: this.confirmPassword,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },

}
</script>

<style scoped>
    .container {
        max-width: 400px;
    }
</style>