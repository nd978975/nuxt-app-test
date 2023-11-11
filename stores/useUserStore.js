import axios from '~/plugins/axios'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => ({
    listUser: null,
    user: null,
    isLogin: false
  }),
  actions: {
    async getToken () {
      await $axios.get("/sanctum/csrf-cookie")
      console.log("Get token success!!!")
    },
    async getUser () {
      let res = await $axios.get('/api/user')
      this.$state.user = res.data
    },
    async getListUser () {
      let res = await $axios.get('/api/user/list')
      this.$state.listUser = res.data.data
    },
    async login (email, password) {
      await $axios.post('/login', { email: email, password: password })
      this.$state.isLogin = true
    },
    async logout() {
      await $axios.post('/logout')
      this.resetUser()
      this.$state.isLogin = false
      console.log("Đăng xuất thành công!");
    },
    async sigup (data) {
      await $axios.post("/register", data);
      this.$state.isLogin = true
    },
    async changeRole (data) {
      const res = await $axios.post("/api/user/change-role", data);
      console.log(res.data.message);
    },
    async resetUser () {
      this.$state.user = null
    }
  },
  persist: true,
})