export const usePaginateStore = defineStore("paginate", {
  state: () => ({
    currentPage: 1,
    itemPerPage: 4,
    totalPage: null
  }),
  actions: {
    async setCurrentPage (num) {
      this.$state.currentPage = num
    },
    async setItemPerPage (num) {
      this.$state.itemPerPage = num
    },
    async setTotalPage (num) {
      this.$state.totalPage = num
    },
  },
  persist: true,
});
