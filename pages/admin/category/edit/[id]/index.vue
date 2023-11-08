<script setup>
import Editor from "@tinymce/tinymce-vue";
import { storeToRefs } from "pinia";
const { $useCreateSlug } = useNuxtApp();

const route = useRoute();
const router = useRouter();
const { $categoryStore } = useNuxtApp();
const { $userStore } = useNuxtApp();
const { $toast } = useNuxtApp();

onMounted(async () => {
  await $categoryStore.getItem({ id: route.params.id });
  await $userStore.getUser()
  const { item } = storeToRefs($categoryStore);
  
  itemID.value = item.value.id;
  itemName.value = item.value.name;
  itemSlug.value = item.value.slug;
  itemDescription.value = item.value.description;
  itemStatus.value = item.value.status;
  itemImg.value = item.value.img;
  itemUserID.value = item.value.user_id;
  itemTitleSeo.value = item.value.title_seo;
  itemDesSeo.value = item.value.description_seo;
  itemTags.value = item.value.tags;
});

const itemID = ref("");
const itemName = ref("");
const itemSlug = computed(() => {
  if(itemName.value) {
    return $useCreateSlug(itemName.value);
  }else {
    return ""
  }
});
const itemDescription = ref("");
const itemStatus = ref("");
const itemImg = ref("");
const itemTitleSeo = ref("");
const itemDesSeo = ref("");
const itemTags = ref("");
const itemUserID = ref("");
const isAdmin = $userStore.user.role.split(',').includes('is_admin')

async function editCategory(status) {
  if(
    $userStore.user.id !== itemUserID.value 
    && !isAdmin 
  ) {
    $toast.warning("Bạn không có quyền sửa bài viết này!")
    return
  }
  await $categoryStore.editCategory({
    id: itemID.value,
    name: itemName.value,
    slug: itemSlug.value,
    description: itemDescription.value,
    status: status
    // tags: itemTags.value,
    // status: itemStatus.value,
    // img: itemImg.value,
    // user_id: itemUserID.value,
  });
  router.push('/admin/category')
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
        <input type="text" class="form-control" v-model="itemName" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon3"
          >https://myblog.com/post/</span
        >
        <input
          v-model="itemSlug"
          type="text"
          class="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div>
      <editor v-model="itemDescription" :init="useInitEditorTinyMCE(300)" />

      <button @click.prevent="editCategory(0)" class="btn btn-primary mt-2 mr-2" type="submit">Lưu nháp</button>
      <button @click.prevent="editCategory(1)" class="btn btn-success mt-2 mr-2" type="submit">Đăng ngay</button>
      <NuxtLink class="btn btn-danger mt-2 mr-2" to="/admin/category"
        >Quay lại</NuxtLink
      >
    </form>
  </ClientOnly>
</template>
