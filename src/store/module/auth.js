import router from '../../router'
import baseRequest from '../../core/baseRequest';
const axios = require('axios').default;
axios.defaults.withCredentials = true;

export default  {
  state:() =>( {
    isAuthenticate: false,
    name: '',
  }),
  getters: {
    isAuthenticate: state => state.isAuthenticate,
    name: state => state.name
  },
  mutations: {
    authenticated (state, data) {
      state.isAuthenticate = true;
      state.name= data.name;
    },
    unauthenticate (state) {
      state.isAuthenticate = false,
      state.name= null
    }
  },
  actions: {
    loginAction( {commit}, user) {
      return new Promise((resolve, reject) =>{
        baseRequest.post('api/login', {
          email: user.email,
          password: user.password
        })
        .then(response => {
          let data = response.data;
          commit('authenticated', data);
          window.localStorage.setItem('token', data.access_token);
          router.push('/dashboard/articles');
          resolve('Login success');
        })
        .catch(error => {
          reject(error);
        });
      })
    },
    
    registerAction( {commit}, user) {
      return new Promise((resolve, reject) => {
        baseRequest.post('api/register', {
          email: user.email,
          name: user.name,
          password: user.password,
          confirmPassword: user.confirmPassword
        })
        .then(response => {
          let data = response.data;
          commit('authenticated', data);
          window.localStorage.setItem('token', data.access_token);
          router.push('/dashboard');
          resolve('Login success');
        })
        .catch(error => {
          reject(error);
        });
      })
    },

    checkAuthenticate( {commit} ) {
      let token = window.localStorage.getItem('token');
      return new Promise((resolve, reject) => {
        if(token) {
          baseRequest.get('api/user')
          .then(response=> {
            let data = response.data;
            commit('authenticated', data);
            resolve(response);
          })
          .catch(() => {
            reject('user not found');
          });
        }
        else
          reject('token not found')
      })
    },
    logoutAction( {commit} ) {
      let token = window.localStorage.getItem('token');
      return new Promise((resolve, reject) => {
        if(token) {
          baseRequest.post('api/logout')
          .then(() => {
            commit('unauthenticate');
            window.localStorage.removeItem('token');
            router.push('/login');
            resolve('Logout success');
          })
          .catch(() => {
            reject('user not found');
          });
        }
        else
          reject('token not found')
      })
    }
  },
}