const apiUrl = process.env.VUE_APP_URL;
const axios = require('axios').default;

export default {
  getHeaders() {
    let token = window.localStorage.getItem('token');
    let headers = {
      "Accept": "application/json",
      "Content-type": "application/json",
    };
    if(token)
      headers.Authorization = "Bearer " + token;
    return headers;
  },

  get(url) {
    return axios.get(apiUrl + url,
      { headers: this.getHeaders() }
    )
  },

  async post(url, data) {
    return await axios.get(apiUrl + 'sanctum/csrf-cookie').then(() => {
      return axios.post(
        apiUrl + url,
        data,
        { headers: this.getHeaders() }
      )
    })
  }
}