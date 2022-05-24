<template>
    <div id="articles">
        <div id="list-articles" class="container">
            <div v-for="article in articles" :key="article.id">
                <Article 
                    v-bind:article="article"
                    :key="article.id"
                    v-on:refresh="refresh"
                ></Article>
            </div>
        </div>
        <Paginate
            class="text-center"
            v-bind:links="this.links"
            v-on:paginate="paginate"
        ></Paginate>
    </div>
</template>

<script>
import baseRequest from '../core/baseRequest'
import Paginate from './Paginate.vue'
import Article from '../components/Article.vue'
export default {
    name: 'Articles',

    components: {
        Paginate,
        Article
    },

    data() {
        return {
            articles: Object,
            links: [], 
        }
    },

    created() {
        this.getArticles();
    },

    methods: {
        getArticles: function (url = 'api/articles') {
            baseRequest.get(url)
            .then( response => {
                this.articles = response.data.data;
                this.links = response.data.links;
            })
            .catch( error => {
                console.log(error.response.data);
            })
        },
        refresh: function () {
            this.getArticles();
        },

        paginate: function (url) {
            const array = url.split("/");
            const apiUrl = 'api/' + array[array.length - 1];
            this.getArticles(apiUrl);
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 800px;
}
#articles {
    padding-bottom: 20px;
}
</style>