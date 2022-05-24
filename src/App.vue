<template>
  <div id="app">
    <div class="content">
      <div id="bar" class="row">
        <div class="col" id="nav">
          <router-link to="/">Home</router-link> 
          <span v-if="isAuthenticate">
            <router-link :to="{ name: 'Dashboard' }">| Dashboard</router-link>
          </span>
        </div>
        <div class="col d-flex align-items-center justify-content-center" id="auth">
          <span v-if="isAuthenticate">
            <span class="dropdown">
              <button class="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {{ name }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a @click="userInfo" class="dropdown-item" >Account</a></li>
                <li><a @click="logout" class="dropdown-item" >Logout</a></li>
              </ul>
            </span>
            <!-- <button @click="logout" class="btn btn-danger">Logout</button> -->
          </span>
          <span v-if="!isAuthenticate">
            <router-link to="/register">Register</router-link> |
            <router-link to="/login">Login</router-link>
          </span>
        </div>
      </div>
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Footer from './components/Footer.vue'
export default {
  components: {
    Footer
  },
  computed: {
    ...mapGetters(['isAuthenticate', 'name']),
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
    },

    userInfo: function () {
      this.$router.push({name: 'UserInfo'})
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
}

.content {
  min-height: 900px;
}

</style>
