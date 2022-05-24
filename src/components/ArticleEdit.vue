<template>
    <div class="container" id="articleEdit">
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
                type="text"
                v-model="article.title"
                class="form-control"
                id="title"
                name="title"
            />
            <div class="error-msg">
                {{ titleError }}
            </div>
        </div>

        <div class="mb-3">
            <label for="abstract" class="form-label">Abstract</label>
            <input
                type="text"
                v-model="article.abstract"
                class="form-control"
                id="abstract"
                name="abstract"
            />
            <div class="error-msg">
                {{ abstractError }}
            </div>
        </div>

        <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input
                type="file"
                class="form-control"
                id="image"
                name="image"
                accept="image/*"
                @change="onChange"
            />
            <div class="error-msg">
                {{ imageError }}
            </div>
        </div>

        <div id="preview">
            <img class="img-fluid" v-if="article.image" :src="article.image" />
        </div>

        <div class="mb-3">
            <label for="content" class="form-label">Content</label>
            <textarea
                id="content"
                name="content"
                class="form-control"
                v-model="article.content"
                rows="15"
            ></textarea>
            <div class="error-msg">
                {{ contentError }}
            </div>
        </div>
        <div class="mb-3 row">
            <div class="col d-flex justify-content-end">
            <button @click="update" type="button" class="btn btn-outline-success">
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Submit
            </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import baseRequest from '../core/baseRequest';
export default {
    name: 'ArticleEdit',
    data() {
        return {
            article: {
                title: '',
                abstract: '',
                image: '',
                content: '',
                newImg: '',
            },
            loading: false,
            imagesArray: null,
            imgUrl: '',
            imgObject: '',
            titleError: '',
            abstractError: '',
            imageError: '',
            contentError: '',
        }
    },
    created() {
        this.getArticle(this.$route.params.id);
        this.imgUrl = this.article.image;
    },
    methods: {
        ...mapActions(['updateArticle']),

        onChange (event) {
            this.imagesArray = event.target.files[0];
            this.imgObject = event.target.files[0];
            this.article.image= URL.createObjectURL(this.imagesArray);
        },
        getArticle: function (id) {
            baseRequest.get('api/articles/' + id)
            .then( response => {
                this.article = response.data;
            })
            .catch( error => {
                console.log(error.response.data);
            });
        },

        update: function () {
            this.loading = true;
            if(this.imagesArray) {
                this.article.newImg = this.imgObject;
            }
            this.updateArticle(this.article)
            .then(response => {
                this.loading = false;
                console.log(response);
            })
            .catch(error => {
                const errors = error.response.data.errors;
                console.log(error.response);
                if(errors['title'])
                    this.titleError = errors['title'][0];
                if(errors['abstract'])
                    this.abstractError = errors['abstract'][0];
                if(errors['content'])
                    this.contentError = errors['content'][0];        
            });
        }
    },
}
</script>

<style>

</style>