<template>
    <div id="info">
        <div class="container bg-white rounded">
            <form>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input disabled type="email" class="form-control"
                    v-bind:value="this.email" id="email">
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input disabled type="text" class="form-control"
                    v-bind:value="this.name" id="username">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            email: '',
            name: '',
            email_verify: '',
        }
    },
    methods: {
        ...mapActions(['checkAuthenticate']),
    },
    created() {
        this.checkAuthenticate()
        .then( response => {
            const data = response.data;
            this.email = data['email'];
            this.name = data['name'];
        })
        .catch(error => {
            console.log(error.response);
        })
    }
}
</script>

<style scoped>
.container {
    margin-top: 60px;
    padding: 120px;
    max-width: 700px;
}
</style>