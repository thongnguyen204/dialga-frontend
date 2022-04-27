<template>
  <div id="app">
    <div id="bar" class="row">
      <div class="col" id="nav">
        <router-link to="/">Home</router-link> 
        <span v-if="isAuthenticate">
          <router-link :to="{ name: 'Dashboard' }">| Dashboard</router-link>
        </span>
      </div>
      <div class="col d-flex align-items-center justify-content-center" id="auth">
        <span v-if="isAuthenticate">
          <button @click="logout" class="btn btn-danger">Logout</button>
        </span>
        <span v-if="!isAuthenticate">
          <router-link to="/register">Register</router-link> |
          <router-link to="/login">Login</router-link>
        </span>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticate']),
  },
  methods: {
    ...mapActions(['checkAuthenticate', 'logoutAction']),
    logout: function () {
      this.logoutAction()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  created() {
    this.checkAuthenticate()
    .then(()=> {
      console.log('Welcome');
    })
    .catch(error => {
      console.log(error);
    });
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  text-align: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#auth{
  text-align: center;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#bar {
  background-color: cyan;
}

#app{
  background-color: #e6eaed;
  min-height: 800px;
}

</style>
