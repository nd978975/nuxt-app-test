import axios from "axios"

export default defineNuxtPlugin(nuxtApp => {

  axios.defaults.withCredentials = true
  axios.defaults.baseURL = "http://localhost:8000"
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