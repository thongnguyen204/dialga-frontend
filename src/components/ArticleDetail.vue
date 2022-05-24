<template>
    <div class="container" id="articleDetail">
        <div id="title">
            {{ article.title }}
        </div>
        <div id="abstract">
            {{ article.abstract }}
        </div>
        <div class="image text-center">
            <img class="img-fluid"
                v-bind:src="article.image"    
            >
        </div>
        
        <div id="content">
            {{ article.content}}
        </div>
    </div>
</template>

<script>
import baseRequest from '../core/baseRequest'
export default {
    name: 'ArticleDetail',
    data() {
        return {
            article: Object,
        }
    },
    created() {
        this.getArticle(this.$route.params.id);
    },
    methods: {
        getArticle: function (id) {
            baseRequest.get('api/articles/' + id)
            .then( response => {
                this.article = response.data;
            })
            .catch( error => {
                console.log(error.response.data);
            });
        }
    }
}
</script>

<style scoped>
#title {
    font-size: 30px;
}
img {
    margin: 10px 0 10px 0;
    max-height: 500px;
}
</style>