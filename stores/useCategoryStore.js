import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useCategoryStore = defineStore("category", {
  state: () => ({
    list: [],
    listTrash: [],
    item: {},
  }),
  actions: {
    async createCategory(params) {
      let res = await $axios.post("/api/category/create", params);
      console.log(res.data.message);
    },
    async editCategory(params) {
      let res = await $axios.post("/api/category/edit", params);
      console.log(res.data.message);
    },
    async getList() {
      let res = await $axios.get("/danh-muc/list");
      this.$state.list = res.data.categories;
      return res.data.categories;
    },
    async getItem(params) {
      if (params.id) {
        let res = await $axios.get(`/danh-muc/detail-by-id/${params.id}`);
        this.$state.item = res.data.data
        return res.data.data
      } else if (params.slug) {
        let res = await $axios.get(`/danh-muc/detail-by-slug/${params.slug}`);
        this.$state.item = res.data.data
        return res.data.data
      }
    },
    async getListTrash() {
      let res = await $axios.get("/api/category/list-trash");
      this.$state.listTrash = res.data.data;
    },
    async publicItem(params) {
      await $axios.post("/api/category/public", params);
    },
    async moveToTrash(params) {
      await $axios.post("/api/category/move-to-trash", params);
    },
    async moveToDraft(params) {
      await $axios.post("/api/category/move-to-draft", params);
    },
    async restoreItem(params) {
      await $axios.post("/api/category/restore", params);
    },
    async delelteItem(params) {
      await $axios.post("/api/category/delete", params);
    },
    async setRoleEdit(params) {
      await $axios.post("/api/category/set-role-edit", params);
    }
  },
  persist: true,
});
