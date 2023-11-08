export const useCountArticleStore = defineStore('count_article', {
  state: () => ({
    countArticleDraft: null,
    countArticleTrash: null,
    countArticlePublic: null,
    countArticleByUser: null,
    countArticleAll: null,
  }),
  actions: {
    async getCountArticleAll () {
      const { $articleStore } = useNuxtApp()
      await $articleStore.getListArticle()
      this.$state.countArticleAll = $articleStore.listArticle.length
    },
    async getCountArticleDraft () {
      const { $articleStore } = useNuxtApp()
      await $articleStore.getListArticleDraft()
      this.$state.countArticleDraft = $articleStore.listArticleDraft.length
    },
    async getCountArticlePublic () {
      const { $articleStore } = useNuxtApp()
      await $articleStore.getListArticlePublic()
      this.$state.countArticlePublic = $articleStore.listArticlePublic.length
    },
    async getCountArticleTrash () {
      const { $articleStore } = useNuxtApp()
      await $articleStore.getListArticleTrash()
      this.$state.countArticleTrash = $articleStore.listArticleTrash.length
    },
    async getCountArticleByUser () {
      const { $articleStore } = useNuxtApp()
      const { $userStore } = useNuxtApp()
      await $userStore.getUser()
      await $articleStore.getListArticleByUser($userStore.user.id)
      this.$state.countArticleByUser = $articleStore.listArticleByUser.length
    },
  },
  persist: true,
})