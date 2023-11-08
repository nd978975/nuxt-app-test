import { useUserStore }       from "~/stores/useUserStore"
import { useProfileStore }    from "~/stores/useProfileStore"
import { useArticleStore }    from "~/stores/useArticleStore"
import { articleDetailStore } from "~/stores/articleDetailStore";
import { useCountArticleStore } from "~/stores/useCountArticleStore";
import { useCategoryStore } from "~/stores/useCategoryStore";
import { usePaginateStore } from "~/stores/usePaginateStore";

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      userStore     : useUserStore(),
      profileStore  : useProfileStore(),
      articleStore  : useArticleStore(),
      articleDetail : articleDetailStore(),
      countArticleStore: useCountArticleStore(),
      categoryStore: useCategoryStore(),
      paginateStore: usePaginateStore(),
    },
  };
})