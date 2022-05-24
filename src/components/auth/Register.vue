<template>
  <div id="register">
    <div class="container bg-white rounded">
    <div class="title">Register</div>
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
        <label for="name" class="form-label">Name</label>
        <input
          type="name"
          v-model="user.name"
          class="form-control"
          id="name"
          name="name"
        />
        <div class="error-msg">
          {{ nameError }}
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
      <div class="mb-3">
        <label for="confirm-password" class="form-label">Confirm password</label>
        <input
          type="password"
          v-model="user.confirmPassword"
          class="form-control"
          id="confirm-password"
          name="confirm-password"
        />
        <div class="error-msg">
          {{ confirmPasswordError }}
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-7">
          <router-link to="/login">Already have an account ?</router-link>
        </div>
        <div class="col d-flex justify-content-end">
          <button @click="register" type="button" class="btn btn-outline-success">
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
  name: "Register",
  data() {
    return {
      user: {
        email: "spxdialga@gmail.com",
        name: "Thong",
        password: "123456",
        confirmPassword: "123456",
      },
      emailError: "",
      nameError: "",
      passwordError: "",
      confirmPasswordError: "",
   };
  },
  created() {
    document.title = "Register";
  },
  methods: {
    ...mapActions(['registerAction']),

    clearError: function () {
      this.emailError = ""
      this.nameError = ""
      this.passwordError = ""
      this.confirmPasswordError = ""
    },

    register: function () {
      this.clearError();
      this.registerAction(this.user)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        error = error.response.data.errors;
        if(error['email'])
          this.emailError = error['email'][0];
        if(error['name'])
          this.nameError = error['name'][0];
        if(error['password'])
          this.passwordError = error['password'][0];
        if(error['confirmPassword'])
          this.confirmPasswordError = error['confirmPassword'][0];
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