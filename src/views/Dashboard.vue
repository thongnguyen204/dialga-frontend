<template>
  <div id="dashboard">
    <div class="container bg-white rounded">
      <div class="text-center">
        <router-link :to="{ name: 'Articles'}">Articles</router-link> |
        <router-link :to="{ name: 'CreateArticle'}">Create</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: "Dashboard",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'count',
      'isAuthenticate',
      'name'
      ])
  },
  created() {
    document.title = "Dashboard";
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['updateCount']),
    clear: function () {
      this.updateCount()
    }
  },
};
</script>

<style scoped>
#dashboard {
  background-color: #e6eaed;
}

.container {
  padding-top: 50px;
}
</style>