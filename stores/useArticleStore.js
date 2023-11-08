import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useArticleStore = defineStore("article", {
  state: () => ({
    list: [],
    listTrash: []
  }),
  actions: {
    async createArticle(params) {
      let res = await $axios.post("/api/article/create", params);
      console.log(res.data.message);
    },
    async editArticle(params) {
      let res = await $axios.post("/api/article/edit", params);
      console.log(res.data.message);
    },
    async getList() {
      let res = await $axios.get("/api/article/lists");
      this.$state.list = res.data.data;
    },
    async getListTrash() {
      let res = await $axios.get("/api/article/lists-trash");
      this.$state.listTrash = res.data.data;
    },
    async publicItem(params) {
      await $axios.post("/api/article/public", params);
    },
    async moveToTrash(params) {
      await $axios.post("/api/article/move-to-trash", params);
    },
    async moveToDraft(params) {
      await $axios.post("/api/article/move-to-draft", params);
    },
    async restoreItem(params) {
      await $axios.post("/api/article/restore", params);
    },
    async delelteItem(params) {
      await $axios.post("/api/article/delete", params);
    },
    async setRoleEdit(params) {
      await $axios.post("/api/article/set-role-edit", params);
    },
    resetArticle() {
      this.article = null;
    },
  },
  persist: true,
});
