<template>
    <div class="article">
        <div class="title">
            <router-link :to="{ name: 'ArticleDetail', params: {id: article.id}}">
                {{ article.title}}
            </router-link>
        </div>
        <div class="abstract">
            {{ article.abstract}}
        </div>
        <div v-if="isArticleOwner()">
            <button @click="editArticle(article.id)" type="button" class="btn btn-primary">Edit</button>
            <button @click="fnDeleteArticle(article.id)" type="button" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Article',
    props: {
        article: Object,
    },
    computed: {
        ...mapGetters(['userId'])
    },
    methods: {
        ...mapActions(['deleteArticle']),

        isArticleOwner: function () {
            if(this.article.user_id === this.userId) return true;
            return false;
        },
        editArticle: function (id) {
            this.$router.push({name: 'ArticleEdit', params: {id: id}});
        },
        fnDeleteArticle: function (id) {
            if(confirm('Delete this article ?')) {
                this.deleteArticle(id)
                .then(response => {
                    this.$emit('refresh');
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            }
            else console.log('no');
        },
    },
}
</script>

<style scoped>
.article {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: #68D69D;
    height: 150px;
}
.title {
    font-size: 20px;
    font-weight: 600;
}
.abstract {
    margin-left: 20px;
    color: #401D83
}
a{
    text-decoration: none;
}

</style>