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
                    console.log(response);
                    router.push({name: 'Articles'});
                    resolve('Article created');
                })
                .catch(error => {
                    reject(error);
                })
            });
        }
    },
}