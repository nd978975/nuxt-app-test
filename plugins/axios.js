import axios from "axios"

export default defineNuxtPlugin(nuxtApp => {
  
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = "https://api.chamsocmevabe.top"
  // axios.defaults.baseURL = "https://api.chamsocmevabe.top"
  // const token = useCookie("XSRF-TOKEN")
  // if (token.value) {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  //   axios.defaults.headers['X-XSRF-TOKEN'] = token.value
  // }
  // axios.defaults.headers.post['Content-Type'] = 'application/json';
  // axios.defaults.headers.post['Accept'] = 'application/json';


  return {
    provide: {
      axios: axios
    }
  }
})