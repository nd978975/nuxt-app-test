<style>
.tox-notifications-container {
  display: none !important;
}

.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n + 3),
.input-group:not(.has-validation)
  > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>

<script setup>
// Test Ckeditor

//===========================================//
import Editor from "@tinymce/tinymce-vue";
import { storeToRefs } from "pinia";
const { $useCreateSlug } = useNuxtApp();

const route = useRoute();
const router = useRouter();
const { $articleDetail } = useNuxtApp();
const { $userStore } = useNuxtApp();
const { $categoryStore } = useNuxtApp();
const { $toast } = useNuxtApp();

onMounted(async () => {
  await $articleDetail.getArticle({ id: route.params.id });
  await $userStore.getUser();
  await $categoryStore.getList();
  const {
    id,
    name,
    slug,
    des,
    content,
    status,
    img,
    user_id,
    user_role_edit_id,
    title_seo,
    description_seo,
    tags,
    category_id,
    category_name,
  } = storeToRefs($articleDetail);

  articleID.value = id.value;
  articleName.value = name.value;
  articleSlug.value = slug.value;
  articleDescription.value = des.value;
  articleContent.value = content.value;
  articleStatus.value = status.value;
  articleImg.value = img.value;
  articleUserId.value = user_id.value;
  articleTitleSeo.value = title_seo.value;
  articleDesSeo.value = description_seo.value;
  articleTags.value = tags.value;
  articleUserID.value = user_id.value;
  articleUserRoleEditID.value = user_role_edit_id.value;
  articleCategoryID.value = category_id.value;
  articleCategoryName.value = category_name.value;
});

const articleID = ref("");
const articleName = ref("");
const articleSlug = computed(() => {
  if (articleName.value) {
    return $useCreateSlug(articleName.value);
  } else {
    return "";
  }
});
const articleDescription = ref("");
const articleContent = ref("");
const articleStatus = ref("");
const articleImg = ref("");
const articleUserId = ref("");
const articleTitleSeo = ref("");
const articleDesSeo = ref("");
const articleTags = ref("");
const articleUserID = ref("");
const articleUserRoleEditID = ref("");
const articleCategoryID = ref(0);
const articleCategoryName = ref("");
const isAdmin = $userStore.user.role.split(",").includes("is_admin");

const selectBoxValueAndName = (event) => {
  const id = event.target.value;
  const name = event.target.options[event.target.options.selectedIndex].text;
  articleCategoryID.value = id;
  articleCategoryName.value = name;
};

async function editArticle(status) {
  if (
    $userStore.user.id !== articleUserID.value &&
    $userStore.user.id !== articleUserRoleEditID.value &&
    !isAdmin
  ) {
    $toast.warning("Bạn không có quyền sửa bài viết này!");
    return;
  }
  await $articleDetail.editArticle({
    id: articleID.value,
    name: articleName.value,
    slug: articleSlug.value,
    des: articleDescription.value,
    content: articleContent.value,
    status: status,
    category_id: articleCategoryID.value,
    category_name: articleCategoryName.value,
    // tags: articleTags.value,
    // status: articleStatus.value,
    // img: articleImg.value,
    // user_id: articleUserId.value,
  });
  router.push("/admin/article");
}

definePageMeta({
  layout: "backend",
  middleware: ["auth"],
});
</script>

<template>
  <ClientOnly>
    <form>
      <div class="form-group">
        <input type="text" class="form-control" v-model="articleName" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon3"
          >https://myblog.com/post/</span
        >
        <input
          v-model="articleSlug"
          type="text"
          class="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div>
      <div class="form-group">
        <select class="form-control" @change="selectBoxValueAndName($event)">
          <option value="0">Chọn danh mục</option>
          <option 
            v-for="item in $categoryStore.list" 
            :key="item.id"
            :value="item.id"
            :selected="item.id === articleCategoryID"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <textarea
          class="form-control"
          v-model="articleDescription"
          cols="30"
          rows="5"
        ></textarea>
      </div>
      <editor v-model="articleContent" :init="useInitEditorTinyMCE()" />

      <button
        @click.prevent="editArticle(0)"
        class="btn btn-primary mt-2 mr-2"
        type="submit"
      >
        Lưu nháp
      </button>
      <button
        @click.prevent="editArticle(1)"
        class="btn btn-success mt-2 mr-2"
        type="submit"
      >
        Đăng ngay
      </button>
      <NuxtLink class="btn btn-danger mt-2 mr-2" to="/admin/article"
        >Quay lại</NuxtLink
      >
    </form>
  </ClientOnly>
</template>
