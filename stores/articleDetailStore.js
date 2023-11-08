import axios from '~/plugins/axios'
const $axios = axios().provide.axios

export const articleDetailStore = defineStore("articleDetail", {
  state: () => ({
    id: null,
    name: null,
    slug: null,
    des: null,
    content: null,
    status: null,
    img: null,
    user_id: null,
    user_role_edit_id: null,
    category_id: null,
    category_name: null,
    title_seo: null,
    description_seo: null,
    tags: null,
  }),
  actions: {
    async editArticle(params) {
      await $axios.post('/api/article/edit', params);
      // this.$state.id = res.data.data.id
      // this.$state.name = res.data.data.name;
      // this.$state.slug = res.data.data.slug;
      // this.$state.description = res.data.data.description;
      // this.$state.content = res.data.data.content;
      // this.$state.status = res.data.data.status;
      // this.$state.img = res.data.data.img;
      // this.$state.user_id = res.data.data.user_id;
      // this.$state.title_seo = res.data.data.title_seo;
      // this.$state.description_seo = res.data.data.description_seo;
      // this.$state.tags = res.data.data.tags;
    },
    async getArticle(params) {
      if (params.id) {
        let res = await $axios.get(`/api/article/detail/${params.id}`);
        this.$state.id = res.data.data.id
        this.$state.name = res.data.data.name;
        this.$state.slug = res.data.data.slug;
        this.$state.des = res.data.data.des;
        this.$state.content = res.data.data.content;
        this.$state.status = res.data.data.status;
        this.$state.img = res.data.data.img;
        this.$state.user_id = res.data.data.user_id;
        this.$state.user_role_edit_id = res.data.data.user_role_edit_id;
        this.$state.category_id = res.data.data.category_id;
        this.$state.category_name = res.data.data.category_name;
        this.$state.title_seo = res.data.data.title_seo;
        this.$state.description_seo = res.data.data.description_seo;
        this.$state.tags = res.data.data.tags;
      } else if (params.slug) {
        let res = await $axios.get(`/api/fe-article/${params.slug}`);
        this.$state.id = res.data.data.id
        this.$state.name = res.data.data.name;
        this.$state.slug = res.data.data.slug;
        this.$state.des = res.data.data.des;
        this.$state.content = res.data.data.content;
        this.$state.status = res.data.data.status;
        this.$state.img = res.data.data.img;
        this.$state.user_id = res.data.data.user_id;
        this.$state.title_seo = res.data.data.title_seo;
        this.$state.description_seo = res.data.data.description_seo;
        this.$state.tags = res.data.data.tags;
      }
    },
    resetArticle() {
      this.$state.id = null
      this.$state.name = null
      this.$state.slug = null
      this.$state.des = null
      this.$state.content = null
      this.$state.status = null
      this.$state.img = null
      this.$state.user_id = null
      this.$state.title_seo = null
      this.$state.description_seo = null
      this.$state.tags = null
    },
  },
  persist: true,
});