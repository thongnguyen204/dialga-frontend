<template>
  <div id="login">
    <div class="container bg-white rounded">
    <div class="title">Login</div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          v-model="user.email"
          class="form-control"
          id="email"
          name="email"
          placeholder="name@gmail.com"
        />
        <div class="error-msg">
          {{ emailError }}
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          v-model="user.password"
          class="form-control"
          id="password"
          name="password"
        />
        <div class="error-msg">
          {{ passwordError }}
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-7">
          <router-link to="/register">Sign-up an account with us</router-link>
        </div>
        <div class="col d-flex justify-content-end">
          <button @click="login" type="button" class="btn btn-outline-success">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const axios = require("axios").default;
axios.defaults.withCredentials = true;

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "spxdialga@gmail.com",
        password: "123456",
      },

      emailError: "",
      passwordError: "",
    };
  },
  created() {
    document.title = "Login";
  },
  methods: {
    ...mapActions(['loginAction']),

    clearError: function () {
      this.emailError = "",
      this.passwordError = ""
    },

    login: function () {
      this.clearError();
      this.loginAction(this.user)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        let errors = error.response.data.errors;
        if(errors['email'])
          this.emailError = errors['email'][0];
        if(errors['password'])
          this.passwordError = errors['password'][0];
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
.title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}
.error-msg{
  color: red;
}

.container {
  margin-top: 70px;
  padding: 30px;
}
</style>