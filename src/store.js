import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://appmed-guestbook-api.herokuapp.com/api',
    accessToken:  localStorage.getItem('accessToken') ||  '',
    currentUser : {},
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, accessToken, currentUser) {
      state.status = 'success'
      state.accessToken = accessToken
      state.currentUser = currentUser
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.accessToken = ''
    },
  },
  actions: {
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${this.state.apiUrl}` + '/auth/register', data: user, method: 'POST' })
        .then(resp => {
          const accessToken = resp.data.access_token
          const currentUser = {}
          localStorage.setItem('accessToken', accessToken)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
          commit('auth_success', accessToken, currentUser)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('accessToken')
          reject(err)
        })
      })
    },
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${this.state.apiUrl}` + '/auth/login', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp);
          const accessToken = resp.data.access_token
          const currentUser = {}
          localStorage.setItem('accessToken', accessToken)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
          commit('auth_success', accessToken, currentUser)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('accessToken')
          reject(err)
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        axios({url: `${this.state.apiUrl}` + '/auth/logout', data: {}, method: 'POST' })
        .then(() => {
          commit('logout')
          localStorage.removeItem('accessToken')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })      
        .catch(err => { reject(err) })  
      })
    },
    logoutsimple({commit}) {
      localStorage.removeItem('accessToken')
      delete axios.defaults.headers.common['Authorization']
      commit('logout').then(() => { this.$router.push('/') })
    }
  },
  getters : {
    isLoggedIn: state => !!state.accessToken,
    authStatus: state => state.status,
  }
})