import baseRequest from "../../core/baseRequest"
import router from '../../router'

export default {
    actions: {
        createArticle(_,article ) {
            const formData = new FormData();
            formData.append('title', article.title);
            formData.append('abstract', article.abstract);
            formData.append('image', article.image);
            formData.append('content', article.content);

            return new Promise((resolve, reject) => {
                baseRequest.post('api/articles', formData)
                .then(response => {
                    router.push({name: 'Articles'});
                    resolve(response.data.message);
                })
                .catch(error => {
                    reject(error);
                })
            });
        },

        updateArticle(_, article)
        {
            const formData = new FormData();
            if(article.newImg) formData.append('image', article.newImg);
            formData.append('title', article.title);
            formData.append('abstract', article.abstract);
            formData.append('content', article.content);
            formData.append('_method', 'PUT');

            return new Promise((resolve, reject) => {
                baseRequest.post('api/articles/' + article.id, formData)
                .then(response => {
                    router.push({name: 'Articles'});
                    resolve(response.data.message);
                })
                .catch(error => {
                    reject(error);
                })
            });
        },

        deleteArticle(_, id)
        {
            const formData = new FormData();
            formData.append('_method', 'DELETE');

            return new Promise((resolve, reject) => {
                baseRequest.post('api/articles/' + id, formData)
                .then(response => {
                    resolve(response.data.message);
                })
                .catch(error => {
                    reject(error);
                });
            })
        }
    },
}