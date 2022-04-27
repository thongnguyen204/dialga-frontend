<template>
    <div class="container" id="createArticle">
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
            <img class="img-fluid" v-if="imgUrl" :src="imgUrl" />
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
            <button @click="create" type="button" class="btn btn-outline-success">
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Submit
            </button>
            <!-- <button @click="uploadImg" type="button" class="btn btn-outline-success">
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Upload
            </button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import baseRequest from '../core/baseRequest';
export default {
    name: 'CreateArticle',
    data() {
        return {
            article: {
                title: '',
                abstract: '',
                image: '',
                content: ''
            },
            loading: false,
            imagesArray: null,
            imgUrl: '',
            titleError: '',
            abstractError: '',
            imageError: '',
            contentError: '',
        }
    },
    methods: {
        ...mapActions(['createArticle']),

        onChange (event) {
            this.imagesArray = event.target.files[0];
            this.article.image = event.target.files[0];
            this.imgUrl = URL.createObjectURL(this.imagesArray);
        },

        clearError: function () {
            this.titleError = '',
            this.abstractError = '',
            this.imageError = '',
            this.contentError = ''
        },

        uploadImg: function () {
            if(!this.imagesArray) {
                this.imageError = "Image require";
                return;
            }
            const formData = new FormData();
            formData.append('image', this.imagesArray);
            formData.append('title', this.article.title);
            formData.append('abstract', this.article.abstract);
            formData.append('content', this.article.content);
            this.loading = true;
            baseRequest.post('api/test-upload', formData)
            .then( response => {
                this.loading = false;
                console.log(response.data);
            })
            .catch( error => {
                console.log(error.response.data);
                this.loading = false;
            });
        },

        create: function () {
            this.clearError();
            this.loading = true;
            this.createArticle(this.article)
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
            })
        },
    },
}
</script>

<style scoped>
.container {
    max-width: 700px;
}
.error-msg{
  color: red;
}
</style>