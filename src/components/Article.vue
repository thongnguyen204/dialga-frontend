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
    </div>
</template>

<script>
export default {
    name: 'Article',
    props: {
        article: Object,
    },
}
</script>

<style scoped>
.article {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: #68D69D;
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